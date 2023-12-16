import { IUserResponse } from '@/api/auth';
import { IInstruction, IInstructionResponse } from '@/api/instructions';
import { ITweet, getTweets, getTweetsForGuest } from '@/api/tweets';
import { Box, Text, useDisclosure } from '@chakra-ui/react';
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
import { LocalStorage } from '@/services/localStorage';
export type TPostsProps = {};
export const Posts = ({}: TPostsProps) => {
  const { ref, inView } = useInView();
  // get id from localstorage
  const local = LocalStorage.get('RECYCLING_AI_TOKEN');

  const [tweetId, setTweetId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    'getTweets',
    async ({ pageParam = 1 }) => {
      // truyen id cua user vao day, neu id = null thi lay tat ca cac tweet
      if (local && local.user_id) {
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
  // console.log(result);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'error') {
    return <p>Error</p>;
  }

  return (
    <>
      {result}
      {isFetchingNextPage && <h3>Loading...</h3>}
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
}: PostProps) {
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
        onClick={() => router.push(`/user/${user_info[0]._id}`)}
        className="flex items-center py-3"
      >
        <img
          src={
            user_info[0].avatar
              ? user_info[0].avatar
              : 'https://shophotproperties.com/cdn/shop/products/IMG_8557_grande.jpg?v=1503263004'
          }
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

        <DotsHorizontalIcon className="h-6 mr-1 cursor-pointer" />
      </div>
      <div>
        <Slider {...settings}>
          <div className="px-[20px] py-[20px] rounded-lg bg-green-200 shadow-sm card">
            {instruction.map((item, idx) =>
              item.steps.map((step, idx) => <p key={idx}>{step.content}</p>)
            )}
          </div>
          {medias.length !== 0 &&
            medias.map((media, idx) => (
              <div className="card w-full h-full items-center justify-center">
                <img
                  src={media.url}
                  className=" object-contain w-full h-full rounded-md  cursor-pointer"
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
        {`${likeCount} lượt thích`}
      </Text>
      <div className="flex my-1 items-center ml-2">
        <p className="font-semibold text-sm mr-2 cursor-pointer">
          {user_info[0].name}{' '}
        </p>
        <p className="text-sm">{content}</p>
      </div>
      <Text
        onClick={() => {
          setTweetId(_id);
          onOpen();
        }}
        className="text-[14px] text-gray-500 cursor-pointer ml-2 mt-2 pb-5 border-b-[1px]"
      >{`Xem tất cả ${comment_count} binh luan`}</Text>
    </div>
  );
}
