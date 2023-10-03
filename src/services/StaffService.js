import db from "../app/models";
import bcrypt, { genSaltSync } from "bcrypt";
const salt = genSaltSync(10);

const hashUserPassword = async (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
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

const checkPhoneStaffExist = async (userPhone) => {
  let user = null;

  user = await db.Staff.findOne({
    where: {
      phone: userPhone,
    },
  });

  if (user === null) {
    return false;
  }
  return true;
};

const checkIdExist = async (userId) => {
  let user = await db.Staff.findOne({
    where: {
      id: userId,
    },
  });
  if (user) {
    return true;
  }
  return false; // Id khong ton tai !
};

// ===================== CRUD =========================
const getUserWithPagination = async ({ page = 1, limit = 3 }) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.Staff.findAndCountAll({
      offset: offset,
      limit: limit,
    });
    let data = {
      totalRows: count,
      users: rows,
    };
    return {
      EM: "Lấy dữ liệu thành công ",
      EC: 0,
      DT: data,
    };
  } catch (err) {
    console.log(">> loi", err);
    return {
      EM: "Loi server !!!",
      EC: 1,
      DT: "",
    };
  }
};

const getAllUser = async (data) => {
  try {
    let users = await db.Staff.findAll({
      attributes: ["name", "phone", "gender", "role", "email", "createdAt"],
    });
    if (users) {
      let data = users;
      return {
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: data,
      };
    }
  } catch (err) {
    console.log(">> loi", err);
    return {
      EM: "Loi server !!!",
      EC: -5,
      DT: data,
    };
  }
};

const createNewUser = async (rawUserData) => {
  try {
    // B1
    // B2
    let isEmailExitst = await checkEmailExist(rawUserData.email);
    let isPhoneExitst = await checkPhoneStaffExist(rawUserData.phone);
    if (isEmailExitst === true) {
      return {
        EM: "Email đã tồn tại !!!",
        EC: -1,
        DT: "",
      };
    }

    if (isPhoneExitst === true) {
      return {
        EM: "Phone đã tồn tại !!!",
        EC: -1,
        DT: "",
      };
    }

    // B2
    let hashPassword = await hashUserPassword(rawUserData.password);

    // B3

    let userNewData = await db.Staff.create({
      email: rawUserData.email,
      name: rawUserData.name,
      phone: rawUserData.phone,
      role: rawUserData.role,
      gender: rawUserData.gender,
      password: hashPassword,
    });

    return {
      EM: "Tạo tài  khoản thành công",
      EC: 0,
      DT: userNewData,
    };
  } catch (err) {
    console.log("err <<<>>> ", err);

    return {
      EM: "Loi server !!!",
      EC: -2,
      DT: "",
    };
  }
};

const updateUser = async (rawUserData) => {
  try {
    let isEmailExitst = await checkIdExist(rawUserData.id);

    if (isEmailExitst !== true) {
      return {
        EM: "Tài khoản (id) không tồn tại !!!",
        EC: 1,
        DT: "",
      };
    }

    let updateUserData = await db.Staff.update(
      {
        name: rawUserData.name,
        phone: rawUserData.phone,
        gender: rawUserData.gender,
        role: rawUserData.role,
        email: rawUserData.email,
        image: rawUserData.image,
      },
      {
        where: {
          id: rawUserData.id,
        },
      }
    );

    return {
      EM: "Cập nhật tài khoản thành công",
      EC: 0,
      DT: updateUserData,
    };
  } catch (err) {
    console.log(">> loi", err);
    return {
      EM: "Loi server !!!",
      EC: -2,
      DT: "",
    };
  }
};

const deleteUser = async (id) => {
  try {
    let exitUser = await db.Staff.findByPk(id);
    if (!exitUser) {
      return {
        EM: "Tài khoản không tồn tại !!!",
        EC: -1,
        DT: "",
      };
    }

    await db.Staff.destroy({
      where: {
        id: id,
      },
    });

    return {
      EM: "Xóa tài khoản thành công",
      EC: 0,
      DT: [],
    };
  } catch (err) {
    console.log(">> loi", err);
    return {
      EM: "Loi server !!!",
      EC: -2,
      DT: "",
    };
  }
};

export default {
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
  getUserWithPagination,
};
