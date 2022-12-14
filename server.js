import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import categoriesRouter from "./routes/categorieRoute.js";
import gamesRouter from "./routes/gameRoute.js";
import costumerRouter from "./routes/costumerRoute.js";
import rentalRouter from "./routes/rentalRoute.js";
import "express-async-errors";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.use(categoriesRouter);
app.use(gamesRouter);
app.use(costumerRouter);
app.use(rentalRouter);

app.listen(process.env.PORT, () =>
  console.log(`server working on port ${process.env.PORT}`)
);
