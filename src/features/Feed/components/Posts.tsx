import { IInstructionResponse } from '@/api/instructions';
import { useGetTweets } from '@/api/tweets';
import { Text, useDisclosure } from '@chakra-ui/react';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon
} from '@heroicons/react/outline';
import { useState } from 'react';
import { CommentModal } from './CommentModal';

export type TPostsProps = {};
export const Posts = ({}: TPostsProps) => {
  const { data, isLoading, isError, refetch } = useGetTweets();
  const [tweetId, setTweetId] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {!isLoading && (
        <div>
          {data?.tweets.map((post) => (
            <div key={post._id}>
              <Post
                id={post._id}
                setTweetId={setTweetId}
                username={'Tuan Vo'}
                userImg={
                  'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt100d13bfa8286a3d/5eb7cdc11ea0c32e33b95fa2/V_AGENTS_587x900_Breach.png'
                }
                // img={
                //   'https://images.pexels.com/photos/409696/pexels-photo-409696.jpeg?cs=srgb&dl=pexels-karol-d-409696.jpg&fm=jpg'
                // }
                comment_count={post.comment_count}
                caption={post.content}
                instruction={post.instruction}
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

export type PostProps = {
  id: string;
  username: string;
  userImg: string;
  caption: string;
  comment_count: number;
  instruction: IInstructionResponse[];
  setTweetId: (id: string) => void;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};
function Post({
  id,
  username,
  userImg,
  caption,
  instruction,
  comment_count,
  setTweetId,
  isOpen,
  onOpen,
  onClose,
}: PostProps) {
  return (
    <div className="bg-white my-7 border rounded-lg">
      <div className="flex items-center py-3 shadow-lg rounded-lg">
        <img
          src={userImg}
          className="rounded-full h-8 w-8 object-contain border p-1 mr-3 ml-4"
          alt=""
        />
        <div className="flex-1 flex">
          <p className="font-bold text-md mr-9">{username}</p>
          <p className="font-semibold text-sm">{caption}</p>
        </div>

        <DotsHorizontalIcon className="h-5 mr-6" />
      </div>
      {/* <img src={img} className="object-cover w-full shadow-sm" alt="" /> */}

      {/* <p className="p-5 truncate text-lg">
        <span className="font-bold mr-1 text-lg">{username} </span>
        {caption}
      </p> */}

      {instruction.map((item, idx) =>
        item.steps.map((step, idx) => <p key={idx}>{step.content}</p>)
      )}

      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4 ">
          <HeartIcon className="h-5" />
          <ChatIcon className="h-5" />
          <PaperAirplaneIcon className="h-5" />
        </div>
        <BookmarkIcon className="h-5" />
      </div>
      <Text
        onClick={() => {
          setTweetId(id);
          onOpen();
        }}
      >{`Xem tất cả ${comment_count}`}</Text>
      {/* <form className="flex items-center p-6">
        <EmojiHappyIcon className="h-5" />
        <input
          type="text"
          placeholder="Add a comment ..."
          className="border-none flex-1 focus:ring-0 outline-none bg-gray-100 rounded-xl mx-4 p-2"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
          }}
          className="fonrt-semibold text-blue-400 text-md"
        >
          Post
        </button>
      </form> */}
    </div>
  );
}
