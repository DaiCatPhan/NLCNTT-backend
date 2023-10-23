import db from "../app/models";

const createBooking = async (rawData) => {
  const {
    idCustomer,

    idCalendar,
    numberTicketAdult,
    numberTicketChild,
    money,
  } = rawData;

  try {
    const res = await db.BookingTour.create({
      idCustomer: idCustomer,

      idCalendar: idCalendar,

      numberTicketAdult: numberTicketAdult,
      numberTicketChild: numberTicketChild,
      money: money,
    });

    if (res) {
      return {
        EM: "Đặt Tour thành công ",
        EC: 0,
        DT: res,
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

const readBooking = async (rawData) => {
  try {
    const { idCustomer } = rawData;
    const data = await db.BookingTour.findAll({
      where: {
        idCustomer: idCustomer,
      },
      include: [
        { model: db.Customer },
        { model: db.Calendar, include: { model: db.Tour } },
      ],
    });

    if (data) {
      return {
        EM: "Lấy dữ liệu thành công ",
        EC: 0,
        DT: data,
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

const readAllBooking = async (id) => {
  try {
  } catch (err) {
    console.log(">> loi", err);
    return {
      EM: "Loi server !!!",
      EC: -5,
      DT: data,
    };
  }
};

const updateBooking = async (rawData) => {
  try {
  } catch (err) {
    console.log(">> loi", err);
    return {
      EM: "Loi server !!!",
      EC: -5,
      DT: data,
    };
  }
};

const deleteBooking = async (id) => {
  try {
  } catch (err) {
    console.log(">> loi", err);
    return {
      EM: "Loi server !!!",
      EC: -5,
      DT: data,
    };
  }
};

export default {
  createBooking,
  readBooking,
};
