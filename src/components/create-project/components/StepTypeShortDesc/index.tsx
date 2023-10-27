import {
  BoxProps,
  Button,
  HStack,
  Icon,
  InputGroup,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { LeftToRight } from '../../../../components/motion';
import { motion } from 'framer-motion';
import { AgainIcon, ArrowIcon } from '../../../../icons';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import Typist from 'react-typist';
import { useCreateProject } from '../../../../stores';
import { ReceiveContent } from '../ChatMessage';

const Wrapper = styled(Typist)`
  .Cursor {
    display: inline-block;
  }
  .Cursor--blinking {
    display: none;
  }
`;

interface StepStepTypeShortDescProps extends BoxProps {
  form: UseFormReturn<any>;
}

const StepStepTypeShortDesc = ({
  form,
  ...rest
}: StepStepTypeShortDescProps) => {
  const router = useRouter();
  const { watch, setValue } = form;
  const [category, appId, description, projectName] = watch([
    'category',
    'appId',
    'description',
    'projectName',
  ]);
  const ref = useRef(null);
  const updateCreateProjectContent = useCreateProject(
    (state) => state.updateCreateProjectContent
  );
  const [descriptionState, setDescriptionState] = useState('');
  const handleClickContinue = () => {
    setValue('description', descriptionState);
    router.push('/');
    // updateCreateProjectContent({
    //   appId,
    //   description: descriptionState,
    //   projectName,
    // });
  };
  const handleTryAgain = () => {
    setDescriptionState('');
  };
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ref]);
  return (
    <Stack ref={ref} {...rest} spacing="24px">
      <ReceiveContent>
        <Wrapper avgTypingDelay={30} cursor={{ hideWhenDone: true }}>
          {`${projectName}? Sounds interesting! Please give me a detailed description of your project?`}
        </Wrapper>
      </ReceiveContent>
      <Stack
        as={motion.div}
        {...LeftToRight({ delay: 1 })}
        color="black"
        p={4}
        bg="white"
        w="75%"
        alignSelf="flex-end"
        borderRadius="lg"
        spacing={4}
      >
        <Text>
          Typing the most detailed information to achieve the best results!
        </Text>
        <InputGroup>
          <Textarea
            placeholder="Type here..."
            as={TextareaAutosize}
            minH="150px"
            color="black"
            bg="white"
            borderWidth="1px"
            borderColor="#e5e0df"
            onKeyDown={(e) => e.keyCode === 13 && handleClickContinue()}
            value={descriptionState}
            onChange={(e) => setDescriptionState(e.target.value)}
          />
        </InputGroup>
        <HStack maxH="44px">
          <Button
            variant="outline"
            onClick={handleTryAgain}
            rightIcon={<Icon as={AgainIcon} />}
            _hover={{
              backgroundColor: '#eae7ff',
            }}
          >
            Try again!
          </Button>
          <Button
            display="flex"
            justifyContent="center"
            alignItems="center"
            flex={1}
            variant="primary"
            rightIcon={<Icon as={ArrowIcon} />}
            onClick={handleClickContinue}
            isDisabled={!descriptionState}
          >
            Continue
          </Button>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default StepStepTypeShortDesc;
