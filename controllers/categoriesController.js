import db from "../db/db.js";

async function createCategories(req, res) {
  const category = req.body;
  try {
    await db.query(`INSERT INTO categories (name) VALUES($1)`, [category.name]);
    return res.sendStatus(201);
  } catch (e) {
    res.status(500).send(e);
    console.log("erro ao fazer o post em categorias", e);
  }
}

async function showCategories(req, res) {
  try {
    const allCategories = await db.query(`SELECT * FROM categories`);
    res.status(200).send(allCategories.rows);
  } catch (e) {
    res.sendStatus(500);
  }
}
export { createCategories, showCategories };
