import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { hashPassword, getSeedPassword, verifyPassword } from '../utils/password.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATABASE_FILE = path.join(__dirname, 'cybervault.sqlite');

const init = async () => {
  const db = await open({ filename: DATABASE_FILE, driver: sqlite3.Database });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL
    );
  `);

  const existing = await db.get('SELECT id, password_hash FROM users WHERE username = ?', 'agentx');
  if (!existing) {
    const seedPassword = getSeedPassword();
    const passwordHash = await hashPassword(seedPassword);
    await db.run('INSERT INTO users (username, password_hash) VALUES (?, ?)', ['agentx', passwordHash]);
    console.log('Seeded default user: agentx');
  } else {
    const seedPassword = getSeedPassword();
    const isCurrentPassword = await verifyPassword(seedPassword, existing.password_hash);
    if (!isCurrentPassword) {
      const passwordHash = await hashPassword(seedPassword);
      await db.run('UPDATE users SET password_hash = ? WHERE username = ?', [passwordHash, 'agentx']);
      console.log('Updated password hash for default user: agentx');
    }
  }

  await db.close();
};

init().catch((error) => {
  console.error('Database initialization failed', error);
  process.exit(1);
});
