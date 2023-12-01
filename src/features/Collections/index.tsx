import { Grid, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { InstructionItem } from './components/InstructionItem';
import { PostModal } from './components/PostModal';
import { useGetMyCollections } from '@/api/instructions';

type Props = {};

export const Collections = (props: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [instructionId, setInstructionId] = useState<string | null>(null);
  const { data, isLoading, isError } = useGetMyCollections();
  return (
    <Grid p={10} templateColumns="repeat(3, 1fr)" gap={6} marginLeft="300px">
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        data &&
        data.instructions.map((instruction, idx) => (
          <InstructionItem
            onOpen={onOpen}
            instruction={instruction}
            setInstructionId={setInstructionId}
          />
        ))}

      <PostModal
        instructionId={instructionId}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </Grid>
  );
};
