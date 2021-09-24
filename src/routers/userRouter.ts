import { userController } from "@/controllers";
import { Router } from "express";

export const userRouter = Router();

userRouter.get('/', userController.getAllUsers);
userRouter.get('/user', userController.getUser);
