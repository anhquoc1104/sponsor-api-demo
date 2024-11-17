import '@app/shared/utils/dotenv';

export default {
  environment: process.env.EXPRESS_ENVIRONMENT,
  port: process.env.EXPRESS_PORT,

  // helpers
  /*
  isProduction() {
    return this.get('express.environment') === 'production';
  }
  */
};
