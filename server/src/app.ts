import express from "express";
import cors from "cors";
import indexRouter from "./modules/index.route";
import {  requireAuth } from "./middleware/requireAuth";
import cookieParser from "cookie-parser";

const app = express();
app.use(cors({
  origin: ["http://localhost:3000","https://school-management-system-topaz-two.vercel.app"],
  credentials: true,
}));
app.use(cookieParser());
app.use(express.json());

//server health check route
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});

app.use("/api/v1",indexRouter)

export default app;