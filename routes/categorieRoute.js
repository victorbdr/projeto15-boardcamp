import { Router } from "express";
import {
  createCategories,
  showCategories,
} from "../controllers/categoriesController.js";
import { validadeCategorie } from "../middlewares/categoriesMiddleware.js";

const categoriesRouter = Router();

categoriesRouter.post("/categories", validadeCategorie, createCategories);
categoriesRouter.get("/categories", showCategories);

export default categoriesRouter;
