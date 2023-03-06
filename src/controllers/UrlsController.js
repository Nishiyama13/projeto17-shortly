import { db } from "../config/database.connections.js";
import { nanoid } from "nanoid";

// getShortenUrl,
// getShortenUrlById,
// openShortenUrl,
// deleteShortenUrl

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

export async function getShortenUrlById(req, res) {
  const { id } = req.params;

  try {
    const result = await db.query(`SELECT * FROM shortens WHERE id = $1`, [id]);

    if (result.rowCount === 0) return res.sendStatus(404);

    const [url] = result.rows;

    res.send({
      id: url.id,
      shortUrl: url.shortUrl,
      url: url.url,
    });
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
