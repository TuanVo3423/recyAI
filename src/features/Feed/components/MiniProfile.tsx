import { Logout, useGetAuth } from '@/api/auth';
import { LocalStorage } from '@/services/localStorage';
import { useToast } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
export const MiniProfile = () => {
  const toast = useToast();
  const router = useRouter();
  const { data, isLoading, refetch } = useGetAuth();
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
        router.reload();
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
    <div className="flex items-center justify-between mt-14 ml-10">
      <img
        src={data.result.avatar || '/empty_avatar.png'}
        alt=""
        className="rounded-full border p-[2px] w-12 h-12"
      />
      <div className="flex-1 mx-4">
        <h2 className="font-bold text-sm">{data.result.name}</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>

      <button
        onClick={() => handleLogout()}
        className="text-blue-400 text-sm ml-2 font-semibold"
      >
        Sign out
      </button>
    </div>
  );
};
