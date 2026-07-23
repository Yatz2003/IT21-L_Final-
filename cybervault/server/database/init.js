import path from 'path';
import { fileURLToPath } from 'url';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { hashPassword, getSeedPassword, verifyPassword } from '../utils/password.js';
import { getFakePasswordHints } from '../utils/fakePasswords.js';

const ROT13_PASSWORD_LIST = [
  'Plo3eInygh!2026$Frq',
  'PeloreInygh!2025',
  'P0q3Z4fg3e!#',
  'C4ffj0eq123',
  'Nqzva$rpher2026',
  'InyghOernxre!9',
  'FunqbXrl!88',
  'Fcrgerer1234',
  'Unpx3eA0g!',
  'TubfgInygh!01',
  'FrpherTngr!42',
  'ZnegvkXrl!7',
  'MrebQnl!2026',
  'DhanhzgYbpx!5',
  'QnexPvcure!77',
  'OveanelYbpx!24',
  'PelcgbGenC!K',
  'CunagbzCnff!3',
  'BoshfP8gr!99',
  'Sveneeyy!8080',
];

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

  // Fake ROT13 password list included for challenge purposes only.
  const fakePasswordHints = getFakePasswordHints();
  console.log('Fake password list (ROT13):', fakePasswordHints.join(', '));

  await db.close();
};

init().catch((error) => {
  console.error('Database initialization failed', error);
  process.exit(1);
});
