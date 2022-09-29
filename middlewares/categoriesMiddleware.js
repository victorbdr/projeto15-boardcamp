import db from "../db/db.js";

export async function validadeCategorie(req,res,next){
const {name} = req.body
if(!name){
    return res.sendStatus(400)
}
try {
    const validateName = await db.query(
      `SELECT * FROM categories WHERE name = $1`,
      [name]
    );
    if (validateName.rows[0]) {
      return res.sendStatus(409);
    }
  } catch (e) {
    return res.status(500).send(e);
  }

  next();

}