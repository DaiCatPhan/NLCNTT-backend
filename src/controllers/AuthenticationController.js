import Account from "../modules/Account";
import bcrypt from "bcrypt";

class Authentication {
  // [POST] /authentication/register
  register(req, res, next) {
    // const { email , username , password , mssv ,  classs  } = req.body;
    const { email, password, ...rest } = req.body;

    bcrypt
      .hash(password, 10)
      .then((hash) => {
        // Nếu như băm thành công thì trả về mật khẩu đã được bâm ở biến hash
        Account.findOne({ email: email })
          .then((user) => {
            if (user) {
              res.json("Tài khoản đã tồn tại !!!");
            } else {
              Account.create({ email, password: hash, ...rest })
                .then((user) => {
                  console.log("create success : ", user);
                  res.json("Success");
                })
                .catch((err) => res.json("Create an account fail !!! ")); 
            }
          })
          .catch((err) => res.json(err));
      })
      .catch((err) => console.log(err));
  }

  // [POST] /authentication/login
  login(req, res, next) {
    res.json("Login");
  }
}

export default new Authentication();
