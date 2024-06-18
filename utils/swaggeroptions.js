// Swagger setup

const swaggerOptions = {
      swaggerDefinition: {
        openapi: '3.0.0',
        info: {
          title: 'Simple API',
          version: '1.0.0',
          description: 'A simple API documentation example',
        },
        servers: [
          {
            url: 'http://localhost:5002',
          },
        ],
      },
      apis: ['./routes/*.js'], // Path to the API docs
    };

    module.exports={swaggerOptions}