import { follow, unFollow, useGetUser } from '@/api/auth';
import { useAuth } from '@/stores';
import { Button, Text, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from 'react-query';
type Props = {};

export const UserInfo = (props: Props) => {
  const router = useRouter();
  const toast = useToast();
  const profileStore = useAuth((state) => state.profile);
  const [isFollowed, setIsFollowed] = useState<boolean | null>();
  const { data, isLoading, refetch } = useGetUser(router.query.userId[0], {
    enabled: !!router.query.userId[0],
    onSuccess: async (data) => {
      setIsFollowed(
        data.user.followerIds.some(
          (item: any) => item.user_id === profileStore._id
        )
      );
    },
  });

  const {
    mutateAsync: handleFollow,
    isSuccess,
    isLoading: mutateFollowLoading,
  } = useMutation(
    async () => {
      const res = await follow({ followed_user_id: router.query.userId[0] });
      return res;
    },
    {
      onSuccess: async (data: any) => {
        toast({
          description: data.message,
          status: 'success',
        });
        setIsFollowed(true);
        refetch();
      },
      onError: (error: any) => {
        toast({
          description: error.message,
          status: 'error',
        });
      },
    }
  );
  const { mutateAsync: handleUnFollow, isLoading: mutateUnFollowLoading } =
    useMutation(
      async () => {
        const res = await unFollow({
          followed_user_id: router.query.userId[0],
        });
        return res;
      },
      {
        onSuccess: async (data: any) => {
          toast({
            description: data.message,
            status: 'success',
          });
          setIsFollowed(false);
          refetch();
        },
        onError: (error: any) => {
          toast({
            description: error.message,
            status: 'error',
          });
        },
      }
    );

  const renderButton = () => {
    // const isFollowed = data.user.followerIds.some(
    //   (item: any) => item.user_id === profileStore._id
    // );
    if (isFollowed) {
      return (
        <Button
          isLoading={mutateUnFollowLoading}
          onClick={() => handleUnFollow()}
          className="bg-green-200 hover:bg-green-400 text-black w-[200px] h-[30px] rounded-xl text-sm font-semibold mt-2"
        >
          Unfollow
        </Button>
      );
    } else {
      return (
        <Button
          isLoading={mutateFollowLoading}
          onClick={() => handleFollow()}
          bg="green.200"
          w="200px"
          h="30px"
          rounded="xl"
          fontSize="sm"
          fontWeight="semibold"
          mt="2"
          _hover={{ bg: 'green.400' }}
        >
          Follow
        </Button>
      );
    }
  };
  if (!isLoading) {
    renderButton();
  }
  return (
    <>
      {!isLoading && (
        <div className="flex lg:flex-row flex-col items-center justify-center lg:space-x-20 space-y-2 lg:space-y-0 lg:ml-20 mt-16  ">
          <div className="cursor-pointer rounded-full border p-[2px] w-[150px] h-[150px] overflow-hidden">
            <img
              src={data.user.avatar || '/empty_avatar.png'}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="lg:-mt-5">
            <div className="flex lg:flex-row flex-col items-center justify-center space-x-3">
              <p className="mt-3 lg:mr-20 mr-0 text-xl lg:text-xl">
                {data.user.name}
              </p>
              {profileStore._id !== data.user._id && (
                <>
                  {renderButton()}
                  <Button
                    onClick={() => router.push('/chat')}
                    bg="green.200"
                    w="200px"
                    h="30px"
                    rounded="xl"
                    fontSize="sm"
                    fontWeight="semibold"
                    mt="2"
                    _hover={{ bg: 'green.400' }}
                  >
                    Send message
                  </Button>
                </>
              )}
            </div>
            <div className="flex justify-center items-center text-lg lg:my-8 my-2 lg:space-x-32 space-x-4">
              <p>
                <span className="font-bold">{data.user.tweets.length}</span>{' '}
                Post
              </p>
              <p>
                <span className="font-bold">
                  {data.user.followerIds.length}
                </span>{' '}
                Followers
              </p>
              <p>
                <span className="font-bold">{data.user.followIds.length}</span>{' '}
                Followings
              </p>
            </div>
            <div className="text-lg font-semibold mb-5 text-center lg:text-left">
              {data.user.email}
            </div>
            <Text as="em" className="block text-center lg:text-left">
              {data.user.bio || ''}
            </Text>
          </div>
        </div>
      )}
    </>
  );
};
