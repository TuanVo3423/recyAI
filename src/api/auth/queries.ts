import { useQuery } from 'react-query';
import { getAuth, getUserList } from './request';
import { SearchUser } from './types';

export const useGetAuth = (options?: any) =>
  useQuery(
    ['getAuth'],
    async () => {
      const data = await getAuth();
      return data;
    },
    { ...options }
  );


