const express = require("express");
const BoosterController = require("../controllers/BoosterController");
const { authenticateToken } = require("../middlewares/Auth");


const boosterRouter = express.Router();

boosterRouter.post("/booster/open", authenticateToken, BoosterController.openBooster); // POST /booster/open
boosterRouter.put("/booster/reset", authenticateToken, BoosterController.resetBooster); // PUT /booster/reset

module.exports = boosterRouter;