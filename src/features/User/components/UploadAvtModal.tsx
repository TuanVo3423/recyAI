import { updateMe } from '@/api/auth';
import { Uploader } from '@/components/Upload';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  UseDisclosureReturn,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

interface IUploadAvtModalProps extends Partial<UseDisclosureReturn> {
  refetch: any;
}

export const UploadAvtModal = ({
  isOpen,
  onOpen,
  onClose,
  refetch,
}: IUploadAvtModalProps) => {
  const [files, setFiles] = useState<any[]>([]);
  const toast = useToast();
  const { mutateAsync: handleSavePhoto } = useMutation(
    async () => {
      const res = await updateMe({ medias: files });
      return res;
    },
    {
      onSuccess: async (data) => {
        toast({
          description: data.message,
          status: 'success',
        });
        refetch();
        onClose();
        setFiles([]);
      },
      onError: (error: any) => {
        toast({
          description: error.message,
          status: 'error',
        });
      },
    }
  );
  // const handleSavePhoto = async () => {
  //   console.log('files', files);
  //   // gui di voi key la medias
  // };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent minW="70vw" minH="50vh">
        <ModalBody display="flex">
          <Uploader
            files={files}
            setFiles={setFiles}
            handleSubmitButton={
              <Button mt={2} onClick={() => handleSavePhoto()}>
                Save Photo
              </Button>
            }
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
