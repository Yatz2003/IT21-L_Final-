export const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim().length < 3) {
    return res.status(400).json({ message: 'Invalid username.' });
  }

  if (!password || typeof password !== 'string' || password.length < 12) {
    return res.status(400).json({ message: 'Password must be at least 12 characters.' });
  }

  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
    return res.status(400).json({ message: 'Password must include uppercase, lowercase, number, and symbol.' });
  }

  next();
};
