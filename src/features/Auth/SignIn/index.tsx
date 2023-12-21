import { ISignInRequest, signIn } from '@/api/auth';
import { PROJECT_AUTH_TOKEN } from '@/constants';
import { LocalStorage } from '@/services/localStorage';
import { useAuth } from '@/stores';
import { InputField } from '@/ui-kit';
import { Button, VStack, useToast } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { UserCircleIcon } from '@heroicons/react/outline';
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
    async (data: ISignInRequest) => {
      const res = await signIn(data);
      return res;
    },
    {
      onSuccess: async (data) => {
        await LocalStorage.set(PROJECT_AUTH_TOKEN, data.user);
        await LocalStorage.set('REFRESH_TOKEN', data.tokens.refresh_token);
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
    <div className="relative mx-auto">
      <div className="w-[980px] ml-[40px] mt-6 hidden lg:block">
        <img
          src="https://assets-global.website-files.com/5f16d530791d4326e79cd1b0/60bd1230b185b384bb7defb6_Tree%20Map.png"
          alt=""
        />
      </div>
      <div className="absolute top-20 right-32 rounded-xl bg-white">
        <div className="border-[1px] rounded-xl shadow-lg w-[350px] h-[400px] ">
          <div className="lg:block ml-[95px] w-[160px] justify-center -mb-1 mt-6 h-[100px]">
            <img
              src="https://yesrecycling.org/wp-content/uploads/2022/02/Yes-Recycling_Logo-green.png"
              alt=""
              className=""
            />
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
                className="-mb-6 bg-green-400 hover:bg-green-700 text-white w-[160px] h-[30px] ml-[75px] rounded-xl shadow-lg text-xs font-bold mt-2"
              >
                Log in
              </button>
            )}
          </VStack>
          <VStack mt={10} spacing={4}>
            <div className="font-bold -mt-4 text-gray-500">OR</div>
            <div className="flex items-center justify-center ">
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
              <button
                onClick={() => router.push('/feed')}
                className="flex items-center text-blue-800 hover:text-blue-950 text-lg font-semibold -mt-3 px-4 rounded "
              >
                <UserCircleIcon
                  //
                  className="w-6 text-green-400 hover:text-green-800 h-6"
                />
                {/* <span className="text-sm">Log in by Facebook</span> */}
              </button>
            </div>
            <a
              onClick={() => router.push('/auth/forgot-password')}
              className="text-green-600 text-xs cursor-pointer hover:text-green-900 mt-3"
            >
              Forgot password?
            </a>
          </VStack>
        </div>
        <div className="h-[20px] bg-transparent"></div>
        <div className="flex border-[1px] rounded-xl shadow-lg items-center justify-center border-gray-300 w-[350px] h-[60px] ">
          <p className="text-sm ">Don't have account?</p>
          <p
            onClick={() => router.push('/auth/sign-up')}
            className="text-sm font-bold text-green-500 hover:text-green-800 ml-2 cursor-pointer"
          >
            Register now
          </p>
        </div>
      </div>
    </div>
  );
};
