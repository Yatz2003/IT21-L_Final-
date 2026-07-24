import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [hints, setHints] = useState(['Loading challenge hints...']);
  const navigate = useNavigate();

  const apiBase = import.meta.env.VITE_API_BASE_URL || '';

  useEffect(() => {
    const loadHints = async () => {
      try {
        const response = await fetch(`${apiBase}/api/auth/hint`);
        const data = await response.json();
        setHints(data.hints || ['Inspect the request flow and the server-side validation.']);
      } catch (err) {
        setHints(['Inspect the request flow and the server-side validation.']);
      }
    };
    loadHints();
  }, [apiBase]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required.');
      return;
    }

    try {
      const response = await fetch(`${apiBase}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed.');
        try {
          const failureResponse = await fetch(`${apiBase}/api/auth/hint/failure`, {
            credentials: 'include',
          });
          const failureData = await failureResponse.json();
          if (failureData.hint) {
            setHints((prev) => [...prev, failureData.hint]);
          }
        } catch {
          // keep existing hints if failure hint is unavailable
        }
      }
    } catch (err) {
      setError('Unable to connect to the server.');
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-6xl items-center justify-center px-4 py-6">
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#0f172a] bg-[#101728]/90 p-3 text-[#E5F1FF] shadow-[0_0_40px_rgba(0,245,255,0.08)] backdrop-blur-xl sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,245,255,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,255,153,0.14),_transparent_28%)]" />
        <div className="relative space-y-8">
          <div className="space-y-4">
            <div className="text-[#00F5FF]">
              <h1 className="text-base font-semibold uppercase tracking-tight sm:text-4xl sm:tracking-[0.36em] text-center leading-tight break-words">CyberVault</h1>
              <p className="text-sm text-[#7da0c7]">Secure access begins with a careful eye.</p>
            </div>
            <div className="space-y-2 text-[#8db4d4]">
              <p className="text-sm">Challenge hints:</p>
              <ul className="list-disc list-inside space-y-1 text-xs">
                {hints.map((hintItem, index) => (
                  <li key={index}>{hintItem}</li>
                ))}
              </ul>
            </div>
          </div>

          {!showLogin ? (
            <div className="flex justify-center">
              <button
                onClick={() => setShowLogin(true)}
                className="rounded-3xl bg-[#00F5FF] px-8 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#050816] shadow-[0_0_25px_rgba(0,245,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#00d8ff] hover:shadow-[0_0_32px_rgba(0,245,255,0.35)]"
              >
                Begin
              </button>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className="block text-sm uppercase tracking-[0.24em] text-[#00FF99]">Username</label>
                <input
                  type="text"
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full rounded-2xl border border-[#123354] bg-[#0b1225] px-4 py-3 text-sm text-[#E5F1FF] outline-none transition focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20"
                  placeholder="Enter your agent alias"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm uppercase tracking-[0.24em] text-[#00FF99]">Password</label>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-[#123354] bg-[#0b1225] px-4 py-3 text-sm text-[#E5F1FF] outline-none transition focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20"
                  placeholder="••••••••••"
                />
              </div>
              {error && <p className="text-sm text-[#FF6B6B]">{error}</p>}
              <button className="w-full rounded-3xl bg-[#00F5FF] px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#050816] shadow-[0_0_25px_rgba(0,245,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#00d8ff] hover:shadow-[0_0_32px_rgba(0,245,255,0.35)]">
                Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
