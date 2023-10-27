import { TCardModeProps } from './components/StepChooseDocumentType/CardMode';

export enum documentModes {
  not_choose,
  available,
  new,
}
export interface ICreateProject {
  documentMode: documentModes;
  category: any;
  appId: any;
  projectName: string;
  description: string;
  step: number;
}

export const defaultValues: ICreateProject = {
  documentMode: documentModes.not_choose,
  appId: '',
  category: '',
  description: '',
  projectName: '',
  step: 0,
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
