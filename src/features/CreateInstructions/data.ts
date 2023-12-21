import {
  schema_number_required,
  schema_string_no_length_required,
} from '@/form/schema';
import * as Yup from 'yup';
import { TCardModeProps } from './components/StepChooseDocumentType/CardMode';
export const schema_Input_Materials = Yup.object({
  name: schema_string_no_length_required,
  description: schema_string_no_length_required,
  quantity: schema_number_required,
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
    title: 'Recycle item',
    imageUrl: 'https://www.boonton.org/ImageRepository/Document?documentID=773',
  },
  {
    mode: documentModes.new,
    title: 'Coming soon',
    imageUrl:
      'https://millerrecycling.com/wp-content/uploads/2020/02/commercial-food-waste-disposal.jpg',
  },
];

export const category = ['delivery', 'shopping'];
export const app = ['facebook', 'shoppe'];
