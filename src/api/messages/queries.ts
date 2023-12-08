import { useQuery } from 'react-query';
import { GetMessageBody } from './types';
import { getMessages } from './request';

export const useGetMyMesages = (user_recieved_id: string, options?: any) =>
  useQuery(
    ['getMyMessages', user_recieved_id],
    async () => {
      const data = await getMessages({
        user_recieved_id: user_recieved_id,
      });
      return data;
    },
    { ...options }
  );
