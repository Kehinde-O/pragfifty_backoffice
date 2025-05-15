import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { 
  FiFileText, FiSearch, FiCalendar, FiChevronDown, FiCheck, 
  FiX, FiAlertTriangle, FiDownload, FiEye, FiChevronLeft, 
  FiChevronRight, FiRefreshCw, FiInfo, FiCheckCircle, FiXCircle
} from 'react-icons/fi';
import './SelfAssessmentReview.css';

const SelfAssessmentReview = () => {
  const [loading, setLoading] = useState(true);
  const [selfAssessments, setSelfAssessments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState({ startDate: '', endDate: '' });
  const [viewingAssessment, setViewingAssessment] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionNotes, setActionNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Format utility functions
  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount).toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'pending_verification':
        return (
          <span className="status-badge status-pending">
            <FiAlertTriangle className="status-icon" /> Pending Verification
          </span>
        );
      case 'verified':
        return (
          <span className="status-badge status-verified">
            <FiCheck className="status-icon" /> Verified
          </span>
        );
      case 'rejected':
        return (
          <span className="status-badge status-rejected">
            <FiX className="status-icon" /> Rejected
          </span>
        );
      case 'under_review':
        return (
          <span className="status-badge status-review">
            <FiFileText className="status-icon" /> Under Review
          </span>
        );
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  // Mock data - replace with API call
  const fetchSelfAssessments = useCallback(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockData = [
        {
          id: 'SELF-ASMT-2023-001',
          taxpayerId: 'TIN123456',
          taxpayerName: 'John Doe',
          taxpayerType: 'Individual',
          revenueHead: 'Personal Income Tax',
          taxType: 'Annual Self Assessment',
          taxYear: 2023,
          declaredAmount: 95000.00,
          supportingDocs: 3,
          submissionDate: '2023-10-15T09:30:00Z',
          status: 'pending_verification',
          verificationDate: null,
          verifiedBy: null,
          notes: null
        },
        {
          id: 'SELF-ASMT-2023-002',
          taxpayerId: 'BUS345678',
          taxpayerName: 'XYZ Corporation',
          taxpayerType: 'Business',
          revenueHead: 'Company Income Tax',
          taxType: 'Corporate Self Assessment',
          taxYear: 2023,
          declaredAmount: 350000.00,
          supportingDocs: 5,
          submissionDate: '2023-10-12T14:20:00Z',
          status: 'verified',
          verificationDate: '2023-10-14T11:15:00Z',
          verifiedBy: 'Tax Officer Jane',
          notes: 'All documents properly verified. Matches previous year declarations with appropriate growth.'
        },
        {
          id: 'SELF-ASMT-2023-003',
          taxpayerId: 'TIN789012',
          taxpayerName: 'Jane Smith',
          taxpayerType: 'Individual',
          revenueHead: 'Personal Income Tax',
          taxType: 'Annual Self Assessment',
          taxYear: 2023,
          declaredAmount: 75000.00,
          supportingDocs: 4,
          submissionDate: '2023-10-10T10:45:00Z',
          status: 'rejected',
          verificationDate: '2023-10-11T09:20:00Z',
          verifiedBy: 'Tax Officer Mike',
          notes: 'Missing income from secondary employment. Please include Form C and resubmit.'
        },
        {
          id: 'SELF-ASMT-2023-004',
          taxpayerId: 'BUS901234',
          taxpayerName: 'ABC Enterprises',
          taxpayerType: 'Business',
          revenueHead: 'Company Income Tax',
          taxType: 'Corporate Self Assessment',
          taxYear: 2023,
          declaredAmount: 125000.00,
          supportingDocs: 6,
          submissionDate: '2023-10-08T13:10:00Z',
          status: 'under_review',
          verificationDate: null,
          verifiedBy: null,
          notes: 'Under review by audit department for further verification of declared assets.'
        },
        {
          id: 'SELF-ASMT-2023-005',
          taxpayerId: 'TIN345678',
          taxpayerName: 'Robert Johnson',
          taxpayerType: 'Individual',
          revenueHead: 'Personal Income Tax',
          taxType: 'Annual Self Assessment',
          taxYear: 2023,
          declaredAmount: 110000.00,
          supportingDocs: 3,
          submissionDate: '2023-10-05T15:30:00Z',
          status: 'verified',
          verificationDate: '2023-10-07T10:25:00Z',
          verifiedBy: 'Tax Officer Sarah',
          notes: 'All documents properly verified. Assessment aligns with submitted evidence.'
        },
        {
          id: 'SELF-ASMT-2023-006',
          taxpayerId: 'BUS456789',
          taxpayerName: 'Global Services Ltd',
          taxpayerType: 'Business',
          revenueHead: 'Company Income Tax',
          taxType: 'Corporate Self Assessment',
          taxYear: 2023,
          declaredAmount: 500000.00,
          supportingDocs: 8,
          submissionDate: '2023-10-01T08:45:00Z',
          status: 'verified',
          verificationDate: '2023-10-04T14:20:00Z',
          verifiedBy: 'Tax Officer James',
          notes: 'All financial statements verified. Corporate returns match declared income.'
        },
        {
          id: 'SELF-ASMT-2023-007',
          taxpayerId: 'TIN567890',
          taxpayerName: 'Alice Williams',
          taxpayerType: 'Individual',
          revenueHead: 'Personal Income Tax',
          taxType: 'Annual Self Assessment',
          taxYear: 2023,
          declaredAmount: 85000.00,
          supportingDocs: 2,
          submissionDate: '2023-09-28T11:25:00Z',
          status: 'pending_verification',
          verificationDate: null,
          verifiedBy: null,
          notes: null
        }
      ];
      
      setSelfAssessments(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchSelfAssessments();
  }, [fetchSelfAssessments]);

  // Filter self assessments based on status and type filters
  const filteredAssessments = useMemo(() => {
    let filtered = [...selfAssessments];
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(assessment => assessment.status === statusFilter);
    }
    
    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(assessment => assessment.taxpayerType === typeFilter);
    }
    
    // Date range filter
    if (dateRangeFilter.startDate && dateRangeFilter.endDate) {
      const startDate = new Date(dateRangeFilter.startDate);
      const endDate = new Date(dateRangeFilter.endDate);
      endDate.setHours(23, 59, 59, 999); // Include the entire end date
      
      filtered = filtered.filter(assessment => {
        const submissionDate = new Date(assessment.submissionDate);
        return submissionDate >= startDate && submissionDate <= endDate;
      });
    }
    
    return filtered;
  }, [selfAssessments, statusFilter, typeFilter, dateRangeFilter]);

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRangeFilter(prev => ({ ...prev, [name]: value }));
  };

  // Open action modal for verify/reject
  const openActionModal = (assessment, type) => {
    setViewingAssessment(assessment);
    setActionType(type);
    setActionNotes('');
    setShowActionModal(true);
  };

  // Close action modal
  const closeActionModal = () => {
    setShowActionModal(false);
    setViewingAssessment(null);
    setActionType('');
    setActionNotes('');
  };

  // View assessment details
  const viewAssessmentDetails = (assessment) => {
    setViewingAssessment(assessment);
    setShowDetails(true);
  };
  
  // Close details modal
  const closeDetailsModal = () => {
    setShowDetails(false);
    setViewingAssessment(null);
  };

  // Process action (verify/reject)
  const processAction = () => {
    if (!viewingAssessment || !actionType) return;
    
    setActionLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update assessment status based on action type
      const updatedAssessments = selfAssessments.map(assessment => {
        if (assessment.id === viewingAssessment.id) {
          const newStatus = 
            actionType === 'verify' ? 'verified' :
            actionType === 'reject' ? 'rejected' :
            assessment.status;
          
          return {
            ...assessment,
            status: newStatus,
            verificationDate: new Date().toISOString(),
            verifiedBy: 'Current User', // This would come from auth context in real app
            notes: actionNotes || assessment.notes
          };
        }
        return assessment;
      });
      
      setSelfAssessments(updatedAssessments);
      
      setActionLoading(false);
      closeActionModal();
      
      // Show success message - would use a toast or notification system in a real app
      alert(`Self Assessment ${viewingAssessment.id} has been ${actionType === 'verify' ? 'verified' : 'rejected'} successfully.`);
    }, 1000);
  };

  // Define React Table
  const columns = useMemo(
    () => [
      {
        Header: 'Reference',
        accessor: 'id',
        Cell: ({ row }) => (
          <div className="reference-info">
            <div className="reference-id">{row.original.id}</div>
            <div className="tax-type">{row.original.taxType} ({row.original.taxYear})</div>
          </div>
        ),
      },
      {
        Header: 'Taxpayer',
        accessor: 'taxpayerName',
        Cell: ({ row }) => (
          <div className="taxpayer-info">
            <div className="taxpayer-name">{row.original.taxpayerName}</div>
            <div className="taxpayer-details">
              <span className={`taxpayer-type ${row.original.taxpayerType.toLowerCase()}`}>
                {row.original.taxpayerType}
              </span>
              <span className="taxpayer-id">{row.original.taxpayerId}</span>
            </div>
          </div>
        ),
      },
      {
        Header: 'Revenue Head',
        accessor: 'revenueHead',
      },
      {
        Header: 'Amount',
        accessor: 'declaredAmount',
        Cell: ({ value }) => <div className="amount">{formatCurrency(value)}</div>,
      },
      {
        Header: 'Submission Date',
        accessor: 'submissionDate',
        Cell: ({ value }) => formatDate(value),
      },
      {
        Header: 'Status',
        accessor: 'status',
        Cell: ({ value }) => <StatusBadge status={value} />,
      },
      {
        Header: 'Actions',
        id: 'actions',
        disableSortBy: true,
        Cell: ({ row }) => (
          <div className="actions-container">
            <button 
              className="icon-button view" 
              title="View Details"
              onClick={() => viewAssessmentDetails(row.original)}
            >
              <FiEye />
            </button>
            {row.original.status === 'pending_verification' && (
              <>
                <button 
                  className="icon-button verify" 
                  title="Verify Assessment" 
                  onClick={() => openActionModal(row.original, 'verify')}
                >
                  <FiCheckCircle />
                </button>
                <button 
                  className="icon-button reject" 
                  title="Reject Assessment" 
                  onClick={() => openActionModal(row.original, 'reject')}
                >
                  <FiXCircle />
                </button>
              </>
            )}
            <button className="icon-button download" title="Download Documents">
              <FiDownload />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter }
  } = useTable(
    {
      columns,
      data: filteredAssessments,
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Reset all filters and go back to first page
  const resetFilters = useCallback(() => {
    setStatusFilter('all');
    setTypeFilter('all');
    setDateRangeFilter({ startDate: '', endDate: '' });
    setGlobalFilter('');
    gotoPage(0);
  }, [setGlobalFilter, gotoPage]);

  return (
    <div className="self-assessment-review-container">
      <div className="page-header">
        <h1><FiFileText className="page-header-icon" /> Self-Assessment Review</h1>
        <div className="page-actions">
          <button className="button refresh-button" onClick={fetchSelfAssessments} disabled={loading}>
            <FiRefreshCw className={loading ? "spinning" : ""} /> Refresh List
          </button>
        </div>
      </div>
      
      <div className="info-banner">
        <FiInfo className="info-icon" />
        <p>
          This page displays self-assessments submitted by taxpayers that require verification.
          You can verify assessments, reject them with notes, or request additional documentation.
        </p>
      </div>
      
      {/* Filter Bar */}
      <div className="filter-section">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by ID, taxpayer name, TIN..."
            value={globalFilter || ''}
            onChange={e => setGlobalFilter(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-controls">
          <div className="filter-group">
            <div className="filter-select">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="select-input"
                aria-label="Filter by status"
              >
                <option value="all">All Statuses</option>
                <option value="pending_verification">Pending Verification</option>
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
                <option value="under_review">Under Review</option>
              </select>
              <FiChevronDown className="select-arrow" />
            </div>

            <div className="filter-select">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="select-input"
                aria-label="Filter by taxpayer type"
              >
                <option value="all">All Types</option>
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
              </select>
              <FiChevronDown className="select-arrow" />
            </div>

            <div className="date-range-filter">
              <div className="date-inputs">
                <div className="date-input-container">
                  <input
                    type="date"
                    name="startDate"
                    value={dateRangeFilter.startDate}
                    onChange={handleDateRangeChange}
                    className="date-input"
                    placeholder="Start date"
                    aria-label="Start date"
                  />
                  <FiCalendar className="date-icon" />
                </div>
                <div className="date-input-container">
                  <input
                    type="date"
                    name="endDate"
                    value={dateRangeFilter.endDate}
                    onChange={handleDateRangeChange}
                    className="date-input"
                    placeholder="End date"
                    aria-label="End date"
                  />
                  <FiCalendar className="date-icon" />
                </div>
              </div>
            </div>

            <button className="button reset-button" onClick={resetFilters}>
              Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        {loading ? (
          <div className="loading-indicator">
            <FiRefreshCw className="spinning" />
            <p>Loading self assessments...</p>
          </div>
        ) : filteredAssessments.length === 0 ? (
          <div className="no-results">
            <FiFileText size={48} className="no-results-icon" />
            <p>No self-assessment submissions found matching your criteria.</p>
            <button className="button reset-button" onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        ) : (
          <>
            <div className="table-container">
              <table {...getTableProps()} className="react-table">
                <thead>
                  {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map(column => (
                        <th 
                          {...column.getHeaderProps(column.getSortByToggleProps())} 
                          className={column.isSorted ? column.isSortedDesc ? 'desc' : 'asc' : ''}
                        >
                          {column.render('Header')}
                          <span className="sort-indicator"></span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map(row => {
                    prepareRow(row)
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map(cell => {
                          return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="pagination">
              <div className="pagination-info">
                Showing {page.length} of {filteredAssessments.length} results
              </div>
              
              <div className="pagination-controls">
                <div className="items-per-page">
                  <select
                    value={pageSize}
                    onChange={e => setPageSize(Number(e.target.value))}
                    className="select-input small"
                    aria-label="Rows per page"
                  >
                    {[5, 10, 20, 50].map(size => (
                      <option key={size} value={size}>
                        {size} rows
                      </option>
                    ))}
                  </select>
                  <FiChevronDown className="select-arrow" />
                </div>
                
                <button 
                  className="pagination-button" 
                  onClick={() => gotoPage(0)} 
                  disabled={!canPreviousPage}
                  aria-label="First page"
                >
                  {'<<'}
                </button>
                <button 
                  className="pagination-button" 
                  onClick={() => previousPage()} 
                  disabled={!canPreviousPage}
                  aria-label="Previous page"
                >
                  <FiChevronLeft />
                </button>
                
                <span className="pagination-page-info">
                  Page <span className="page-number">{pageIndex + 1}</span> of <span className="page-number">{pageOptions.length}</span>
                </span>
                
                <button 
                  className="pagination-button" 
                  onClick={() => nextPage()} 
                  disabled={!canNextPage}
                  aria-label="Next page"
                >
                  <FiChevronRight />
                </button>
                <button 
                  className="pagination-button" 
                  onClick={() => gotoPage(pageCount - 1)} 
                  disabled={!canNextPage}
                  aria-label="Last page"
                >
                  {'>>'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Verification Action Modal */}
      {showActionModal && viewingAssessment && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>
                {actionType === 'verify' ? 'Verify Self-Assessment' : 'Reject Self-Assessment'}
              </h2>
              <button className="modal-close" onClick={closeActionModal} aria-label="Close modal">&times;</button>
            </div>
            
            <div className="modal-content">
              <div className="modal-info">
                <p><strong>Reference:</strong> {viewingAssessment.id}</p>
                <p><strong>Taxpayer:</strong> {viewingAssessment.taxpayerName} ({viewingAssessment.taxpayerId})</p>
                <p><strong>Tax Type:</strong> {viewingAssessment.taxType} ({viewingAssessment.taxYear})</p>
                <p><strong>Declared Amount:</strong> {formatCurrency(viewingAssessment.declaredAmount)}</p>
                <p><strong>Submission Date:</strong> {formatDate(viewingAssessment.submissionDate)}</p>
              </div>
              
              <div className="modal-form">
                <div className="form-field">
                  <label htmlFor="actionNotes">
                    {actionType === 'verify' 
                      ? 'Verification Notes (Optional):' 
                      : 'Rejection Reason (Required):'
                    }
                  </label>
                  <textarea
                    id="actionNotes"
                    value={actionNotes}
                    onChange={(e) => setActionNotes(e.target.value)}
                    placeholder={actionType === 'verify' 
                      ? 'Enter any notes regarding this verification...' 
                      : 'Specify the reason for rejection. This will be sent to the taxpayer...'
                    }
                    rows={4}
                    className="textarea-input"
                    required={actionType === 'reject'}
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="button cancel-button" onClick={closeActionModal} disabled={actionLoading}>
                Cancel
              </button>
              <button 
                className={`button ${actionType === 'verify' ? 'verify-button' : 'reject-button'}`}
                onClick={processAction}
                disabled={actionLoading || (actionType === 'reject' && !actionNotes)}
              >
                {actionLoading ? (
                  <>
                    <FiRefreshCw className="spinning" />
                    Processing...
                  </>
                ) : (
                  <>
                    {actionType === 'verify' && <FiCheckCircle />}
                    {actionType === 'reject' && <FiXCircle />}
                    {actionType === 'verify' ? 'Verify Assessment' : 'Reject Assessment'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Details Modal */}
      {showDetails && viewingAssessment && (
        <div className="modal-overlay">
          <div className="modal-container details-modal">
            <div className="modal-header">
              <h2>Self-Assessment Details</h2>
              <button className="modal-close" onClick={closeDetailsModal} aria-label="Close modal">&times;</button>
            </div>
            
            <div className="modal-content">
              <div className="assessment-details">
                <div className="details-section">
                  <h3>Basic Information</h3>
                  <div className="detail-row">
                    <div className="detail-label">Reference ID:</div>
                    <div className="detail-value">{viewingAssessment.id}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Tax Type:</div>
                    <div className="detail-value">{viewingAssessment.taxType}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Tax Year:</div>
                    <div className="detail-value">{viewingAssessment.taxYear}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Submission Date:</div>
                    <div className="detail-value">{formatDateTime(viewingAssessment.submissionDate)}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Status:</div>
                    <div className="detail-value"><StatusBadge status={viewingAssessment.status} /></div>
                  </div>
                </div>

                <div className="details-section">
                  <h3>Taxpayer Information</h3>
                  <div className="detail-row">
                    <div className="detail-label">Name:</div>
                    <div className="detail-value">{viewingAssessment.taxpayerName}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">TIN:</div>
                    <div className="detail-value">{viewingAssessment.taxpayerId}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Type:</div>
                    <div className="detail-value">{viewingAssessment.taxpayerType}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Revenue Head:</div>
                    <div className="detail-value">{viewingAssessment.revenueHead}</div>
                  </div>
                </div>

                <div className="details-section">
                  <h3>Financial Information</h3>
                  <div className="detail-row">
                    <div className="detail-label">Declared Amount:</div>
                    <div className="detail-value highlight">{formatCurrency(viewingAssessment.declaredAmount)}</div>
                  </div>
                </div>

                <div className="details-section">
                  <h3>Supporting Documents</h3>
                  <div className="documents-list">
                    <div className="document-item">
                      <div className="document-name">Tax Computation Form</div>
                      <button className="button document-button">
                        <FiDownload /> Download
                      </button>
                    </div>
                    <div className="document-item">
                      <div className="document-name">Financial Statements</div>
                      <button className="button document-button">
                        <FiDownload /> Download
                      </button>
                    </div>
                    <div className="document-item">
                      <div className="document-name">Evidence of Income</div>
                      <button className="button document-button">
                        <FiDownload /> Download
                      </button>
                    </div>
                    {viewingAssessment.supportingDocs > 3 && (
                      <div className="document-item">
                        <div className="document-name">Additional Supporting Documents</div>
                        <button className="button document-button">
                          <FiDownload /> Download
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {viewingAssessment.status !== 'pending_verification' && (
                  <div className="details-section">
                    <h3>Verification Details</h3>
                    <div className="detail-row">
                      <div className="detail-label">Verification Date:</div>
                      <div className="detail-value">{formatDateTime(viewingAssessment.verificationDate)}</div>
                    </div>
                    <div className="detail-row">
                      <div className="detail-label">Verified By:</div>
                      <div className="detail-value">{viewingAssessment.verifiedBy}</div>
                    </div>
                    {viewingAssessment.notes && (
                      <div className="detail-row">
                        <div className="detail-label">Notes:</div>
                        <div className="detail-value notes">{viewingAssessment.notes}</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-actions">
              {viewingAssessment.status === 'pending_verification' ? (
                <>
                  <button 
                    className="button verify-button"
                    onClick={() => {
                      closeDetailsModal();
                      openActionModal(viewingAssessment, 'verify');
                    }}
                  >
                    <FiCheckCircle /> Verify Assessment
                  </button>
                  <button 
                    className="button reject-button"
                    onClick={() => {
                      closeDetailsModal();
                      openActionModal(viewingAssessment, 'reject');
                    }}
                  >
                    <FiXCircle /> Reject Assessment
                  </button>
                </>
              ) : (
                <button className="button close-button" onClick={closeDetailsModal}>
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelfAssessmentReview; 