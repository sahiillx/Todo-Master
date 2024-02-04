import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import { createCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUsers = async (req, res) => {};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("No account found", 400));
    }
    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return next(new ErrorHandler("Invalid username or password", 400));
    }
    //Creating cookie
    createCookie(user, res, `Welcome back! ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return next(new ErrorHandler("User Already Exists", 400));
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    user = await User.create({
      name,
      email,
      password: hashedpassword,
    });

    createCookie(user, res, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

export const myProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Dev" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Dev" ? false : true,
    })
    .json({
      success: true,
      message: "Logout",
    });
};
