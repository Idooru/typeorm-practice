import express from "express";
import { UserService } from "../service/user-service";

const userController = express.Router();
const userService = new UserService();

userController.get("/", userService.findAllUser);
userController.get("/:email", userService.findOneUser);
userController.post("/", userService.addUser);
userController.put("/:email", userService.modifyUser);
userController.delete("/:email", userService.deleteUser);

export { userController };
