import {Sequelize} from "sequelize-typescript";
import envConfig from "../config/envConfig";

const sequelize = new Sequelize(envConfig.DB_URL,{
  modelPaths: [__dirname + "/models"],
  logging: false,
})

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected successfully");
    await sequelize.sync({ alter: false });
    console.log("Database synchronized successfully");
  } catch (error) {
    console.error("Unable to connect to database: ", error);
  }
}
export { sequelize, connectToDatabase };