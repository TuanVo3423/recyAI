import { useQuery } from 'react-query';
import { getMyTweets, getTweet, getTweets, getUserTweets } from './request';
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

export const useGetMyTweets = (options?: any) =>
  useQuery<ITweetsResponse>(
    ['getMyTweets'],
    async () => {
      const data = await getMyTweets();
      return data;
    },
    { ...options }
  );

export const useGetUserTweets = (userId: string, options?: any) =>
  useQuery<ITweetsResponse>(
    ['getUserTweets', userId],
    async () => {
      const data = await getUserTweets(userId);
      return data;
    },
    { ...options }
  );
