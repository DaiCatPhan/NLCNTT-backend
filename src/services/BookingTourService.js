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
      status: "0",
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

const getIDUser = async (Email) => {
  const data = await db.Customer.findOne({
    where: {
      email: Email,
    },
  });
  if (data) {
    return data.id;
  }
};

const readBooking = async (rawData) => {
  try {
    const { idCustomer, status, page = 1, limit = 5 } = rawData;
    let offset = (page - 1) * +limit;

    const id = await getIDUser(idCustomer);

    const { count, rows } = await db.BookingTour.findAndCountAll({
      where: {
        idCustomer: id,
        status: status,
      },
      include: [
        { model: db.Customer },
        { model: db.Calendar, include: { model: db.Tour } },
      ],
      order: [["updatedAt", "DESC"]],
      offset: +offset,
      limit: +limit,
    });

    let data = {
      totalRows: count,
      users: rows,
    };

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

const readAllBooking = async (rawData) => {
  try {
    const { status, page = 1, limit = 5 } = rawData;
    let offset = (page - 1) * +limit;

    const { count, rows } = await db.BookingTour.findAndCountAll({
      where: {
        status: status,
      },
      include: [
        { model: db.Customer },
        { model: db.Calendar, include: { model: db.Tour } },
      ],
      order: [["updatedAt", "DESC"]],
      offset: +offset,
      limit: +limit,
    });

    let data = {
      totalRows: count,
      users: rows,
    };

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

const updateBooking = async (rawData) => {
  const { idBookingTour, status } = rawData;
  try {
    const exit = await exitBookingTour(idBookingTour);
    if (!exit) {
      return {
        EM: "Không tìm thấy id bookingTour !!!",
        EC: -2,
        DT: [],
      };
    }

    const data = await db.BookingTour.update(
      { status: status },
      {
        where: {
          id: idBookingTour,
        },
      }
    );

    return {
      EM: "Cập nhật dữ liệu thành công",
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
    const isExitBooking = await exitBookingTour(idBookingTour);

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

const revenueTour = async (rawData) => {
  const { month } = rawData;
  try {
    let tourList = await db.Tour.findAll({});
    let booking = await db.BookingTour.findAll({
      include: [{ model: db.Calendar, include: { model: db.Tour } }],
    });

    let monthlyRevenue = Array.from(tourList, (tour) => ({
      idTour: tour.id,
      monthly: Array(12).fill(0), // Sử dụng mảng này để lưu doanh thu theo từng tháng
      total: 0, // Tổng doanh thu của tour
    }));

    tourList.map((tour) => {
      let index = monthlyRevenue.findIndex((item) => item.idTour === tour.id);

      if (index === -1) {
        monthlyRevenue.push({
          idTour: tour.id,
          monthly: Array(12).fill(0),
          total: 0,
        });
        index = monthlyRevenue.length - 1;
      }

      booking.map((bookingItem) => {
        if (tour.id === bookingItem.Calendar.Tour.id) {
          const monthIndex = new Date(bookingItem.createdAt).getMonth();
          const revenue = parseFloat(bookingItem.money);

          monthlyRevenue[index].monthly[monthIndex] += revenue;
          monthlyRevenue[index].total += revenue;
        }
      });
    });

    // Lấy doanh thu của từng tour trong tháng 1
    const revenuePerTourMonth = monthlyRevenue.map((tour) => ({
      idTour: tour.idTour,
      revenueMonth1: tour.monthly[`${month}`],
    }));

    console.log(
      "Doanh thu của từng tour trong tháng " + month + ":",
      revenuePerTourMonth
    );

    return {
      EM: "Lấy dữ liệu thành công",
      EC: 0,
      DT: revenuePerTourMonth,
    };
  } catch (error) {
    console.error("Lỗi:", error);
    return {
      EM: "Lấy dữ liệu thất bại",
      EC: 1,
      DT: null,
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
  readAllBooking,
  updateBooking,
  revenueTour,
};
