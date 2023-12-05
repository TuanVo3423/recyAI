import { IUserResponse } from '../auth';
import { IInstructionResponse } from '../instructions';

export interface ITweet {
  instruction_id: String | null;
  user_id: String;
  type: Number;
  audience: Number;
  content: string;
  parent_id: string | null;
  hashtags: Array<String>;
  mentions: Array<String>;
  medias: Number;
  guest_views: Number;
  user_views: Number;
  created_at: string;
  updated_at: string;
}

export interface ITweetUpdate extends Partial<ITweet> {
  _id: string;
}

export type ITweetsResponse = {
  tweets: Array<
    ITweet & {
      _id: string;
      user_id: string;
      created_at: string;
      updated_at: string;
      instruction: Array<IInstructionResponse>;
      comments: Array<ITweet>;
      comment_count: number;
      user_info: Array<IUserResponse>;
      like_count: Number;
      likes: Array<IUserResponse>;
    }
  >;
};

export type ITweetResponse = {
  tweet: Array<
    ITweet & {
      _id: string;
      user_id: string;
      created_at: string;
      updated_at: string;
      instruction: Array<IInstructionResponse>;
      comments: Array<ITweet>;
      comment_count: number;
      user_info: Array<IUserResponse>;
      like_count: Number;
      likes: Array<IUserResponse>;
      comments_users: Array<IUserResponse>;
    }
  >;
};
