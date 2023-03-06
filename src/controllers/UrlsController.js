import { db } from "../config/database.connections.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
  const { url } = req.body;
  const { id: userId } = res.locals.user;

  const shortenUrl = nanoid(10);

  try {
    const { rows: results } = await db.query(
      `
        INSERT INTO shortens (url, "shortUrl", "userId") 
        VALUES ($1, $2, $3)
        RETURNING id`,
      [url, shortenUrl, userId]
    );

    const [result] = results;

    res.status(201).send({
      id: result.id,
      shortUrl: shortenUrl,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
