import { useDisclosure } from '@chakra-ui/react';
import { AdditionFeed, MyFeed, UserInfo } from './components';
import { PostModal } from './components/PostModal';
import { useState } from 'react';

type Props = {};

export const Profile = (props: Props) => {
  const { onClose } = useDisclosure();
  return (
    <div>
      <UserInfo />
      {/* <AdditionFeed /> */}
      <hr className="mx-[300px] border-gray-600 mt-10"></hr>
      <MyFeed />
      {/* <PostModal onClose={onClose} /> */}
    </div>
  );
};
