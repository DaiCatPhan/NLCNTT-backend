import db from "../app/models";
import TourService from "../services/TourService";

class Tour {
  // [GET]  /api/v1/tour/getAllTour
  async getAllTour(req, res, next) {
    try {
      const data = await TourService.getAllTour();
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

  // [GET] /api/v1/tour/getTourById
  async getTourById(req, res, next) {
    try {
      const { id } = req.query;

      if (!id) {
        return res.status(200).json({
          EM: "Nhập thiếu trường dữ liệu !!!",
          EC: -2,
          DT: "",
        });
      }

      const data = await TourService.getTourById({ id });

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

  // [GET] /api/v1/tour/getTourPanigation
  async getTourPanigation(req, res, next) {
    try {
      if (req.query.page && req.query.limit) {
        let page = +req.query.page;
        let limit = +req.query.limit;

        let data = await TourService.getTourWithPagination({ page, limit });
        return res.status(200).json({
          EM: data.EM,
          EC: data.EC,
          DT: data.DT,
        });
      }
    } catch (err) {
      console.log("err <<< ", err);
      return res.status(500).json({
        EM: "error server", // error message
        EC: "-1", // error code
        DT: "", // data
      });
    }
  }

  // [GET] /api/v1/tour/getTour
  async getTour(req, res, next) {
    try {
      const { id, name, type, domain } = req.query;

      if (!id && !name && !type && !domain) {
        return res.status(200).json({
          EM: "Nhập thiếu trường dữ liệu !!!",
          EC: -2,
          DT: "",
        });
      }

      const data = await TourService.getTour({ id, name, type, domain });

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

  // [PUT] /api/v1/tour/updateTour
  async upDateTour(req, res, next) {
    try {
      let {
        id,
        name,
        priceAdult,
        priceChild,
        type,
        duration,
        descriptionHTML,
        descriptionTEXT,
        domain,
        vehicle,
      } = req.body;

      let image = req?.file;

      let imageUrl = image?.path;

      if (
        !id ||
        !name ||
        !priceAdult ||
        !priceChild ||
        !type ||
        !duration ||
        !descriptionHTML ||
        !descriptionTEXT ||
        !domain ||
        !vehicle
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
        priceAdult,
        priceChild,
        type,
        duration,
        descriptionHTML,
        descriptionTEXT,
        domain,
        image: imageUrl,
        vehicle,
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
}

export default new Tour();
