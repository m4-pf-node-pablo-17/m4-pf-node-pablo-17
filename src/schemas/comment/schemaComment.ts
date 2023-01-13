import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { IComment, ICommentFromPost, ICommentRequest, ICommentResp, ICommentResponse, ICommentUpdate } from '../../interfaces/comment/commentInterface';

const commentSchema: SchemaOf<IComment> = yup.object().shape({
  id: yup.string().required(),
  text: yup.string().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().required(),
  deletedAt: yup.date().required()
})

const reqCommentSchema: SchemaOf<ICommentRequest> = yup.object().shape({
  text: yup.string().required()
})

const respCommentSchema: SchemaOf<ICommentResponse> = yup.object().shape({
  id: yup.string().required(),
  text: yup.string().required(),
  createdAt: yup.date().required(),
  updatedAt: yup.date().notRequired(),
  deletedAt: yup.date().notRequired(),
});

/* const respAllCommentsFromSchema: SchemaOf<ICommentResp> = yup.object().shape({
  id: yup.string().required(),
  text: yup.string().required(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
  deletedAt: yup.date().notRequired(),
}); */


const reqUpdateCommentSchema: SchemaOf<ICommentUpdate> = yup.object().shape({
  text: yup.string().notRequired()
})

/* const respCommentFromPostSchema: SchemaOf<ICommentFromPost[]> = yup.array(
  respAllCommentsFromSchema
) */


export { respCommentSchema, reqCommentSchema, reqUpdateCommentSchema, commentSchema };
