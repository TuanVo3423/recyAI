import { IUserResponse } from '../auth';
import { IInstructionResponse } from '../instructions';

export interface ITweet {
  instruction_id: String | null;
  type: Number;
  audience: Number;
  content: string;
  parent_id: string | null;
  hashtags: Array<String>;
  mentions: Array<String>;
  medias: Number;
  guest_views: Number;
  user_views: Number;
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
    }
  >;
};

export type ITweetResponse = {
  tweet: Array<
    ITweetsResponse & {
      _id: string;
      user_id: string;
      created_at: string;
      updated_at: string;
      instruction: Array<IInstructionResponse>;
      comments: Array<ITweet>;
      comment_count: number;
      user_info: IUserResponse;
    }
  >;
};
