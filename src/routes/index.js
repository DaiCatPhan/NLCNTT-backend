import authenticationRouter from "./authentication";
import tourRouter from "./tour";
import staffRouter from "./staff";
import calendarTourRouter from "./calendarTour";
import processTourRouter from "./processTour";
import customerRouter from "./customer";

function route(app) {
  // ProcessTour
  app.use("/api/v1/customer", customerRouter);

  // ProcessTour
  app.use("/api/v1/processTour", processTourRouter);

  // Calendar
  app.use("/api/v1/calendar", calendarTourRouter);

  // Staff
  app.use("/api/v1/staff", staffRouter);

  // Tour
  app.use("/api/v1/tour", tourRouter);

  // authentication
  app.use("/api/v1/authentication", authenticationRouter);
}

export default route;
