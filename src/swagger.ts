import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0', // 👈 ESTA ES LA CLAVE, debe ir aquí directo
    info: {
      title: 'TYPESCRIPT + EXPRESS',
      version: '1.0.0',
      description: 'BACKEND',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    './src/routes/**/*.ts',      // ✅ lee rutas recursivamente
    './src/controllers/**/*.ts', // opcional
    './src/models/**/*.ts'       // opcional
  ],
};

const specs = swaggerJsdoc(options);
module.exports = specs;