import express from "express";
import ENV from "./utils/env_utils";
import database from "./utils/connect_db";
import routes from "./utils/routes"

const app = express()
app.use(express.urlencoded({ extended: true, limit: "10mb" }))
app.use(express.json({ limit: "10mb" }))
app.use(routes)
database.authenticate().then(() => {
    database.sync()
    app.listen(ENV.PORT, () => console.log("Server is running"))
}).catch(err => {
    console.error(err)
    process.exit(0)
})