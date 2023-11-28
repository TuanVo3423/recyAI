import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { useGetTweets } from '@/api/tweets';

export const Posts = () => {
  const { data, isLoading, isError } = useGetTweets();

  return (
    <>
      {!isLoading && (
        <div>
          {data?.tweets.map((post) => (
            <div key={post._id}>
              <Post
                id={post._id}
                username={'Tuan Vo'}
                userImg={
                  'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt100d13bfa8286a3d/5eb7cdc11ea0c32e33b95fa2/V_AGENTS_587x900_Breach.png'
                }
                img={
                  'https://images.pexels.com/photos/409696/pexels-photo-409696.jpeg?cs=srgb&dl=pexels-karol-d-409696.jpg&fm=jpg'
                }
                caption={post.content}
                instruction={post.instruction}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

function Post({ id, username, userImg, img, caption, instruction }) {
  console.log('instruction: ', instruction);
  return (
    <div className="bg-white my-7 border rounded-lg">
      <div className="flex items-center p-5 shadow-lg rounded-lg">
        <img
          src={userImg}
          className="rounded-full h-14 w-14 object-contain border p-1 mr-3"
          alt=""
        />
        <p className="flex-1 font-bold text-lg">{username}</p>
        <DotsHorizontalIcon className="h-8" />
      </div>
      <img src={img} className="object-cover w-full shadow-sm" alt="" />
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4 ">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="btn" />
        </div>
        <BookmarkIcon className="btn" />
      </div>

      <p className="p-5 truncate text-lg">
        <span className="font-bold mr-1 text-lg">{username} </span>
        {caption}
      </p>

      {instruction.steps.map((item, idx) => (
        <p key={idx} className="p-5 truncate text-lg">
          {item.content}
        </p>
      ))}

      <form className="flex items-center p-6">
        <EmojiHappyIcon className="h-8" />
        <input
          type="text"
          placeholder="Add a comment ..."
          className="border-none flex-1 focus:ring-0 outline-none bg-gray-100 rounded-xl mx-4 p-3"
        />
        <button className="fonrt-semibold text-blue-400 text-lg">Post</button>
      </form>
    </div>
  );
}
