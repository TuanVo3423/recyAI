// import { StorypointCheckIcon } from '@/icons';
// import { IncreaseNumberIcon } from '@/icons/increase-number';
import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  CloseButton,
  Editable,
  Flex,
  Icon,
  Input,
  Text
} from '@chakra-ui/react';
import { useState } from 'react';

type EditableControlsProps = {
  index: number;
  section: any;
  isEditing: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onEdit: () => void;
  setIsEditing: any;
  columns: any;
  setColumns: any;
};

export const StoryPointInput = ({
  index,
  isEditing,
  setIsEditing,
  columns,
  setColumns,
  section,
}: {
  index: number;
  isEditing: boolean;
  setIsEditing: any;
  columns: any;
  setColumns: any;
  section: any;
}) => {
  return (
    <Editable w="full" isPreviewFocusable={false} submitOnBlur={false}>
      {(props: any) => (
        <>
          <EditableControls
            {...props}
            section={section}
            columns={columns}
            setColumns={setColumns}
            setIsEditing={setIsEditing}
            index={index}
            isEditing={isEditing}
          />
        </>
      )}
    </Editable>
  );
};

const EditableControls = ({
  isEditing,
  onSubmit,
  onCancel,
  onEdit,
  section,
  index,
  setIsEditing,
  columns,
  setColumns,
}: EditableControlsProps) => {
  const [storyPoint, setStoryPoint] = useState<string>(section.content);
  const handleSubmit = (itemId: number | string) => {
    const updatedItems = columns[0].tableOfContents.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          content: storyPoint,
        };
      } else {
        return item;
      }
    });
    setColumns([{ ...columns[0], tableOfContents: updatedItems }]);
  };
  return isEditing ? (
    <Flex gap="8px" align="center">
      <Input
        value={storyPoint}
        onChange={(e) => setStoryPoint(e.target.value)}
      />
      <Icon
        as={CheckCircleIcon}
        w="20px"
        h="20px"
        onClick={() => {
          handleSubmit(section.id);
          setIsEditing(false);
        }}
      />
      <CloseButton w="20px" h="20px" onClick={() => setIsEditing(false)} />
    </Flex>
  ) : (
    <Flex
      w="full"
      h="24px"
      p="0 10px"
      cursor="pointer"
      align="center"
      bg="rgba(255, 255, 255, 0.1)"
      borderRadius="4"
    >
      <Text lineHeight="160%" color="text.100">
        {`${index + 1}. ${storyPoint}`}
      </Text>
    </Flex>
  );
};
