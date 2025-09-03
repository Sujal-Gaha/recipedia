import express from 'express';
import cors from 'cors';
import { generateEndPoints } from './routers/merge';
import { errorHandler, logger, loggerMiddleware, notFoundHandler, env, __STATIC_PATH } from '@libs/quasar';
import compression from 'compression';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import * as swaggerUi from 'swagger-ui-express';
import { openApiDocument } from './utils/swagger';
import { createAuth } from '@libs/auth';

logger.debug(env, 'Environment variables');

const app = express();

app.use(compression());

app.use(helmet());

app.use(
  cors({
    origin: function (origin, callback) {
      logger.debug(`Origin: ${origin}`);
      if (!origin || env.WHITELISTED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(loggerMiddleware);

app.get('/ping', async (req, res) => {
  res.status(200).json({
    message: 'Hi! stranger',
  });
});

app.use((req, res, next) => {
  logger.debug({ body: req.body }, 'Request body');
  next();
});

createAuth(app);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocument));
app.use('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(openApiDocument);
  res.end();
});

/**
 * serve the static files
 * url sample is: http://localhost:4000/static/1739891107482-1913365.webp
 */
app.use(
  '/static',
  (req, res, next) => {
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    res.setHeader('Cross-Origin-Embedder-Policy', 'unsafe-none');
    next();
  },
  express.static(__STATIC_PATH),
  cors({
    origin: function (origin, callback) {
      logger.debug(`Origin: ${origin}`);
      if (!origin || env.WHITELISTED_ORIGINS.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);

generateEndPoints(app);

app.use(notFoundHandler);

app.use(errorHandler);

const server = app.listen(env.PORT, () => {
  console.log(`[ ready ] http://localhost:${env.PORT}`);
});

process.on('SIGTERM', () => {
  console.debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.debug('HTTP server closed');
  });
});

process.on('SIGINT', () => {
  console.debug('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    console.debug('HTTP server closed');
  });
});
