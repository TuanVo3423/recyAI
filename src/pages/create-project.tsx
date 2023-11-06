import CreateProjectSection from '../components/create-project';
import { LayoutCreateProject } from '../components/create-project/components/Layout';

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
