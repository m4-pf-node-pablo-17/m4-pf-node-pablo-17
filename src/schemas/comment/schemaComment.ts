import * as yup from 'yup';
import { SchemaOf } from 'yup';
import {
    IComment,
    ICommentRequest,
    ICommentResponse,
    ICommentUpdate,
} from '../../interfaces/comment/commentInterface';

const commentSchema: SchemaOf<IComment> = yup.object().shape({
    id: yup.string().required(),
    text: yup.string().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().required(),
    deletedAt: yup.date().required(),
    user: yup.object().shape({
        id: yup.string(),
        image: yup.string(),
        name: yup.string(),
        email: yup.string().email(),
        contact: yup.string(),
        register: yup.string(),
        isStore: yup.boolean(),
        isActive: yup.boolean(),
        createdAt: yup.date(),
        updatedAt: yup.date(),
    }),
});

const reqCommentSchema: SchemaOf<ICommentRequest> = yup.object().shape({
    text: yup.string().required(),
});

const respCommentSchema: SchemaOf<ICommentResponse> = yup.object().shape({
    id: yup.string().required(),
    text: yup.string().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().notRequired(),
    deletedAt: yup.date().notRequired(),
});

const reqUpdateCommentSchema: SchemaOf<ICommentUpdate> = yup.object().shape({
    text: yup.string().notRequired(),
});

export {
    respCommentSchema,
    reqCommentSchema,
    reqUpdateCommentSchema,
    commentSchema,
};
