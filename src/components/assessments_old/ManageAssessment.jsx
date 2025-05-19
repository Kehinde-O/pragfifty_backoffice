import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { 
  FiEdit, FiTrash2, FiSearch, FiCalendar, FiChevronDown, FiCheck, 
  FiX, FiAlertTriangle, FiDownload, FiEye, FiChevronLeft, 
  FiChevronRight, FiRefreshCw, FiInfo, FiFileText, FiFilter,
  FiCheckCircle, FiXCircle, FiPrinter, FiClock
} from 'react-icons/fi';
import './ManageAssessment.css';

const ManageAssessment = () => {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState({ startDate: '', endDate: '' });
  const [viewingAssessment, setViewingAssessment] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionNotes, setActionNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [sortOptions, setSortOptions] = useState({ id: 'createdAt', desc: true });

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
      case 'draft':
        return (
          <span className="status-badge status-draft">
            <FiClock className="status-icon" /> Draft
          </span>
        );
      case 'pending':
        return (
          <span className="status-badge status-pending">
            <FiAlertTriangle className="status-icon" /> Pending
          </span>
        );
      case 'approved':
        return (
          <span className="status-badge status-approved">
            <FiCheck className="status-icon" /> Approved
          </span>
        );
      case 'rejected':
        return (
          <span className="status-badge status-rejected">
            <FiX className="status-icon" /> Rejected
          </span>
        );
      case 'paid':
        return (
          <span className="status-badge status-paid">
            <FiCheck className="status-icon" /> Paid
          </span>
        );
      case 'partial':
        return (
          <span className="status-badge status-partial">
            <FiClock className="status-icon" /> Partial
          </span>
        );
      case 'expired':
        return (
          <span className="status-badge status-expired">
            <FiXCircle className="status-icon" /> Expired
          </span>
        );
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  // Mock data - replace with API call
  const fetchAssessments = useCallback(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockData = [
        {
          id: 'ASMT-2023-001',
          reference: 'REF123456',
          taxpayerId: 'TIN123456',
          taxpayerName: 'John Doe',
          taxpayerType: 'Individual',
          revenueHead: 'Personal Income Tax',
          assessmentType: 'Direct Assessment',
          taxYear: 2023,
          amount: 124500.00,
          status: 'pending',
          createdAt: '2023-10-15T09:30:00Z',
          dueDate: '2023-11-15T23:59:59Z',
          createdBy: 'Admin User',
          notes: 'Annual direct assessment'
        },
        {
          id: 'ASMT-2023-002',
          reference: 'REF234567',
          taxpayerId: 'BUS345678',
          taxpayerName: 'XYZ Corporation',
          taxpayerType: 'Business',
          revenueHead: 'Company Income Tax',
          assessmentType: 'Direct Assessment',
          taxYear: 2023,
          amount: 350000.00,
          status: 'approved',
          createdAt: '2023-10-12T14:20:00Z',
          dueDate: '2023-11-12T23:59:59Z',
          createdBy: 'Tax Officer Jane',
          notes: 'Based on submitted financial statements'
        },
        {
          id: 'ASMT-2023-003',
          reference: 'REF345678',
          taxpayerId: 'TIN789012',
          taxpayerName: 'Jane Smith',
          taxpayerType: 'Individual',
          revenueHead: 'Personal Income Tax',
          assessmentType: 'Best of Judgment',
          taxYear: 2023,
          amount: 75000.00,
          status: 'rejected',
          createdAt: '2023-10-10T10:45:00Z',
          dueDate: '2023-11-10T23:59:59Z',
          createdBy: 'Tax Officer Mike',
          notes: 'Insufficient documentation provided'
        },
        {
          id: 'ASMT-2023-004',
          reference: 'REF456789',
          taxpayerId: 'BUS901234',
          taxpayerName: 'ABC Enterprises',
          taxpayerType: 'Business',
          revenueHead: 'Company Income Tax',
          assessmentType: 'Self Assessment',
          taxYear: 2023,
          amount: 125000.00,
          status: 'paid',
          createdAt: '2023-10-08T13:10:00Z',
          dueDate: '2023-11-08T23:59:59Z',
          createdBy: 'System',
          notes: 'Self assessment verified and paid in full'
        },
        {
          id: 'ASMT-2023-005',
          reference: 'REF567890',
          taxpayerId: 'TIN345678',
          taxpayerName: 'Robert Johnson',
          taxpayerType: 'Individual',
          revenueHead: 'Capital Gains Tax',
          assessmentType: 'Direct Assessment',
          taxYear: 2023,
          amount: 45000.00,
          status: 'partial',
          createdAt: '2023-10-05T15:30:00Z',
          dueDate: '2023-11-05T23:59:59Z',
          createdBy: 'Tax Officer Sarah',
          notes: 'Partial payment received, installment plan approved'
        },
        {
          id: 'ASMT-2023-006',
          reference: 'REF678901',
          taxpayerId: 'BUS456789',
          taxpayerName: 'Global Services Ltd',
          taxpayerType: 'Business',
          revenueHead: 'Education Tax',
          assessmentType: 'Direct Assessment',
          taxYear: 2023,
          amount: 500000.00,
          status: 'expired',
          createdAt: '2023-10-01T08:45:00Z',
          dueDate: '2023-10-31T23:59:59Z',
          createdBy: 'Tax Officer James',
          notes: 'Assessment expired without payment'
        },
        {
          id: 'ASMT-2023-007',
          reference: 'REF789012',
          taxpayerId: 'TIN567890',
          taxpayerName: 'Alice Williams',
          taxpayerType: 'Individual',
          revenueHead: 'Personal Income Tax',
          assessmentType: 'Self Assessment',
          taxYear: 2023,
          amount: 85000.00,
          status: 'draft',
          createdAt: '2023-09-28T11:25:00Z',
          dueDate: null,
          createdBy: 'Admin User',
          notes: 'Draft assessment pending review'
        }
      ];
      
      setAssessments(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  // Filter assessments based on status and type filters
  const filteredAssessments = useMemo(() => {
    let filtered = [...assessments];
    
    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(assessment => assessment.status === statusFilter);
    }
    
    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(assessment => assessment.assessmentType === typeFilter);
    }
    
    // Date range filter
    if (dateRangeFilter.startDate && dateRangeFilter.endDate) {
      const startDate = new Date(dateRangeFilter.startDate);
      const endDate = new Date(dateRangeFilter.endDate);
      endDate.setHours(23, 59, 59, 999); // Include the entire end date
      
      filtered = filtered.filter(assessment => {
        const createdAt = new Date(assessment.createdAt);
        return createdAt >= startDate && createdAt <= endDate;
      });
    }
    
    return filtered;
  }, [assessments, statusFilter, typeFilter, dateRangeFilter]);

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRangeFilter(prev => ({ ...prev, [name]: value }));
  };

  // Open action modal
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

  // Process action (approve/reject/delete)
  const processAction = () => {
    if (!viewingAssessment || !actionType) return;
    
    setActionLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (actionType === 'delete') {
        // Delete assessment
        setAssessments(assessments.filter(a => a.id !== viewingAssessment.id));
      } else {
        // Update assessment status based on action type
        const updatedAssessments = assessments.map(assessment => {
          if (assessment.id === viewingAssessment.id) {
            const newStatus = 
              actionType === 'approve' ? 'approved' :
              actionType === 'reject' ? 'rejected' :
              assessment.status;
            
            return {
              ...assessment,
              status: newStatus,
              notes: actionNotes || assessment.notes
            };
          }
          return assessment;
        });
        
        setAssessments(updatedAssessments);
      }
      
      setActionLoading(false);
      closeActionModal();
      
      // Show success message - would use a toast or notification system in a real app
      alert(`Assessment ${viewingAssessment.id} has been ${actionType === 'delete' ? 'deleted' : (actionType + 'd')} successfully.`);
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
            <div className="reference-secondary">{row.original.reference}</div>
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
        Header: 'Assessment Type',
        accessor: 'assessmentType',
      },
      {
        Header: 'Revenue Head',
        accessor: 'revenueHead',
      },
      {
        Header: 'Amount',
        accessor: 'amount',
        Cell: ({ value }) => <div className="amount">{formatCurrency(value)}</div>,
      },
      {
        Header: 'Due Date',
        accessor: 'dueDate',
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
            
            {row.original.status === 'draft' || row.original.status === 'pending' ? (
              <>
                <button 
                  className="icon-button edit" 
                  title="Edit Assessment"
                >
                  <FiEdit />
                </button>
                
                {row.original.status === 'pending' && (
                  <button 
                    className="icon-button approve" 
                    title="Approve Assessment" 
                    onClick={() => openActionModal(row.original, 'approve')}
                  >
                    <FiCheckCircle />
                  </button>
                )}
                
                <button 
                  className="icon-button reject" 
                  title="Reject Assessment" 
                  onClick={() => openActionModal(row.original, 'reject')}
                >
                  <FiXCircle />
                </button>
              </>
            ) : null}
            
            {['approved', 'rejected', 'paid', 'partial', 'expired'].includes(row.original.status) && (
              <button className="icon-button print" title="Print Assessment">
                <FiPrinter />
              </button>
            )}
            
            <button className="icon-button download" title="Download Assessment">
              <FiDownload />
            </button>
            
            <button 
              className="icon-button delete" 
              title="Delete Assessment"
              onClick={() => openActionModal(row.original, 'delete')}
            >
              <FiTrash2 />
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
    <div className="manage-assessment-container">
      <div className="page-header">
        <h1><FiFileText className="page-header-icon" /> Manage Assessments</h1>
        <div className="page-actions">
          <button className="button primary-button">
            <FiFileText /> Create Assessment
          </button>
          <button className="button refresh-button" onClick={fetchAssessments} disabled={loading}>
            <FiRefreshCw className={loading ? "spinning" : ""} /> Refresh
          </button>
        </div>
      </div>
      
      <div className="info-banner">
        <FiInfo className="info-icon" />
        <p>
          Manage all tax assessments from this page. You can view, edit, approve, reject, or delete assessments based on your permission level.
        </p>
      </div>
      
      {/* Filter Bar */}
      <div className="filter-section">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by ID, reference, taxpayer name, TIN..."
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
                <option value="draft">Draft</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="paid">Paid</option>
                <option value="partial">Partial Payment</option>
                <option value="expired">Expired</option>
              </select>
              <FiChevronDown className="select-arrow" />
            </div>

            <div className="filter-select">
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="select-input"
                aria-label="Filter by assessment type"
              >
                <option value="all">All Types</option>
                <option value="Direct Assessment">Direct Assessment</option>
                <option value="Self Assessment">Self Assessment</option>
                <option value="Best of Judgment">Best of Judgment</option>
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
              <FiFilter /> Reset Filters
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="table-responsive">
        {loading ? (
          <div className="loading-indicator">
            <FiRefreshCw className="spinning" />
            <p>Loading assessments...</p>
          </div>
        ) : filteredAssessments.length === 0 ? (
          <div className="no-results">
            <FiFileText size={48} className="no-results-icon" />
            <p>No assessments found matching your criteria.</p>
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

      {/* Action Modal */}
      {showActionModal && viewingAssessment && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>
                {actionType === 'approve' ? 'Approve Assessment' : 
                 actionType === 'reject' ? 'Reject Assessment' : 
                 actionType === 'delete' ? 'Delete Assessment' : 'Assessment Action'}
              </h2>
              <button className="modal-close" onClick={closeActionModal} aria-label="Close modal">&times;</button>
            </div>
            
            <div className="modal-content">
              <div className="modal-info">
                <p><strong>Reference:</strong> {viewingAssessment.id} ({viewingAssessment.reference})</p>
                <p><strong>Taxpayer:</strong> {viewingAssessment.taxpayerName} ({viewingAssessment.taxpayerId})</p>
                <p><strong>Assessment Type:</strong> {viewingAssessment.assessmentType} ({viewingAssessment.taxYear})</p>
                <p><strong>Amount:</strong> {formatCurrency(viewingAssessment.amount)}</p>
                {viewingAssessment.dueDate && (
                  <p><strong>Due Date:</strong> {formatDate(viewingAssessment.dueDate)}</p>
                )}
              </div>
              
              {actionType !== 'delete' && (
                <div className="modal-form">
                  <div className="form-field">
                    <label htmlFor="actionNotes">
                      {actionType === 'approve' 
                        ? 'Approval Notes (Optional):' 
                        : 'Rejection Reason (Required):'
                      }
                    </label>
                    <textarea
                      id="actionNotes"
                      value={actionNotes}
                      onChange={(e) => setActionNotes(e.target.value)}
                      placeholder={actionType === 'approve' 
                        ? 'Enter any notes regarding this approval...' 
                        : 'Specify the reason for rejection...'
                      }
                      rows={4}
                      className="textarea-input"
                      required={actionType === 'reject'}
                    />
                  </div>
                </div>
              )}
              
              {actionType === 'delete' && (
                <div className="confirmation-message">
                  <FiAlertTriangle size={24} className="warning-icon" />
                  <p>Are you sure you want to delete this assessment? This action cannot be undone.</p>
                </div>
              )}
            </div>
            
            <div className="modal-actions">
              <button className="button cancel-button" onClick={closeActionModal} disabled={actionLoading}>
                Cancel
              </button>
              <button 
                className={`button ${
                  actionType === 'approve' ? 'approve-button' : 
                  actionType === 'reject' ? 'reject-button' : 
                  'delete-button'
                }`}
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
                    {actionType === 'approve' && <FiCheckCircle />}
                    {actionType === 'reject' && <FiXCircle />}
                    {actionType === 'delete' && <FiTrash2 />}
                    {actionType === 'approve' ? 'Approve Assessment' : 
                     actionType === 'reject' ? 'Reject Assessment' : 
                     'Delete Assessment'}
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
              <h2>Assessment Details</h2>
              <button className="modal-close" onClick={closeDetailsModal} aria-label="Close modal">&times;</button>
            </div>
            
            <div className="modal-content">
              <div className="assessment-details">
                <div className="details-section">
                  <h3>Basic Information</h3>
                  <div className="detail-row">
                    <div className="detail-label">Assessment ID:</div>
                    <div className="detail-value">{viewingAssessment.id}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Reference:</div>
                    <div className="detail-value">{viewingAssessment.reference}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Assessment Type:</div>
                    <div className="detail-value">{viewingAssessment.assessmentType}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Tax Year:</div>
                    <div className="detail-value">{viewingAssessment.taxYear}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Created Date:</div>
                    <div className="detail-value">{formatDateTime(viewingAssessment.createdAt)}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Due Date:</div>
                    <div className="detail-value">{formatDateTime(viewingAssessment.dueDate)}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Status:</div>
                    <div className="detail-value"><StatusBadge status={viewingAssessment.status} /></div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Created By:</div>
                    <div className="detail-value">{viewingAssessment.createdBy}</div>
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
                </div>

                <div className="details-section">
                  <h3>Financial Information</h3>
                  <div className="detail-row">
                    <div className="detail-label">Revenue Head:</div>
                    <div className="detail-value">{viewingAssessment.revenueHead}</div>
                  </div>
                  <div className="detail-row">
                    <div className="detail-label">Assessment Amount:</div>
                    <div className="detail-value highlight">{formatCurrency(viewingAssessment.amount)}</div>
                  </div>
                </div>

                {viewingAssessment.notes && (
                  <div className="details-section">
                    <h3>Notes</h3>
                    <div className="detail-row">
                      <div className="detail-value notes">{viewingAssessment.notes}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="modal-actions">
              {viewingAssessment.status === 'draft' || viewingAssessment.status === 'pending' ? (
                <>
                  <button className="button edit-button">
                    <FiEdit /> Edit Assessment
                  </button>
                  {viewingAssessment.status === 'pending' && (
                    <button 
                      className="button approve-button"
                      onClick={() => {
                        closeDetailsModal();
                        openActionModal(viewingAssessment, 'approve');
                      }}
                    >
                      <FiCheckCircle /> Approve
                    </button>
                  )}
                  <button 
                    className="button reject-button"
                    onClick={() => {
                      closeDetailsModal();
                      openActionModal(viewingAssessment, 'reject');
                    }}
                  >
                    <FiXCircle /> Reject
                  </button>
                </>
              ) : (
                <>
                  <button className="button print-button">
                    <FiPrinter /> Print
                  </button>
                  <button className="button download-button">
                    <FiDownload /> Download
                  </button>
                  <button className="button close-button" onClick={closeDetailsModal}>
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageAssessment; 