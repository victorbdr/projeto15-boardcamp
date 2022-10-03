import { Router } from "express";
import {
  showCustomers,
  findCustomerId,
  sendCustomer,
  updateCustomer,
} from "../controllers/costumerController.js";
import { customerValidation } from "../middlewares/costumerMiddleware.js";

const costumerRouter = Router();

costumerRouter.post("/customers", customerValidation, sendCustomer);
costumerRouter.get("/customers", showCustomers);
costumerRouter.put("/customers/:id", customerValidation, updateCustomer);
costumerRouter.get("/customers/:id", findCustomerId);

export default costumerRouter;
