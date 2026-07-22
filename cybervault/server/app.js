import express from 'express';
import session from 'express-session';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import './database/init.js';

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);

app.use(
  session({
    secret: 'cybervault_secret_key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 1000 * 60 * 30,
    },
  })
);

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send({ status: 'CyberVault server running' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`CyberVault server listening on http://localhost:${PORT}`);
});
