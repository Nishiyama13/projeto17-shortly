import { Router } from "express";
import usersRouter from "./users.routers.js";
//import urlsRouter from "./urls.routers.js";
//import  from "./.routers.js"

const router = Router();

router.use(usersRouter);
//router.use(urlsRouter);
//router.use();

export default router;
