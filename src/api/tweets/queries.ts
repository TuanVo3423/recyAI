import { useQuery } from 'react-query';
import { getTweets } from './request';
// import { getDocument } from './request';

export const useGetDocument = (selectionId: number, options?: any) =>
  useQuery(
    ['getDocument'],
    async () => {
      // const data = await getDocument(selectionId);
      // return data;
    },
    { ...options }
  );

export const useGetTweets = (options?: any) =>
  useQuery(
    ['getTweets'],
    async () => {
      const data = await getTweets();
      return data;
    },
    { ...options }
  );
