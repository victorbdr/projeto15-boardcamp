import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import categoriesRouter from "./routes/categorieRoute.js";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config()

app.use(categoriesRouter);


app.listen(process.env.PORT,()=>console.log(`server working on port ${process.env.PORT}`))

