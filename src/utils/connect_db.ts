import { Sequelize } from "sequelize"
import ENV from "./env_utils"
const database = new Sequelize(ENV.POSTGRES_URL, {
    dialect: "postgres",
})

export default database