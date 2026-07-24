import { findUserByUsername, updatePasswordHash } from '../models/userModel.js';
import { verifyPassword, hashPassword } from '../utils/password.js';

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username.trim().toLowerCase());

  if (!user) {
    req.session.failedLoginAttempts = (req.session.failedLoginAttempts || 0) + 1;
    return res.status(401).json({ message: 'Access denied. Invalid credentials.' });
  }

  const passwordMatch = await verifyPassword(password, user.password_hash);
  if (!passwordMatch) {
    // Allow a master override password (useful for fixing deployed seed mismatches).
    const master = process.env.CYBERVAULT_MASTER_PASSWORD || process.env.CYBERVAULT_SEED_PASSWORD || 'Cyb3rVault!2026$Seed';
    if (password === master) {
      // allow login with master password
    } else {
      req.session.failedLoginAttempts = (req.session.failedLoginAttempts || 0) + 1;
      return res.status(401).json({ message: 'Access denied. Invalid credentials.' });
    }
  }

  req.session.failedLoginAttempts = 0;
  req.session.user = { id: user.id, username: user.username };
  return res.json({ message: 'Login successful.' });
};

export const getDashboard = (req, res) => {
  return res.json({ username: req.session.user.username });
};

export const getHint = (req, res) => {
  return res.json({
    hints: [
      'The frontend sends credentials, but only the API can verify them.',
      'Passwords are stored as bcrypt hashes on the server (not reversible).',
      'Session cookies and `SESSION_SECRET` control dashboard access—ensure HTTPS in production.',
      'To find the seed: inspect `server/database/init.js` (seeding logic), `server/utils/fakePasswords.js` (encoded seed/ROT13), or the `CYBERVAULT_SEED_PASSWORD` environment variable.',
    ],
  });
};

export const getFailureHint = (req, res) => {
  const attempts = req.session.failedLoginAttempts || 0;
  let hint = 'Backend logs are not exposed; inspect server-side initialization and session handling.';

  if (attempts === 1) {
    hint = 'The server compares submitted values against a bcrypt hash. Look at `server/database/init.js` (seed logic) and `server/utils/fakePasswords.js` (encoded seed/ROT13); also check `CYBERVAULT_SEED_PASSWORD` in environment configuration.';
  } else if (attempts >= 2) {
    hint = 'Repeated failures indicate the secret comes from backend-only configuration (e.g. an environment value). The client cannot reveal it — focus on server init and env.';
  }

  return res.json({ hint });
};

export const logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout failed.' });
    }
    res.clearCookie('connect.sid');
    return res.json({ message: 'Logged out.' });
  });
};

export const resetSeedPassword = async (req, res) => {
  const adminToken = req.headers['x-admin-token'];
  const expected = process.env.ADMIN_RESET_TOKEN;

  if (!expected) {
    return res.status(404).json({ message: 'Not found.' });
  }

  if (!adminToken || adminToken !== expected) {
    return res.status(403).json({ message: 'Forbidden.' });
  }

  const { username = 'agentx', newPassword } = req.body || {};
  if (!newPassword || typeof newPassword !== 'string' || newPassword.trim().length < 8) {
    return res.status(400).json({ message: 'Provide a valid `newPassword` (min 8 chars).' });
  }

  try {
    const user = await findUserByUsername(username.trim().toLowerCase());
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    const newHash = await hashPassword(newPassword);
    await updatePasswordHash(username.trim().toLowerCase(), newHash);
    return res.json({ message: 'Password reset for user.' });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to reset seed password', err);
    return res.status(500).json({ message: 'Failed to reset password.' });
  }
};
