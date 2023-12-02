import {
  Card,
  CardBody,
  Heading,
  Stack,
  Text,
  Divider,
  UseDisclosureProps,
} from '@chakra-ui/react';
import React from 'react';
import { useQueryClient } from 'react-query';

type TInstructionItemProps = {
  setInstructionId: (id: string) => void;
  instruction: any;
  PostModalStatus: UseDisclosureProps;
};

export const InstructionItem = ({
  setInstructionId,
  instruction,
  PostModalStatus,
}: TInstructionItemProps) => {
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData('getMyCollections');
  return (
    <Card
      cursor="pointer"
      onClick={() => {
        setInstructionId(instruction._id);
        PostModalStatus.onOpen();
      }}
      maxW="sm"
    >
      <CardBody>
        <Stack height="200px" overflow="hidden" mt="6" spacing="3">
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
