import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
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
    },
    apis: ['./src/controllers/*.ts',
        './src/models/*.ts'
    ] // Especificar controladores
};

const specs = swaggerJsdoc(options);
module.exports = specs;
