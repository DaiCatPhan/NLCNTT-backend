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
  let user = await db.Staff.findOne({
    where: {
      email: userEmail,
    },
  });
  if (user) {
    return true;
  }
  return false; // Email khong ton tai !
};

const checkPhoneExist = async (phoneEmail) => {
  let user = await db.Staff.findOne({
    where: {
      phone: phoneEmail,
    },
  });
  if (user) {
    return true;
  }
  return false; // Email khong ton tai !
};

const registerNewUser = async (rawUserData) => {
  // B1. kiểm tra email  -> B2. hashpassword -> B3. create new user
  try {
    // B1
    let isEmailExitst = await checkEmailExist(rawUserData.email);
    let isPhoneExitst = await checkPhoneExist(rawUserData.phone);

    if (isEmailExitst === true) {
      return {
        EM: "Email đã tồn tại !!!",
        EC: 1,
        DT: "",
      };
    }

    if (isPhoneExitst === true) {
      return {
        EM: "Số điện thoại đã tồn tại !!!",
        EC: 1,
        DT: "",
      };
    }

    // B2
    let hashPassword = hashUserPassword(rawUserData.password);

    // B3
    await db.Staff.create({
      email: rawUserData.email,
      name: rawUserData.name,
      phone: rawUserData.phone,
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

const handleUserLogin = async (rawData) => {
  try {
    let user = await db.Staff.findOne({
      where: {
        [Op.or]: [{ email: rawData.valueLogin }, { phone: rawData.valueLogin }],
      },
    });

    if (user === null) {
      console.log("Không tìm thấy Người dùng !!!");
      return {
        EM: "Email / SDT  không đúng !!!",
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
