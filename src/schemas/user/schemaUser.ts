import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUserRequest,
  IUserResponse,
  IUserUpdate,
} from "../../interfaces/user/userInterface";

const respUserSchema: SchemaOf<IUserResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  image: yup.string().notRequired(),
  name: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  contact: yup.string().notRequired(),
  register: yup.string().notRequired(),
  isStore: yup.boolean().notRequired(),
  isActive: yup.boolean().notRequired(),
  createdAt: yup.date().notRequired(),
  updatedAt: yup.date().notRequired(),
});

const listRespUserSchema = yup.array(respUserSchema);

const userSchema: SchemaOf<IUserRequest> = yup.object().shape({
  image: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
  contact: yup.string().required(),
  register: yup.string().required(),
  isStore: yup.boolean().required(),
});

export const updateSchema: SchemaOf<IUserUpdate> = yup.object().shape({
  image: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  name: yup.string().notRequired(),
  password: yup.string().notRequired(),
  contact: yup.string().notRequired(),
  register: yup.string().notRequired(),
  isStore: yup.boolean().notRequired(),
});

export { respUserSchema, listRespUserSchema, userSchema };
