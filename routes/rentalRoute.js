import { Router } from "express";
import {
  getRentals,
  createRental,
  endRental,
  deleteRental,
} from "../controllers/rentalsController.js";
import {
  validateRental,
  validateDelete,
} from "../middlewares/rentalsMiddleware.js";

const rentalRouter = Router();

rentalRouter.post("/rentals", validateRental, createRental);
rentalRouter.get("/rentals", getRentals);
rentalRouter.post("/rentals/:id/return", endRental);
rentalRouter.delete("/rentals/:id", validateDelete, deleteRental);

export default rentalRouter;
