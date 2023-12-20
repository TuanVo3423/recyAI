import { useGetAuth } from '@/api/auth';
import { Text, useDisclosure } from '@chakra-ui/react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { UploadAvtModal } from './UploadAvtModal';
import { UpdateProfileModal } from './UpdateProfileModal';
import { useRouter } from 'next/router';
import { UserVerifyStatus } from '@/types';
import { useQueryClient } from 'react-query';
type Props = {};

export const UserInfo = (props: Props) => {
  const router = useRouter();
  const { data, isLoading, refetch } = useGetAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenUpdateProfile,
    onOpen: onOpenUpdateProfile,
    onClose: onCloseUpdateProfile,
  } = useDisclosure();

  return (
    <>
      {!isLoading && (
        <div className="flex items-center justify-center lg:space-x-20 ml-20 mt-16 ">
          <div
            onClick={onOpen}
            className="relative rounded-full border p-[2px] w-[150px] h-[150px] overflow-hidden"
          >
            <img
              src={data.user.avatar || '/empty_avatar.png'}
              alt=""
              className="w-full h-full object-cover"
            />
            <PlusCircleIcon className="absolute w-8 h-8 top-14 left-16 hover:text-gray-400 cursor-pointer bg-transparent rounded-full" />
          </div>
          <div className="-mt-5">
            <div className="flex items-center justify-center space-x-3">
              <p className="mt-3 mr-20 text-xl lg:text-xl">{data.user.name}</p>
              <button
                onClick={() => onOpenUpdateProfile()}
                className="bg-green-200 hover:bg-green-400 text-black w-[200px] h-[30px] rounded-xl text-sm font-semibold mt-2"
              >
                Chinh sua trang ca nhan
              </button>
              <button
                onClick={() => router.push('/collections')}
                className="bg-green-200 hover:bg-green-400 text-black w-[150px] h-[30px] rounded-xl text-sm font-semibold mt-2"
              >
                Xem kho luu tru
              </button>
            </div>
            <div className="flex justify-center items-center text-lg my-8 space-x-32 ">
              <p>
                <span className="font-bold ">{data.user.tweets.length}</span>{' '}
                Post
              </p>
              <p className="cursor-pointer">
                <span className="font-bold">
                  {data.user.followerIds.length}
                </span>{' '}
                Followers
              </p>
              <p className="cursor-pointer">
                <span className="font-bold">{data.user.followIds.length}</span>{' '}
                Followings
              </p>
            </div>
            <div className="text-lg font-semibold mb-5">
              {data.user.email}
              {data.user.verify !== UserVerifyStatus.Verified && (
                <button
                  onClick={() => router.push('/auth/verify-email')}
                  className="ml-10 bg-green-200 hover:bg-green-400 text-black w-[120px] h-[30px] rounded-xl text-sm font-semibold mt-2"
                >
                  Verify email!
                </button>
              )}
            </div>
            <Text as="em">{data.user.bio || 'Tieu su ban than'}</Text>
          </div>
        </div>
      )}
      <UploadAvtModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        refetch={refetch}
      />
      <UpdateProfileModal
        refetch={refetch}
        isOpen={isOpenUpdateProfile}
        onClose={onCloseUpdateProfile}
        onOpen={onOpenUpdateProfile}
      />
    </>
  );
};
