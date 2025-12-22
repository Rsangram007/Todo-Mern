const express = require("express");
const { body, validationResult } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler");
const { protect } = require("../middleware/auth");
const Task = require("../models/Task");
const User = require("../models/User");

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

// @desc    Get all tasks for logged in user
// @route   GET /api/v1/tasks
// @access  Private
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  })
);

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to access this task",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  })
);

// @desc    Create new task
// @route   POST /api/v1/tasks
// @access  Private
router.post(
  "/",
  [
    body("title", "Please add a title").notEmpty(),
    body("description", "Please add a description").optional(),
    body("status", "Please add a status")
      .optional()
      .isIn(["pending", "in-progress", "completed"]),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { title, description, status } = req.body;

    const task = await Task.create({
      title,
      description,
      status,
      user: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: task,
    });
  })
);

// @desc    Update task
// @route   PATCH /api/v1/tasks/:id
// @access  Private
router.patch(
  "/:id",
  [
    body("title", "Please add a title").optional().notEmpty(),
    body("description", "Please add a description").optional(),
    body("status", "Please add a valid status")
      .optional()
      .isIn(["pending", "in-progress", "completed"]),
  ],
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to update this task",
      });
    }

    // Update task
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: task,
    });
  })
);

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
router.delete(
  "/:id",
  asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: "Task not found",
      });
    }

    // Make sure user owns task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        error: "Not authorized to delete this task",
      });
    }

    await task.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  })
);

module.exports = router;
