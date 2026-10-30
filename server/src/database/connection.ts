import {Sequelize} from "sequelize-typescript";
import envConfig from "../config/envConfig";

const sequelize = new Sequelize(envConfig.DB_URL,{
  modelPaths: [__dirname + "/models"],
  logging: false,
})

sequelize.authenticate()
.then(()=>{
  console.log("Database connected successfully");
})
.catch((error)=>{
  console.error("Unable to connect to database: ", error);
})


sequelize.sync({alter:false})
.then(()=>{
  console.log("Database synchronized successfully");
})
.catch((error)=>{
  console.error("Unable to synchronize database: ", error);
})

export default sequelize;