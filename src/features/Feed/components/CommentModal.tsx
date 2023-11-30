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

interface TCommentModalProps extends UseDisclosureProps {
  tweetId: string;
}

export const CommentModal = ({
  tweetId,
  isOpen,
  onClose,
  onOpen,
}: TCommentModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalCloseButton />
        {/* code modal here */}
      </ModalContent>
    </Modal>
  );
};
