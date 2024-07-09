import { Request, Response } from "express";
import error_handler from "../utils/error_handler";
import User from '../models/user_model';
import jwt from "jsonwebtoken"
import ENV from "../utils/env_utils";
import bcrypt from "bcrypt";
import Organisation from "../models/organisation_model";

export default async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, phone } = req.body
    if (!firstName || firstName.trim() === '') {
        const error = [{
            field: "first name",
            message: "First name field is required"
        }]
        error_handler(res, error)
    }

    else if (!lastName || lastName.trim() === '') {
        const error = [{
            field: "last name",
            message: "Last name field is required"
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

    else if (!password || password.trim() === '') {
        const error = [{
            field: "password",
            message: "Password field is required"
        }]
        error_handler(res, error)
    }

    else if (!phone || phone.trim() === '') {
        const error = [{
            field: "Phone",
            message: "phone field is required"
        }]
        error_handler(res, error)
    }

    else {
        try {
            const $password = await bcrypt.hash(password, 10)
            const findUser = await User.findOne({ where: { email } })
            if (findUser) {
                console.log(findUser)
                const error = {
                    "status": "Bad request",
                    "message": "Registration unsuccessful",
                    "statusCode": 400
                }
                error_handler(res, error, 400)
            }
            else {
                const newUser: any = await User.create({ firstName, lastName, email, password: $password, phone });
                const newOrganisation: any = await Organisation.create({ orgId: newUser.userId, name: `${newUser.firstName}'s Organisation` })
                const accesstoken = jwt.sign({ userId: newUser.userId }, ENV.JWT_SECRET)
                const response = {
                    "status": "success",
                    "message": "Registration successful",
                    "data": {
                        "accessToken": accesstoken,
                        "user": {
                            "userId": newUser.userId,
                            "firstName": newUser.firstName,
                            "lastName": newUser.lastName,
                            "email": newUser.email,
                            "phone": newUser.phone,
                        }
                    }
                }
                res.status(201).json(response)
            }
        } catch (err) {
            console.log(err)
            const error = {
                "status": "Bad request",
                "message": "Registration unsuccessful",
                "statusCode": 400
            }
            res.status(error.statusCode).json({ status: error.status, messgage: error.message, statusCode: error.statusCode })
        }
    }
}