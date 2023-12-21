import { forgotPassword } from '@/api/auth';
import { InputField } from '@/ui-kit';
import { Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';

type TForgotPasswordProps = {};

export const ForgotPassword = ({}: TForgotPasswordProps) => {
  const [email, setEmail] = React.useState('');
  const router = useRouter();
  const toast = useToast();
  const {
    isSuccess,
    mutateAsync: handleSendMail,
    isLoading,
  } = useMutation(
    async () => {
      const res = await forgotPassword({ email });
      return res;
    },
    {
      onSuccess: (data) => {
        toast({
          description: data.message,
          status: 'success',
        });
      },
      onError(error: any) {
        toast({
          description: error.message,
          status: 'error',
        });
      },
    }
  );
  return (
    <div className="flex-col space-y-[130px]">
      <div className="bg-white w-full items-center h-[60px] shadow-lg flex space-x-[500px]">
        <img
          src="https://yesrecycling.org/wp-content/uploads/2022/02/Yes-Recycling_Logo-green.png"
          alt=""
          className=" w-[100px] ml-5"
        />

        <div className="flex flex-1 items-center space-x-5">
          <div className="flex space-x-5">
            <input
              type="text"
              placeholder="Email..."
              className="border-none focus:ring-0 outline-none bg-gray-100 rounded-xl p-2"
            />
            <input
              type="password"
              placeholder="Password..."
              className="border-none focus:ring-0 outline-none bg-gray-100 rounded-xl p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-green-400 hover:bg-green-700 text-white w-[100px] h-[34px] text-sm rounded-xl shadow-lg font-bold"
          >
            Sign in
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="w-[500px] h-[285px] bg-white shadow-lg border-[1px] rounded-xl">
          <div className="border-b-[1px] border-gray-300 p-5">
            <p className="text-xl font-bold">Forgot your password?</p>
          </div>
          <div className="p-5 flex-col space-y-5 border-b-[1px] border-gray-300 pb-7">
            <p className="text-md">
              Please enter your account's email to verify and reset password...
            </p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email..."
              className="border-none focus:ring-0 outline-none bg-gray-100 rounded-xl w-full p-2"
            />
          </div>
          {!isSuccess && (
            <div className="flex items-center right-0 space-x-4 mt-6 ml-64">
              <button
                onClick={() => router.push('/auth-sign-in')}
                className="bg-gray-200 text-gray-600 w-[100px] h-[34px] text-sm rounded-xl shadow-lg font-bold"
              >
                Cancel
              </button>
              <Button
                isLoading={isLoading}
                onClick={() => handleSendMail()}
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
          )}
        </div>
      </div>
    </div>
  );
};
