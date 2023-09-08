import authenticationRouter from "./authentication";
import tourRouter from "./tour";

function route(app) {
  // Tour
  app.use("/api/v1/tour", tourRouter);

  // authentication
  app.use("/authentication", authenticationRouter);
}

export default route;
