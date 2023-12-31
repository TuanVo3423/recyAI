import { Box, BoxProps, Flex, Text } from "@chakra-ui/react";
import { UseFormReturn } from "react-hook-form";

interface Props extends BoxProps {
    isTriangle?: boolean;
}

export const ReceiveContent = ({
    children,
    isTriangle = false,
    ...rest
}: Props) => {
    return (
        <Flex w="100%" justify="flex-start">
            <Box
                bg="#eae7ff"
                color="#000"
                borderRadius={isTriangle ? "6px 6px 6px 0px" : "6px"}
                p="8px"
                position="relative"
                w="fit-content"
                maxW="600px"
                mb={isTriangle ? "15px" : "0px"}
                fontSize="14px"
                _before={{
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: "-11px",
                    w: "11px",
                    h: "11px",
                    background: "url(/triangle.png) center no-repeat",
                    bgSize: "contain",
                    display: isTriangle ? "block" : "none",
                }}
                {...rest}
            >
                {children}
            </Box>
        </Flex>
    );
};

export const ReplyContent = ({
    children,
    isTriangle = false,
    ...rest
}: Props) => {
    return (
        <Flex justify="flex-end">
            <Box
                bg="text.0"
                borderRadius={isTriangle ? "6px 6px 0px 6px" : "6px"}
                p="10px 18px"
                position="relative"
                w="fit-content"
                maxW="400px"
                color="text.900"
                fontSize="14px"
                _before={{
                    content: '""',
                    position: "absolute",
                    right: 0,
                    bottom: "-11px",
                    w: "11px",
                    h: "11px",
                    background: "url(/triangle-right.png) center no-repeat",
                    bgSize: "contain",
                    display: isTriangle ? "block" : "none",
                }}
                {...rest}
            >
                {children}
            </Box>
        </Flex>
    );
};

export type TNoteMessageProps = {
    content: string;
};

export const NoteMessage = ({ content }: TNoteMessageProps) => {
    return (
        <Text fontSize="sm" color="gray.500">
            {content}
        </Text>
    );
};
