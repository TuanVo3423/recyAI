import {
  HStack,
  Icon,
  Stack
} from '@chakra-ui/react';
import { useState } from 'react';
import { EditIcon, TrashIcon } from '../../icons';
import { StoryPointInput } from './StoryPointInput';

type TCardTableContentProps = {
  provided: any;
  snapshot: any;
  section: any;
  form?: any;
  index: number;
  columns: any;
  setColumns: any;
};

export const CardTableContent = ({
  index,
  provided,
  section,
  form,
  snapshot,
  columns,
  setColumns,
}: TCardTableContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { setValue } = form;
  const handleRemoveItem = (itemId: number | string) => {
    const updatedItems = columns[0].tableOfContents.filter(
      (item) => item.id !== itemId
    );
    setColumns([{ ...columns[0], tableOfContents: updatedItems }]);
  };

  return (
    <Stack
      spacing={2}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={{
        backgroundColor: '#eae7ff',
        padding: 10,
        borderRadius: 4,
        borderColor: snapshot.isDragging
          ? '1px solid rgb(0, 102, 255)'
          : 'transparent',
        opacity: snapshot.isDragging && '1',
        ...provided.draggableProps.style,
      }}
    >
      <HStack w="100%" align="center" justify="space-between">
        <StoryPointInput
          columns={columns}
          setColumns={setColumns}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          index={index}
          section={section}
        />
        {isEditing ? (
          <></>
        ) : (
          <HStack spacing={4}>
            <Icon
              w="20px"
              h="20px"
              color="black"
              cursor="pointer"
              as={EditIcon}
              onClick={() => setIsEditing(true)}
            />
            <Icon
              w="20px"
              h="20px"
              color="black"
              cursor="pointer"
              onClick={() => handleRemoveItem(section.id)}
              as={TrashIcon}
            />
          </HStack>
        )}
      </HStack>
    </Stack>
  );
};
