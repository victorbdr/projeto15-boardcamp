import db from "../db/db.js";
import { rentalSchema } from "../schemas/rentalSchema.js";

async function validateRental(req, res, next) {
  const rentalInfo = req.body;
  const validateSchema = rentalSchema.validate(rentalInfo);
  if (validateSchema.error) {
    return res.sendStatus(400);
  }
  try {
    const checkId = await db.query(`SELECT * FROM customers WHERE id = $1`, [
      rentalInfo.customerId,
    ]);
    if (!checkId.rows[0]) {
      return res.sendStatus(400);
    }
    const checkGame = await db.query(`SELECT * FROM games WHERE id = $1`, [
      rentalInfo.gameId,
    ]);

    if (!checkGame.rows[0]) {
      return res.sendStatus(400);
    }
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
  next();
}

async function validateDelete(req, res, next) {
  const { id } = req.params;
  try {
    const findId = await db.query(`SELECT FROM rentals WHERE id=$1`, [id]);
    if (findId.rowCount === 0) {
      return res.sendStatus(400);
    }
    if (findId.rows[0].returnDate) {
      return res.sendStatus(400);
    }
    res.locals.rentalData = findId;
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
  next();
}

export { validateRental, validateDelete };
