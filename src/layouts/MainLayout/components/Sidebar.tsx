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
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React from 'react';

export const SideBar = () => {
  const router = useRouter();
  const { isOpen, onToggle, onClose } = useDisclosure();
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
              <PopoverContent>
                <PopoverCloseButton />
                <PopoverBody>
                  <Box>
                    Hello. Nice to meet you! This is the body of the popover
                  </Box>
                </PopoverBody>
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
            src="https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/bltaec838cb8cfa46a1/632d2ed604361d715f55321f/09262022_AgentInsightsPhoenixArticle_Phoenix_Portrait_In-Line_FINAL.jpg"
            alt="profile-pic"
            className="h-8 w-8 rounded-full cursor-pointer"
          />

          <p className="text-md flex-1 "> Profile</p>
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
