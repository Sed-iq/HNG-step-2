import { Sequelize } from "sequelize"
import pg from "pg"
import ENV from "./env_utils"
const database = new Sequelize(ENV.POSTGRES_URL, {
    dialect: "postgres",
    dialectModule: pg,
    host: ENV.POSTGRES_HOST
})

export default database