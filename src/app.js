import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Initialize Express App
const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Ensure this is set in .env
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routes Import
import userRouter from "./routes/user.routes.js";

// Routes Declaration
app.use("/api/v1/users", userRouter);

// Export App
export { app };



