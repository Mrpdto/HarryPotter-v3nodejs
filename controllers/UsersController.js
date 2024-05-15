const prisma = require("../config/prisma");
const { hashPassword, comparePassword } = require("../utils/bcrypt");
const { generateAccessToken } = require("../utils/jwt");

class UsersController {
  async index(req, res) {
    try {
      const users = await prisma.user.findMany();
      return res.status(200).json(users);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async store(req, res) {
    const body = req.body;

    try {

      const encryptedPassword = await hashPassword(body.password);

      const user = await prisma.user.create({
        data:{
          ...body,
          password: encryptedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          booster: true,
        }
      });

      const token = generateAccessToken(user.email);

      return res.status(201).json({user, token});
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async show(req, res) {
    try {
      const id = req.params.id;
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      return res.status(200).json(user);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const body = req.body;
  
      // Check if email is already taken
      if (body.email) {
        const existingUser = await prisma.user.findUnique({
          where: {
            email: body.email,
          },
        });
  
        if (existingUser && existingUser.id !== Number(id)) {
          return res.status(400).json({ message: "Email is already taken" });
        }
      }
  
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });
  
      if (!user) return res.status(404).json({ message: "User not found" });
  
      const updatedUser = await prisma.user.update({
        where: {
          id: Number(id),
        },
        data: body,
      });
  
      return res.status(200).json(updatedUser);
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
  
  async delete(req, res) {
    try {
      const id = req.params.id;
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user) return res.status(404).json({ message: "User not found" });

      await prisma.user.delete({
        where: {
          id: Number(id),
        },
      });

      return res.status(204).json({ message: "utilisateur supprimé" });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }
}

module.exports = new UsersController();
