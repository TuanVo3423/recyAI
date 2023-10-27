import { TColumn, TSection } from 'components/document-page/data';
import { create } from 'zustand';

export interface ICreateProject {
  appId: any;
  projectName: string;
  description: string;
}
export interface ICreateProjectContent {
  data: ICreateProject;
  updateCreateProjectContent: (data: ICreateProject) => void;
}

export const useCreateProject = create<ICreateProjectContent>((set, get) => ({
  data: undefined,
  updateCreateProjectContent: (data) =>
    set({
      data,
    }),
}));
