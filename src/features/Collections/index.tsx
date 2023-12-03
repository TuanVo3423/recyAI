import { useGetMyCollections } from '@/api/instructions';
import { TweetWithInstruction } from '@/utils/classifyTweetType';
import { Grid, useDisclosure, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InstructionItem, PostCollectionModal } from './components';
import { defaultValueShare, schema_share_my_collection } from './data';

type Props = {};

export const Collections = (props: Props) => {
  const PostCollectionModalStatus = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const [instructionId, setInstructionId] = useState<string | null>(null);
  const { data, isLoading } = useGetMyCollections();
  const form_share_my_collection = useForm<any>({
    resolver: yupResolver(schema_share_my_collection),
    defaultValues: defaultValueShare,
  });
  const onSubmitShareMyCollection = async (values) => {
    const { content } = values;
    const res = await TweetWithInstruction({
      instruction_id: instructionId,
      content,
    });
    await router.push('/feed');
    toast({
      description: res.message,
      status: 'success',
    });
  };
  return (
    <Grid p={10} templateColumns="repeat(3, 1fr)" gap={6}>
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        data &&
        data.instructions.map((instruction, idx: number) => (
          <InstructionItem
            key={idx}
            PostCollectionModalStatus={PostCollectionModalStatus}
            instruction={instruction}
            setInstructionId={setInstructionId}
          />
        ))}

      <PostCollectionModal
        form={form_share_my_collection}
        onSubmit={onSubmitShareMyCollection}
        instructionId={instructionId}
        PostCollectionModalStatus={PostCollectionModalStatus}
      />
    </Grid>
  );
};
