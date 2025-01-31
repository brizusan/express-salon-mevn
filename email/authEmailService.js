import { createTransporter } from "../config/nodemailer.js";

export const sendEmailVerification = async ({name , email , token}) => {
  const transporter = createTransporter(
    process.env.SMTP_HOST,
    process.env.SMTP_PORT,
    process.env.SMTP_USER,
    process.env.SMTP_PASS
  );

  const info = await transporter.sendMail({
    from: "Salon MEVN  -  <salonmevn@example.com>",
    to: email,
    subject: "Verificacion de cuenta | Salon MEVN",
    text: "Verifica tu cuenta",
    html: `
      <h1 style="text-align: center; font-size: 2rem ; font-weight: 700 ; padding-bottom: 1rem">Verifica tu cuenta | Salon MEVN </h1>
      <p style="margin-bottom: 1rem ; fonsize: 1.6rem ; color: #333">Hola ${name} , confirma tu cuenta en Salon MEVN</p>
      <p>Para confirmar la cuenta da click en el siguiente link: 
      <a 
        style="text-underline-offset:0.2rem"
        href="${process.env.FRONTEND_URL}/auth/confirmar-cuenta/${token}">Verificar Cuenta</a> 
      </p>

      <p style="color: #ff0000 ; font-weight: 500">Si no has solicitado esta cuenta, ignora este correo</p>
    `,
  });

  console.log(info.messageId);
};


export const sendForgotAccount = async ({name , email , token}) => {
  const transporter = createTransporter(
    process.env.SMTP_HOST,
    process.env.SMTP_PORT,
    process.env.SMTP_USER,
    process.env.SMTP_PASS
  );

  const info = await transporter.sendMail({
    from: "Salon MEVN  -  <salonmevn@example.com>",
    to: email,
    subject: "Recuperar cuenta | Salon MEVN",
    text: "Recuperacion de la cuenta en Salon MEVN",
    html: `
      <h1 style="text-align: center; font-size: 2rem ; font-weight: 700 ; padding-bottom: 1rem">Recuperar Cuenta | Salon MEVN </h1>
      <p style="margin-bottom: 1rem ; fonsize: 1.6rem ; color: #333">Hola ${name} , para recuperar tu cuenta en Salon MEVN</p>
      <p>da click en el siguiente link: 
      <a 
        style="text-underline-offset:0.2rem"
        href="${process.env.FRONTEND_URL}/auth/recuperar-password/${token}">Recuperar Cuenta</a> 
      </p>

      <p style="color: #ff0000 ; font-weight: 500">Si no has solicitado esta cuenta, ignora este correo</p>
    `,
  });

  console.log(info.messageId);
};

