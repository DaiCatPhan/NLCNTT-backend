import db from "../app/models";

const countBookingTourByIdCalendar = async (idCalendar) => {
  try {
    const count = await db.BookingTour.count({
      where: {
        idCalendar: idCalendar,
      },
    });
    return count;
  } catch (error) {
    console.log("error", error);
    return 0;
  }
};

const remainingSeats = async (idCalendar) => {
  let countBookingByCalendar = await countBookingTourByIdCalendar(idCalendar);

  const calendarDetail = await db.Calendar.findOne({
    where: {
      id: idCalendar,
    },
    raw: true,
  });

  return (calendarDetail?.numberSeat || 0) - countBookingByCalendar;
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

const getCustomerByEmail = async (emailCus) => {
  const Customer = await db.Customer.findOne({
    where: {
      email: emailCus,
    },
    raw: true,
  });
  return Customer;
};

const prepareTheBill = async (a, b, priceA, priceB) => {
  return (
    Number(priceA.replace(/\./g, "")) * a +
    Number(priceB.replace(/\./g, "")) * b
  );
};

const createBooking = async (rawData) => {
  const { emailCus, idCalendar, idTour, numberTicketAdult, numberTicketChild } =
    rawData;

  try {
    let countConlai = await remainingSeats(idCalendar);

    if (numberTicketAdult + numberTicketChild > countConlai) {
      return {
        EM: "Hết chỗ !!!",
        EC: 2,
        DT: [],
      };
    }

    let tour = await getTourById(idTour);
    let customer = await getCustomerByEmail(emailCus);

    const bill = await prepareTheBill(
      numberTicketAdult,
      numberTicketChild,
      tour?.priceAdult,
      tour?.priceChild
    );

    const res = await db.BookingTour.create({
      idCustomer: customer?.id,
      idCalendar: idCalendar,
      numberTicketAdult: numberTicketAdult,
      numberTicketChild: numberTicketChild,
      money: bill.toLocaleString("vi-VN"),
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
  remainingSeats,
};
