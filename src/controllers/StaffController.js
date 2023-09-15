import db from "../app/models";
import bcrypt from "bcrypt";
import UserServices from "../services/UserService";

class Staff {
  // [DELETE] /api/v1/staff/deleteStaff/:id
  async deleteStaff(req, res, next) {
    try {
      const idStaff = req.params.idStaff;
      const exitStaff = await db.Staff.findByPk(idStaff);
      if (!exitStaff) {
        return res.status(200).json("Tài khoản không tồn tại");
      }
      const delUser = await db.Staff.destroy({
        where: {
          id: idStaff,
        },
      });

      if (delUser == 1) {
        return res
          .status(204)
          .json({ sta: "Success", mes: "Xóa tài khoản thành công " });
      } else {
        return res.json("Xóa tài khoản thất bại !!!");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
  // [PUT] /api/v1/staff/updateStaff/:id
  async updateStaff(req, res, next) {
    try {
      const idStaff = req.params.idStaff;
      const { name, phone, gender, role, email, password } = req.body;
      const exitStaff = await db.Staff.findByPk(idStaff);
      if (!exitStaff) {
        return res.status(200).json("Tài khoản không tồn tại");
      }
      const updateStaff = await db.Staff.update(
        {
          name: name,
          phone: phone,
          gender: gender,
          role: role,
          email: email,
          password: password,
        },
        {
          where: {
            id: idStaff,
          },
        }
      );
      if (!updateStaff) {
        return res.status(200).json({ mes: "Cập nhật thất bại !!!" });
      }

      return res.status(200).json({
        code: 2,
        sta: "Success",
        mes: "Cập nhật thành công",
        data: updateStaff,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  // [POST] /api/v1/staff/createStaff
  async createStaff(req, res, next) {
    try {
      const { name, phone, gender, role, email, password } = req.body;

      if (!name || !phone || !gender || !role || !email || !password) {
        return res.status(400).json({
          sta: "Bad request",
          mes: "insufficient data entry",
        });
      }

      // Kiểm tra tài khoản đã tồn tại hay chưa
      const isExit = await db.Staff.findOne({
        where: {
          email: email,
        },
      });

      if (isExit) {
        return res.status(200).json({ mes: "Account already exits" });
      }

      // Băm mật khẩu ra bcrypt
      const passWordHashed = await bcrypt.hash(password, 10);

      if (passWordHashed) {
        // Tạo tài khoản mới
        const Staff = await db.Staff.create({
          name: name,
          phone: phone,
          gender: gender,
          role: role,
          email: email,
          password: passWordHashed,
        });

        if (!Staff) {
          return res.status(200).json({ mes: "Account creation failed" });
        } else {
          return res.status(201).json({
            code: 201,
            sta: "Success",
            mes: "Account successfully created",
            data: Staff,
          });
        }
      } else {
        return res.status(400).json({ mes: "Hash pass fail !!" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }

  // [GET] /api/v1/staff/getStaff
  async getStaff(req, res, next) {
    res.json("getStaff");
  }

  // [GET] /api/v1/staff/getStaff
  async getListPaginationStaff(req, res, next) {
    // const { offset, limit } = req.query;
    const offset = Number(req.query.offset) || 0;
    const limit = Number(req.query.limit) || 10;
    try {
      const result = await UserServices.getUserPagination({ offset, limit });
      res.json(result);
    } catch (err) {
      res.status(500).json(err.message);
    }
  }

  // ===================== TEST==========================
  async readFunc(req, res) {
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

  async createFunc(req, res) {
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

  async updateFunc(req, res) {
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

  async deleteFunc(req, res) {
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

export default new Staff();
