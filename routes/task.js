import express from "express";
import {
  newTask,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.js";
import { isAuthentcated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthentcated, newTask);
router.get("/my", isAuthentcated, getTask);
router
  .route("/:id")
  .put(isAuthentcated, updateTask)
  .delete(isAuthentcated, deleteTask);

export default router;
