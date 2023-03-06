import { db } from "../config/database.connections.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
    const checkExistingUser = await db.query(
      `SELECT * FROM users WHERE email = $1`,
      [email]
    );

    if (checkExistingUser.rowCount > 0) return res.sendStatus(409);

    const passwordHash = bcrypt.hashSync(password, 10);

    await db.query(
      `
    INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)
    `,
      [name, email, passwordHash]
    );

    res.sendStatus(201);
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  const { rows: users } = await db.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );

  if (!users) return res.sendStatus(401);

  const [user] = users;

  if (bcrypt.compareSync(password, user.password)) {
    const token = uuid();

    await db.query(`INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [
      token,
      user.id,
    ]);

    return res.send({ token });
  }

  res.sendStatus(401);
}
