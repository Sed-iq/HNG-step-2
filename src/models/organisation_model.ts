import database from "../utils/connect_db";
import { DataTypes } from "sequelize";

const Organisation = database.define("Organisation", {
    orgId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    }
})
export default Organisation