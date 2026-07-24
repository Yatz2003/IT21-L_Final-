const LoginCard = ({ username, password, error, onUsernameChange, onPasswordChange, onSubmit }) => {
  return (
    <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-[#0f172a] bg-[#101728]/90 p-8 text-[#E5F1FF] shadow-[0_0_40px_rgba(0,245,255,0.08)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,245,255,0.18),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(0,255,153,0.14),_transparent_28%)]" />
      <div className="relative space-y-8">
        <div className="space-y-4">
          <div className="text-[#00F5FF]">
            <h1 className="text-3xl font-semibold uppercase tracking-[0.36em]">CyberVault</h1>
            <p className="text-sm text-[#7da0c7]">Only curious minds gain access.</p>
          </div>
          <p className="text-sm text-[#8db4d4]">Hint: Curious observers notice the notes, not the source.</p>
        </div>

        <form className="space-y-6" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="block text-sm uppercase tracking-[0.24em] text-[#00FF99]">Username</label>
            <input
              type="text"
              autoComplete="username"
              value={username}
              onChange={onUsernameChange}
              className="w-full rounded-2xl border border-[#123354] bg-[#0b1225] px-4 py-3 text-sm text-[#E5F1FF] outline-none transition focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20"
              placeholder="Enter your agent alias"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm uppercase tracking-[0.24em] text-[#00FF99]">Password</label>
            <div className="relative">
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={onPasswordChange}
                className="w-full rounded-2xl border border-[#123354] bg-[#0b1225] px-4 py-3 pr-12 text-sm text-[#E5F1FF] outline-none transition focus:border-[#00F5FF] focus:ring-2 focus:ring-[#00F5FF]/20"
                placeholder="••••••••••"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  const input = e.currentTarget.previousElementSibling;
                  if (input) input.type = input.type === 'password' ? 'text' : 'password';
                }}
                aria-label="Toggle password visibility"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8db4d4] hover:text-[#00F5FF]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
          {error && <p className="text-sm text-[#FF6B6B]">{error}</p>}
          <button className="w-full rounded-3xl bg-[#00F5FF] px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#050816] shadow-[0_0_25px_rgba(0,245,255,0.25)] transition hover:-translate-y-0.5 hover:bg-[#00d8ff] hover:shadow-[0_0_32px_rgba(0,245,255,0.35)]">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginCard;
