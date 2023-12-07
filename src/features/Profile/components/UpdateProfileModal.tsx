import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import React from 'react';

interface IUpdateProfileModalProps extends Partial<UseDisclosureReturn> { }

export const UpdateProfileModal = ({
  isOpen,
  onClose,
  onOpen,
}: IUpdateProfileModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent overflow="hidden" w="40vw" maxH="90vh" maxW="none">
        <ModalBody p={0} w="full">
          <div className="bg-white w-full flex items-center justify-center">
            <div>
              <div className='flex justify-center items-center mt-6 mb-6'>
                <p className='text-2xl font-semibold'>Edit Profile</p>
              </div>
              <div className="flex items-center py-3 justify-center ">
                <img
                  src={
                    'https://shophotproperties.com/cdn/shop/products/IMG_8557_grande.jpg?v=1503263004'
                  }
                  className="rounded-full h-14 w-14 object-contain p-1 mr-3 ml-4"
                  alt=""
                />
                <div className=''>
                  <p className='tetx-md font-semibold'>pupuchino</p>
                  <p className='text-green-400 font-normal hover:text-green-900 cursor-pointer'>Change avatar</p>
                </div>
              </div>
              <div className='flex mb-6 mt-5'>
                  <p className='font-semibold flex-1'>Name</p>
                  <input
                  type="text"
                  placeholder="Editing your name ..."
                  className="border-none flex-1 focus:ring-0 w-[400px] outline-none bg-gray-100 rounded-xl mx-4 p-2"
                />
              </div>
              <div className='flex'>
                  <p className='font-semibold flex-1'>About you</p>
                  <textarea
                  
                  placeholder="Write something about you ..."
                  className="border-none flex-1 focus:ring-0 outline-none bg-gray-100 rounded-xl mx-4 p-2"
                />
              </div>
              <div className='flex items-center justify-center mt-10'>
              <div className='w-[100px] h-[50px] items-center rounded-3xl justify-center flex bg-green-400 hover:bg-green-900 cursor-pointer mb-8'>
                <p className='text-white font-semibold'>Save</p>
              </div>
              </div>
              

            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
