const express = require("express");
const UsersController = require("../controllers/UsersController");

const usersRouter = express.Router();

usersRouter.get("/users", UsersController.index); // GET /users
usersRouter.post("/users", UsersController.store); // POST /users
usersRouter.get("/users/:id", UsersController.show); // GET /users/:id
usersRouter.put("/users/:id", UsersController.update); // PUT /users/:id
usersRouter.delete("/users/:id", UsersController.delete); // DELETE /users/:id

module.exports = usersRouter;