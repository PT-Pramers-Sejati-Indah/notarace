import React from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { AuthPage } from './pages/AuthPage';
import { ProfilePage } from './pages/ProfilePage';
import { OrderSummaryPage } from './pages/OrderSummaryPage';
import { PaymentPage } from './pages/PaymentPage';
import { ResultsPage } from './pages/ResultsPage';
import { ImageViewerPage } from './pages/ImageViewerPage';
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
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const userStr = localStorage.getItem('user');
  const user = userStr ? JSON.parse(userStr) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('currentOrder');
    localStorage.removeItem('paymentStatus');
    setIsMenuOpen(false);
    navigate('/');
  };

  const closeMenu = () => setIsMenuOpen(false);

  const scrollToSection = (sectionId: string) => () => {
    closeMenu();
    const doScroll = () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(doScroll, 300);
    } else {
      doScroll();
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        <FileSignature className="text-accent" size={28} />
        Notarace<span className="text-accent">2026</span>
      </Link>

      <button className="mobile-menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <span style={{ fontSize: '24px' }}>✕</span> : <span style={{ fontSize: '24px' }}>☰</span>}
      </button>

      <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
        <Link to="/" className="font-medium hover:text-accent" onClick={closeMenu}>Home</Link>
        <button className="navbar-scroll-link" onClick={scrollToSection('timeline')}>Timeline</button>
        <button className="navbar-scroll-link" onClick={scrollToSection('faq')}>FAQ</button>
        {featureFlags.results && <Link to="/results" className="font-medium hover:text-accent" onClick={closeMenu}>Hasil Lomba</Link>}

        {featureFlags.auth && (
          user ? (
            <div className="flex items-center gap-4 user-actions">
              <Link to={user.role === 'admin' ? '/admin' : '/profile'} className="flex items-center gap-2 font-bold text-accent" onClick={closeMenu}>
                <User size={20} />
                {user.name}
              </Link>
              <button onClick={handleLogout} className="text-sm text-muted hover:text-red-400">Logout</button>
            </div>
          ) : (
            <div className="flex gap-2 user-actions">
              <Link to="/auth" className="btn btn-outline btn-sm" onClick={closeMenu}>Login / Register</Link>
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
        {featureFlags.photos && <Route path="/photos" element={<ImageViewerPage />} />}
      </Routes>
    </Router>
  );
}

export default App;
