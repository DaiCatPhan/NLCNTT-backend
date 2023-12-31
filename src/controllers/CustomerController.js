import db from "../app/models";

import CustomerService from "../services/CustomerService";

class Customer {
  // [POST] /api/v1/customer/findOrCreate

  async findOrCreate(req, res) {
    try {
      const { email, name, phone, address } = req.body;

      // check điều kiện :
      if (!name || !email || !phone || !address) {
        return {
          EM: "Nhập thiếu dữ liệu",
          EC: -2,
          DT: "",
        };
      }

      let data = await CustomerService.findOrCreate(req.body);
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
  // [GET] /api/v1/customer/readPanigation

  async readPanigation(req, res) {
    try {
      let page = +req.query.page;
      let limit = +req.query.limit;

      let data = await CustomerService.getCustomerWithPagination(req.query);
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

  // [POST] /api/v1/customer/create

  async create(req, res) {
    try {
      return res.json(req.body);
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

      let data = await CustomerService.createNewCustomer(inputData);
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

  // [POST] /api/v1/customer/delete

  async delete(req, res) {
    return res.json("delete");
    try {
      let idCustomer = req.body.id;

      let data = await CustomerService.deleteCustomer(idCustomer);
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

  // [PUT] /api/v1/customer/update

  async update(req, res) {
    return res.json("update");
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

      let data = await CustomerService.updateCustomer(
        dataUpdateInput,
        imageUrl
      );
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

  // [GET] /api/v1/customer/readUserById

  async readUserByEmail(req, res) {
    let emailCustomer = req.query.email;

    try {
      let data = await CustomerService.getCustomerOnlyByEmail(emailCustomer);
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

  // [GET] /api/v1/customer/readAll

  async readAll(req, res) {
    return res.json("readAll");
    try {
      let idCustomer = +req.query.id;

      let data = await CustomerService.getCustomerOnlyById(idCustomer);
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

export default new Customer();
