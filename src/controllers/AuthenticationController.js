import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import AuthenticaitonService from "../services/AuthenticaitonService";

import db from "../app/models";
var privateKey = "sadfdsdf";

class Authentication {
  // [POST] /api/v1/authentication/login
  async handlelogin(req, res, next) {
    try {
      const { valueLogin, password } = req.body;

      if (!valueLogin || !password) {
        return res.status(200).json({
          EM: "Nhập thiếu dữ liệu !!!",
          EC: "1",
          DT: "",
        });
      }

      let data = await AuthenticaitonService.handleUserLogin({
        valueLogin,
        password,
      });

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
      const { email, name, phone, gender, password } = req.body;

      // Validate
      if (!email || !name || !phone || !gender || !password) {
        return res.status(200).json({
          EM: "Nhập thiếu dữ liệu !!!",
          EC: "1",
          DT: "",
        });
      }
      if (password && password.length < 5) {
        return res.status(200).json({
          EM: "Mật khẩu phải có ít nhất 5 ký tự ",
          EC: "1",
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
        EC: "-1", // error code
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
