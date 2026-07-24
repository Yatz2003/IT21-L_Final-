import { findUserByUsername } from '../models/userModel.js';
import { verifyPassword } from '../utils/password.js';

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username.trim().toLowerCase());

  req.session.failedLoginAttempts = (req.session.failedLoginAttempts || 0) + 1;

  if (!user) {
    return res.status(401).json({ message: 'Access denied. Invalid credentials.' });
  }

  const passwordMatch = await verifyPassword(password, user.password_hash);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Access denied. Invalid credentials.' });
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
      'Stored authentication data is hashed and should not be reversible.',
      'Session cookies are the gatekeepers for trusted dashboard access.',
      'Configuration and environment variables are part of the secret handling story.',
    ],
  });
};

export const getFailureHint = (req, res) => {
  const attempts = req.session.failedLoginAttempts || 0;
  let hint = 'The backend logs are not exposed; look for how the server handles credential seed data and session state.';

  if (attempts === 1) {
    hint = 'Your first failed attempt suggests the server is checking the hash. Inspect the seed initialization and how the password is sourced, not the client bundle.';
  } else if (attempts >= 2) {
    hint = 'Repeated failures mean the server is comparing against a stored hash. The secret is derived from backend-only data and environment configuration.';
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
