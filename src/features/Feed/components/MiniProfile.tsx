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
    <div className="flex items-center justify-between mt-14 ml-10 ">
      <div className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% rounded-full'>
        
        <img  
        src={data.result.avatar || '/empty_avatar.png'}
        alt=""
        className="rounded-full p-[2px] w-12 h-12"
      />
        
      
      </div>
      <div className="flex-1 mx-4">
        <h2 className="font-bold text-sm">{data.result.name}</h2>
        <h3 className="text-sm text-gray-400">Welcome back</h3>
      </div>

      <button
        onClick={() => handleLogout()}
        className="text-green-400 hover:text-green-900 text-sm ml-2 font-semibold"
      >
        Sign out
      </button>
    </div>
  );
};
