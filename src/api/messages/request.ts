import { request } from '../axios';
import { GetParams } from '../commonTypes';
import {
  ICreateMessageRequest,
  ICreateMessagesResponse,
  IGetMessageRequest,
  IGetMessageResponse,
} from './types';

export const createMessages = async (data: ICreateMessageRequest) => {
  const res = await request({
    url: `messages`,
    method: 'POST',
    data,
  });
  return res as ICreateMessagesResponse;
};

export const getMessages = async ({
  query
}: {
  query: GetParams & { user_recieved_id: string };
}) => {
  const res = await request({
    url: `messages`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    params: query,
  });
  return res as IGetMessageResponse;
};
