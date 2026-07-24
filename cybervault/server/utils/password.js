import bcrypt from 'bcrypt';
import { getHiddenSeedPassword } from './fakePasswords.js';

const SALT_ROUNDS = 12;

export const hashPassword = async (password) => {
  return bcrypt.hash(password, SALT_ROUNDS);
};

export const verifyPassword = async (password, passwordHash) => {
  return bcrypt.compare(password, passwordHash);
};

export const getSeedPassword = () => {
  const configuredPassword = process.env.CYBERVAULT_SEED_PASSWORD;
  if (configuredPassword && configuredPassword.trim()) {
    return configuredPassword.trim();
  }
  // During local development, provide a predictable seed so testers can log in
  // without changing environment variables. In production this will use the
  // hidden encoded seed or an explicit CYBERVAULT_SEED_PASSWORD.
  if (process.env.NODE_ENV !== 'production') {
    const devSeed = 'DevLoginPassword!2026';
    // eslint-disable-next-line no-console
    console.warn('Using development seed password for agentx. Set CYBERVAULT_SEED_PASSWORD in production to override.');
    return devSeed;
  }

  return getHiddenSeedPassword();
};
