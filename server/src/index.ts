import "dotenv/config";

import app from "./app";
import envConfig from "./config/envConfig";
import "./database/connection";

function startServer() {
  const PORT = envConfig.PORT;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

startServer();