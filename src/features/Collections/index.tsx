import { useGetMyCollections } from '@/api/instructions';
import {
  TweetWithImages,
  TweetWithInstruction,
} from '@/utils/classifyTweetType';
import {
  Grid,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { InstructionItem, PostCollectionModal } from './components';
import { defaultValueShare, schema_share_my_collection } from './data';
import { Quadrilateral } from '@/components/skeleton';

type Props = {};

export const Collections = (props: Props) => {
  const PostCollectionModalStatus = useDisclosure();
  const variant = useBreakpointValue({
    base: 'mobile',
    md: 'mobile',
    lg: 'desktop',
  });
  const isMobile = variant === 'mobile';
  const router = useRouter();
  const toast = useToast();
  const [instructionId, setInstructionId] = useState<string | null>(null);
  const [files, setFiles] = useState<any[]>([]);
  const { data, isLoading, refetch } = useGetMyCollections();
  const form_share_my_collection = useForm<any>({
    resolver: yupResolver(schema_share_my_collection),
    defaultValues: defaultValueShare,
  });
  const [isLoadingShare, setIsLoadingShare] = useState<boolean | null>(false);

  const onSubmitShareMyCollection = async (values) => {
    const { content } = values;
    setIsLoadingShare(true);
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
        setIsLoadingShare(false);
        PostCollectionModalStatus.onClose();
      } else {
        toast({
          description: 'You need to verify your email to post tweet',
          status: 'error',
        });
        setIsLoadingShare(false);
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
        setIsLoadingShare(false);
        PostCollectionModalStatus.onClose();
      } else {
        toast({
          description: 'You need to verify your email to post tweet',
          status: 'error',
        });
        setIsLoadingShare(false);
      }
    }
    // await router.push('/feed');
  };
  return (
    <Grid p={10} templateColumns={`repeat(${isMobile ? 1 : 3}, 1fr)`} gap={6}>
      {isLoading &&
        Array.from(Array(6)).map((_, idx) => (
          <Quadrilateral
            w="full"
            height="330px"
            isLoading={isLoading}
            key={idx}
          />
        ))}
      {!isLoading && data?.instructions.length > 0 ? (
        data.instructions.map((instruction, idx: number) => (
          <InstructionItem
            key={idx}
            PostCollectionModalStatus={PostCollectionModalStatus}
            instruction={instruction}
            setInstructionId={setInstructionId}
            refetch={refetch}
          />
        ))
      ) : (
        <Text as="em" color="green.400">
          You don't have any instructions!
        </Text>
      )}

      <PostCollectionModal
        files={files}
        setFiles={setFiles}
        form={form_share_my_collection}
        onSubmit={onSubmitShareMyCollection}
        instructionId={instructionId}
        PostCollectionModalStatus={PostCollectionModalStatus}
        isLoadingShare={isLoadingShare}
      />
    </Grid>
  );
};
