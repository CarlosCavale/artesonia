#!/bin/bash

# Script de despliegue para Hostinger
# Asegúrate de dar permisos de ejecución: chmod +x hostinger-deploy.sh

echo "===== Iniciando despliegue a Hostinger ====="

# Asegurarse de que estamos en la rama hostinger
git checkout hostinger

# Instalar dependencias de producción
echo "Instalando dependencias de producción..."
npm ci --production

# Crear carpeta de despliegue si no existe
mkdir -p deploy

# Copiar archivos necesarios a la carpeta de despliegue
echo "Preparando archivos para despliegue..."
cp -r public deploy/
cp -r src deploy/
cp package.json deploy/
cp package-lock.json deploy/
cp .env.hostinger deploy/.env

# Crear archivo para PM2 (gestor de procesos de Node.js)
cat > deploy/ecosystem.config.js << EOF
module.exports = {
  apps: [{
    name: "artesonia",
    script: "src/server.js",
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

# Comprimir para subir
echo "Comprimiendo archivos..."
cd deploy
zip -r ../artesonia-deploy.zip .
cd ..

echo "===== Despliegue listo ====="
echo "Archivo artesonia-deploy.zip generado."
echo "Ahora puedes subir este archivo a tu hosting y descomprimirlo en la carpeta correspondiente."
echo "Luego ejecuta: npm install --production && pm2 start ecosystem.config.js"
echo ""
echo "O si prefieres usar hosting compartido (sin Node.js):"
echo "1. Configura tu servidor web (Apache/Nginx) para servir el directorio 'public'"
echo "2. Configura un proxy inverso para redirigir las peticiones API a tu servidor Node.js externo"
echo ""
echo "===== Fin del proceso de despliegue =====" 