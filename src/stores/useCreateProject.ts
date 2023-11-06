import { IMaterial } from '@/components/create-project/components/StepInputMaterials/data';
import { create } from 'zustand';

export interface ICreateProjectContent {
  data: Array<IMaterial>;
  updateCreateProjectContent: (data: Array<IMaterial>) => void;
}

export const useCreateProject = create<ICreateProjectContent>((set, get) => ({
  data: [],
  updateCreateProjectContent: (data) =>
    set({
      data,
    }),
}));
