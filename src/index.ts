import express from 'express';
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger');
import router from './routes';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares esenciales (en orden correcto)
app.use(express.json()); // Para parsear application/json
app.use(express.urlencoded({ extended: true })); // Para parsear application/x-www-form-urlencoded

// Debug middleware (añadido para ver las peticiones)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  // Ejemplo de uso de res:
  res.set('X-Request-Time', new Date().toISOString());
  next();
});

// Swagger
app.use('/swagger', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

// Rutas
app.use('/api', router);

app.listen(port, () => {
  console.log('Versión: ' + new Date().toISOString());
  console.log(`Servidor escuchando en el puerto ${port}`);
  console.log('Documentación disponible en /swagger');
});