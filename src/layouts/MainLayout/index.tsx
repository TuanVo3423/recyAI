import { Box, Grid, GridItem, useBreakpointValue } from '@chakra-ui/react';
import React from 'react';
import { SideBar } from './components';
import SideBarMobile from './components/SideBarMobile';

type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  const variant = useBreakpointValue({
    base: 'mobile',
    md: 'mobile',
    lg: 'desktop',
  });
  const isMobile = variant === 'mobile';

  return (
    <Grid
      templateAreas={`"nav main"`}
      gridTemplateColumns={`${isMobile ? '0 1fr' : '250px 1fr'}`}
      h="100%"
      minH="100vh"
      w="100%"
      p={isMobile ? 4 : 0}
    >
      <GridItem area={'nav'} position="fixed" top={0}>
        {isMobile ? <SideBarMobile /> : <SideBar />}
      </GridItem>
      <GridItem area={'main'} overflowX="hidden">
        {children}
      </GridItem>
    </Grid>
  );
};
