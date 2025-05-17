import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiPlus, 
  FiSearch, 
  FiFilter, 
  FiEye, 
  FiEdit, 
  FiCheckCircle, 
  FiRefreshCw, 
  FiCalendar,
  FiClock,
  FiFileText,
  FiAlertCircle
} from 'react-icons/fi';
import './TCC.css';

function TCCApplicationList() {
  const navigate = useNavigate();
  const [tccApplications, setTCCApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [filterYear, setFilterYear] = useState('ALL');
  const [pendingCount, setPendingCount] = useState(0);

  // Mock data - replace with API call in production
  useEffect(() => {
    const fetchTCCApplications = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockTCCApplications = [
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
        
        setTCCApplications(mockTCCApplications);
        
        // Calculate pending applications
        const pending = mockTCCApplications.filter(app => 
          app.status === 'SUBMITTED' || app.status === 'UNDER_REVIEW'
        ).length;
        setPendingCount(pending);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching TCC applications:', error);
        setLoading(false);
      }
    };

    fetchTCCApplications();
  }, []);

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
  const handleRefreshData = () => {
    setLoading(true);
    // This would trigger the useEffect to fetch new data
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Filter applications based on search term and filters
  const filteredApplications = tccApplications.filter(app => {
    const matchesSearch = 
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.taxpayerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.tin.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filterStatus === 'ALL' || app.status === filterStatus;
    const matchesYear = filterYear === 'ALL' || app.year === filterYear;
    
    return matchesSearch && matchesStatus && matchesYear;
  });

  // Get unique years for filter
  const availableYears = [...new Set(tccApplications.map(app => app.year))];

  // Status badge component with color coding
  const StatusBadge = ({ status }) => {
    let badgeClass = 'status-badge ';
    
    switch (status) {
      case 'APPROVED':
        badgeClass += 'status-approved';
        break;
      case 'REJECTED':
        badgeClass += 'status-rejected';
        break;
      case 'UNDER_REVIEW':
        badgeClass += 'status-review';
        break;
      case 'SUBMITTED':
        badgeClass += 'status-submitted';
        break;
      default:
        badgeClass += 'status-draft';
    }
    
    // Format status for display (replace underscores with spaces and capitalize)
    const formattedStatus = status.replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return <span className={badgeClass}>{formattedStatus}</span>;
  };

  // Function to determine if application needs processing
  const needsProcessing = (status) => {
    return status === 'SUBMITTED' || status === 'UNDER_REVIEW';
  };

  return (
    <div className="tcc-application-list content-container">
      <header className="header-section">
        <div>
          <h2>TCC Applications</h2>
          <p>Manage Tax Clearance Certificate Applications</p>
        </div>
        <div className="dashboard-controls">
          <div className="control-item">
            <button className="refresh-button" onClick={handleRefreshData} disabled={loading}>
              <FiRefreshCw className={loading ? "spinning" : ""} />
              <span>Refresh Data</span>
            </button>
          </div>
          <div className="control-item">
            <button className="primary-button" onClick={handleCreateTCC}>
              <FiPlus /> New Application
            </button>
          </div>
        </div>
      </header>

      {/* Summary cards */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <FiFileText />
          </div>
          <div className="stat-details">
            <h3>Total Applications</h3>
            <p className="stat-value">{tccApplications.length}</p>
            <p className="stat-change">
              <span className="period">All time</span>
            </p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon pending">
            <FiClock />
          </div>
          <div className="stat-details">
            <h3>Pending Processing</h3>
            <p className="stat-value">{pendingCount}</p>
            {pendingCount > 0 && (
              <p className="stat-change">
                <button 
                  className="action-link" 
                  onClick={() => setFilterStatus('SUBMITTED')}>
                  <FiCheckCircle /> Process now
                </button>
              </p>
            )}
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon approved">
            <FiCheckCircle />
          </div>
          <div className="stat-details">
            <h3>Approved TCCs</h3>
            <p className="stat-value">{tccApplications.filter(app => app.status === 'APPROVED').length}</p>
            <p className="stat-change">
              <span className="period">Active certificates</span>
            </p>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-box">
          <FiSearch />
          <input
            type="text"
            placeholder="Search by application number, taxpayer name or TIN..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-controls">
          <div className="filter-item">
            <label htmlFor="status-filter"><FiFilter /> Status:</label>
            <select 
              id="status-filter"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="ALL">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
          
          <div className="filter-item">
            <label htmlFor="year-filter"><FiCalendar /> Year:</label>
            <select 
              id="year-filter"
              value={filterYear}
              onChange={(e) => setFilterYear(e.target.value)}
            >
              <option value="ALL">All Years</option>
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-indicator">Loading TCC applications...</div>
      ) : (
        <div className="dashboard-card">
          {filteredApplications.length === 0 ? (
            <div className="no-data-message">
              <FiAlertCircle size={48} className="no-data-icon" />
              <h3>No applications found</h3>
              <p>No TCC applications found matching your filters.</p>
            </div>
          ) : (
            <div className="card-content">
              <table className="data-table tcc-table">
                <thead>
                  <tr>
                    <th>Application #</th>
                    <th>Taxpayer Name</th>
                    <th>TIN</th>
                    <th>Application Date</th>
                    <th>Year</th>
                    <th>Status</th>
                    <th>TCC Number</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApplications.map((application) => (
                    <tr key={application.id} className={needsProcessing(application.status) ? 'needs-processing' : ''}>
                      <td>{application.applicationNumber}</td>
                      <td>{application.taxpayerName}</td>
                      <td>{application.tin}</td>
                      <td>{formatDate(application.applicationDate)}</td>
                      <td>{application.year}</td>
                      <td><StatusBadge status={application.status} /></td>
                      <td>{application.tccNumber || 'Not issued'}</td>
                      <td>
                        <div className="actions-cell">
                          <button 
                            className="icon-button view" 
                            title="View Details"
                            onClick={() => handleViewDetails(application.id)}
                          >
                            <FiEye />
                          </button>
                          {needsProcessing(application.status) && (
                            <button 
                              className="process-button" 
                              title="Process Application"
                              onClick={() => handleProcessTCC(application.id)}
                            >
                              <FiCheckCircle /> Process
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TCCApplicationList; 