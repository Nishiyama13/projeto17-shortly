import { Router } from "express";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { ShortenUrlSchema } from "../schemas/ShortenUrlSchema.js";
import { shortenUrl } from "../controllers/UrlsController.js";

// getShortenUrl,
// getShortenUrlById,
// openShortenUrl,
// deleteShortenUrl,
const urlsRouter = Router();

urlsRouter.post(
  "/urls/shorten",
  validateMiddleware(ShortenUrlSchema),
  shortenUrl
);
//urlsRouter.get("/urls", getShortenUrl);
//urlsRouter.get("/urls/:id", getShortenUrlById);
//urlsRouter.get("/urls/open/:shortUrl", openShortenUrl);
//urlsRouter.delete("/urls/:id", deleteShortenUrl);

export default urlsRouter;
