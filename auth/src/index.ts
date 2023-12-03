import express, { Request, Response } from "express";
import "express-async-errors";
import { json } from "body-parser";

import { currentUserRouter } from "./routes/current-user";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from "./errors/not-found-error";
import mongoose from "mongoose";

const app = express();
app.use(json());

app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello");
});
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);
const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/");
    console.log("Connected to MongoDB");
    
  } catch (error) {
    console.log(error);
  }
};

app.listen(3000, () => {
  start();
  console.log("Listening on port 3000!!!!!!!!");
});