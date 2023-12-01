import { request } from '../axios';
import { ITweet } from './types';

export const createTweet = async (data: ITweet) => {
  const res = await request({
    url: `tweets`,
    method: 'POST',
    data,
  });
  return res;
};

// export const generateDocument = async (selectionId: number) => {
//   const res = await request({
//     url: `/chatgpt/generate-document/${selectionId}`,
//     method: 'POST',
//   });
//   return res;
// };

// export const generateUserflow = async (selectionId: number) => {
//   const res = await request({
//     url: `/chatgpt/generate-user-flow/${selectionId}`,
//     method: 'POST',
//   });
//   return res;
// };

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

export const getMyInstructions = async (UserID: number | string) => {
  const res = await request({
    url: `instructions/me/${UserID}`,
    method: 'GET',
  });
  return res;
};
