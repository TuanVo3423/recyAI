import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react';
import { InputField } from '../../ui-kit';

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
        <ModalHeader>{'New section'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack onSubmit={handleSubmit(onSubmit)} as="form" h="100%" gap={4}>
            <InputField
              form={form}
              label="New instruction"
              name="instruction"
              placeholder="Enter new instruction..."
              type="text"
            />
            <Button variant="secondary" type="submit">
              {'Save'}
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
