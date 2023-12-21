import { IUserResponse } from '@/api/auth';
import { IInstruction } from '@/api/instructions';
import { ITweet, getTweets, getTweetsForGuest } from '@/api/tweets';
import { LocalStorage } from '@/services/localStorage';
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/spinner';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { formatDistance } from 'date-fns';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { CommentModal } from './CommentModal';
import HeartLike from './Like';
import { Quadrilateral } from '@/components/skeleton';
export type TPostsProps = {};
export const Posts = ({}: TPostsProps) => {
  const { ref, inView } = useInView();
  const local = LocalStorage.get('RECYCLING_AI_TOKEN');

  const [tweetId, setTweetId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    data,
    status,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
    refetch,
  } = useInfiniteQuery(
    'getTweets',
    async ({ pageParam = 1 }) => {
      // truyen id cua user vao day, neu id = null thi lay tat ca cac tweet
      if (local && local._id) {
        const res = await getTweets({ page: pageParam });
        return res;
      } else {
        const res = await getTweetsForGuest({ page: pageParam });
        return res;
      }
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        const nextPage = lastPage.tweets.length
          ? allPages.length + 1
          : undefined;
        return nextPage;
      },
    }
  );
  const result = data?.pages.map((page) =>
    page.tweets.map((tweet, idx) => {
      if (page.tweets.length === idx + 1) {
        return (
          <Box key={tweet._id}>
            <Post
              {...tweet}
              setTweetId={setTweetId}
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
              viewRef={ref}
              local={local}
            />
          </Box>
        );
      }
      return (
        <Box key={tweet._id}>
          <Post
            {...tweet}
            setTweetId={setTweetId}
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            local={local}
          />
        </Box>
      );
    })
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (status === 'loading') {
    return (
      <VStack spacing={10}>
        <Quadrilateral isLoading={true} w="full" h="500px" />;
        <Quadrilateral isLoading={true} w="full" h="500px" />;
      </VStack>
    );
  }

  if (status === 'error') {
    return <p>Error</p>;
  }

  return (
    <>
      {result}
      {isFetchingNextPage && (
        <HStack w="full" justify="center">
          <Spinner size="md" color="green.500" />
        </HStack>
      )}
      <CommentModal
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        tweetId={tweetId}
        refresh={refetch}
      />
    </>
  );
};

export type PostProps = ITweet & {
  _id: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  instruction: Array<IInstruction>;
  comments: Array<ITweet>;
  comment_count: number;
  user_info: Array<IUserResponse>;
  like_count: Number;
  likes: Array<IUserResponse>;
  onOpen: () => void;
  onClose: () => void;
  isOpen: boolean;
  setTweetId: (id: string) => void;
  viewRef?: any;
  local: any;
};
function Post({
  _id,
  user_info,
  likes,
  content,
  like_count,
  instruction,
  comment_count,
  onOpen,
  setTweetId,
  medias,
  created_at,
  viewRef,
  local,
}: PostProps) {
  // console.log(local);
  const [likeCount, setLikeCount] = useState(like_count);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const router = useRouter();
  return (
    <div className="bg-white mb-7 border-none ">
      <div
        onClick={() => {
          if (local._id === user_info[0]._id) {
            router.push(`/profile`);
          } else {
            router.push(`/user/${user_info[0]._id}`);
          }
        }}
        className="flex items-center py-3"
      >
        <img
          src={user_info[0].avatar ? user_info[0].avatar : 'empty_avatar.png'}
          className="rounded-full h-9 w-9 object-contain border-black p-1 mr-3 cursor-pointer"
          alt=""
        />
        <div className="flex-1 flex items-center">
          <p className="font-semibold text-sm mr-2 cursor-pointer">
            {user_info[0].name}{' '}
          </p>
          <p className="mx-2 text-gray-500">•</p>
          <p className="text-sm text-gray-500">
            {formatDistance(new Date(created_at), new Date(), {
              addSuffix: true,
            })}
          </p>
        </div>
        {/* overflow="auto" */}

        <DotsHorizontalIcon className="h-6 mr-1 cursor-pointer" />
      </div>
      <div>
        <Slider {...settings}>
          <Box
            padding="20px"
            rounded="lg"
            w="full"
            h="300px"
            maxH="300px"
            overflow="auto"
            bg="green.200"
            shadow="sm"
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'gray',
                borderRadius: '24px',
              },
            }}
            className="card"
          >
            {instruction.map((item, idx) =>
              item.steps.map((step, idx) => <p key={idx}>{step.content}</p>)
            )}
          </Box>
          {medias.length !== 0 &&
            medias.map((media, idx) => (
              <div className="card w-full max-h-[300px] items-center justify-center">
                <img
                  src={media.url}
                  className=" object-cover h-[300px] max-h-[300px] w-full rounded-md cursor-pointer"
                  alt=""
                />
              </div>
            ))}
        </Slider>
      </div>

      <div className="flex justify-between px-1 pt-4">
        <div className="flex space-x-4 ">
          <HeartLike likes={likes} setLikeCount={setLikeCount} tweet_id={_id} />
          <ChatIcon className="h-6 cursor-pointer" />
          <PaperAirplaneIcon className="h-6 cursor-pointer" />
        </div>
        <BookmarkIcon className="h-6 cursor-pointer" />
      </div>
      <Text
        color="#000"
        fontSize="14px"
        ml="8px"
        mt="2px"
        fontWeight="semibold"
      >
        {`${likeCount} likes`}
      </Text>
      <div className="flex my-1 items-center ml-2">
        <p className="font-semibold text-sm mr-2 cursor-pointer">
          {user_info[0].name}{' '}
        </p>
        <p className="text-sm">{content}</p>
      </div>
      <Text
        ref={viewRef}
        onClick={() => {
          setTweetId(_id);
          onOpen();
        }}
        className="text-[14px] text-gray-500 cursor-pointer ml-2 mt-2 pb-5 border-b-[1px]"
      >{`See all ${comment_count} comments`}</Text>
    </div>
  );
}
