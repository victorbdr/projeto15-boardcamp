import { Router } from "express";
import { postGame, showGames } from "../controllers/gamesController.js";
import { validateGame } from "../middlewares/gamesMiddleware.js";

const gamesRouter = Router();

gamesRouter.post("/games", validateGame, postGame);
gamesRouter.get("/games", showGames);

export default gamesRouter;
