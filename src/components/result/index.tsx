import { GeminiRequest } from '@/services/openai';
import { useGenerateStepsPrompt } from '@/services/openai/prompt';
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
import { useCreateProject } from '../../stores';
import { CardTableContent } from './CardTableContent';
import { ModalAddSection } from './ModalAddSection';
import {
  TColumn,
  defaultValues,
  onDragEnd,
  replaceSpecialCharacters,
  schema_create_section,
} from './data';

interface TPreviewInstructionsProps extends BoxProps {}

export const PreviewInstructions = ({ ...rest }: TPreviewInstructionsProps) => {
  const data = useCreateProject((state) => state.data);
  const CreateNewSection = useDisclosure();
  const [columns, setColumns] = useState<TColumn[]>([]);
  const form = useForm<any>({
    resolver: yupResolver(schema_create_section),
    defaultValues,
  });
  const { watch, setValue, reset } = form;
  const [stepToken, setStepToken] = useState('');
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
    ChainRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <Flex w="full" h="full" minH="full" justify="center" align="center">
      <Box
        maxW="70vw"
        w="70vw"
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
            <Button>Share</Button>
            <Button
              onClick={() =>
                console.log('final data: ', columns[0].tableOfContents)
              }
            >
              Export
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
      </Box>
    </Flex>
  );
};
