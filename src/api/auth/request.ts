import { request } from '../axios';
import {
  IFollowUserRequest,
  ISignInRequest,
  ISignUp,
  ISearchUserRequest,
  ISignInResponse,
  IUpdateMeRequest,
  IGetMeResponse,
  ILogoutResponse,
  ILogoutRequest,
  IRegisterResponse,
  IGetUSerResponse,
  IUpdateMeResponse,
  IgetUserListResponse,
  IFollowUserResponse,
  IUnFollowUserRequest,
  IUnFollowUserResponse,
  IForgotPasswordRequest,
  IForgotPasswordResponse,
  IResetPasswordRequest,
  IResetPasswordResponse,
  ImailVerifyTokenResponse,
  IverifyMailTokenRequest,
  IverifyMailTokenResponse,
} from './types';

const URL = 'users';
const configs = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
};

export const signUp = async (data: ISignUp) => {
  const res = await request({
    url: `${URL}/register`,
    method: 'POST',
    ...configs,
    data,
  });
  return res as IRegisterResponse;
};

export const signIn = async (data: ISignInRequest) => {
  const res = await request({
    url: `${URL}/login`,
    method: 'POST',
    ...configs,
    data,
  });
  return res as ISignInResponse;
};

export const Logout = async (data: ILogoutRequest) => {
  const res = await request({
    url: `${URL}/logout`,
    method: 'POST',
    ...configs,
    data,
  });
  return res as ILogoutResponse;
};

export const getAuth = async () => {
  const res = await request({
    url: `${URL}/me`,
    method: 'GET',
    ...configs,
  });
  return res as IGetMeResponse;
};

export const getUser = async (userId: string) => {
  const res = await request({
    url: `${URL}/${userId}`,
    method: 'GET',
    ...configs,
  });
  return res as IGetUSerResponse;
};

export const updateMe = async (data: IUpdateMeRequest) => {
  const res = await request({
    url: `${URL}/me`,
    method: 'PATCH',
    ...configs,
    data,
  });
  return res as IUpdateMeResponse;
};

export const getUserList = async (data: ISearchUserRequest) => {
  const res = await request({
    url: `${URL}/search`,
    method: 'GET',
    ...configs,
    params: data,
  });
  return res as IgetUserListResponse;
};

export const follow = async (data: IFollowUserRequest) => {
  const res = await request({
    url: `${URL}/follow`,
    method: 'POST',
    ...configs,
    data,
  });
  return res as IFollowUserResponse;
};

export const unFollow = async ({ followed_user_id }: IUnFollowUserRequest) => {
  const res = await request({
    url: `${URL}/follow/${followed_user_id}`,
    method: 'DELETE',
    ...configs,
  });
  return res as IUnFollowUserResponse;
};

export const forgotPassword = async (data: IForgotPasswordRequest) => {
  const res = await request({
    url: `${URL}/forgot-password`,
    method: 'POST',
    ...configs,
    data,
  });
  return res as IForgotPasswordResponse;
};

export const resetPassword = async (data: IResetPasswordRequest) => {
  const res = await request({
    url: `${URL}/reset-password`,
    method: 'POST',
    ...configs,
    data,
  });
  return res as IResetPasswordResponse;
};

export const mailVerifyToken = async () => {
  const res = await request({
    url: `${URL}/mail-verify-token`,
    method: 'POST',
    ...configs,
  });
  return res as ImailVerifyTokenResponse;
};

export const verifyMailToken = async (data: IverifyMailTokenRequest) => {
  const res = await request({
    url: `${URL}/verify-email`,
    method: 'POST',
    ...configs,
    data,
  });
  return res as IverifyMailTokenResponse;
};
