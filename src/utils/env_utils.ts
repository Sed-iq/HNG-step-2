import dotenv from "dotenv";
dotenv.config()
const ENV = {
    PORT: process.env.PORT || 3000,
    POSTGRES_URL: process.env.POSTGRES_URL || "",
    JWT_SECRET: process.env.JWT_SECRET || ""
}
export default ENV