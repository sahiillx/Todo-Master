import mongoose from "mongoose";

//Creating Schema
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    descriptions: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userData",
        required: true,
    }, 
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//Creating Collection
export const Task = mongoose.model("taskData", taskSchema);