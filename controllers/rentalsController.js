import db from "../db/db.js";
import dayjs from "dayjs";

async function getRentals(req, res) {
  try {
    const showRental = await db.query(`SELECT rentals.*,
    games.name AS "gamesName",
    customers.name AS "customersName",
    games."categoryId",
    categories.name AS "categoryName"
    FROM rentals
    JOIN games ON rentals."gamesId"=games.id
    JOIN customers ON rentals."customersId" = customers.id
    JOIN categories ON games."categoriesId" = categories.id
    `);

    const rentData = showRental.rows.map((rent) => {
      return {
        id: rent.id,
        customerId: rent.customersId,
        gameId: rent.gamesId,
        rentDate: rent.rentDate,
        daysRented: rent.daysRented,
        returnDate: rent.returnDate,
        originalPrice: rent.originalPrice,
        delayFee: rent.delayFee,

        customer: {
          id: rent.customerId,
          name: rent.customerName,
        },

        game: {
          id: rent.gameId,
          name: rent.gameName,
          categoryId: rent.categoryId,
          categoryName: rent.CategoryName,
        },
      };
    });
    return res.send(rentData);
  } catch (e) {
    res.sendStatus(500);
  }
}
async function createRental(req, res) {
  const date = new Date();
  const { customerId, gameId, daysRented } = req.body;

  try {
    const calculatePrice = await db.query(`SELECT * from games WHERE id = $1`, [
      gameId,
    ]);
    const originalPrice = calculatePrice.rows[0].pricePerDay * daysRented;
    const rentDate =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    await db.query(
      `INSERT INTO RENTALS ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee")
        VALUES($1, $2, $3, $4, $5, $6, $7);`,
      [customerId, gameId, rentDate, daysRented, null, originalPrice, null]
    );
    res.sendStatus(201);
  } catch (e) {
    console.log(originalPrice);
    sendStatus(500);
  }
}

async function endRental(req, res) {
  const id = req.params;
  const returnDate = dayjs().format("YYYY-MM-DD");
  try {
    const rentalEnd = await db.query(
      `SELECT rentals.*, games."pricePerDay" 
      FROM rentals 
      JOIN games 
          ON rentals."gameId" = games.id 
      WHERE rentals.id = $1`,
      [id]
    );
    const rentDate = dayjs(rentalEnd.rows[0].rentDate);
    const calcDate = rentDate.diff(returnDate, "day");
    if (calcDate > rentalEnd.rows[0].daysRented) {
      delayFee =
        (calcDate - rentalEnd.rows[0].daysRented) *
        rentalEnd.rows[0].pricePerDay;
    }
    const update = await db.query(
      `UPDATE rentals SET ("returnDate", "delayFee") = ($1,$2) WHERE id = $3`,
      [rentalEnd, delayFee, id]
    );
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}

async function deleteRental(req, res) {
  const { id } = req.params;
  try {
    const rentDelete = await db.query(`DELETE FROM rentals WHERE id=$1`, [id]);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    return res.sendStatus(500);
  }
}
export { getRentals, createRental, endRental, deleteRental };
