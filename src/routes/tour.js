import express from "express";
const router = express.Router();
import TourController from "../controllers/TourController";

router.get("/getTours", TourController.getTours);
router.post("/createTour", TourController.createTour);

export default router;
