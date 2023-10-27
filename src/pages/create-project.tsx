import { Box, Text } from '@chakra-ui/react';
import CreateProjectSection from '../components/create-project';
import { LayoutCreateProject } from '../components/create-project/components/Layout';
import React from 'react';

type Props = {};

const CreateProject = (props: Props) => {
  return (
    <LayoutCreateProject page="Home">
      {/* create project steps... */}
      <CreateProjectSection />
    </LayoutCreateProject>
  );
};

export default CreateProject;
