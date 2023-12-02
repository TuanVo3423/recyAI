import { request } from '../axios';
import { ILike } from './types';

export const createLike = async (data: ILike) => {
  const res = await request({
    url: `likes`,
    method: 'POST',
    data,
  });
  return res;
};

export const unLike = async (data: ILike) => {
  const res = await request({
    url: `likes`,
    method: 'DELETE',
    data,
  });
  return res;
};
