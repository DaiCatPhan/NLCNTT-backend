import express from "express";
const router = express.Router();
import StaffController from "../controllers/StaffController";

router.post("/updateStaff/:idStaff", StaffController.updateStaff);
router.post("/deleteStaff/:idStaff", StaffController.deleteStaff);
router.post("/createStaff", StaffController.createStaff);
router.get("/getStaff", StaffController.getStaff);
router.get("/getListPaginationStaff", StaffController.getListPaginationStaff);

export default router;
