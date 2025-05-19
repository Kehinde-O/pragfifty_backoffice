import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FiFileText, FiFilter, FiSearch, FiRefreshCw, FiChevronDown, FiChevronUp,
  FiX, FiEye, FiEdit, FiTrash2, FiDollarSign, FiChevronLeft, FiChevronRight,
  FiPlus, FiCalendar, FiUser, FiServer, FiArrowUp, FiArrowDown
} from 'react-icons/fi';
import styles from './AssessmentList.module.css';

const AssessmentList = () => {
  // State management
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState([]);
  const [filteredAssessments, setFilteredAssessments] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    itemsPerPage: 10,
    totalItems: 0
  });
  const [filters, setFilters] = useState({
    searchQuery: '',
    status: '',
    revenueHead: '',
    startDate: '',
    endDate: '',
    minAmount: '',
    maxAmount: '',
    taxpayerType: ''
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt',
    direction: 'desc'
  });

  // Tab configuration
  const tabs = [
    { id: 'all', label: 'All', count: 0 },
    { id: 'draft', label: 'Draft', count: 0 },
    { id: 'pending', label: 'Pending', count: 0 },
    { id: 'approved', label: 'Approved', count: 0 },
    { id: 'issued', label: 'Issued', count: 0 },
    { id: 'paid', label: 'Paid', count: 0 },
    { id: 'rejected', label: 'Rejected', count: 0 },
  ];

  // Mock data fetching - replace with actual API calls
  const fetchAssessments = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      // Mock data
      const mockAssessments = [
        {
          id: 'NSIRS-ASMT-2023-001',
          taxpayerName: 'John Doe',
          taxpayerId: 'TIN123456789',
          taxpayerType: 'individual',
          revenueHead: 'Personal Income Tax',
          period: '2023 Tax Year',
          dueDate: '2023-12-31',
          createdAt: '2023-06-15',
          amount: 250000.00,
          status: 'issued',
          source: 'Niger State IRS',
          lga: 'N/A'
        },
        {
          id: 'NSIRS-ASMT-2023-002',
          taxpayerName: 'TechCore Solutions Ltd',
          taxpayerId: 'TIN987654321',
          taxpayerType: 'business',
          revenueHead: 'Business Premises Levy',
          period: '2023',
          dueDate: '2023-12-31',
          createdAt: '2023-07-02',
          amount: 350000.00,
          status: 'pending',
          source: 'Niger State IRS',
          lga: 'N/A'
        },
        {
          id: 'NSIRS-ASMT-2023-003',
          taxpayerName: 'Sarah Johnson',
          taxpayerId: 'TIN456789123',
          taxpayerType: 'individual',
          revenueHead: 'Property Tax',
          period: '2023',
          dueDate: '2023-12-15',
          createdAt: '2023-07-10',
          amount: 125000.00,
          status: 'paid',
          source: 'Niger State IRS',
          lga: 'N/A'
        },
        {
          id: 'NSIRS-ASMT-2023-004',
          taxpayerName: 'Global Traders Inc.',
          taxpayerId: 'TIN112233445',
          taxpayerType: 'business',
          revenueHead: 'Market Stall Fee',
          period: '2023 Q4',
          dueDate: '2023-12-31',
          createdAt: '2023-08-04',
          amount: 75000.00,
          status: 'approved',
          source: 'LG',
          lga: 'Bida'
        },
        {
          id: 'NSIRS-ASMT-2023-005',
          taxpayerName: 'Michael Okafor',
          taxpayerId: 'TIN998877665',
          taxpayerType: 'individual',
          revenueHead: 'Capital Gains Tax',
          period: '2023',
          dueDate: '2023-11-30',
          createdAt: '2023-08-21',
          amount: 450000.00,
          status: 'draft',
          source: 'Niger State IRS',
          lga: 'N/A'
        },
        {
          id: 'NSIRS-ASMT-2023-006',
          taxpayerName: 'MegaBytes Technologies',
          taxpayerId: 'TIN654321987',
          taxpayerType: 'business',
          revenueHead: 'Business Income Tax',
          period: '2023',
          dueDate: '2023-12-31',
          createdAt: '2023-09-05',
          amount: 1250000.00,
          status: 'issued',
          source: 'Niger State IRS',
          lga: 'N/A'
        },
        {
          id: 'NSIRS-ASMT-2023-007',
          taxpayerName: 'Aisha Mohammed',
          taxpayerId: 'TIN246813579',
          taxpayerType: 'individual',
          revenueHead: 'Development Levy',
          period: '2023',
          dueDate: '2023-10-31',
          createdAt: '2023-09-18',
          amount: 35000.00,
          status: 'paid',
          source: 'LG',
          lga: 'Minna'
        },
        {
          id: 'NSIRS-ASMT-2023-008',
          taxpayerName: 'Sunrise Hotels Ltd',
          taxpayerId: 'TIN135792468',
          taxpayerType: 'business',
          revenueHead: 'Hotel Occupancy Tax',
          period: '2023 Q3',
          dueDate: '2023-10-15',
          createdAt: '2023-10-01',
          amount: 875000.00,
          status: 'rejected',
          source: 'Niger State IRS',
          lga: 'N/A'
        }
      ];

      setAssessments(mockAssessments);
      setFilteredAssessments(mockAssessments);
      updateTabCounts(mockAssessments);
      setPagination({
        ...pagination,
        totalItems: mockAssessments.length,
        totalPages: Math.ceil(mockAssessments.length / pagination.itemsPerPage)
      });
      setLoading(false);
    }, 1000);
  }, [pagination.itemsPerPage]);

  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  // Update counts for each tab
  const updateTabCounts = (data) => {
    const newTabs = [...tabs];
    newTabs.forEach(tab => {
      if (tab.id === 'all') {
        tab.count = data.length;
      } else {
        tab.count = data.filter(item => item.status === tab.id).length;
      }
    });
  };

  // Apply filters to assessments
  const applyFilters = () => {
    setLoading(true);
    const { searchQuery, status, revenueHead, startDate, endDate, minAmount, maxAmount, taxpayerType } = filters;
    
    let filtered = [...assessments];
    
    // Filter by active tab if not 'all'
    if (activeTab !== 'all') {
      filtered = filtered.filter(item => item.status === activeTab);
    }
    
    // Apply search query (case-insensitive)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(item => 
        item.taxpayerName.toLowerCase().includes(query) ||
        item.taxpayerId.toLowerCase().includes(query) ||
        item.id.toLowerCase().includes(query)
      );
    }
    
    // Apply additional filters
    if (status && status !== 'all') {
      filtered = filtered.filter(item => item.status === status);
    }
    
    if (revenueHead) {
      filtered = filtered.filter(item => item.revenueHead === revenueHead);
    }
    
    if (startDate) {
      filtered = filtered.filter(item => new Date(item.createdAt) >= new Date(startDate));
    }
    
    if (endDate) {
      filtered = filtered.filter(item => new Date(item.createdAt) <= new Date(endDate));
    }
    
    if (minAmount) {
      filtered = filtered.filter(item => item.amount >= parseFloat(minAmount));
    }
    
    if (maxAmount) {
      filtered = filtered.filter(item => item.amount <= parseFloat(maxAmount));
    }
    
    if (taxpayerType && taxpayerType !== 'all') {
      filtered = filtered.filter(item => item.taxpayerType === taxpayerType);
    }
    
    // Apply sorting
    filtered.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredAssessments(filtered);
    setPagination({
      ...pagination,
      currentPage: 1,
      totalItems: filtered.length,
      totalPages: Math.ceil(filtered.length / pagination.itemsPerPage)
    });
    
    setLoading(false);
  };

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      searchQuery: '',
      status: '',
      revenueHead: '',
      startDate: '',
      endDate: '',
      minAmount: '',
      maxAmount: '',
      taxpayerType: ''
    });
    
    setActiveTab('all');
    setTimeout(() => {
      applyFilters();
    }, 0);
  };

  // Handle tab click
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setTimeout(() => {
      applyFilters();
    }, 0);
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    setTimeout(() => {
      applyFilters();
    }, 0);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setPagination({
      ...pagination,
      currentPage: page
    });
  };

  // Calculate visible items for current page
  const getVisibleItems = () => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredAssessments.slice(startIndex, endIndex);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch(e) {
      return dateString;
    }
  };

  // Get status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'draft': return styles.statusDraft;
      case 'pending': return styles.statusPending;
      case 'approved': return styles.statusApproved;
      case 'issued': return styles.statusIssued;
      case 'paid': return styles.statusPaid;
      case 'rejected': return styles.statusRejected;
      default: return '';
    }
  };

  // Get sort icon
  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'asc' 
      ? <FiArrowUp className={styles.sortIcon} size={12} />
      : <FiArrowDown className={styles.sortIcon} size={12} />;
  };

  return (
    <div className={styles.listContainer}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1><FiFileText className={styles.pageHeaderIcon} /> Assessment List</h1>
        <button 
          className={styles.refreshButton}
          onClick={fetchAssessments}
          disabled={loading}
        >
          <FiRefreshCw className={`${styles.refreshIcon} ${loading ? styles.spinning : ''}`} /> 
          Refresh
        </button>
      </div>

      {/* Filter Section */}
      <div className={styles.filterSection}>
        <div className={styles.filterHeader}>
          <h2><FiFilter className={styles.filterIcon} /> Filter Assessments</h2>
          <button 
            className={styles.toggleFiltersButton}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? (
              <>
                <FiChevronUp size={14} /> Hide Filters
              </>
            ) : (
              <>
                <FiChevronDown size={14} /> Show Filters
              </>
            )}
          </button>
        </div>

        {/* Search Bar - Always visible */}
        <div className={styles.searchRow}>
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} size={16} />
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by taxpayer name, ID, or assessment ID..."
              value={filters.searchQuery}
              onChange={(e) => setFilters({...filters, searchQuery: e.target.value})}
              onKeyDown={(e) => e.key === 'Enter' && applyFilters()}
            />
          </div>
          <div className={styles.filterActions}>
            <button 
              className={`${styles.actionButton} ${styles.applyButton}`}
              onClick={applyFilters}
            >
              <FiSearch size={14} /> Search
            </button>
            <button 
              className={`${styles.actionButton} ${styles.resetButton}`}
              onClick={resetFilters}
            >
              <FiX size={14} /> Reset
            </button>
          </div>
        </div>

        {/* Additional Filters - Toggle visibility */}
        {showFilters && (
          <>
            <div className={styles.filterRow}>
              <div className={styles.filterField}>
                <label className={styles.filterLabel}>Status</label>
                <select 
                  className={styles.filterSelect}
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="">All Statuses</option>
                  <option value="draft">Draft</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="issued">Issued</option>
                  <option value="paid">Paid</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div className={styles.filterField}>
                <label className={styles.filterLabel}>Revenue Head</label>
                <select 
                  className={styles.filterSelect}
                  value={filters.revenueHead}
                  onChange={(e) => setFilters({...filters, revenueHead: e.target.value})}
                >
                  <option value="">All Revenue Heads</option>
                  <option value="Personal Income Tax">Personal Income Tax</option>
                  <option value="Business Income Tax">Business Income Tax</option>
                  <option value="Property Tax">Property Tax</option>
                  <option value="Capital Gains Tax">Capital Gains Tax</option>
                  <option value="Development Levy">Development Levy</option>
                  <option value="Business Premises Levy">Business Premises Levy</option>
                  <option value="Market Stall Fee">Market Stall Fee</option>
                  <option value="Hotel Occupancy Tax">Hotel Occupancy Tax</option>
                </select>
              </div>
              <div className={styles.filterField}>
                <label className={styles.filterLabel}>Taxpayer Type</label>
                <select 
                  className={styles.filterSelect}
                  value={filters.taxpayerType}
                  onChange={(e) => setFilters({...filters, taxpayerType: e.target.value})}
                >
                  <option value="">All Types</option>
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
              </div>
            </div>
            <div className={styles.filterRow}>
              <div className={styles.filterField}>
                <label className={styles.filterLabel}>Start Date</label>
                <input
                  type="date"
                  className={styles.filterInput}
                  value={filters.startDate}
                  onChange={(e) => setFilters({...filters, startDate: e.target.value})}
                />
              </div>
              <div className={styles.filterField}>
                <label className={styles.filterLabel}>End Date</label>
                <input
                  type="date"
                  className={styles.filterInput}
                  value={filters.endDate}
                  onChange={(e) => setFilters({...filters, endDate: e.target.value})}
                />
              </div>
              <div className={styles.filterField}>
                <label className={styles.filterLabel}>Min Amount (₦)</label>
                <input
                  type="number"
                  className={styles.filterInput}
                  placeholder="0.00"
                  value={filters.minAmount}
                  onChange={(e) => setFilters({...filters, minAmount: e.target.value})}
                />
              </div>
              <div className={styles.filterField}>
                <label className={styles.filterLabel}>Max Amount (₦)</label>
                <input
                  type="number"
                  className={styles.filterInput}
                  placeholder="0.00"
                  value={filters.maxAmount}
                  onChange={(e) => setFilters({...filters, maxAmount: e.target.value})}
                />
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tab Navigation */}
      <div className={styles.tabNav}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.tabButton} ${activeTab === tab.id ? styles.tabButtonActive : ''}`}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.label}
            <span className={styles.tabBadge}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Assessment Table */}
      {loading ? (
        <div className={styles.loadingIndicator}>
          <FiRefreshCw className={styles.spinning} size={32} />
          <p>Loading assessments...</p>
        </div>
      ) : filteredAssessments.length === 0 ? (
        <div className={styles.emptyState}>
          <FiFileText className={styles.emptyIcon} size={48} />
          <h3>No assessments found</h3>
          <p>There are no assessments matching your search criteria. Try adjusting your filters or create a new assessment.</p>
          <Link to="/dashboard/assessments/create" className={styles.createButton}>
            <FiPlus size={16} /> Create New Assessment
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.tableContainer}>
            <table className={styles.assessmentsTable}>
              <thead>
                <tr>
                  <th 
                    className={styles.sortable}
                    onClick={() => handleSort('id')}
                  >
                    Assessment ID {getSortIcon('id')}
                  </th>
                  <th 
                    className={styles.sortable}
                    onClick={() => handleSort('taxpayerName')}
                  >
                    Taxpayer {getSortIcon('taxpayerName')}
                  </th>
                  <th 
                    className={styles.sortable}
                    onClick={() => handleSort('revenueHead')}
                  >
                    Revenue Head {getSortIcon('revenueHead')}
                  </th>
                  <th 
                    className={styles.sortable}
                    onClick={() => handleSort('amount')}
                  >
                    Amount {getSortIcon('amount')}
                  </th>
                  <th 
                    className={styles.sortable}
                    onClick={() => handleSort('createdAt')}
                  >
                    Date {getSortIcon('createdAt')}
                  </th>
                  <th 
                    className={styles.sortable}
                    onClick={() => handleSort('status')}
                  >
                    Status {getSortIcon('status')}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {getVisibleItems().map((assessment) => (
                  <tr key={assessment.id}>
                    <td>{assessment.id}</td>
                    <td>
                      <div>{assessment.taxpayerName}</div>
                      <small style={{ color: '#64748b' }}>{assessment.taxpayerId}</small>
                    </td>
                    <td>
                      <div>{assessment.revenueHead}</div>
                      <small style={{ color: '#64748b' }}>{assessment.period}</small>
                    </td>
                    <td>{formatCurrency(assessment.amount)}</td>
                    <td>
                      <div>{formatDate(assessment.createdAt)}</div>
                      <small style={{ color: '#64748b' }}>Due: {formatDate(assessment.dueDate)}</small>
                    </td>
                    <td>
                      <span className={`${styles.statusBadge} ${getStatusClass(assessment.status)}`}>
                        {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                      </span>
                    </td>
                    <td>
                      <div className={styles.actionButtons}>
                        <Link 
                          to={`/dashboard/assessments/${assessment.id}`}
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          data-tooltip="View"
                        >
                          <FiEye size={18} />
                        </Link>
                        
                        {assessment.status === 'draft' || assessment.status === 'pending' ? (
                          <Link 
                            to={`/dashboard/assessments/${assessment.id}/edit`}
                            className={`${styles.actionButton} ${styles.editButton}`}
                            data-tooltip="Edit"
                          >
                            <FiEdit size={18} />
                          </Link>
                        ) : null}
                        
                        {(assessment.status === 'approved' || assessment.status === 'issued') && (
                          <Link 
                            to={`/dashboard/assessments/${assessment.id}/pay`}
                            className={`${styles.actionButton} ${styles.payButton}`}
                            data-tooltip="Pay"
                          >
                            <FiDollarSign size={18} />
                          </Link>
                        )}
                        
                        {assessment.status === 'draft' && (
                          <button 
                            className={`${styles.actionButton} ${styles.deleteButton}`}
                            data-tooltip="Delete"
                            onClick={() => {
                              // Handle delete logic
                              if (window.confirm('Are you sure you want to delete this assessment?')) {
                                // Delete logic here
                                alert('Assessment deleted successfully.');
                              }
                            }}
                          >
                            <FiTrash2 size={18} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className={styles.pagination}>
            <div className={styles.paginationInfo}>
              Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of {pagination.totalItems} assessments
            </div>
            <div className={styles.paginationControls}>
              <button 
                className={`${styles.paginationButton} ${pagination.currentPage === 1 ? styles.paginationButtonDisabled : ''}`}
                onClick={() => handlePageChange(1)}
                disabled={pagination.currentPage === 1}
              >
                <FiChevronLeft size={14} />
                <FiChevronLeft size={14} style={{ marginLeft: -8 }} />
              </button>
              <button 
                className={`${styles.paginationButton} ${pagination.currentPage === 1 ? styles.paginationButtonDisabled : ''}`}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
                disabled={pagination.currentPage === 1}
              >
                <FiChevronLeft size={14} />
              </button>
              
              {[...Array(pagination.totalPages)].map((_, i) => {
                // Show current page, and 1 page before/after
                if (
                  i + 1 === 1 || // First page
                  i + 1 === pagination.totalPages || // Last page
                  (i + 1 >= pagination.currentPage - 1 && i + 1 <= pagination.currentPage + 1) // Pages around current
                ) {
                  return (
                    <button 
                      key={i}
                      className={`${styles.paginationButton} ${pagination.currentPage === i + 1 ? styles.paginationButtonActive : ''}`}
                      onClick={() => handlePageChange(i + 1)}
                    >
                      {i + 1}
                    </button>
                  );
                } else if (
                  i + 1 === pagination.currentPage - 2 || 
                  i + 1 === pagination.currentPage + 2
                ) {
                  // Ellipsis for skipped pages
                  return <span key={i} style={{ margin: '0 4px' }}>...</span>;
                }
                return null;
              })}
              
              <button 
                className={`${styles.paginationButton} ${pagination.currentPage === pagination.totalPages ? styles.paginationButtonDisabled : ''}`}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                <FiChevronRight size={14} />
              </button>
              <button 
                className={`${styles.paginationButton} ${pagination.currentPage === pagination.totalPages ? styles.paginationButtonDisabled : ''}`}
                onClick={() => handlePageChange(pagination.totalPages)}
                disabled={pagination.currentPage === pagination.totalPages}
              >
                <FiChevronRight size={14} />
                <FiChevronRight size={14} style={{ marginLeft: -8 }} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssessmentList; 