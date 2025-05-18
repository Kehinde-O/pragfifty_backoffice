import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUsers, FiSearch, FiPlus, FiEdit2, FiTrash2, FiMail, FiPhone, FiCalendar,
  FiMapPin, FiBriefcase, FiUserCheck, FiUserX, FiClock, FiCheckCircle, FiXCircle,
  FiRefreshCw, FiChevronDown, FiChevronUp, FiUser, FiEye, FiFilter, FiDownload
} from 'react-icons/fi';
import { FaUserTie, FaIdCard, FaUserPlus } from 'react-icons/fa';
import styles from './Individuals.module.css';

const Individuals = () => {
  const [individuals, setIndividuals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingIndividual, setEditingIndividual] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'lastUpdated', direction: 'desc' });
  const [insights, setInsights] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    pending: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    middleName: '',
    tin: '',
    dateOfBirth: '',
    gender: 'Male',
    nationality: 'Nigerian',
    phone: '',
    email: '',
    address: {
      street: '',
      city: '',
      lga: '',
      state: ''
    },
    occupation: '',
    status: 'active' // active, inactive, pending_verification
  });

  const navigate = useNavigate();

  // Mock data - replace with API call
  const fetchIndividuals = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const mockIndividuals = [
        { id: 1, firstName: 'Aisha', lastName: 'Bello', middleName: 'Ngozi', tin: '1234567890', dateOfBirth: '1990-05-15', gender: 'Female', nationality: 'Nigerian', phone: '08012345678', email: 'aisha.bello@example.com', address: { street: '123 Main St', city: 'Abuja', lga: 'AMAC', state: 'FCT' }, occupation: 'Doctor', status: 'active', lastUpdated: '2023-11-20T10:30:00Z' },
        { id: 2, firstName: 'Chinedu', lastName: 'Okoro', middleName: '', tin: '0987654321', dateOfBirth: '1985-11-22', gender: 'Male', nationality: 'Nigerian', phone: '07098765432', email: 'chinedu.okoro@example.com', address: { street: '456 Market Rd', city: 'Lagos', lga: 'Ikeja', state: 'Lagos' }, occupation: 'Engineer', status: 'inactive', lastUpdated: '2023-11-18T14:15:00Z' },
        { id: 3, firstName: 'Fatima', lastName: 'Adamu', middleName: 'Binta', tin: '1122334455', dateOfBirth: '1995-02-10', gender: 'Female', nationality: 'Nigerian', phone: '09011223344', email: 'fatima.adamu@example.com', address: { street: '789 North Av', city: 'Kano', lga: 'Nassarawa', state: 'Kano' }, occupation: 'Teacher', status: 'pending_verification', lastUpdated: '2023-11-21T09:00:00Z' },
        { id: 4, firstName: 'Oluwaseun', lastName: 'Adeyemi', middleName: 'David', tin: '2233445566', dateOfBirth: '1988-07-12', gender: 'Male', nationality: 'Nigerian', phone: '08033445566', email: 'oluwaseun.adeyemi@example.com', address: { street: '10 Victoria Island', city: 'Lagos', lga: 'Eti-Osa', state: 'Lagos' }, occupation: 'Accountant', status: 'active', lastUpdated: '2023-11-19T13:20:00Z' },
        { id: 5, firstName: 'Ngozi', lastName: 'Eze', middleName: 'Chioma', tin: '3344556677', dateOfBirth: '1992-09-18', gender: 'Female', nationality: 'Nigerian', phone: '07055667788', email: 'ngozi.eze@example.com', address: { street: '22 Ada George Rd', city: 'Port Harcourt', lga: 'Obio/Akpor', state: 'Rivers' }, occupation: 'Lawyer', status: 'active', lastUpdated: '2023-11-15T11:00:00Z' },
      ];
      setIndividuals(mockIndividuals);
      
      // Calculate insights
      const total = mockIndividuals.length;
      const active = mockIndividuals.filter(ind => ind.status === 'active').length;
      const inactive = mockIndividuals.filter(ind => ind.status === 'inactive').length;
      const pending = mockIndividuals.filter(ind => ind.status === 'pending_verification').length;
      
      setInsights({
        total,
        active,
        inactive,
        pending
      });
      
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchIndividuals();
  }, [fetchIndividuals]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetFormData = useCallback(() => {
    setFormData({
      firstName: '', lastName: '', middleName: '', tin: '', dateOfBirth: '', gender: 'Male',
      nationality: 'Nigerian', phone: '', email: '',
      address: { street: '', city: '', lga: '', state: '' },
      occupation: '', status: 'active'
    });
  }, []);

  const openAddModal = () => {
    setEditingIndividual(null);
    resetFormData();
    setShowModal(true);
  };

  const openEditModal = (individual) => {
    setEditingIndividual(individual);
    setFormData({
      firstName: individual.firstName,
      lastName: individual.lastName,
      middleName: individual.middleName || '',
      tin: individual.tin,
      dateOfBirth: individual.dateOfBirth,
      gender: individual.gender,
      nationality: individual.nationality,
      phone: individual.phone,
      email: individual.email,
      address: { ...individual.address },
      occupation: individual.occupation,
      status: individual.status
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingIndividual(null);
    resetFormData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Simulate API call
    setTimeout(() => {
      if (editingIndividual) {
        setIndividuals(prevIndividuals => 
          prevIndividuals.map(ind => 
            ind.id === editingIndividual.id ? { ...ind, ...formData, id: ind.id, lastUpdated: new Date().toISOString() } : ind
          )
        );
      } else {
        const newIndividual = { 
          id: individuals.length > 0 ? Math.max(...individuals.map(i => i.id)) + 1 : 1, 
          ...formData,
          lastUpdated: new Date().toISOString()
        };
        setIndividuals(prevIndividuals => [...prevIndividuals, newIndividual]);
      }
      
      // Update insights
      const updatedIndividuals = editingIndividual 
        ? individuals.map(ind => ind.id === editingIndividual.id ? { ...ind, ...formData } : ind)
        : [...individuals, { id: individuals.length + 1, ...formData }];
      
      const total = updatedIndividuals.length;
      const active = updatedIndividuals.filter(ind => ind.status === 'active').length;
      const inactive = updatedIndividuals.filter(ind => ind.status === 'inactive').length;
      const pending = updatedIndividuals.filter(ind => ind.status === 'pending_verification').length;
      
      setInsights({
        total,
        active,
        inactive,
        pending
      });
      
      setLoading(false);
      closeModal();
    }, 500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this taxpayer record? This action cannot be undone.')) {
      setLoading(true); // Simulate API call
      setTimeout(() => {
        setIndividuals(prevIndividuals => prevIndividuals.filter(ind => ind.id !== id));
        
        // Update insights
        const updatedIndividuals = individuals.filter(ind => ind.id !== id);
        const total = updatedIndividuals.length;
        const active = updatedIndividuals.filter(ind => ind.status === 'active').length;
        const inactive = updatedIndividuals.filter(ind => ind.status === 'inactive').length;
        const pending = updatedIndividuals.filter(ind => ind.status === 'pending_verification').length;
        
        setInsights({
          total,
          active,
          inactive,
          pending
        });
        
        setLoading(false);
      }, 500);
    }
  };

  const viewDetails = (id) => {
    navigate(`/dashboard/taxpayers/individuals/${id}`);
  };

  const toggleSelectRow = (id) => {
    setSelectedRows(prevSelected => 
      prevSelected.includes(id)
        ? prevSelected.filter(rowId => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const toggleSelectAll = () => {
    setSelectedRows(
      selectedRows.length === filteredIndividuals.length
        ? []
        : filteredIndividuals.map(individual => individual.id)
    );
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedIndividuals = useCallback(() => {
    const sortableItems = [...individuals];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [individuals, sortConfig.direction, sortConfig.key]);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FiChevronDown className="sort-icon" />;
    return sortConfig.direction === 'asc' 
      ? <FiChevronUp className="sort-icon active" /> 
      : <FiChevronDown className="sort-icon active" />;
  };

  const filteredIndividuals = sortedIndividuals().filter(individual => {
    const matchesSearch = (individual.firstName + ' ' + individual.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
      individual.tin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      individual.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || individual.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    } catch {
      return dateString;
    }
  };

  const StatusBadge = ({ status }) => {
    let icon, text, className;
    switch (status) {
      case 'active':
        icon = <FiUserCheck />;
        text = 'Active';
        className = 'status-active';
        break;
      case 'inactive':
        icon = <FiUserX />;
        text = 'Inactive';
        className = 'status-inactive';
        break;
      case 'pending_verification':
        icon = <FiClock />;
        text = 'Pending';
        className = 'status-pending';
        break;
      default:
        icon = <FiUser />;
        text = 'Unknown';
        className = 'status-unknown';
    }
    return <span className={`status-badge ${className}`}>{icon}{text}</span>;
  };

  const downloadCSV = () => {
    // Implementation for downloading data as CSV
    alert('Download CSV functionality would be implemented here');
  };

  const handleBulkAction = (action) => {
    if (selectedRows.length === 0) {
      alert('Please select at least one taxpayer record');
      return;
    }

    if (action === 'delete' && window.confirm(`Are you sure you want to delete ${selectedRows.length} selected records? This cannot be undone.`)) {
      setIndividuals(prev => prev.filter(ind => !selectedRows.includes(ind.id)));
      setSelectedRows([]);
    } else if (action === 'export') {
      // Export functionality
      alert(`Exporting ${selectedRows.length} records`);
    } else if (action === 'status' && window.confirm(`Update status for ${selectedRows.length} records to active?`)) {
      setIndividuals(prev => 
        prev.map(ind => 
          selectedRows.includes(ind.id) ? {...ind, status: 'active'} : ind
        )
      );
      setSelectedRows([]);
    }
  };

  const totalPages = Math.ceil(filteredIndividuals.length / itemsPerPage);
  
  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIndividuals.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className="individuals-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Individual Taxpayers
          <div className="title-icon-container">
            <FaUserTie />
          </div>
        </h1>
      </div>

      {/* Insights Cards */}
      <div className="taxpayer-stats">
        <div className="stats-row">
          <div className="stat-item">
            <h4 className="stat-label">Total Individuals</h4>
            <div className="stat-value">
              {loading ? (
                <div className="skeleton-loader" style={{ width: '60px', height: '24px' }}></div>
              ) : (
                new Intl.NumberFormat().format(insights.total)
              )}
            </div>
            <p className="stat-subtext">Registered taxpayers</p>
          </div>
          
          <div className="stat-item">
            <h4 className="stat-label">Active</h4>
            <div className="stat-value active-value">
              {loading ? (
                <div className="skeleton-loader" style={{ width: '60px', height: '24px' }}></div>
              ) : (
                new Intl.NumberFormat().format(insights.active)
              )}
            </div>
            <p className="stat-subtext">
              <span className="stat-percentage">{insights.total ? Math.round((insights.active / insights.total) * 100) : 0}%</span> of total
            </p>
          </div>
          
          <div className="stat-item">
            <h4 className="stat-label">Pending Verification</h4>
            <div className="stat-value pending-value">
              {loading ? (
                <div className="skeleton-loader" style={{ width: '60px', height: '24px' }}></div>
              ) : (
                new Intl.NumberFormat().format(insights.pending)
              )}
            </div>
            <p className="stat-subtext">Need verification</p>
          </div>
          
          <div className="stat-item">
            <h4 className="stat-label">Inactive</h4>
            <div className="stat-value inactive-value">
              {loading ? (
                <div className="skeleton-loader" style={{ width: '60px', height: '24px' }}></div>
              ) : (
                new Intl.NumberFormat().format(insights.inactive)
              )}
            </div>
            <p className="stat-subtext">Not contributing</p>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="data-toolbar">
        <div className="search-filter-container">
          <div className="search-box">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by Name, TIN, Email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-box">
            <div className="filter-dropdown">
              <FiFilter className="filter-icon" />
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending_verification">Pending Verification</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="action-buttons-container">
          <button 
            type="button"
            className="download-button"
            onClick={downloadCSV}
            title="Export to CSV"
          >
            <FiDownload /> Export
          </button>
          
          <button 
            type="button"
            className="primary-button"
            onClick={openAddModal}
          >
            <FiPlus /> Add New Individual
          </button>
        </div>
      </div>

      {/* Bulk actions when rows are selected */}
      {selectedRows.length > 0 && (
        <div className="bulk-actions-bar">
          <span className="selected-count">{selectedRows.length} taxpayer{selectedRows.length !== 1 ? 's' : ''} selected</span>
          <div className="bulk-buttons">
            <button type="button" onClick={() => handleBulkAction('status')} className="bulk-button status-button">
              <FiCheckCircle /> Mark Active
            </button>
            <button type="button" onClick={() => handleBulkAction('export')} className="bulk-button export-button">
              <FiDownload /> Export Selected
            </button>
            <button type="button" onClick={() => handleBulkAction('delete')} className="bulk-button delete-bulk-button">
              <FiTrash2 /> Delete Selected
            </button>
          </div>
        </div>
      )}

      <div className="card">
        {loading && individuals.length === 0 ? (
          <div className="loading-indicator">
            <FiRefreshCw className="spinning" />
            <p>Loading taxpayer data...</p>
          </div>
        ) : !loading && filteredIndividuals.length === 0 ? (
          <div className="no-results">
            <FaUserPlus size={48} style={{ marginBottom: '1rem', color: '#94a3b8' }}/>
            <p>No individual taxpayers found.</p>
            {searchTerm && <p>Try adjusting your search term or adding new taxpayers.</p>}
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="checkbox-cell">
                    <input 
                      type="checkbox" 
                      checked={selectedRows.length === filteredIndividuals.length && filteredIndividuals.length > 0}
                      onChange={toggleSelectAll}
                      className="checkbox"
                    />
                  </th>
                  <th onClick={() => handleSort('lastName')} className="sortable">
                    <span>Name {getSortIcon('lastName')}</span>
                  </th>
                  <th onClick={() => handleSort('tin')} className="sortable">
                    <span>TIN {getSortIcon('tin')}</span>
                  </th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th onClick={() => handleSort('status')} className="sortable">
                    <span>Status {getSortIcon('status')}</span>
                  </th>
                  <th onClick={() => handleSort('lastUpdated')} className="sortable">
                    <span>Last Updated {getSortIcon('lastUpdated')}</span>
                  </th>
                  <th className="actions-cell">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(individual => (
                  <tr 
                    key={individual.id} 
                    className={`${selectedRows.includes(individual.id) ? 'selected-row' : ''} clickable-row`}
                    onClick={() => viewDetails(individual.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        viewDetails(individual.id);
                      }
                    }}
                  >
                    <td className="checkbox-cell" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(individual.id)}
                        onChange={() => toggleSelectRow(individual.id)}
                        className="checkbox"
                      />
                    </td>
                    <td className="name-cell">
                      <div className="name-container">
                        <span className="initial">{individual.firstName[0]}{individual.lastName[0]}</span>
                        <div className="name-details">
                          <span className="fullname">{`${individual.firstName} ${individual.lastName}`}</span>
                          <span className="subdetail">{individual.occupation}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="tin-display">
                        <FaIdCard className="tin-icon" />
                        <span>{individual.tin}</span>
                      </div>
                    </td>
                    <td>
                      <div className="with-icon">
                        <FiMail className="cell-icon" />
                        <span>{individual.email}</span>
                      </div>
                    </td>
                    <td>
                      <div className="with-icon">
                        <FiPhone className="cell-icon" />
                        <span>{individual.phone}</span>
                      </div>
                    </td>
                    <td><StatusBadge status={individual.status} /></td>
                    <td>
                      <div className="with-icon">
                        <FiCalendar className="cell-icon" />
                        <span>{formatDateTime(individual.lastUpdated)}</span>
                      </div>
                    </td>
                    <td className="actions-cell" onClick={(e) => e.stopPropagation()}>
                      <div className="action-buttons">
                        <button 
                          className="table-action-button view-button" 
                          onClick={(e) => { e.stopPropagation(); viewDetails(individual.id); }}
                          title="View Details"
                        >
                          <FiEye />
                        </button>
                        <button 
                          className="table-action-button edit-button" 
                          onClick={(e) => { e.stopPropagation(); openEditModal(individual); }}
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          className="table-action-button delete-button" 
                          onClick={(e) => { e.stopPropagation(); handleDelete(individual.id); }}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Pagination Controls after the table */}
      {!loading && filteredIndividuals.length > 0 && (
        <div className="pagination-container">
          <div className="items-per-page">
            <span>Show</span>
            <select 
              value={itemsPerPage} 
              onChange={handleItemsPerPageChange}
              className="items-per-page-select"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>
          
          <div className="pagination-info">
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredIndividuals.length)} of {filteredIndividuals.length} entries
          </div>
          
          <div className="pagination-controls">
            <button 
              className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button 
              className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            {/* Page Numbers */}
            <div className="page-numbers">
              {[...Array(totalPages).keys()].map(number => {
                // Show current page, first and last page, and one page before and after current
                const pageNumber = number + 1;
                if (
                  pageNumber === 1 || 
                  pageNumber === totalPages || 
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button 
                      key={pageNumber}
                      className={`pagination-number ${pageNumber === currentPage ? 'active' : ''}`}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  (pageNumber === 2 && currentPage > 3) || 
                  (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return <span key={pageNumber} className="pagination-ellipsis">...</span>;
                }
                return null;
              })}
            </div>
            
            <button 
              className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button 
              className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      )}

      {/* Modal for Add/Edit */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>
              {editingIndividual ? <><FiEdit2 className="modal-icon" /> Edit Individual</> : <><FiPlus className="modal-icon" /> Add New Individual</>}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="middleName">Middle Name</label>
                  <input
                    type="text"
                    id="middleName"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tin">TIN *</label>
                  <input
                    type="text"
                    id="tin"
                    name="tin"
                    value={formData.tin}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth *</label>
                  <div className="input-with-icon">
                    <FiCalendar className="input-icon" />
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="gender">Gender *</label>
                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="nationality">Nationality *</label>
                  <input
                    type="text"
                    id="nationality"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number *</label>
                  <div className="input-with-icon">
                    <FiPhone className="input-icon" />
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <div className="input-with-icon">
                    <FiMail className="input-icon" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-fieldset">
                <legend>Address</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address.street">Street *</label>
                    <input
                      type="text"
                      id="address.street"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address.city">City *</label>
                    <input
                      type="text"
                      id="address.city"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address.lga">LGA *</label>
                    <input
                      type="text"
                      id="address.lga"
                      name="address.lga"
                      value={formData.address.lga}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address.state">State *</label>
                    <input
                      type="text"
                      id="address.state"
                      name="address.state"
                      value={formData.address.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="occupation">Occupation *</label>
                  <div className="input-with-icon">
                    <FiBriefcase className="input-icon" />
                    <input
                      type="text"
                      id="occupation"
                      name="occupation"
                      value={formData.occupation}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status *</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending_verification">Pending Verification</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  {editingIndividual ? 'Update Taxpayer' : 'Add Taxpayer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Individuals; 