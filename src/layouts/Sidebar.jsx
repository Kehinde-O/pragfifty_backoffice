import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Sidebar.module.css';

function Sidebar({ open }) {
  const location = useLocation();
  
  // Track expanded menu sections
  const [expandedSections, setExpandedSections] = useState({
    dashboard: true,
    users: false,
    revenue: false,
    taxpayers: false,
    assessments: false,
    transactions: false,
    reports: false,
    settings: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  // Check if a path is part of the current route (for highlighting parent menu items)
  const isPartOfRoute = (path) => {
    return location.pathname.startsWith(path);
  };

  // Check if any submenu item is active to highlight the parent
  const isSubmenuActive = (section) => {
    switch(section) {
      case 'users':
        return isPartOfRoute('/dashboard/admins') || 
               isPartOfRoute('/dashboard/roles') || 
               isPartOfRoute('/dashboard/user-activity');
      case 'taxpayers':
        return isPartOfRoute('/dashboard/taxpayers/');
      case 'revenue':
        return isPartOfRoute('/dashboard/revenue-heads/');
      case 'assessments':
        return isPartOfRoute('/dashboard/assessments/');
      case 'transactions':
        return isPartOfRoute('/dashboard/transactions/');
      case 'reports':
        return isPartOfRoute('/dashboard/reports/');
      case 'settings':
        return isPartOfRoute('/dashboard/settings/');
      default:
        return false;
    }
  };

  return (
    <nav className={`${styles.sidebar} ${open ? styles.open : styles.collapsed}`}>
      <div className={styles.sidebarHeader}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}>P</div>
          {open && <span className={styles.logoText}>PragFifty</span>}
        </div>
      </div>

      <nav className={styles.sidebarNav}>
        <ul className={styles.menuList}>
          {/* Dashboard */}
          <li className={styles.menuItem}>
            <Link to="/dashboard" className={`${styles.menuLink} ${isActive('/dashboard') ? styles.active : ''}`}>
              <span className={styles.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </span>
              {open && <span className={styles.menuText}>Dashboard</span>}
            </Link>
          </li>

          {/* TCC Application - New main menu item */}
          <li className={styles.menuItem}>
            <Link to="/dashboard/tcc-application" className={`${styles.menuLink} ${isPartOfRoute('/dashboard/tcc-application') ? styles.active : ''}`}>
              <span className={styles.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
              </span>
              {open && <span className={styles.menuText}>TCC Application</span>}
            </Link>
          </li>

          {/* Consolidated Demand Notice - New main menu item */}
          <li className={styles.menuItem}>
            <Link to="/dashboard/consolidated-demand-notice" className={`${styles.menuLink} ${isActive('/dashboard/consolidated-demand-notice') ? styles.active : ''}`}>
              <span className={styles.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                  <path d="M12 11h4"></path>
                  <path d="M12 16h4"></path>
                  <path d="M8 11h.01"></path>
                  <path d="M8 16h.01"></path>
                </svg>
              </span>
              {open && <span className={styles.menuText}>CDN Consolidated Demand Notice</span>}
            </Link>
          </li>

          {/* Bulk Bill Generation - New main menu item */}
          <li className={styles.menuItem}>
            <Link to="/dashboard/bulk-luc-generation" className={`${styles.menuLink} ${isActive('/dashboard/bulk-luc-generation') ? styles.active : ''}`}>
              <span className={styles.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </span>
              {open && <span className={styles.menuText}>Land Use Charge (LUC) Generation</span>}
            </Link>
          </li>

          {/* User Management */}
          <li className={`${styles.menuSection} ${isSubmenuActive('users') ? styles.activeSection : ''}`}>
            <button
              className={`${styles.sectionToggle} ${isSubmenuActive('users') ? styles.active : ''}`}
              onClick={() => toggleSection('users')}
              aria-expanded={expandedSections.users}
            >
              <span className={styles.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              {open && (
                <>
                  <span className={styles.menuText}>User Management</span>
                  <span className={styles.toggleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.users ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.users && (
              <ul className={`${styles.submenu} ${expandedSections.users ? styles.expanded : ''}`}>
                <li><Link to="/dashboard/admins" className={`${styles.submenuLink} ${isActive('/dashboard/admins') ? styles.submenuActive : ''}`}>Admin Users</Link></li>
                <li><Link to="/dashboard/roles" className={`${styles.submenuLink} ${isActive('/dashboard/roles') ? styles.submenuActive : ''}`}>Roles & Permissions</Link></li>
                <li><Link to="/dashboard/user-activity" className={`${styles.submenuLink} ${isActive('/dashboard/user-activity') ? styles.submenuActive : ''}`}>User Activity</Link></li>
              </ul>
            )}
          </li>

          {/* Taxpayer Management */}
          <li className={`${styles.menuSection} ${isSubmenuActive('taxpayers') ? styles.activeSection : ''}`}>
            <button
              className={`${styles.sectionToggle} ${isSubmenuActive('taxpayers') ? styles.active : ''}`}
              onClick={() => toggleSection('taxpayers')}
              aria-expanded={expandedSections.taxpayers}
            >
              <span className={styles.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              {open && (
                <>
                  <span className={styles.menuText}>Taxpayers</span>
                  <span className={styles.toggleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.taxpayers ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.taxpayers && (
              <ul className={`${styles.submenu} ${expandedSections.taxpayers ? styles.expanded : ''}`}>
                <li><Link to="/dashboard/taxpayers/individuals" className={`${styles.submenuLink} ${isActive('/dashboard/taxpayers/individuals') ? styles.submenuActive : ''}`}>Individuals</Link></li>
                <li><Link to="/dashboard/taxpayers/businesses" className={`${styles.submenuLink} ${isActive('/dashboard/taxpayers/businesses') ? styles.submenuActive : ''}`}>Businesses</Link></li>
                {/* <li><Link to="/dashboard/taxpayers/verification" className={`${styles.submenuLink} ${isActive('/dashboard/taxpayers/verification') ? styles.submenuActive : ''}`}>Account Verification</Link></li> */}
                <li><Link to="/dashboard/taxpayers/profiling" className={`${styles.submenuLink} ${isActive('/dashboard/taxpayers/profiling') ? styles.submenuActive : ''}`}>Taxpayer Profiling</Link></li>
              </ul>
            )}
          </li>

          {/* Main Tax Returns menu item */}
          <li className={styles.menuItem}>
            <Link to="/dashboard/tax-returns" className={`${styles.menuLink} ${isActive('/dashboard/tax-returns') ? styles.active : ''}`}>
              <span className={styles.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </span>
              {open && <span className={styles.menuText}>Tax Returns</span>}
            </Link>
          </li>

          {/* Revenue Heads */}
          <li className={`${styles.menuSection} ${isSubmenuActive('revenue') ? styles.activeSection : ''}`}>
            <button
              className={`${styles.sectionToggle} ${isSubmenuActive('revenue') ? styles.active : ''}`}
              onClick={() => toggleSection('revenue')}
              aria-expanded={expandedSections.revenue}
            >
              <span className={styles.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </span>
              {open && (
                <>
                  <span className={styles.menuText}>Revenue Heads</span>
                  <span className={styles.toggleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.revenue ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.revenue && (
              <ul className={`${styles.submenu} ${expandedSections.revenue ? styles.expanded : ''}`}>
                <li><Link to="/dashboard/revenue-heads/state" className={`${styles.submenuLink} ${isActive('/dashboard/revenue-heads/state') ? styles.submenuActive : ''}`}>State Revenue Heads</Link></li>
                <li><Link to="/dashboard/revenue-heads/lga" className={`${styles.submenuLink} ${isActive('/dashboard/revenue-heads/lga') ? styles.submenuActive : ''}`}>LGA Revenue Heads</Link></li>
                <li><Link to="/dashboard/revenue-heads/items" className={`${styles.submenuLink} ${isActive('/dashboard/revenue-heads/items') ? styles.submenuActive : ''}`}>Revenue Items</Link></li>
              </ul>
            )}
          </li>

          {/* Assessments */}
          <li className={`${styles.menuSection} ${isSubmenuActive('assessments') ? styles.activeSection : ''}`}>
            <button
              className={`${styles.sectionToggle} ${isSubmenuActive('assessments') ? styles.active : ''}`}
              onClick={() => toggleSection('assessments')}
              aria-expanded={expandedSections.assessments}
            >
              <span className={styles.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
              </span>
              {open && (
                <>
                  <span className={styles.menuText}>Assessments</span>
                  <span className={styles.toggleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.assessments ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.assessments && (
              <ul className={`${styles.submenu} ${expandedSections.assessments ? styles.expanded : ''}`}>
                <li><Link to="/dashboard/assessments/create" className={`${styles.submenuLink} ${isActive('/dashboard/assessments/create') ? styles.submenuActive : ''}`}>Create Assessment</Link></li>
                <li><Link to="/dashboard/assessments" className={`${styles.submenuLink} ${isActive('/dashboard/assessments') && !isPartOfRoute('/dashboard/assessments/') ? styles.submenuActive : ''}`}>All Assessments</Link></li>
                <li><Link to="/dashboard/assessments/approval" className={`${styles.submenuLink} ${isActive('/dashboard/assessments/approval') ? styles.submenuActive : ''}`}>Pending Approvals</Link></li>
              </ul>
            )}
          </li>

          {/* Transactions */}
          <li className={`${styles.menuSection} ${isSubmenuActive('transactions') ? styles.activeSection : ''}`}>
            <button
              className={`${styles.sectionToggle} ${isSubmenuActive('transactions') ? styles.active : ''}`}
              onClick={() => toggleSection('transactions')}
              aria-expanded={expandedSections.transactions}
            >
              <span className={styles.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </span>
              {open && (
                <>
                  <span className={styles.menuText}>Transactions</span>
                  <span className={styles.toggleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.transactions ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.transactions && (
              <ul className={`${styles.submenu} ${expandedSections.transactions ? styles.expanded : ''}`}>
                <li><Link to="/dashboard/transactions/payments" className={`${styles.submenuLink} ${isActive('/dashboard/transactions/payments') ? styles.submenuActive : ''}`}>Payment History</Link></li>
                <li><Link to="/dashboard/transactions/reconciliation" className={`${styles.submenuLink} ${isActive('/dashboard/transactions/reconciliation') ? styles.submenuActive : ''}`}>Reconciliation</Link></li>
                <li><Link to="/dashboard/transactions/bulk-payments" className={`${styles.submenuLink} ${isActive('/dashboard/transactions/bulk-payments') ? styles.submenuActive : ''}`}>Bulk PAYE Payments</Link></li>
              </ul>
            )}
          </li>

          {/* Reports */}
          <li className={`${styles.menuSection} ${isSubmenuActive('reports') ? styles.activeSection : ''}`}>
            <button
              className={`${styles.sectionToggle} ${isSubmenuActive('reports') ? styles.active : ''}`}
              onClick={() => toggleSection('reports')}
              aria-expanded={expandedSections.reports}
            >
              <span className={styles.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                  <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                </svg>
              </span>
              {open && (
                <>
                  <span className={styles.menuText}>Reports</span>
                  <span className={styles.toggleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.reports ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.reports && (
              <ul className={`${styles.submenu} ${expandedSections.reports ? styles.expanded : ''}`}>
                <li><Link to="/dashboard/reports/collections" className={`${styles.submenuLink} ${isActive('/dashboard/reports/collections') ? styles.submenuActive : ''}`}>Collections Report</Link></li>
                <li><Link to="/dashboard/reports/taxpayer-summary" className={`${styles.submenuLink} ${isActive('/dashboard/reports/taxpayer-summary') ? styles.submenuActive : ''}`}>Taxpayer Summary</Link></li>
                <li><Link to="/dashboard/reports/audit-trail" className={`${styles.submenuLink} ${isActive('/dashboard/reports/audit-trail') ? styles.submenuActive : ''}`}>Audit Trail</Link></li>
                <li>
                  <Link 
                    to="/dashboard/reports/top-mdas" 
                    className={`${styles.submenuLink} ${isActive('/dashboard/reports/top-mdas') ? styles.submenuActive : ''}`}
                  >
                    Top MDAs by Revenue
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/dashboard/reports/top-banks" 
                    className={`${styles.submenuLink} ${isActive('/dashboard/reports/top-banks') ? styles.submenuActive : ''}`}
                  >
                    Top Banks by Revenue
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Settings */}
          <li className={`${styles.menuSection} ${isSubmenuActive('settings') ? styles.activeSection : ''}`}>
            <button
              className={`${styles.sectionToggle} ${isSubmenuActive('settings') ? styles.active : ''}`}
              onClick={() => toggleSection('settings')}
              aria-expanded={expandedSections.settings}
            >
              <span className={styles.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </span>
              {open && (
                <>
                  <span className={styles.menuText}>Settings</span>
                  <span className={styles.toggleIcon}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.settings ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.settings && (
              <ul className={`${styles.submenu} ${expandedSections.settings ? styles.expanded : ''}`}>
                <li><Link to="/dashboard/settings/general" className={`${styles.submenuLink} ${isActive('/dashboard/settings/general') ? styles.submenuActive : ''}`}>General Settings</Link></li>
                <li><Link to="/dashboard/settings/payment-gateways" className={`${styles.submenuLink} ${isActive('/dashboard/settings/payment-gateways') ? styles.submenuActive : ''}`}>Payment Gateways</Link></li>
                <li><Link to="/dashboard/settings/notifications" className={`${styles.submenuLink} ${isActive('/dashboard/settings/notifications') ? styles.submenuActive : ''}`}>Notification Settings</Link></li>
                <li><Link to="/dashboard/settings/lgas" className={`${styles.submenuLink} ${isActive('/dashboard/settings/lgas') ? styles.submenuActive : ''}`}>LGA Management</Link></li>
              </ul>
            )}
          </li>

          {/* Help */}
          <li className={styles.menuItem}>
            <Link to="/dashboard/help" className={`${styles.menuLink} ${isActive('/dashboard/help') ? styles.active : ''}`}>
              <span className={styles.menuIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </span>
              {open && <span className={styles.menuText}>Help & Support</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </nav>
  );
}

export default Sidebar; 