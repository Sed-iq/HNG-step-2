import { Request, Response } from "express";
import error_handler from "../utils/error_handler";
import Organisation from "../models/organisation_model";

// Organisation getter
export default async (req: Request, res: Response) => {
    const user = req.user
    try {
        const org = await Organisation.findAll({
            where: {
                orgId: user
            }
        })
        const response = {
            status: "success",
            message: "Organisations",
            data: org
        }
        res.json(response)
    } catch (err) {
        const error = {
            "status": "Bad request",
            "message": "An error occurred",
            "statusCode": 500
        }
        res.status(error.statusCode).json({ status: error.status, messgage: error.message, statusCode: error.statusCode })
    }
}
export async function getSingleOrg(req: Request, res: Response) {
    const user = req.user
    try {
        const org = await Organisation.findOne({
            where: {
                orgId: user
            }
        })
        if (org) {
            const response = {
                status: "success",
                message: "Organisation found!",
                data: org
            }
            res.json(response)
        }
        else {
            throw false
        }
    } catch (err) {
        const error = {
            "status": "Bad request",
            "message": "An error occurred",
            "statusCode": 500
        }
        res.status(error.statusCode).json({ status: error.status, messgage: error.message, statusCode: error.statusCode })

    }
}