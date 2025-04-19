#!/bin/bash

# Script de despliegue para Hostinger con OpenLiteSpeed/LiteSpeed Enterprise
# Asegúrate de dar permisos de ejecución: chmod +x deploy-litespeed.sh

echo "===== Iniciando despliegue a Hostinger con LiteSpeed ====="

# Verificar que estamos en la rama hostinger
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" != "hostinger" ]; then
  echo "⚠️ No estás en la rama hostinger. Cambiando automáticamente..."
  git checkout hostinger || { echo "❌ Error al cambiar a la rama hostinger"; exit 1; }
fi

# Instalar dependencias de producción
echo "📦 Instalando dependencias de producción..."
npm ci --production || { echo "❌ Error al instalar dependencias"; exit 1; }

# Crear carpeta de despliegue
echo "🗂️ Creando estructura de despliegue..."
rm -rf deploy
mkdir -p deploy

# Copiar archivos necesarios
echo "📋 Copiando archivos..."
cp -r public deploy/
cp -r src deploy/
cp package.json deploy/
cp package-lock.json deploy/
cp .env.hostinger deploy/.env

# Crear archivo de inicio para LiteSpeed Node.js
echo "🔧 Configurando archivos para LiteSpeed..."
cat > deploy/app.js << EOF
// Este archivo sirve como punto de entrada para la aplicación en LiteSpeed
require('dotenv').config();
const app = require('./src/server');
EOF

# Crear un archivo start.js para la configuración alternativa
cat > deploy/start.js << EOF
// Punto de entrada alternativo para Node.js en LiteSpeed
require('./app');
EOF

# Actualizar server.js para que exporte la app en lugar de iniciarla
echo "📝 Modificando server.js para su compatibilidad con LiteSpeed..."
mkdir -p deploy/backup
cp deploy/src/server.js deploy/backup/server.js.bak

# Modificar el archivo server.js para exportarlo como módulo
cat > deploy/src/server.js << EOF
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

// Si no se importa como módulo, iniciar el servidor
if (!module.parent) {
  const server = app.listen(PORT, () => {
    const isHostinger = process.env.NODE_ENV === 'production' && process.env.HOSTINGER_DOMAIN;
    if (isHostinger) {
      console.log(\`Servidor en producción (Hostinger) corriendo en http://\${process.env.HOSTINGER_DOMAIN}:\${PORT}\`);
    } else {
      console.log(\`Servidor de desarrollo corriendo en http://localhost:\${PORT}\`);
    }
  });
}

module.exports = app;
EOF

# Crear archivo para PM2 (gestor de procesos de Node.js)
cat > deploy/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: "artesonia",
    script: "app.js",
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: "500M",
    env: {
      NODE_ENV: "production",
    }
  }]
};
EOF

# Instrucciones para configurar LiteSpeed
cat > deploy/LITESPEED_SETUP.md << EOF
# Configuración de LiteSpeed para Artesonia

## Opción 1: Usando el Panel de Control (CyberPanel)

1. Ir a "Websites" y seleccionar artesonia.cl
2. Buscar "vHost Config" o "Node.js Setup"
3. Configurar con estos valores:
   - URI: /
   - Location: /home/artesonia/public_html/
   - Binario: /usr/bin/node
   - Application Type: Node
   - Startup File: start.js

## Opción 2: Configuración Manual de OpenLiteSpeed

1. Acceder a la consola WebAdmin (puerto 7080)
2. Ir a Virtual Hosts > artesonia.cl > Context
3. Añadir un nuevo contexto:
   - URI: /
   - Location: /home/artesonia/public_html/
   - Binary Path: /usr/bin/node
   - Application Type: Node
   - Startup File: start.js

4. Guardar y reiniciar el servidor:
   \`\`\`
   service lsws restart
   \`\`\`
EOF

# Comprimir para subir
echo "📦 Comprimiendo archivos..."
cd deploy
zip -r ../artesonia-litespeed.zip .
cd ..

echo "===== Despliegue listo ====="
echo "📄 Archivo artesonia-litespeed.zip generado."
echo ""
echo "Instrucciones de despliegue:"
echo "1. Sube artesonia-litespeed.zip a tu servidor Hostinger"
echo "2. Descomprime en /home/artesonia/public_html/"
echo "3. Configura LiteSpeed según las instrucciones en LITESPEED_SETUP.md"
echo ""
echo "Para versión de LiteSpeed Enterprise, consulta:"
echo "https://docs.litespeedtech.com/cloud/images/nodejs/"
echo ""
echo "===== Fin del proceso de despliegue ===== 