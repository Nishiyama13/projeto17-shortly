import { db } from "../config/database.connections.js";

export async function authValidation(req, res, next) {
  const authorization = req.headers.authorization;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.status(401).send("Token não recebido");

  try {
    const { rows: sessions } = await db.query(
      `SELECT * FROM sessions WHERE token = $1`,
      [token]
    );

    const [session] = sessions;

    if (!session) return res.status(401).send("Sessão não encontrada");

    const { rows: users } = await db.query(
      `SELECT * FROM users WHERE id = $1`,
      [session.userId]
    );
    const [user] = users;

    if (!user) return res.status(401).send("Usuário não encontrado");

    res.locals.user = user;

    next();
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
