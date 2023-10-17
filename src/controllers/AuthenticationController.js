import jwt from "jsonwebtoken";

import AuthenticaitonService from "../services/AuthenticaitonService";
import "dotenv/config";

class Authentication {
  //
  async getProfile(req, res) {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.json("NGuoi dung ch dang nhap");
      }
      const dataUser = jwt.verify(token, process.env.JWT_KEY);
      return res.status(200).json(dataUser);
    } catch (err) {
      console.log("err <<< ", err);
      return res.status(500).json({ err: err });
    }
  }

  // [POST] /api/v1/authentication/login
  async handlelogin(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(200).json({
          EM: "Nhập thiếu dữ liệu !!!",
          EC: "1",
          DT: "",
        });
      }

      let data = await AuthenticaitonService.handleUserLogin({
        email,
        password,
      });

      if (data.EC === 0) {
        return res
          .cookie("token", data.DT.token, { sameSite: "none", secure: true })
          .json({ EC: 0, EM: "Login successfully!!", DT: data.DT });
      }

      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (err) {
      console.log("err <<< ", err);
      return res.status(500).json({
        EM: "error server", // error message
        EC: "-1", // error code
        DT: "", // data
      });
    }
  }

  // [POST] /api/v1/authentication/register
  async handleRegister(req, res, next) {
    try {
      const { email, name, gender, password } = req.body;

      // Validate
      if (!email || !name || !gender || !password) {
        return res.status(200).json({
          EM: "Nhập thiếu dữ liệu !!!",
          EC: "-1",
          DT: "",
        });
      }

      // Create User
      let data = await AuthenticaitonService.registerNewUser(req.body);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: "",
      });
    } catch (err) {
      return res.status(500).json({
        EM: "error server", // error message
        EC: "-5", // error code
        DT: "", // data
      });
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
