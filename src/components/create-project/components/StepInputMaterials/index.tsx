import { useCreateProject } from '@/stores';
import { DeleteIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  StackProps,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import Typist from 'react-typist';
import { LeftToRight } from '../../../motion';
import { ReceiveContent } from '../ChatMessage';
import { IMaterial, updateMaterial } from './data';

const Wrapper = styled(Typist)`
  .Cursor {
    display: inline-block;
  }
  .Cursor--blinking {
    display: none;
  }
`;

interface StepInputMaterialsProps extends StackProps {
  form: UseFormReturn<any>;
}

const StepInputMaterials = ({ form, ...rest }: StepInputMaterialsProps) => {
  const router = useRouter();
  const { watch, setValue } = form;

  const [MaterialInput] = watch(['MaterialInput']);
  const updateCreateProjectContent = useCreateProject(
    (state) => state.updateCreateProjectContent
  );
  const ref = useRef(null);
  const [currentMaterial, setCurrentMaterial] = useState<IMaterial>({
    name: '',
    description: '',
    quantity: 1,
  });

  const handleFinishCreateProject = () => {
    updateCreateProjectContent(MaterialInput);
    router.push('/result');
  };

  const handleChangeQuantity = (value: IMaterial) => {
    setValue('MaterialInput', updateMaterial(value, MaterialInput));
  };

  const handleDelete = (index: number) => {
    const newMaterial = [...MaterialInput];
    newMaterial.splice(index, 1);
    setValue('MaterialInput', newMaterial);
  };

  const handleOnSend = () => {
    setValue('MaterialInput', [...MaterialInput, currentMaterial]);
    setCurrentMaterial({
      name: '',
      description: '',
      quantity: 1,
    });
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
        minW="75%"
        as={motion.div}
        {...LeftToRight({ delay: 1 })}
        spacing={4}
        p={4}
        bg="white"
        alignSelf="flex-end"
        borderRadius="lg"
      >
        <InputGroup display="flex" flexDir="column" gap={4}>
          <Input
            placeholder="Typing the name of material..."
            name="name"
            _placeholder={{ color: 'black' }}
            color="black"
            bg="white"
            borderWidth="1px"
            borderColor="#e5e0df"
            value={currentMaterial.name || ''}
            // onKeyDown={(e) => e.keyCode === 13 && handleOnSend()}
            // value={''}
            onChange={(e) =>
              setCurrentMaterial({ ...currentMaterial, name: e.target.value })
            }
          />
          <Input
            name="description"
            placeholder="Typing the description of material... (if any)"
            _placeholder={{ color: 'black' }}
            color="black"
            bg="white"
            borderWidth="1px"
            borderColor="#e5e0df"
            value={currentMaterial.description || ''}
            onKeyDown={(e) => e.keyCode === 13 && handleOnSend()}
            onChange={(e) =>
              setCurrentMaterial({
                ...currentMaterial,
                description: e.target.value,
              })
            }
          />
        </InputGroup>
        <Flex justify="flex-end" w="full" flexWrap="wrap" gap={4}>
          <Button onClick={handleOnSend} bg="blue.500">
            Add material
          </Button>
        </Flex>
        <Table variant="striped" colorScheme="green" size="md">
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>NAME</Th>
              <Th>DESCRIPTION</Th>
              <Th>QUANTITY</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {MaterialInput.map((item, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{item.name}</Td>
                <Td>{item.description}</Td>
                <Td>
                  <NumberInput
                    maxW="fit-content"
                    size="sm"
                    defaultValue={item.quantity}
                    min={0}
                    onChange={(value) =>
                      handleChangeQuantity({
                        ...item,
                        quantity: Number(value),
                      })
                    }
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Td>
                <Td>
                  <Icon as={DeleteIcon} onClick={() => handleDelete(index)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <Flex justify="flex-end" w="full" flexWrap="wrap" gap={4}>
          <Button onClick={handleFinishCreateProject} bg="blue.500">
            Go to generate
          </Button>
        </Flex>
      </Stack>
    </Stack>
  );
};

export default StepInputMaterials;
