const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Configurar el transporter de nodemailer
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

router.post('/', async (req, res) => {
    try {
        const { name, email, phone, service, message } = req.body;

        // Configurar el correo
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_TO,
            subject: `Nuevo mensaje de contacto - ${name}`,
            text: `
                Nombre: ${name}
                Email: ${email}
                Teléfono: ${phone}
                Servicio de interés: ${service}
                Mensaje: ${message}
            `
        };

        // Enviar el correo
        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: 'Mensaje enviado con éxito' });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        res.status(500).json({ error: 'Error al enviar el mensaje' });
    }
});

module.exports = router; 