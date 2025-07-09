import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
const JWT_Secret = "dnsoivnsdo";
import jwt from "jsonwebtoken";

const RegisterUser = async (req, res) => {
  try {
    const { firstname, lastname, email, password, role, status } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role,
      status,
    };
    const result = await userModel.create(user);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
    console.log(error);
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    console.log(user);

    if (!user) {
      res.status(404).json({ message: "User not found" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      res.status(404).json({ message: "Invalid Password" });
    }
    const userObj = {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      role: user.role,
      status: user.status,
    };
    const token = jwt.sign(userObj, JWT_Secret, { expiresIn: "1h" });
    res.status(200).json(token);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const result = await userModel.findByIdAndUpdate(id, body);
    return res.status(200).json({ message: "User updated", result });
  } catch (error) {
    res.status(404).json({ maeesage: "Something went wrong" });
  }
};

const showallUsers = async (req, res) => {
  try {
    const result = await userModel.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "Something went wrong" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userModel.findByIdAndDelete(id);
    res.status(200).json({ message: "User Deleted", result });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went worng user cannot be deleted" });
  }
};
const getUserDetails = async (req, res) => {
  const user = req.user;
  const FoundUser = await userModel.findById(user._id);
  if (!FoundUser) {
    res.status(404).json({ message: "User not found" });
  }

  const userObj = {
    firstname: FoundUser.firstname,
    lastname: FoundUser.lastname,
    email: FoundUser.email,
    role: FoundUser.role,
    status: FoundUser.status,
  };

  res.status(200).json({ message: "User Profile", userObj });
};

export {
  RegisterUser,
  loginUser,
  updateUser,
  showallUsers,
  deleteUser,
  getUserDetails,
};
