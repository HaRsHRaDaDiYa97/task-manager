import express from "express";

import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  completeTask,
} from "../controllers/task.controller.js";

import isAuthenticated from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/", isAuthenticated, createTask);

router.get("/", isAuthenticated, getTasks);

router.put("/:id", isAuthenticated, updateTask);

router.delete("/:id", isAuthenticated, deleteTask);

router.patch("/:id/complete", isAuthenticated, completeTask);

export default router;