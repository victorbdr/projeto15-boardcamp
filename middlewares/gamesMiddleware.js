import db from "../db/db.js";
import { gameSchema } from "../schemas/gameSchema.js";

export async function validateGame(req, res, next) {
  const { name, stockTotal, pricePerDay, categoryId } = req.body;

  const validGame = gameSchema.validate({
    name,
    stockTotal,
    pricePerDay,
  });
  console.log(validGame);
  if (validGame.error) {
    return res.sendStatus(400);
  }
  try {
    const searchId = await db.query(`SELECT id FROM categories WHERE id = $1`, [
      categoryId,
    ]);
    if (!searchId) {
      return res.sendStatus(400);
    }
    const searchName = await db.query(
      `SELECT name FROM games WHERE name = $1`,
      [name]
    );
    if (!searchName) {
      return res.sendStatus(409);
    }
  } catch (e) {
    console.log("erro ao adicionar game", e);
    return res.status(500).send(e);
  }

  next();
}
