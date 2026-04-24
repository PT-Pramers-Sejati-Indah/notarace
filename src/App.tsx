import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { OrderSummaryPage } from './pages/OrderSummaryPage';
import { PaymentPage } from './pages/PaymentPage';
import { ResultsPage } from './pages/ResultsPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { FileSignature, User } from 'lucide-react';
import { featureFlags } from './utils/featureFlags';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const Navbar = () => {
  const navigate = useNavigate();
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    // For prototype purposes, reset some state to keep demo clean
    localStorage.removeItem('currentOrder');
    localStorage.removeItem('paymentStatus');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <FileSignature className="text-accent" size={28} />
        Notarace<span className="text-accent">2026</span>
      </Link>
      <div className="flex gap-6 items-center">
        <Link to="/" className="font-medium hover:text-accent">Home</Link>
        {featureFlags.results && <Link to="/results" className="font-medium hover:text-accent">Hasil Lomba</Link>}
        
        {featureFlags.auth && (
          user ? (
            <div className="flex items-center gap-4 ml-4">
              <Link to={user.role === 'admin' ? '/admin' : '/profile'} className="flex items-center gap-2 font-bold text-accent">
                <User size={20} />
                {user.name}
              </Link>
              <button onClick={handleLogout} className="text-sm text-muted hover:text-red-400">Logout</button>
            </div>
          ) : (
            <div className="flex gap-2 ml-4">
              <Link to="/auth" className="btn btn-outline btn-sm">Login / Register</Link>
            </div>
          )
        )}
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {featureFlags.auth && <Route path="/auth" element={<AuthPage />} />}
        {featureFlags.profile && <Route path="/profile" element={<ProfilePage />} />}
        {featureFlags.purchase && <Route path="/buy/:category" element={<OrderSummaryPage />} />}
        {featureFlags.purchase && <Route path="/payment" element={<PaymentPage />} />}
        {featureFlags.results && <Route path="/results" element={<ResultsPage />} />}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
