import {
  HeartIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  SearchIcon,
  UserGroupIcon, LogoutIcon, DocumentAddIcon
} from '@heroicons/react/outline';
import { HomeIcon } from '@heroicons/react/solid';
import Image from 'next/image';

export const Header = () => {
  return (
    <div className="fixed top-0 left-0 h-full flex flex-col items-center bg-white w-[365px] text-black p-4 border-r-[2px] border-r-gray-200">
      <div className='-ml-[140px] my-9 cursor-pointer'>
      <Image
            alt="insta-letter"
            src="https://links.papareact.com/ocw"
            width={160}
            height={30}
            style={{ objectFit: 'contain' }}
          />
      </div>
      <div className='mt-10'>
      <div className='flex justify-center items-center mb-11 cursor-pointer bg-white hover:bg-gray-200 px-3 py-3 rounded-xl pr-[200px] '>
      <HomeIcon className="flex-1 navBtn h-11 w-11" />
      <p className='text-2xl font-semibold ml-5 -mr-5'> Feed</p>
      </div>
      <div className='flex justify-center items-center mb-11 cursor-pointer bg-white hover:bg-gray-200 px-3 py-3 rounded-xl pr-[100px]'>
      <DocumentAddIcon className="flex-1 navBtn h-11 w-11" />
      <p className='text-2xl font-semibold ml-5 -mr-5' > Create Projects</p>
      </div>
      <div className='flex justify-center items-center mb-11 cursor-pointer bg-white hover:bg-gray-200 px-3 py-3 rounded-xl pr-[180px]'>
      <LogoutIcon className="flex-1 navBtn h-11 w-11" />
      <p className='text-2xl font-semibold ml-5 -mr-5'> Log out</p>
      </div>
      <div className='flex justify-center items-center mb-11 cursor-pointer bg-white hover:bg-gray-200 px-3 py-3 rounded-xl pr-[180px] pl-6'>
      <img
            src="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltaec838cb8cfa46a1/632d2ed604361d715f55321f/09262022_AgentInsightsPhoenixArticle_Phoenix_Portrait_In-Line_FINAL.jpg"
            alt="profile-pic"
            className="h-10 w-10 rounded-full cursor-pointer"
          />
          
      <p className='text-2xl font-semibold ml-8'> Profile</p>
      </div>
      
      </div>

      <div className='mt-16 border-t-2 border-t-gray-200'>
      <div className='flex justify-center mt-10 items-center mb-11 cursor-pointer bg-white hover:bg-gray-200 px-3 py-3 rounded-xl pr-[180px]'>
      <MenuIcon className="flex-1 navBtn h-11 w-11" />
      <p className='text-2xl font-semibold ml-5 -mr-5'> Settings</p>
      </div>
      </div>
      
    </div>
  );
};
