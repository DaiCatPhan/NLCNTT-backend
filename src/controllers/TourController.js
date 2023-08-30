
import db from "../app/models";

class Tour {
   
  getTour(req , res , next) {
    res.json('getTour');
  }

  upLoadTour(req , res , next) {
    res.json('upLoadTour');
  }

  deleteTour(req , res , next) {
    res.json('deleteTour');
  }

  // [GET]  /tour/getToursDomestic
  async getToursDomestic(req , res , next) {
    try{
      const ToursDomestic = await db.Tour.findAll({
        where: {
          typeTour : 'tour nội địa',
        }
      });
      if(!ToursDomestic){
        return res.json({err: 1 , mes: 'Lấy dữ liệu thất bại'})
      }
      return res.status(200).json({err: 2 , mes: ToursDomestic})
    }catch(err){
      console.log(err);
      return res.status(500).json({ err: 5, mes: "Loi server" });
    }
  }

  getToursForeign (req , res , next) {

  }
}

export default new Tour();
