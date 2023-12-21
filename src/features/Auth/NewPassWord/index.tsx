import { resetPassword } from '@/api/auth';
import { Button, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useMutation } from 'react-query';

type TNewPasswordProps = {};

export const NewPassword = ({}: TNewPasswordProps) => {
  const router = useRouter();
  const toast = useToast();
  const [input, setInput] = useState({
    password: '',
    confirmPassword: '',
  });
  const { mutateAsync: handleResetPassword, isLoading } = useMutation(
    async () => {
      const res = await resetPassword({
        password: input.password,
        forgot_password_token: router.query.token[0],
        confirm_password: input.confirmPassword,
      });
      return res;
    },
    {
      onSuccess: (data) => {
        router.push('/auth/sign-in');
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
        <div className="w-[500px] h-[369px] bg-white shadow-lg border-[1px] rounded-xl">
          <div className="border-b-[1px] border-gray-300 p-5">
            <p className="text-xl font-bold">Set your new password</p>
          </div>
          <div className="p-5 flex-col space-y-5 border-b-[1px] border-gray-300 pb-7">
            <p className="text-md">
              Please enter your new password to log in with your new password...
            </p>
            <input
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
              type="password"
              placeholder="Enter you new password..."
              className="border-none focus:ring-0 outline-none bg-gray-100 rounded-xl w-full p-2"
            />
            <input
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
              type="password"
              placeholder="Re-enter your new password..."
              className="border-none focus:ring-0 outline-none bg-gray-100 rounded-xl w-full p-2"
            />
          </div>
          <div className="flex items-center right-0 space-x-4 mt-6 ml-64">
            <button className="bg-gray-200 text-gray-600 w-[100px] h-[34px] text-sm rounded-xl shadow-lg font-bold">
              Go back
            </button>
            <Button
              isLoading={isLoading}
              onClick={() => handleResetPassword()}
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
              Reset password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
