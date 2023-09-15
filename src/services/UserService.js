// import db from "../app/models";

// class UserServices {
//   async getUserPagination({ offset = 0, limit = 10 }) {
//     const result = await db.Staff.findAndCountAll({
//       offset: offset,
//       limit: limit,
//     });
//     return result;
//   }
// }

// export default new UserServices();

import db from "../app/models";

const getUserPagination = async ({ offset = 0, limit = 10 }) => {
  const result = await db.Staff.findAndCountAll({
    offset: offset,
    limit: limit,
  });
  return result;
};

const getAllUser = async (req, res) => {};

const createNewUser = async (req, res) => {};

const updateUser = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = {
  getUserPagination,
  getAllUser,
  createNewUser,
  updateUser,
  deleteUser,
};
