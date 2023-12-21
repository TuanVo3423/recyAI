import {
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from '@chakra-ui/react';
import React from 'react';

type TPopoverComingSoonProps = {
  children: React.ReactElement;
  placement?: 'top' | 'right' | 'bottom' | 'left';
};

export const PopoverComingSoon = ({
  children,
  placement = 'right',
}: TPopoverComingSoonProps) => {
  return (
    <Popover trigger="hover" isLazy placement={placement}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent zIndex={9999} w="fit-content">
        <PopoverHeader fontWeight="semibold">Coming soon!</PopoverHeader>
        <PopoverArrow />
        {/* <PopoverCloseButton /> */}
      </PopoverContent>
    </Popover>
  );
};
