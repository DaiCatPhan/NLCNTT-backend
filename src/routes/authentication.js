import express from "express";
const router = express.Router();
import AuthenticationController from "../controllers/AuthenticationController";

router.post("/register", AuthenticationController.handleRegister);
router.post("/login", AuthenticationController.handlelogin);
router.get("/logout", AuthenticationController.logout);

export default router;
