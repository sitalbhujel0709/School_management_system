import express from "express";
import cors from "cors";
import indexRouter from "./modules/index.route";

const app = express();
app.use(cors());
app.use(express.json());

//server health check route
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

app.use("/api/v1",indexRouter)

export default app;