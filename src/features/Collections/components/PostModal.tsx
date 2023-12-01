import Form from '@/theme/components/form';
import { useForm } from 'react-hook-form';
import { InputField } from '@/ui-kit';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  UseDisclosureProps,
} from '@chakra-ui/react';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
  ArrowDownIcon
} from '@heroicons/react/outline';
import { useQueryClient } from 'react-query';
interface TPostModalProps extends UseDisclosureProps {
  instructionId?: string;
}

export const PostModal = ({
  onClose,
  instructionId,
  isOpen,
  onOpen,
}: TPostModalProps) => {
  const queryClient = useQueryClient();
  const data: any = queryClient.getQueryData('getMyCollections');
  const currentInstruction = data?.instructions.filter(
    (item) => item._id === instructionId
  )[0];
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent overflow="hidden" w="60vw" maxW="none">
        <ModalBody p={0} w="full">
          <div className="flex justify-center ">
            <div className="bg-white border-r-[1px]  w-[60%] py-[62px] px-[30px]">
              {currentInstruction &&
                currentInstruction.steps.map((step: any, idx: number) => (
                  <Text>{step.content}</Text>
                ))}
            </div>
            <div className="bg-white w-[40%]">
              <div>
                <div className="flex items-center py-3 border-b-[1px]">
                  <img
                    src={
                      'https://shophotproperties.com/cdn/shop/products/IMG_8557_grande.jpg?v=1503263004'
                    }
                    className="rounded-full h-8 w-8 object-contain border p-1 mr-3 ml-2"
                    alt=""
                  />
                  <div className="flex-1 flex">
                    <p className="font-semibold text-sm mr-9">Papa</p>

                  </div>

                  <p className="font-semibold text-blue-400 cursor-pointer hover:text-blue-950 text-sm mr-9">Chia se</p>
                </div>
              </div>
              <div className='h-[260px] mt-5 '>

                <input type="text" placeholder='Viet gi do . . .' className='w-[335px] rounded-3xl focus:ring-0 h-auto border-none ' />

              </div>
              <div className='flex items-center space-x-64 border-b-[1px] pb-2'>
                    <EmojiHappyIcon className='h-6 cursor-pointer w-6 ml-4 text-gray-400'/>
                    <p className='text-xs text-gray-400'>0/2.200</p>
              </div>
              <div className='pb-8'>
              <div className='h-12 items-center justify-center flex border-b-[1px]'>
              <input type="text" placeholder='Them vi tri' className=' flex-1 rounded-3xl focus:ring-0 h-auto border-none ' />
                    <ArrowDownIcon className='w-5 h-5 mr-4'/>
              </div>
              <div className='h-12 items-center justify-center flex border-b-[1px] cursor-pointer'>
              <p className='flex-1 ml-4'>Tro nang</p>
                    <ArrowDownIcon className='w-5 h-5 mr-4'/>
              </div>
              <div className='h-12 items-center justify-center flex border-b-[1px] cursor-pointer'>
              <p className='flex-1 ml-4'>Cai dat</p>
                    <ArrowDownIcon className='w-5 h-5 mr-4'/>
              </div>
              </div>
              
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
