import { useGetAuth } from '@/api/auth';
import { useDisclosure } from '@chakra-ui/react';
import { PlusCircleIcon } from '@heroicons/react/solid';
import { UploadAvtModal } from './UploadAvtModal';
import { UpdateProfileModal } from './UpdateProfileModal';
type Props = {};

export const UserInfo = (props: Props) => {
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
              src={data.result[0].avatar || '/empty_avatar.png'}
              alt=""
              className="w-full h-full object-cover"
            />
            <PlusCircleIcon className="absolute w-8 h-8 top-14 left-16 hover:text-gray-400 cursor-pointer bg-transparent rounded-full" />
          </div>
          <div className="-mt-5">
            <div className="flex items-center justify-center space-x-3">
              <p className="mt-3 mr-20 flex items-center text-xl lg:text-xl">
                {data.result[0].name}
                <img
              src={'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Eo_circle_green_white_checkmark.svg/2048px-Eo_circle_green_white_checkmark.svg.png'}
              alt=""
              className="w-4 h-4 rounded-full cursor-pointer"
            />
              <img
              src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYrpGhmTgESFbJ6kj8axLV0Vn1KjgeInvuhS84RNURfA&s'}
              alt=""
              className="w-4 h-4 rounded-full cursor-pointer"
            />
              </p>
              
              <button
                onClick={() => onOpenUpdateProfile()}
                className="bg-green-200 hover:bg-green-400 text-black w-[200px] h-[30px] rounded-xl text-sm font-semibold mt-2"
              >
                Chinh sua trang ca nhan
              </button>
              <button className="bg-green-200 hover:bg-green-400 text-black w-[150px] h-[30px] rounded-xl text-sm font-semibold mt-2">
                Xem kho luu tru
              </button>
            </div>
            <div className="flex justify-center items-center text-lg my-8 space-x-32 ">
              <p>
                <span className="font-bold ">9</span> Post
              </p>
              <p className="cursor-pointer">
                <span className="font-bold">100</span> Followers
              </p>
              <p className="cursor-pointer">
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
      <UpdateProfileModal
        isOpen={isOpenUpdateProfile}
        onClose={onCloseUpdateProfile}
        onOpen={onOpenUpdateProfile}
      />
    </>
  );
};
