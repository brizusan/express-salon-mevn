import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
  date: {
    type: Date,
  },
  time: {
    type: String,
    required: true,
  },
  services: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Services",
    },
  ],
  total: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
