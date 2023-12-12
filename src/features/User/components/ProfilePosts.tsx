import { IUserResponse } from '@/api/auth';
import { IInstruction, IInstructionResponse } from '@/api/instructions';
import { ITweet, getUserTweets, useGetUserTweets } from '@/api/tweets';
import { CommentModal } from '@/features/Feed/components';
import HeartLike from '@/features/Feed/components/Like';
import { Box, Text, useDisclosure } from '@chakra-ui/react';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery } from 'react-query';

export type TProfilePostsProps = {};
export const ProfilePosts = ({}: TProfilePostsProps) => {
  const { ref, inView } = useInView();
  const router = useRouter();
  // const { data, isLoading, refetch } = useGetUserTweets(
  //   router.query.userId[0],
  //   {},
  //   {
  //     enabled: !!router.query.userId[0],
  //   }
  // );
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
    'getMyTweets',
    async ({ pageParam = 1 }) => {
      const res = await getUserTweets(router.query.userId[0], {
        page: pageParam,
      });
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
  content,
  like_count,
  instruction,
  comment_count,
  likes,
  onOpen,
  setTweetId,
}: PostProps) {
  const [likeCount, setLikeCount] = useState(like_count);
  return (
    <div className="bg-white my-7 border-none ">
      <div className="flex items-center py-3 ">
        <img
          src={
            user_info[0].avatar
              ? user_info[0].avatar
              : 'https://shophotproperties.com/cdn/shop/products/IMG_8557_grande.jpg?v=1503263004'
          }
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
      <div className="px-[20px] py-[20px] border-[1px] rounded-lg shadow-sm">
        {instruction.map((item, idx) =>
          item.steps.map((step, idx) => (
            <p key={idx}>{step.content}</p>
          ))
        )}
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
        {`${likeCount} lượt thích`}
      </Text>
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
