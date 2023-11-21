import db from "../app/models";

const dashboarch = async () => {
  try {
    const tour = await db.Tour.count();
    const user = await db.Customer.count();
    const donHang = await db.BookingTour.count({
      where: {
        status: 0,
      },
    });

    const data = {
      tour,
      user,
      donHang,
    };

    return {
      EM: "Lấy dữ liệu thành công",
      EC: 0,
      DT: data,
    };
  } catch (error) {
    console.log("error");
    return {
      EM: "Loi server",
      EC: -5,
      DT: [],
    };
  }
};

export default {
  dashboarch,
};
