import express from "express";
import { login, register } from "../controllers/authController.js";
import { validateLoginInput, validateRegisterInput } from "../middleware/validation.js";

const router = express.Router();

router.post("/login", validateLoginInput, login);
router.post("/register", validateRegisterInput, register);

export default router;