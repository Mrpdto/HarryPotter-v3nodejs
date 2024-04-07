const prisma = require("../config/prisma");
const { generateAccessToken } = require("../utils/jwt");
const {comparePassword} = require("../utils/bcrypt");

class AuthentificationController {
  async login(req, res) {
    try {
      const body = req.body;
      const user = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      } 

      const isSamePassword = await comparePassword(body.password, user.password);

      if (!isSamePassword) {
        return res.status(400).json({ message: "information incorrect" });
      }

      const token = generateAccessToken(body.email);

      return res.status(200).json({ token });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  }

  async getMyProfile(req, res) {

    try{
      const email = req.user.data;
      console.log(req.user);
      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      return res.status(200).json({
        name: user.name,
        email: user.email,
      });
    }
    catch(e){
      return res.status(500).json({ message: e.message });
    }
  }

  async logout(req, res) {
    return res.status(200).json({ message: "logout" });
  }
}

module.exports = new AuthentificationController();
