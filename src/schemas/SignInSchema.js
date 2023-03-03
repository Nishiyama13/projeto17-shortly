import joi from "joi";

export const SignInSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
});
