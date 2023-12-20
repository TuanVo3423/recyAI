import { IUserResponse } from '../auth';
import { IInstruction, IInstructionResponse } from '../instructions';
interface Media {
  url: string;
  type: MediaType; // video, image
}
enum MediaType {
  Image,
  Video,
}
export interface ITweet {
  instruction_id: String | null;
  user_id?: String;
  type: Number;
  audience: Number;
  content: string;
  parent_id: string | null;
  hashtags: Array<String>;
  mentions: Array<String>;
  medias: Media[];
  guest_views: Number;
  user_views: Number;
  created_at?: string;
  updated_at?: string;
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
      instruction: Array<IInstruction>;
      comments: Array<ITweet>;
      comment_count: number;
      user_info: Array<IUserResponse>;
      like_count: Number;
      likes: Array<IUserResponse>;
    }
  >;
  message: string;
  count: number;
};

export type ITweetResponse = {
  tweet: ITweet & {
    _id: string;
    user_id: string;
    created_at: string;
    updated_at: string;
    instruction: Array<IInstruction>;
    comments: Array<ITweet>;
    comment_count: number;
    user_info: Array<IUserResponse>;
    like_count: Number;
    likes: Array<IUserResponse>;
    comments_users: Array<IUserResponse>;
  };
  message: string;
};

export interface ICreateTweetRequest extends ITweet {}
export interface ICreateTweetResponse {
  message: string;
  result: {
    acknowledged: boolean;
    insertedId: string;
  };
}

export interface IGetTweetRequest {
  tweet_id: string;
}

export interface IDeleteTweetRequest {
  tweet_id: string;
}

export interface IDeleteTweetResponse {
  message: string;
}

export interface IDeleteTweetByInstructionRequest {
  instruction_id: string;
}

export interface IDeleteTweetByInstructionResponse {
  message: string;
}
