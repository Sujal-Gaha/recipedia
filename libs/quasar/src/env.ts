import { z } from 'zod';

type TPinoLogLevel = 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'fatal';
type TEnvironment = 'prod' | 'dev' | 'test';

console.log('ENVIRONMENT', process.env['ENVIRONMENT']);

if (!process.env['ENVIRONMENT']) {
  console.error('ENVIRONMENT is not set');
  process.exit(1);
}

const envSchema = z.object({
  PORT: z.number(),
  WHITELISTED_ORIGINS: z.array(z.string()),
  PINO_LOG_LEVEL: z.enum(['trace', 'debug', 'info', 'warn', 'error', 'fatal']),
  ENVIRONMENT: z.enum(['prod', 'dev', 'test']),
  DATABASE_URL: z.string().min(1),
  AUTH: z.object({
    BETTER_AUTH_SECRET: z.string().min(1),
  }),
  FRONTEND_URL: z.string().min(1),
  BACKEND_URL: z.string().min(1),
});

type TEnv = z.infer<typeof envSchema>;

const env: TEnv = {
  PORT: Number(process.env['PORT']),
  WHITELISTED_ORIGINS: process.env['WHITELISTED_ORIGINS']?.split(',') ?? [],
  PINO_LOG_LEVEL: (process.env['PINO_LOG_LEVEL'] as TPinoLogLevel) ?? 'info',
  ENVIRONMENT: (process.env['ENVIRONMENT'] as TEnvironment) || 'prod',
  DATABASE_URL: process.env['DATABASE_URL'] || '',
  AUTH: {
    BETTER_AUTH_SECRET: process.env['BETTER_AUTH_SECRET'] || '',
  },
  FRONTEND_URL: process.env['FRONTEND_URL'] || '',
  BACKEND_URL: process.env['BACKEND_URL'] || '',
};

const validateEnv = (env: TEnv) => {
  console.log('validating env.....................');
  const result = envSchema.safeParse(env);
  if (!result.success) {
    console.error(result.error.flatten().fieldErrors);
    process.exit(1);
  }
  console.log('env validated.....................', result.data);
};

validateEnv(env);

export { env };
