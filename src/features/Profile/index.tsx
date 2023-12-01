import { useDisclosure } from '@chakra-ui/react';
import { AdditionFeed, MyFeed, UserInfo } from './components';
import { PostModal } from './components/PostModal';

type Props = {};

export const Profile = (props: Props) => {
  const { onClose } = useDisclosure();
  return (
    <div className="ml-44">
      <UserInfo />
      <AdditionFeed />
      <hr className="mx-[300px] border-gray-600"></hr>
      <MyFeed />
      <PostModal onClose={onClose} />
    </div>
  );
};
