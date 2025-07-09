import express from "express";
const router = express.Router();

import { authenticate, authorize } from "../middlewares/auth.js";
import {
  RegisterUser,
  loginUser,
  updateUser,
  deleteUser,
  showallUsers,
  getUserDetails,
} from "../controllers/userController.js";

router.get("/users", authenticate, authorize, showallUsers);
router.get("/:id/profile", authenticate, getUserDetails);

router.post("/register", RegisterUser);

router.post("/login", loginUser);
router.patch("/:id", authenticate, authorize, updateUser);

router.delete("/:id", authenticate, authorize, deleteUser);

export default router;
