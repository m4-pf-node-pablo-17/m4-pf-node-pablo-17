import * as yup from 'yup';
import { SchemaOf } from 'yup';
import { IPosts, IPostsRequest, IPostsResponse } from '../../interfaces/posts/postsInterface';
import { IUserUpdate } from '../../interfaces/user/userInterface';

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

export const updateSchema: SchemaOf<IUserUpdate> = yup.object().shape({
    email: yup.string().email().notRequired(),
    name: yup.string().notRequired(),
    password: yup.string().notRequired(),
    contact: yup.string().notRequired(),
    register: yup.string().notRequired(),
    isStore: yup.boolean().notRequired(),
});

export { respPostsSchema, listRespPostsSchema, postsSchema };
