import { useGetMyCollections } from '@/api/instructions';
import {
  TweetWithImages,
  TweetWithInstruction,
} from '@/utils/classifyTweetType';
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
  const [files, setFiles] = useState<any[]>([]);
  const { data, isLoading } = useGetMyCollections();
  const form_share_my_collection = useForm<any>({
    resolver: yupResolver(schema_share_my_collection),
    defaultValues: defaultValueShare,
  });

  const onSubmitShareMyCollection = async (values) => {
    const { content } = values;
    if (files.length === 0) {
      const res = await TweetWithInstruction({
        instruction_id: instructionId,
        content,
      });
      if (res) {
        toast({
          description: res.message,
          status: 'success',
        });
      } else {
        toast({
          description: 'You need to verify your email to post tweet',
          status: 'error',
        });
      }
    } else {
      const res = await TweetWithImages({
        instruction_id: instructionId,
        content,
        images: files,
      });
      if (res) {
        toast({
          description: res.message,
          status: 'success',
        });
      } else {
        toast({
          description: 'You need to verify your email to post tweet',
          status: 'error',
        });
      }
    }
    // await router.push('/feed');
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
        files={files}
        setFiles={setFiles}
        form={form_share_my_collection}
        onSubmit={onSubmitShareMyCollection}
        instructionId={instructionId}
        PostCollectionModalStatus={PostCollectionModalStatus}
      />
    </Grid>
  );
};
