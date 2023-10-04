import express from "express";
const router = express.Router();
import StaffController from "../controllers/StaffController";
import uploadCloud from "../middleware/upLoadImage";

// router.put("/updateStaff/:idStaff", StaffController.updateStaff);
// router.post("/createStaff", StaffController.createStaff);
// router.get("/getStaff", StaffController.getStaff);
// router.get("/getListPaginationStaff", StaffController.getListPaginationStaff);

router.get("/read", StaffController.readFunc);
router.post("/create", StaffController.createFunc);
router.put("/update", uploadCloud.single("image"), StaffController.updateFunc);
router.delete("/delete", StaffController.deleteFunc);

export default router;
