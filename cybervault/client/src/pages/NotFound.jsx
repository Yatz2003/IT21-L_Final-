import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-4xl flex-col items-center justify-center px-4 text-center text-[#c1d4ff]">
      <h1 className="text-5xl font-bold text-[#00F5FF]">404</h1>
      <p className="mt-4 text-lg">Page not found. The vault redirects only authorized agents.</p>
      <Link
        to="/"
        className="mt-8 inline-block rounded-3xl bg-[#00FF99] px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#050816] shadow-[0_0_24px_rgba(0,255,153,0.20)] transition hover:bg-[#77ffb9]"
      >
        Return to Login
      </Link>
    </div>
  );
};

export default NotFound;
