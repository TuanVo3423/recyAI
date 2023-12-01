import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import { useQueryClient } from 'react-query';

type TInstructionItemProps = {
  setInstructionId: (id: string) => void;
  instruction: any;
  onOpen: () => void;
};

export const InstructionItem = ({
  setInstructionId,
  instruction,
  onOpen,
}: TInstructionItemProps) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('getMyCollections');
  return (
    <Card
      cursor="pointer"
      onClick={() => {
        setInstructionId(instruction._id);
        onOpen();
      }}
      maxW="sm"
    >
      <CardBody>
        <Stack mt="6" spacing="3">
          <Heading size="md">Living room Sofa</Heading>
          {instruction.steps.map((step, idx) => (
            <Text>{step.content}</Text>
          ))}
          <Text color="blue.600" fontSize="2xl">
            $450
          </Text>
        </Stack>
      </CardBody>
    </Card>
  );
};
