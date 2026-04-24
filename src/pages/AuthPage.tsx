import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { mockApi } from '../services/mockApi';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', dob: '', password: '', confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLogin && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    
    setLoading(true);
    try {
      let user;
      if (isLogin) {
        user = await mockApi.login(formData.email, formData.password);
      } else {
        user = await mockApi.register({ 
          email: formData.email, 
          password: formData.password,
          name: formData.name,
          phone: formData.phone,
          dob: formData.dob
        });
      }
      localStorage.setItem('user', JSON.stringify(user));
      
      const redirect = localStorage.getItem('redirectAfterLogin');
      if (redirect) {
        localStorage.removeItem('redirectAfterLogin');
        navigate(redirect);
      } else if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/profile');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper" style={{ justifyContent: 'center', alignItems: 'center', padding: '2rem 0' }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '450px' }}>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2 text-accent">
            {isLogin ? 'Welcome Back' : 'Join Notarace'}
          </h2>
          <p className="text-muted">
            {isLogin ? 'Login to access your profile and tickets' : 'Create an account to register for the race'}
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input required type="text" name="name" className="form-input" value={formData.name} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input required type="tel" name="phone" className="form-input" value={formData.phone} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label className="form-label">Date of Birth</label>
                <input required type="date" name="dob" className="form-input" value={formData.dob} onChange={handleChange} />
              </div>
            </>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input required type="email" name="email" className="form-input" value={formData.email} onChange={handleChange} />
          </div>
          
          <div className="form-group">
            <label className="form-label flex justify-between">
              Password
              {isLogin && <button type="button" className="text-accent text-sm" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => alert('Forgot password flow (prototype)')}>Lupa Password?</button>}
            </label>
            <input required type="password" name="password" className="form-input" value={formData.password} onChange={handleChange} />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input required type="password" name="confirmPassword" className="form-input" value={formData.confirmPassword} onChange={handleChange} />
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-block mt-4" disabled={loading}>
            {loading ? 'Processing...' : (isLogin ? 'Login' : 'Sign Up')}
          </button>
        </form>

        <div className="mt-6 mb-6" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
          <span className="text-muted text-sm">ATAU</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.1)' }}></div>
        </div>

        <button type="button" className="btn btn-google btn-block" onClick={() => alert('Google login prototype')}>
          <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Lanjutkan dengan Google
        </button>

        <div className="text-center mt-6">
          <p className="text-muted">
            {isLogin ? "Belum punya akun? " : "Sudah punya akun? "}
            <button className="text-accent" style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1rem' }} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Daftar' : 'Login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
