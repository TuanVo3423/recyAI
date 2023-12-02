import { PlusIcon } from '@/icons';
import { InputField } from '@/ui-kit';
import {
  Button,
  FormLabel,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';

type Props = {
  ModalShareStatus: any;
  form: any;
  onSubmit: any;
};

const ModalShareInstruction = ({ ModalShareStatus, form, onSubmit }: Props) => {
  const { handleSubmit, setValue, watch, reset } = form;

  return (
    <Modal
      isCentered
      isOpen={ModalShareStatus.isOpen}
      onClose={() => {
        // reset();
        ModalShareStatus.onClose();
      }}
    >
      <ModalOverlay bg="#4144441f" />
      <ModalContent>
        <ModalHeader>{'share section'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack onSubmit={handleSubmit(onSubmit)} as="form" h="100%" gap={2}>
            <InputField
              form={form}
              label="content"
              name="content"
              placeholder="Enter content..."
              type="text"
            />
            <FormLabel>{'content'}</FormLabel>

            <InputField
              form={form}
              label="is_public"
              name="is_public"
              placeholder="Enter is_public..."
              type="text"
            />
            <FormLabel>{'is_public'}</FormLabel>

            {/* {listSubsection.map((_, _idx) => (
                            <SubSection key={_idx} _idx={_idx} form={form} />
                        ))} */}

            <HStack
              cursor="pointer"
              onClick={() => {
                // let temp = [...listSubsection, ""];
                // setValue("subsection", temp);
              }}
            >
              <Icon as={PlusIcon} />
              <Text>Add subsection</Text>
            </HStack>

            <Button variant="secondary" type="submit">
              {'update'}
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalShareInstruction;
