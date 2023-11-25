import React from 'react';
import { MyFeed, UserInfo, AdditionFeed } from './components';

type Props = {};

export const Profile = (props: Props) => {
  return (
    <div>
      <UserInfo />
      <AdditionFeed />
      <hr className="mx-[500px] border-gray-600"></hr>
      <MyFeed />
    </div>
  );
};
