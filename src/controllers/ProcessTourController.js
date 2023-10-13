import ProcessTourService from "../services/ProcessTourService";

class ProcessTour {
  // [POST] /api/v1/processTour/create
  async create(req, res) {
    const { idTour, name, descriptionHTML, descriptionTEXT } = req.body;
    if (!idTour || !name || !descriptionHTML || !descriptionTEXT) {
      return res.status(200).json({
        EM: "Nhập thiếu trường dữ liệu !!!",
        EC: -2,
        DT: [],
      });
    }

    const data = await ProcessTourService.createProcessTour({
      idTour,
      name,
      descriptionHTML,
      descriptionTEXT,
    });

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

  // [GET] /api/v1/processTour/read
  async read(req, res) {
    try {
      const { idTour } = req.body;
      if (!idTour) {
        return res.status(200).json({
          EM: "Nhập thiếu trường dữ liệu !!!",
          EC: -2,
          DT: [],
        });
      }

      const data = await ProcessTourService.readProcessTour({ idTour });

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

  // [GET] /api/v1/processTour/update
  async update(req, res) {
    const { idTour, name, descriptionHTML, descriptionTEXT } = req.body;

    try {
      const data = await ProcessTourService.updateProcessTour({
        idTour,
        name,
        descriptionHTML,
        descriptionTEXT,
      });
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

  // [GET] /api/v1/processTour/delete
  async delete(req, res) {
    const { idTour } = req.body;

    if (!idTour) {
      return res.status(200).json({
        EM: "Nhập thiếu trường dữ liệu !!!",
        EC: -2,
        DT: [],
      });
    }
    if (!idTour) {
      return res.status(200).json({
        EM: "Nhập thiếu trường dữ liệu !!!",
        EC: -2,
        DT: [],
      });
    }
    try {
      const data = await ProcessTourService.deleteProcessTour({ idTour });
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

  // [GET] /api/v1/processTour/getPanigation
  async getProcessTourPanigation(req, res, next) {
    try {
      if (req.query.page && req.query.limit) {
        let page = +req.query.page;
        let limit = +req.query.limit;

        let data = await ProcessTourService.getProcessTourWithPagination({
          page,
          limit,
        });
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
}

export default new ProcessTour();
