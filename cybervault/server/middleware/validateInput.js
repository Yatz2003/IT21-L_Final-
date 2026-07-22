export const validateLogin = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || typeof username !== 'string' || username.trim().length < 3) {
    return res.status(400).json({ message: 'Invalid username.' });
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({ message: 'Invalid password.' });
  }

  next();
};
