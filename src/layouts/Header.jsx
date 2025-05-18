import React, { useState } from 'react';
import styles from './Header.module.css';

function Header({ toggleSidebar, sidebarOpen }) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  return (
    <header className={styles.appHeader}>
      <div className={styles.headerLeft}>
        <button 
          className={styles.sidebarToggle} 
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className={styles.headerTitle}>PragFifty Revenue Backoffice</h1>
      </div>
      
      <div className={styles.headerRight}>
        <div className={styles.notificationBell}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className={styles.notificationBadge}>5</span>
        </div>
        
        <div className={styles.userProfile}>
          <button className={styles.userAvatar} onClick={toggleUserMenu}>
            <div className={styles.avatarPlaceholder}>AD</div>
          </button>
          
          {userMenuOpen && (
            <div className={styles.userMenu}>
              <div className={styles.userInfo}>
                <div className={styles.avatarPlaceholder}>AD</div>
                <div className={styles.userDetails}>
                  <p className={styles.userName}>Admin User</p>
                  <p className={styles.userRole}>Super Admin</p>
                </div>
              </div>
              <div className={styles.menuDivider}></div>
              <ul className={styles.menuItems}>
                <li><a href="#profile">My Profile</a></li>
                <li><a href="#settings">Settings</a></li>
                <li><a href="#login" className={styles.logoutOption}>Logout</a></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header; 