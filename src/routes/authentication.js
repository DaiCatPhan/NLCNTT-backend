import express from "express";
const router = express.Router();
import AuthenticationController from "../controllers/AuthenticationController";

router.post("/login", AuthenticationController.login);
router.get("/logout", AuthenticationController.logout);

export default router;
