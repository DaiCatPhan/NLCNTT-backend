const express = require("express");
const router = express.Router();
import CalendarTourController from "../controllers/CalendarTourController";

// [POST] /api/v1/calendar/create
router.post("/create", CalendarTourController.create);
router.get("/read", CalendarTourController.read);
router.put("/update", CalendarTourController.update);
router.delete("/delete", CalendarTourController.delete);

export default router;
