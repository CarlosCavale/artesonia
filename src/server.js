require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const contactRoutes = require('./routes/contact');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configura la carpeta pública
app.use(express.static(path.join(__dirname, '../public')));

// Rutas
app.use('/api', contactRoutes);

// Ruta para cualquier otra solicitud (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('¡Algo salió mal!');
});

// Verifica si estamos en el entorno de Hostinger
const isHostinger = process.env.NODE_ENV === 'production' && process.env.HOSTINGER_DOMAIN;

// Log de inicio personalizado según el entorno
app.listen(PORT, () => {
  if (isHostinger) {
    console.log(`Servidor en producción (Hostinger) corriendo en http://${process.env.HOSTINGER_DOMAIN}:${PORT}`);
  } else {
    console.log(`Servidor de desarrollo corriendo en http://localhost:${PORT}`);
  }
}); 