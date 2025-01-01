import { createInstruction } from '@/api/instructions';
import { GeminiRequest } from '@/services/openai';
import { useGenerateStepsPrompt } from '@/services/openai/prompt';
import { useCreateProject } from '@/stores';
import { TweetWithInstruction } from '@/utils/classifyTweetType';
import {
  Box,
  BoxProps,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { v4 as uuidv4 } from 'uuid';
import {
  CardTableContent,
  ModalAddSection,
  ShareInstructionModal,
} from './components';
import {
  TColumn,
  defaultValueShare,
  defaultValues,
  onDragEnd,
  replaceSpecialCharacters,
  schema_create_section,
  schema_share,
} from './data';

interface TPreviewInstructionsProps extends BoxProps {}

export const PreviewInstructions = ({ ...rest }: TPreviewInstructionsProps) => {
  const [columns, setColumns] = useState<TColumn[]>([]);
  const [stepToken, setStepToken] = useState('');
  const [isFinish, setIsFinish] = useState(false);

  const router = useRouter();
  const toast = useToast();
  const CreateNewSection = useDisclosure();
  const ShareSection = useDisclosure();

  const form = useForm<any>({
    resolver: yupResolver(schema_create_section),
    defaultValues,
  });
  const form_share = useForm<any>({
    resolver: yupResolver(schema_share),
    defaultValues: defaultValueShare,
  });
  const { watch, setValue, reset } = form;

  const data = useCreateProject((state) => state.data);

  const { StepChain } = useMemo(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { chatPrompt: stepPrompt } = useGenerateStepsPrompt(data);
    const { chain: StepChain } = GeminiRequest({
      prompt: stepPrompt,
      handleStream: (token: string) => {
        setStepToken((prev) => (prev += token));
        // console.log(token);
      },
      handleStreamEnd(token) {
        setIsFinish(true);
      },
    });

    return { StepChain };
  }, []);

  useEffect(() => {
    const questionsAfterResponses = replaceSpecialCharacters(stepToken).map(
      (question: string) => ({
        id: uuidv4(),
        content: question,
      })
    );
    setColumns([{ ...columns[0], tableOfContents: questionsAfterResponses }]);
  }, [stepToken]);

  useEffect(() => {
    async function ChainRequest() {
      const res = await StepChain.call({});
    }
    ChainRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { mutateAsync: handleOnSave, isLoading } = useMutation(
    async () => {
      const res = await createInstruction({
        steps: columns[0].tableOfContents,
      });
      return res;
    },
    {
      onSuccess: async (data) => {
        await router.push('/collections');
        toast({
          description: data.message,
          status: 'success',
        });
      },
      onError: async (error: any) => {
        toast({
          description: error.message,
          status: 'error',
        });
      },
    }
  );

  const onSubmit = async (values) => {
    const newtableOfContents = [...columns[0].tableOfContents];
    newtableOfContents.push({
      id: uuidv4(),
      content: values.instruction,
    });
    setColumns([{ ...columns[0], tableOfContents: newtableOfContents }]);
    setValue('instruction', '');
    CreateNewSection.onClose();
  };

  const onSubmitShare = async (values) => {
    const instruction = await createInstruction({
      steps: columns[0].tableOfContents,
    });
    if (instruction) {
      const { content } = values;
      const res = await TweetWithInstruction({
        instruction_id: instruction.instruction_id,
        content,
      });
      await router.push('/profile');
      toast({
        description: res.message,
        status: 'success',
      });
    }
    ShareSection.onClose();
  };

  return (
    <Flex w="full" h="full" minH="full" justify="center" align="center">
      <Box
        maxW="75%"
        minW="75%"
        color="black"
        zIndex={2}
        {...rest}
        h="full"
        overflow="auto"
      >
        <HStack mb={6} justify="space-between">
          <Box>
            <Text fontSize="2xl" fontWeight="bold">
              Your Instructions steps is almost finished...
            </Text>
            <Text fontStyle="italic" fontSize="md" color="gray.500">
              Please recheck the table of content below.
            </Text>
          </Box>
          <HStack>
            <Button
              bg="green.500"
              color="white"
              disabled={!isFinish && true}
              onClick={() => {
                CreateNewSection.onOpen();
              }}
            >
              Create New Part
            </Button>
            <Button
              bg="green.500"
              color="white"
              disabled={!isFinish && true}
              onClick={() => handleOnSave()}
            >
              Save
            </Button>
            {/* <Button
              bg="green.500"
              color="white"
              disabled={!isFinish && true}
              onClick={() => {
                ShareSection.onOpen();
                console.log('final data: ', columns[0].tableOfContents);
              }}
            >
              Share
            </Button> */}
          </HStack>
        </HStack>

        <DragDropContext
          onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
        >
          {Object.entries(columns).map(([columnId, column], index) => {
            return (
              <Stack key={index}>
                <Droppable droppableId={columnId} key={columnId}>
                  {(droppableProvided, droppableProvidedSnapshot) => {
                    return (
                      <Flex
                        flexDir="column"
                        gap={4}
                        w="full"
                        {...droppableProvided.droppableProps}
                        ref={droppableProvided.innerRef}
                      >
                        {column.tableOfContents.map((section, index) => {
                          return (
                            <Draggable
                              key={section.id}
                              draggableId={section.id.toString()}
                              index={index}
                            >
                              {(DraggableProvided, DraggableSnapshot) => {
                                return (
                                  <CardTableContent
                                    columns={columns}
                                    setColumns={setColumns}
                                    index={index}
                                    form={form}
                                    section={section}
                                    snapshot={DraggableSnapshot}
                                    provided={DraggableProvided}
                                  />
                                );
                              }}
                            </Draggable>
                          );
                        })}
                      </Flex>
                    );
                  }}
                </Droppable>
              </Stack>
            );
          })}
        </DragDropContext>
        {true && (
          <ModalAddSection
            onSubmit={onSubmit}
            form={form}
            ModalStatus={CreateNewSection}
          />
        )}
        {/* <ModalShareInstruction
          onSubmit={onSubmitShare}
          form={form_share}
          ModalShareStatus={ShareSection}
        /> */}
        {/* {isFinish && (
          <ShareInstructionModal
            currentInstruction={columns[0].tableOfContents}
            form={form_share}
            onSubmit={onSubmitShare}
            shareInstructionModalStatus={ShareSection}
          />
        )} */}
      </Box>
    </Flex>
  );
};
