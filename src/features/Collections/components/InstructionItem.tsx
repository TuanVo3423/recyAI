import {
  Card,
  CardBody,
  Stack,
  Text,
  UseDisclosureProps,
} from '@chakra-ui/react';
import { useQueryClient } from 'react-query';

type TInstructionItemProps = {
  setInstructionId: (id: string) => void;
  instruction: any;
  PostCollectionModalStatus: UseDisclosureProps;
};

export const InstructionItem = ({
  setInstructionId,
  instruction,
  PostCollectionModalStatus,
}: TInstructionItemProps) => {
  const queryClient = useQueryClient();
  return (
    <Card
      cursor="pointer"
      onClick={() => {
        setInstructionId(instruction._id);
        PostCollectionModalStatus.onOpen();
      }}
      maxW="sm"
    >
      <CardBody>
        <Stack height="300px" overflow="hidden" mt="6" spacing="3">
          {instruction.steps.map((step, idx) => (
            <Text key={idx}>{step.content}</Text>
          ))}
        </Stack>
      </CardBody>
    </Card>
  );
};
