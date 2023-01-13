import express from 'express';
import 'express-async-errors';
import 'reflect-metadata';
import { errorIdentify } from './errors/appError';
import postsRoutes from './routers/posts.router';
import userRoutes from './routers/users.router';

export const app = express();

app.use(express.json());

app.use('/users', userRoutes);

app.use('/posts', postsRoutes);

app.use('/login', loginRouter);

app.use(errorIdentify);
