import { useQuery } from 'react-query';
import { getMyTweets, getTweet, getTweets, getUserTweets } from './request';
import { GetParams } from '../commonTypes';

export const useGetTweet = (tweet_id: string, options?: any) =>
  useQuery(
    ['getTweet', tweet_id],
    async () => {
      const data = await getTweet({ tweet_id });
      return data;
    },
    { ...options }
  );

export const useGetTweets = (params: GetParams, options?: any) =>
  useQuery(
    ['getTweets', { ...params }],
    async () => {
      const data = await getTweets(params);
      return data;
    },
    { ...options }
  );

export const useGetMyTweets = (params: GetParams, options?: any) =>
  useQuery(
    ['getMyTweets'],
    async () => {
      const data = await getMyTweets(params);
      return data;
    },
    { ...options }
  );

export const useGetUserTweets = (
  userId: string,
  params: GetParams,
  options?: any
) =>
  useQuery(
    ['getUserTweets', userId],
    async () => {
      const data = await getUserTweets(userId, params);
      return data;
    },
    { ...options }
  );
