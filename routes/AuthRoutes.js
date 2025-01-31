import express from "express";
import {
  getUser,
  getAdmin,
  registerUser,
  verifyToken,
  loginUser,
  forgotPassword,
  verifyForgotToken,
  updatePassword,
} from "../controllers/AuthControllers.js";
import authMiddleware from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", registerUser);
router.get("/register/verify/:token", verifyToken);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);

router.route("/forgot-password/:token")
  .get(verifyForgotToken)
  .patch(updatePassword);

// AREA PRIVADA => REQUIRE UNA AUTENTICACION
router.get("/user", authMiddleware, getUser);
router.get("/admin", authMiddleware, getAdmin);

export default router;
