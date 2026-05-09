const env = {
  API_URL: import.meta.env.VITE_API_URL as string,
  JITSI_DOMAIN: import.meta.env.VITE_JITSI_DOMAIN as string,
  IS_DEV: import.meta.env.DEV,
  IS_PROD: import.meta.env.PROD,
} as const;

export default env;
