
import { Router } from "express";
import { createCategories } from "../controllers/categoriesController.js";
import { validadeCategorie } from "../middlewares/categoriesMiddleware.js";


const categoriesRouter = Router();

categoriesRouter.post("/categories",validadeCategorie, createCategories);

export default categoriesRouter;