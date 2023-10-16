import express from "express";
const router = express.Router();
import CustomerController from "../controllers/CustomerController";

router.get("/readPanigation", CustomerController.readPanigation);
router.get("/readAll", CustomerController.readAll);
router.get("/readUserById", CustomerController.readUserById);
router.post("/create", CustomerController.create);
router.put("/update", CustomerController.update);
router.delete("/delete", CustomerController.delete);

export default router;
