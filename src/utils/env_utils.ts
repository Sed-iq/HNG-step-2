import dotenv from "dotenv";
dotenv.config()
const ENV = {
    PORT: process.env.PORT || 3000,
    DB: process.env.DB || "",
    JWT_SECRET: process.env.JWT_SECRET || ""
}
export default ENV