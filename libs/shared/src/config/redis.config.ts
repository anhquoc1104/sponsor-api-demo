import { registerAs } from '@nestjs/config';

export default registerAs('redis', () => ({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
}));
