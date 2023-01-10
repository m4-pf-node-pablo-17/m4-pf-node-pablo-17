import "reflect-metadata";
import "express-async-errors";
import express from "express";

import { errorIdentify } from "./errors/appError";

export const app = express();
app.use(express.json());

//

app.use(errorIdentify);

//teste
