export const configMongo = (configService) => {
  const uri =
    configService.get('NODE_ENV') === 'development'
      ? configService.get('MONGODB_URI_DEV')
      : configService.get('MONGODB_URI_LOCAL');

  return {
    uri,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
};
