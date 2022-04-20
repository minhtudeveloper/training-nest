export const Environment = () => {
  return {
    PORT: String(process.env.PORT),
    MONGODB_URI: String(
      process.env.NODE_ENV === 'development'
        ? process.env.MONGODB_URI_DEV
        : process.env.MONGODB_URI_LOCAL,
    ),
    TOKEN_LIFE: String(process.env.TOKEN_LIFE),
    TOKEN_SECRET: String(process.env.TOKEN_SECRET),
    URL_FE: String(process.env.URL_FE || ''),
    MAIL_USER: String(process.env.MAIL_USER || ''),
    MAIL_PASS: String(process.env.MAIL_PASS || ''),
    GOOGLE_CLIENT_ID: String(process.env.GOOGLE_CLIENT_ID || ''),
    GOOGLE_CLIENT_SECRET: String(process.env.GOOGLE_CLIENT_SECRET || ''),
  };
};
