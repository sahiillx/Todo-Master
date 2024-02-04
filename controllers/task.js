import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

//Create new Task
export const newTask = async (req, res, next) => {
  try {
    const { title, descriptions } = req.body;
    await Task.create({
      title,
      descriptions,
      user: req.user,
    });
    res.status(201).json({
      success: true,
      message: "Task Added",
    });
  } catch (error) {
    next(error);
  }
};

//Get all Task
export const getTask = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ user: userId });
    res.status(200).json({
      success: true,
      tasks,
      userId,
    });
  } catch (error) {
    next(error);
  }
};

//Update Task
export const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    const task = await Task.findById(id);

    console.log(task);
    if (!task) {
      return next(new ErrorHandler("Task not found", 404));
    }
    console.log("W2");
    task.isCompleted = !task.isCompleted;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};

//Delete Task
export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    console.log("W1");
    if (!task) {
      return next(new ErrorHandler("Task not found", 404));
    }
    console.log("W2");
    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task Deleted!",
    });
  } catch (error) {
    next(error);
  }
};
