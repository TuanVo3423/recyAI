import { follow, unFollow, useGetUser } from '@/api/auth';
import { useAuth } from '@/stores';
import { Text, useDisclosure, useToast } from '@chakra-ui/react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { UploadAvtModal } from './UploadAvtModal';
import { useState } from 'react';
type Props = {};

export const UserInfo = (props: Props) => {
  const router = useRouter();
  const toast = useToast();
  const profileStore = useAuth((state) => state.profile);
  const [isFollowed, setIsFollowed] = useState<boolean | null>();
  const { data, isLoading, refetch } = useGetUser(router.query.userId[0], {
    enabled: !!router.query.userId[0],
    onSuccess: async (data) => {
      setIsFollowed(
        data.user.followerIds.some(
          (item: any) => item.user_id === profileStore._id
        )
      );
    },
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutateAsync: handleFollow, isSuccess } = useMutation(
    async () => {
      const res = await follow({ followed_user_id: router.query.userId[0] });
      return res;
    },
    {
      onSuccess: async (data: any) => {
        toast({
          description: data.message,
          status: 'success',
        });
        setIsFollowed(true);
      },
      onError: (error: any) => {
        toast({
          description: error.message,
          status: 'error',
        });
      },
    }
  );
  const { mutateAsync: handleUnFollow } = useMutation(
    async () => {
      const res = await unFollow({ followed_user_id: router.query.userId[0] });
      return res;
    },
    {
      onSuccess: async (data: any) => {
        toast({
          description: data.message,
          status: 'success',
        });
        setIsFollowed(false);
      },
      onError: (error: any) => {
        toast({
          description: error.message,
          status: 'error',
        });
      },
    }
  );

  const renderButton = () => {
    // const isFollowed = data.user.followerIds.some(
    //   (item: any) => item.user_id === profileStore._id
    // );
    if (isFollowed) {
      return (
        <button
          onClick={() => handleUnFollow()}
          className="bg-green-200 hover:bg-green-400 text-black w-[200px] h-[30px] rounded-xl text-sm font-semibold mt-2"
        >
          Hủy theo dõi
        </button>
      );
    } else {
      return (
        <button
          onClick={() => handleFollow()}
          className="bg-green-200 hover:bg-green-400 text-black w-[200px] h-[30px] rounded-xl text-sm font-semibold mt-2"
        >
          Theo dõi
        </button>
      );
    }
  };
  if (!isLoading) {
    renderButton();
  }
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
              {profileStore._id !== data.user._id && (
                <>
                  {renderButton()}
                  <button
                    onClick={() => router.push('/chat')}
                    className="bg-green-200 hover:bg-green-400 text-black w-[150px] h-[30px] rounded-xl text-sm font-semibold mt-2"
                  >
                    Nhắn tin
                  </button>
                </>
              )}
            </div>
            <div className="flex justify-center items-center text-lg my-8 space-x-32">
              <p>
                <span className="font-bold">{data.user.tweets.length}</span>{' '}
                Post
              </p>
              <p>
                <span className="font-bold">
                  {data.user.followerIds.length}
                </span>{' '}
                Followers
              </p>
              <p>
                <span className="font-bold">{data.user.followIds.length}</span>{' '}
                Followings
              </p>
            </div>
            <div className="text-lg font-semibold mb-5">{data.user.email}</div>
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
    </>
  );
};
