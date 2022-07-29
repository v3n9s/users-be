import postgres from 'postgres';
import config from '../config';

export const sql = postgres(config.DATABASE_CONNECTION_URL, {
  transform: {
    column: {
      from: postgres.toCamel,
      to: postgres.fromCamel
    }
  }
});
