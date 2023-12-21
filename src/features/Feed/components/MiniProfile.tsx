import { Logout, useGetAuth } from '@/api/auth';
import { LocalStorage } from '@/services/localStorage';
import { Button, useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { PROJECT_AUTH_TOKEN } from '@/constants';
export const MiniProfile = () => {
  const toast = useToast();
  const router = useRouter();
  const { data, isLoading, refetch } = useGetAuth({
    enabled: !!LocalStorage.get(PROJECT_AUTH_TOKEN),
  });
  const { mutateAsync: handleLogout } = useMutation(
    async () => {
      const res = await Logout({
        refresh_token: LocalStorage.get('REFRESH_TOKEN'),
      });
      return res;
    },
    {
      onSuccess: (data) => {
        localStorage.clear();
        deleteCookie('Authorization');
        router.push('/auth/sign-in');
        toast({
          description: data.message,
          status: 'success',
        });
      },
      onError: (err: any) => {
        toast({
          description: err.message,
          status: 'error',
        });
      },
    }
  );
  return (
    <div className="flex items-center justify-between mt-14 ml-10 ">
      <div className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-full">
        <img
          src={(data && data.user.avatar) || '/empty_avatar.png'}
          alt=""
          className="rounded-full p-[2px] w-12 h-12"
        />
      </div>
      <div className="flex-1 mx-4">
        <h2 className="font-bold text-sm">
          {(data && data.user.name) || 'Guest'}
        </h2>
        <h3 className="text-sm text-gray-400">Welcome back</h3>
      </div>
      {data && data.user.name ? (
        <button
          onClick={() => handleLogout()}
          className="btn-no-fill-secondary"
        >
          Sign out
        </button>
      ) : (
        <button
          onClick={() => router.push('auth/sign-in')}
          className="btn-no-fill-secondary"
        >
          Sign in
        </button>
      )}
    </div>
  );
};
