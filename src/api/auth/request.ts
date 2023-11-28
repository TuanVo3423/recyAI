import { request } from '../axios';
import { ISignIn, ISignUp } from './types';

export const signUp = async (data: ISignUp) => {
  const res = await request({
    url: `users/register`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    data,
  });
  return res;
};

export const signIn = async (data: ISignIn) => {
  const res = await request({
    url: `users/login`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    data,
  });
  return res;
};

export const getAuth = async () => {
  const res = await request({
    url: `users/me`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return res;
};
