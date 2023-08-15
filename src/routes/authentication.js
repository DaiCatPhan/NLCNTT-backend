import express from "express";
const router = express.Router();
import AuthenticationController from "../controllers/AuthenticationController";

router.post("/register", AuthenticationController.register); 
router.post("/login", AuthenticationController.login); 

export default router;
