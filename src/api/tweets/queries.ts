import { useQuery } from 'react-query';
import { getTweet, getTweets } from './request';
import { ITweetResponse, ITweetsResponse } from './types';
// import { getDocument } from './request';

export const useGetTweet = (tweetId: string, options?: any) =>
  useQuery<ITweetResponse>(
    ['getTweet', tweetId],
    async () => {
      const data = await getTweet(tweetId);
      return data;
    },
    { ...options }
  );

export const useGetTweets = (options?: any) =>
  useQuery<ITweetsResponse>(
    ['getTweets'],
    async () => {
      const data = await getTweets();
      return data;
    },
    { ...options }
  );
