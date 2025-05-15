import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

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

  return (
    <aside className={`sidebar ${open ? 'open' : 'collapsed'}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo">PF</div>
          {open && <span className="logo-text">PragFifty</span>}
        </div>
      </div>

      <nav className="sidebar-nav">
        <ul className="menu-list">
          {/* Dashboard */}
          <li className="menu-item">
            <Link to="/dashboard" className={`menu-link ${isActive('/dashboard') ? 'active' : ''}`}>
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </span>
              {open && <span className="menu-text">Dashboard</span>}
            </Link>
          </li>

          {/* TCC Application - New main menu item */}
          <li className="menu-item">
            <Link to="/dashboard/tcc-application" className={`menu-link ${isActive('/dashboard/tcc-application') ? 'active' : ''}`}>
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
              </span>
              {open && <span className="menu-text">TCC Application</span>}
            </Link>
          </li>

          {/* Consolidated Demand Notice - New main menu item */}
          <li className="menu-item">
            <Link to="/dashboard/consolidated-demand-notice" className={`menu-link ${isActive('/dashboard/consolidated-demand-notice') ? 'active' : ''}`}>
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </span>
              {open && <span className="menu-text">Demand Notice</span>}
            </Link>
          </li>

          {/* Bulk Bill Generation - New main menu item */}
          <li className="menu-item">
            <Link to="/dashboard/bulk-bill-generation" className={`menu-link ${isActive('/dashboard/bulk-bill-generation') ? 'active' : ''}`}>
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </span>
              {open && <span className="menu-text">Bulk Bill Generation</span>}
            </Link>
          </li>

          {/* User Management */}
          <li className="menu-section">
            <button
              className="section-toggle"
              onClick={() => toggleSection('users')}
              aria-expanded={expandedSections.users}
            >
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </span>
              {open && (
                <>
                  <span className="menu-text">User Management</span>
                  <span className="toggle-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.users ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.users && (
              <ul className="submenu">
                <li><Link to="/dashboard/admins" className={isActive('/dashboard/admins') ? 'active' : ''}>Admin Users</Link></li>
                <li><Link to="/dashboard/roles" className={isActive('/dashboard/roles') ? 'active' : ''}>Roles & Permissions</Link></li>
                <li><Link to="/dashboard/user-activity" className={isActive('/dashboard/user-activity') ? 'active' : ''}>User Activity</Link></li>
              </ul>
            )}
          </li>

          {/* Taxpayer Management */}
          <li className="menu-section">
            <button
              className="section-toggle"
              onClick={() => toggleSection('taxpayers')}
              aria-expanded={expandedSections.taxpayers}
            >
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </span>
              {open && (
                <>
                  <span className="menu-text">Taxpayers</span>
                  <span className="toggle-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.taxpayers ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.taxpayers && (
              <ul className="submenu">
                <li><Link to="/dashboard/taxpayers/individuals" className={isActive('/dashboard/taxpayers/individuals') ? 'active' : ''}>Individuals</Link></li>
                <li><Link to="/dashboard/taxpayers/businesses" className={isActive('/dashboard/taxpayers/businesses') ? 'active' : ''}>Businesses</Link></li>
                <li><Link to="/dashboard/taxpayers/verification" className={isActive('/dashboard/taxpayers/verification') ? 'active' : ''}>Account Verification</Link></li>
                <li><Link to="/dashboard/taxpayers/profiling" className={isActive('/dashboard/taxpayers/profiling') ? 'active' : ''}>Taxpayer Profiling</Link></li>
              </ul>
            )}
          </li>

          {/* Main Tax Returns menu item */}
          <li className="menu-item">
            <Link to="/dashboard/tax-returns" className={`menu-link ${isActive('/dashboard/tax-returns') ? 'active' : ''}`}>
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                </svg>
              </span>
              {open && <span className="menu-text">Tax Returns</span>}
            </Link>
          </li>

          {/* Revenue Heads */}
          <li className="menu-section">
            <button
              className="section-toggle"
              onClick={() => toggleSection('revenue')}
              aria-expanded={expandedSections.revenue}
            >
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="16"></line>
                  <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
              </span>
              {open && (
                <>
                  <span className="menu-text">Revenue Heads</span>
                  <span className="toggle-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.revenue ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.revenue && (
              <ul className="submenu">
                <li><Link to="/dashboard/revenue-heads/state" className={isActive('/dashboard/revenue-heads/state') ? 'active' : ''}>State Revenue Heads</Link></li>
                <li><Link to="/dashboard/revenue-heads/lga" className={isActive('/dashboard/revenue-heads/lga') ? 'active' : ''}>LGA Revenue Heads</Link></li>
                <li><Link to="/dashboard/revenue-heads/manage" className={isActive('/dashboard/revenue-heads/manage') ? 'active' : ''}>Manage Revenue Heads</Link></li>
              </ul>
            )}
          </li>

          {/* Assessments */}
          <li className="menu-section">
            <button
              className="section-toggle"
              onClick={() => toggleSection('assessments')}
              aria-expanded={expandedSections.assessments}
            >
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                </svg>
              </span>
              {open && (
                <>
                  <span className="menu-text">Assessments</span>
                  <span className="toggle-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.assessments ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.assessments && (
              <ul className="submenu">
                <li><Link to="/dashboard/assessments/create" className={isActive('/dashboard/assessments/create') ? 'active' : ''}>Create Assessment</Link></li>
                <li><Link to="/dashboard/assessments/pending" className={isActive('/dashboard/assessments/pending') ? 'active' : ''}>Pending Assessments</Link></li>
                <li><Link to="/dashboard/assessments/self" className={isActive('/dashboard/assessments/self') ? 'active' : ''}>Self-Assessment Review</Link></li>
                <li><Link to="/dashboard/assessments/manage" className={isActive('/dashboard/assessments/manage') ? 'active' : ''}>Manage Assessments</Link></li>
              </ul>
            )}
          </li>

          {/* Transactions */}
          <li className="menu-section">
            <button
              className="section-toggle"
              onClick={() => toggleSection('transactions')}
              aria-expanded={expandedSections.transactions}
            >
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
              </span>
              {open && (
                <>
                  <span className="menu-text">Transactions</span>
                  <span className="toggle-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.transactions ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.transactions && (
              <ul className="submenu">
                <li><Link to="/dashboard/transactions/payments" className={isActive('/dashboard/transactions/payments') ? 'active' : ''}>Payment History</Link></li>
                <li><Link to="/dashboard/transactions/reconciliation" className={isActive('/dashboard/transactions/reconciliation') ? 'active' : ''}>Reconciliation</Link></li>
                <li><Link to="/dashboard/transactions/bulk-payments" className={isActive('/dashboard/transactions/bulk-payments') ? 'active' : ''}>Bulk PAYE Payments</Link></li>
              </ul>
            )}
          </li>

          {/* Reports */}
          <li className="menu-section">
            <button
              className="section-toggle"
              onClick={() => toggleSection('reports')}
              aria-expanded={expandedSections.reports}
            >
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path>
                  <path d="M22 12A10 10 0 0 0 12 2v10z"></path>
                </svg>
              </span>
              {open && (
                <>
                  <span className="menu-text">Reports</span>
                  <span className="toggle-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.reports ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.reports && (
              <ul className="submenu">
                <li><Link to="/dashboard/reports/collections" className={isActive('/dashboard/reports/collections') ? 'active' : ''}>Collections Report</Link></li>
                <li><Link to="/dashboard/reports/taxpayer-summary" className={isActive('/dashboard/reports/taxpayer-summary') ? 'active' : ''}>Taxpayer Summary</Link></li>
                <li><Link to="/dashboard/reports/audit-trail" className={isActive('/dashboard/reports/audit-trail') ? 'active' : ''}>Audit Trail</Link></li>
                <li>
                  <Link 
                    to="/dashboard/reports/top-mdas" 
                    className={isActive('/dashboard/reports/top-mdas') ? 'active' : ''}
                  >
                    Top MDAs by Revenue
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/dashboard/reports/top-banks" 
                    className={isActive('/dashboard/reports/top-banks') ? 'active' : ''}
                  >
                    Top Banks by Revenue
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Settings */}
          <li className="menu-section">
            <button
              className="section-toggle"
              onClick={() => toggleSection('settings')}
              aria-expanded={expandedSections.settings}
            >
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"></circle>
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                </svg>
              </span>
              {open && (
                <>
                  <span className="menu-text">Settings</span>
                  <span className="toggle-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points={expandedSections.settings ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
                    </svg>
                  </span>
                </>
              )}
            </button>
            {open && expandedSections.settings && (
              <ul className="submenu">
                <li><Link to="/dashboard/settings/general" className={isActive('/dashboard/settings/general') ? 'active' : ''}>General Settings</Link></li>
                <li><Link to="/dashboard/settings/payment-gateways" className={isActive('/dashboard/settings/payment-gateways') ? 'active' : ''}>Payment Gateways</Link></li>
                <li><Link to="/dashboard/settings/notifications" className={isActive('/dashboard/settings/notifications') ? 'active' : ''}>Notification Settings</Link></li>
                <li><Link to="/dashboard/settings/lgas" className={isActive('/dashboard/settings/lgas') ? 'active' : ''}>LGA Management</Link></li>
              </ul>
            )}
          </li>

          {/* Help */}
          <li className="menu-item">
            <Link to="/dashboard/help" className={`menu-link ${isActive('/dashboard/help') ? 'active' : ''}`}>
              <span className="menu-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
              </span>
              {open && <span className="menu-text">Help & Support</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar; 