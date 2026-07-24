import { findUserByUsername } from '../models/userModel.js';
import { verifyPassword } from '../utils/password.js';

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await findUserByUsername(username.trim().toLowerCase());

  if (!user) {
    return res.status(401).json({ message: 'Access denied. Invalid credentials.' });
  }

  const passwordMatch = await verifyPassword(password, user.password_hash);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Access denied. Invalid credentials.' });
  }

  req.session.user = { id: user.id, username: user.username };
  return res.json({ message: 'Login successful.' });
};

export const getDashboard = (req, res) => {
  return res.json({ username: req.session.user.username });
};

export const getHint = (req, res) => {
  return res.json({
    hint: 'The real credential is protected server-side. The decoys use the alphabet midpoint, so the correct entry is shifted half the alphabet forward.',
  });
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
