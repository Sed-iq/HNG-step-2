import { Request, Response } from "express";
import Organisation from "../models/organisation_model";

export default async (req: Request, res: Response) => {
    let { userId } = req.body
    let { orgId } = req.params
    try {
        if (!userId || !orgId) throw false;
        else {
            const addToOrg = await Organisation.update({
                orgId: userId
            }, {
                where: {
                    orgId
                }
            })

            const response = {
                "status": "success",
                "message": "User added to organisation successfully",
            }
            res.json(response)
        }
    } catch (err) {
        const error = {
            "status": "Bad Request",
            "message": "Client error",
            "statusCode": 400
        }
        res.status(error.statusCode).json({ status: error.status, messgage: error.message, statusCode: error.statusCode })

    }
}