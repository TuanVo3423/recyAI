import { IRegisterResponse, signUp } from '@/api/auth';
import { InputField } from '@/ui-kit';
import { Button, VStack, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { DefaultSignupValues, ISignup, schema_signup } from '../data';

export const SignUp = () => {
  const form = useForm<ISignup>({
    resolver: yupResolver(schema_signup),
    defaultValues: DefaultSignupValues,
  });
  const { handleSubmit } = form;

  const toast = useToast();
  const router = useRouter();

  const { mutateAsync: handleSignUp, isLoading } = useMutation(
    async (data: ISignup) => {
      const res = await signUp(data);
      return res;
    },
    {
      onSuccess: async (data: IRegisterResponse) => {
        await router.push('/auth/sign-in');
        toast({
          description: data.message,
          status: 'success',
        });
      },
      onError: (error: any) => {
        toast({
          description: error.message,
          status: 'error',
        });
      },
    }
  );

  return (
    <div className="flex items-center justify-center mt-[20px]  mx-auto">
      <div>
        <div className="border-[1px] rounded-xl shadow-lg w-[350px] h-[600px] ">
          <div className="lg:block ml-[100px] mt-[40px] w-[160px] justify-center mb-2 -mt-3">
            <img
              src="https://yesrecycling.org/wp-content/uploads/2022/02/Yes-Recycling_Logo-green.png"
              alt=""
            />
          </div>
          <div className="flex items-center justify-center text-sm text-[22px] font-semibold text-gray-500 mb-10">
            Login to join with us.
          </div>

          <div className="flex items-center justify-center mt-2">
            <button className="flex items-center text-blue-800 hover:text-blue-950 text-lg font-semibold -mt-3 px-4 rounded ">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                alt="Facebook logo"
                width={20}
                height={20}
              />
              {/* <span className="text-sm">Log in by Facebook</span> */}
            </button>
            <button className="flex items-center text-blue-800 hover:text-blue-950 text-lg font-semibold -mt-3 px-4 rounded ">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1200px-Google_%22G%22_logo.svg.png"
                alt="Google logo"
                width={20}
                height={20}
              />
              {/* <span className="text-sm">Log in by Facebook</span> */}
            </button>
            <button className="flex items-center text-blue-800 hover:text-blue-950 text-lg font-semibold -mt-3 px-4 rounded ">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/768px-Microsoft_logo.svg.png"
                alt="Windows logo"
                width={20}
                height={20}
              />
              {/* <span className="text-sm">Log in by Facebook</span> */}
            </button>
            <button className="flex items-center text-blue-800 hover:text-blue-950 text-lg font-semibold -mt-3 px-4 rounded ">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Apple_logo_grey.svg/758px-Apple_logo_grey.svg.png"
                alt="Apple logo"
                width={20}
                height={20}
              />
              {/* <span className="text-sm">Log in by Facebook</span> */}
            </button>
          </div>

          <div className="font-bold my-4 flex justify-center items-center text-center text-gray-500">
            OR
          </div>
          <VStack
            as="form"
            onSubmit={handleSubmit((data) => handleSignUp(data))}
          >
            <div className="w-[290px] h-[35px]  rounded-md  bg-[#fafafa] text-sm ">
              <InputField
                _focus={{
                  outline: 'none',
                  marginY: '3px',
                }}
                form={form}
                name="name"
                placeholder="Enter name..."
                type="text"
              />
            </div>
            <div className="w-[290px] h-[35px]  rounded-md  bg-[#fafafa] text-sm ">
              <InputField
                _focus={{
                  outline: 'none',
                  marginY: '3px',
                }}
                form={form}
                name="email"
                placeholder="Enter email..."
                type="email"
              />
            </div>
            <div className="w-[290px] h-[35px]  rounded-md  bg-[#fafafa] text-sm ">
              <InputField
                _focus={{
                  outline: 'none',
                  marginY: '3px',
                }}
                form={form}
                name="password"
                placeholder="Enter password..."
                type="password"
              />
            </div>
            <div className="w-[290px] h-[35px]  rounded-md  bg-[#fafafa] text-sm ">
              <InputField
                _focus={{
                  outline: 'none',
                  marginY: '3px',
                }}
                form={form}
                name="confirm_password"
                placeholder="Enter confirm password..."
                type="password"
              />
            </div>
            <div className="w-[290px] h-[35px]  rounded-md  bg-[#fafafa] text-sm">
              <InputField
                _focus={{
                  outline: 'none',
                  marginY: '3px',
                }}
                form={form}
                name="date_of_birth"
                placeholder="Enter date of birth..."
                type="datetime-local"
              />
            </div>

            <div className="mt-10">
              {isLoading ? (
                <Button
                  h="34px"
                  rounded="xl"
                  className="w-[290px]"
                  isLoading
                  bg="gray.400"
                ></Button>
              ) : (
                <button
                  type="submit"
                  className="bg-green-400 hover:bg-green-700 text-white w-[200px] mt-8 h-[34px] text-sm rounded-xl shadow-lg font-bold"
                >
                  Sign in
                </button>
              )}
            </div>
          </VStack>
        </div>
        <div className="flex border-[1px] rounded-xl shadow-lg items-center justify-center border-gray-300 mt-10 w-[350px] h-[55px] ">
          <p className="text-sm ">You already had account</p>
          <p
            onClick={() => router.push('/auth/sign-in')}
            className="text-sm font-bold text-green-500 hover:text-green-800 ml-2 cursor-pointer"
          >
            Log in
          </p>
        </div>
      </div>
    </div>
  );
};
