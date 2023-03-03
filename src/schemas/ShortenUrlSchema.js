import joi from "joi";

export const ShortenUrlSchema = joi.object({
  url: joi.string().uri().required(),
});
