import { createTransporter} from "../config/nodemailer.js";

export const sendEmailNewAppointment = async ({date , time}) => {
  const transporter = createTransporter(
    process.env.SMTP_HOST,
    process.env.SMTP_PORT,
    process.env.SMTP_USER,
    process.env.SMTP_PASS
  );

  const info = await transporter.sendMail({
    from: "Salon MEVN  -  <salonmevn@example.com>",
    subject: "Nueva cita | Salon MEVN",
    to: "salonmevn@example.com",
    text: "Aviso de Reservacion Realizada",
    html: `
      <h1 style="text-align: center; font-size: 2rem ; font-weight: 700 ; padding-bottom: 1rem">Nueva Reservación| Salon MEVN </h1>
      <p style="margin-bottom: 1rem ; fonsize: 1.6rem ; color: #333">Mucho gusto , tu cita ha sido reservada en Salon MEVN</p>
      <p>La cita se ha reservado para el dia ${date} a las ${time} hrs</p> 
      <p style="color: #ff0000 ; font-weight: 500">Este correo es solo de aviso , no respondas a este correo</p>
    `,
  });

  console.log(info.messageId);
};

export const sendEmailUpdateAppointment = async ({date , time}) => {
  const transporter = createTransporter(
    process.env.SMTP_HOST,
    process.env.SMTP_PORT,
    process.env.SMTP_USER,
    process.env.SMTP_PASS
  );

  const info = await transporter.sendMail({
    from: "Salon MEVN  -  <salonmevn@example.com>",
    to: "salonmevn@example.com",
    subject: "Cambios en la cita | Salon MEVN",
    text: "Aviso de Reservacion Realizada - Cambios en la cita",
    html: `
      <h1 style="text-align: center; font-size: 2rem ; font-weight: 700 ; padding-bottom: 1rem">Aviso de Cambios en la cita| Salon MEVN </h1>
      <p style="margin-bottom: 1rem ; fonsize: 1.6rem ; color: #333">Mucho gusto , la cita ha sido actualizada en Salon MEVN</p>
      <p>La nueva cita se ha reservado para el dia ${date} a las ${time} hrs</p> 
      <p style="color: #ff0000 ; font-weight: 500">Este correo es solo de aviso , no respondas a este correo</p>
    `,
  });

  console.log(info.messageId);
};

export const sendEmailCancelAppointment = async ({date , time}) => {
  const transporter = createTransporter(
    process.env.SMTP_HOST,
    process.env.SMTP_PORT,
    process.env.SMTP_USER,
    process.env.SMTP_PASS
  );

  const info = await transporter.sendMail({
    from: "Salon MEVN  -  <salonmevn@example.com>",
    to: "salonmevn@example.com",
    subject: "Cancelacion de la reservacion | Salon MEVN",
    text: "Aviso de Cancelacion de la Reservacion",
    html: `
      <h1 style="text-align: center; font-size: 2rem ; font-weight: 700 ; padding-bottom: 1rem">Admin : Cancelacion de la reservacion| Salon MEVN </h1>
      <p style="margin-bottom: 1rem ; fonsize: 1.6rem ; color: #333">Reservacion cancelada , la cita ha sido cancelada en Salon MEVN</p>
      <p>La cita se habia reservado para el dia ${date} a las ${time} hrs</p> 
      <p style="color: #ff0000 ; font-weight: 500">Este correo es solo de aviso , no respondas a este correo</p>
    `,
  });

  console.log(info.messageId);
};