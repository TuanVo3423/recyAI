import { useGetAuth } from '@/api/auth';
import { PROJECT_AUTH_TOKEN } from '@/constants';
import { LocalStorage } from '@/services/localStorage';
import {
  useDisclosure,
  Button,
  ButtonGroup,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Box,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import {
  ArchiveIcon,
  ChatIcon,
  DocumentAddIcon,
  HomeIcon,
  MenuIcon,
  SearchIcon,
  TranslateIcon,
  XIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React from 'react';

export const SideBar = () => {
  const router = useRouter();
  const { isOpen, onToggle, onClose } = useDisclosure();
  const { data, isLoading, refetch } = useGetAuth();
  const initRef = React.useRef();

  return (
    <div className="fixed top-0 left-0 h-full w-[250px] flex flex-col items-center bg-white text-black p-4 border-r-[1px] border-r-gray-200">
      <div className="-ml-[60px] my-4 cursor-pointer">
        <img
          src="https://yesrecycling.org/wp-content/uploads/2022/02/Yes-Recycling_Logo-green.png"
          alt=""
          className="w-[120px]"
        />
      </div>
      <div className="mt-10 flex-col">
        <div
          onClick={() => router.push('/feed')}
          className="flex justify-center space-x-2 items-center mb-4 cursor-pointer bg-white hover:bg-green-200 py-2 pl-2 pr-[100px] rounded-xl   "
        >
          <HomeIcon className=" h-8 w-8" />
          <p className="text-md flex-1 ">Feed</p>
        </div>

        <Popover closeOnBlur={false} placement="left" initialFocusRef={initRef}>
          {({ isOpen, onClose }) => (
            <>
              <PopoverTrigger>
                <div className="flex justify-center space-x-2 items-center mb-4 cursor-pointer bg-white hover:bg-green-200 py-2 pl-2 pr-[100px] rounded-xl   ">
                  <SearchIcon className=" h-8 w-8" />
                  <p className="text-md flex-1">Search</p>
                </div>
              </PopoverTrigger>
              {/* <PopoverCloseButton className=''/> */}
              <PopoverContent className=" -ml-20  mt-10 h-[320px] bg-gray-500">
                <div className="border-b-[1px] border-gray-300">
                  <p className="text-xl font-semibold ml-5 my-6">Search</p>
                  <div className="flex mb-6">
                    <input
                      type="text"
                      placeholder="Searching ..."
                      className="border-none flex-1 focus:ring-0 outline-none bg-gray-100 rounded-xl mx-4 p-2"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center mx-6 my-3">
                    <p className="flex-1 text-md font-semibold">Recently</p>
                    <p className="text-md font-semibold text-green-400">
                      Delete All
                    </p>
                  </div>
                  <div className="flex items-center cursor-pointer hover:bg-green-200 py-4">
                    <div className="flex flex-1 space-x-3">
                      <div className="ml-5">
                        <img
                          src="https://mcdn.coolmate.me/image/March2023/meme-meo-2.jpg"
                          alt=""
                          className="w-10 h-10 rounded-full border-[1px]"
                        />
                      </div>
                      <div className="">
                        <p className="text-md font-normal ">pupuchino</p>
                        <p className="text-xs text-gray-400 ">
                          Ha Canh Hong Phuc
                        </p>
                      </div>
                    </div>

                    <XIcon className="w-6 h-6 mr-10" />
                  </div>
                </div>
              </PopoverContent>
            </>
          )}
        </Popover>

        <div
          onClick={() => router.push('/create-instructions')}
          className="flex justify-center space-x-2 items-center mb-4 cursor-pointer bg-white hover:bg-green-200 pl-2 py-2 rounded-xl  "
        >
          <DocumentAddIcon className="h-8 w-8" />
          <p className="text-md flex-1"> New Instruction</p>
        </div>
        <div
          onClick={() => router.push('/collections')}
          className="flex space-x-2 justify-center items-center mb-4 cursor-pointer bg-white hover:bg-green-200 pl-2 py-3 rounded-xl "
        >
          <ArchiveIcon className="h-8 w-8" />
          <p className="text-md flex-1 ">My Collection</p>
        </div>
        <div
          onClick={() => router.push('/chat')}
          className="flex space-x-2 justify-center items-center mb-4 cursor-pointer bg-white hover:bg-green-200 pl-2 py-3 rounded-xl "
        >
          <ChatIcon className="h-8 w-8" />
          <p className="text-md flex-1 ">Messages</p>
        </div>
        <div
          onClick={() => router.push('/profile')}
          className="flex justify-center space-x-2 items-center mb-4 cursor-pointer bg-white hover:bg-green-200 pl-2 py-3 rounded-xl  "
        >
          <img
            src={data.result.avatar || '/empty-avatar.png'}
            alt="profile-pic"
            className="h-8 w-8 rounded-full cursor-pointer"
          />

          <p className="text-md flex-1 ">Profile</p>
        </div>
      </div>

      <div className="mt-5 border-t-2 border-t-gray-200">
        <div className="flex space-x-2 ml-1 justify-center mt-5 mb-4 items-center cursor-pointer pl-2 pr-[80px] bg-white hover:bg-green-200 py-3 rounded-xl ">
          <TranslateIcon className="h-8 w-8" />
          <p className="text-md flex-1">Language</p>
        </div>
        <div className="flex space-x-2 ml-1 justify-center items-center mb-11 cursor-pointer pl-2 pr-[80px] bg-white hover:bg-green-200 py-3 rounded-xl ">
          <MenuIcon className="h-8 w-8" />
          <p className="text-md flex-1">Setting</p>
        </div>
      </div>
    </div>
  );
};
