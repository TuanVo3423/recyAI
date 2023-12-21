import { useDisclosure } from '@chakra-ui/react';
import { AdditionFeed, MyFeed, UserInfo } from './components';
import { PostModal } from './components/PostModal';

type Props = {};

export const User = (props: Props) => {
  return (
    <div>
      <UserInfo />
      {/* <AdditionFeed /> */}
      <hr className="mx-[300px] border-gray-600 mt-10"></hr>
      <MyFeed />
    </div>
  );
};
