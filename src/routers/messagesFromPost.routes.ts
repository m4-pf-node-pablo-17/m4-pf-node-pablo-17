import { Router } from "express";
import { listAllMessagesFromPostController } from "../controllers/messagesFromPost.controller";

const messagesFromPostRoutes = Router()

messagesFromPostRoutes.get('/:id/posts', listAllMessagesFromPostController)

export default messagesFromPostRoutes