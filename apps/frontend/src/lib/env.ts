export const env = {
  VITE_BACKEND_URL: import.meta.env.VITE_BACKEND_URL || '',
  VITE_FRONTEND_URL: import.meta.env.VITE_FRONTEND_URL || '',
  VITE_FEATURE_FLAGS: import.meta.env.VITE_FEATURE_FLAGS || '',
} as const;
