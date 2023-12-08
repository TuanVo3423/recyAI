import { request } from '../axios';
import {
  FollowUser,
  ILogout,
  ISignIn,
  ISignUp,
  SearchUser,
  UpdateMe,
} from './types';

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

export const getUser = async (userId: string) => {
  const res = await request({
    url: `users/${userId}`,
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

export const follow = async (data: FollowUser) => {
  const res = await request({
    url: `users/follow`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
    data,
  });
  return res;
};

export const unFollow = async (followed_user_id: string) => {
  const res = await request({
    url: `users/follow/${followed_user_id}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  return res;
};
