import {
  BoxProps,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { LeftToRight } from '../../../../components/motion';
import { motion } from 'framer-motion';
import { SendIcon } from '../../../../icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import Typist from 'react-typist';
import ButtonLabel from '../ButtonLabel';
import { ReceiveContent } from '../ChatMessage';

const Wrapper = styled(Typist)`
  .Cursor {
    display: inline-block;
  }
  .Cursor--blinking {
    display: none;
  }
`;

interface StepChooseAppsProps extends BoxProps {
  form: UseFormReturn<any>;
}

const StepChooseApps = ({ form, ...rest }: StepChooseAppsProps) => {
  const { watch, setValue } = form;
  const [categoryId] = watch(['category']);
  const ref = useRef(null);
  const [appState, setAppState] = useState<number | null>();
  const isLoading = false;
  const apps = [];
  // const { name } = useMemo(() => {
  //   if (appState) {
  //     return apps.find((app) => app.id === appState);
  //   }
  //   return {};
  // }, [appState, apps]);
  const handleOnSend = () => {
    if (appState) {
      setValue('appId', appState);
      setValue('projectName', name);
      setValue('step', 3);
    }
    return;
  };
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [ref]);
  return (
    <Stack ref={ref} {...rest} spacing="24px">
      <ReceiveContent>
        <Wrapper avgTypingDelay={30} cursor={{ hideWhenDone: true }}>
          Cool! Which of the following applications would you like to create?
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
            placeholder="Choose the app..."
            _placeholder={{ color: 'black' }}
            color="black"
            bg="white"
            borderWidth="1px"
            borderColor="#e5e0df"
            // onKeyDown={(e) => e.keyCode === 13 && handleOnSend()}
            // value={name}
            // onChange={(e) => setInputText(e.target.value)}
          />
          <InputRightElement>
            <Icon
              onClick={handleOnSend}
              as={SendIcon}
              w="20px"
              h="20px"
              color="blue"
              opacity={!appState && 0.4}
            />
          </InputRightElement>
        </InputGroup>
        <Flex gap={4} justify="flex-end" w="full" flexWrap="wrap">
          {!isLoading &&
            apps.map((item, idx) => (
              <ButtonLabel
                isDisabled={item.status === 'COMING_SOON'}
                onClick={() => setAppState(item.id)}
                key={idx}
                isActive={appState === item.id}
              >
                {item.name}
              </ButtonLabel>
            ))}
        </Flex>
      </Stack>
    </Stack>
  );
};

export default StepChooseApps;
