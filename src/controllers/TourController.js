import db from "../app/models";
import TourService from "../services/TourService";

class Tour {
  getTour(req, res, next) {
    res.json("getTour");
  }

  upDateTour(req, res, next) {
    res.json("upLoadTour");
  }

  deleteTour(req, res, next) {
    res.json("deleteTour");
  }

  // [POST] /api/v1/tour/createTour
  async createTour(req, res, next) {
    return res.json(req.body);

    try {
      const {
        name,
        price,
        type,
        duration,
        description,
        domain,
        image,
        vehicel,
      } = req.body;

      // Validate
      if (
        !name ||
        !price ||
        !type ||
        !duration ||
        !description ||
        !domain ||
        !image ||
        !vehicel
      ) {
        return res.status(200).json({
          EM: "Nhập thiếu trường dữ liệu !!!",
          EC: -2,
          DT: "",
        });
      }

      const reqDataNewTour = {
        name,
        price,
        type,
        duration,
        description,
        domain,
        image,
        vehicel,
      };

      const data = await TourService.createTour(reqDataNewTour);

      res.status(200).json({
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

  // [GET]  /api/v1/tour/getTours
  async getTours(req, res, next) {
    try {
      const domain = req.query.domain;
      const type = req.query.type;
      var tours = [];
      if (!domain) {
        tours = await db.Tour.findAll({
          where: {
            type: type,
          },
        });
      } else {
        tours = await db.Tour.findAll({
          where: {
            domain: domain,
            type: type,
          },
        });
      }

      if (!tours) {
        return res.status(400).json({ err: 1, mes: "lay du lieu that bai" });
      }
      return res.status(200).json({ mes: "Success", data: tours });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 5, mes: "Loi server" });
    }
  }
}

export default new Tour();
