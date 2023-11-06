import { LayoutCreateProject } from '@/components/create-project/components/Layout';
import { BoxProps, Button, Stack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { boxQAPopoverMotion } from '../components/motion';
import { PreviewInstructions } from '../components/result/index';

interface PreviewPageProps extends BoxProps {}

const PreviewPage = () => {
  return (
    <LayoutCreateProject page="Home">
      <Stack spacing={6} w="full">
        <motion.div
          variants={boxQAPopoverMotion}
          initial="visible"
          transition={{ duration: 0.6 }}
        >
          <PreviewInstructions />
        </motion.div>
      </Stack>
    </LayoutCreateProject>
  );
};

export default PreviewPage;
