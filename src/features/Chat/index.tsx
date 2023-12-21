import { getUser } from '@/api/auth';
import { createMessages, getMessages } from '@/api/messages';
import { useGetMyMesages } from '@/api/messages/queries';
import { PopoverComingSoon } from '@/components';
import { Quadrilateral } from '@/components/skeleton';
import { SendIcon } from '@/icons';
import { useAuth } from '@/stores';
import { ChatIcon } from '@chakra-ui/icons';
import { Box, Heading, useToast, Text } from '@chakra-ui/react';
import {
  ChatAlt2Icon,
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
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query';
import { io } from 'socket.io-client';
type TChatProps = {};

export const Chat = (props: TChatProps) => {
  const socket = io(process.env.NEXT_PUBLIC_API_BASE_URL, {
    autoConnect: true,
  });

  const toast = useToast();
  const queryClient = useQueryClient();
  const profileStore = useAuth((state) => state.profile);
  const [currentChatId, setCurrentChatId] = useState<string>('');
  // const [infoReciever, setInfoReciever] = useState<any>();
  const [text, setText] = useState<string>('');
  const { mutate, data: infoReciever } = useMutation(
    async (id: string) => {
      const res = await getUser(id);
      return res;
    }
    // },
    // {
    //   onSuccess: (data) => {},
    // }
  );

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
      enabled: !!currentChatId,
    }
  );
  // const { ref, inView } = useInView();
  // const {
  //   data,
  //   status,
  //   isFetchingNextPage,
  //   fetchNextPage,
  //   hasNextPage,
  //   refetch,
  // } = useInfiniteQuery(
  //   'getMessages',
  //   async ({ pageParam = 1 }) => {
  //     const res = await getMessages({
  //       page: pageParam,
  //       user_recieved_id: currentChatId,
  //     });
  //     return res;
  //   },
  //   {
  //     getNextPageParam: (lastPage, allPages) => {
  //       const nextPage = lastPage.message.length
  //         ? allPages.length + 1
  //         : undefined;
  //       return nextPage;
  //     },
  //     enabled: !!currentChatId,
  //   }
  // );
  // const renderChat = () =>
  //   data?.pages.map((page, idx) => {
  //     return page.result.map((message, messIdx) => {
  //       if (message.user_id !== profileStore._id) {
  //         if (messIdx === 0) {
  //           return (
  //             <div key={messIdx} className="w-full">
  //               <div
  //                 ref={ref}
  //                 className="w-fit bg-gray-400 p-3 text-black rounded-2xl mr-auto"
  //               >
  //                 {message.content}
  //               </div>
  //             </div>
  //           );
  //         } else {
  //           return (
  //             <div key={messIdx} className="w-full">
  //               <div className="w-fit bg-gray-400 p-3 text-black rounded-2xl mr-auto">
  //                 {message.content}
  //               </div>
  //             </div>
  //           );
  //         }
  //       } else {
  //         if (messIdx === 0) {
  //           return (
  //             <div key={messIdx} className="w-full ">
  //               <div
  //                 ref={ref}
  //                 className="w-fit bg-green-400 text-sm text-white p-3 rounded-2xl ml-auto"
  //               >
  //                 {message.content}
  //               </div>
  //             </div>
  //           );
  //         } else {
  //           return (
  //             <div key={messIdx} className="w-full ">
  //               <div
  //                 ref={ref}
  //                 className="w-fit bg-green-400 text-sm text-white p-3 rounded-2xl ml-auto"
  //               >
  //                 {message.content}
  //               </div>
  //             </div>
  //           );
  //         }
  //       }
  //     });
  //   });
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef(null);
    useEffect(() => elementRef?.current.scrollIntoView());
    return <div ref={elementRef} />;
  };
  // useEffect(() => {
  //   if (inView && hasNextPage) {
  //     fetchNextPage();
  //   }
  // }, [inView]);

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
        setText('');
        // toast({
        //   description: data.message,
        //   status: 'success',
        // });
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
      <>
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
      </>
    );
  };

  return (
    <div className="flex  h-screen">
      <div className="bg-white lg:w-[350px] w-[100px] flex-shrink  border-gray-300 border-x-[1px]">
        <div className="h-[110px] bg-white">
          <div className="flex items-center justify-center mx-4 pt-8">
            <div className="flex-1 flex items-center space-x-1">
              <p className="lg:text-lg text-md font-bold cursor-pointer">
                {profileStore && profileStore.name}
              </p>

              <ChevronDownIcon className="w-4 h-4 cursor-pointer" />
            </div>
            <PopoverComingSoon>
              <PencilAltIcon className="w-7 h-7 cursor-pointer" />
            </PopoverComingSoon>
          </div>
          <div className="flex lg:flex-row flex-col items-center justify-center mx-4 pt-6">
            <div className="flex-1 flex items-center space-x-1">
              <p className="text-sm font-bold cursor-pointer">Messages</p>
            </div>

            <p className="text-sm font-semibold text-gray-400 cursor-pointer lg:block hidden">
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
        {profileStore &&
          profileStore.followInfo.map((user, idx) => {
            return (
              <div
                onClick={async () => {
                  setCurrentChatId(user._id);
                  mutate(user._id);
                }}
                className="bg-green-200 lg:h-[75px] flex items-center space-x-4 cursor-pointer"
              >
                <div className="ml-5 hidden lg:block">
                  <img
                    src={user.avatar || '/empty_avatar.png'}
                    alt=""
                    className="lg:w-16 lg:h-16 h-14 w-14 rounded-full border-[1px]"
                  />
                </div>
                <div>
                  <p className="lg:text-md text-sm font-normal ">{user.name}</p>
                  <p className="text-xs text-gray-400 ">Online now</p>
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
          {profileStore &&
            profileStore.followerInfo.map((user, idx) => {
              return (
                <div
                  onClick={() => {
                    setCurrentChatId(user._id);
                    mutate(user._id);
                  }}
                  className="bg-green-200 lg:h-[75px] flex items-center space-x-4 cursor-pointer"
                >
                  <div className="ml-5  hidden lg:block">
                    <img
                      src={user.avatar || '/empty_avatar.png'}
                      alt=""
                      className="w-16 h-16 rounded-full border-[1px]"
                    />
                  </div>
                  <div>
                    <p className="text-md font-normal ">{user.name}</p>
                    <p className="text-xs text-gray-400 ">Online now</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex lg:flex-1 flex-col bg-white">
        {currentChatId ? (
          <div className="bg-white flex border-gray-300 h-[75px] w-[full] border-b-[1px]">
            <div className="flex flex-1 items-center space-x-3 ml-3">
              <img
                src={infoReciever?.user.avatar || 'empty_avatar.png'}
                alt=""
                className="w-12 h-12 rounded-full border-[1px]"
              />
              <div>
                <p className="lg:text-md text-xs font-semibold cursor-pointer">
                  {infoReciever?.user.name}
                </p>
                <p className="text-xs text-gray-400 ">Online now</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 mr-5">
              <PopoverComingSoon>
                <PhoneIcon className="lg:w-7 lg:h-7 w-4 h-3 cursor-pointer" />
              </PopoverComingSoon>
              <PopoverComingSoon>
                <VideoCameraIcon className="lg:w-7 lg:h-7 w-4 h-3 cursor-pointer" />
              </PopoverComingSoon>
              <PopoverComingSoon>
                <InformationCircleIcon className="lg:w-7 lg:h-7 w-4 h-3 cursor-pointer" />
              </PopoverComingSoon>
            </div>
          </div>
        ) : (
          <div className="bg-white flex items-center justify-center border-gray-300 h-[75px] w-[full] border-b-[1px]">
            <Text>Select user who you want to chat!</Text>
          </div>
        )}

        <div className="flex flex-col justify-start w-full gap-4 p-4  overflow-auto flex-1 ">
          {data && renderChat()}
          <AlwaysScrollToBottom />
        </div>
        <div className="bg-white flex items-center border-[1px] px-4 border-gray-300 h-[75px] w-full">
          <div className="rounded-3xl w-full flex items-center border-[1px] border-gray-300 h-[45px]">
            <PopoverComingSoon>
              <EmojiHappyIcon className="w-7 h-7 ml-3 cursor-pointer" />
            </PopoverComingSoon>
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.keyCode === 13 && handleSend()}
              type="text"
              placeholder="Enter message ..."
              className="border-none lg:flex-1 lg:w-fit w-[80px] focus:ring-0 outline-none bg-white  rounded-xl mx-4 p-2 cursor-text"
            />
            <div className="flex mr-3 space-x-2">
              <PopoverComingSoon>
                <MicrophoneIcon className="w-7 h-7 cursor-pointer" />
              </PopoverComingSoon>
              <PopoverComingSoon>
                <PhotographIcon className="w-6 h-7 cursor-pointer" />
              </PopoverComingSoon>

              <ChatAlt2Icon
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
