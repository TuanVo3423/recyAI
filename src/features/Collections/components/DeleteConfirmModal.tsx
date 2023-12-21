import { deleteInstruction } from '@/api/instructions';
import { deleteTweetByInstruction } from '@/api/tweets';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UseDisclosureProps,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import React from 'react';
import { useMutation } from 'react-query';

type TDeleteConfirmModalProps = {
  DeleteConfirmModalStatus: UseDisclosureProps;
  instruction_id: string;
  refetch: any;
};

export const DeleteConfirmModal = ({
  DeleteConfirmModalStatus,
  instruction_id,
  refetch,
}: TDeleteConfirmModalProps) => {
  const { isOpen, onClose } = DeleteConfirmModalStatus;
  const toast = useToast();
  const { mutateAsync: handleDeleteInstruction, isLoading } = useMutation(
    async () => {
      // delete instruction
      const res = await deleteInstruction({ instruction_id });
      // delete tweet related to instruction deleted
      await deleteTweetByInstruction({
        instruction_id,
      });
      return res;
    },
    {
      onSuccess: (data) => {
        toast({
          description: data.message,
          status: 'success',
        });
        refetch();
        onClose();
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
    <Modal isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            Do you really want to delete this instruction? This process cannot
            be undone.
          </Text>
        </ModalBody>
        <ModalFooter>
          <Button mr={4} onClick={onClose}>
            Close
          </Button>
          <Button
            isLoading={isLoading}
            bg="red.400"
            color="white"
            onClick={() => handleDeleteInstruction()}
          >
            Yes
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
