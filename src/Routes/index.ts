import Router from "express";
import { roomRouter } from "./RoomRouter";

const router = Router();
router.use('/room', roomRouter);
