import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Icon,
  Flex,
  Text,
  Button,
  IconButton,
  BoxProps,
  StackProps,
} from '@chakra-ui/react';
import { SendIcon } from '../../../../icons';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import ButtonLabel from '../ButtonLabel';
import { NoteMessage, ReceiveContent } from '../ChatMessage';
import styled from '@emotion/styled';
import Typist from 'react-typist';
import { motion } from 'framer-motion';
import { LeftToRight } from '../../../../components/motion';

const Wrapper = styled(Typist)`
  .Cursor {
    display: inline-block;
  }
  .Cursor--blinking {
    display: none;
  }
`;

interface StepChooseCategoriesProps extends StackProps {
  form: UseFormReturn<any>;
}

const StepChooseCategories = ({ form, ...rest }: StepChooseCategoriesProps) => {
  //   const { categories, isLoading } = useCategories();
  const isLoading = false;
  const categories: any = [
    {
      id: 1,
      name: 'Business',
      status: 'AVAILABLE',
    },
    {
      id: 2,
      name: 'Education',
      status: 'AVAILABLE',
    },
    {
      id: 3,
      name: 'Legal',
      status: 'AVAILABLE',
    },
    {
      id: 4,
      name: 'Medical',
      status: 'AVAILABLE',
    },
    {
      id: 5,
      name: 'Personal',
      status: 'AVAILABLE',
    },
    {
      id: 6,
      name: 'Real Estate',
      status: 'AVAILABLE',
    },
    {
      id: 7,
      name: 'Technology',
      status: 'AVAILABLE',
    },
    {
      id: 8,
      name: 'Other',
      status: 'AVAILABLE',
    },
  ];

  const { watch, setValue } = form;
  const ref = useRef(null);
  const [categoryState, setCategoryState] = useState<number | null>();
  //   const { name } = useMemo(() => {
  //     if (categoryState) {
  //       return categories.find((category) => category.id === categoryState);
  //     }
  //     return {};
  //   }, [categoryState, categories]);
  const handleOnChange = (category_id: number) => {
    setCategoryState(category_id);
  };
  const handleOnSend = () => {
    if (categoryState) {
      setValue('category', categoryState);
      setValue('step', 2);
    }
    return;
  };
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ref]);
  return (
    <Stack {...rest} spacing="24px">
      <ReceiveContent>
        <Wrapper avgTypingDelay={30} cursor={{ hideWhenDone: true }}>
          Sounds good! Which kind of categories would you like the document to
          be about?
        </Wrapper>
      </ReceiveContent>
      <Stack
        maxW="75%"
        as={motion.div}
        {...LeftToRight({ delay: 1 })}
        spacing={4}
        p={4}
        bg="white"
        alignSelf="flex-end"
        borderRadius="lg"
      >
        <InputGroup>
          <Input
            placeholder="Choose the category..."
            _placeholder={{ color: 'black' }}
            color="black"
            bg="white"
            borderWidth="1px"
            borderColor="#e5e0df"
            // onKeyDown={(e) => e.keyCode === 13 && handleOnSend()}
            value={''}
            // onChange={(e) => setInputText(e.target.value)}
          />
          <InputRightElement>
            <Icon
              onClick={handleOnSend}
              as={SendIcon}
              w="20px"
              h="20px"
              color="blue"
              opacity={!categoryState && 0.4}
            />
          </InputRightElement>
        </InputGroup>
        <Flex justify="flex-end" w="full" flexWrap="wrap" gap={4}>
          {!isLoading &&
            categories.map((item: any, idx: number) => (
              <ButtonLabel
                isDisabled={item.status === 'COMING_SOON'}
                onClick={() => handleOnChange(item.id)}
                key={idx}
                isActive={categoryState === item.id}
              >
                {item.name}
              </ButtonLabel>
            ))}
        </Flex>
      </Stack>
    </Stack>
  );
};

export default StepChooseCategories;
