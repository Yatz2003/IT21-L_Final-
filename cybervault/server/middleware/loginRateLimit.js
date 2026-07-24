const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;
const attempts = new Map();

export const loginRateLimit = (req, res, next) => {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection?.remoteAddress || 'unknown';
  const now = Date.now();
  const record = attempts.get(ip) || { count: 0, firstAttempt: now };

  if (now - record.firstAttempt > WINDOW_MS) {
    record.count = 0;
    record.firstAttempt = now;
  }

  record.count += 1;
  attempts.set(ip, record);

  if (record.count > MAX_ATTEMPTS) {
    return res.status(429).json({ message: 'Too many login attempts. Try again later.' });
  }

  next();
};
