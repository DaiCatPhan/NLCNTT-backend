import db from "../app/models";

const createCalender = async (rawData) => {
  try {
    const { idTour, numberSeat, startDay, endDay } = rawData;
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
