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

  return getHiddenSeedPassword();
};
