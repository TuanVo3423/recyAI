import { request } from '../axios';
import { ITweet, ITweetUpdate } from './types';

export const createTweet = async (data: ITweet) => {
  const res = await request({
    url: `tweets`,
    method: 'POST',
    data,
  });
  return res;
};

export const getTweet = async (tweetId: string) => {
  const res = await request({
    url: `tweets/${tweetId}`,
    method: 'GET',
  });
  return res;
};

export const getTweets = async () => {
  const res = await request({
    url: `tweets`,
    method: 'GET',
  });
  return res;
};

export const getMyTweets = async () => {
  const res = await request({
    url: `tweets/me`,
    method: 'GET',
  });
  return res;
};

export const getMyInstructions = async (UserID: number | string) => {
  const res = await request({
    url: `instructions/me/${UserID}`,
    method: 'GET',
  });
  return res;
};

export interface UploadImagesBody {
  images: Array<Image>;
}

export interface Image {
  src: string;
  height: number;
  width: number;
}

export const uploadImage = async (UserID: number | string) => {
  const res = await request({
    url: `instructions/me/${UserID}`,
    method: 'GET',
  });
  return res;
};
