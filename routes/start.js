const express = require("express");
const UsersController = require("../controllers/UsersController");
const AuthentificationController = require("../controllers/AuthentificationController");
const { authenticateToken } = require("../middlewares/Auth");

const router = express.Router();

router.get("/users", UsersController.index); // GET /users
router.post("/users", UsersController.store); // POST /users
router.post("/login", AuthentificationController.login);
router.get("/users/:id", UsersController.show); // GET /users/:id
router.put("/users/:id", UsersController.update); // PUT /users/:id
router.delete("/users/:id", UsersController.delete); // DELETE /users/:id
router.get(
  "/getMyProfile",
  authenticateToken,
  AuthentificationController.getMyProfile
);

module.exports = router;
