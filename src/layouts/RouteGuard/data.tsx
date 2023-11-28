export enum Path {
  LOGIN = '/auth/sign-in',
  SIGN_UP = '/auth/sign-up',
  FORGOT_PASSWORD = '/auth/forgot-password',
}

export const publicPaths = [Path.LOGIN, Path.SIGN_UP, Path.FORGOT_PASSWORD];
