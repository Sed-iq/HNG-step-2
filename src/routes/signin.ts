import { Request, Response } from "express";
import error_handler from "../utils/error_handler";
import User from '../models/user_model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import ENV from "../utils/env_utils";

export default (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!password || password.trim() === '') {
        const error = [{
            field: "password",
            message: "Password field is required"
        }]
        error_handler(res, error)
    }
    else if (!email || email.trim() === '') {
        const error = [{
            field: "email",
            message: "Email field is required"
        }]
        error_handler(res, error)
    }
    else {
        User.findOne({ where: { email } }).then(async (data: any) => {
            const ispassword = await bcrypt.compare(password, data.password)
            if (ispassword === true) {
                const accesstoken = jwt.sign({ userId: data.userId }, ENV.JWT_SECRET)
                const response = {
                    "status": "success",
                    "message": "Login successful",
                    "data": {
                        "accessToken": accesstoken,
                        "user": {
                            "userId": data.userId,
                            "firstName": data.firstName,
                            "lastName": data.lastName,
                            "email": data.email,
                            "phone": data.phone,
                        }
                    }
                }
                res.json(response)
            }
            else throw ispassword
        }).catch(err => {
            console.log(err)
            const error = {
                "status": "Bad request",
                "message": "Authentication failed",
                "statusCode": 401
            }
            res.status(error.statusCode).json({ status: error.status, messgage: error.message, statusCode: error.statusCode })
        })
    }
}