import { Box, useToast } from '@chakra-ui/react';
import { HeartIcon } from '@heroicons/react/solid';
import { HeartIcon as HeartIconOutline } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { createLike, unLike } from '@/api/like';
import { useAuth } from '@/stores';

type THeartLikeProps = {
  tweet_id: string;
  setLikeCount: any;
  likes: any;
};
// 2 type, like and unlike
// tweet_id
const HeartLike = ({ tweet_id, setLikeCount, likes }: THeartLikeProps) => {
  const [like, setLike] = useState(false);
  const profileStore = useAuth((state) => state.profile);
  const isLiked = likes?.find(
    (like: any) => like._id === profileStore.result._id
  );
  const toast = useToast();

  const { mutateAsync: handleLike } = useMutation(
    async () => {
      const res = await createLike({ tweet_id });
      return res;
    },
    {
      onSuccess: async (data) => {
        toast({
          description: data.message,
          status: 'success',
        });
        setLike(!like);
        setLikeCount((prev: number) => prev + 1);
      },
      onError: async (error: any) => {
        toast({
          description: error.message,
          status: 'error',
        });
      },
    }
  );

  const { mutateAsync: handleUnLike } = useMutation(
    async () => {
      // get like_id and delete it
      const res = await unLike({ tweet_id });
      return res;
    },
    {
      onSuccess: async (data) => {
        toast({
          description: data.message,
          status: 'success',
        });
        setLike(!like);
        setLikeCount((prev: number) => prev - 1);
      },
      onError: async (error: any) => {
        toast({
          description: error.message,
          status: 'error',
        });
      },
    }
  );
  return (
    <Box>
      {!isLiked && like ? (
        <HeartIcon
          className="w-6 h-6 cursor-pointer text-red-500"
          onClick={() => handleUnLike()}
        />
      ) : (
        <HeartIconOutline
          onClick={() => handleLike()}
          className={`w-6 h-6 cursor-pointer `}
        />
      )}
    </Box>
  );
};

export default HeartLike;
