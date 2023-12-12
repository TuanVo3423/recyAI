import { request } from '../axios';
import {
  ICreateLikeRequest,
  ICreateLikeResponse,
  ILike,
  IUnLikeRequest,
  IUnLikeResponse,
} from './types';

export const createLike = async (data: ICreateLikeRequest) => {
  const res = await request({
    url: `likes`,
    method: 'POST',
    data,
  });
  return res as ICreateLikeResponse;
};

export const unLike = async (data: IUnLikeRequest) => {
  const res = await request({
    url: `likes`,
    method: 'DELETE',
    data,
  });
  return res as IUnLikeResponse;
};
