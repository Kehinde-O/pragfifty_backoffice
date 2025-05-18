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
  FaSort,
  FaChevronLeft,
  FaChevronRight,
  FaTimes,
  FaRegClock,
  FaClipboardCheck,
  FaListAlt
} from 'react-icons/fa';
import styles from './TCC.module.css';

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

  // Empty state component
  const EmptyState = ({ message, filterActive, onClearFilters }) => (
    <div className={styles.emptyStateTable}>
      <div className={styles.emptyIcon}>
        <FaExclamationTriangle />
      </div>
      <p>{message}</p>
      {filterActive && (
        <button 
          onClick={onClearFilters}
          className={styles.clearFiltersButton}
        >
          Clear Filters
        </button>
      )}
    </div>
  );

  return (
    <div className={styles.tccApplicationContainer}>
      <div className={styles.tccHeaderWrapper}>
        <div className={styles.tccHeaderContent}>
          <h1 className={styles.tccHeaderTitle}>TCC Applications</h1>
          <p className={styles.tccHeaderSubtitle}>Manage Tax Clearance Certificate Applications</p>
        </div>
        <div className={styles.tccHeaderActions}>
          <button 
            className={styles.tccRefreshButton}
            onClick={handleRefresh}
            disabled={loading}
          >
            <FaSyncAlt className={loading ? styles.spinning : ''} />
            Refresh
          </button>
          <button 
            className={styles.tccAddButton}
            onClick={handleCreateTCC}
          >
            <FaPlus />
            New Application
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className={styles.tccStatsRow}>
        <div className={`${styles.tccStatsCard} ${styles.tccStatsPrimary}`}>
          <div className={styles.tccStatsIconWrapper}>
            <FaFileAlt className={styles.tccStatsIcon} />
          </div>
          <div className={styles.tccStatsContent}>
            <div className={styles.tccStatsValue}>{totalApplications}</div>
            <div className={styles.tccStatsLabel}>Total Applications</div>
          </div>
        </div>
        
        <div 
          className={`${styles.tccStatsCard} ${styles.tccStatsWarning}`}
          onClick={pendingCount > 0 ? handleProcessNow : undefined}
          style={pendingCount > 0 ? {cursor: 'pointer'} : {}}
        >
          <div className={styles.tccStatsIconWrapper}>
            <FaRegClock className={styles.tccStatsIcon} />
          </div>
          <div className={styles.tccStatsContent}>
            <div className={styles.tccStatsValue}>{pendingCount}</div>
            <div className={styles.tccStatsLabel}>Pending Processing</div>
          </div>
        </div>
        
        <div className={`${styles.tccStatsCard} ${styles.tccStatsSuccess}`}>
          <div className={styles.tccStatsIconWrapper}>
            <FaCheckCircle className={styles.tccStatsIcon} />
          </div>
          <div className={styles.tccStatsContent}>
            <div className={styles.tccStatsValue}>{approvedCount}</div>
            <div className={styles.tccStatsLabel}>Approved TCCs</div>
          </div>
        </div>
      </div>

      {/* Application List Card */}
      <div className={styles.tccListCard}>
        <div className={styles.tccListCardHeader}>
          <div className={styles.tccListCardTitle}>
            <FaListAlt className={styles.tccListCardIcon} />
            <span>Application List</span>
          </div>
          <div className={styles.tccListCardFilters}>
            <div className={styles.tccStatusFilter}>
              <span className={styles.tccFilterLabel}>Status:</span>
              <div className={styles.tccSelectWrapper}>
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className={styles.tccFilterSelect}
                >
                  <option value="ALL">All Statuses</option>
                  <option value="SUBMITTED">Submitted</option>
                  <option value="UNDER_REVIEW">Under Review</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>
            
            <div className={styles.tccYearFilter}>
              <span className={styles.tccFilterLabel}>Year:</span>
              <div className={styles.tccSelectWrapper}>
                <select 
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className={styles.tccFilterSelect}
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
        
        <div className={styles.tccListCardBody}>
          <div className={styles.tccSearchContainer}>
            <div className={styles.tccSearchInputWrapper}>
              <FaSearch className={styles.tccSearchIcon} />
              <input
                type="text"
                placeholder="Search by application #, taxpayer or TIN..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.tccSearchInput}
              />
              {searchTerm && (
                <button 
                  className={styles.tccClearSearchButton}
                  onClick={() => setSearchTerm('')}
                >
                  <FaTimes />
                </button>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className={styles.tccErrorMessage}>
              <FaExclamationTriangle /> {error}
              <button 
                onClick={handleRefresh} 
                className={styles.tccRetryButton}
              >
                Retry
              </button>
            </div>
          )}

          {/* Table */}
          <div className={styles.tccTableContainer}>
            <table className={styles.tccApplicationTable}>
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
                    <tr key={`skeleton-${index}`} className={styles.tccSkeletonRow}>
                      <td><div className={styles.tccSkeletonCell}></div></td>
                      <td><div className={styles.tccSkeletonCell}></div></td>
                      <td><div className={styles.tccSkeletonCell}></div></td>
                      <td><div className={styles.tccSkeletonCell}></div></td>
                      <td><div className={styles.tccSkeletonCell}></div></td>
                      <td><div className={styles.tccSkeletonBadge}></div></td>
                      <td><div className={styles.tccSkeletonCell}></div></td>
                      <td><div className={styles.tccSkeletonActions}></div></td>
                    </tr>
                  ))
                ) : filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="8" className={styles.tccEmptyCell}>
                      <div className={styles.tccEmptyStateContainer}>
                        <div className={styles.tccEmptyStateIcon}>
                          <FaExclamationTriangle />
                        </div>
                        <p className={styles.tccEmptyStateMessage}>No applications found</p>
                        {(searchTerm || filterStatus !== 'ALL' || filterYear !== 'ALL') && (
                          <button 
                            onClick={() => {
                              setSearchTerm('');
                              setFilterStatus('ALL');
                              setFilterYear('ALL');
                            }}
                            className={styles.tccClearFiltersButton}
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
                      className={styles.tccTableRow}
                    >
                      <td className={styles.tccAppNumberCell}>{app.applicationNumber}</td>
                      <td>{app.taxpayerName}</td>
                      <td>{app.tin}</td>
                      <td>{formatDate(app.applicationDate)}</td>
                      <td>{app.year}</td>
                      <td>
                        <StatusBadge status={app.status} />
                      </td>
                      <td>{app.tccNumber || 'Not issued'}</td>
                      <td>
                        <div className={styles.tccRowActions}>
                          <button 
                            className={styles.tccViewButton}
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
                              className={styles.tccProcessButton}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleProcessTCC(app.id);
                              }}
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
            <div className={styles.tccPaginationWrapper}>
              <div className={styles.tccPaginationInfo}>
                Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredApplications.length)} of {filteredApplications.length} entries
              </div>
              <div className={styles.tccPaginationControls}>
                <button 
                  className={`${styles.tccPaginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
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
                      className={`${styles.tccPaginationNumber} ${currentPage === pageNumber ? styles.active : ''}`}
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
                <button 
                  className={`${styles.tccPaginationButton} ${currentPage === totalPages ? styles.disabled : ''}`}
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