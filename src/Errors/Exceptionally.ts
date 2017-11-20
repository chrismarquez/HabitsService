import * as Express from "express";
import ConflictError from "./ConflictError";
import NotFoundError from "./NotFoundError";
import UnauthorizedError from "./UnauthorizedError";

export default async function exceptionally(
    res: Express.Response,
    task: () => void
): Promise<void> {
    try {
        await task();
    } catch (err) {
        console.error(err.constructor);
        const error: Error = err;
        switch (error.constructor) {
        case ConflictError:
            res.statusCode = 409;
            break;
        case NotFoundError:
            res.statusCode = 404;
            break;
        case UnauthorizedError:
            res.statusCode = 401;
            break;
        default:
            res.statusCode = 500;
        }
        res.end();
    }
}
