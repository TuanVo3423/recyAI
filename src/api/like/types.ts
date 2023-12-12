export interface ILike {
  tweet_id: string;
}

export interface ICreateLikeRequest extends ILike {}
export interface ICreateLikeResponse {
  message: string;
  like: {
    acknowledged: boolean;
    insertedId: string;
  };
}
export interface IUnLikeRequest extends ILike {}

export interface IUnLikeResponse {
  message: string;
  like: {
    acknowledged: boolean;
    deletedCount: string;
  };
}
