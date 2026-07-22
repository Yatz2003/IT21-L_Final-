import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-[#050816] text-[#E5F1FF]">
      <Navbar />
      <main className="px-4 py-8 md:px-10">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
