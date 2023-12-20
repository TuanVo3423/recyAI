import { ProfilePosts } from './ProfilePosts';
type Props = {};

export const MyFeed = ({}: Props) => {
  return (
    <div className="grid grid-cols-1 xl:max-w-2xl mx-auto">
      <ProfilePosts />
    </div>
  );
};
