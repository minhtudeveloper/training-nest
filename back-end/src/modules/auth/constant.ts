import { ENV as env } from '@/config';

export const jwtConstants = {
  secret: env().TOKEN_SECRET,
  timeLife : env().TOKEN_LIFE
};
