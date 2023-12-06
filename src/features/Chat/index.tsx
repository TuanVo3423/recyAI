import React from 'react';
import { PencilAltIcon, ChevronDownIcon, PhoneIcon, VideoCameraIcon, InformationCircleIcon, EmojiHappyIcon,MicrophoneIcon, PhotographIcon, HeartIcon } from '@heroicons/react/outline';
type TChatProps = {};

export const Chat = (props: TChatProps) => {
  return (
    <div className='flex'>
      <div className='bg-gray-200 h-screen w-[350px] border-gray-300 border-x-[1px]'>
        <div className='h-[110px] bg-white'>
          <div className='flex items-center justify-center mx-4 pt-8'>
            <div className='flex-1 flex items-center space-x-1'>
            <p className='text-lg font-bold cursor-pointer'>pupuchino</p>
            <ChevronDownIcon className='w-4 h-4 cursor-pointer'/>
            </div>
            
            <PencilAltIcon className='w-7 h-7 cursor-pointer'/>
          </div>
          <div className='flex items-center justify-center mx-4 pt-6'>
            <div className='flex-1 flex items-center space-x-1'>
            <p className='text-sm font-bold cursor-pointer'>New Messages</p>
            
            </div>
            
            <p className='text-sm font-semibold text-gray-400 cursor-pointer'>Waiting messages</p>
          </div>
        </div>
        <div className='bg-green-200 h-[75px] flex items-center space-x-4 cursor-pointer'>
            <div className='ml-5'>
            <img src="https://mcdn.coolmate.me/image/March2023/meme-meo-2.jpg" alt="" className='w-16 h-16 rounded-full border-[1px]'/>
            </div>
            <div>
            <p className='text-md font-normal '>pupuchino</p>
                <p className='text-xs text-gray-400 '>Online 8 mins ago</p>
            </div>
        </div>
      </div>
      <div className='h-screen bg-white'>
        <div className='bg-white flex border-gray-300 h-[75px] w-[918px] border-b-[1px]'>
            <div className='flex flex-1 items-center space-x-3 ml-3'>
                <img src="https://mcdn.coolmate.me/image/March2023/meme-meo-2.jpg" alt="" className='w-12 h-12 rounded-full border-[1px]'/>
                <div>
                <p className='text-md font-semibold cursor-pointer'>pupuchino</p>
                <p className='text-xs text-gray-400 '>Online 8 mins ago</p>

                </div>
                
            </div>
            <div className='flex items-center space-x-2 mr-5'>
                <PhoneIcon className='w-7 h-7 cursor-pointer'/>
                <VideoCameraIcon className='w-7 h-7 cursor-pointer'/>
                <InformationCircleIcon className='w-7 h-7 cursor-pointer'/>
            </div>
        </div>
        <div className='bg-gray-200 h-[592px]'>

        </div>
        <div className='bg-white flex items-center justify-center border-[1px] border-gray-300 h-[75px] w-[918px]'>
            <div className='rounded-3xl flex items-center border-[1px] border-gray-300 h-[45px]'>
            <EmojiHappyIcon className='w-7 h-7 ml-3 cursor-pointer'/>
            <input
                   
                      type="text"
                      placeholder="Enter message ..."
                      className="border-none flex-1 focus:ring-0 outline-none bg-white w-[710px] rounded-xl mx-4 p-2 cursor-text"
                    />
            <div className='flex mr-3 space-x-2'>
            <MicrophoneIcon className='w-7 h-7 cursor-pointer'/>
            <PhotographIcon className='w-6 h-7 cursor-pointer'/>
            <HeartIcon className='w-7 h-7 cursor-pointer'/>
            </div>
            
            </div>
        </div>
      
      </div>
      
    </div>

  );
};
