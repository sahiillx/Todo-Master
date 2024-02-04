import express from "express";
import { getAllUsers, register, login, logout, myProfile } from "../controllers/user.js";
import { isAuthentcated } from "../middlewares/auth.js";

const router = express.Router();

router.get('/all', getAllUsers);
router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthentcated ,logout);
router.get("/me", isAuthentcated ,myProfile);


export default router;

