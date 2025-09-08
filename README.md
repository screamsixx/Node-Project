Overview:

This REST API, built with TypeScript, Node.js, and Express, provides a secure and efficient way to interact with your data. It employs a static bearer token for authorization, ensuring a simple yet effective security mechanism.

Descripción general:

Esta API REST, creada con TypeScript, Node.js y Express, ofrece una forma segura y eficiente de interactuar con sus datos. Emplea un token de barrera para la autorización, lo que garantiza un mecanismo de seguridad simple pero efectivo.

Scripts en package.json
npm run dev:

Comando: ts-node-dev src/index.ts

Descripción: Este script ejecuta el código TypeScript directamente desde la carpeta src utilizando ts-node-dev. Es ideal para el entorno de desarrollo, ya que:

No requiere compilación previa (compilación en tiempo real).

Realiza un hot reload, es decir, recarga la aplicación automáticamente cuando se detectan cambios en el código.

Uso recomendado: Ejecuta este comando durante el desarrollo para trabajar con el código más reciente sin necesidad de compilar manualmente.

npm run build:

Comando: tsc

Descripción: Este script ejecuta el compilador de TypeScript (tsc) para generar la versión compilada de la aplicación en JavaScript. El código transpilado se guarda en la carpeta build. Este comando:

Transforma el código TypeScript en JavaScript.

Es útil para preparar la aplicación para producción o para cualquier entorno donde se necesite ejecutar código JavaScript.

Uso recomendado: Ejecuta este comando cuando necesites compilar tu código TypeScript a JavaScript antes de ejecutar la aplicación en producción o realizar pruebas de la versión compilada.

npm run start:

Comando: node build/index.js

Descripción: Este script ejecuta el archivo JavaScript transpilado (index.js) que se encuentra en la carpeta build. Para que esto funcione correctamente, primero debes haber ejecutado npm run build para compilar el código TypeScript.

NOTA: Si el código en build no está actualizado (por ejemplo, si no has ejecutado previamente npm run build después de realizar cambios), estarás ejecutando una versión antigua de la aplicación.

Uso recomendado: Ejecuta este comando para ejecutar la versión compilada de la aplicación en producción o para correr la aplicación después de haberla compilado.
