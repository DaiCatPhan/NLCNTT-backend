import express from "express";
const router = express.Router();
import StatisticalController from "../controllers/StatisticalController";

router.get("/dashboard", StatisticalController.read);

export default router;
