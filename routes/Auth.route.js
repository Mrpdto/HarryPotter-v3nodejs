const express = require("express");
const AuthentificationController = require("../controllers/AuthentificationController");
const { authenticateToken } = require("../middlewares/Auth");


const authRouter = express.Router();

authRouter.post("/login", AuthentificationController.login);
authRouter.get("/getMyProfile", authenticateToken, AuthentificationController.getMyProfile);

module.exports = authRouter;