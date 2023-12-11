import { createMessages } from '@/api/messages';
import { useGetMyMesages } from '@/api/messages/queries';
import { useAuth } from '@/stores';
import { useToast } from '@chakra-ui/react';
import {
  ChevronDownIcon,
  EmojiHappyIcon,
  InformationCircleIcon,
  MailIcon,
  MicrophoneIcon,
  PencilAltIcon,
  PhoneIcon,
  PhotographIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { io } from 'socket.io-client';
type TChatProps = {};

export const Chat = (props: TChatProps) => {
  const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
    autoConnect: true,
  });

  const toast = useToast();
  const queryClient = useQueryClient();
  const profileStore = useAuth((state) => state.profile);
  const [flag, setFlag] = useState<boolean>(false);
  const [currentChatId, setCurrentChatId] = useState<string>('');
  const [text, setText] = useState<string>('');

  useEffect(() => {
    if (currentChatId) {
      socket.emit(
        'joinChat',
        profileStore._id,
        currentChatId,
        profileStore.name
      );
    }
  }, [currentChatId]);
  const { data } = useGetMyMesages(
    {},
    { user_recieved_id: currentChatId },
    {
      enabled: !!currentChatId && !flag,
      onSuccess: () => {
        setFlag(true);
      },
    }
  );

  const { mutateAsync: handleSend } = useMutation(
    async () => {
      const res = await createMessages({
        content: text,
        user_recieved_id: currentChatId,
      });
      return res;
    },
    {
      onSuccess: async (data: any) => {
        // console.log('data: ', data);
        await socket.emit('createChat', {
          created_at: data.result.created_at,
          content: data.result.content,
          user_id: data.result.user_id,
          user_recieved_id: currentChatId,
        });
        queryClient.setQueryData(
          ['getMyMessages', currentChatId],
          (oldData: any) => {
            return {
              ...oldData,
              result: [...oldData.result, data.result],
            };
          }
        );
        toast({
          description: data.message,
          status: 'success',
        });
      },
      onError: (error: any) => {
        toast({
          description: error.message,
          status: 'error',
        });
      },
    }
  );
  socket.onAny((event, ...args) => {
    console.log(event, args);
  });
  socket.on('sendChatToClient', (msg) => {
    console.log('msg: ', msg);
    queryClient.setQueryData(
      ['getMyMessages', currentChatId],
      (oldData: any) => {
        return {
          ...oldData,
          result: [...oldData.result, msg],
        };
      }
    );
  });
  console.log('data: ', data);
  const renderChat = () => {
    return (
      <div className="flex flex-col w-full gap-4 p-4 bg-white flex-1 overflow-auto">
        {data.result.map((message, idx) => {
          if (message.user_id !== profileStore._id) {
            return (
              <div className="w-full">
                <div className="w-fit bg-gray-400 p-3 text-black rounded-2xl mr-auto">
                  {message.content}
                </div>
              </div>
            );
          } else {
            return (
              <div className="w-full ">
                <div className="w-fit bg-green-400 text-sm text-white p-3 rounded-2xl ml-auto">
                  {message.content}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="flex">
      <div className="bg-white h-screen w-[350px] border-gray-300 border-x-[1px]">
        <div className="h-[110px] bg-white">
          <div className="flex items-center justify-center mx-4 pt-8">
            <div className="flex-1 flex items-center space-x-1">
              <p className="text-lg font-bold cursor-pointer">pupuchino</p>
              <ChevronDownIcon className="w-4 h-4 cursor-pointer" />
            </div>

            <PencilAltIcon className="w-7 h-7 cursor-pointer" />
          </div>
          <div className="flex items-center justify-center mx-4 pt-6">
            <div className="flex-1 flex items-center space-x-1">
              <p className="text-sm font-bold cursor-pointer">New Messages</p>
            </div>

            <p className="text-sm font-semibold text-gray-400 cursor-pointer">
              Waiting messages
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-1 bg-white border-y-[1px] py-1 border-gray-300">
          <h1 className="ml-4 text-sm text-green-400 cursor-pointer font-semibold">
            Followings
          </h1>
          <ChevronDownIcon className="h-3 w-3 text-gray-400 cursor-pointer" />
        </div>
        {profileStore.followInfo.map((user, idx) => {
          return (
            <div
              onClick={() => {
                setCurrentChatId(user._id);
              }}
              className="bg-green-200 h-[75px] flex items-center space-x-4 cursor-pointer"
            >
              <div className="ml-5">
                <img
                  src={user.avatar || '/empty_avatar.png'}
                  alt=""
                  className="w-16 h-16 rounded-full border-[1px]"
                />
              </div>
              <div>
                <p className="text-md font-normal ">{user.name}</p>
                <p className="text-xs text-gray-400 ">Online 8 mins ago</p>
              </div>
            </div>
          );
        })}

        <div>
          <div className="flex items-center space-x-1 bg-white border-b-[1px] py-1 border-gray-300">
            <h1 className="ml-4 text-sm text-green-400 cursor-pointer font-semibold">
              Followers
            </h1>
            <ChevronDownIcon className="h-3 w-3 text-gray-400 cursor-pointer" />
          </div>
          {profileStore.followerInfo.map((user, idx) => {
            return (
              <div
                onClick={() => {
                  setCurrentChatId(user._id);
                }}
                className="bg-green-200 h-[75px] flex items-center space-x-4 cursor-pointer"
              >
                <div className="ml-5">
                  <img
                    src={user.avatar || '/empty_avatar.png'}
                    alt=""
                    className="w-16 h-16 rounded-full border-[1px]"
                  />
                </div>
                <div>
                  <p className="text-md font-normal ">{user.name}</p>
                  <p className="text-xs text-gray-400 ">Online 8 mins ago</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-1 flex-col h-screen max-h-screen bg-white">
        <div className="bg-white flex border-gray-300 h-[75px] w-[full] border-b-[1px]">
          <div className="flex flex-1 items-center space-x-3 ml-3">
            <img
              src="https://mcdn.coolmate.me/image/March2023/meme-meo-2.jpg"
              alt=""
              className="w-12 h-12 rounded-full border-[1px]"
            />
            <div>
              <p className="text-md font-semibold cursor-pointer">pupuchino</p>
              <p className="text-xs text-gray-400 ">Online 8 mins ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 mr-5">
            <PhoneIcon className="w-7 h-7 cursor-pointer" />
            <VideoCameraIcon className="w-7 h-7 cursor-pointer" />
            <InformationCircleIcon className="w-7 h-7 cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col w-full gap-4 p-4 bg-white flex-1 overflow-auto">
          {data && renderChat()}
        </div>
        <div className="bg-white flex items-center border-[1px] px-4 border-gray-300 h-[75px] w-full">
          <div className="rounded-3xl w-full flex items-center border-[1px] border-gray-300 h-[45px]">
            <EmojiHappyIcon className="w-7 h-7 ml-3 cursor-pointer" />
            <input
              onChange={(e) => setText(e.target.value)}
              type="text"
              placeholder="Enter message ..."
              className="border-none flex-1 focus:ring-0 outline-none bg-white w-[710px] rounded-xl mx-4 p-2 cursor-text"
            />
            <div className="flex mr-3 space-x-2">
              <MicrophoneIcon className="w-7 h-7 cursor-pointer" />
              <PhotographIcon className="w-6 h-7 cursor-pointer" />
              <MailIcon
                onClick={() => {
                  handleSend();
                }}
                className="w-7 h-7 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
