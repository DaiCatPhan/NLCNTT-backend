import db from "../app/models";
import CalendarTourService from "../services/CalendarTourService";

class CalendarTour {
  async create(req, res) {
    try {
      const { idTour, numberSeat, startDay, endDay, priceAdult, priceChild } =
        req.body;

      if (
        !idTour ||
        !numberSeat ||
        !startDay ||
        !endDay ||
        !priceAdult ||
        !priceChild
      ) {
        return res.status(200).json({
          EM: "Nhập thiếu trường dữ liệu !!!",
          EC: -2,
          DT: [],
        });
      }
      const data = await CalendarTourService.createCalender(req.body);

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

  async updateRegisteredSeats(req, res) {
    try {
      const { registeredSeats, idCalendar } = req.body;

      if (!registeredSeats || !idCalendar) {
        return res.status(200).json({
          EM: "Nhập thiếu dữ liệu registeredSeats or idCalendar !!!",
          EC: -2,
          DT: [],
        });
      }

      const data = await CalendarTourService.updateSeatsRes(req.body);

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

  async update(req, res) {
    return res.json(req.body);
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


  // [DELETE] /api/v1/calendar/delete
  async delete(req, res) {
    if (!req.body.idCalendar) {
      return res.status(200).json({
        EM: "Chưa có id Lịch để xóa",
        EC: -2,
        DT: [],
      });
    }
    try {
      const data = await CalendarTourService.delete_Calendar(req.body);

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

export default new CalendarTour();
