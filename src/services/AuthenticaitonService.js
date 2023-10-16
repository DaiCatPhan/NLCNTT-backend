import { Model } from "sequelize";
import jwt from "jsonwebtoken";
import db from "../app/models";
import bcrypt, { genSaltSync } from "bcrypt";
import { Op } from "sequelize";
import "dotenv/config";

const salt = genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt); 
  return hashPassword;
};

const checkPassword = (inputPassword, hashPassword) => {
  return bcrypt.compare(inputPassword, hashPassword);
};

const checkEmailExist = async (userEmail) => {
  let user = null;

  user = await db.Staff.findOne({
    where: {
      email: userEmail,
    },
  });

  if (user === null) {
    user = await db.Customer.findOne({
      where: {
        email: userEmail,
      },
    });
  }

  if (user === null) {
    return false;
  }
  return true; //  Email có tồn tại
};

const registerNewUser = async (rawUserData) => {
  // B1. kiểm tra email  -> B2. hashpassword -> B3. create new user
  try {
    // B1
    let isEmailExitst = await checkEmailExist(rawUserData.email);

    if (isEmailExitst === true) {
      return {
        EM: "Email đã tồn tại !!!",
        EC: -1,
        DT: "",
      };
    }

    // B2
    let hashPassword = hashUserPassword(rawUserData.password);

    // B3
    await db.Customer.create({
      email: rawUserData.email,
      name: rawUserData.name,
      role: "khachhang",
      gender: rawUserData.gender,
      password: hashPassword,
    });

    return {
      EM: "Taì khoản thành công",
      EC: 0,
    };
  } catch (err) {
    console.log(">>> err ", err);
    return {
      EM: "Loi server !!!",
      EC: -2,
    };
  }
};

const getUserLogin = async (valueLogin) => {
  let user = null;
  user = await db.Staff.findOne({
    where: {
      email: valueLogin,
    },
    raw: true,
  });

  if (user === null) {
    user = await db.Customer.findOne({
      where: {
        email: valueLogin,
      },
      raw: true,
    });
  }

  return user;
};

const handleUserLogin = async (rawData) => {
  try {
    let user = await getUserLogin(rawData.email);


    if (user === null) {
      return {
        EM: "Email không đúng !!!",
        EC: -2,
        DT: "",
      };
    }

    let isCorrectPassword = await checkPassword(
      rawData.password,
      user.password
    );

    if (isCorrectPassword === true) {
      let tokentData = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
      const token = jwt.sign(tokentData, process.env.JWT_KEY);

      return {
        EM: "ok",
        EC: 0,
        DT: {
          token,
          tokentData,
        },
      };

      // Tiếp tục
    } else {
      return {
        EM: " Mật khẩu sai !!!",
        EC: -2,
        DT: "",
      };
    }
  } catch (err) {
    console.log(">>> err", err);
    return {
      EM: "Loi server !!!",
      EC: -2,
      DT: "",
    };
  }
};

module.exports = { registerNewUser, handleUserLogin };
