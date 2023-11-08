import {
  schema_array_string_required,
  schema_string,
  schema_string_no_length_required,
} from '../../form/schema';
import * as Yup from 'yup';
export const schema_create_section = Yup.object({
  instruction: schema_string_no_length_required,
});

export interface IDefaultValue {
  id?: number;
  instruction: string;
}
export const defaultValues: IDefaultValue = {
  instruction: '',
};
export type TSection = {
  id?: number | string;
  content: string;
};

export type TColumn = {
  id: number | string;
  name: string;
  tableOfContents: Array<TSection>;
};

export const checkEmptyOption = (arr: Array<any> = [], idx: number) => {
  if (arr[idx] && arr[idx].length !== 0) return !Boolean(arr[idx]);
  return true;
};

// export const HandleUpdateColumns = (
//   sourceColumns: TColumn[],
//   sectionData: IDefaultValue
// ) => {
//   const updatedColumnPreview = sourceColumns;
//   const updatedItems = sourceColumns[0].tableOfContents.map((section) => {
//     if (section.id === sectionData.id) {
//       return {
//         ...section,
//         title: sectionData.title,
//         content: sectionData.subsection.join('\n'), // join the array of strings into a single string
//       };
//     } else return section;
//   });
//   updatedColumnPreview[0].tableOfContents = updatedItems;
//   return updatedColumnPreview;
// };

export const onDragEnd = (
  result: any,
  columns: TColumn[],
  updateColumns: any
) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.tableOfContents];
    const destItems = [...destColumn.tableOfContents];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    updateColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        tableOfContents: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        tableOfContents: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.tableOfContents];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    updateColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        tableOfContents: copiedItems,
      },
    });
  }
};

export const replaceSpecialCharacters = (response: string): Array<string> => {
  return response
    .split(/<br\/>|<br>|<br \/>|\n/)
    .filter(function (item) {
      return /^\d/.test(item);
    })
    .map((item) => item.replace(/^\d+\.\s/, ''));
};
