import { ITweet, createTweet } from '@/api/tweets';
enum TweetType {
  Tweet,
  Retweet,
  Comment,
  QuoteTweet,
}
export const TweetWithInstruction = async ({
  instruction_id,
  content,
}: {
  instruction_id: string;
  content: string;
}) => {
  const res = await createTweet({
    instruction_id: instruction_id,
    content,
    audience: 1,
    type: TweetType.Tweet,
    parent_id: null,
    hashtags: ['#recycling'],
    mentions: ['@tuanvo'],
    medias: 1,
    guest_views: 10,
    user_views: 10,
  });
  return res;
};

export const CommentTweet = async ({
  parent_id,
  content,
}: {
  parent_id: string;
  content: string;
}) => {
  const res = await createTweet({
    instruction_id: null,
    content,
    audience: 1,
    type: TweetType.Comment,
    parent_id: parent_id,
    hashtags: ['#recycling'],
    mentions: ['@tuanvo'],
    medias: 1,
    guest_views: 10,
    user_views: 10,
  });
  return res;
};
