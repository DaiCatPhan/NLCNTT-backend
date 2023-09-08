import db from "../app/models";

class Tour {
  getTour(req, res, next) {
    res.json("getTour");
  }

  upLoadTour(req, res, next) {
    res.json("upLoadTour");
  }

  deleteTour(req, res, next) {
    res.json("deleteTour");
  }

  // [POST] /api/v1/tour/createTour
  async createTour(req, res, next) {
    try {
      const {
        name,
        price,
        type,
        duration,
        content,
        description,
        domain,
        image,
      } = req.body;

      const tour = await db.Tour.create({
        name: name,
        price: price,
        type: type,
        duration: duration,
        content: content,
        description: description,
        domain: domain,
        image: image,
      });

      if (!tour) {
        return res.status(400).json({ mes: "Create du lieu that bai" });
      }

      return res.status(400).json({ mes: "Success", data: tour });
    } catch (err) {
      return res.status(500).json({ err: 5, mes: "Loi server" });
    }
  }

  // [GET]  /api/v1/tour/getTours
  async getTours(req, res, next) {
    try {
      const domain = req.query.domain;
      const type = req.query.type;
      var tours = [];
      if (!domain) {
        tours = await db.Tour.findAll({
          where: {
            type: type,
          },
        });
      } else {
        tours = await db.Tour.findAll({
          where: {
            domain: domain,
            type: type,
          },
        });
      }

      if (!tours) {
        return res.status(400).json({ err: 1, mes: "lay du lieu that bai" });
      }
      return res.status(200).json({ mes: "Success", data: tours });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ err: 5, mes: "Loi server" });
    }
  }
}

export default new Tour();
