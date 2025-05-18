import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
  FaSort,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaRegClock,
  FaClipboardCheck,
  FaListAlt
} from 'react-icons/fa';
import styles from './TCCApplicationList.module.css';

const TCCApplicationList = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterYear, setFilterYear] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, _setRowsPerPage] = useState(10);
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
    let badgeClass = styles.statusBadge + ' ';
    
    switch (status) {
      case 'APPROVED':
        badgeClass += styles.badgeApproved;
        break;
      case 'REJECTED':
        badgeClass += styles.badgeRejected;
        break;
      case 'UNDER_REVIEW':
        badgeClass += styles.badgePending;
        break;
      case 'SUBMITTED':
        badgeClass += styles.badgeInfo;
        break;
      default:
        badgeClass += styles.badgeDefault;
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

  return (
    <div className={styles.applicationListContainer}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h1 className={styles.title}>TCC Applications</h1>
          <p className={styles.subtitle}>Manage Tax Clearance Certificate Applications</p>
        </div>
        <div className={styles.headerActions}>
          <button 
            className={styles.refreshButton}
            onClick={handleRefresh}
            disabled={loading}
          >
            <FaSyncAlt className={loading ? styles.spinning : ''} />
            Refresh
          </button>
          <button 
            className={styles.addButton}
            onClick={handleCreateTCC}
          >
            <FaPlus />
            New Application
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.statsRow}>
        <div className={`${styles.statsCard} ${styles.statsPrimary}`}>
          <div className={styles.statsIconWrapper}>
            <FaFileAlt className={styles.statsIcon} />
          </div>
          <div className={styles.statsContent}>
            <div className={styles.statsValue}>{totalApplications}</div>
            <div className={styles.statsLabel}>Total Applications</div>
          </div>
        </div>
        
        <div 
          className={`${styles.statsCard} ${styles.statsWarning}`}
          onClick={pendingCount > 0 ? handleProcessNow : undefined}
          style={pendingCount > 0 ? {cursor: 'pointer'} : {}}
        >
          <div className={styles.statsIconWrapper}>
            <FaRegClock className={styles.statsIcon} />
          </div>
          <div className={styles.statsContent}>
            <div className={styles.statsValue}>{pendingCount}</div>
            <div className={styles.statsLabel}>Pending Processing</div>
          </div>
        </div>
        
        <div className={`${styles.statsCard} ${styles.statsSuccess}`}>
          <div className={styles.statsIconWrapper}>
            <FaCheckCircle className={styles.statsIcon} />
          </div>
          <div className={styles.statsContent}>
            <div className={styles.statsValue}>{approvedCount}</div>
            <div className={styles.statsLabel}>Approved TCCs</div>
          </div>
        </div>
      </div>

      {/* Application List Card */}
      <div className={styles.listCard}>
        <div className={styles.listCardHeader}>
          <div className={styles.listCardTitle}>
            <FaListAlt className={styles.listCardIcon} />
            <span>Application List</span>
          </div>
          <div className={styles.listCardFilters}>
            <div className={styles.statusFilter}>
              <span className={styles.filterLabel}>Status:</span>
              <div className={styles.selectWrapper}>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="SUBMITTED">Submitted</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>
            
            <div className={styles.yearFilter}>
              <span className={styles.filterLabel}>Year:</span>
              <div className={styles.selectWrapper}>
                <select 
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className={styles.filterSelect}
                >
                  <option value="ALL">All Years</option>
                  {availableYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
        
        <div className={styles.listCardBody}>
          <div className={styles.searchContainer}>
            <div className={styles.searchInputWrapper}>
              <FaSearch className={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search by application #, taxpayer or TIN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchInput}
              />
              {searchTerm && (
                <button 
                  className={styles.clearSearchButton}
                  onClick={() => setSearchTerm('')}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className={styles.errorMessage}>
              <FaExclamationTriangle /> {error}
              <button 
                onClick={handleRefresh} 
                className={styles.retryButton}
              >
                Retry
              </button>
            </div>
          )}

          {/* Table */}
          <div className={styles.tableContainer}>
            <table className={styles.applicationTable}>
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
                    <tr key={`skeleton-${index}`} className={styles.skeletonRow}>
                      <td><div className={styles.skeletonCell}></div></td>
                      <td><div className={styles.skeletonCell}></div></td>
                      <td><div className={styles.skeletonCell}></div></td>
                      <td><div className={styles.skeletonCell}></div></td>
                      <td><div className={styles.skeletonCell}></div></td>
                      <td><div className={styles.skeletonBadge}></div></td>
                      <td><div className={styles.skeletonCell}></div></td>
                      <td><div className={styles.skeletonActions}></div></td>
                    </tr>
                  ))
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="8" className={styles.emptyCell}>
                      <div className={styles.emptyStateContainer}>
                        <div className={styles.emptyStateIcon}>
                          <FaExclamationTriangle />
                        </div>
                        <p className={styles.emptyStateMessage}>No applications found</p>
                        {(searchTerm || filterStatus !== 'ALL' || filterYear !== 'ALL') && (
                          <button 
                            onClick={() => {
                              setSearchTerm('');
                              setFilterStatus('ALL');
                              setFilterYear('ALL');
                            }}
                            className={styles.clearFiltersButton}
                          >
                            Clear Filters
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  // Table Data
                  paginatedData.map((app) => (
                    <tr 
                      key={app.id} 
                      onClick={() => handleViewDetails(app.id)} 
                      className={styles.tableRow}
                    >
                      <td className={styles.appNumberCell}>{app.applicationNumber}</td>
                      <td>{app.taxpayerName}</td>
                      <td>{app.tin}</td>
                      <td>{formatDate(app.applicationDate)}</td>
                      <td>{app.year}</td>
                      <td>
                        <StatusBadge status={app.status} />
                      </td>
                      <td>{app.tccNumber || 'Not issued'}</td>
                      <td>
                        <div className={styles.rowActions}>
                          <button 
                            className={styles.viewButton}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleViewDetails(app.id);
                            }}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          {needsProcessing(app.status) && (
                            <button 
                              className={styles.processButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProcessTCC(app.id);
                              }}
                              title="Process Application"
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
            <div className={styles.paginationWrapper}>
              <div className={styles.paginationInfo}>
                Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredApplications.length)} of {filteredApplications.length} entries
              </div>
              <div className={styles.paginationControls}>
                <button 
                  className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                >
                  <FaChevronLeft />
                </button>
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                  let pageNumber = index + 1;
                  if (totalPages > 5) {
                    if (currentPage <= 3) {
                      pageNumber = index + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + index;
                    } else {
                      pageNumber = currentPage - 2 + index;
                    }
                  }
                  
                  return (
                    <button
                      key={pageNumber}
                      className={`${styles.paginationNumber} ${currentPage === pageNumber ? styles.active : ''}`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button 
                  className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ''}`}
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TCCApplicationList; 