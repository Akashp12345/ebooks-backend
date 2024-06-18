// Swagger setup
require("dotenv").config()
function swaggerfn(){
return  {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Simple API',
      version: '1.0.0',
      description: 'A simple API documentation example',
    },
    servers: [
      {
        url: process.env.BACKEND_LINK,
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API docs
};
}


    module.exports={swaggerfn}