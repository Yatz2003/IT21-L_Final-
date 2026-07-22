import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const files = ['Employees', 'Reports', 'Secret File', 'Logs'];

const Dashboard = () => {
  const [status, setStatus] = useState('Checking access...');
  const [agentName, setAgentName] = useState('AGENT');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/auth/dashboard', {
          credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) {
          navigate('/');
          return;
        }
        setAgentName(data.username.toUpperCase());
        setStatus('ACCESS GRANTED');
      } catch (err) {
        navigate('/');
      }
    };
    fetchStatus();
  }, [navigate]);

  const handleLogout = async () => {
    await fetch('http://localhost:5000/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    navigate('/');
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-160px)] max-w-6xl flex-col gap-8 px-4 md:px-6">
      <div className="rounded-[2rem] border border-[#10203a] bg-[#101728]/95 p-8 shadow-[0_0_40px_rgba(0,255,153,0.08)] backdrop-blur-xl">
        <div className="mb-8 space-y-4">
          <p className="text-xs uppercase tracking-[0.26em] text-[#00FF99]">WELCOME {agentName}</p>
          <h2 className="text-4xl font-semibold text-[#E5F1FF]">STATUS:</h2>
          <p className="text-2xl font-bold text-[#00F5FF]">{status}</p>
        </div>
        <div className="space-y-5">
          <div className="rounded-3xl border border-[#123354] bg-[#0a1222] p-6">
            <p className="text-xs uppercase tracking-[0.28em] text-[#00FF99]">FILES</p>
            <ul className="mt-4 space-y-3 text-sm text-[#c1d4ff]">
              {files.map((file) => (
                <li key={file} className="rounded-2xl border border-[#173050] bg-[#08111f]/80 px-4 py-3 transition hover:border-[#00F5FF] hover:bg-[#001528]/90">
                  <span className="font-semibold text-[#E5F1FF]">{file}</span>
                  <p className="mt-1 text-xs text-[#7da0c7]">Placeholder data for the classroom challenge.</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-[#123354] bg-[#08111f]/90 p-6 text-sm text-[#7da0c7]">
            <p className="uppercase tracking-[0.2em] text-[#00FF99]">Challenge Note</p>
            <p className="mt-3 leading-7">Observe the dashboard text carefully and look for the clue that rewards curiosity. The hint is meant for students to inspect the page, not to break the server.</p>
          </div>
          <button
            onClick={handleLogout}
            className="w-full rounded-3xl bg-[#00FF99] px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-[#050816] shadow-[0_0_28px_rgba(0,255,153,0.25)] transition hover:-translate-y-0.5 hover:bg-[#6effb3] hover:shadow-[0_0_34px_rgba(0,255,153,0.35)]"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
