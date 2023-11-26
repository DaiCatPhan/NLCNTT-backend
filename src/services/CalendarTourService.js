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

const isExitCalendar = async (idCalendar) => {
  const res = await db.Calendar.findOne({
    where: {
      id: idCalendar,
    },
  });

  if (res) {
    return true;
  }

  return false;
};

const createCalender = async (rawData) => {
  try {
    const { idTour, numberSeat, startDay, endDay, priceAdult, priceChild } =
      rawData;

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
      priceAdult: priceAdult,
      priceChild: priceChild,
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

const getCalendarById = async (idCalendar) => {
  let CalendarDetail = await db.Calendar.findOne({
    where: {
      id: idCalendar,
    },
    raw: true,
  });
  return CalendarDetail;
};

const updateSeatsRes = async (rawData) => {
  try {
    const { registeredSeats, idCalendar } = rawData;

    const exitTour = await isExitCalendar(idCalendar);
    if (!exitTour) {
      return {
        EM: "IdCalendar không tồn tại !!! ",
        EC: -2,
        DT: [],
      };
    }

    // Lấy dữ liệu Calendar đó ra đẻ xử lí chỗ ngồi
    let DetailCalendar = await getCalendarById(idCalendar);

    if (+DetailCalendar?.registeredSeats + +registeredSeats > 50) {
      return {
        EM: "Hết chỗ !!!",
        EC: 2,
        DT: [],
      };
    }

    const dataCalendar = await db.Calendar.update(
      {
        registeredSeats: +DetailCalendar?.registeredSeats + +registeredSeats,
      },
      {
        where: {
          id: idCalendar,
        },
      }
    );

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

const delete_Calendar = async (rawData) => {
  try {
    const { idCalendar } = rawData;

    // Kiểm tra cái lịch đó đã có ai đăng ký chưa , nếu chưa thì mới cho xóa

    const exitsRegister_calendar = await db.BookingTour.findOne({
      where: {
        idCalendar: idCalendar,
      },
    });

    if (exitsRegister_calendar) {
      return {
        EM: "Lịch đã có người đăng ký không thể xóa được !!! ",
        EC: -2,
        DT: [],
      };
    }

    // Kiểm tra cái lịch đó có tồn tại hay không nửa

    const exitCalendar = await isExitCalendar(idCalendar);
    if (!exitCalendar) {
      return {
        EM: "Lịch không tồn tại !!! ",
        EC: -2,
        DT: [],
      };
    }

    // Xóa lịch

    const deleted = await db.Calendar.destroy({
      where: {
        id: idCalendar,
      },
    });

    return {
      EM: "Xóa lịch thành công ",
      EC: 0,
      DT: deleted,
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
  updateSeatsRes,
  delete_Calendar,
};
