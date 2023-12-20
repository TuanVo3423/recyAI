import { GetParams } from '../commonTypes';

export interface IMessage {
  _id: string;
  content: string;
  user_id: string;
  user_recieved_id: string;
  created_at: string;
  updated_at: string;
}
export interface ICreateMessageRequest {
  user_recieved_id: string;
  content: string;
}

export interface IGetMessageRequest {
  user_recieved_id: string;
}

export interface ICreateMessagesResponse {
  message: string;
  result: IMessage;
}

export interface IGetMessageResponse {
  message: string;
  result: Array<IMessage>;
}

export interface IGetMessagesRequest extends GetParams {
  user_recieved_id: string;
}
