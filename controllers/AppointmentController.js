import Appointment from "../models/Appointment.js";
import { convertToIso, validateObjectId, formatDate } from "../utils/index.js";
import { startOfDay, endOfDay, isValid, parse } from "date-fns";
import {
  sendEmailNewAppointment,
  sendEmailUpdateAppointment,
  sendEmailCancelAppointment,
} from "../email/appointmentEmailService.js";

export const getAppointmentsByDate = async (req, res) => {
  const { date } = req.query;
  const newDate = parse(date, "dd/MM/yyyy", new Date());
  if (!isValid(newDate))
    return res.status(400).json({ msg: "Fecha no valida" });
  const dateIso = convertToIso(date);

  try {
    const appointments = await Appointment.find({
      date: {
        // inicio del dia
        $gte: startOfDay(new Date(dateIso)),
        //final del dia
        $lte: endOfDay(new Date(dateIso)),
      },
    }).select("time");
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ msg: "Error al obtener las citas" });
  }
};

export const getAppointmentsByUser = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!validateObjectId(id))
    return res.status(400).json({ msg: "id no valido" });

  if (id !== user._id.toString())
    return res.status(400).json({ msg: "Acceso denegado" });

  const query = user.admin
    ? {
        date: {
          // inicio del dia
          $gte: startOfDay(new Date()),
        },
      }
    : {
        user: id,
        date: {
          // inicio del dia
          $gte: startOfDay(new Date()),
        },
      };

  try {
    const appointments = await Appointment.find(query)
      .populate("services")
      .populate({path:'user',select:'name lastName email'})
      .sort({ date: "asc" });
    res.json(appointments);
  } catch (error) {
    res.status(400).json({ msg: "Error al obtener las citas" });
  }
};

export const getAppoinmentByID = async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  if (!validateObjectId(id))
    return res.status(400).json({ msg: "id no valido" });

  try {
    const appointment = await Appointment.findById(id).populate("services");
    if (!appointment)
      return res.status(404).json({ msg: "Cita no encontrada" });
    if (appointment.user.toString() !== user._id.toString())
      return res.status(400).json({ msg: "Acceso denegado" });
    res.json(appointment);
  } catch (error) {
    res.status(400).json({ msg: "Error al obtener la cita" });
  }
};

export const createAppointment = async (req, res) => {
  const { date, time, services, total } = req.body;
  const user = req.user;
  const newReservation = {
    date,
    time,
    services,
    total,
    user: user._id,
  };
  try {
    const newAppointment = new Appointment(newReservation);
    const result = await newAppointment.save();
    sendEmailNewAppointment({
      date: formatDate(result.date),
      time: result.time,
    });
    res.status(201).json({ msg: "Cita creada correctamente" });
    return;
  } catch (error) {
    res.status(400).json({ msg: "Error al crear la cita" });
  }
};

export const updateAppointment = async (req, res) => {
  const { id } = req.params;
  const { date, time, services, total } = req.body;
  const user = req.user;
  if (!validateObjectId(id))
    return res.status(400).json({ msg: "id no valido" });

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment)
      return res.status(404).json({ msg: "Cita no encontrada" });
    if (appointment.user.toString() !== user._id.toString())
      return res.status(400).json({ msg: "Acceso denegado" });
    appointment.date = date;
    appointment.time = time;
    appointment.services = services;
    appointment.total = total;
    const result = await appointment.save();
    sendEmailUpdateAppointment({
      date: formatDate(result.date),
      time: result.time,
    });
    res.status(200).json({ msg: "Cita actualizada correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "Error al actualizar la cita" });
  }
};

export const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  if (!validateObjectId(id))
    return res.status(400).json({ msg: "id no valido" });

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment)
      return res.status(404).json({ msg: "Cita no encontrada" });
    if (appointment.user.toString() !== user._id.toString())
      return res.status(400).json({ msg: "Acceso denegado" });
    sendEmailCancelAppointment({
      date: formatDate(appointment.date),
      time: appointment.time,
    });
    await appointment.deleteOne();
    res.status(200).json({ msg: "Cita eliminada correctamente" });
  } catch (error) {
    res.status(400).json({ msg: "Error al eliminar la cita" });
  }
};
