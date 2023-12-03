import { signIn } from '@/api/auth';
import { PROJECT_AUTH_TOKEN } from '@/constants';
import { LocalStorage } from '@/services/localStorage';
import { useAuth } from '@/stores';
import { InputField } from '@/ui-kit';
import { Button, VStack, useToast } from '@chakra-ui/react';
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
        await LocalStorage.set('REFRESH_TOKEN', data.result.refresh_token);
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
    <div className="flex items-center justify-center mt-[40px] mx-auto">
      <div className="mr-10 mt-8 hidden lg:block">
        <Image
          src="https://blog.hootsuite.com/wp-content/uploads/2022/01/Instagram-statistics.png"
          alt="Facebook logo"
          width={605}
          height={205}
        />
      </div>
      <div>
        <div className="border border-gray-300 mt-10 w-[350px] h-[400px] ">
          <div className="lg:block ml-[95px] mt-[30px] w-[160px] justify-center mb-6">
            <img src="https://links.papareact.com/ocw" alt="" />
          </div>
          <VStack
            spacing={6}
            as="form"
            onSubmit={handleSubmit((data) => handleLogin(data))}
          >
            <div className="w-[290px] h-[35px] -mb-3 rounded-md bg-[#fafafa] text-xs">
              <InputField
                name="email"
                placeholder="Enter your email..."
                type="email"
                form={form}
              />
            </div>
            <div className="w-[290px] h-[35px]  rounded-md bg-[#fafafa] text-xs">
              <InputField
                name="password"
                placeholder="Enter your password..."
                type="password"
                form={form}
              />
            </div>
            {isLoading ? (
              <Button
                h="30px"
                rounded="xl"
                className="w-[200px]  ml-[75px]"
                isLoading
              ></Button>
            ) : (
              <button
                type="submit"
                className="-mb-6 bg-blue-400 hover:bg-blue-700 text-white w-[200px] h-[30px] ml-[75px] rounded-xl shadow-lg text-xs font-bold mt-2"
              >
                Đăng Nhập
              </button>
            )}

            <div className="font-bold -mt-4 text-gray-500">OR</div>
            <div className="flex flex-col items-center justify-center ">
              <button className="flex items-center space-x-2 text-blue-800 hover:text-blue-950 text-lg font-semibold -mt-3 px-4 rounded ">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                  alt="Facebook logo"
                  width={20}
                  height={20}
                />
                <span className="text-sm">Đăng nhập bằng Facebook</span>
              </button>
              <a
                href="/forgot-password"
                className="text-blue-600 text-xs hover:text-blue-800 mt-3"
              >
                Quên mật khẩu?
              </a>
            </div>
          </VStack>
        </div>
        <div className="flex border items-center justify-center border-gray-300 mt-5 w-[350px] h-[60px] ">
          <p className="text-sm ">Ban chua co tai khoan u?</p>
          <p
            onClick={() => router.push('/auth/sign-up')}
            className="text-sm font-bold text-blue-500 hover:text-blue-800 ml-2 cursor-pointer"
          >
            Dang Ki
          </p>
        </div>
      </div>
    </div>
  );
};
