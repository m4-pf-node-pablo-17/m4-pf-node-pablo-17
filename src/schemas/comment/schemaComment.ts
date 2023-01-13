import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { ICommentResponse } from '../../interfaces/comment/commentInterface';

const respCommentSchema: SchemaOf<ICommentResponse> = yup.object().shape({
  id: yup.string().required(),
  text: yup.string().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
  deletedAt: yup.date().required(),
});

export { respCommentSchema };
