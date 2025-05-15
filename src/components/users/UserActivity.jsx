import React, { useState, useEffect } from 'react';
import { 
  FiActivity, FiSearch, FiFilter, FiDownload, FiRefreshCw,
  FiCalendar, FiUser, FiClock, FiMapPin, FiMonitor, FiLogIn, FiLogOut, FiKey, FiEdit2, FiFileText, FiFilePlus
} from 'react-icons/fi';
import './UserActivity.css';

const UserActivity = () => {
  // State for activity logs
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    activity: 'all',
    timeRange: 'all'
  });
  
  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockActivityLogs = [
        { 
          id: 1, 
          userId: 1,
          userName: 'John Doe', 
          action: 'login', 
          timestamp: '2023-11-15T10:30:00',
          ipAddress: '192.168.1.45',
          device: 'Chrome / Windows' 
        },
        { 
          id: 2, 
          userId: 2,
          userName: 'Jane Smith', 
          action: 'logout', 
          timestamp: '2023-11-15T09:45:00',
          ipAddress: '192.168.1.62',
          device: 'Safari / macOS' 
        },
        { 
          id: 3, 
          userId: 1,
          userName: 'John Doe', 
          action: 'update_profile', 
          timestamp: '2023-11-14T14:22:00',
          ipAddress: '192.168.1.45',
          device: 'Chrome / Windows' 
        },
        { 
          id: 4, 
          userId: 3,
          userName: 'Robert Johnson', 
          action: 'password_change', 
          timestamp: '2023-11-14T11:10:00',
          ipAddress: '192.168.1.78',
          device: 'Firefox / Ubuntu' 
        },
        { 
          id: 5, 
          userId: 4,
          userName: 'Sarah Williams', 
          action: 'login', 
          timestamp: '2023-11-13T16:40:00',
          ipAddress: '192.168.1.90',
          device: 'Edge / Windows' 
        },
        { 
          id: 6, 
          userId: 5,
          userName: 'Michael Brown', 
          action: 'create_record', 
          timestamp: '2023-11-13T09:15:00',
          ipAddress: '192.168.1.102',
          device: 'Chrome / Android' 
        },
        { 
          id: 7, 
          userId: 2,
          userName: 'Jane Smith', 
          action: 'login', 
          timestamp: '2023-11-12T08:30:00',
          ipAddress: '192.168.1.62',
          device: 'Safari / iOS' 
        },
        { 
          id: 8, 
          userId: 1,
          userName: 'John Doe', 
          action: 'export_report', 
          timestamp: '2023-11-12T11:25:00',
          ipAddress: '192.168.1.45',
          device: 'Chrome / Windows' 
        }
      ];
      
      setActivityLogs(mockActivityLogs);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  // Filter logs based on search term and filters
  const filteredLogs = activityLogs.filter(log => {
    const matchesSearch = 
      log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.device.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by activity type
    const matchesActivity = 
      filters.activity === 'all' || 
      log.action === filters.activity;
    
    // Filter by time range
    let matchesTimeRange = true;
    const logDate = new Date(log.timestamp);
    const now = new Date();
    
    if (filters.timeRange === 'today') {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      matchesTimeRange = logDate >= today;
    } else if (filters.timeRange === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      yesterday.setHours(0, 0, 0, 0);
      
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      matchesTimeRange = logDate >= yesterday && logDate < today;
    } else if (filters.timeRange === 'week') {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      matchesTimeRange = logDate >= weekAgo;
    } else if (filters.timeRange === 'month') {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      matchesTimeRange = logDate >= monthAgo;
    }
    
    return matchesSearch && matchesActivity && matchesTimeRange;
  });
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  
  // Format action for display
  const formatAction = (action) => {
    return action
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Activity type badge color
  const getActionColor = (action) => {
    switch(action) {
      case 'login':
        return 'success';
      case 'logout':
        return 'neutral';
      case 'password_change':
        return 'warning';
      case 'update_profile':
        return 'info';
      default:
        return 'primary';
    }
  };
  
  // Get action icon based on the activity type
  const getActionIcon = (action) => {
    switch(action) {
      case 'login':
        return <FiLogIn size={12} style={{ marginRight: '6px' }} />;
      case 'logout':
        return <FiLogOut size={12} style={{ marginRight: '6px' }} />;
      case 'password_change':
        return <FiKey size={12} style={{ marginRight: '6px' }} />;
      case 'update_profile':
        return <FiEdit2 size={12} style={{ marginRight: '6px' }} />;
      case 'export_report':
        return <FiFileText size={12} style={{ marginRight: '6px' }} />;
      case 'create_record':
        return <FiFilePlus size={12} style={{ marginRight: '6px' }} />;
      default:
        return <FiActivity size={12} style={{ marginRight: '6px' }} />;
    }
  };
  
  // Export activity logs as CSV
  const exportLogs = () => {
    // In a real app, this would generate and download a CSV file
    // For now, just log to console
    console.log('Exporting logs:', filteredLogs);
    alert('Activity logs exported successfully!');
  };

  return (
    <div className="user-activity-container">
      <div className="page-header">
        <h1><FiActivity className="page-header-icon" /> User Activity Logs</h1>
      </div>

      <div className="header-actions">
        <div className="filter-section">
          <div className="filter-group">
            <label>Activity</label>
            <select 
              name="activity" 
              value={filters.activity}
              onChange={handleFilterChange}
            >
              <option value="all">All Activities</option>
              <option value="login">Login</option>
              <option value="logout">Logout</option>
              <option value="password_change">Password Change</option>
              <option value="update_profile">Profile Update</option>
              <option value="export_report">Report Export</option>
              <option value="create_record">Record Creation</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label>Time Range</label>
            <select 
              name="timeRange" 
              value={filters.timeRange}
              onChange={handleFilterChange}
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>
        
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search activities..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button className="export-button" onClick={exportLogs}>
          <FiDownload /> Export Logs
        </button>
      </div>

      <div className="activity-logs-container" style={{ marginTop: '1.5rem' }}>
        {loading ? (
          <div className="loading-indicator">
            <FiRefreshCw className="spinning" />
            <p>Loading activity logs...</p>
          </div>
        ) : (
          <table className="activity-logs-table">
            <thead>
              <tr>
                <th><FiUser /> User</th>
                <th><FiActivity /> Activity</th>
                <th><FiCalendar /> Date & Time</th>
                <th><FiMapPin /> IP Address</th>
                <th><FiMonitor /> Device</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="no-results">No activity logs matching your filters</td>
                </tr>
              ) : (
                filteredLogs.map(log => (
                  <tr key={log.id}>
                    <td>{log.userName}</td>
                    <td>
                      <span className={`activity-badge ${getActionColor(log.action)}`}>
                        {getActionIcon(log.action)}
                        {formatAction(log.action)}
                      </span>
                    </td>
                    <td>{formatDate(log.timestamp)}</td>
                    <td className="ip-address">{log.ipAddress}</td>
                    <td>{log.device}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UserActivity; 