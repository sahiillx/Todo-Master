import mongoose from "mongoose";

//Connecting Database
export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "backend-todo",
    });
    console.log("Database Connected!");
  } catch (err) {
    console.log(err);
  }
};
