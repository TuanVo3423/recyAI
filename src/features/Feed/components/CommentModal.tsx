import { useGetTweet } from '@/api/tweets';
import { Quadrilateral } from '@/components/skeleton';
import { CommentTweet } from '@/utils/classifyTweetType';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Slide,
  UseDisclosureProps,
  useToast,
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
import { useState } from 'react';
import { useMutation } from 'react-query';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css'
interface TCommentModalProps extends UseDisclosureProps {
  tweetId: string;
  refresh: () => void;
}

export const CommentModal = ({
  refresh,
  tweetId,
  isOpen,
  onClose,
  onOpen,
}: TCommentModalProps) => {
  const { data, isLoading, isError, refetch } = useGetTweet(tweetId, {
    enabled: !!tweetId,
  });
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
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent overflow="hidden" w="70vw" maxW="none">
        <ModalBody p={0} w="full">
          {isLoading || !data ? (
            <Quadrilateral p="24px" w="full" h="70vh" isLoading={isLoading} />
          ) : (
            <div className="flex justify-center items-center">

              <div className="bg-white border-r-[1px]  w-[50%] px-[30px] ">
                <Slider {...settings}>
                  <div className='card'>{!data ? (
                    <></>
                  ) : (
                    data.tweet[0].instruction[0].steps.map((step, idx) => (
                      <p key={idx}>{step.content}</p>
                    ))
                  )}</div>
                  <div className='card'>
                    <img
                      src={

                        'https://shophotproperties.com/cdn/shop/products/IMG_8557_grande.jpg?v=1503263004'
                      }
                      className=" object-contain w-[500px] h-[280px] border cursor-pointer"
                      alt=""
                    />
                  </div>
                </Slider>
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
