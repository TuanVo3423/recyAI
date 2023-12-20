import { useQuery } from 'react-query';
import { getMessages } from './request';
import { GetParams } from '../commonTypes';
import { IGetMessageRequest } from './types';

export const useGetMyMesages = (
  params: GetParams,
  { user_recieved_id }: IGetMessageRequest,
  options?: any
) =>
  useQuery(
    ['getMyMessages', user_recieved_id],
    async () => {
      const data = await getMessages({
        ...params,
        user_recieved_id,
      });
      return data;
    },
    { ...options }
  );
