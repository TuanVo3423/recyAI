import { ITweet, createTweet } from '@/api/tweets';
enum TweetType {
  Tweet,
  Retweet,
  Comment,
  QuoteTweet,
}

interface Media {
  url: string;
  type: MediaType; // video, image
}
enum MediaType {
  Image,
  Video,
}
export const TweetWithInstruction = async ({
  instruction_id,
  content,
}: {
  instruction_id: string;
  content: string;
}) => {
  return await createTweet({
    instruction_id: instruction_id,
    content,
    audience: 1,
    type: TweetType.Tweet,
    parent_id: null,
    hashtags: [],
    mentions: [],
    medias: [],
    guest_views: 10,
    user_views: 10,
  });
};

export const TweetWithImages = async ({
  instruction_id,
  content,
  images,
}: {
  instruction_id: string;
  content: string;
  images: Media[];
}) => {
  const res = await createTweet({
    instruction_id: instruction_id,
    content,
    audience: 1,
    type: TweetType.Tweet,
    parent_id: null,
    hashtags: [],
    mentions: [],
    medias: images,
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
    medias: [],
    guest_views: 10,
    user_views: 10,
  });
  return res;
};
