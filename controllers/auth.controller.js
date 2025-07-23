const User = require("../models/user");
const { hashPassword, comparePassword } = require("../utils/password");
const { generateToken } = require("../utils/token");

const signUp = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role = "user",
      profileImage = "",
    } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.status = 400;
      throw error;
    }
    const hashedPassword = await hashPassword(password);

    await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      profileImage,
    });

    const newUser = await User.findOne({ email }).select("-password -__v");

    const token = generateToken(newUser._id);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profileImage: newUser.profileImage,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      const error = new Error("User not found");
      error.status = 404;
      throw error;
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.status = 401;
      throw error;
    }
    const token = generateToken(user._id);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  login,
};
