import { useQuery } from 'react-query';
import { getMyInstructions } from './request';
// import { getDocument } from './request';

export const useGetMyCollections = (options?: any) =>
  useQuery(
    ['getMyCollections'],
    async () => {
      const data = await getMyInstructions();
      return data;
    },
    { ...options }
  );
