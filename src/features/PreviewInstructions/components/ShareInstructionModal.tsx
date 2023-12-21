import { useAuth } from '@/stores';
import { TextAreaInputFieldWithoutLabel } from '@/ui-kit';
import {
  Box,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  UseDisclosureProps,
} from '@chakra-ui/react';
interface TShareInstructionModalProps extends UseDisclosureProps {
  currentInstruction?: any;
  shareInstructionModalStatus: any;
  form: any;
  onSubmit: any;
}
const currentInstruction2 = [
  {
    id: 'b356175f-9415-494d-8dda-b13f866a5c2f',
    content:
      'Rửa sạch 5 chai nhựa đã qua sử dụng bằng nước và xà phòng để loại bỏ bất kỳ chất còn lại bên trong.',
  },
  {
    id: 'f60a0e4d-e88b-443d-b5ce-56e71c6bd237',
    content: 'Làm khô hoàn toàn các chai nhựa sau khi rửa.',
  },
  {
    id: '16888ee4-f0fe-429d-a17f-d6d49b6e23b6',
    content:
      'Sử dụng kéo hoặc dao cắt để cắt đầu chai nhựa, tạo một lỗ nhỏ ở phần trên của chai.',
  },
  {
    id: '794de92a-0e58-4b9f-b1dd-a1482515a7e7',
    content:
      'Sử dụng các chai nhựa đã cắt để làm các đồ trang trí như hoa, cây cảnh, hoặc bình chứa bút.',
  },
  {
    id: '8463de0e-b19b-4844-8174-9f0fa609011a',
    content:
      'Nếu không muốn sử dụng chai nhựa làm đồ trang trí, hãy đặt chúng vào thùng tái chế nhựa để đảm bảo chúng được tái chế một cách thích hợp và không gây ô nhiễm cho môi trường.',
  },
];

export const ShareInstructionModal = ({
  shareInstructionModalStatus,
  form,
  onSubmit,
  currentInstruction,
}: TShareInstructionModalProps) => {
  const { handleSubmit, setValue, watch, reset } = form;
  const profileStore = useAuth((state) => state.profile);
  return (
    <Modal
      isOpen={shareInstructionModalStatus.isOpen}
      onClose={shareInstructionModalStatus.onClose}
    >
      <ModalOverlay />
      <ModalContent overflow="hidden" w="70vw" maxW="none">
        <ModalBody p={0} w="full">
          <div className="flex justify-center">
            <div className="bg-white border-r-[1px] w-[55%] p-[40px]">
              {currentInstruction &&
                currentInstruction.map((step: any, idx: number) => (
                  <Text>{step.content}</Text>
                ))}
            </div>
            <Box
              as="form"
              onSubmit={handleSubmit(onSubmit)}
              bg="white"
              w="45%"
              padding="0 20px"
            >
              <div>
                <div className="flex items-center py-3 border-b-[1px]">
                  <img
                    src={
                      'https://shophotproperties.com/cdn/shop/products/IMG_8557_grande.jpg?v=1503263004'
                    }
                    className="rounded-full h-8 w-8 object-contain border p-1 mr-3 ml-2"
                    alt=""
                  />
                  <div className="flex-1 flex">
                    <p className="font-semibold text-sm mr-9">
                      {profileStore && profileStore.name}
                    </p>
                  </div>

                  <button
                    type="submit"
                    // onClick={(e) => e.preventDefault()}
                    className="font-semibold text-blue-400 cursor-pointer hover:text-blue-950 text-sm mr-9"
                  >
                    Chia se
                  </button>
                </div>
              </div>
              <div className="w-full">
                <TextAreaInputFieldWithoutLabel
                  form={form}
                  name="content"
                  placeholder="Enter content..."
                  type={'text'} // type="text"
                />
                {/* <input
                  type="text"
                  placeholder="Viet gi do . . ."
                  className="w-[335px] rounded-3xl focus:ring-0 h-auto border-none "
                /> */}
              </div>
              {/* <div className="flex items-center space-x-64 border-b-[1px] pb-2">
                <EmojiHappyIcon className="h-6 cursor-pointer w-6 ml-4 text-gray-400" />
                <p className="text-xs text-gray-400">0/2.200</p>
              </div> */}
            </Box>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
