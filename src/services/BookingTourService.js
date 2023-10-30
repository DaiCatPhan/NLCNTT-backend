import db from "../app/models";
const Sequelize = require("sequelize");

const countBookingTourByIdCalendar = async (idCalendar) => {
  try {
    let calendars = await db.BookingTour.findAll({
      where: {
        idCalendar: idCalendar,
      },
      raw: true,
    });
    const conutTicket = calendars.reduce((total, calendar) => {
      return total + +calendar.numberTicketAdult + +calendar.numberTicketChild;
    }, 0);

    return +conutTicket;
  } catch (error) {
    console.log("error", error);
    return 0;
  }
};

const remainingSeats = async (idCalendar) => {
  let countBookingByCalendar = await countBookingTourByIdCalendar(idCalendar);

  let calendarDetail = await db.Calendar.findOne({
    where: {
      id: idCalendar,
    },
  });

  return (+calendarDetail?.numberSeat || 0) - countBookingByCalendar || 0;
};

const getTourById = async (idTour) => {
  const Tour = await db.Tour.findOne({
    where: {
      id: idTour,
    },
    raw: true,
  });
  return Tour;
};

const getCalendarById = async (idCalendar) => {
  const Calendar = await db.Calendar.findOne({
    where: {
      id: idCalendar,
    },
    raw: true,
  });
  return Calendar;
};

const getCustomerByEmail = async (emailCus) => {
  const result = await db.Customer.findOne({
    where: {
      email: emailCus,
    },
    attributes: { exclude: ["password", "createdAt", "updatedAt", "role"] },
    raw: true,
  });
  return result;
};

const prepareTheBill = async (a, b, priceA, priceB) => {
  return (
    Number(priceA.replace(/\./g, "")) * a +
    Number(priceB.replace(/\./g, "")) * b
  );
};

const createBooking = async (rawData) => {
  const { emailCus, idCalendar, numberTicketAdult, numberTicketChild } =
    rawData;

  try {
    let countConlai = await remainingSeats(idCalendar);
    let tongVeDat = +numberTicketAdult + +numberTicketChild;

    if (+tongVeDat > +countConlai) {
      return {
        EM: "Hết chỗ !!!",
        EC: 2,
        DT: [],
      };
    }

    let calendar = await getCalendarById(idCalendar);
    let customer = await getCustomerByEmail(emailCus);

    if (!calendar || !customer) {
      return {
        EM: "calendar or customer không tồn tại",
        EC: -2,
        DT: [],
      };
    }

    const bill = await prepareTheBill(
      numberTicketAdult,
      numberTicketChild,
      calendar?.priceAdult,
      calendar?.priceChild
    );

    const res = await db.BookingTour.create({
      idCustomer: customer?.id,
      idCalendar: idCalendar,
      numberTicketAdult: numberTicketAdult,
      numberTicketChild: numberTicketChild,
      money: bill,
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
      DT: [],
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
      DT: [],
    };
  }
};

const exitBookingTour = async (id) => {
  let isExits = await db.BookingTour.findOne({
    where: {
      id: id,
    },
  });

  if (isExits) {
    return true;
  } else {
    return false;
  }
};

const deleteBooking = async (rawData) => {
  const { idBookingTour, idCustomer } = rawData;
  try {
    const isExitBooking =await exitBookingTour(idBookingTour);

    if (!isExitBooking) {
      return {
        EM: "Lịch đã đặt không tồn tại",
        EC: -1,
        DT: [],
      };
    }

    console.log("isExitBooking", isExitBooking);

    const data = await db.BookingTour.destroy({
      where: {
        id: +idBookingTour,
        idCustomer: +idCustomer,
      },
    });

    return {
      EM: "Xóa lịch trình thành công",
      EC: 0,
      DT: data,
    };
  } catch (err) {
    console.log(">> loi", err);
    return {
      EM: "Loi server !!!",
      EC: -5,
      DT: [],
    };
  }
};

export default {
  createBooking,
  readBooking,
  remainingSeats,
  countBookingTourByIdCalendar,
  remainingSeats,
  deleteBooking,
};
