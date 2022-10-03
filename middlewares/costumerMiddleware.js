import db from "../db/db.js";
import { customerSchema } from "../schemas/costumerSchema.js";

async function customerValidation(req, res, next) {
  const customer = req.body;
  const validateCustomer = customerSchema.validate(customer);
  console.log(validateCustomer);
  if (validateCustomer.error) {
    return res.sendStatus(400);
  }
  try {
    const cpfCheck = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [
      customer.cpf,
    ]);
    if (cpfCheck.rows[0]) {
      return res.sendStatus(409);
    }
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }

  next();
}
export { customerValidation };
