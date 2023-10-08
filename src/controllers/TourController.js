import db from "../app/models";
import TourService from "../services/TourService";

class Tour {
  // [GET] /api/v1/tour/getTour
  async getTour(req, res, next) {
    try {
      const { name, type, domain } = req.query;

      if (!name && !type && !domain) {
        return res.status(200).json({
          EM: "Nhập thiếu trường dữ liệu !!!",
          EC: -2,
          DT: "",
        });
      }

      const data = await TourService.getTour({ name, type, domain });

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

  async upDateTour(req, res, next) {
    try {
      let { id, name, price, type, duration, description, domain, vehicel } =
        req.body;

      let imageUrl = req.file?.path;

      // Validate
      if (
        !id ||
        !name ||
        !price ||
        !type ||
        !duration ||
        !description ||
        !domain ||
        !vehicel
      ) {
        return res.status(200).json({
          EM: "Nhập thiếu trường dữ liệu !!!",
          EC: -2,
          DT: "",
        });
      }

      const reqDataUpdateTour = {
        id,
        name,
        price,
        type,
        duration,
        description,
        domain,
        vehicel,
        image: imageUrl,
      };

      const data = await TourService.updateTour(reqDataUpdateTour);
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

  // [DELETE] /api/v1/tour/deleteTour
  async deleteTour(req, res, next) {
    try {
      const id = +req.query.id;

      const data = await TourService.deleteTour({ id });

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

  // [POST] /api/v1/tour/createTour
  async createTour(req, res, next) {
    try {
      let {
        name,
        priceAdult,
        priceChild,
        type,
        duration,
        desriptionHTML,
        desriptionTEXT,
        domain,
        vehicle,
      } = req.body;

      let imageRaw = req.file;
      let imageUrl = req.file?.path;

      console.log(req.body);
      console.log(imageUrl);

      // Validate
      if (
        !name ||
        !priceAdult ||
        !priceChild ||
        !type ||
        !duration ||
        !desriptionHTML ||
        !desriptionTEXT ||
        !domain ||
        !vehicle ||
        !imageUrl
      ) {
        return res.status(200).json({
          EM: "Nhập thiếu trường dữ liệu !!!",
          EC: -2,
          DT: "",
        });
      }

      const reqDataNewTour = {
        name,
        priceAdult,
        priceChild,
        type,
        duration,
        desriptionHTML,
        desriptionTEXT,
        domain,
        vehicle,
        image: imageUrl,
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
