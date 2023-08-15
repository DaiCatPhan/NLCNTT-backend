import Account from "../modules/Account";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";

var privateKey = "sadfdsdf";

class Authentication {
  // [POST] /authentication/register
  async register(req, res, next) {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      // 400 Lỗi chính nó xảy ra lun
      return res.status(400).json({ message: "Chua truyen du tham so" });
    }

    try {
      const userExited = await Account.findOne({ email: email });
      if (userExited) {
        return res.status(200).json("Tài khoản đã tồn tại !!!");
      }
      // Hash
      const hash = await bcrypt.hash(password, 10);
      if (hash) {
        const userDoc = await Account.create({
          email,
          password: hash,
          username,
        });
        if (userDoc) {
          delete userDoc.password;
          return res.status(200).json({ message: "Success", data: userDoc });
        } else {
          return res.status(401).json("Tao tai khoan that bai !");
        }
      } else {
        return res.status(402).json("Hash pass fail !!");
      }
    } catch (e) {
      return res.status(500).json(" Loi server ");
    }
  }

  // [POST] /authentication/login
  async login(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("Du lieu ch day du !!!");
    }

    try {
      const user = await Account.findOne({ email: email });
      if (!user) {
        return res.status(401).json("Nguoi dung k ton tai");
      }
      const passwordHash = user.password;
      const passInvalid = await bcrypt.compare(password, passwordHash); // true false
      if (passInvalid) {
        // Luu cookie
        const token = jwt.sign({ email: user.email }, privateKey); // chuoi json duoc ma hoa
        if (token) {
          res.cookie("token", token, {
            // lưu lên cookie
            sameSite: true,
            secure: false,
            httpOnly: true,
          });
        }

        return res.status(200).json({ message: "Success", user, token });
      } else {
        return res.status(400).json({ message: "Mat khau khong dung" });
      }
    } catch (e) {
      return res.status(500).json("Loi server !");
    }

    // const hashPass = await bcrypt.compare(password, 'sadfsa');
    // return res.status(200).json(hashPass);
  }
}

export default new Authentication();
