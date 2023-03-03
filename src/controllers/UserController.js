import { db } from "../config/database.connections.js";
import bcrypt from "bcrypt";
//import { V4 as uuidV4 } from "uuid";

export async function signUp(req, res) {
  const { name, email, password } = req.body;

  try {
  } catch (error) {
    return res.status(500).send(error.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
  } catch (error) {
    return res.status(500).send(error.message);
  }
}
