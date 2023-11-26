export interface ITweet {
  type: Number;
  audience: Number;
  content: String;
  parent_id: null;
  hashtags: Array<String>;
  mentions: Array<String>;
  medias: Number;
  guest_views: Number;
  user_views: Number;
}
