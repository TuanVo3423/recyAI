import { useGetAuth } from '@/api/auth';
import { PlusCircleIcon } from '@heroicons/react/solid';
type Props = {};

export const UserInfo = (props: Props) => {
  const { data, isLoading } = useGetAuth();
  return (
    <>
      {!isLoading && (
        <div className="flex items-center justify-center lg:space-x-20 ml-20 mt-16 ">
          <div className='relative'>
            <img
              src="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltaec838cb8cfa46a1/632d2ed604361d715f55321f/09262022_AgentInsightsPhoenixArticle_Phoenix_Portrait_In-Line_FINAL.jpg"
              alt=""
              className="rounded-full border p-[2px] hidden lg:block w-32"
            />
            <PlusCircleIcon className='absolute w-8 h-8 top-2 left-24 hover:text-gray-400 cursor-pointer bg-white rounded-full'/>
          </div>
          <div className="-mt-5">
            <div className="flex items-center justify-center space-x-3">
              <p className="mt-3 mr-20 text-xl lg:text-xl">
                {data.result.name}
              </p>
              <button className="bg-green-200 hover:bg-green-400 text-black w-[200px] h-[30px] rounded-xl text-sm font-semibold mt-2">
                Chinh sua trang ca nhan
              </button>
              <button className="bg-green-200 hover:bg-green-400 text-black w-[150px] h-[30px] rounded-xl text-sm font-semibold mt-2">
                Xem kho luu tru
              </button>
            </div>
            <div className="flex justify-center items-center text-lg my-8 space-x-32">
              <p>
                <span className="font-bold">9</span> Post
              </p>
              <p>
                <span className="font-bold">100</span> Followers
              </p>
              <p>
                <span className="font-bold">100</span> Followings
              </p>
            </div>
            <div className="text-lg font-semibold mb-5">
              {data.result.email}
            </div>
            <div className="text-lg">Tieu su ban than</div>
          </div>
        </div>
      )}
    </>
  );
};
