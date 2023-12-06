import { IUserResponse } from '@/api/auth';
import { IInstructionResponse } from '@/api/instructions';
import { ITweet, useGetTweets } from '@/api/tweets';
import { Text, useDisclosure } from '@chakra-ui/react';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { useState } from 'react';
import { CommentModal } from './CommentModal';
import HeartLike from './Like';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { time } from 'console';
import { formatDistance } from 'date-fns';
export type TPostsProps = {};
export const Posts = ({}: TPostsProps) => {
  const { data, isLoading, isError, refetch } = useGetTweets();
  const [tweetId, setTweetId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {!isLoading && (
        <div>
          {data &&
            data?.tweets.map((post) => (
              <div key={post._id}>
                <Post
                  {...post}
                  setTweetId={setTweetId}
                  isOpen={isOpen}
                  onOpen={onOpen}
                  onClose={onClose}
                />
              </div>
            ))}
        </div>
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
  instruction: Array<IInstructionResponse>;
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
  return (
    <div className="bg-white mb-7 border-none ">
      <div className="flex items-center py-3 ">
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
