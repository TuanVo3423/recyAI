import { HStack, Stack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { UseFormReturn } from 'react-hook-form';
import Typist from 'react-typist';
import { documentModeData } from '../../data';
import { LeftToRight, hoverTapMotion } from '@/motion';
import { ReceiveContent } from '../ChatMessage';
import CardMode from './CardMode';
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

export const StepChooseDocumentType = ({
  form,
}: StepChooseDocumentTypeProps) => {
  return (
    <Stack>
      <ReceiveContent>
        <Wrapper avgTypingDelay={30} cursor={{ hideWhenDone: true }}>
          Hi guys, I'm your recycling guide AI design partner.
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
            cursor={item.mode === 2 ? 'not-allowed' : 'pointer'}
          />
        ))}
      </HStack>
    </Stack>
  );
};
