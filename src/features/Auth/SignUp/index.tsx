import { signUp } from '@/api/auth';
import { useAuth } from '@/stores';
import { InputField } from '@/ui-kit';
import { VStack, useToast } from '@chakra-ui/react';
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
  const setProfile = useAuth((state) => state.setProfile);

  // const onSubmit = (data: ISignup) => {
  //   console.log(data);
  // };

  const { mutateAsync: handleSignUp, isLoading } = useMutation(
    async (data: ISignup) => {
      const res = await signUp(data);
      return res;
    },
    {
      onSuccess: async (data: any) => {
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
    <div className="flex items-center justify-center mt-[50px]  mx-auto">
      <div>
        <div className="border border-gray-300 w-[500px] h-[800px] ">
          <div className="lg:block ml-[100px] mt-[50px] w-[300px] justify-center mb-8">
            <img src="https://links.papareact.com/ocw" alt="" />
          </div>
          <div className="flex items-center justify-center text-[22px] font-semibold text-gray-500">
            Đăng ký để xem ảnh và video từ bạn
          </div>
          <div className="flex items-center justify-center text-[22px] font-semibold text-gray-500">
            be.
          </div>
          <div className="bg-blue-400 hover:bg-blue-500 text-white w-[390px] h-[50px] ml-[50px] rounded-xl shadow-lg text-lg font-bold mt-2">
            <div className="flex flex-col items-center justify-center py-2">
              <button className="flex items-center justify-center space-x-2 py-1 text-white text-lg font-semibold rounded ">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                  alt="Facebook logo"
                  width={25}
                  height={25}
                />
                <span>Đăng nhập bằng Facebook</span>
              </button>
            </div>
          </div>
          <div className="flex items-center my-6">
            <hr className="ml-14 flex-grow border-gray-300" />
            <span className="px-2 text-gray-500 mx-5 font-bold">OR</span>
            <hr className="mr-14 flex-grow border-gray-300" />
          </div>
          <VStack
            as="form"
            onSubmit={handleSubmit((data) => handleSignUp(data))}
          >
            <div className="w-[400px] h-[50px]  rounded-md  bg-[#fafafa] text-sm ">
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
            <div className="w-[400px] h-[50px]  rounded-md  bg-[#fafafa] text-sm ">
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
            <div className="w-[400px] h-[50px]  rounded-md  bg-[#fafafa] text-sm ">
              <InputField
                _focus={{
                  outline: 'none',
                  marginY: '3px',
                }}
                form={form}
                name="password"
                placeholder="Enter password..."
                type="text"
              />
            </div>
            <div className="w-[400px] h-[50px]  rounded-md  bg-[#fafafa] text-sm ">
              <InputField
                _focus={{
                  outline: 'none',
                  marginY: '3px',
                }}
                form={form}
                name="confirm_password"
                placeholder="Enter confirm password..."
                type="text"
              />
            </div>
            <div className="w-[400px] h-[50px]  rounded-md  bg-[#fafafa] text-sm ">
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

            {/* <label htmlFor="signInPageEmail">
              {''}
              <input
                className="w-[400px] h-[50px]  rounded-md py-5 border border-stone-300 bg-[#fafafa] px-2  text-sm focus:outline-none my-3"
                type="text"
                id="sdt"
                placeholder="Email address"
              />
            </label>
            <label htmlFor="signInPagePassword">
              {' '}
              <input
                className=" w-[400px] h-[50px] ml-[50px] rounded-md py-5 border border-stone-300 bg-[#fafafa] px-2  text-sm focus:outline-none my-3"
                type="text"
                id="signInPagePassword"
                placeholder="Name"
              />
            </label>
            <label htmlFor="signInPagePassword">
              {' '}
              <input
                className=" w-[400px] h-[50px] ml-[50px] rounded-md py-5 border border-stone-300 bg-[#fafafa] px-2  text-sm focus:outline-none my-3"
                type="text"
                id="signInPagePassword"
                placeholder="username"
              />
            </label>
            <label htmlFor="signInPagePassword">
              {' '}
              <input
                className=" w-[400px] h-[50px] ml-[50px] rounded-md py-5 border border-stone-300 bg-[#fafafa] px-2  text-sm focus:outline-none my-3"
                type="password"
                id="signInPagePassword"
                placeholder="Password"
              />
            </label> */}
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-700 text-white w-[400px] h-[50px]  rounded-xl shadow-lg text-lg font-bold mt-2"
            >
              Đăng Ky
            </button>
          </VStack>
        </div>
        <div className="flex border items-center justify-center border-gray-300 mt-10 w-[500px] h-[90px] ">
          <p className="text-xl ">Ban da co tai khoan</p>
          <p className="text-xl font-bold text-blue-500 hover:text-blue-800 ml-2 cursor-pointer">
            Dang Nhap
          </p>
        </div>
      </div>
    </div>
  );
};
