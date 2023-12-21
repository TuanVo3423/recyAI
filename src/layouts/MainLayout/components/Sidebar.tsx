import { IUser, getUserList, useGetAuth } from '@/api/auth';
import { PopoverComingSoon } from '@/components';
import { useAuth } from '@/stores';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
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
import _ from 'lodash';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

export const SideBar = () => {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profileStore = useAuth((state) => state.profile);
  const [searchResult, setSearchResult] = useState<Array<IUser>>([]);

  // Tạo hàm debounce để trì hoãn chức năng search
  const debouncedSearch = useCallback(
    _.debounce(async (e) => {
      if (e.target.value === '') {
        setSearchResult([]);
        return;
      }
      const userList = await getUserList({ name: e.target.value });
      setSearchResult(userList.users);
    }, 500),
    []
  );

  const renderSearchResult = () => {
    if (searchResult.length === 0) {
      return <p className="text-center text-gray-400">No result</p>;
    }
    return (
      <>
        {searchResult.map((user, idx) => (
          <div
            onClick={() => {
              router.push(`/user/${user._id}`);
              onClose();
            }}
            className="flex items-center cursor-pointer hover:bg-green-200 py-4"
          >
            <div className="flex flex-1 space-x-3">
              <div className="ml-5">
                <img
                  src={user.avatar || '/empty_avatar.png'}
                  alt=""
                  className="w-10 h-10 rounded-full border-[1px]"
                />
              </div>
              <div className="">
                <p className="text-md font-normal ">{user.name}</p>
                <p className="text-xs text-gray-400 ">{user.name}</p>
              </div>
            </div>

            <XIcon className="w-6 h-6 mr-10" />
          </div>
        ))}
      </>
    );
  };

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
          className={`flex justify-center space-x-2 items-center mb-4 cursor-pointer  hover:bg-green-200 py-2 pl-2 pr-[100px] rounded-xl ${
            router.pathname === '/feed' ? 'bg-green-200' : 'bg-white'
          }`}
        >
          <HomeIcon className=" h-8 w-8" />
          <p className="text-md flex-1 ">Feed</p>
        </div>

        <Popover
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          closeOnBlur={false}
          placement="left"
        >
          <PopoverTrigger>
            <div
              className={`flex justify-center space-x-2 items-center mb-4 cursor-pointer bg-white hover:bg-green-200 py-2 pl-2 pr-[100px] rounded-xl`}
            >
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
                  placeholder="Search..."
                  // value={searchInput}
                  onChange={debouncedSearch}
                  className="border-none flex-1 focus:ring-0 outline-none bg-gray-100 rounded-xl mx-4 p-2"
                />
              </div>
            </div>
            <div className=" overflow-y-auto">
              <div className="flex items-center mx-6 my-3">
                <p className="flex-1 text-md font-semibold">Recently</p>
                <p className="text-md font-semibold text-green-400">
                  Delete All
                </p>
              </div>

              {renderSearchResult()}
            </div>
          </PopoverContent>
        </Popover>

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
            router.pathname === '/collections' ? 'bg-green-200' : 'bg-white'
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
  );
};
