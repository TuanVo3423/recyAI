import { Box, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';
import { SideBar } from './components';

type Props = {
  children: React.ReactNode;
};

export const MainLayout = ({ children }: Props) => {
  return (
    <Grid
      templateAreas={`"nav main"`}
      gridTemplateColumns={'260px 1fr'}
      h="100%"
      minH="100vh"
      w="100%"
    >
      <GridItem area={'nav'} position="fixed" top={0}>
        <SideBar />
      </GridItem>
      <GridItem area={'main'} overflowX="hidden">
        {children}
      </GridItem>
    </Grid>
  );
};
