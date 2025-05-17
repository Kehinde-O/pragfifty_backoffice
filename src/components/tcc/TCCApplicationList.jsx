import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../common/ui';
import { 
  FaPlus, 
  FaSearch, 
  FaFilter, 
  FaEye, 
  FaCalendarAlt, 
  FaFileAlt, 
  FaHourglassHalf, 
  FaCheckCircle, 
  FaSyncAlt,
  FaExclamationTriangle,
  FaSort
} from 'react-icons/fa';
import './TCC.css';

const TCCApplicationList = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterYear, setFilterYear] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data
      const mockApplications = [
        {
          id: '1',
          applicationNumber: 'TCC-2023-001',
          applicationDate: '2023-05-15',
          taxpayerName: 'John Doe',
          tin: 'TIN12345678',
          year: '2023',
          status: 'APPROVED',
          tccNumber: 'TCCREG-2023-001',
          issueDate: '2023-05-20',
          expiryDate: '2024-05-19',
        },
        {
          id: '2',
          applicationNumber: 'TCC-2023-002',
          applicationDate: '2023-06-02',
          taxpayerName: 'Jane Smith',
          tin: 'TIN87654321',
          year: '2023',
          status: 'UNDER_REVIEW',
          tccNumber: null,
          issueDate: null,
          expiryDate: null,
        },
        {
          id: '3',
          applicationNumber: 'TCC-2023-003',
          applicationDate: '2023-06-10',
          taxpayerName: 'Robert Johnson',
          tin: 'TIN98765432',
          year: '2023',
          status: 'SUBMITTED',
          tccNumber: null,
          issueDate: null,
          expiryDate: null,
        },
        {
          id: '4',
          applicationNumber: 'TCC-2023-004',
          applicationDate: '2023-07-05',
          taxpayerName: 'Sarah Williams',
          tin: 'TIN23456789',
          year: '2023',
          status: 'REJECTED',
          tccNumber: null,
          issueDate: null,
          expiryDate: null,
        },
        {
          id: '5',
          applicationNumber: 'TCC-2022-001',
          applicationDate: '2022-04-12',
          taxpayerName: 'Michael Brown',
          tin: 'TIN34567890',
          year: '2022',
          status: 'APPROVED',
          tccNumber: 'TCCREG-2022-001',
          issueDate: '2022-04-18',
          expiryDate: '2023-04-17',
        }
      ];
      
      setApplications(mockApplications);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching TCC applications:', error);
      setError('Failed to load TCC applications. Please try again.');
      setLoading(false);
    }
  };

  // Handle view TCC details
  const handleViewDetails = (id) => {
    navigate(`/dashboard/tcc-application/${id}`);
  };

  // Handle process TCC
  const handleProcessTCC = (id) => {
    navigate(`/dashboard/tcc-application/${id}/process`);
  };

  // Handle create new TCC
  const handleCreateTCC = () => {
    navigate('/dashboard/tcc-application/create');
  };

  // Handle refresh data
  const handleRefresh = () => {
    fetchApplications();
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Filter applications based on search and filters
  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.taxpayerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.tin.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'ALL' || app.status === filterStatus;
    const matchesYear = filterYear === 'ALL' || app.year === filterYear;
    
    return matchesSearch && matchesStatus && matchesYear;
  });

  // Calculate stats
  const totalApplications = applications.length;
  const pendingCount = applications.filter(app => 
    app.status === 'SUBMITTED' || app.status === 'UNDER_REVIEW'
  ).length;
  const approvedCount = applications.filter(app => app.status === 'APPROVED').length;

  // Get unique years for filter
  const availableYears = [...new Set(applications.map(app => app.year))];

  // Status badge component
  const StatusBadge = ({ status }) => {
    let badgeClass = 'status-badge ';
    
    switch (status) {
      case 'APPROVED':
        badgeClass += 'badge-approved';
        break;
      case 'REJECTED':
        badgeClass += 'badge-rejected';
        break;
      case 'UNDER_REVIEW':
        badgeClass += 'badge-pending';
        break;
      case 'SUBMITTED':
        badgeClass += 'badge-info';
        break;
      default:
        badgeClass += 'badge-default';
    }
    
    // Format status for display
    const formattedStatus = status.replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return <span className={badgeClass}>{formattedStatus}</span>;
  };

  // Check if application needs processing
  const needsProcessing = (status) => {
    return status === 'SUBMITTED' || status === 'UNDER_REVIEW';
  };

  // Pagination
  const totalPages = Math.ceil(filteredApplications.length / rowsPerPage);
  const paginatedData = filteredApplications.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Handle process now action from stats card
  const handleProcessNow = () => {
    setFilterStatus('SUBMITTED');
  };

  // Empty state component
  const EmptyState = ({ message, filterActive, onClearFilters }) => (
    <div className="empty-state-table">
      <FaExclamationTriangle className="empty-icon" />
      <p>{message}</p>
      {filterActive && (
        <button 
          className="clear-filters-button"
          onClick={onClearFilters}
          aria-label="Clear all filters"
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  // Stat Card component
  const StatCard = ({ title, value, icon, color, onClick }) => (
    <div className={`stat-card stat-${color}`} onClick={onClick} role={onClick ? "button" : "presentation"} tabIndex={onClick ? "0" : undefined}>
      <div className="stat-card-content">
        <div className="stat-card-info">
          <h3 className="stat-card-title">{title}</h3>
          <p className="stat-card-value">{loading ? '-' : value}</p>
        </div>
        <div className="stat-card-icon">
          {icon}
        </div>
      </div>
      {onClick && (
        <div className="stat-card-footer">
          <button className="stat-card-action">Process now</button>
        </div>
      )}
    </div>
  );

  return (
    <div className="tcc-application-container">
      <div className="page-header">
        <div>
          <h1 className="page-title">TCC Applications</h1>
          <p className="page-subtitle">Manage Tax Clearance Certificate Applications</p>
        </div>
        <div className="page-actions">
          <Button 
            variant="outline" 
            size="md" 
            onClick={handleRefresh} 
            title="Refresh data"
            disabled={loading}
            leadingIcon={<FaSyncAlt className={loading ? "spinning" : ""} />}
          >
            Refresh
          </Button>
          <Button 
            variant="primary" 
            size="md" 
            onClick={handleCreateTCC}
            leadingIcon={<FaPlus />}
          >
            New Application
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Applications"
          value={totalApplications}
          icon={<FaFileAlt />}
          color="primary"
        />
        
        <StatCard
          title="Pending Processing"
          value={pendingCount}
          icon={<FaHourglassHalf />}
          color="warning"
          onClick={pendingCount > 0 ? handleProcessNow : undefined}
        />
        
        <StatCard
          title="Approved TCCs"
          value={approvedCount}
          icon={<FaCheckCircle />}
          color="success"
        />
      </div>

      <Card className="tcc-list-card">
        {/* Search and Filter Controls */}
        <div className="table-toolbar">
          <div className="search-container">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by application #, taxpayer or TIN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
                aria-label="Search TCC applications"
              />
            </div>
          </div>
          
          <div className="filter-toolbar">
            <div className="filter-item">
              <label htmlFor="status-filter">Status:</label>
              <div className="filter-select-container">
                <select 
                  id="status-filter"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="filter-select"
                  aria-label="Filter by status"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="SUBMITTED">Submitted</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
                <FaSort className="filter-icon" />
              </div>
            </div>
            
            <div className="filter-item">
              <label htmlFor="year-filter">Year:</label>
              <div className="filter-select-container">
                <select 
                  id="year-filter"
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="filter-select"
                  aria-label="Filter by year"
                >
                  <option value="ALL">All Years</option>
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <FaSort className="filter-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message" role="alert">
            <FaExclamationTriangle /> {error}
            <button 
              onClick={handleRefresh} 
              className="retry-button"
              aria-label="Retry loading data"
            >
              Retry
            </button>
          </div>
        )}

        {/* Table */}
        <div className="table-container">
          <table className="tcc-table">
            <thead>
              <tr>
                <th>Application #</th>
                <th>Taxpayer</th>
                <th>TIN</th>
                <th>Application Date</th>
                <th>Year</th>
                <th>Status</th>
                <th>TCC Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                // Skeleton Loading State
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={`skeleton-${index}`} className="skeleton-row">
                    <td><div className="skeleton-cell skeleton-text"></div></td>
                    <td><div className="skeleton-cell skeleton-text"></div></td>
                    <td><div className="skeleton-cell skeleton-text"></div></td>
                    <td><div className="skeleton-cell skeleton-text"></div></td>
                    <td><div className="skeleton-cell skeleton-text"></div></td>
                    <td><div className="skeleton-cell skeleton-badge"></div></td>
                    <td><div className="skeleton-cell skeleton-text"></div></td>
                    <td><div className="skeleton-cell skeleton-actions"></div></td>
                  </tr>
                ))
              ) : filteredApplications.length === 0 ? (
                <tr>
                  <td colSpan="8" className="empty-cell">
                    <EmptyState 
                      message="No applications found" 
                      filterActive={searchTerm || filterStatus !== 'ALL' || filterYear !== 'ALL'}
                      onClearFilters={() => {
                        setSearchTerm('');
                        setFilterStatus('ALL');
                        setFilterYear('ALL');
                      }} 
                    />
                  </td>
                </tr>
              ) : (
                // Table Data
                paginatedData.map((app) => (
                  <tr 
                    key={app.id} 
                    onClick={() => handleViewDetails(app.id)} 
                    className="tcc-table-row"
                    tabIndex="0"
                    role="button"
                    aria-label={`Application ${app.applicationNumber} for ${app.taxpayerName}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleViewDetails(app.id);
                      }
                    }}
                  >
                    <td><span className="application-number">{app.applicationNumber}</span></td>
                    <td>{app.taxpayerName}</td>
                    <td>{app.tin}</td>
                    <td>{formatDate(app.applicationDate)}</td>
                    <td className="text-center">{app.year}</td>
                    <td><StatusBadge status={app.status} /></td>
                    <td>{app.tccNumber || 'Not issued'}</td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="icon-button action-view" 
                          title="View Details"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(app.id);
                          }}
                          aria-label={`View details for application ${app.applicationNumber}`}
                        >
                          <FaEye />
                        </button>
                        {needsProcessing(app.status) && (
                          <button 
                            className="process-button" 
                            title="Process Application"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleProcessTCC(app.id);
                            }}
                            aria-label={`Process application ${app.applicationNumber}`}
                          >
                            Process
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!loading && filteredApplications.length > 0 && (
          <div className="pagination-container">
            <div className="pagination-info">
              Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredApplications.length)} of {filteredApplications.length} applications
            </div>
            <div className="pagination-controls">
              <button 
                className="pagination-button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                aria-label="Previous page"
              >
                Previous
              </button>
              <div className="pagination-pages">
                {[...Array(Math.min(totalPages, 5))].map((_, i) => {
                  // Show 5 page buttons with current page in the middle if possible
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      className={`pagination-page ${currentPage === pageNum ? 'active' : ''}`}
                      onClick={() => setCurrentPage(pageNum)}
                      aria-label={`Page ${pageNum}`}
                      aria-current={currentPage === pageNum ? 'page' : undefined}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button 
                className="pagination-button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(prev => prev + 1)}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TCCApplicationList; 