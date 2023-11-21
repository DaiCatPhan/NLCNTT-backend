import db from "../app/models";

const checkEmailExist = async (userEmail) => {
  let user = null;

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
  return true;
};

const getInfoUserById = async (userEmail) => {
  const user = await db.Customer.findOne({
    where: {
      email: userEmail,
    },
    attributes: { exclude: ["password", "createdAt", "updatedAt", "role"] },
  });

  return user;
};

const getCustomerWithPagination = async ({ page = 1, limit = 5 }) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.Customer.findAndCountAll({
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

const findOrCreate = async (rawData) => {
  try {
    const [user, created] = await db.Customer.findOrCreate({
      where: { email: rawData.email },
      defaults: {
        email: rawData.email,
        name: rawData.name,
        phone: rawData.phone,
        address: rawData.address,
        role: "khachhang",
      },
    });

    if (created) {
      return {
        EM: "Tạo người dùng thành công",
        EC: 0,
        DT: user,
      };
    } else {
      const updateCus = await db.Customer.update(
        {
          name: rawData.name,
          phone: rawData.phone,
          address: rawData.address,
        },
        {
          where: {
            email: rawData.email,
          },
        }
      );

      const InfoCusUpdated = await getInfoUserById(rawData.email);

      return {
        EM: "Update người dùng thành công",
        EC: 1,
        DT: { updateCus, InfoCusUpdated },
      };
    }
  } catch (err) {
    console.log(">> loi", err);
    return {
      EM: "Loi server !!!",
      EC: -5,
      DT: [],
    };
  }
};

const getCustomerOnlyByEmail = async (email) => {
  try {
    let users = await db.Customer.findOne({
      where: {
        email: email,
      },
      attributes: ["id", "phone", "address", "email", "name", "gender"],

      include: [
        {
          model: db.BookingTour,
          include: [
            {
              model: db.Calendar,
              attributes: { exclude: ["updatedAt", "updatedAt", "createdAt"] },
              include: [
                {
                  model: db.Tour,
                  attributes: [
                    "name",
                    "type",
                    "duration",
                    "domain",
                    "image",
                    "vehicle",
                  ],
                },
              ],
            },
          ],
        },
      ],
    });
    if (users) {
      let data = users;
      return {
        EM: "Lấy dữ liệu thành công",
        EC: 0,
        DT: data,
      };
    } else {
      return {
        EM: " Người dùng không tồn tại ",
        EC: -2,
        DT: "",
      };
    }
  } catch (err) {
    console.log(">> loi", err);
    return {
      EM: "Loi server !!!",
      EC: -5,
      DT: [],
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

const updateUser = async (rawUserData, imageUrl) => {
  try {
    let isIdExitst = await checkIdExist(rawUserData.id);

    if (isIdExitst !== true) {
      return {
        EM: "Tài khoản (id) không tồn tại !!!",
        EC: 1,
        DT: "",
      };
    }

    const objectUpdate = {};

    imageUrl && (objectUpdate.image = imageUrl);
    console.log(">> objectUpdate", objectUpdate);

    let updateUserData = await db.Staff.update(
      {
        name: rawUserData.name,
        phone: rawUserData.phone,
        gender: rawUserData.gender,
        role: rawUserData.role,
        email: rawUserData.email,
        ...objectUpdate,
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
  getCustomerWithPagination,
  findOrCreate,
  getCustomerOnlyByEmail,
};
