import { Stack } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import {
  StepChooseDocumentType,
  StepInputMaterials
} from './components';
import { defaultValues, documentModes, schema_Input_Materials } from './data';

type Props = {};

export const CreateInstructions = (props: Props) => {
  const form = useForm({
    resolver: yupResolver(schema_Input_Materials),
    defaultValues,
  });
  const { watch } = form;
  const [documentMode, step] = watch(['documentMode', 'step']);
  const AvailableModeRender = () => {
    return (
      <>
        {step >= 1 && <StepInputMaterials form={form} />}
        {/* {step >= 2 && <StepChooseApps form={form} />} */}
        {/* {step >= 3 && <StepStepTypeShortDesc form={form} />} */}
      </>
    );
  };
  const renderSteps = () => {
    // mode available
    if (documentMode === documentModes.available) return AvailableModeRender();
    if (documentMode === documentModes.new) return;
  };

  return (
      <Stack spacing="24px" pt="48px" w="container.lg" zIndex={2} pb={18}>
        <StepChooseDocumentType form={form} />
        {renderSteps()}
      </Stack>
  );
};
