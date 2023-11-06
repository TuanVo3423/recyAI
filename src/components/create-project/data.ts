import { schema_number_required, schema_string_no_length_required } from '@/form/schema';
import { TCardModeProps } from './components/StepChooseDocumentType/CardMode';
import * as Yup from 'yup';
export const schema_Input_Materials = Yup.object({
  name: schema_string_no_length_required,
  description : schema_string_no_length_required,
  quantity : schema_number_required,
});


export enum documentModes {
  not_choose,
  available,
  new,
}

export interface IMaterialInput {
  name: string;
  description: string;
  quantity: number;
}
export interface ICreateProject {
  documentMode: documentModes;
  step: number;
  MaterialInput: IMaterialInput[] | [];
}

export const defaultValues: ICreateProject = {
  documentMode: documentModes.not_choose,
  step: 0,
  MaterialInput: [],
};

export const documentModeData: Omit<TCardModeProps, 'form'>[] = [
  {
    mode: documentModes.available,
    title: 'Existing App',
    imageUrl:
      'https://cdn.gamma.app/zc87vhr30n8uf3n/29a73f2a0f5840d4a9d30b150a8b0c22/optimized/slide-bg.svg',
  },
  {
    mode: documentModes.new,
    title: 'New App',
    imageUrl:
      'https://cdn.gamma.app/zc87vhr30n8uf3n/eae3778a581240728566defb10f789c6/optimized/landing-bg.svg',
  },
];

export const category = ['delivery', 'shopping'];
export const app = ['facebook', 'shoppe'];
