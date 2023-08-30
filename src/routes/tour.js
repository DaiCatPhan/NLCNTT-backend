import express from "express";
const router = express.Router();
import TourController from "../controllers/TourController";

router.get("/getToursDomestic", TourController.getToursDomestic);
 

export default router;
