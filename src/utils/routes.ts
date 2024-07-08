import express, { Request, Response } from "express";
import register from "../routes/register";
import signin from "../routes/signin";
import user from "../routes/user";
import guard from "./guard";
import organisation, { getSingleOrg } from "../routes/organisation";
import create_organisation from "../routes/create_organisation";
import add_organisation from "../routes/add_organisation";
const app = express()

declare module 'express' {
    interface Request {
        user?: string;
    }
}

app.post("/auth/register", register)
app.post("/auth/signin", signin)
app.get("/api/users/:id", guard, user)
app.get("/api/organisations", guard, organisation)
app.get("/api/organisations/:orgId", guard, getSingleOrg)
app.post("/api/organisations", guard, create_organisation)
app.post("/api/organisations/:orgId/users", add_organisation)
export default app
