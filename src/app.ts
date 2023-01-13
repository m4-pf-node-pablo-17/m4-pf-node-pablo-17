import "reflect-metadata";
import "express-async-errors";
import express from "express";

import { errorIdentify } from "./errors/appError";
import userRoutes from "./routers/users.router";
import { loginRouter } from "./routers/login.router";

export const app = express();

app.use(express.json());

app.use("/users", userRoutes);

app.use("/login", loginRouter);

app.use(errorIdentify);
