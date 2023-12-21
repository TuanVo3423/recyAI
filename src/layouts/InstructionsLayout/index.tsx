import { BgCreateProjectIcon } from '@/icons';
import { Box, Button, Flex, FlexProps, Icon } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Icons, PathMapWithIcon } from './data';

interface LayoutCreateInstructionsProps extends FlexProps {
  children: React.ReactElement;
  isDocumentMode?: boolean;
  page: string;
}

export const LayoutInstructions = ({
  children,
  isDocumentMode,
  page,
  ...rest
}: LayoutCreateInstructionsProps) => {
  const router = useRouter();
  return (
    <Box>
      <Flex flexDir="column">
        <Flex
          justify="center"
          align="center"
          inset={0}
          pos="fixed"
          w="100%"
          h="100%"
          bgImage="url('https://t4.ftcdn.net/jpg/04/55/43/29/360_F_455432971_UikdWVsLVVPRjoUAL4JfKkSKfUybQb6V.jpg')"
          bgRepeat="no-repeat"
          bgSize="cover"
          bgPosition="center"
          {...rest}
        >
          {/* <Icon as={BgCreateProjectIcon} w="400px" h="400px" /> */}
        </Flex>
        <Flex zIndex={2} gap={1} p="18px">
          <Button
            onClick={() => router.push(PathMapWithIcon[page])}
            px={4}
            color="gray.800"
            fontSize="sm"
            w="fit-content"
            height={8}
            fontWeight="700"
            borderColor="gray-200"
            borderRadius="full"
            bgColor="white"
            _hover={{
              color: 'green',
            }}
            leftIcon={<Icon as={Icons[page]} />}
          >
            {page}
          </Button>
        </Flex>
        {/* render step... */}
        <Flex w="full" minH="full" justify="center">
          {children}
        </Flex>
      </Flex>
    </Box>
  );
};
