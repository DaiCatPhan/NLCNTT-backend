# NLCNTT-backend

# npx sequelize-cli db:migrate

# http://localhost:3000/

# controller

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

# service

const deleteUser = async (id) => {
try {

} catch (err) {
  console.log(">> loi", err);
    return {
      EM: "Loi server !!!",
      EC: -5,
      DT: data,
    };
  }
};
