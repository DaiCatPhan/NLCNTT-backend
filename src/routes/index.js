import authenticationRouter from "./authentication";
import tourRouter from "./tour";
import staffRouter from "./staff";

function route(app) {
  // Staff
  app.use("/api/v1/staff", staffRouter);

  // Tour
  app.use("/api/v1/tour", tourRouter);

  // authentication
  app.use("/api/v1/authentication", authenticationRouter);
}

export default route;
