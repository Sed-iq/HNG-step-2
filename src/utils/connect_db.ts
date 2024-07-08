import { Sequelize } from "sequelize"
import ENV from "./env_utils"
const database = new Sequelize(ENV.DB, {
    dialect: "postgres",
})

export default database