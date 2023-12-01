import { TSection } from '@/features/PreviewInstructions/data';

export interface IInstruction {
  steps: Array<TSection>;
}

export interface IInstructionResponse {
  _id: string;
  user_id: string;
  steps: Array<TSection>;
  created_at: string;
  updated_at: string;
}
