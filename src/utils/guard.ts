import { NextFunction, Request, Response } from "express";
import error_handler from "./error_handler";
import jwt from 'jsonwebtoken';
import ENV from "./env_utils";

// Route Guard
export default (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization
        if (token) {
            jwt.verify(token, ENV.JWT_SECRET, (err: any, decoded: any) => {
                if (err) {
                    throw err
                }
                else {
                    req.user = decoded.userId
                    next()
                }
            })
        }
        else throw false
    } catch (err) {
        const error = {
            "status": "Bad request",
            "message": "Authentication failed",
            "statusCode": 401
        }
        error_handler(res, error, error.statusCode)
    }

}
