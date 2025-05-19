import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTable, useSortBy, usePagination, useGlobalFilter } from 'react-table';
import { 
  FiFileText, FiSearch, FiCalendar, FiChevronDown, 
  FiCheckCircle, FiXCircle, FiAlertCircle, FiEye, 
  FiChevronLeft, FiChevronRight, FiRefreshCw, FiInfo
} from 'react-icons/fi';
import './PendingAssessments.css';

const PendingAssessments = () => {
  const [loading, setLoading] = useState(true);
  const [assessments, setAssessments] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState({ startDate: '', endDate: '' });
  
  // Selected assessment for actions
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [showActionModal, setShowActionModal] = useState(false);
  const [actionType, setActionType] = useState('');
  const [actionNotes, setActionNotes] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

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

  const formatDueDate = (dateString) => {
    if (!dateString) return '-';
    
    const today = new Date();
    const dueDate = new Date(dateString);
    const differenceInDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
    
    const formattedDate = formatDate(dateString);
    
    if (differenceInDays < 0) {
      return <span className="due-date overdue">{formattedDate} (Overdue)</span>;
    } else if (differenceInDays <= 7) {
      return <span className="due-date soon">{formattedDate} (Due soon)</span>;
    } else {
      return <span className="due-date">{formattedDate}</span>;
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'pending_review':
        return (
          <span className="status-badge status-pending">
            <FiFileText className="status-icon" /> Pending Review
          </span>
        );
      case 'pending_confirmation':
        return (
          <span className="status-badge status-confirmation">
            <FiCheckCircle className="status-icon" /> Pending Confirmation
          </span>
        );
      case 'under_audit':
        return (
          <span className="status-badge status-audit">
            <FiAlertCircle className="status-icon" /> Under Audit
          </span>
        );
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  // Mock data - replace with API call
  const fetchPendingAssessments = useCallback(() => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockData = [
        {
          id: 'NSIRS-ASMT-2023-001',
          taxpayerId: 'TIN123456',
          taxpayerName: 'John Doe',
          taxpayerType: 'Individual',
          revenueHead: 'Personal Income Tax',
          revenueHeadId: 1,
          basisOfAssessment: 'Annual Income Declaration',
          assessedAmount: 75000.00,
          dueDate: '2023-12-31',
          status: 'pending_review',
          createdAt: '2023-11-15T09:30:00Z',
          createdBy: 'Admin User',
          lastUpdatedAt: null,
          lastUpdatedBy: null,
          description: 'Annual personal income tax assessment'
        },
        {
          id: 'NSIRS-ASMT-2023-002',
          taxpayerId: 'BUS345678',
          taxpayerName: 'XYZ Corporation',
          taxpayerType: 'Business',
          revenueHead: 'Company Income Tax',
          revenueHeadId: 2,
          basisOfAssessment: 'Company Annual Profit',
          assessedAmount: 250000.00,
          dueDate: '2023-12-15',
          status: 'pending_confirmation',
          createdAt: '2023-11-10T14:20:00Z',
          createdBy: 'Tax Officer',
          lastUpdatedAt: '2023-11-12T11:15:00Z',
          lastUpdatedBy: 'Supervisor',
          description: 'Corporate income tax assessment based on annual filing'
        },
        {
          id: 'NSIRS-ASMT-2023-003',
          taxpayerId: 'TIN789012',
          taxpayerName: 'Jane Smith',
          taxpayerType: 'Individual',
          revenueHead: 'Property Tax',
          revenueHeadId: 4,
          basisOfAssessment: 'Property Value Assessment',
          assessedAmount: 35000.00,
          dueDate: '2023-11-30',
          status: 'under_audit',
          createdAt: '2023-11-05T10:45:00Z',
          createdBy: 'Assessment Officer',
          lastUpdatedAt: '2023-11-08T09:20:00Z',
          lastUpdatedBy: 'Audit Team',
          description: 'Property tax assessment for residential property'
        },
        {
          id: 'NSIRS-ASMT-2023-004',
          taxpayerId: 'BUS901234',
          taxpayerName: 'ABC Enterprises',
          taxpayerType: 'Business',
          revenueHead: 'Business Premises Fee',
          revenueHeadId: 7,
          basisOfAssessment: 'Business Location and Size',
          assessedAmount: 45000.00,
          dueDate: '2023-12-10',
          status: 'pending_review',
          createdAt: '2023-11-08T13:10:00Z',
          createdBy: 'Revenue Officer',
          lastUpdatedAt: null,
          lastUpdatedBy: null,
          description: 'Annual business premises fee assessment'
        },
        {
          id: 'NSIRS-ASMT-2023-005',
          taxpayerId: 'TIN345678',
          taxpayerName: 'Robert Johnson',
          taxpayerType: 'Individual',
          revenueHead: 'Development Levy',
          revenueHeadId: 8,
          basisOfAssessment: 'Statutory Flat Rate',
          assessedAmount: 1000.00,
          dueDate: '2023-12-31',
          status: 'pending_review',
          createdAt: '2023-11-12T15:30:00Z',
          createdBy: 'Admin User',
          lastUpdatedAt: null,
          lastUpdatedBy: null,
          description: 'Annual development levy'
        },
        {
          id: 'NSIRS-ASMT-2023-006',
          taxpayerId: 'BUS456789',
          taxpayerName: 'Global Services Ltd',
          taxpayerType: 'Business',
          revenueHead: 'Value Added Tax',
          revenueHeadId: 3,
          basisOfAssessment: 'Monthly Sales Report',
          assessedAmount: 180000.00,
          dueDate: '2023-12-05',
          status: 'under_audit',
          createdAt: '2023-11-01T08:45:00Z',
          createdBy: 'Tax Officer',
          lastUpdatedAt: '2023-11-03T14:20:00Z',
          lastUpdatedBy: 'Audit Department',
          description: 'Monthly VAT assessment based on sales report'
        },
        {
          id: 'NSIRS-ASMT-2023-007',
          taxpayerId: 'TIN567890',
          taxpayerName: 'Alice Williams',
          taxpayerType: 'Individual',
          revenueHead: 'Personal Income Tax',
          revenueHeadId: 1,
          basisOfAssessment: 'Annual Income',
          assessedAmount: 62500.00,
          dueDate: '2023-12-20',
          status: 'pending_confirmation',
          createdAt: '2023-11-18T11:25:00Z',
          createdBy: 'Assessment Officer',
          lastUpdatedAt: '2023-11-18T16:40:00Z',
          lastUpdatedBy: 'Supervisor',
          description: 'PAYE assessment for professional services'
        }
      ];
      
      setAssessments(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchPendingAssessments();
  }, [fetchPendingAssessments]);

  // Filter assessments based on status and type filters
  const filteredAssessments = useMemo(() => {
    let filtered = [...assessments];
    
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
        const createdDate = new Date(assessment.createdAt);
        return createdDate >= startDate && createdDate <= endDate;
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
    setSelectedAssessment(assessment);
    setActionType(type);
    setActionNotes('');
    setShowActionModal(true);
  };

  // Close action modal
  const closeActionModal = () => {
    setShowActionModal(false);
    setSelectedAssessment(null);
    setActionType('');
    setActionNotes('');
  };

  // Process action (approve, reject, audit)
  const processAction = () => {
    if (!selectedAssessment || !actionType) return;
    
    setActionLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update assessment status based on action type
      const updatedAssessments = assessments.map(assessment => {
        if (assessment.id === selectedAssessment.id) {
          const newStatus = 
            actionType === 'approve' ? 'approved' :
            actionType === 'reject' ? 'rejected' :
            actionType === 'audit' ? 'under_audit' :
            assessment.status;
          
          return {
            ...assessment,
            status: newStatus,
            lastUpdatedAt: new Date().toISOString(),
            lastUpdatedBy: 'Current User', // This would come from auth context in real app
            notes: actionNotes
          };
        }
        return assessment;
      });
      
      // Remove the assessment from the list if it's no longer "pending"
      const filteredUpdatedAssessments = updatedAssessments.filter(
        assessment => ['pending_review', 'pending_confirmation', 'under_audit'].includes(assessment.status)
      );
      
      setAssessments(filteredUpdatedAssessments);
      
      setActionLoading(false);
      closeActionModal();
      
      // Show success message - would use a toast or notification system in a real app
      alert(`Assessment ${selectedAssessment.id} has been ${actionType}ed successfully.`);
    }, 1000);
  };

  // Define React Table
  const columns = useMemo(
    () => [
      {
        Header: 'Assessment',
        accessor: 'id',
        Cell: ({ row }) => (
          <div className="assessment-info">
            <div className="assessment-id">{row.original.id}</div>
            <div className="assessment-description">{row.original.description}</div>
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
        Cell: ({ value }) => <div className="revenue-head">{value}</div>,
      },
      {
        Header: 'Amount',
        accessor: 'assessedAmount',
        Cell: ({ value }) => <div className="amount">{formatCurrency(value)}</div>,
      },
      {
        Header: 'Due Date',
        accessor: 'dueDate',
        Cell: ({ value }) => formatDueDate(value),
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
            <button className="icon-button view" title="View Details">
              <FiEye />
            </button>
            <button className="icon-button approve" title="Approve Assessment" onClick={() => openActionModal(row.original, 'approve')}>
              <FiCheckCircle />
            </button>
            <button className="icon-button reject" title="Reject Assessment" onClick={() => openActionModal(row.original, 'reject')}>
              <FiXCircle />
            </button>
            <button className="icon-button audit" title="Mark for Audit" onClick={() => openActionModal(row.original, 'audit')}>
              <FiAlertCircle />
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
    <div className="pending-assessments-container">
      <div className="page-header">
        <h1><FiFileText className="page-header-icon" /> Pending Assessments</h1>
        <div className="page-actions">
          <Link to="/dashboard/assessments/create" className="button create-button">
            <FiFileText /> Create New Assessment
          </Link>
          <button className="button refresh-button" onClick={fetchPendingAssessments} disabled={loading}>
            <FiRefreshCw className={loading ? "spinning" : ""} /> Refresh
          </button>
        </div>
      </div>
      
      <div className="info-banner">
        <FiInfo className="info-icon" />
        <p>
          This page shows all assessments that require review or confirmation. 
          You can approve, reject, or mark assessments for audit.
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
                <option value="pending_review">Pending Review</option>
                <option value="pending_confirmation">Pending Confirmation</option>
                <option value="under_audit">Under Audit</option>
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
            <p>Loading assessments...</p>
          </div>
        ) : filteredAssessments.length === 0 ? (
          <div className="no-results">
            <FiFileText size={48} className="no-results-icon" />
            <p>No pending assessments found matching your criteria.</p>
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
      {showActionModal && selectedAssessment && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>
                {actionType === 'approve' && 'Approve Assessment'}
                {actionType === 'reject' && 'Reject Assessment'}
                {actionType === 'audit' && 'Mark for Audit'}
              </h2>
              <button className="modal-close" onClick={closeActionModal} aria-label="Close modal">&times;</button>
            </div>
            
            <div className="modal-content">
              <div className="modal-info">
                <p>Assessment ID: <strong>{selectedAssessment.id}</strong></p>
                <p>Taxpayer: <strong>{selectedAssessment.taxpayerName}</strong></p>
                <p>Amount: <strong>{formatCurrency(selectedAssessment.assessedAmount)}</strong></p>
              </div>
              
              <div className="modal-form">
                <div className="form-field">
                  <label htmlFor="actionNotes">Notes (Optional):</label>
                  <textarea
                    id="actionNotes"
                    value={actionNotes}
                    onChange={(e) => setActionNotes(e.target.value)}
                    placeholder="Enter any notes regarding this action..."
                    rows={4}
                    className="textarea-input"
                  />
                </div>
              </div>
            </div>
            
            <div className="modal-actions">
              <button className="button cancel-button" onClick={closeActionModal} disabled={actionLoading}>
                Cancel
              </button>
              <button 
                className={`button ${actionType === 'approve' ? 'approve-button' : actionType === 'reject' ? 'reject-button' : 'audit-button'}`}
                onClick={processAction}
                disabled={actionLoading}
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
                    {actionType === 'audit' && <FiAlertCircle />}
                    {actionType === 'approve' && 'Approve'}
                    {actionType === 'reject' && 'Reject'}
                    {actionType === 'audit' && 'Send to Audit'}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAssessments; 