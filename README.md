# Artesonia - Sitio web de locutores profesionales

Este repositorio contiene el código fuente del sitio web de Artesonia, una plataforma para locutores profesionales.

## Estructura del proyecto

- `/public` - Archivos estáticos del frontend (HTML, CSS, JS, imágenes)
- `/src` - Código del servidor Node.js
  - `/src/routes` - Rutas API
  - `/src/server.js` - Punto de entrada del servidor

## Requisitos

- Node.js 14.x o superior
- npm 6.x o superior

## Instrucciones de desarrollo

1. Clonar el repositorio:
```bash
git clone https://github.com/CarlosCavale/artesonia.git
cd artesonia
```

2. Instalar las dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
```bash
cp .env.example .env
# Editar .env con tus propias configuraciones
```

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

5. Abrir http://localhost:4000 en el navegador

## Despliegue en producción

### Opción 1: Servidor VPS/Dedicado (Virtualmin, CyberPanel, etc.)

1. Clonar el repositorio en el servidor:
```bash
git clone https://github.com/CarlosCavale/artesonia.git
cd artesonia
```

2. Instalar dependencias y configurar:
```bash
npm ci --production
cp .env.example .env
# Editar .env para producción
```

3. Iniciar con PM2 para mantener el servicio activo:
```bash
npm install -g pm2
pm2 start src/server.js --name artesonia
pm2 save
pm2 startup
```

4. Configurar proxy inverso en Nginx o Apache para redireccionar el tráfico al puerto 4000.

### Opción 2: Hostinger (Rama específica)

Este repositorio incluye una rama `hostinger` con configuraciones específicas para desplegar en Hostinger:

1. Cambiar a la rama de Hostinger:
```bash
git checkout hostinger
```

2. Ejecutar el script de despliegue:
```bash
chmod +x hostinger-deploy.sh
./hostinger-deploy.sh
```

3. Subir el archivo `artesonia-deploy.zip` generado a tu cuenta de Hostinger.

4. Descomprimir en el directorio raíz del hosting.

5. Si el hosting soporta Node.js:
```bash
npm install --production
node src/server.js
```

6. Si usas un panel de control como CyberPanel, configura un proxy inverso para redirigir las solicitudes al puerto 4000.

## Contacto

Para más información, contactar a contacto@artesonia.cl