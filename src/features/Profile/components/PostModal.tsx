import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  UseDisclosureProps,
} from '@chakra-ui/react';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
interface TPostModalProps extends UseDisclosureProps {
  instructionId?: string;
}

export const PostModal = ({
  onClose,
  instructionId,
  isOpen,
  onOpen,
}: TPostModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <div className="flex w-fit h-fit">
          <div className="bg-gray-200 w-[200px] h-[640px]"></div>
          <div className="bg-white w-[400px] h-[640px]">
            <div>
              <div className="flex items-center py-3 border-b-[1px]">
                <img
                  src={
                    'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt100d13bfa8286a3d/5eb7cdc11ea0c32e33b95fa2/V_AGENTS_587x900_Breach.png'
                  }
                  className="rounded-full h-8 w-8 object-contain border p-1 mr-3 ml-4"
                  alt=""
                />
                <div className="flex-1 flex">
                  <p className="font-bold text-sm mr-9">Papa</p>
                  <p className="font-semibold text-sm">cap</p>
                </div>

                <DotsHorizontalIcon className="h-5 mr-6" />
              </div>
            </div>
            <div className="h-[460px]">
              <div className="flex items-center py-3">
                <img
                  src={
                    'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt100d13bfa8286a3d/5eb7cdc11ea0c32e33b95fa2/V_AGENTS_587x900_Breach.png'
                  }
                  className="rounded-full h-8 w-8 object-contain border p-1 mr-3 ml-4"
                  alt=""
                />
                <div className="flex-1">
                  <div className="flex">
                    <p className="font-bold text-sm mr-2">Pupu</p>
                    <p className="text-sm mr-5">comment ne`</p>
                  </div>
                  <div className="flex space-x-4">
                    <p className="text-xs font-medium text-gray-400">4 hours</p>
                    <p className="text-xs font-medium text-gray-400">5 Likes</p>
                  </div>
                </div>
                <div className="flex space-x-2 mr-6">
                  <HeartIcon className="h-4 w-4 cursor-pointer" />
                  <DotsHorizontalIcon className="h-4 w-4 cursor-pointer" />
                </div>
              </div>
            </div>
            <div className="border-t-[1px]">
              <div className="flex justify-between px-4 pt-4">
                <div className="flex space-x-4 ">
                  <HeartIcon className="h-5" />
                  <ChatIcon className="h-5" />
                  <PaperAirplaneIcon className="h-5" />
                </div>
                <BookmarkIcon className="h-5" />
              </div>
              <form className="flex items-center p-6">
                <EmojiHappyIcon className="h-5" />
                <input
                  type="text"
                  placeholder="Add a comment ..."
                  className="border-none flex-1 focus:ring-0 outline-none bg-gray-100 rounded-xl mx-4 p-2"
                />
                <button className="fonrt-semibold text-blue-400 text-md">
                  Post
                </button>
              </form>
            </div>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
};
