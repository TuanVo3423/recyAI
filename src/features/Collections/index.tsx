import { useGetMyCollections } from '@/api/instructions';
import { TweetWithInstruction } from '@/utils/classifyTweetType';
import { Grid, useDisclosure, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InstructionItem } from './components/InstructionItem';
import { PostModal } from './components/PostModal';
import { defaultValueShare, schema_share_my_collection } from './data';

type Props = {};

export const Collections = (props: Props) => {
  const PostModalStatus = useDisclosure();
  const router = useRouter();
  const toast = useToast();
  const [instructionId, setInstructionId] = useState<string | null>(null);
  const { data, isLoading, isError } = useGetMyCollections();
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
    <Grid p={10} templateColumns="repeat(3, 1fr)" gap={6} marginLeft="300px">
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        data &&
        data.instructions.map((instruction, idx) => (
          <InstructionItem
            PostModalStatus={PostModalStatus}
            instruction={instruction}
            setInstructionId={setInstructionId}
          />
        ))}

      <PostModal
        form={form_share_my_collection}
        onSubmit={onSubmitShareMyCollection}
        instructionId={instructionId}
        PostModalStatus={PostModalStatus}
      />
    </Grid>
  );
};
