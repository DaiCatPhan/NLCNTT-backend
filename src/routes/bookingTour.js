const express = require("express");
const router = express.Router();
import BookingTourController from "../controllers/BookingTourController";

router.post("/create", BookingTourController.create);
router.put("/update", BookingTourController.update);
router.get("/read", BookingTourController.read);
router.get("/readAll", BookingTourController.readAll);
router.delete("/delete", BookingTourController.delete);

export default router; 
