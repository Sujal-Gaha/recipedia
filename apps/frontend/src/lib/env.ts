export const env = {
  BACKEND_URL: import.meta.env.BACKEND_URL || '',
  FRONTEND_URL: import.meta.env.FRONTEND_URL || '',
  FEATURE_FLAGS: import.meta.env.FEATURE_FLAGS || '',
} as const;
