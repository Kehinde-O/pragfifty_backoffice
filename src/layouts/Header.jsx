import React, { useState } from 'react';
import './Header.css';

function Header({ toggleSidebar, sidebarOpen }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <button 
          className="sidebar-toggle" 
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="header-title">PragFifty Revenue Backoffice</h1>
      </div>
      
      <div className="header-right">
        <div className="notification-bell">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="notification-badge">5</span>
        </div>
        
        <div className="user-profile">
          <button className="user-avatar" onClick={toggleUserMenu}>
            <div className="avatar-placeholder">AD</div>
          </button>
          
          {userMenuOpen && (
            <div className="user-menu">
              <div className="user-info">
                <div className="avatar-placeholder">AD</div>
                <div className="user-details">
                  <p className="user-name">Admin User</p>
                  <p className="user-role">Super Admin</p>
                </div>
              </div>
              <div className="menu-divider"></div>
              <ul className="menu-items">
                <li><a href="#profile">My Profile</a></li>
                <li><a href="#settings">Settings</a></li>
                <li><a href="#login" className="logout-option">Logout</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header; 