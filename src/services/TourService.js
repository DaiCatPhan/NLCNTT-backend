import db from "../app/models";

const checkTourName = async (nameTour) => {
  let tourExit = null;
  tourExit = await db.Tour.findOne({
    where: {
      name: nameTour,
    },
    raw: true,
  });

  if (tourExit === null) {
    return false;
  }
  return true;
};

const checkTourId = async (idTour) => {
  let tourExit = null;
  tourExit = await db.Tour.findOne({
    where: {
      id: idTour,
    },
    raw: true,
  });

  if (tourExit === null) {
    return false;
  }
  return true;
};

const createTour = async (rawData) => {
  const checkTourExit = await checkTourName(rawData.name);
  if (checkTourExit) {
    return {
      EM: "Tour đã tồn tại !!!",
      EC: -1,
      DT: "",
    };
  }

  try {
    const data = await db.Tour.create({
      name: rawData.name,
      price: rawData.price,
      type: rawData.type,
      duration: rawData.duration,
      description: rawData.description,
      domain: rawData.domain,
      image: rawData.image,
      vehicel: rawData.vehicel,
    });

    if (data) {
      return {
        EM: "Tạo Tour thành công ",
        EC: 0,
        DT: data,
      };
    } else {
      return {
        EM: "Tạo Tour thất bại ",
        EC: -1,
        DT: data,
      };
    }
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: "Loi server !!!",
      EC: -2,
      DT: "",
    };
  }
};

const getTour = async (rawData) => {
  let dataTour = [];
  if (rawData.name && !rawData.type && !rawData.domain) {
    dataTour = await db.Tour.findOne({
      where: {
        name: rawData.name,
      },
      raw: true,
    });
  } else if (!rawData.name && rawData.type && !rawData.domain) {
    dataTour = await db.Tour.findAll({
      where: {
        type: rawData.type,
      },
      raw: true,
    });
  } else if (!rawData.name && !rawData.type && rawData.domain) {
    dataTour = await db.Tour.findAll({
      where: {
        domain: rawData.domain,
      },
      raw: true,
    });
  } else if (!rawData.name && rawData.type && rawData.domain) {
    dataTour = await db.Tour.findAll({
      where: {
        type: rawData.type,
        domain: rawData.domain,
      },
      raw: true,
    });
  }

  if (dataTour && dataTour.length > 0) {
    return {
      EM: "Lấy dữ liệu thành công",
      EC: 1,
      DT: dataTour,
    };
  } else {
    return {
      EM: "Dữ liệu rỗng",
      EC: 2,
      DT: dataTour,
    };
  }
};

const updateTour = async (rawData) => {
  const checkTourExit = await checkTourId(rawData.id);
  if (!checkTourExit) {
    return {
      EM: "Tour không  tồn tại !!!",
      EC: -1,
      DT: "",
    };
  }

  try {
    const updateUserData = await db.Tour.update(
      {
        name: rawData.name,
        price: rawData.price,
        type: rawData.type,
        duration: rawData.phone,
        description: rawData.gender,
        domain: rawData.role,
        vehicel: rawData.email,
        image: rawData.image,
      },
      {
        where: {
          id: rawData.id,
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

const deleteTour = async (rawData) => {
  const checkTourExitById = await checkTourId(rawData.id);
  if (!checkTourExitById) {
    return {
      EM: "Tour không tồn tại !!!",
      EC: -1,
      DT: "",
    };
  }

  try {
    const data = await db.Tour.destroy({
      where: {
        id: rawData.id,
      },
    });

    if (data === 1) {
      return {
        EM: "Xóa Tour thành công ",
        EC: 0,
        DT: data,
      };
    } else {
      return {
        EM: "Xóa Tour thất bại ",
        EC: -1,
        DT: data,
      };
    }
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: "Loi server !!!",
      EC: -2,
      DT: "",
    };
  }
};

export default {
  createTour,
  getTour,
  deleteTour,
  updateTour,
};
