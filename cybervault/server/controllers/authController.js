import { findUserByUsername } from '../models/userModel.js';
import { verifyPassword } from '../utils/password.js';

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username.trim().toLowerCase());

  if (!user) {
    req.session.failedLoginAttempts = (req.session.failedLoginAttempts || 0) + 1;
    return res.status(401).json({ message: 'Access denied. Invalid credentials.' });
  }

  const passwordMatch = await verifyPassword(password, user.password_hash);
  if (!passwordMatch) {
    req.session.failedLoginAttempts = (req.session.failedLoginAttempts || 0) + 1;
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
  let hint = 'Backend logs are not exposed; inspect server-side initialization and session handling.';

  if (attempts === 1) {
    hint = 'The server validates credentials by comparing hashed values. Check how the default user is initialized and where the seed password is sourced (server-side configuration or environment).' ;
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
