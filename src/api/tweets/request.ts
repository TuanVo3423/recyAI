import { request } from '../axios';
import { GetParams } from '../commonTypes';
import {
  ICreateTweetRequest,
  ICreateTweetResponse,
  IDeleteTweetByInstructionRequest,
  IDeleteTweetByInstructionResponse,
  IDeleteTweetRequest,
  IDeleteTweetResponse,
  IGetTweetRequest,
  ITweetResponse,
  ITweetsResponse,
} from './types';

export const createTweet = async (data: ICreateTweetRequest) => {
  const res = await request({
    url: `tweets`,
    method: 'POST',
    data,
  });
  return res as ICreateTweetResponse;
};

export const deleteTweet = async (data: IDeleteTweetRequest) => {
  const res = await request({
    url: `tweets/${data.tweet_id}`,
    method: 'DELETE',
    data,
  });
  return res as IDeleteTweetResponse;
};

export const deleteTweetByInstruction = async (
  data: IDeleteTweetByInstructionRequest
) => {
  const res = await request({
    url: `tweets/instruction/${data.instruction_id}`,
    method: 'DELETE',
    data,
  });
  return res as IDeleteTweetByInstructionResponse;
};

export const getTweet = async ({ tweet_id }: IGetTweetRequest) => {
  const res = await request({
    url: `tweets/${tweet_id}`,
    method: 'GET',
  });
  return res as ITweetResponse;
};

export const getTweets = async (query: GetParams) => {
  const res = await request({
    url: `tweets`,
    method: 'GET',
    params: query,
  });
  return res as ITweetsResponse;
};

export const getTweetsForGuest = async (query: GetParams) => {
  const res = await request({
    url: `tweets/all`,
    method: 'GET',
    params: query,
  });
  return res as ITweetsResponse;
};

export const getMyTweets = async (query: GetParams) => {
  const res = await request({
    url: `tweets/me`,
    method: 'GET',
    params: query,
  });
  return res as ITweetsResponse;
};

export const getUserTweets = async (user_id: string, query: GetParams) => {
  const res = await request({
    url: `tweets/user/${user_id}`,
    method: 'GET',
    params: query,
  });
  return res as ITweetsResponse;
};

export const getMyInstructions = async (
  user_id: number | string,
  query: GetParams
) => {
  const res = await request({
    url: `instructions/me/${user_id}`,
    method: 'GET',
    params: query,
  });
  return res;
};

export const uploadImage = async (user_id: number | string) => {
  const res = await request({
    url: `instructions/me/${user_id}`,
    method: 'GET',
  });
  return res;
};
