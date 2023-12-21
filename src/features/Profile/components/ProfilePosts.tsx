import { IUserResponse } from '@/api/auth';
import { IInstruction } from '@/api/instructions';
import { ITweet, getMyTweets } from '@/api/tweets';
import { Quadrilateral } from '@/components/skeleton';
import { CommentModal } from '@/features/Feed/components';
import HeartLike from '@/features/Feed/components/Like';
import Slider from 'react-slick';
import {
  Box,
  HStack,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

export type TProfilePostsProps = {};
export const ProfilePosts = ({}: TProfilePostsProps) => {
  const [tweetId, setTweetId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { ref, inView } = useInView();

  const {
    data,
    status,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    isLoading,
    isError,
    refetch,
  } = useInfiniteQuery(
    'getMyTweets',
    async ({ pageParam = 1 }) => {
      const res = await getMyTweets({ page: pageParam });
      return res;
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

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const result = data?.pages.map((page) =>
    page.tweets.map((tweet, idx) => {
      if (page.tweets.length == idx + 1) {
        return (
          <Box ref={ref} key={tweet._id}>
            <Post
              {...tweet}
              setTweetId={setTweetId}
              isOpen={isOpen}
              onOpen={onOpen}
              onClose={onClose}
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
          />
        </Box>
      );
    })
  );

  if (status === 'loading') {
    return (
      <VStack mt={8} spacing={10}>
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
      {!hasNextPage && (
        <Text align="center" as="em" color="green.400" mt={4}>
          There are no posts here!
        </Text>
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
}: PostProps) {
  const [likeCount, setLikeCount] = useState(like_count);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="bg-white my-7 border-none ">
      <div className="flex items-center py-3 ">
        <img
          src={user_info[0].avatar ? user_info[0].avatar : 'empty_avatar.png'}
          className="rounded-full h-8 w-8 object-contain border p-1 mr-3 ml-1 cursor-pointer"
          alt=""
        />
        <div className="flex-1 flex items-center">
          <p className="font-semibold text-sm mr-2 cursor-pointer">
            {user_info[0].name}{' '}
          </p>
          <p className="mx-2">•</p>
          <p className="text-sm">{content}</p>
        </div>

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
      <Text color="#000" fontSize="14px" ml="8px" mt="2px" fontWeight="bold">
        {`${likeCount} likes`}
      </Text>
      <Text
        onClick={() => {
          setTweetId(_id);
          onOpen();
        }}
        className="text-[14px] text-gray-500 cursor-pointer ml-2 mt-2 pb-5 border-b-[1px]"
      >{`See all ${comment_count} comments`}</Text>
    </div>
  );
}
