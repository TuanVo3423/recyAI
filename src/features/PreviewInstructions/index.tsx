import { createInstruction } from '@/api/instructions';
import { OpenAIRequest } from '@/services/openai';
import { useGenerateStepsPrompt } from '@/services/openai/prompt';
import { useCreateProject } from '@/stores';
import {
  Box,
  BoxProps,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { CardTableContent, ModalAddSection } from './components';
import ModalShareInstruction from './components/ModalShareInstruction';
import {
  TColumn,
  defaultValueShare,
  defaultValues,
  onDragEnd,
  replaceSpecialCharacters,
  schema_create_section,
  schema_share,
} from './data';
import { createTweet } from '@/api/tweets';

const fake = {
  type: 0,
  audience: 0,
  content: 'good job',
  parent_id: null,
  hashtags: ['#recycling'],
  mentions: ['@tuanvo'],
  medias: 1,
  guest_views: 10,
  user_views: 10,
};

interface TPreviewInstructionsProps extends BoxProps {}

export const PreviewInstructions = ({ ...rest }: TPreviewInstructionsProps) => {
  const data = useCreateProject((state) => state.data);
  const CreateNewSection = useDisclosure();
  const ShareSection = useDisclosure();
  const [columns, setColumns] = useState<TColumn[]>([]);
  const form = useForm<any>({
    resolver: yupResolver(schema_create_section),
    defaultValues,
  });
  const form_share = useForm<any>({
    resolver: yupResolver(schema_share),
    defaultValues: defaultValueShare,
  });
  const { watch, setValue, reset } = form;
  const [stepToken, setStepToken] = useState('');
  const { StepChain } = useMemo(() => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { chatPrompt: stepPrompt } = useGenerateStepsPrompt(data);
    const { chain: StepChain } = OpenAIRequest({
      prompt: stepPrompt,
      handleStream: (token: string) => {
        setStepToken((prev) => (prev += token));
        // console.log(token);
      },
      handleStreamEnd(token) {
        console.log(token);
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
    // ChainRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnSave = async () => {
    const res = await createInstruction({ steps: columns[0].tableOfContents });
    console.log(res);
  };

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
    const { content, is_public } = values;
    const res = await createTweet({
      content,
      audience: is_public,
      type: 0,
      parent_id: null,
      hashtags: ['#recycling'],
      mentions: ['@tuanvo'],
      medias: 1,
      guest_views: 10,
      user_views: 10,
    });
    console.log('values: ', values);
    console.log('res: ', res);
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
              onClick={() => {
                CreateNewSection.onOpen();
              }}
            >
              Create New Part
            </Button>
            <Button onClick={handleOnSave}>Save</Button>
            <Button
              onClick={() => {
                ShareSection.onOpen();
                console.log('final data: ', columns[0].tableOfContents);
              }}
            >
              Share
            </Button>
          </HStack>
          {/* {createSectionButton} */}
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
        <ModalAddSection
          onSubmit={onSubmit}
          form={form}
          ModalStatus={CreateNewSection}
        />
        <ModalShareInstruction
          onSubmit={onSubmitShare}
          form={form_share}
          ModalShareStatus={ShareSection}
        />
      </Box>
    </Flex>
  );
};
