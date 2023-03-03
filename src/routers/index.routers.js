import { Router } from "express";
import userRouter from "./user.routers.js";
//import urlsRouter from "./urls.routers.js";
//import  from "./.routers.js"

const router = Router();

router.use(userRouter);
//router.use(urlsRouter);
//router.use();

export default router;
