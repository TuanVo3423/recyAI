import { UserVerifyStatus } from '@/types';

export interface ISignUp {
  email: string;
  name: string;
  password: string;
  guestId?: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface ILogout {
  refresh_token: string;
}

export interface IUserResponse {
  _id: string;
  name: string;
  email: string;
  date_of_birth: Date;
  password: string;
  created_at?: Date;
  updated_at?: Date;
  email_verify_token?: string;
  forgot_password_token?: string;
  verify: UserVerifyStatus;

  bio: string;
  location: string;
  website: string;
  username: string;
  avatar: string;
  cover_photo: string;
}
