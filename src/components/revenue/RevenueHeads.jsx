import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FiDollarSign, FiSearch, FiPlus, FiArrowRight,
  FiFileText, FiFilter, FiRefreshCw, FiChevronRight,
  FiMapPin, FiPackage, FiBarChart2, FiActivity
} from 'react-icons/fi';
import './RevenueHeads.css';

const RevenueHeads = () => {
  const [stats, setStats] = useState({
    stateRevenueHeads: 0,
    lgaRevenueHeads: 0,
    revenueItems: 0,
    activeRevenueHeads: 0,
    totalRevenue: 0
  });
  const [topRevenueHeads, setTopRevenueHeads] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data fetching - replace with API calls
  const fetchStats = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setStats({
        stateRevenueHeads: 12,
        lgaRevenueHeads: 24,
        revenueItems: 75,
        activeRevenueHeads: 30,
        totalRevenue: 58750000.00
      });

      setTopRevenueHeads([
        { id: 1, name: 'Personal Income Tax', code: 'PIT-001', type: 'Tax', source: 'State', revenue: 25000000.00 },
        { id: 2, name: 'Company Income Tax', code: 'CIT-001', type: 'Tax', source: 'State', revenue: 15000000.00 },
        { id: 3, name: 'Value Added Tax', code: 'VAT-001', type: 'Tax', source: 'State', revenue: 10000000.00 },
        { id: 4, name: 'Market Stall Fee', code: 'MSF-001', type: 'Fee', source: 'LGA (Bida)', revenue: 3000000.00 },
        { id: 5, name: 'Property Tax', code: 'PRT-001', type: 'Tax', source: 'State', revenue: 5000000.00 }
      ]);

      setRecentActivity([
        { id: 1, action: 'Added new revenue item', description: 'Added "Business Complex Fee" under Business Premises Levy', user: 'admin@example.com', date: '2023-11-18T10:30:15Z' },
        { id: 2, action: 'Updated revenue head', description: 'Updated base amount for "Capital Gains Tax" from ₦10,000 to ₦12,500', user: 'admin@example.com', date: '2023-11-17T15:20:45Z' },
        { id: 3, action: 'Deactivated revenue head', description: 'Deactivated "Radio License Fee" under LGA Revenue', user: 'manager@example.com', date: '2023-11-15T09:30:00Z' },
        { id: 4, action: 'Added new revenue head', description: 'Added "Tourism Development Levy" to State Revenue Heads', user: 'finance@example.com', date: '2023-11-12T14:15:00Z' }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    } catch(e) {
      return dateString;
    }
  };

  return (
    <div className="revenue-heads-container">
      <div className="page-header">
        <h1><FiDollarSign className="page-header-icon" /> Revenue Heads Management</h1>
      </div>

      {loading ? (
        <div className="loading-indicator">
          <FiRefreshCw className="spinning" />
          <p>Loading revenue data...</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon state-icon">
                <FiDollarSign size={24} />
              </div>
              <div className="stat-content">
                <h3>State Revenue Heads</h3>
                <p className="stat-value">{stats.stateRevenueHeads}</p>
                <Link to="/dashboard/revenue-heads/state" className="stat-link">
                  Manage <FiChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon lga-icon">
                <FiMapPin size={24} />
              </div>
              <div className="stat-content">
                <h3>LGA Revenue Heads</h3>
                <p className="stat-value">{stats.lgaRevenueHeads}</p>
                <Link to="/dashboard/revenue-heads/lga" className="stat-link">
                  Manage <FiChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon items-icon">
                <FiPackage size={24} />
              </div>
              <div className="stat-content">
                <h3>Revenue Items</h3>
                <p className="stat-value">{stats.revenueItems}</p>
                <Link to="/dashboard/revenue-heads/items" className="stat-link">
                  Manage <FiChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon revenue-icon">
                <FiBarChart2 size={24} />
              </div>
              <div className="stat-content">
                <h3>Total Revenue</h3>
                <p className="stat-value">{formatCurrency(stats.totalRevenue)}</p>
                <Link to="/dashboard/reports/collections" className="stat-link">
                  View Reports <FiChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Top Revenue Heads */}
          <div className="section">
            <div className="section-header">
              <h2><FiBarChart2 className="section-icon" /> Top Revenue Heads</h2>
              <Link to="/dashboard/reports/top-revenue" className="view-all-link">
                View All <FiArrowRight size={14} />
              </Link>
            </div>
            <div className="table-container">
              <table className="revenue-heads-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Type</th>
                    <th>Source</th>
                    <th>Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {topRevenueHeads.map(head => (
                    <tr key={head.id}>
                      <td>{head.name}</td>
                      <td>{head.code}</td>
                      <td>{head.type}</td>
                      <td>{head.source}</td>
                      <td>{formatCurrency(head.revenue)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="section">
            <div className="section-header">
              <h2><FiActivity className="section-icon" /> Recent Activity</h2>
              <Link to="/dashboard/reports/audit-trail" className="view-all-link">
                View All <FiArrowRight size={14} />
              </Link>
            </div>
            <div className="activity-list">
              {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    <FiDollarSign />
                  </div>
                  <div className="activity-content">
                    <h4>{activity.action}</h4>
                    <p className="activity-description">{activity.description}</p>
                    <div className="activity-meta">
                      <span className="activity-user">{activity.user}</span>
                      <span className="activity-date">{formatDateTime(activity.date)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            <Link to="/dashboard/revenue-heads/state" className="action-button">
              <FiPlus size={16} /> Add State Revenue Head
            </Link>
            <Link to="/dashboard/revenue-heads/lga" className="action-button">
              <FiPlus size={16} /> Add LGA Revenue Head
            </Link>
            <Link to="/dashboard/revenue-heads/items" className="action-button">
              <FiPlus size={16} /> Add Revenue Item
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default RevenueHeads; 