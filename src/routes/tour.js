import express from "express";
const router = express.Router();
import TourController from "../controllers/TourController";
import uploadCloud from "../middleware/upLoadImage";

router.get("/getTour", TourController.getTour);
router.delete("/deleteTour", TourController.deleteTour);
router.put(
  "/updateTour",
  uploadCloud.single("image"),
  TourController.upDateTour
);
router.post(
  "/createTour",
  uploadCloud.single("image"),
  TourController.createTour
);

export default router;
