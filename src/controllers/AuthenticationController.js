import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import db from "../app/models";
var privateKey = "sadfdsdf";

class Authentication {
  // [POST] /api/v1/authentication/login
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if ((!email || !password)) {
        return res.status(400).json({ mes: "data entry not enough !!!" });
      }

      const exitUser = await db.Staff.findOne({
        raw: true,
        where: {
          email: email,
        },
      });

      if (!exitUser) {
        res.status(400).json({ mes: "Account does not exits" });
      }

      const passwordHashed = exitUser.password;
      const passInvalid = await bcrypt.compare(password, passwordHashed); // true false
      if (passInvalid) {
        // Luu cookie
        const payload = {
          email: exitUser.email,
          phone: exitUser.phone,
          gender: exitUser.gender,
          name: exitUser.name,
          role: exitUser.role,
        };

        const token = jwt.sign(payload, privateKey);

        if (token) {
          // Luu token lên cookie
          res.cookie("token", token, {
            sameSite: true,
            secure: false,
            httpOnly: true,
          });
          delete exitUser.password;
          return res.status(200).json({ sta: "Success", exitUser, token });
        } else {
          return res.status(400).json({ mes: "Loi xu li token" });
        }
      } else {
        return res.status(200).json({ mes: "Incorrect password" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // [GET] /api/v1/authentication/logout
  async logout(req, res, next) {
    try {
      res.cookie("token", "");
      return res
        .status(200)
        .json({ sta: "Success", msg: "Logout successfully" });
    } catch (err) {
      return res.status(500).json({ msg: "Error logout.", err: err.message });
    }
  }
}

export default new Authentication();
