import { NextPage } from 'next';
import { AppProps } from 'next/app';
import { ReactElement, ReactNode } from 'react';
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export enum ERROR {
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
}

export enum QUESTION_TYPE {
  SINGLE = 'SINGLE',
  MULTI = 'MULTI',
  YESNO = 'YESNO',
}

export enum FEATURE_STATUS {
  LAUNCH = 'LAUNCH',
  COMING_SOON = 'COMING_SOON',
}

export enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned, // bị khóa
}

export enum TokenType {
  AccessToken,
  RefreshToken,
  ForgotPasswordToken,
  EmailVerifyToken,
}
