import { Router } from "express";
import { SignUpSchema } from "../schemas/SignUpSchema.js";
import { SignInSchema } from "../schemas/SignInSchema.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { signUp, signIn } from "../controllers/UserController.js";
const userRouter = Router();

userRouter.post("/signup", validateMiddleware(SignUpSchema), signUp);
userRouter.post("/signin", validateMiddleware(SignInSchema), signIn);

export default userRouter;
