import db from "../db/db.js";

async function showCustomers(req, res) {
  const { cpf } = req.query;
  try {
    const findCustomer = !cpf
      ? await db.query(`SELECT * FROM customers`)
      : await db.query(`SELECT * FROM customers WHERE customers.cpf LIKE $1`, [
          `%{cpf}%`,
        ]);
    return res.status(200).send(findCustomer.rows);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
}
async function findCustomerId(req, res) {
  const { id } = req.params;
  try {
    const customerId = await db.query(
      `SELECT * FROM customers WHERE customers.id=$1`,
      [id]
    );
    if (!customerId.rows[0]) {
      return res.sendStatus(404);
    }
    return res.status(200).send(customerId.rows[0]);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}

async function sendCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  try {
    await db.query(
      `INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);`,
      [req.body.name, req.body.phone, req.body.cpf, req.body.birthday]
    );
    res.sendStatus(201);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

async function updateCustomer(req, res) {
  const { name, phone, cpf, birthday } = req.body;
  const { id } = req.params;
  try {
    const customerUpdate = await db.query(
      `UPDATE customers SET name = '${name}', phone = '${phone};, cpf = '${cpf}', birthday = '${birthday}' WHERE id =${id}`
    );
    return res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
}
export { showCustomers, findCustomerId, sendCustomer, updateCustomer };
