import db from "../app/models";
import BookingTourService from "../services/BookingTourService";

class BookingTour {
  async create(req, res) {
    const { emailCus, idCalendar, numberTicketAdult, numberTicketChild } =
      req.body;
    if ((!emailCus || !idCalendar, !numberTicketAdult && !numberTicketChild)) {
      return res.status(200).json({
        EM: "Nhập thiếu trường dữ liệu !!!",
        EC: -2,
        DT: [],
      });
    }

    const data = await BookingTourService.createBooking(req.body);

    try {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (err) {
      console.log("err <<< ", err);
      return res.status(500).json({
        EM: "error server", // error message
        EC: "-1", // error code
        DT: "", // data
      });
    }
  }

  async read(req, res) {
    const { idCustomer, status } = req.query;
    if (!idCustomer || !status) {
      return res.status(200).json({
        EM: "Thiếu dữ liệu !!!",
        EC: -2,
        DT: [],
      });
    }

    try {
      const data = await BookingTourService.readBooking(req.query);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (err) {
      console.log("err <<< ", err);
      return res.status(500).json({
        EM: "error server", // error message
        EC: "-1", // error code
        DT: "", // data
      });
    }
  }

  async readAll(req, res) {
    const { status } = req.query;
    if (!status) {
      return res.status(200).json({
        EM: "Thiếu dữ liệu !!!",
        EC: -2,
        DT: [],
      });
    }

    try {
      const data = await BookingTourService.readAllBooking(req.query);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (err) {
      console.log("err <<< ", err);
      return res.status(500).json({
        EM: "error server",
        EC: "-5",
        DT: "",
      });
    }
  }

  async update(req, res) {
    const { idBookingTour, status } = req.body;
    if (!idBookingTour || !status) {
      return res.status(200).json({
        EM: "Nhập thiếu dữ liệu",
        EC: -2,
        DT: [],
      });
    }
    try {
      const data = await BookingTourService.updateBooking(req.body);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (err) {
      console.log("err <<< ", err);
      return res.status(500).json({
        EM: "error server", // error message
        EC: "-1", // error code
        DT: "", // data
      });
    }
  }

  async delete(req, res) {
    const { idBookingTour, idCustomer } = req.body;

    if (!idBookingTour || !idCustomer) {
      return {
        EM: "Nhập thiếu dữ liệu !!!!",
        EC: -2,
        DT: [],
      };
    }

    const data = await BookingTourService.deleteBooking(req.body);

    try {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (err) {
      console.log("err <<< ", err);
      return res.status(500).json({
        EM: "error server", // error message
        EC: "-1", // error code
        DT: "", // data
      });
    }
  }

  async revenue(req, res) {
    const { month } = req.query;
    const data = await BookingTourService.revenueTour(req.query);

    try {
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (err) {
      console.log("err <<< ", err);
      return res.status(500).json({
        EM: "error server", // error message
        EC: "-1", // error code
        DT: "", // data
      });
    }
  }
}

export default new BookingTour();
