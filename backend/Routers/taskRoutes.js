// routes/taskRoutes.js
import express from "express";
import Task from "../Models/Task.js";

const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// READ (Active only)
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find({ status: "active" });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
