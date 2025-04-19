# Configuración de Artesonia en LiteSpeed

Este documento proporciona instrucciones detalladas para configurar la aplicación Artesonia en LiteSpeed Web Server en un VPS de Hostinger.

## Opción 1: Configuración a través de CyberPanel

Si tienes CyberPanel instalado (común en Hostinger VPS con LiteSpeed):

1. Inicia sesión en CyberPanel
2. Ve a "Websites" → selecciona el dominio `artesonia.cl`
3. Busca "Node.js App Settings" o "vHost Configuration"
4. Configura los siguientes parámetros:
   - **URI**: `/`
   - **Home Directory**: `/home/artesonia/public_html`
   - **Binary Path**: `/usr/bin/node`
   - **Application Type**: `Node`
   - **Startup File**: `start.js`
5. Guarda y aplica los cambios
6. Reinicia el servicio LiteSpeed

## Opción 2: Configuración Manual en OpenLiteSpeed

1. Accede a la consola WebAdmin de OpenLiteSpeed (generalmente en el puerto 7080)
2. Ve a "Server Configuration" → "Virtual Hosts" → selecciona tu host virtual
3. Haz clic en "Context" y luego en "Add" para crear un nuevo contexto
4. Configura los siguientes parámetros:
   - **URI**: `/`
   - **Location**: `/home/artesonia/public_html`
   - **Binary Path**: `/usr/bin/node`
   - **Application Type**: `Node` (o `Proxy` si lo prefieres)
   - **Startup File**: `start.js`
5. Guarda los cambios
6. Reinicia el servidor:
   ```
   service lsws restart
   ```

## Verificación

Para verificar que la aplicación se ha desplegado correctamente:

1. Visita `http://artesonia.cl` en el navegador
2. Verifica que la página principal se carga correctamente
3. Prueba el formulario de contacto para asegurarte de que el backend funciona

## Solución de problemas

Si encuentras algún problema:

1. Revisa los logs de LiteSpeed:
   ```
   cat /usr/local/lsws/logs/error.log
   ```

2. Verifica que Node.js está correctamente instalado:
   ```
   node -v
   ```

3. Asegúrate de que todos los archivos tienen los permisos correctos:
   ```
   chmod 755 /home/artesonia/public_html
   chmod 644 /home/artesonia/public_html/*.js
   ```

## Recursos adicionales

- [Documentación oficial de LiteSpeed para Node.js](https://docs.litespeedtech.com/cloud/images/nodejs/)
- [Express.js en OpenLiteSpeed](https://docs.litespeedtech.com/cloud/images/nodejs/#how-do-i-use-an-express-app-on-this-image) 