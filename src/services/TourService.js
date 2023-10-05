import db from "../app/models";

const checkTourName = async (nameTour) => {
  let tourExit = null;
  tourExit = await db.Tour.findOne({ 
    where: {
      name: nameTour,
    },
    raw: true,
  });

  if (tourExit === null) {
    return false;
  }
  return true;
};

const createTour = async (rawData) => {
  console.log(">>> check", rawData);
  const checkTourExit = await checkTourName(rawData.name);
  if (checkTourExit) {
    return {
      EM: "Tour đã tồn tại !!!",
      EC: -1,
      DT: "",
    };
  }

  try {
    const data = await db.Tour.create({
      name: rawData.name,
      price: rawData.price,
      type: rawData.type,
      duration: rawData.duration,
      description: rawData.description,
      domain: rawData.domain,
      image: rawData.image,
      vehicel: rawData.vehicel,
    });

    if (data) {
      return {
        EM: "Tạo Tour thành công ",
        EC: 0,
        DT: data,
      };
    } else {
      return {
        EM: "Tạo Tour thất bại ",
        EC: -1,
        DT: data,
      };
    }
  } catch (error) {
    console.log(">>> error", error);
    return {
      EM: "Loi server !!!",
      EC: -2,
      DT: "",
    };
  }
};



export default {
  createTour,
};
