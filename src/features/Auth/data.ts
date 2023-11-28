import {
  schema_confirm_password,
  schema_email_required,
  schema_password_required,
  schema_string_no_length_required,
} from '@/form/schema';
import * as Yup from 'yup';
export const schema_login = Yup.object({
  email: schema_email_required,
  password: schema_password_required,
});

export const schema_signup = Yup.object({
  email: schema_email_required,
  password: schema_password_required,
  confirm_password: schema_confirm_password,
  name: schema_string_no_length_required,
  date_of_birth: schema_string_no_length_required,
});

export interface ILogin {
  email: string;
  password: string;
}

export interface ISignup {
  email: string;
  password: string;
  confirm_password: string;
  name: string;
  date_of_birth: string;
}

export const DefaultLoginValues: ILogin = {
  email: '',
  password: '',
};

export const DefaultSignupValues: ISignup = {
  email: '',
  password: '',
  confirm_password: '',
  name: '',
  date_of_birth: '',
};
