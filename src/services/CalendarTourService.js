import db from "../app/models";

const isExitTour = async (idTour) => {
  const res = await db.Tour.findOne({
    where: {
      id: idTour,
    },
  });

  if (res) {
    return true;
  }

  return false;
};

const createCalender = async (rawData) => {
  try {
    const { idTour, numberSeat, startDay, endDay } = rawData;

    const exitTour = await isExitTour(idTour);
    if (!exitTour) {
      return {
        EM: "Tour không tồn tại !!! ",
        EC: -2,
        DT: [],
      };
    }

    const dataCalendar = await db.Calendar.create({
      idTour: idTour,
      numberSeat: numberSeat,
      startDay: startDay,
      endDay: endDay,
    });

    return {
      EM: "Tạo lịch thành công ",
      EC: 0,
      DT: dataCalendar,
    };
  } catch (error) {
    console.log(">> error", error);
    return {
      EM: "Loi server !!!",
      EC: -5,
      DT: [],
    };
  }
};

const readCalendar = async (rawData) => {
  try {
    const { idTour, numberSeat, startDay, endDay } = rawData;

    const exitTour = await isExitTour(idTour);
    if (!exitTour) {
      return {
        EM: "Tour không tồn tại !!! ",
        EC: -2,
        DT: [],
      };
    }

    const dataCalendar = await db.Calendar.create({
      idTour: idTour,
      numberSeat: numberSeat,
      startDay: startDay,
      endDay: endDay,
    });

    return {
      EM: "Tạo lịch thành công ",
      EC: 0,
      DT: dataCalendar,
    };
  } catch (error) {
    console.log(">> error", error);
    return {
      EM: "Loi server !!!",
      EC: -5,
      DT: [],
    };
  }
};

export default {
  createCalender,
};
