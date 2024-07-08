import { Request, Response } from "express";
import Organisation from "../models/organisation_model";

export default async (req: Request, res: Response) => {
    const user = req.user
    try {
        const { name, description } = req.body
        if (!name) {
            throw false
        }
        else {
            const newOrganisation: any = await Organisation.create({ orgId: user, name, description })
            const response = {
                "status": "success",
                "message": "Organisation created successfully!",
                "data": {
                    "orgId": newOrganisation.orgId,
                    "name": newOrganisation.name,
                    "description": newOrganisation.description
                }
            }
            res.status(201).json(response)
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