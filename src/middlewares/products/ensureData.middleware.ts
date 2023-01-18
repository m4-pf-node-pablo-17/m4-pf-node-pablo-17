import { NextFunction, Request, Response } from 'express';
import { AnySchema } from 'yup';

const ensureDataMiddleware =
    (schema: AnySchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = await schema.validate(req.body, {
                abortEarly: false,
                stripUnknown: true,
            });

            req.body = validated;

            return next();
        } catch (error: any) {
            return res.status(400).json({ message: error.errors[0] });
        }
    };

export default ensureDataMiddleware;
