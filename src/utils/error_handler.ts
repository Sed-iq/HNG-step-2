import { Response } from "express";

export default (res: Response, error: object, status?: number) => {
    res.status(status || 422).json({ "errors": error })
}