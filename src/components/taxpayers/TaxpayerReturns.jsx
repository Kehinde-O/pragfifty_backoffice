import React, { useState, useEffect, useMemo } from 'react';
import { 
  FiFileText, FiSearch, FiDownload, FiCheck, FiArrowLeft, FiArrowRight,
  FiClock, FiCheckCircle, FiAlertCircle, FiEye, FiPlayCircle, FiChevronUp, FiChevronDown
} from 'react-icons/fi';
import styles from './TaxpayerReturns.module.css';
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
  
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      key = '';
      direction = '';
    }
    setSortConfig({ key, direction });
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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Tax Returns Management
          <div className={styles.titleIconContainer}>
            <FiFileText />
          </div>
        </h1>
        <p className={styles.subtitle}>View and manage all tax returns submitted by taxpayers</p>
      </div>
      
      {/* Stats Dashboard */}
      <div className={styles.statsRow}>
        <div className={`${styles.statCard} ${styles.totalStat}`}>
          <div className={styles.statTitle}>Total Returns</div>
          <div className={styles.statValue}>{stats.total}</div>
          <div className={styles.statSubtext}>All tax returns in the system</div>
          <FiFileText className={styles.statIcon} />
        </div>
        <div className={`${styles.statCard} ${styles.pendingStat}`}>
          <div className={styles.statTitle}>Pending</div>
          <div className={styles.statValue}>{stats.pending}</div>
          <div className={styles.statSubtext}>Returns awaiting verification</div>
          <FiClock className={styles.statIcon} />
        </div>
        <div className={`${styles.statCard} ${styles.verifiedStat}`}>
          <div className={styles.statTitle}>Verified</div>
          <div className={styles.statValue}>{stats.verified}</div>
          <div className={styles.statSubtext}>Successfully verified returns</div>
          <FiCheckCircle className={styles.statIcon} />
        </div>
        <div className={`${styles.statCard} ${styles.rejectedStat}`}>
          <div className={styles.statTitle}>Rejected</div>
          <div className={styles.statValue}>{stats.rejected}</div>
          <div className={styles.statSubtext}>Returns with issues</div>
          <FiAlertCircle className={styles.statIcon} />
        </div>
      </div>
      
      <div className={styles.tableCard}>
        <div className={styles.tableHeader}>
          <h2 className={styles.tableTitle}>
            <FiFileText className={styles.tableIcon} /> Tax Returns List
          </h2>
          <div className={styles.filterContainer}>
            <div className={styles.searchBox}>
              <FiSearch className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Search by taxpayer or return number..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <select 
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="verified">Verified</option>
              <option value="rejected">Rejected</option>
            </select>
            
            <select 
              className={styles.filterSelect}
              value={yearFilter}
              onChange={(e) => handleFilterChange('year', e.target.value)}
            >
              <option value="all">All Years</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
              <option value="2020">2020</option>
            </select>
            
            <button className={styles.exportButton} onClick={handleExportData}>
              <FiDownload /> Export
            </button>
          </div>
        </div>
        
        {loading ? (
          <div className={styles.loadingState}>
            <div className={styles.spinner}></div>
            <p>Loading tax returns...</p>
          </div>
        ) : currentItems.length === 0 ? (
          <div className={styles.emptyState}>
            <FiFileText className={styles.emptyStateIcon} />
            <h3 className={styles.emptyStateTitle}>No tax returns found</h3>
            <p className={styles.emptyStateText}>
              {searchTerm || statusFilter !== 'all' || yearFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'There are no tax returns in the system yet.'}
            </p>
            {(searchTerm || statusFilter !== 'all' || yearFilter !== 'all') && (
              <button className={styles.filterButton} onClick={clearFilters}>
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <>
            <div className={styles.tableContainer}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th className={styles.checkboxCell}>
                      <input 
                        type="checkbox" 
                        className={styles.checkbox}
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </th>
                    <th 
                      className={styles.sortableHeaderCell} 
                      onClick={() => handleSort('returnNumber')}
                    >
                      <div className={styles.headerCellContent}>
                        Return #
                        {sortConfig.key === 'returnNumber' && (
                          sortConfig.direction === 'asc' 
                            ? <FiChevronUp className={`${styles.sortIcon} ${styles.sortIconActive}`} />
                            : <FiChevronDown className={`${styles.sortIcon} ${styles.sortIconActive}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className={styles.sortableHeaderCell}
                      onClick={() => handleSort('taxpayer')}
                    >
                      <div className={styles.headerCellContent}>
                        Taxpayer
                        {sortConfig.key === 'taxpayer' && (
                          sortConfig.direction === 'asc' 
                            ? <FiChevronUp className={`${styles.sortIcon} ${styles.sortIconActive}`} />
                            : <FiChevronDown className={`${styles.sortIcon} ${styles.sortIconActive}`} />
                        )}
                      </div>
                    </th>
                    <th className={styles.tableHeaderCell}>Type</th>
                    <th 
                      className={styles.sortableHeaderCell}
                      onClick={() => handleSort('year')}
                    >
                      <div className={styles.headerCellContent}>
                        Year
                        {sortConfig.key === 'year' && (
                          sortConfig.direction === 'asc' 
                            ? <FiChevronUp className={`${styles.sortIcon} ${styles.sortIconActive}`} />
                            : <FiChevronDown className={`${styles.sortIcon} ${styles.sortIconActive}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className={styles.sortableHeaderCell}
                      onClick={() => handleSort('submissionDate')}
                    >
                      <div className={styles.headerCellContent}>
                        Submitted
                        {sortConfig.key === 'submissionDate' && (
                          sortConfig.direction === 'asc' 
                            ? <FiChevronUp className={`${styles.sortIcon} ${styles.sortIconActive}`} />
                            : <FiChevronDown className={`${styles.sortIcon} ${styles.sortIconActive}`} />
                        )}
                      </div>
                    </th>
                    <th 
                      className={styles.sortableHeaderCell}
                      onClick={() => handleSort('status')}
                    >
                      <div className={styles.headerCellContent}>
                        Status
                        {sortConfig.key === 'status' && (
                          sortConfig.direction === 'asc' 
                            ? <FiChevronUp className={`${styles.sortIcon} ${styles.sortIconActive}`} />
                            : <FiChevronDown className={`${styles.sortIcon} ${styles.sortIconActive}`} />
                        )}
                      </div>
                    </th>
                    <th className={styles.tableHeaderCell}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map(item => (
                    <tr 
                      key={item.id} 
                      className={`${styles.tableRow} ${selectedReturns.includes(item.id) ? styles.selectedRow : ''}`}
                    >
                      <td className={styles.checkboxCell}>
                        <input 
                          type="checkbox" 
                          className={styles.checkbox}
                          checked={selectedReturns.includes(item.id)}
                          onChange={() => handleSelectReturn(item.id)}
                        />
                      </td>
                      <td className={styles.tableCell}>{item.returnNumber}</td>
                      <td className={styles.tableCell}>{item.taxpayer}</td>
                      <td className={styles.tableCell}>{item.type}</td>
                      <td className={styles.tableCell}>{item.year}</td>
                      <td className={styles.tableCell}>{formatDateTime(item.submissionDate)}</td>
                      <td className={styles.tableCell}>
                        <span className={`${styles.statusBadge} ${
                          item.status === 'Pending' ? styles.pendingBadge : 
                          item.status === 'Verified' ? styles.verifiedBadge : 
                          styles.rejectedBadge
                        }`}>
                          {item.status === 'Pending' && <FiClock />}
                          {item.status === 'Verified' && <FiCheckCircle />}
                          {item.status === 'Rejected' && <FiAlertCircle />}
                          {item.status}
                        </span>
                      </td>
                      <td className={styles.tableCell}>
                        <div className={styles.actionButtons}>
                          <button 
                            className={styles.viewButton}
                            onClick={() => handleViewDetails(item)}
                          >
                            <FiEye /> View
                          </button>
                          {item.status !== 'Verified' && (
                            <button 
                              className={styles.processButton}
                              onClick={() => handleProcessReturn(item)}
                            >
                              <FiPlayCircle /> Process
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className={styles.paginationContainer}>
              <div className={styles.paginationInfo}>
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, sortedReturns.length)} of {sortedReturns.length} entries
              </div>
              <div className={styles.paginationControls}>
                <button 
                  className={styles.pageButton}
                  onClick={() => paginate(1)}
                  disabled={currentPage === 1}
                >
                  <FiArrowLeft className={styles.pageButtonIcon} />
                </button>
                
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    className={`${styles.pageButton} ${currentPage === i + 1 ? styles.pageButtonActive : ''}`}
                    onClick={() => paginate(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
                
                <button 
                  className={styles.pageButton}
                  onClick={() => paginate(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  <FiArrowRight className={styles.pageButtonIcon} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TaxpayerReturns; 