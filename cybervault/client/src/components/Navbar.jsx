import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-10 border-b border-[#13203a] bg-[#050816]/90 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#00F5FF]">
          <span className="inline-block h-9 w-9 rounded-full bg-[#00FF99]/20 text-center leading-9 text-[#00FF99] shadow-[0_0_20px_rgba(0,255,153,0.25)]">CV</span>
          CyberVault
        </Link>
        <div className="hidden sm:flex items-center gap-4 text-xs text-[#a8c4dc]">
          <span className={location.pathname === '/' ? 'text-[#00F5FF]' : ''}>Login</span>
          <span className={location.pathname === '/dashboard' ? 'text-[#00F5FF]' : ''}>Dashboard</span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
