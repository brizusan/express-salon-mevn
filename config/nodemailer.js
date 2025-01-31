import nodemailer from "nodemailer";

export const createTransporter = (host, port, user, pass) => {
  const transporter = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass,
    },
  });

  return transporter;
};
