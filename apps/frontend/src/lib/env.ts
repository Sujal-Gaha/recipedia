export const env = {
  BACKEND_URL: process.env.BACKEND_URL || '',
  FRONTEND_URL: process.env.FRONTEND_URL || '',
  FEATURE_FLAGS: process.env.FEATURE_FLAGS || '',
} as const;
