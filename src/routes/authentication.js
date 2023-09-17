import express from "express";
const router = express.Router();
import AuthenticationController from "../controllers/AuthenticationController";

router.post("/register", AuthenticationController.handleRegister);
router.post("/login", AuthenticationController.handlelogin);
router.get("/logout", AuthenticationController.logout);
router.get("/getProfile", AuthenticationController.getProfile);

export default router;
