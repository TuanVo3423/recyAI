import { InputField } from '@/ui-kit';
import React from 'react';

type TVerifyEmail = {};

export const VerifyEmail= ({ }: TVerifyEmail) => {
  return (
    <div className='flex-col space-y-[130px]'>
        
      <div className='bg-white w-full items-center h-[60px] shadow-lg flex space-x-[500px]'>

        <img src="https://yesrecycling.org/wp-content/uploads/2022/02/Yes-Recycling_Logo-green.png" alt="" className=' w-[100px] ml-5' />

        <div className='flex flex-1 items-center space-x-5'>
          <div className='flex space-x-5'>
            <input
              type="text"
              placeholder="Email..."
              className="border-none focus:ring-0 outline-none bg-gray-100 rounded-xl p-2"
            />
            <input
              type="password"
              placeholder="Password..."
              className="border-none focus:ring-0 outline-none bg-gray-100 rounded-xl p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-green-400 hover:bg-green-700 text-white w-[100px] h-[34px] text-sm rounded-xl shadow-lg font-bold"
          >
            Sign in
          </button>

        </div>
      </div>
      <div className='flex items-center justify-center'>
        <div className='w-[500px] h-[285px] bg-white shadow-lg border-[1px] rounded-xl'>
            <div className='border-b-[1px] border-gray-300 p-5'>
              <p className='text-xl font-bold'>Account Comfirmation</p>
            </div>
            <div className='p-5 flex-col space-y-5 border-b-[1px] border-gray-300 pb-7'>
              <p className='text-md'>Please enter your account's email to verify your account...</p>
              <input
              type="text"
              placeholder="Email..."
              className="border-none focus:ring-0 outline-none bg-gray-100 rounded-xl w-full p-2"
            />
            </div>
            <div className='flex items-center right-0 space-x-4 mt-6 ml-64'>
            <button
            type="submit"
            className="bg-gray-200 text-gray-600 w-[100px] h-[34px] text-sm rounded-xl shadow-lg font-bold"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-400 hover:bg-green-700 text-white w-[100px] h-[34px] text-sm rounded-xl shadow-lg font-bold"
          >
            Submit
          </button>
            </div>
        </div>

      </div>
      <div className='flex items-center justify-center'>
        <div className='w-[500px] h-[205px] bg-white shadow-lg border-[1px] rounded-xl'>
            <div className='border-b-[1px] border-gray-300 p-5 flex items-center justify-center'>
              <p className='text-xl font-bold'>Account Comfirmation</p>
            </div>
            <div className='p-5 flex-col justify-center items-center space-y-5  border-gray-300 pb-7'>
              <p className='text-md'>An email with your your account comfirmation link has been sent to your email: <span className='italic text-green-400'>abc@gmail.com</span></p>
              <p className='text-md'>Check your email and come back to proceed!</p>
              
            </div>
           
        </div>

      </div>
    </div>
  );
};
