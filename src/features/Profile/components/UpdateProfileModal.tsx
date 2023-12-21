import { updateMe } from '@/api/auth';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  UseDisclosureReturn,
  useToast,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

interface IUpdateProfileModalProps extends Partial<UseDisclosureReturn> {
  refetch: any;
}

export const UpdateProfileModal = ({
  isOpen,
  onClose,
  onOpen,
  refetch,
}: IUpdateProfileModalProps) => {
  const toast = useToast();
  const [updateData, setUpdateData] = useState({
    name: '',
    bio: '',
  });
  const { mutateAsync, isLoading } = useMutation(
    async () => {
      const res = await updateMe({
        name: updateData.name,
        bio: updateData.bio,
      });
      return res;
    },
    {
      onSuccess: (data) => {
        onClose();
        refetch();
        toast({
          description: data.message,
          status: 'success',
        });
        setUpdateData({
          name: '',
          bio: '',
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
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent overflow="hidden" w="40vw" maxH="90vh" maxW="none">
        <ModalBody p={0} w="full">
          <div className="bg-white w-full flex items-center justify-center">
            <div>
              <div className="flex justify-center items-center mt-6 mb-6">
                <p className="text-2xl font-semibold">Edit Profile</p>
              </div>

              <div className="flex mb-6 mt-5">
                <p className="font-semibold flex-1">Name</p>
                <input
                  value={updateData.name}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, name: e.target.value })
                  }
                  type="text"
                  placeholder="Editing your name ..."
                  className="border-none flex-1 focus:ring-0 w-[400px] outline-none bg-gray-100 rounded-xl mx-4 p-2"
                />
              </div>
              <div className="flex">
                <p className="font-semibold flex-1">About you</p>
                <textarea
                  value={updateData.bio}
                  onChange={(e) =>
                    setUpdateData({ ...updateData, bio: e.target.value })
                  }
                  placeholder="Write something about you ..."
                  className="border-none flex-1 focus:ring-0 outline-none bg-gray-100 rounded-xl mx-4 p-2"
                />
              </div>
              <div className="flex items-center justify-center mt-10">
                <Button
                  isLoading={isLoading}
                  onClick={() => mutateAsync()}
                  w="100px"
                  h="50px"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  rounded="3xl"
                  bg="green.400"
                  _hover={{ bg: 'green.900' }}
                  cursor="pointer"
                  mb="8"
                  color="white"
                  fontWeight="semibold"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
