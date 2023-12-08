import { follow, useGetUser } from '@/api/auth';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { UploadAvtModal } from './UploadAvtModal';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { useAuth } from '@/stores';
type Props = {};

export const UserInfo = (props: Props) => {
  const router = useRouter();
  const toast = useToast();
  const profileStore = useAuth((state) => state.profile);
  const { data, isLoading, refetch } = useGetUser(router.query.userId[0], {
    enabled: !!router.query.userId[0],
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
    const isFollowed = data.result[0].followerIds.some(
      (item: any) => item.user_id === profileStore.result[0]._id
    );
    if (isFollowed) {
      return (
        <button
          onClick={() => handleFollow()}
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
              src={data.result[0].avatar || '/empty_avatar.png'}
              alt=""
              className="w-full h-full object-cover"
            />
            <PlusCircleIcon className="absolute w-8 h-8 top-14 left-16 hover:text-gray-400 cursor-pointer bg-transparent rounded-full" />
          </div>
          <div className="-mt-5">
            <div className="flex items-center justify-center space-x-3">
              <p className="mt-3 mr-20 text-xl lg:text-xl">
                {data.result[0].name}
              </p>
              {renderButton()}
              <button className="bg-green-200 hover:bg-green-400 text-black w-[150px] h-[30px] rounded-xl text-sm font-semibold mt-2">
                Nhắn tin
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
      <UploadAvtModal
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
        refetch={refetch}
      />
    </>
  );
};