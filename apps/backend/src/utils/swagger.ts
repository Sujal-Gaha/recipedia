import { generateOpenApi } from '@ts-rest/open-api';
import { contract } from '@libs/contract';

// we need to use the main contract to generate the OpenAPI spec for all routes
export const openApiDocument = generateOpenApi(contract, {
  info: {
    title: 'Recipedia API',
    version: '1.0.0',
  },
  security: [{ bearerAuth: [] }], // Apply security globally
  components: {
    securitySchemes: {
      customHeaderAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-access-token', // Define custom header name
        description: 'Access token',
      },
    },
  },
});
