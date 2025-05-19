import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FiFileText, FiSearch, FiPlus, FiFilter, FiCalendar, FiUser,
  FiEdit2, FiEye, FiTrash2, FiDownload, FiRefreshCw, FiCheck, FiX, FiDollarSign
} from 'react-icons/fi';
import './AssessmentList.css';

const AssessmentList = () => {
  const [assessments, setAssessments] = useState([]);
  const [filteredAssessments, setFilteredAssessments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState({ startDate: '', endDate: '' });

  // Mock data - replace with API call
  const fetchAssessments = useCallback(() => {
    setLoading(true);
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
          status: 'Issued',
          issueDate: '2023-11-15',
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
          status: 'Paid',
          issueDate: '2023-10-20',
          description: 'Corporate income tax assessment'
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
          status: 'Overdue',
          issueDate: '2023-10-15',
          description: 'Annual property tax assessment'
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
          status: 'Draft',
          issueDate: null,
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
          status: 'SelfAssessedPendingReview',
          issueDate: '2023-11-10',
          description: 'Annual development levy'
        }
      ];
      setAssessments(mockData);
      setFilteredAssessments(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchAssessments();
  }, [fetchAssessments]);

  const handleFilter = useCallback(() => {
    let filtered = assessments;
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(assessment => 
        assessment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.taxpayerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        assessment.revenueHead.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(assessment => assessment.status === statusFilter);
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(assessment => assessment.taxpayerType === typeFilter);
    }
    
    // Apply date range filter
    if (dateRangeFilter.startDate && dateRangeFilter.endDate) {
      const startDate = new Date(dateRangeFilter.startDate);
      const endDate = new Date(dateRangeFilter.endDate);
      
      filtered = filtered.filter(assessment => {
        if (!assessment.issueDate) return false;
        const issueDate = new Date(assessment.issueDate);
        return issueDate >= startDate && issueDate <= endDate;
      });
    }
    
    setFilteredAssessments(filtered);
  }, [assessments, searchTerm, statusFilter, typeFilter, dateRangeFilter]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter, searchTerm, statusFilter, typeFilter, dateRangeFilter]);

  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRangeFilter(prev => ({ ...prev, [name]: value }));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this assessment? This action cannot be undone.')) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setAssessments(prevAssessments => prevAssessments.filter(assessment => assessment.id !== id));
        handleFilter();
        setLoading(false);
      }, 500);
    }
  };

  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'Draft':
        return <span className="status-badge status-draft"><FiFileText /> Draft</span>;
      case 'Approved':
        return <span className="status-badge status-approved"><FiCheck /> Approved</span>;
      case 'Issued':
        return <span className="status-badge status-issued"><FiCheck /> Issued</span>;
      case 'Paid':
        return <span className="status-badge status-paid"><FiDollarSign /> Paid</span>;
      case 'Cancelled':
        return <span className="status-badge status-cancelled"><FiX /> Cancelled</span>;
      case 'Overdue':
        return <span className="status-badge status-overdue"><FiCalendar /> Overdue</span>;
      case 'SelfAssessedPendingReview':
        return <span className="status-badge status-review"><FiFileText /> Pending Review</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  return (
    <div className="assessments-container">
      <div className="page-header">
        <h1><FiFileText className="page-header-icon" /> Assessments</h1>
        <Link to="/dashboard/assessments/create" className="create-button">
          <FiPlus /> Create Assessment
        </Link>
      </div>

      <div className="filter-bar">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search assessments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <div className="filter-select">
            <label htmlFor="statusFilter">Status:</label>
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Draft">Draft</option>
              <option value="Approved">Approved</option>
              <option value="Issued">Issued</option>
              <option value="Paid">Paid</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Overdue">Overdue</option>
              <option value="SelfAssessedPendingReview">Pending Review</option>
            </select>
          </div>

          <div className="filter-select">
            <label htmlFor="typeFilter">Type:</label>
            <select
              id="typeFilter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="date-range-filter">
            <label>Issue Date Range:</label>
            <div className="date-inputs">
              <input
                type="date"
                name="startDate"
                value={dateRangeFilter.startDate}
                onChange={handleDateRangeChange}
                placeholder="Start Date"
              />
              <span className="date-separator">to</span>
              <input
                type="date"
                name="endDate"
                value={dateRangeFilter.endDate}
                onChange={handleDateRangeChange}
                placeholder="End Date"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="table-container">
        {loading ? (
          <div className="loading-indicator">
            <FiRefreshCw className="spinning" />
            <p>Loading assessments...</p>
          </div>
        ) : filteredAssessments.length === 0 ? (
          <div className="no-results">
            <FiFileText size={48} className="no-results-icon" />
            <p>No assessments found matching your criteria.</p>
            <p>Try adjusting your filters or create a new assessment.</p>
          </div>
        ) : (
          <table className="assessments-table">
            <thead>
              <tr>
                <th>Assessment ID</th>
                <th>Taxpayer</th>
                <th>Revenue Head</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssessments.map(assessment => (
                <tr key={assessment.id}>
                  <td className="assessment-id">
                    <span>{assessment.id}</span>
                    <small className="assessment-description">{assessment.description}</small>
                  </td>
                  <td>
                    <div className="taxpayer-info">
                      <span className="taxpayer-name">{assessment.taxpayerName}</span>
                      <span className={`taxpayer-badge ${assessment.taxpayerType.toLowerCase()}`}>
                        {assessment.taxpayerType}
                      </span>
                    </div>
                  </td>
                  <td>{assessment.revenueHead}</td>
                  <td className="amount-cell">{formatCurrency(assessment.assessedAmount)}</td>
                  <td className="date-cell">{formatDate(assessment.dueDate)}</td>
                  <td>{renderStatus(assessment.status)}</td>
                  <td className="actions-cell">
                    <button className="action-button view" title="View Details">
                      <FiEye />
                    </button>
                    <button className="action-button edit" title="Edit Assessment" disabled={assessment.status === 'Paid' || assessment.status === 'Cancelled'}>
                      <FiEdit2 />
                    </button>
                    <button className="action-button download" title="Download Assessment">
                      <FiDownload />
                    </button>
                    <button
                      className="action-button delete"
                      title="Delete Assessment"
                      onClick={() => handleDelete(assessment.id)}
                      disabled={assessment.status === 'Paid' || assessment.status === 'Issued'}
                    >
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AssessmentList; 