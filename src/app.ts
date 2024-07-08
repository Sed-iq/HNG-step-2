import express from "express";
import ENV from "./utils/env_utils";
import database from "./utils/connect_db";
import routes from "./utils/routes"

const app = express()
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(express.json({ limit: "10mb" }))
app.use(routes)
app.listen(ENV.PORT, () => console.log())