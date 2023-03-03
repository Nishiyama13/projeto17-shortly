import { Router } from "express";
import userRouter from "./user.routers.js";
//import  from "./.routers.js"
//import  from "./.routers.js"

const router = Router();

router.use(userRouter);
router.use();
router.use();

export default router;
