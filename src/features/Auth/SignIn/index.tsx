import { signIn } from '@/api/auth';
import { PROJECT_AUTH_TOKEN } from '@/constants';
import { LocalStorage } from '@/services/localStorage';
import { useAuth } from '@/stores';
import { InputField } from '@/ui-kit';
import { VStack, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { DefaultLoginValues, ILogin, schema_login } from '../data';
export const SignIn = () => {
  const router = useRouter();
  const toast = useToast();
  const form = useForm<ILogin>({
    resolver: yupResolver(schema_login),
    defaultValues: DefaultLoginValues,
  });
  const { handleSubmit } = form;

  const setProfile = useAuth((state) => state.setProfile);

  const { mutateAsync: handleLogin, isLoading } = useMutation(
    async (data: ILogin) => {
      const res = await signIn(data);
      return res;
    },
    {
      onSuccess: async (data: any) => {
        await LocalStorage.set(PROJECT_AUTH_TOKEN, data.user);
        await setProfile(data.user);
        await router.push('/feed');
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
    <div className="flex items-center justify-center mt-[100px] mx-auto">
      <div className="mr-10 mt-8 hidden lg:block">
        <Image
          src="https://blog.hootsuite.com/wp-content/uploads/2022/01/Instagram-statistics.png"
          alt="Facebook logo"
          width={805}
          height={305}
        />
      </div>
      <div>
        <div className="border border-gray-300 mt-10 w-[550px] h-[600px] ">
          <div className="lg:block ml-[125px] mt-[50px] w-[300px] justify-center mb-16">
            <img src="https://links.papareact.com/ocw" alt="" />
          </div>
          <VStack
            spacing={6}
            as="form"
            onSubmit={handleSubmit((data) => handleLogin(data))}
          >
            <div className="w-[400px] h-[50px]  rounded-md bg-[#fafafa] text-sm">
              <InputField
                name="email"
                placeholder="Enter your email..."
                type="email"
                form={form}
              />
            </div>
            <div className="w-[400px] h-[50px]  rounded-md bg-[#fafafa] text-sm">
              <InputField
                name="password"
                placeholder="Enter your password..."
                type="password"
                form={form}
              />
            </div>
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-700 text-white w-[400px] h-[45px] ml-[75px] rounded-xl shadow-lg text-lg font-bold mt-2"
            >
              Đăng Nhập
            </button>
            <div className="flex items-center my-6">
              <hr className="ml-8 flex-grow border-gray-300" />
              <span className="px-2 text-gray-500 mx-5 font-bold">OR</span>
              <hr className="mr-8 flex-grow border-gray-300" />
            </div>
            <div className="flex flex-col items-center justify-center py-2">
              <button className="flex items-center space-x-2 text-blue-800 hover:text-blue-950 text-lg font-semibold py-2 px-4 rounded ">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                  alt="Facebook logo"
                  width={25}
                  height={25}
                />
                <span>Đăng nhập bằng Facebook</span>
              </button>
              <a
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-800 mt-5"
              >
                Quên mật khẩu?
              </a>
            </div>
          </VStack>
        </div>
        <div className="flex border items-center justify-center border-gray-300 mt-10 w-[550px] h-[90px] ">
          <p className="text-xl ">Ban chua co tai khoan u?</p>
          <p className="text-xl font-bold text-blue-500 hover:text-blue-800 ml-2 cursor-pointer">
            Dang Ki
          </p>
        </div>
      </div>
    </div>
  );
};
