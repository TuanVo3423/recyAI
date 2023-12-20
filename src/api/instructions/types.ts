import { TSection } from '@/features/PreviewInstructions/data';

export interface IInstruction {
  _id: string;
  user_id: string;
  steps: Array<TSection>;
  created_at: string;
  updated_at: string;
}
export interface IInstructionRequest {
  steps: Array<TSection>;
}

export interface ICreateInstructionResponse {
  message: string;
  instruction_id: string;
}

export interface IgetInstructionRequest {
  instruction_id: number | string;
}

export interface IInstructionResponse {
  message: string;
  instruction: IInstruction;
}

export interface IGetMyInstructionsResponse {
  message: string;
  instructions: Array<IInstruction>;
}

export interface IEditInstructionsInMyTweetsRequest {
  instruction_id: String;
  payload: any;
}

export interface IEditInstructionsInMyTweetsResponse {
  message: String;
  instruction: {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: any;
    upsertedCount: number;
    matchedCount: number;
  };
}

export interface IDeleteInstructionRequest {
  instruction_id: string;
}

export interface IDeleteInstructionResponse {
  message: string;
}
