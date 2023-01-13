import * as yup from 'yup';
import { SchemaOf } from 'yup';
import {
    IPosts,
    IPostsResponse,
    IPostsUpdate,
} from '../../interfaces/posts/postsInterface';

const respPostsSchema: SchemaOf<IPostsResponse> = yup.object().shape({
    id: yup.string().notRequired(),
    image: yup.string().notRequired(),
    title: yup.string().notRequired(),
    text: yup.string().notRequired(),
    createdAt: yup.date().notRequired(),
    updatedAt: yup.date().notRequired(),
});

const listRespPostsSchema = yup.array(respPostsSchema);

const postsSchema: SchemaOf<IPosts> = yup.object().shape({
    id: yup.string().required(),
    image: yup.string().notRequired(),
    title: yup.string().required(),
    text: yup.string().email().required(),
    createdAt: yup.date().required(),
    updatedAt: yup.date().notRequired(),
    deletedAt: yup.date().notRequired(),
});

export const updateSchema: SchemaOf<IPostsUpdate> = yup.object().shape({
    title: yup.string().notRequired(),
    image: yup.string().notRequired(),
    text: yup.string().notRequired(),
});

export { respPostsSchema, listRespPostsSchema, postsSchema };
