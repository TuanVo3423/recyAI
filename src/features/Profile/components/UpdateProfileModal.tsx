import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  UseDisclosureReturn,
} from '@chakra-ui/react';
import React from 'react';

interface IUpdateProfileModalProps extends Partial<UseDisclosureReturn> {}

export const UpdateProfileModal = ({
  isOpen,
  onClose,
  onOpen,
}: IUpdateProfileModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent overflow="hidden" w="70vw" maxH="90vh" maxW="none">
        <ModalBody p={0} w="full">
          <div className="bg-white w-full">
            <div>
              <div className="flex items-center py-3 border-b-[1px]">
                <img
                  src={
                    'https://shophotproperties.com/cdn/shop/products/IMG_8557_grande.jpg?v=1503263004'
                  }
                  className="rounded-full h-8 w-8 object-contain border p-1 mr-3 ml-4"
                  alt=""
                />
                <div className="flex-1 flex items-center">
                  <p className="font-semibold text-sm mr-2 cursor-pointer"></p>
                  <p className="mx-2">•</p>
                  <p className="text-sm">123</p>
                </div>
              </div>
            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
