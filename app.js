// Punto de entrada principal para la aplicación en LiteSpeed
require('dotenv').config();
const app = require('./src/server');

// Puerto definido en .env o valor predeterminado
const PORT = process.env.PORT || 4000;

// Iniciar el servidor
app.listen(PORT, () => {
  const isHostinger = process.env.NODE_ENV === 'production' && process.env.HOSTINGER_DOMAIN;
  if (isHostinger) {
    console.log(`Servidor en producción (Hostinger/LiteSpeed) corriendo en http://${process.env.HOSTINGER_DOMAIN}:${PORT}`);
  } else {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  }
}); 