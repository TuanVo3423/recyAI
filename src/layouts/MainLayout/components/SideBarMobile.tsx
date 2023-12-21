import { PopoverComingSoon } from '@/components';
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { useRouter } from 'next/router';

import {
  ArchiveIcon,
  ChatIcon,
  DocumentAddIcon,
  HomeIcon,
  MenuIcon,
  TranslateIcon,
} from '@heroicons/react/outline';
import { useAuth } from '@/stores';

type Props = {};

const SideBarMobile = (props: Props) => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profileStore = useAuth((state) => state.profile);
  return (
    <>
      <HamburgerIcon onClick={onOpen} />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="fit-content" p={8}>
          <DrawerCloseButton />
          <DrawerBody>
            <div className="h-full w-full flex flex-col items-center bg-white text-black">
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
                  className={`flex justify-center space-x-2 items-center mb-4 cursor-pointer  hover:bg-green-200 py-2 pl-2 pr-[100px] rounded-xl ${
                    router.pathname === '/feed' ? 'bg-green-200' : 'bg-white'
                  }`}
                >
                  <HomeIcon className=" h-8 w-8" />
                  <p className="text-md flex-1 ">Feed</p>
                </div>

                <div
                  onClick={() => router.push('/create-instructions')}
                  className={`flex justify-center space-x-2 items-center mb-4 cursor-pointer  hover:bg-green-200 pl-2 py-2 rounded-xl ${
                    router.pathname === '/create-instructions'
                      ? 'bg-green-200'
                      : 'bg-white'
                  }`}
                >
                  <DocumentAddIcon className="h-8 w-8" />
                  <p className="text-md flex-1">New Instruction</p>
                </div>
                <div
                  onClick={() => router.push('/collections')}
                  className={`flex space-x-2 justify-center items-center mb-4 cursor-pointer  hover:bg-green-200 pl-2 py-3 rounded-xl ${
                    router.pathname === '/collections'
                      ? 'bg-green-200'
                      : 'bg-white'
                  }`}
                >
                  <ArchiveIcon className="h-8 w-8" />
                  <p className="text-md flex-1 ">My Collection</p>
                </div>
                <div
                  onClick={() => router.push('/chat')}
                  className={`flex space-x-2 justify-center items-center mb-4 cursor-pointer  hover:bg-green-200 pl-2 py-3 rounded-xl ${
                    router.pathname === '/chat' ? 'bg-green-200' : 'bg-white'
                  }`}
                >
                  <ChatIcon className="h-8 w-8" />
                  <p className="text-md flex-1 ">Messages</p>
                </div>
                <div
                  onClick={() => router.push('/profile')}
                  className={`flex justify-center space-x-2 items-center mb-4 cursor-pointer ${
                    router.pathname === '/profile' ? 'bg-green-200' : 'bg-white'
                  } hover:bg-green-200 pl-2 py-3 rounded-xl`}
                >
                  <img
                    src={profileStore?.avatar || '/empty_avatar.png'}
                    alt="profile-pic"
                    className="h-8 w-8 rounded-full cursor-pointer"
                  />

                  <p className="text-md flex-1 ">Profile</p>
                </div>
              </div>

              <div className="mt-5 border-t-2 border-t-gray-200">
                <PopoverComingSoon>
                  <div className="flex cursor-not-allowed space-x-2 ml-1 justify-center mt-5 mb-4 items-center  pl-2 pr-[80px] bg-white hover:bg-green-200 py-3 rounded-xl ">
                    <TranslateIcon className="h-8 w-8" />
                    <p className="text-md flex-1">Language</p>
                  </div>
                </PopoverComingSoon>
                <PopoverComingSoon>
                  <div className="flex space-x-2 ml-1 justify-center items-center mb-11 cursor-not-allowed pl-2 pr-[80px] bg-white hover:bg-green-200 py-3 rounded-xl ">
                    <MenuIcon className="h-8 w-8" />
                    <p className="text-md flex-1">Setting</p>
                  </div>
                </PopoverComingSoon>
              </div>
            </div>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideBarMobile;
