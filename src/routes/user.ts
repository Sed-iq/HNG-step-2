import { Request, Response } from "express";
import User from "../models/user_model";
import error_handler from "../utils/error_handler";

export default async (req: Request, res: Response) => {
    const { id } = req.params
    const user_id = req.user
    try {
        if (id && id == user_id) {
            const user: any = await User.findByPk(id)
            const response = {
                "status": "success",
                "message": "User Found!",
                "data": {
                    "userId": user.userId,
                    "firstName": user.firstName,
                    "lastName": user.lastName,
                    "email": user.email,
                    "phone": user.phone,
                }
            }
            res.json(response)
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