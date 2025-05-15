import React, { useState, useEffect, useMemo } from 'react';
import { 
  FiFileText, FiSearch, FiDownload, FiCheck, FiArrowLeft, FiArrowRight,
  FiClock, FiCheckCircle, FiAlertCircle, FiEye, FiPlayCircle
} from 'react-icons/fi';
import './TaxpayerReturns.css';
import { useNavigate } from 'react-router-dom';

const TaxpayerReturns = () => {
  const navigate = useNavigate();
  const [returnsList, setReturnsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [selectedReturns, setSelectedReturns] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Stats state for dashboard counters
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    verified: 0,
    rejected: 0
  });

  useEffect(() => {
    // Mock fetch of all tax returns
    setTimeout(() => {
      const mockData = [
        { id: 1, returnNumber: 'RTN-2023-001', taxpayerId: '1234', taxpayer: 'Aisha Bello', year: '2022', type: 'Personal Income Tax', submissionDate: '2023-03-01T14:20:00Z', status: 'Pending' },
        { id: 2, returnNumber: 'RTN-2022-001', taxpayerId: '5678', taxpayer: 'Tech Innovate Ltd', year: '2021', type: 'Corporate Tax', submissionDate: '2022-03-05T10:15:00Z', status: 'Verified' },
        { id: 3, returnNumber: 'RTN-2021-001', taxpayerId: '1234', taxpayer: 'Aisha Bello', year: '2020', type: 'Personal Income Tax', submissionDate: '2021-02-28T09:30:00Z', status: 'Pending' },
        { id: 4, returnNumber: 'RTN-2023-045', taxpayerId: '9012', taxpayer: 'Ibrahim Olatunji', year: '2022', type: 'Personal Income Tax', submissionDate: '2023-03-10T11:45:00Z', status: 'Verified' },
        { id: 5, returnNumber: 'RTN-2022-112', taxpayerId: '3456', taxpayer: 'Global Solutions Inc', year: '2021', type: 'Corporate Tax', submissionDate: '2022-02-15T09:20:00Z', status: 'Rejected' },
        { id: 6, returnNumber: 'RTN-2023-078', taxpayerId: '7890', taxpayer: 'Chioma Eze', year: '2022', type: 'Personal Income Tax', submissionDate: '2023-02-28T16:10:00Z', status: 'Pending' }
      ];

      setReturnsList(mockData);
      
      // Calculate stats
      const stats = {
        total: mockData.length,
        pending: mockData.filter(item => item.status === 'Pending').length,
        verified: mockData.filter(item => item.status === 'Verified').length,
        rejected: mockData.filter(item => item.status === 'Rejected').length
      };
      setStats(stats);
      setLoading(false);
    }, 1000);
  }, []);

  // Reset selection when filters change
  useEffect(() => {
    setSelectedReturns([]);
    setSelectAll(false);
  }, [statusFilter, yearFilter, searchTerm]);

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    }) + " at " + date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const handleViewDetails = (item) => {
    navigate(`/dashboard/tax-returns/${item.id}`);
  };

  const handleProcessReturn = (item) => {
    navigate(`/dashboard/tax-returns/${item.id}/process`);
  };

  const handleFilterChange = (type, value) => {
    if (type === 'status') {
      setStatusFilter(value);
    } else if (type === 'year') {
      setYearFilter(value);
    }
    setCurrentPage(1); // Reset to first page when filter changes
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when search changes
  };

  const clearFilters = () => {
    setStatusFilter('all');
    setYearFilter('all');
    setSearchTerm('');
    setCurrentPage(1);
  };

  const handleSelectReturn = (id) => {
    setSelectedReturns(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedReturns([]);
    } else {
      setSelectedReturns(filteredReturns.map(item => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleBulkProcess = () => {
    console.log('Processing selected returns:', selectedReturns);
    // Implementation would process selected returns
  };

  const handleExportData = () => {
    console.log('Exporting data for', filteredReturns.length, 'returns');
    // Implementation would export data
  };

  // Filter returns based on current filters
  const filteredReturns = useMemo(() => {
    return returnsList.filter(item => {
      const matchesStatus = statusFilter === 'all' || item.status.toLowerCase() === statusFilter.toLowerCase();
      const matchesYear = yearFilter === 'all' || item.year === yearFilter;
      const matchesSearch = searchTerm === '' || 
                           item.taxpayer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.returnNumber.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesStatus && matchesYear && matchesSearch;
    });
  }, [returnsList, statusFilter, yearFilter, searchTerm]);

  // Sort filtered returns
  const sortedReturns = useMemo(() => {
    if (!sortConfig.key) return filteredReturns;
    
    return [...filteredReturns].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredReturns, sortConfig]);

  // Pagination logic
  const itemsPerPage = 5;
  const totalPages = Math.ceil(sortedReturns.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedReturns.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="taxpayer-returns-container">
      <h1><FiFileText /> Tax Returns Management</h1>
      
      {/* Stats Dashboard */}
      <div className="returns-stats">
        <div className="stat-card total">
          <div className="stat-title">Total Returns</div>
          <div className="stat-value">{stats.total}</div>
          <div className="stat-icon" style={{ backgroundColor: '#f0fdfa', color: '#0d9488' }}>
            <FiFileText className="btn-icon-md" />
          </div>
        </div>
        <div className="stat-card pending">
          <div className="stat-title">Pending</div>
          <div className="stat-value">{stats.pending}</div>
          <div className="stat-icon" style={{ backgroundColor: '#fffbeb', color: '#d97706' }}>
            <FiClock className="btn-icon-md" />
          </div>
        </div>
        <div className="stat-card verified">
          <div className="stat-title">Verified</div>
          <div className="stat-value">{stats.verified}</div>
          <div className="stat-icon" style={{ backgroundColor: '#eff6ff', color: '#2563eb' }}>
            <FiCheckCircle className="btn-icon-md" />
          </div>
        </div>
        <div className="stat-card rejected">
          <div className="stat-title">Rejected</div>
          <div className="stat-value">{stats.rejected}</div>
          <div className="stat-icon" style={{ backgroundColor: '#fef2f2', color: '#dc2626' }}>
            <FiAlertCircle className="btn-icon-md" />
          </div>
        </div>
      </div>
      
      <div className="returns-card">
        <div className="returns-header">
          <h2>Tax Returns List</h2>
          <div className="returns-actions">
            <div className="search-control">
              <input
                type="text"
                placeholder="Search returns..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <FiSearch className="btn-icon-sm" />
            </div>
            
            <select 
              className="filter-select"
              value={statusFilter}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <select 
              className="filter-select"
              value={yearFilter}
              onChange={(e) => handleFilterChange('year', e.target.value)}
            >
              <option value="all">All Years</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
            
            <button className="export-button" onClick={handleExportData}>
              <FiDownload className="btn-icon-sm" /> Export
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className="loading-section">
            <div className="spinner"></div>
            <p>Loading tax returns...</p>
          </div>
        ) : filteredReturns.length > 0 ? (
          <>
            <div className="returns-table-container">
              <table className="data-table returns-table">
                <thead>
                  <tr>
                    <th className="checkbox-cell">
                      <input 
                        type="checkbox" 
                        className="checkbox-input"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th>Return #</th>
                    <th>Taxpayer</th>
                    <th>Year</th>
                    <th>Type</th>
                    <th>Submission Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(item => {
                    const isSelected = selectedReturns.includes(item.id);
                    return (
                      <tr key={item.id} className={isSelected ? 'selected' : ''}>
                        <td className="checkbox-cell">
                          <input 
                            type="checkbox" 
                            className="checkbox-input"
                            checked={isSelected}
                            onChange={() => handleSelectReturn(item.id)}
                          />
                        </td>
                        <td>{item.returnNumber}</td>
                        <td>{item.taxpayer}</td>
                        <td>{item.year}</td>
                        <td>{item.type}</td>
                        <td>{formatDateTime(item.submissionDate)}</td>
                        <td>
                          <span className={`status-badge status-${item.status.toLowerCase()}`}>
                            {item.status === 'Pending' && <FiClock className="btn-icon-sm" />}
                            {item.status === 'Verified' && <FiCheckCircle className="btn-icon-sm" />}
                            {item.status === 'Rejected' && <FiAlertCircle className="btn-icon-sm" />}
                            {item.status}
                          </span>
                        </td>
                        <td className="action-buttons">
                          <div style={{ display: 'flex', flexDirection: 'row', gap: '0.5rem', flexWrap: 'wrap' }}>
                            <button className="view-button" aria-label="View Details" onClick={() => handleViewDetails(item)}>
                              <FiEye className="btn-icon-sm" /> View Details
                            </button>
                            {item.status !== 'Verified' && (
                              <button className="process-button" aria-label="Process Return" onClick={() => handleProcessReturn(item)}>
                                <FiPlayCircle className="btn-icon-sm" /> Process
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="page-button" 
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  <FiArrowLeft className="btn-icon-sm" />
                </button>
                
                {Array.from({ length: totalPages }).map((_, index) => (
                  <button
                    key={index}
                    className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                ))}
                
                <button 
                  className="page-button" 
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  <FiArrowRight className="btn-icon-sm" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">
              <FiFileText />
            </div>
            <div className="empty-state-title">No tax returns found</div>
            <p className="empty-state-text">Try adjusting your filters or search terms</p>
            <button className="view-button" onClick={clearFilters}>Clear All Filters</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaxpayerReturns; 