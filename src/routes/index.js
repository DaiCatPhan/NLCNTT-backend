import authenticationRouter from "./authentication";
import  tourRouter from "./tour";

function route(app) {

  // authentication
  app.use("/tour", tourRouter);
  app.use("/authentication", authenticationRouter);
}

export default route;
