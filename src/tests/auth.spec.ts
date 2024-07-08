import { Request, Response } from "express";
import register from '../routes/register'
import User from '../models/user_model';
import Organisation from '../models/organisation_model';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import error_handler from "../utils/error_handler";

jest.mock('../models/user_model');
jest.mock('../models/organisation_model');
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
jest.mock("../utils/error_handler");

describe('User Registration', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let json: jest.Mock;
    let status: jest.Mock;

    beforeEach(() => {
        req = {
            body: {
                firstName: 'John',
                lastName: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                phone: '1234567890',
            }
        };
        json = jest.fn();
        status = jest.fn().mockReturnValue({ json });
        res = {
            status,
        };
    });

    it('Should Register User Successfully with Default Organisation', async () => {
        (bcrypt.hash as jest.Mock).mockResolvedValue('$hashedPassword');
        (User.findOne as jest.Mock).mockResolvedValue(null);
        (User.create as jest.Mock).mockResolvedValue({
            userId: 'user-123',
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: '$hashedPassword',
            phone: '1234567890',
        });
        (Organisation.create as jest.Mock).mockResolvedValue({});
        (jwt.sign as jest.Mock).mockReturnValue('accessToken');

        await register(req as Request, res as Response);

        expect(status).toHaveBeenCalledWith(201);
        expect(json).toHaveBeenCalledWith({
            status: 'success',
            message: 'Registration successful',
            data: {
                accessToken: 'accessToken',
                user: {
                    userId: 'user-123',
                    firstName: 'John',
                    lastName: 'Doe',
                    email: 'john.doe@example.com',
                    phone: '1234567890',
                }
            }
        });
    });

    it('Should Fail If Required Fields Are Missing', async () => {
        const fields = ['firstName', 'lastName', 'email', 'password', 'phone'];

        for (const field of fields) {
            req.body[field] = '';
            await register(req as Request, res as Response);
            expect(error_handler).toHaveBeenCalledWith(res, expect.any(Array));
            req.body[field] = 'value'; // Reset field
        }
    });

    it('Should Fail if there’s Duplicate Email', async () => {
        (bcrypt.hash as jest.Mock).mockResolvedValue('$hashedPassword');
        (User.findOne as jest.Mock).mockResolvedValue({ email: 'john.doe@example.com' });

        await register(req as Request, res as Response);

        expect(error_handler).toHaveBeenCalledWith(res, {
            status: 'Bad request',
            message: 'Registration unsuccessful',
            statusCode: 400
        }, 400);
    });
});
