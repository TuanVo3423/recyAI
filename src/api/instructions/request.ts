import { request } from '../axios';
import {
  IInstructionRequest,
  ICreateInstructionResponse,
  IgetInstructionRequest,
  IInstructionResponse,
  IGetMyInstructionsResponse,
  IEditInstructionsInMyTweetsRequest,
  IEditInstructionsInMyTweetsResponse,
  IDeleteInstructionRequest,
  IDeleteInstructionResponse,
} from './types';

const URL = 'instructions';
export const createInstruction = async (data: IInstructionRequest) => {
  const res = await request({
    url: URL,
    method: 'POST',
    data,
  });
  return res as ICreateInstructionResponse;
};

export const deleteInstruction = async (data: IDeleteInstructionRequest) => {
  const res = await request({
    url: `${URL}/${data.instruction_id}`,
    method: 'DELETE',
  });
  return res as IDeleteInstructionResponse;
};

export const getInstruction = async ({
  instruction_id,
}: IgetInstructionRequest) => {
  const res = await request({
    url: `${URL}/${instruction_id}`,
    method: 'GET',
  });
  return res as IInstructionResponse;
};

export const getMyInstructions = async () => {
  const res = await request({
    url: `${URL}/me`,
    method: 'GET',
  });
  return res as IGetMyInstructionsResponse;
};

export const editInstructionsInMyTweets = async ({
  instruction_id,
  payload,
}: IEditInstructionsInMyTweetsRequest) => {
  const res = await request({
    url: `${URL}/${instruction_id}`,
    method: 'PATCH',
    data: payload,
  });
  return res as IEditInstructionsInMyTweetsResponse;
};
