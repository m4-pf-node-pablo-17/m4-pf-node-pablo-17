import { Request, Response } from "express";
import listAllMessagesFromPostService from "../services/listAllMessagesFromPost.service";


const listAllMessagesFromPostController = async (req: Request, res: Response) => {
    const messageId: number = parseInt(req.params.id)
    const posts = await listAllMessagesFromPostService(messageId)
    return res.json(posts)
}

export { listAllMessagesFromPostController }