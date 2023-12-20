import { useQuery } from 'react-query';
import { getAuth, getUser, getUserList } from './request';

export const useGetAuth = (options?: any) =>
  useQuery(
    ['getAuth'],
    async () => {
      const data = await getAuth();
      return data;
    },

    { ...options }
  );

export const useGetUser = (userId: string, options?: any) =>
  useQuery(
    ['getUser', userId],
    async () => {
      const data = await getUser(userId);
      return data;
    },

    { ...options }
  );
