import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPromise = open({
  filename: path.join(__dirname, '../database/cybervault.sqlite'),
  driver: sqlite3.Database,
});

export const findUserByUsername = async (username) => {
  const db = await dbPromise;
  return db.get('SELECT id, username, password_hash FROM users WHERE username = ?', username);
};

export const updatePasswordHash = async (username, passwordHash) => {
  const db = await dbPromise;
  return db.run('UPDATE users SET password_hash = ? WHERE username = ?', [passwordHash, username]);
};
