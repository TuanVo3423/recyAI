import { deleteInstruction } from '@/api/instructions';
import { deleteTweetByInstruction } from '@/api/tweets';
import {
  Box,
  Button,
  Card,
  CardBody,
  HStack,
  Stack,
  Text,
  UseDisclosureProps,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { XIcon } from '@heroicons/react/outline';
import { useMutation } from 'react-query';
import { DeleteConfirmModal } from './DeleteConfirmModal';
type TInstructionItemProps = {
  setInstructionId: (id: string) => void;
  instruction: any;
  PostCollectionModalStatus: UseDisclosureProps;
  refetch: any;
};

export const InstructionItem = ({
  setInstructionId,
  instruction,
  PostCollectionModalStatus,
  refetch,
}: TInstructionItemProps) => {
  const DeleteConfirmModalStatus = useDisclosure();

  return (
    <Card cursor="pointer" maxW="sm">
      <CardBody className="bg-green-200">
        <Stack height="330px" overflow="hidden" spacing="3">
          <Box
            p={2}
            flex={1}
            overflow="auto"
            css={{
              '&::-webkit-scrollbar': {
                width: '4px',
              },
              '&::-webkit-scrollbar-track': {
                width: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: 'white',
                borderRadius: '24px',
              },
            }}
          >
            {instruction.steps.map((step, idx) => (
              <Text key={idx}>
                {idx + 1}. {step.content}
              </Text>
            ))}
          </Box>

          <HStack justify="flex-end">
            <Button
              onClick={() => DeleteConfirmModalStatus.onOpen()}
              background="white"
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                setInstructionId(instruction._id);
                PostCollectionModalStatus.onOpen();
              }}
              background="green.500"
              color="white"
            >
              Edit
            </Button>
          </HStack>
        </Stack>
      </CardBody>
      <DeleteConfirmModal
        refetch={refetch}
        DeleteConfirmModalStatus={DeleteConfirmModalStatus}
        instruction_id={instruction._id}
      />
    </Card>
  );
};
