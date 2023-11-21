import db from "../app/models";
import StatisticalService from "../services/StatisticalService";

class Statistical {
  // [GET] /api/v1/statistical/dashboard
  async read(req, res) {
    try {
      const data = await StatisticalService.dashboarch();
      return res.status(200).json({
        EM: data.EM,
        EC: data.EC,
        DT: data.DT,
      });
    } catch (error) {
      console.log("error", error);
    }
  }
}

export default new Statistical();
