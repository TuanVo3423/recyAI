import { Uploader } from '@/components/Upload';
import { useAuth } from '@/stores';
import { TextAreaInputFieldWithoutLabel } from '@/ui-kit';
import {
  Box,
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  UseDisclosureProps,
} from '@chakra-ui/react';
import { PhotographIcon } from '@heroicons/react/outline';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
interface TPostCollectionModalProps extends UseDisclosureProps {
  instructionId?: string;
  PostCollectionModalStatus: UseDisclosureProps;
  onSubmit: any;
  form: any;
  files: any;
  setFiles: any;
  isLoadingShare: boolean;
}

export const PostCollectionModal = ({
  instructionId,
  PostCollectionModalStatus,
  form,
  onSubmit,
  files,
  setFiles,
  isLoadingShare,
}: TPostCollectionModalProps) => {
  const { handleSubmit } = form;
  const queryClient = useQueryClient();

  const data: any = queryClient.getQueryData('getMyCollections');
  const profileStore = useAuth((state) => state.profile);

  const currentInstruction = data?.instructions.filter(
    (item) => item._id === instructionId
  )[0];
  return (
    <Modal
      isOpen={PostCollectionModalStatus.isOpen}
      onClose={PostCollectionModalStatus.onClose}
    >
      <ModalOverlay />
      <ModalContent overflow="hidden" w="70vw" maxW="none">
        <ModalBody p={0} w="full">
          <div className="flex justify-center">
            <div className="bg-white border-r-[1px] w-[55%] py-[62px] px-[30px]">
              <Heading mb={4} size="md">
                Các bước hướng dẫn:
              </Heading>
              {currentInstruction &&
                currentInstruction.steps.map((step: any, idx: number) => (
                  <Text key={idx}>{step.content}</Text>
                ))}
            </div>
            <Box
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              bg="white"
              w="45%"
              padding="0 20px"
            >
              <div>
                <div className="flex items-center py-3 border-b-[1px]">
                  <img
                    src={profileStore.avatar || 'empty_avatar.png'}
                    className="rounded-full h-8 w-8 object-contain border p-1 mr-3"
                    alt=""
                  />
                  <div className="flex-1 flex">
                    <p className="font-semibold text-sm mr-9">
                      {profileStore && profileStore.name}
                    </p>
                  </div>

                  <Button
                    isLoading={isLoadingShare}
                    type="submit"
                    bg="green.400"
                    color="white"
                  >
                    Share
                  </Button>
                </div>
              </div>
              <div className="w-full">
                <TextAreaInputFieldWithoutLabel
                  form={form}
                  name="content"
                  placeholder="Enter content..."
                  type={'text'} // type="text"
                />
              </div>
              <div className="flex items-center space-x-2 mt-4">
                {/* <PhotographIcon className="w-6 h-6 " />
                <p className="text-sm text-blue-400 cursor-pointer hover:text-blue-900">
                  Add Photos
                </p> */}
                <Uploader files={files} setFiles={setFiles} />
              </div>
              {/* <div className="flex items-center space-x-64 border-b-[1px] pb-2">
                <EmojiHappyIcon className="h-6 cursor-pointer w-6 ml-4 text-gray-400" />
                <p className="text-xs text-gray-400">0/2.200</p>
              </div>
              <div className="pb-8">
                <div className="h-12 items-center justify-center flex border-b-[1px]">
                  <input
                    type="text"
                    placeholder="Them vi tri"
                    className=" flex-1 rounded-3xl focus:ring-0 h-auto border-none "
                  />
                  <ArrowDownIcon className="w-5 h-5 mr-4" />
                </div>
                <div className="h-12 items-center justify-center flex border-b-[1px] cursor-pointer">
                  <p className="flex-1 ml-4">Tro nang</p>
                  <ArrowDownIcon className="w-5 h-5 mr-4" />
                </div>
                <div className="h-12 items-center justify-center flex border-b-[1px] cursor-pointer">
                  <p className="flex-1 ml-4">Cai dat</p>
                  <ArrowDownIcon className="w-5 h-5 mr-4" />
                </div>
              </div> */}
            </Box>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
