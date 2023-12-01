import { useGetTweet } from '@/api/tweets';
import { Quadrilateral } from '@/components/skeleton';
import { CommentTweet } from '@/utils/classifyTweetType';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
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
import { useState } from 'react';
import { useMutation } from 'react-query';
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent overflow="hidden" w="70vw" maxW="none">
        <ModalBody p={0} w="full">
          {isLoading ? (
            <Quadrilateral p="24px" w="full" h="70vh" isLoading={isLoading} />
          ) : (
            <div className="flex justify-center gap-4">
              <div className="bg-gray-200  w-[50%] py-[12px] px-[24px]">
                {!data ? (
                  <></>
                ) : (
                  data.tweet[0].instruction[0].steps.map((step, idx) => (
                    <p key={idx}>{step.content}</p>
                  ))
                )}
              </div>
              <div className="bg-white w-[50%]">
                <div>
                  <div className="flex items-center py-3 border-b-[1px]">
                    <img
                      src={
                        'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt100d13bfa8286a3d/5eb7cdc11ea0c32e33b95fa2/V_AGENTS_587x900_Breach.png'
                      }
                      className="rounded-full h-8 w-8 object-contain border p-1 mr-3 ml-4"
                      alt=""
                    />
                    <div className="flex-1 flex">
                      <p className="font-bold text-sm mr-9">Papa</p>
                      <p className="font-semibold text-sm">cap</p>
                    </div>

                    <DotsHorizontalIcon className="h-5 mr-6" />
                  </div>
                </div>
                <div className="h-[460px]">
                  {!data ? (
                    <>No cmt here</>
                  ) : (
                    data.tweet[0].comments.map((cmt, idx) => (
                      <div className="flex items-center py-3">
                        <img
                          src={
                            'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt100d13bfa8286a3d/5eb7cdc11ea0c32e33b95fa2/V_AGENTS_587x900_Breach.png'
                          }
                          className="rounded-full h-8 w-8 object-contain border p-1 mr-3 ml-4"
                          alt=""
                        />
                        <div className="flex-1">
                          <div className="flex">
                            <p className="font-bold text-sm mr-2">Pupu</p>
                            <p className="text-sm mr-5">{cmt.content}</p>
                          </div>
                          <div className="flex space-x-4">
                            <p className="text-xs font-medium text-gray-400">
                              4 hours
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
                  <div className="flex justify-between px-4 pt-4">
                    <div className="flex space-x-4 ">
                      <HeartIcon className="h-5" />
                      <ChatIcon className="h-5" />
                      <PaperAirplaneIcon className="h-5" />
                    </div>
                    <BookmarkIcon className="h-5" />
                  </div>
                  <form className="flex items-center p-6">
                    <EmojiHappyIcon className="h-5" />
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
                      className="fonrt-semibold text-blue-400 text-md"
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
