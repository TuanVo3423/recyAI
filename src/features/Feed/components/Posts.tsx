import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { useGetTweets } from '@/api/tweets';
import { CommentModal } from './CommentModal';
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

export type TPostsProps = {};
export const Posts = ({}: TPostsProps) => {
  const { data, isLoading, isError } = useGetTweets();
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
      />
    </>
  );
};

function Post({
  id,
  username,
  userImg,
  caption,
  instruction,
  setTweetId,
  isOpen,
  onOpen,
  onClose,
}) {
  console.log('instruction: ', instruction);
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

      {instruction.steps.map((item, idx) => (
        <p key={idx} className="p-5 truncate text-md">
          {item.content}
        </p>
      ))}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4 ">
          <HeartIcon className="h-5" />
          <ChatIcon className="h-5" />
          <PaperAirplaneIcon className="h-5" />
        </div>
        <BookmarkIcon className="h-5" />
      </div>
      <form className="flex items-center p-6">
        <EmojiHappyIcon className="h-5" />
        <input
          type="text"
          placeholder="Add a comment ..."
          className="border-none flex-1 focus:ring-0 outline-none bg-gray-100 rounded-xl mx-4 p-2"
        />
        <button
          onClick={(e) => {
            e.preventDefault();
            setTweetId(id);
            onOpen();
          }}
          className="fonrt-semibold text-blue-400 text-md"
        >
          Post
        </button>
      </form>
    </div>
  );
}
