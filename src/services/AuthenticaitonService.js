import { Model } from "sequelize";
import db from "../app/models";
import bcrypt, { genSaltSync } from "bcrypt";

//
const salt = genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
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
      };
    }

    if (isPhoneExitst === true) {
      return {
        EM: "Số điện thoại đã tồn tại !!!",
        EC: 1,
      };
    }

    // B2
    let hashPassword = hashUserPassword(rawUserData.password);

    // B3
    await db.Staff.create({
      email: rawUserData.email,
      name: rawUserData.name,
      phone: rawUserData.phone,
      gender: rawUserData.gender,
      password: hashPassword,
    });

    return {
      EM: "Taì khoản thành công",
      EC: 0,
    };
  } catch (err) {
    console.log(err);
    return {
      EM: "Loi server !!!",
      EC: -2,
    };
  }
};

module.exports = { registerNewUser };
