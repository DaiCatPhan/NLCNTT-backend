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
  const {
    name,
    priceAdult,
    priceChild,
    type,
    duration,
    desriptionHTML,
    desriptionTEXT,
    domain,
    vehicle,
    image,
  } = rawData;
  const checkTourExit = await checkTourName(name);
  if (checkTourExit) {
    return {
      EM: "Tour đã tồn tại !!!",
      EC: -1,
      DT: "",
    };
  }

  try {
    const data = await db.Tour.create({
      name: name,
      priceAdult: priceAdult,
      priceChild: priceChild,
      type: type,
      duration: duration,
      desriptionHTML: desriptionHTML,
      desriptionTEXT: desriptionTEXT,
      domain: domain,
      vehicle: vehicle,
      image: image,
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
  const { id, name, type, domain } = rawData;
  let dataTour = [];
  if (name && !id && !type && !domain) {
    dataTour = await db.Tour.findOne({
      where: {
        name: name,
      },
      raw: true,
    });
  } else if (id && !name && !type && !domain) {
    dataTour = await db.Tour.findOne({
      where: {
        id: id,
      },
      raw: true,
    });
  } else if (!name && type && !domain && !id) {
    dataTour = await db.Tour.findAll({
      where: {
        type: type,
      },
      raw: true,
    });
  } else if (!name && !type && domain && !id) {
    dataTour = await db.Tour.findAll({
      where: {
        domain: domain,
      },
      raw: true,
    });
  } else if (!name && !id && type && domain) {
    dataTour = await db.Tour.findAll({
      where: {
        type: type,
        domain: domain,
      },
      raw: true,
    });
  }

  if ((dataTour && dataTour.length > 0) || dataTour) {
    return {
      EM: "Lấy dữ liệu thành công",
      EC: 0,
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

const getAllTour = async () => {
  const data = await db.Tour.findAll({});
  return {
    EM: "Lấy tất cả Tour thành công",
    EC: 0,
    DT: data,
  };
};

const updateTour = async (rawData) => {
  const checkTourExit = await checkTourId(id);
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
        name: name,
        priceAdult: priceAdult,
        priceChild: priceChild,
        type: type,
        duration: duration,
        desriptionHTML: desriptionHTML,
        desriptionTEXT: desriptionTEXT,
        domain: domain,
        image: image,
        vehicle: vehicle,
      },
      {
        where: {
          id: id,
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
  const checkTourExitById = await checkTourId(id);
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
        id: id,
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
  getAllTour,
  deleteTour,
  updateTour,
};
