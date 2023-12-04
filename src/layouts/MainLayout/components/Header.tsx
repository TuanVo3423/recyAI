import {
  ArchiveIcon,
  DocumentAddIcon,
  MenuIcon
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';

export const Header = () => {
  const router = useRouter();
  return (
    <div className="fixed top-0 left-0 h-full w-[250px] flex flex-col items-center bg-white text-black p-4 border-r-[1px] border-r-gray-200">
      <div className="-ml-[60px] my-4 cursor-pointer">
        <Image
          alt="insta-letter"
          src="https://links.papareact.com/ocw"
          width={120}
          height={30}
          style={{ objectFit: 'contain' }}
        />
      </div>
      <div className="mt-10 flex-col">
        <div
          onClick={() => router.push('/feed')}
          className="flex justify-center space-x-2 items-center mb-11 cursor-pointer bg-white hover:bg-gray-200 py-2 pl-2 pr-[100px] rounded-xl   "
        >
          <HomeIcon className=" h-8 w-8" />
          <p className="text-md flex-1 ">Feed</p>
        </div>
        <div
          onClick={() => router.push('/create-instructions')}
          className="flex justify-center space-x-2 items-center mb-11 cursor-pointer bg-white hover:bg-gray-200 pl-2 py-2 rounded-xl  "
        >
          <DocumentAddIcon className="h-8 w-8" />
          <p className="text-md flex-1"> New Instruction</p>
        </div>
        <div
          onClick={() => router.push('/collections')}
          className="flex space-x-2 justify-center items-center mb-11 cursor-pointer bg-white hover:bg-gray-200 pl-2 py-3 rounded-xl "
        >
          <ArchiveIcon className="h-8 w-8" />
          <p className="text-md flex-1 ">My Collection</p>
        </div>
        <div
          onClick={() => router.push('/profile')}
          className="flex justify-center space-x-2 items-center mb-11 cursor-pointer bg-white hover:bg-gray-200 pl-2 py-3 rounded-xl  "
        >
          <img
            src="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltaec838cb8cfa46a1/632d2ed604361d715f55321f/09262022_AgentInsightsPhoenixArticle_Phoenix_Portrait_In-Line_FINAL.jpg"
            alt="profile-pic"
            className="h-8 w-8 rounded-full cursor-pointer"
          />

          <p className="text-md flex-1 "> Profile</p>
        </div>
      </div>

      <div className="mt-16 border-t-2 border-t-gray-200">
        <div className="flex space-x-2 ml-1 justify-center mt-10 items-center mb-11 cursor-pointer pl-2 pr-[80px] bg-white hover:bg-gray-200 py-3 rounded-xl ">
          <MenuIcon className="h-8 w-8" />
          <p className="text-md flex-1"> Setting</p>
        </div>
      </div>
    </div>
  );
};
