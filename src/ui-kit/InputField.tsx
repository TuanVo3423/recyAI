import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  Textarea,
} from '@chakra-ui/react';
import { UseFormReturn } from 'react-hook-form';

type InputFieldProps = FormControlProps & {
  nameOfArr?: string;
  _idx?: number;
  name: string;
  label?: string;
  type: string;
  placeholder: string;
  form: UseFormReturn<any>;
};

export const InputField = ({
  name,
  label,
  placeholder,
  type,
  form,
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  const isErrors = errors?.[name];
  return (
    <FormControl height="full" isInvalid={!!isErrors?.message}>
      <FormLabel margin={0}>{label || ''}</FormLabel>
      <InputGroup h="full" w="full">
        <Input
          w="full"
          h="full"
          placeholder={placeholder}
          type={type}
          {...register(name, {
            valueAsNumber: type === 'number' ? true : false,
          })}
        />
      </InputGroup>
      <FormErrorMessage>{(isErrors?.message || '') as string}</FormErrorMessage>
    </FormControl>
  );
};

export const InputFieldWithoutLabel = ({
  nameOfArr,
  _idx,
  name,
  placeholder,
  type,
  form,
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  const isErrors = errors?.[nameOfArr];
  // if (isErrors) {
  //     console.log("errors: ", isErrors[_idx]);
  // }

  return (
    <FormControl
      isInvalid={isErrors !== undefined ? !!isErrors[_idx]?.message : false}
    >
      <InputGroup>
        <Input
          w="full"
          placeholder={placeholder}
          type={type}
          {...register(name, {
            valueAsNumber: type === 'number' ? true : false,
          })}
        />
      </InputGroup>
      <FormErrorMessage>
        {(isErrors !== undefined ? isErrors[_idx]?.message : '') as string}
      </FormErrorMessage>
    </FormControl>
  );
};

export const TextAreaInputFieldWithoutLabel = ({
  name,
  label,
  placeholder,
  // type,
  form,
}: InputFieldProps) => {
  const {
    register,
    formState: { errors },
  } = form;

  const isErrors = errors?.[name];
  return (
    <FormControl height="full" isInvalid={!!isErrors?.message}>
      <InputGroup h="full" w="full">
        <Textarea
          w="full"
          h="full"
          placeholder={placeholder}
          // type={type}
          {...register(name)}
        />
      </InputGroup>
      <FormErrorMessage>{(isErrors?.message || '') as string}</FormErrorMessage>
    </FormControl>
  );
};
