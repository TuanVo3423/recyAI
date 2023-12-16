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
  const profileStore = useAuth((state) => state.profile);
  const [like, setLike] = useState(
    likes?.find((like: any) => {
      if (profileStore) {
        return like._id === profileStore._id;
      } else {
        return like._id === '';
      }
    })
  );
  console.log(like);

  const toast = useToast();

  const { mutateAsync: handleLike } = useMutation(
    async () => {
      const res = await createLike({ tweet_id });
      return res;
    },
    {
      onSuccess: async (data) => {
        if (profileStore) {
          toast({
            description: data.message,
            status: 'success',
          });
          setLike(!like);
          setLikeCount((prev: number) => prev + 1);
        } else {
          toast({
            description: 'Login to like this tweet',
            status: 'error',
          });
        }
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
      {like ? (
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
