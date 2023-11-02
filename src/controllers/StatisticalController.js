import db from "../app/models";

class Statistical {
  async read(req, res) {
    return res.json("read Statistical");
  }
}

export default new Statistical();
