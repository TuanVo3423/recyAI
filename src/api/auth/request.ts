import { request } from '../axios';
import { ILogout, ISignIn, ISignUp, SearchUser, UpdateMe } from './types';

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

export const Logout = async (data: ILogout) => {
  const res = await request({
    url: `users/logout`,
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

export const updateMe = async (data: UpdateMe) => {
  const res = await request({
    url: `users/me`,
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    data,
  });
  return res;
};

export const getUserList = async (data: SearchUser) => {
  console.log(data.name);
  const res = await request({
    url: `users/search`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    params: data,
  });
  return res;
};
