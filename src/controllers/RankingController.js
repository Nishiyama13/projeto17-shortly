import { db } from "../config/database.connections.js";

export async function getRanking(req, res) {
  try {
    const { rows } = await db.query(`
      SELECT users.id, users.name,
      COUNT(shortens.id) AS "linksCount",
      COALESCE(SUM(shortens."visitCounter"),0) AS "visitCount"
      FROM users
      LEFT JOIN shortens ON shortens."userId" = users.id
      GROUP BY users.id, shortens."visitCounter"
      ORDER BY "visitCount" DESC
      LIMIT 10 `);

    res.send(rows);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
