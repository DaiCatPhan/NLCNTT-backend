import db from "../app/models";

const checkProcessTour = async (idTour, idProcessTour) => {
  const isExitsProcessTour = await db.ProcessTour.findOne({
    where: {
      idTour: idTour,
      id: idProcessTour,
    },
  });

  if (isExitsProcessTour) {
    return true;
  }

  return false;
};

const isExitTour = async (idTour) => {
  const isExitsTour = await db.Tour.findOne({
    where: {
      id: idTour,
    },
  });

  if (isExitsTour) {
    return true;
  }

  return false;
};

const createProcessTour = async (rawData) => {
  try {
    const { idTour, nameProcessTour, descriptionHTML, descriptionTEXT } =
      rawData;

    const exitsTour = await db.Tour.findOne({
      where: {
        id: idTour,
      },
    });

    const exitsPro = await db.ProcessTour.findOne({
      where: {
        idTour: idTour,
      },
    });

    if (!exitsTour) {
      return {
        EM: "Tour không tồn tại !!!",
        EC: -2,
        DT: [],
      };
    }

    if (exitsPro) {
      return {
        EM: "Chương trình Tour đã tồn tại !!! , Không thể tạo mới",
        EC: -2,
        DT: [],
      };
    }

    const createProcess = await db.ProcessTour.create({
      idTour: +idTour,
      name: nameProcessTour,
      descriptionHTML: descriptionHTML,
      descriptionTEXT: descriptionTEXT,
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

    const exitsTour = await isExitTour(+idTour);

    if (!exitsTour) {
      return {
        EM: " Tour không tồn tại !!!  ",
        EC: -1,
        DT: [],
      };
    }

    const processTour = await db.Tour.findOne({
      where: {
        id: +idTour,
      },
      include: {
        model: db.ProcessTour,
      },
    });

    if (processTour) {
      return {
        EM: "Đọc chương trình Tour thành công",
        EC: 0,
        DT: processTour,
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
    const {
      idTour,
      idProcessTour,
      nameProcessTour,
      descriptionHTML,
      descriptionTEXT,
    } = rawData;

    const isExitsProcessTour = await checkProcessTour(+idTour, +idProcessTour);
    if (!isExitsProcessTour) {
      return {
        EM: "Chương Trình Tour không tồn tại !!!  ",
        EC: -1,
        DT: [],
      };
    }

    const updateProcess = await db.ProcessTour.update(
      {
        name: nameProcessTour,
        descriptionHTML: descriptionHTML,
        descriptionTEXT: descriptionTEXT,
      },
      {
        where: {
          id: +idProcessTour,
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
    const { idTour, idProcessTour } = rawData;

    const isExitsProcessTour = await checkProcessTour(+idTour, +idProcessTour);

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
        id: +idProcessTour,
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
