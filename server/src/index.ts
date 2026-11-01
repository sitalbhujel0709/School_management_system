import "dotenv/config";

import app from "./app";
import envConfig from "./config/envConfig";
import "./database/connection";
import { connectToDatabase } from "./database/connection";

async function startServer() {
  const PORT = envConfig.PORT;
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();