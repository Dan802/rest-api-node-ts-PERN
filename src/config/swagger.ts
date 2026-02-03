// DOCUMENTATION
import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options : swaggerJSDoc.Options = {
  swaggerDefinition : {
    openapi: '3.0.2',
    tags: [
      {
        name: 'Products', 
        description: 'CRUD products'
      }
    ],
    info: {
      title: 'RES API Node.js / Express / Typescript',
      version: '1.0.0',
      description: 'API Docs for Products'
    }
  },
  apis: ['./src/routes/productsRouter.ts']
}

const swaggeSpec = swaggerJSDoc(options)

const swaggerUiOptions : SwaggerUiOptions = {
  // customCss : `
  // .topbar-wrapper .link {
  //   content: url('https://tse3.mm.bing.net/th/id/OIP.aQMDlIPOBH1HveOfNUlv8gHaE8?rs=1&pid=ImgDetMain&o=7&rm=3');
  //   height: 120px;
  //   width: auto;
  // }`,
  customSiteTitle: 'DOCUMENTATION REST API Express / Typescript'
}

export default swaggeSpec
export {swaggerUiOptions}