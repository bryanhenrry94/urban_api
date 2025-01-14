const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
const os = require('os');

// Configurar el transportador de nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 465, // Asegúrate de que el puerto esté configurado correctamente
  secure: true, // true para 465, false para otros puertos
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

transporter.verify((error) => {
  if (error) {
    console.error('Error al verificar el transportador:', error);
  } else {
    console.log('Transportador listo para enviar correos');
  }
});

// Función para enviar correo electrónico
const sendEmail = async (to, subject, html) => {
  if (!to) {
    throw new Error('No recipients defined');
  }

  const fromName = process.env.EMAIL_USER_NAME; // Cambia esto al nombre que deseas mostrar
  const fromEmail = process.env.EMAIL_USER;
  const hostname = os.hostname();
  const messageId = `<${uuidv4()}@${hostname}>`; // Generar un message-id personalizado

  const mailOptions = {
    from: `"${fromName}" <${fromEmail}>`,
    to,
    subject,
    html,
    messageId: messageId
  };

  try {
    // send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
  } catch (error) {
    throw new Error('Error al enviar el correo electrónico');
  }
};

module.exports = sendEmail;