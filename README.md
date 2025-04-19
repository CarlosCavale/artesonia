# Artesonia - Sitio web de locutores profesionales

Este repositorio contiene el código fuente del sitio web de Artesonia, una plataforma para locutores profesionales.

## Estructura del proyecto

La estructura del proyecto sigue las recomendaciones de [starter-node-vue](https://github.com/arrafi-ahmed/starter-node-vue):

- `/public` - Archivos estáticos del frontend (HTML, CSS, JS, imágenes)
- `/src` - Código del servidor Node.js
  - `/src/routes` - Rutas API
  - `/src/server.js` - Punto de entrada del servidor
- `app.js` - Punto de entrada principal para la aplicación
- `start.js` - Archivo de inicio para LiteSpeed

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

### Opción 1: Servidor VPS con LiteSpeed (Recomendado para Hostinger)

El proyecto está optimizado para funcionar con OpenLiteSpeed o LiteSpeed Enterprise:

1. Clona el repositorio en tu local:
```bash
git clone https://github.com/CarlosCavale/artesonia.git
cd artesonia
git checkout hostinger
```

2. Ejecuta el script de despliegue específico para LiteSpeed:
```bash
chmod +x deploy-litespeed.sh
./deploy-litespeed.sh
```

3. Sube el archivo `artesonia-litespeed.zip` generado a tu servidor Hostinger con LiteSpeed.

4. Descomprime en el directorio raíz:
```bash
unzip artesonia-litespeed.zip -d /home/artesonia/public_html/
```

5. Configura LiteSpeed para servir la aplicación Node.js:
   - En CyberPanel: Websites → artesonia.cl → Node.js Settings
   - O en OpenLiteSpeed: WebAdmin Console → Virtual Hosts → Context
   - Configura los parámetros según las instrucciones en `LITESPEED_SETUP.md`

Para más detalles, consulta [la documentación oficial de LiteSpeed para Node.js](https://docs.litespeedtech.com/cloud/images/nodejs/).

### Opción 2: Hostinger sin LiteSpeed 

Si prefieres un despliegue sin utilizar las características específicas de LiteSpeed:

1. Cambiar a la rama de Hostinger:
```bash
git checkout hostinger
```

2. Ejecutar el script de despliegue estándar:
```bash
chmod +x hostinger-deploy.sh
./hostinger-deploy.sh
```

3. Seguir las instrucciones proporcionadas por el script.

### Opción 3: Servidor VPS/Dedicado genérico

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
pm2 start app.js --name artesonia
pm2 save
pm2 startup
```

4. Configurar Nginx o Apache para redireccionar el tráfico al puerto 4000.

## Contacto

Para más información, contactar a contacto@artesonia.cl