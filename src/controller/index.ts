import express from "express";
import { userController } from "./user-controller";

const serverMainRouter = express.Router();

serverMainRouter.use("/user", userController);

export { serverMainRouter };
