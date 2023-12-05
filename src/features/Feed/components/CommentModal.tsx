import { editInstructionsInMyTweets } from '@/api/instructions';
import { useGetTweet } from '@/api/tweets';
import { Quadrilateral } from '@/components/skeleton';
import { CommentTweet } from '@/utils/classifyTweetType';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Textarea,
  UseDisclosureProps,
  useToast
} from '@chakra-ui/react';
import {
  BookmarkIcon,
  ChatIcon,
  DotsHorizontalIcon,
  EmojiHappyIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/outline';
import { formatDistance } from 'date-fns';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
interface TCommentModalProps extends UseDisclosureProps {
  tweetId: string;
  refresh: () => void;
}
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};
export const CommentModal = ({
  refresh,
  tweetId,
  isOpen,
  onClose,
  onOpen,
}: TCommentModalProps) => {
  const { pathname } = useRouter();
  const { data, isLoading, isError, refetch, isSuccess } = useGetTweet(
    tweetId,
    {
      enabled: !!tweetId,
    }
  );
  const [isEdit, setIsEdit] = useState(false);
  const [currentStep, setCurrentStep] = useState([]);

  useEffect(() => {
    if (isSuccess) {
      setCurrentStep(data.tweet[0].instruction[0].steps);
    }
  }, [isSuccess]);
  const [comment, setComment] = useState('');
  const toast = useToast();
  const { mutateAsync: handleComment } = useMutation(
    async () => {
      const res = await CommentTweet({
        content: comment,
        parent_id: tweetId,
      });

      return res;
    },
    {
      onSuccess: async (data) => {
        await refetch();
        await refresh();
        toast({
          description: data.message,
          status: 'success',
        });
        setComment('');
      },
      onError: async (err: any) => {
        toast({
          description: err.message,
          status: 'error',
        });
      },
    }
  );
  const { mutateAsync: handleSaveUpdate } = useMutation(
    async () => {
      const res = await editInstructionsInMyTweets(
        data.tweet[0].instruction_id,
        currentStep
      );
      return res;
    },
    {
      onSuccess: async (data) => {
        // await refetch();
        await refresh();
        toast({
          description: data.message,
          status: 'success',
        });
      },
      onError: async (err: any) => {
        toast({
          description: err.message,
          status: 'error',
        });
      },
    }
  );
  const handleOnChange = (e, id: string) => {
    const index = currentStep.findIndex((item) => item.id === id);
    if (index !== -1) {
      // Tạo một bản sao của mảng state
      const newcurrentStep = [...currentStep];

      // Thay đổi nội dung của phần tử tại index bằng 2
      newcurrentStep[index] = {
        ...newcurrentStep[index],
        content: e.target.value,
      };

      // Cập nhật trạng thái bằng mảng mới
      setCurrentStep(newcurrentStep);
    }
  };

  const renderButton = () => {
    if (isEdit) {
      return (
        <Button
          height="fit-content"
          lineHeight="32px"
          onClick={async () => {
            await handleSaveUpdate();
            setIsEdit(false);
          }}
        >
          Save
        </Button>
      );
    }
    return (
      <Button
        height="fit-content"
        lineHeight="32px"
        onClick={() => setIsEdit(true)}
      >
        Edit
      </Button>
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent overflow="hidden" w="70vw" maxH="90vh" maxW="none">
        <ModalBody p={0} w="full">
          {isLoading || !data ? (
            <Quadrilateral p="24px" w="full" isLoading={isLoading} />
          ) : (
            <div className="flex">
              <div className="flex flex-col bg-white w-[50%] px-4">
                {pathname === '/profile' && (
                  <div className="flex items-center py-3 border-b-[1px]">
                    {renderButton()}
                  </div>
                )}
                <div className="flex-1">
                  <Slider {...settings}>
                    <div className="card">
                      {!data ? (
                        <></>
                      ) : (
                        currentStep.map((step, idx) => {
                          return isEdit ? (
                            <Textarea
                              key={idx}
                              onChange={(e) => handleOnChange(e, step.id)}
                              h="fit-content"
                              minH="fit-content"
                            >
                              {step.content}
                            </Textarea>
                          ) : (
                            <Text className="mb-2" key={idx}>
                              {step.content}
                            </Text>
                          );
                        })
                      )}
                    </div>
                    <div className="card">
                      <img
                        src={
                          'https://shophotproperties.com/cdn/shop/products/IMG_8557_grande.jpg?v=1503263004'
                        }
                        className=" object-contain  border cursor-pointer"
                        alt=""
                      />
                    </div>
                  </Slider>
                </div>
              </div>

              <div className="bg-white w-[50%]">
                <div>
                  <div className="flex items-center py-3 border-b-[1px]">
                    <img
                      src={
                        'https://shophotproperties.com/cdn/shop/products/IMG_8557_grande.jpg?v=1503263004'
                      }
                      className="rounded-full h-8 w-8 object-contain border p-1 mr-3 ml-4"
                      alt=""
                    />
                    <div className="flex-1 flex items-center">
                      <p className="font-semibold text-sm mr-2 cursor-pointer">
                        {data && data.tweet[0].user_info[0].name}
                      </p>
                      <p className="mx-2">•</p>
                      <p className="text-sm">{data.tweet[0].content}</p>
                    </div>

                    <DotsHorizontalIcon className="h-5 mr-6" />
                  </div>
                </div>
                <div className="h-[460px]">
                  {!data ? (
                    <>No cmt here</>
                  ) : (
                    data.tweet[0].comments.map((cmt, idx) => (
                      <div key={idx} className="flex items-center py-3">
                        <img
                          src={
                            'https://shophotproperties.com/cdn/shop/products/IMG_8557_grande.jpg?v=1503263004'
                          }
                          className="rounded-full h-8 w-8 object-contain border p-1 mr-3 ml-4"
                          alt=""
                        />
                        <div className="flex-1">
                          <div className="flex">
                            <p className="font-semibold text-sm mr-2">
                              {
                                data.tweet[0].comments_users.find(
                                  (comment_and_user_info) =>
                                    cmt.user_id === comment_and_user_info._id
                                ).name
                              }
                            </p>
                            <p className="text-sm mr-5">{cmt.content}</p>
                          </div>
                          <div className="flex space-x-4">
                            <p className="text-xs font-medium text-gray-400">
                              {formatDistance(
                                new Date(cmt.created_at),
                                new Date(),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </p>
                            <p className="text-xs font-medium text-gray-400">
                              5 Likes
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-2 mr-6">
                          <HeartIcon className="h-4 w-4 cursor-pointer" />
                          <DotsHorizontalIcon className="h-4 w-4 cursor-pointer" />
                        </div>
                      </div>
                    ))
                  )}
                </div>
                <div className="border-t-[1px]">
                  <div className="flex justify-between px-4 pt-3">
                    <div className="flex space-x-4 ">
                      <HeartIcon className="h-6 cursor-pointer" />
                      <ChatIcon className="h-6 cursor-pointer" />
                      <PaperAirplaneIcon className="h-6 cursor-pointer" />
                    </div>
                    <BookmarkIcon className="h-6 cursor-pointer" />
                  </div>
                  <div className="mt-2 pb-3 border-b-[1px]">
                    <p className="font-semibold text-sm ml-5">
                      {`${data.tweet[0].like_count} lượt thích`}
                    </p>
                    <p className="text-xs text-gray-500 ml-5">
                      {' '}
                      {formatDistance(
                        new Date(data.tweet[0].created_at),
                        new Date(),
                        {
                          addSuffix: true,
                        }
                      )}
                    </p>
                  </div>
                  <form className="flex items-center px-4 pt-4 pb-4 ">
                    <EmojiHappyIcon className="h-6 cursor-pointer" />
                    <input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Add a comment ..."
                      className="border-none flex-1 focus:ring-0 outline-none bg-gray-100 rounded-xl mx-4 p-2"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleComment();
                        refetch();
                      }}
                      className="font-semibold text-blue-400 text-md"
                    >
                      Post
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
