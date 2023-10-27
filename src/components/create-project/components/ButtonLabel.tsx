import { Button, ButtonProps } from "@chakra-ui/react";
import React from "react";

interface IButtonLabelProps extends ButtonProps {
    children: any;
    isActive: boolean;
}
// #5E1379
const ButtonLabel = ({ children, isActive, ...rest }: IButtonLabelProps) => {
    return (
        <Button
            variant="outline"
            borderColor="#e5e0df"
            bg={`${isActive && "#5E1379"}`}
            color={`${isActive ? "white" : "#7E1AA1"}`}
            _hover={{
                bgColor: isActive ? "" : "#EBD2F4",
            }}
            _disabled={{
                cursor: "not-allowed",
            }}
            {...rest}
        >
            {children}
        </Button>
    );
};

export default ButtonLabel;
