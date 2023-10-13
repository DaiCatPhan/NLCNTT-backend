const express = require("express");
const router = express.Router();
import ProcessTourController from "../controllers/ProcessTourController";

router.post("/create", ProcessTourController.create);
router.get("/read", ProcessTourController.read);
router.get("/getPanigation", ProcessTourController.getProcessTourPanigation);
router.put("/update", ProcessTourController.update);
router.delete("/delete", ProcessTourController.delete);

export default router;
