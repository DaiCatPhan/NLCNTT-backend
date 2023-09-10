import db from "../app/models";

class UserServices {
  async getUserPagination({ offset = 0, limit = 10 }) {
    const result = await db.Staff.findAndCountAll({
      offset: offset,
      limit: limit,
    });
    return result;
  }
}

export default new UserServices();
