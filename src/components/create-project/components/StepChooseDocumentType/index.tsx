import { Box, Button, HStack, Stack } from '@chakra-ui/react';
import MotionBox from '../../../../components/motion/Box';
import {
  documentModeData,
  documentModes,
} from '../../../../components/create-project/data';
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ReceiveContent } from '../ChatMessage';
import CardMode from './CardMode';
import styled from '@emotion/styled';
import Typist from 'react-typist';
import {
  fadeIn,
  hoverTapMotion,
  LeftToRight,
  movePage,
} from '../../../../components/motion';
import { motion } from 'framer-motion';
const Wrapper = styled(Typist)`
  .Cursor {
    display: inline-block;
  }
  .Cursor--blinking {
    display: none;
  }
`;

type StepChooseDocumentTypeProps = {
  form: UseFormReturn<any>;
};

const StepChooseDocumentType = ({ form }: StepChooseDocumentTypeProps) => {
  return (
    <Stack>
      <ReceiveContent>
        <Wrapper avgTypingDelay={30} cursor={{ hideWhenDone: true }}>
          Hi guys, I am your AI design partner.
        </Wrapper>
      </ReceiveContent>
      {/* block */}
      <HStack
        as={motion.div}
        key="parent"
        {...LeftToRight({ delay: 0 })}
        p="12px"
        bg="white"
        rounded="md"
        spacing={2}
        w="50%"
        alignSelf="flex-end"
      >
        {documentModeData.map((item, idx: number) => (
          <CardMode
            as={motion.div}
            {...LeftToRight({ delay: 0.5 })}
            {...hoverTapMotion}
            key={item.title}
            form={form}
            title={item.title}
            mode={item.mode}
            imageUrl={item.imageUrl}
          />
        ))}
      </HStack>
    </Stack>
  );
};

export default StepChooseDocumentType;
