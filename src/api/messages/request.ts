import { request } from '../axios';
import { CreateMessageBody, GetMessageBody } from './types';

export const createMessages = async (data: CreateMessageBody) => {
  const res = await request({
    url: `messages`,
    method: 'POST',
    data,
  });
  return res;
};

export const getMessages = async (data: GetMessageBody) => {
  const res = await request({
    url: `messages`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    params: data,
  });
  return res;
};
