import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import URLrouter from "./Router/urlRoute";
import userRouter from "./Router/userRoute";
import redirectRouter from "./Router/redirectURL";
import analyticsRouter from "./Router/analytics";
import logoutRouter from "./Router/logoutRouter";
dotenv.config();

// Env variables
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
export const SECRET = process.env.SECRET || "";
// Server
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.get("/", (req: Request, res: Response) => {
	return res.send("this is home");
});
app.use("/url", URLrouter);
app.use("/user", userRouter);
app.use("/i", redirectRouter);
app.use("/analytics", analyticsRouter);
app.use("/logout", logoutRouter);

// DB connection
mongoose.connect(MONGO_URI, {});

mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
	console.error("MongoDB connection error: " + err);
});

mongoose.connection.on("disconnected", () => {
	console.log("MongoDB disconnected");
});

app.listen(PORT, () => {
	console.log(`Server started at ${PORT}`);
});
