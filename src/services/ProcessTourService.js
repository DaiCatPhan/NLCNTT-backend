import db from "../app/models";

const checkProcessTour = async (idTour) => {
  const isExitsProcessTour = await db.ProcessTour.findOne({
    where: {
      idTour: idTour,
    },
  });

  if (isExitsProcessTour) {
    return true;
  }

  return false;
};

const createProcessTour = async (rawData) => {
  try {
    const { idTour, name, descriptionHTML, descriptionTEXT } = rawData;

    const isExitsProcessTour = await checkProcessTour(+idTour);

    if (isExitsProcessTour) {
      return {
        EM: "Chương Trình Tour đã tồn tại !!! . Không tạo mới được !!!!",
        EC: -1,
        DT: [],
      };
    }

    const createProcess = await db.ProcessTour.create({
      idTour: +idTour,
      name: name,
      descriptionHTML: descriptionHTML,
      descriptionTEXT,
      descriptionTEXT,
    });

    if (createProcess) {
      return {
        EM: "Tạo chương trình Tour thành công",
        EC: 0,
        DT: createProcess,
      };
    }
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: "Loi server !!!",
      EC: -5,
      DT: [],
    };
  }
};

const readProcessTour = async (rawData) => {
  try {
    const { idTour } = rawData;

    const isExitsProcessTour = await checkProcessTour(+idTour);

    if (!isExitsProcessTour) {
      return {
        EM: "Chương Trình Tour không tồn tại !!!  ",
        EC: -1,
        DT: [],
      };
    }

    const createProcess = await db.ProcessTour.findOne({
      where: {
        idTour: +idTour,
      },
      include: {
        model: db.Tour,
        attributes: ["image"],
      },
    });

    if (createProcess) {
      return {
        EM: "Đọc chương trình Tour thành công",
        EC: 0,
        DT: createProcess,
      };
    }
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: "Loi server !!!",
      EC: -5,
      DT: [],
    };
  }
};

const updateProcessTour = async (rawData) => {
  try {
    const { idTour, name, descriptionHTML, descriptionTEXT } = rawData;

    const isExitsProcessTour = await checkProcessTour(+idTour);

    if (!isExitsProcessTour) {
      return {
        EM: "Chương Trình Tour không tồn tại !!!  ",
        EC: -1,
        DT: [],
      };
    }

    const updateProcess = await db.ProcessTour.update(
      {
        name: name,
        descriptionHTML: descriptionHTML,
        descriptionTEXT,
        descriptionTEXT,
      },
      {
        where: {
          idTour: +idTour,
        },
      }
    );

    if (updateProcess) {
      return {
        EM: "Cập nhật chương trình Tour thành công",
        EC: 0,
        DT: updateProcess,
      };
    }
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: "Loi server !!!",
      EC: 0,
      DT: [],
    };
  }
};

const deleteProcessTour = async (rawData) => {
  try {
    const { idTour } = rawData;

    const isExitsProcessTour = await checkProcessTour(+idTour);

    if (!isExitsProcessTour) {
      return {
        EM: "Chương Trình Tour Không tồn tại !!!  ",
        EC: -1,
        DT: [],
      };
    }

    const deleteProcess = await db.ProcessTour.destroy({
      where: {
        idTour: +idTour,
      },
    });

    if (deleteProcess) {
      return {
        EM: "Xóa chương trình Tour thành công",
        EC: 0,
        DT: deleteProcess,
      };
    }
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: "Loi server !!!",
      EC: -5,
      DT: [],
    };
  }
};

const getProcessTourWithPagination = async ({ page = 1, limit = 3 }) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.Tour.findAndCountAll({
      include: {
        model: db.ProcessTour,
      },
      offset: offset,
      limit: limit,
    });

    let data = {
      totalRows: count,
      processTours: rows,
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

export default {
  createProcessTour,
  readProcessTour,
  updateProcessTour,
  deleteProcessTour,
  getProcessTourWithPagination,
};
