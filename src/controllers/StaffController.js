import db from "../app/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import StaffService from "../services/StaffService";

class Staff {
  // [GET] /api/v1/staff/read

  async readFunc(req, res) {
    try {
      if (req.query.page && req.query.limit) {
        let page = +req.query.page;
        let limit = +req.query.limit;

        let data = await StaffService.getUserWithPagination({ page, limit });
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

      // check điều kiện :
      if (
        !inputData.name ||
        !inputData.gender ||
        !inputData.role ||
        !inputData.email ||
        !inputData.password ||
        !inputData.phone
      ) {
        return {
          EM: "Nhập thiếu dữ liệu",
          EC: -2,
          DT: "",
        };
      }

      let data = await StaffService.createNewUser(inputData);
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
      let image = req.file;

      let imageUrl = image?.path;

      if (
        !dataUpdateInput.id ||
        !dataUpdateInput.name ||
        !dataUpdateInput.phone ||
        !dataUpdateInput.gender ||
        !dataUpdateInput.role ||
        !dataUpdateInput.email
      ) {
        return res.status(200).json({
          EM: "Nhập thiếu dữ liệu !!!",
          EC: "-1",
          DT: "",
        });
      }

      let data = await StaffService.updateUser(dataUpdateInput, imageUrl);
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

      let data = await StaffService.deleteUser(idUser);
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

  // [GET] /api/v1/staff/getUserOnly
  
  async getStaffOnly(req, res) {
    try {
      let idUser = +req.query.id;

      let data = await StaffService.getUserOnlyById(idUser);
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
