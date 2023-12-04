import {
  Card,
  CardBody,
  Stack,
  Text,
  UseDisclosureProps,
} from '@chakra-ui/react';
import { useQueryClient } from 'react-query';
import { XIcon } from '@heroicons/react/outline';
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
      <CardBody className='bg-gray-100'>
        <Stack height="330px" overflow="hidden" spacing="3">
          
          <div><XIcon className='w-5 h-5 text-gray-400 cursor-pointer hover:text-black ml-[320px]'/>
          {instruction.steps.map((step, idx) => (
            <Text key={idx}>{step.content}</Text>
          ))}</div>
        </Stack>
      </CardBody>
    </Card>
  );
};
