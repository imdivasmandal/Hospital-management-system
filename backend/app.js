import express from "express";
import connectDB from "./db/index.js";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import cors from "cors";
import messageRouter from "./routers/message.routes.js";
import userRouter from "./routers/user.routes.js";
import appointmentRouter from "./routers/appointment.routes.js";
import { errorMiddleware } from "./middlewares/errorMiddlewares.js";

const app = express();

dotenv.config({
  path: './.env'
})

app.use(cors({
  origin: [process.env.CORS_ORIGIN_ONE, process.env.CORS_ORIGIN_TWO],
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);


connectDB()
.then(() => {
  app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is listening at port : ${process.env.PORT}`);
  })
})
.catch((err) => {
  console.log("MONGO db connection failed !!! ", err);
})

app.use(errorMiddleware);
