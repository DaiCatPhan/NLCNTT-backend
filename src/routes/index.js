import authenticationRouter from "./authentication";

function route(app) {

  // authentication
  app.use("/authentication", authenticationRouter);
}

export default route;
