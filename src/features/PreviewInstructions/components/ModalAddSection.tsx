import { InputField, TextAreaInputFieldWithoutLabel } from '@/ui-kit';
import {
  Box,
  Button,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';

type Props = {
  ModalStatus: any;
  form?: any;
  onSubmit: any;
};

export const ModalAddSection = ({ ModalStatus, form, onSubmit }: Props) => {
  const { handleSubmit, setValue, watch, reset } = form;
  const {
    register,
    formState: { errors },
  } = form;

  console.log('errors: ', errors);

  return (
    <Modal
      isCentered
      isOpen={ModalStatus.isOpen}
      onClose={() => {
        // reset();
        ModalStatus.onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{'Add new instruction'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack onSubmit={handleSubmit(onSubmit)} as="form" h="100%" gap={4}>
            <TextAreaInputFieldWithoutLabel
              form={form}
              label="New instruction"
              name="instruction"
              placeholder="Enter new instruction..."
              type="text"
            />
            <HStack>
              <Button
                variant="outline"
                display="block"
                ml="auto"
                w="fit-content"
                color="green.500"
                onClick={() => ModalStatus.onClose()}
              >
                {'Close'}
              </Button>
              <Button
                background="green.500"
                w="fit-content"
                color="white"
                type="submit"
              >
                {'Save'}
              </Button>
            </HStack>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
