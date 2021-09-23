import Router from "express";
import { roomRouter } from "./roomRouter";

export const router = Router();
router.use('/room', roomRouter);
