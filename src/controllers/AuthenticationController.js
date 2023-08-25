import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

import db from "../app/models";
var privateKey = "sadfdsdf";

class Authentication {
  // [POST] /authentication/register
  async register(req, res, next) {
    const { email, password, username, phone } = req.body;

    if (!email || !password || !username || !phone) {
      // 400 Lỗi bad request
      return res.status(400).json({ err: 1, mes: "Chua truyen du tham so" });
    }

    try {
      const userExited = await db.User.findOne({
        raw: true,
        where: { email: email },
      });
      if (userExited) {
        return res
          .status(200)
          .json({ err: 2, mes: "Tài khoản đã tồn tại !!!" });
      }
      // Hash
      const hash = await bcrypt.hash(password, 10);
      if (hash) {
        const userDoc = (
          await db.User.create({
            email,
            password: hash,
            username,
            phone,
          })
        ).get({ plain: true });
        if (userDoc) {
          delete userDoc.password;
          return res
            .status(200)
            .json({ err: 3, mes: "Success", data: userDoc });
        } else {
          return res
            .status(401)
            .json({ err: 4, mes: "Tao tai khoan that bai !" });
        }
      } else {
        return res.status(402).json({ err: 5, mes: "Hash pass fail !!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 6, mes: "Loi server" });
    }
  }

  // [POST] /authentication/login
  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ err: 1, mes: "Du lieu ch day du !!!" });
    }

    try {
      const user = await db.User.findOne({
        raw: true,
        where: { email: email },
      });

      if (!user) {
        return res.status(401).json({ err: 2, mes: "Nguoi dung k ton tai" });
      }
      const passwordHash = user.password;

      const passInvalid = await bcrypt.compare(password, passwordHash); // true false
      if (passInvalid) {
        // Luu cookie
        const token = jwt.sign(
          { email: user.email, username: user.username, id: user.id },
          privateKey
        ); // chuoi json duoc ma hoa
        if (token) {
          res.cookie("token", token, {
            // lưu lên cookie
            sameSite: true,
            secure: false,
            httpOnly: true,
          });
        }
        delete user.password;
        return res.status(200).json({ err: 3, mes: "Success", user, token });
      } else {
        return res.status(400).json({ err: 4, mes: "Mat khau khong dung" });
      }
    } catch (err) {
      return res.status(500).json({ err: 5, mes: "Loi server !" });
    }
  }

  // [GET] /authentication/logout
  async logout(req, res, next) {
    try {
      res.cookie("token", "");
      return res
        .status(200)
        .json({ statusCode: 0, msg: "Logout successfully" });
    } catch (err) {
      return res.status(500).json({ msg: "Error logout.", err: err.message });
    }
  }

  //

  //
  async getPost(req, res, next) {
    
  }
}

export default new Authentication();
