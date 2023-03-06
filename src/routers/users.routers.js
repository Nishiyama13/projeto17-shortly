import { Router } from "express";
import { SignUpSchema } from "../schemas/SignUpSchema.js";
import { SignInSchema } from "../schemas/SignInSchema.js";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import {
  signUp,
  signIn,
  getUserInformation,
} from "../controllers/UsersController.js";
import { authValidation } from "../middlewares/authMiddleware.js";

const usersRouter = Router();

usersRouter.post("/signup", validateMiddleware(SignUpSchema), signUp);
usersRouter.post("/signin", validateMiddleware(SignInSchema), signIn);
usersRouter.get("/users/me", authValidation, getUserInformation);

export default usersRouter;
