import 'dotenv/config';

const config = {
  DATABASE_CONNECTION_URL: process.env.DATABASE_CONNECTION_URL!,
  JWT_SECRET: process.env.JWT_SECRET!
};

const emptyVars = Object.entries(config).filter(([, value]) => !value);

if (emptyVars.length) {
  throw new Error(`config variables [${emptyVars.map(([key]) => key).join(', ')}] are undefined`);
}

export default config;
