import { getAuth, mailVerifyToken } from '@/api/auth';
import { useAuth } from '@/stores';
import { UserVerifyStatus } from '@/types';
import { Button, Center, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';
import Cookies from 'universal-cookie';

type TVerifyEmail = {};

export const VerifyEmail = ({}: TVerifyEmail) => {
  const router = useRouter();
  const cookies = new Cookies();
  const profileStore = useAuth((state) => state.profile);
  const [email, setEmail] = React.useState('');
  const toast = useToast();
  const {
    mutateAsync: handleSendVerifyMail,
    isSuccess,
    data,
    isLoading: isSendVerifyMailLoading,
  } = useMutation(
    async () => {
      const res = await mailVerifyToken();
      return res;
    },
    {
      onSuccess: (data) => {
        toast({
          title: data.message,
          status: 'success',
        });
      },
      onError: (err: any) => {
        toast({
          title: err.message,
          status: 'error',
        });
      },
    }
  );
  const { mutateAsync: handleCheckVerify, isLoading: isCheckVerifyLoading } =
    useMutation(
      async () => {
        const res = await getAuth();
        return res;
      },
      {
        onSuccess: (data) => {
          if (data.user.verify === UserVerifyStatus.Verified) {
            toast({
              title:
                'Your account has been verified! I will redirect you to profile page after 2 seconds!',
              status: 'success',
            });
            setTimeout(() => {
              router.push('/profile');
            }, 2000);
          }
          if (data.user.verify === UserVerifyStatus.Unverified) {
            toast({
              title:
                'Your account has not been verified! Please check your email!',
              status: 'error',
            });
          }
        },
      }
    );
  return (
    <Center h="100vh">
      {isSuccess && data.message !== 'Email already verified before' ? (
        <div className="flex items-center justify-center">
          <div className=" bg-white shadow-lg border-[1px] rounded-xl">
            <div className="border-b-[1px] border-gray-300 p-5 flex items-center justify-center">
              <p className="text-xl font-bold">Account Comfirmation</p>
            </div>
            <div className="p-5 flex-col justify-center items-center space-y-5  border-gray-300 pb-7">
              <p className="text-md">
                An email with your your account comfirmation link has been sent
                to your email:{' '}
                <span className="italic text-green-400">
                  {profileStore && profileStore?.email}
                </span>
              </p>
              <p className="text-md">
                Check your email and come back to proceed!
              </p>
              <Button
                isLoading={isCheckVerifyLoading}
                background={'green.400'}
                color={'white'}
                _hover={{
                  background: 'green.700',
                }}
                display="block"
                ml={'auto'}
                w={'100px'}
                h={'34px'}
                fontSize={'sm'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                fontWeight={'bold'}
                onClick={() => handleCheckVerify()}
              >
                Proceed
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className=" flex items-center justify-center">
          <div className="px-4 py-6 bg-white shadow-lg border-[1px] rounded-xl">
            <div className="border-b-[1px] border-gray-300 p-5">
              <p className="text-xl font-bold">Account Comfirmation</p>
            </div>
            <div className="p-5 flex-col space-y-5 border-b-[1px] border-gray-300 pb-7">
              <p className="text-md">
                Please enter your account's email to verify your account...
              </p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email..."
                className="border-none focus:ring-0 outline-none bg-gray-100 rounded-xl w-full p-2"
              />
            </div>
            <div className="flex items-center right-0 space-x-4 mt-6 ml-64">
              <button
                onClick={() => router.push('/profile')}
                className="bg-gray-200 text-gray-600 w-[100px] h-[34px] text-sm rounded-xl shadow-lg font-bold"
              >
                Cancel
              </button>
              <Button
                isLoading={isSendVerifyMailLoading}
                onClick={() => {
                  if (profileStore && profileStore?.email === email) {
                    handleSendVerifyMail();
                  } else {
                    toast({
                      title: 'Email does not match email at registration!',
                      status: 'error',
                    });
                  }
                }}
                bg={'green.400'}
                color={'white'}
                _hover={{
                  background: 'green.700',
                }}
                display="block"
                ml={'auto'}
                w={'100px'}
                h={'34px'}
                fontSize={'sm'}
                rounded={'xl'}
                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                fontWeight={'bold'}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </Center>
  );
};
