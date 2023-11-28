import { AdditionFeed, MyFeed, UserInfo } from './components';

type Props = {};

export const Profile = (props: Props) => {
  return (
    <div className='ml-44'>
      <UserInfo />
      <AdditionFeed />
      <hr className="mx-[500px] border-gray-600"></hr>
      <MyFeed />
    </div>
  );
};
