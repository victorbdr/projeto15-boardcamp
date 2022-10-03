/* import db from "../db/db.js";

async function getRentals(req, res) {
  try {
    const showRental = await db.query(`SELECT rentals.*,
    games.name AS "gamesName",
    costumers.name AS "costumersName",
    games."categoryId",
    categories.name AS "categoryName"
    FROM rentals
    JOIN games ON rentals."gamesId"=games.id
    JOIN costumers ON rentals."costumersId" = costumers.id
    JOIN categories ON games."categoriesId" = categories.id
    `);

    const rentData = showRental.rows.map((rent)=>
    {return{
    id:rent.id,
    costumersId:rent.costumersId,
    gamesId:rent.gamesId,
    rentDate:rent.rentDate,
    daysRented:rent.daysRented,
    returnDate:rent.returnDate,
    originalPrice:rent.originalPrice,
    delayFree:rent.delayFree

    }
    })
  } catch (e) {
    res.sendStatus(500);
  }
}
 */
