const router = require("express").Router();
const Task = require("../models/taskModel");
const Project = require("../models/projectModel");
const User = require("../models/userModel");
const authMiddleware = require("../middlewares/authMiddleware");
const cloudinary = require("../config/cloudinaryConfig");
const multer = require("multer");

// Create a new task
router.post("/create-task", authMiddleware, async (req, res) => {
  try {
    const { name, description, assignedTo, assignedBy, project, deadline } = req.body;
    const newTask = new Task({
      name,
      description,
      assignedTo,
      assignedBy,
      project,
      deadline,
    });
    await newTask.save();
    res.send({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get all tasks with deadline check
router.post("/get-all-tasks", authMiddleware, async (req, res) => {
  try {
    Object.keys(req.body).forEach((key) => {
      if (req.body[key] === "all") {
        delete req.body[key];
      }
    });
    delete req.body["userId"];
    const tasks = await Task.find(req.body)
      .populate("assignedTo")
      .populate("assignedBy")
      .populate("project")
      .sort({ createdAt: -1 });

    // Check if tasks are overdue and add a flag
    const updatedTasks = tasks.map((task) => {
      const isOverdue = new Date() > new Date(task.deadline);
      return { 
        ...task._doc, 
        isOverdue,
        deadline: task.deadline // Ensure deadline is included
      };
    });

    res.send({
      success: true,
      message: "Tasks fetched successfully",
      data: updatedTasks,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Update a task
router.post("/update-task", authMiddleware, async (req, res) => {
  try {
    const { _id, deadline, ...updateData } = req.body;
    const task = await Task.findById(_id);

    // Check if the task is overdue before allowing updates
    if (new Date() > new Date(task.deadline)) {
      return res.send({
        success: false,
        message: "The task deadline has passed, and it cannot be modified.",
      });
    }

    await Task.findByIdAndUpdate(_id, { ...updateData, deadline });
    res.send({
      success: true,
      message: "Task updated successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Delete a task
router.post("/delete-task", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.body._id);
    res.send({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

// Upload task attachments
router.post(
  "/upload-image",
  authMiddleware,
  multer({ storage: storage }).single("file"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "tasks",
      });
      const imageURL = result.secure_url;

      await Task.findOneAndUpdate(
        { _id: req.body.taskId },
        {
          $push: {
            attachments: imageURL,
          },
        }
      );

      res.send({
        success: true,
        message: "Image uploaded successfully",
        data: imageURL,
      });
    } catch (error) {
      res.send({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;
