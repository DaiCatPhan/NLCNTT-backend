import db from "../app/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserService from "../services/UserService";

class Staff {
  // [GET] /api/v1/staff/read
  async readFunc(req, res) {
    try {
      if (req.query.page && req.query.limit) {
        let page = +req.query.page;
        let limit = +req.query.limit;

        let data = await UserService.getUserWithPagination({ page, limit });
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

  // [POST] /api/v1/staff/create
  async createFunc(req, res) {
    try {
      let inputData = req.body;

      let data = await UserService.createNewUser(inputData);
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

  // [PUT] /api/v1/staff/update
  async updateFunc(req, res) {
    try {
      let dataUpdateInput = req.body;

      let data = await UserService.updateUser(dataUpdateInput);
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

  // [DELETE] /api/v1/staff/delete
  async deleteFunc(req, res) {
    try {
      let idUser = req.body.id;

      let data = await UserService.deleteUser(idUser);
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (err) {
      console.log("err <<< ", err);
      return res.status(500).json({
        EM: "error server", // error message
        EC: "-3", // error code
        DT: "", // data
      });
    }
  }
}

export default new Staff();
