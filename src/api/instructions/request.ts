import { request } from '../axios';
import { IInstruction } from './types';

export const createInstruction = async (data: IInstruction) => {
  const res = await request({
    url: `instructions`,
    method: 'POST',
    data,
  });
  return res;
};

// export const generateDocument = async (selectionId: number) => {
//   const res = await request({
//     url: `/chatgpt/generate-document/${selectionId}`,
//     method: 'POST',
//   });
//   return res;
// };

// export const generateUserflow = async (selectionId: number) => {
//   const res = await request({
//     url: `/chatgpt/generate-user-flow/${selectionId}`,
//     method: 'POST',
//   });
//   return res;
// };

export const getInstruction = async (InstrcutionID: number | string) => {
  const res = await request({
    url: `instructions/${InstrcutionID}`,
    method: 'GET',
  });
  return res;
};

export const getMyInstructions = async () => {
  const res = await request({
    url: `instructions/me`,
    method: 'GET',
  });
  return res;
};
