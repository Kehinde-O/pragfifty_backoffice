import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';

function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null);
    
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // This would be replaced with an actual API call
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // });
      
      // For now, just simulate login success
      console.log('Login successful:', formData);
      navigate('/dashboard');
      
    } catch (err) {
      setError('Authentication failed. Please check your credentials and try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${styles.authContainer} ${styles.backoffice}`}>
      <div className={styles.authCard}>
        <div className={styles.authBranding}>
          <div className={styles.authLogoContainer}>
            <div className={styles.authLogo}>PF</div>
          </div>
          <h2 className={styles.authTitle}>Revenue Backoffice Portal</h2>
          <p className={styles.authSubtitle}>Administrative and Management System</p>
        </div>
        
        <form className={styles.authForm} onSubmit={handleSubmit}>
          <h2>Administrator Login</h2>
          <p className={styles.formDescription}>
            Access your administrative account to manage the revenue system
          </p>
          
          {error && (
            <div className={styles.errorMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <span>{error}</span>
            </div>
          )}
          
          <div className={styles.formSection}>
            <div className={styles.formGroup}>
              <label htmlFor="username">Username / Email</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username or email"
                required
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="password">Password</label>
              <div className={styles.passwordInputContainer}>
                <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />
                <button 
                  type="button" 
                  onClick={togglePasswordVisibility}
                  className={styles.passwordToggle}
                  aria-label={passwordVisible ? "Hide password" : "Show password"}
                >
                  {passwordVisible ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className={styles.formOptions}>
              <div className={styles.checkboxGroup}>
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                <label htmlFor="rememberMe">Remember Me</label>
              </div>
              <a href="#" className={styles.forgotPassword}>Forgot Password?</a>
            </div>
          </div>
          
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className={styles.spinner}></span>
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                  <polyline points="10 17 15 12 10 7"></polyline>
                  <line x1="15" y1="12" x2="3" y2="12"></line>
                </svg>
                <span>Login to Dashboard</span>
              </>
            )}
          </button>
          
          <div className={styles.formFooter}>
            <p>PragFifty Revenue Backoffice Portal | Admin Use Only</p>
            <div className={styles.footerVersion}>v1.0.0</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage; 