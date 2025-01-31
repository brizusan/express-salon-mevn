import express from "express";
import {
  createAppointment,
  getAppointmentsByDate,
  getAppointmentsByUser,
  getAppoinmentByID,
  updateAppointment,
  deleteAppointment
} from "../controllers/AppointmentController.js";
import authMiddleware from "../middlewares/auth.js";

const router = express.Router();

router
  .route("/")
  .get(authMiddleware, getAppointmentsByDate)
  .post(authMiddleware, createAppointment);

router.route("/user/:id").get(authMiddleware, getAppointmentsByUser);
router.route("/:id/editar")
  .get(authMiddleware, getAppoinmentByID)
  .put(authMiddleware, updateAppointment)
router.route("/:id/eliminar").delete(authMiddleware, deleteAppointment);

export default router;
