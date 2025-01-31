import express from "express";
import {
  createService,
  getServices,
  deleteService,
  getServiceById,
  updateService,
} from "../controllers/ServicesController.js";

const router = express.Router();

router.route("/services").get(getServices).post(createService);
router
  .route("/services/:id")
  .delete(deleteService)
  .get(getServiceById)
  .put(updateService);

export default router;
