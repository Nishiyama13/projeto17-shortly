import { Router } from "express";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { ShortenUrlSchema } from "../schemas/ShortenUrlSchema.js";
import { authValidation } from "../middlewares/authMiddleware.js";
import {
  shortenUrl,
  getShortenUrlById,
  openShortenUrl,
  deleteShortenUrl,
} from "../controllers/UrlsController.js";
// getShortenUrl,

const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateMiddleware(ShortenUrlSchema),
  authValidation,
  shortenUrl
);
//urlsRouter.get("/urls", getShortenUrl);
urlsRouter.get("/urls/:id", getShortenUrlById);
urlsRouter.get("/urls/open/:shortUrl", openShortenUrl);
urlsRouter.delete("/urls/:id", authValidation, deleteShortenUrl);

export default urlsRouter;
