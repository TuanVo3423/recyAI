import * as Yup from 'yup';
import {
  schema_number,
  schema_string_no_length_required,
} from '../../form/schema';
export const schema_share_my_collection = Yup.object({
  content: schema_string_no_length_required,
});

export interface IDefaultValueShare {
  content: string;
}

export const defaultValueShare: IDefaultValueShare = {
  content: '',
};
