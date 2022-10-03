import db from "../db/db.js";

async function showGames(req, res) {
  const { name } = req.query;
  try {
    const getGames = !name
      ? await db.query(
          `SELECT games.*,
          categories.id as "categoryId",
           categories.name as "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id`
        )
      : await db.query(
          `SELECT games.*,
           categories.id as "categoryId",
            categories.name as "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id
             WHERE LOWER(games.name) LIKE '${name.toLowerCase()}%';`
        );
    return res.send(getGames.rows).status(200);
  } catch (e) {
    res.status(500).send(e);
    console.log(e);
  }
}

async function postGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = req.body;
  try {
    await db.query(
      `INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay" ) 
      VALUES($1, $2, $3, $4, $5)`,
      [
        req.body.name,
        req.body.image,
        req.body.stockTotal,
        req.body.categoryId,
        req.body.pricePerDay,
      ]
    );
    return res.sendStatus(201);
  } catch (e) {
    console.log("erro ao adicionar game", e);
    res.status(500).send(e);
  }
}

export { showGames, postGame };
