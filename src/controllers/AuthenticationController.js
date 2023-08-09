class Authentication {
  // [POST] /authentication/register
  register(req, res, next) {
    res.json("Register");
  }

  // [POST] /authentication/login
  login(req, res, next) {
    res.json("Login");
  }
}

export default new Authentication();
