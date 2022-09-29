import db from "../db/db.js";

export async function createCategories(req, res) {
  const categorie = req.body;
  try {
    await db.query(`INSERT INTO categories (name) VALUES($1)`, [
      categorie.name,
    ]);
  } catch (e) {
    res.status(500).send(e);
    console.log("erro ao fazer o post em categorias", e);
  }
}

