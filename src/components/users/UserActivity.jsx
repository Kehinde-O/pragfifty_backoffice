import React, { useState, useEffect } from 'react';
import { 
  FiActivity, FiSearch, FiFilter, FiDownload, FiRefreshCw,
  FiCalendar, FiUser, FiClock, FiMapPin, FiMonitor, FiLogIn, FiLogOut, FiKey, FiEdit2, FiFileText, FiFilePlus,
  FiChevronLeft, FiChevronRight, FiChevronsLeft, FiChevronsRight
} from 'react-icons/fi';
import styles from './UserActivity.module.css';

const UserActivity = () => {
  // State for activity logs
  const [activityLogs, setActivityLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    activity: 'all',
    timeRange: 'all'
  });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Setting a default of 10 items per page
  
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
        },
        // Adding more mock data to demonstrate pagination
        { 
          id: 9, 
          userId: 3,
          userName: 'Robert Johnson', 
          action: 'login', 
          timestamp: '2023-11-11T15:20:00',
          ipAddress: '192.168.1.78',
          device: 'Firefox / Ubuntu' 
        },
        { 
          id: 10, 
          userId: 5,
          userName: 'Michael Brown', 
          action: 'logout', 
          timestamp: '2023-11-11T17:45:00',
          ipAddress: '192.168.1.102',
          device: 'Chrome / Android' 
        },
        { 
          id: 11, 
          userId: 4,
          userName: 'Sarah Williams', 
          action: 'password_change', 
          timestamp: '2023-11-10T09:15:00',
          ipAddress: '192.168.1.90',
          device: 'Edge / Windows' 
        },
        { 
          id: 12, 
          userId: 1,
          userName: 'John Doe', 
          action: 'update_profile', 
          timestamp: '2023-11-10T11:30:00',
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
    setCurrentPage(1); // Reset to first page when filters change
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
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredLogs.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredLogs.length / itemsPerPage);
  
  // Get pagination group for display
  const getPaginationGroup = () => {
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + 4, totalPages);
    
    if (end === totalPages) {
      start = Math.max(end - 4, 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  
  // Pagination handlers
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => currentPage < totalPages && setCurrentPage(prev => prev + 1);
  const prevPage = () => currentPage > 1 && setCurrentPage(prev => prev - 1);
  const firstPage = () => setCurrentPage(1);
  const lastPage = () => setCurrentPage(totalPages);
  
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
    <div className={styles.container}>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          <FiActivity className={styles.headerIcon} /> User Activity Log
        </h1>
      </div>
      
      {/* Activity Metrics Section */}
      {!loading && (
        <div className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <div className={`${styles.metricIcon} ${styles.loginIcon}`}>
              <FiLogIn />
            </div>
            <div className={styles.metricContent}>
              <h3 className={styles.metricLabel}>Login Activities</h3>
              <p className={styles.metricValue}>
                {activityLogs.filter(log => log.action === 'login').length}
              </p>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={`${styles.metricIcon} ${styles.profileIcon}`}>
              <FiUser />
            </div>
            <div className={styles.metricContent}>
              <h3 className={styles.metricLabel}>Profile Updates</h3>
              <p className={styles.metricValue}>
                {activityLogs.filter(log => log.action === 'update_profile').length}
              </p>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={`${styles.metricIcon} ${styles.logoutIcon}`}>
              <FiLogOut />
            </div>
            <div className={styles.metricContent}>
              <h3 className={styles.metricLabel}>Logout Activities</h3>
              <p className={styles.metricValue}>
                {activityLogs.filter(log => log.action === 'logout').length}
              </p>
            </div>
          </div>
          
          <div className={styles.metricCard}>
            <div className={`${styles.metricIcon} ${styles.totalIcon}`}>
              <FiActivity />
            </div>
            <div className={styles.metricContent}>
              <h3 className={styles.metricLabel}>Total Activities</h3>
              <p className={styles.metricValue}>{activityLogs.length}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Search and Filter Controls */}
      <div className={styles.headerActions}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input 
            type="text" 
            className={styles.searchInput}
            placeholder="Search by user, activity, IP or device..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page on search
            }}
          />
        </div>
        
        <div className={styles.filterControls}>
          <div className={styles.filterDropdown}>
            <select 
              className={styles.filterSelect}
              name="activity" 
              value={filters.activity}
              onChange={handleFilterChange}
              aria-label="Filter by activity type"
            >
              <option value="all">All Activities</option>
              <option value="login">Logins</option>
              <option value="logout">Logouts</option>
              <option value="update_profile">Profile Updates</option>
              <option value="password_change">Password Changes</option>
              <option value="create_record">Record Creation</option>
              <option value="export_report">Report Exports</option>
            </select>
          </div>
          
          <div className={styles.filterDropdown}>
            <select 
              className={styles.filterSelect}
              name="timeRange" 
              value={filters.timeRange}
              onChange={handleFilterChange}
              aria-label="Filter by time range"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
          </div>
        </div>
        
        <button className={styles.exportButton} onClick={exportLogs}>
          <FiDownload /> Export Logs
        </button>
      </div>
      
      {/* Activity Logs Table */}
      <div className={styles.tableContainer}>
        {loading ? (
          <div className={styles.loadingIndicator}>
            <FiRefreshCw className={styles.spinner} />
            <p>Loading activity logs...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className={styles.emptyState}>
            <FiActivity className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No activity logs found</h3>
            <p className={styles.emptyMessage}>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableHeader}>User</th>
                  <th className={styles.tableHeader}>Activity</th>
                  <th className={styles.tableHeader}>Date & Time</th>
                  <th className={styles.tableHeader}>IP Address</th>
                  <th className={styles.tableHeader}>Device</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(log => (
                  <tr key={log.id} className={styles.tableRow}>
                    <td className={styles.tableData}>
                      <div className={styles.userInfo}>
                        <div className={styles.userAvatar}>
                          {log.userName.charAt(0)}
                        </div>
                        <div>
                          <div className={styles.userName}>{log.userName}</div>
                          <div className={styles.userId}>ID: {log.userId}</div>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tableData}>
                      <span className={`${styles.activityBadge} ${styles[`badge${log.action.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join('')}`]}`}>
                        {getActionIcon(log.action)}
                        {formatAction(log.action)}
                      </span>
                    </td>
                    <td className={styles.tableData}>
                      {formatDate(log.timestamp)}
                    </td>
                    <td className={styles.tableData}>{log.ipAddress}</td>
                    <td className={styles.tableData}>
                      <div className={styles.deviceInfo}>
                        <FiMonitor className={styles.deviceIcon} />
                        {log.device}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {filteredLogs.length > 0 && (
              <div className={styles.pagination}>
                <div className={styles.paginationInfo}>
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredLogs.length)} of {filteredLogs.length} activities
                </div>
                
                <div className={styles.paginationControls}>
                  <button 
                    className={`${styles.pageNav} ${currentPage === 1 ? styles.disabled : ''}`}
                    onClick={firstPage}
                    disabled={currentPage === 1}
                    aria-label="Go to first page"
                  >
                    <FiChevronsLeft />
                  </button>
                  <button 
                    className={`${styles.pageNav} ${currentPage === 1 ? styles.disabled : ''}`}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    aria-label="Go to previous page"
                  >
                    <FiChevronLeft />
                  </button>
                  
                  <div className={styles.pageNumbers}>
                    {getPaginationGroup().map(number => (
                      <button
                        key={number}
                        className={`${styles.pageNumber} ${currentPage === number ? styles.active : ''}`}
                        onClick={() => paginate(number)}
                        aria-label={`Go to page ${number}`}
                        aria-current={currentPage === number ? 'page' : undefined}
                      >
                        {number}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    className={`${styles.pageNav} ${currentPage === totalPages ? styles.disabled : ''}`}
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    aria-label="Go to next page"
                  >
                    <FiChevronRight />
                  </button>
                  <button 
                    className={`${styles.pageNav} ${currentPage === totalPages ? styles.disabled : ''}`}
                    onClick={lastPage}
                    disabled={currentPage === totalPages}
                    aria-label="Go to last page"
                  >
                    <FiChevronsRight />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default UserActivity; 