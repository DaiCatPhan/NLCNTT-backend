import express from "express";
const router = express.Router();
import StaffController from "../controllers/StaffController";

router.put("/updateStaff/:idStaff", StaffController.updateStaff);
router.delete("/deleteStaff/:idStaff", StaffController.deleteStaff);
router.post("/createStaff", StaffController.createStaff);
router.get("/getStaff", StaffController.getStaff);
router.get("/getListPaginationStaff", StaffController.getListPaginationStaff);

export default router;
