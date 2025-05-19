import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiSearch, FiPlus, FiEdit2, FiTrash2, FiMail, FiPhone, FiCalendar,
  FiMapPin, FiCheckCircle, FiXCircle, FiClock, FiRefreshCw,
  FiChevronDown, FiChevronUp, FiEye, FiFilter, FiDownload,
  FiHash, FiExternalLink, FiCheck, FiAlertTriangle, FiSlash, FiMoreHorizontal,
  FiBriefcase, FiDollarSign, FiTarget
} from 'react-icons/fi';
import { FaBuilding, FaIdCard, FaRegBuilding } from 'react-icons/fa';
import styles from './Businesses.module.css';

const Businesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
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
    businessName: '',
    tin: '',
    registrationNumber: '',
    businessType: 'Limited Liability Company',
    industry: '',
    dateEstablished: '',
    phone: '',
    email: '',
    address: {
      street: '',
      city: '',
      lga: '',
      state: ''
    },
    contactPerson: {
      name: '',
      position: '',
      phone: '',
      email: ''
    },
    status: 'active' // active, inactive, pending_verification
  });

  const navigate = useNavigate();

  // Mock data - replace with API call
  const fetchBusinesses = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const mockBusinesses = [
        { id: 1, businessName: 'Tech Innovate Ltd', tin: 'TIN12345678', registrationNumber: 'RC123456', businessType: 'Limited Liability Company', industry: 'Information Technology', dateEstablished: '2015-03-10', phone: '08055005500', email: 'info@techinnovate.com', address: { street: '5 Innovation Drive', city: 'Lagos', lga: 'Victoria Island', state: 'Lagos' }, contactPerson: { name: 'Oluwaseun Adeyemi', position: 'CEO', phone: '08055005501', email: 'seun.a@techinnovate.com' }, status: 'active', lastUpdated: '2023-11-20T10:30:00Z', annualRevenue: '₦350,000,000' },
        { id: 2, businessName: 'Global Logistics Nigeria', tin: 'TIN98765432', registrationNumber: 'RC654321', businessType: 'Limited Liability Company', industry: 'Logistics & Transportation', dateEstablished: '2010-06-15', phone: '08022003300', email: 'contact@globallogistics.ng', address: { street: '25 Port Complex Road', city: 'Lagos', lga: 'Apapa', state: 'Lagos' }, contactPerson: { name: 'Amina Ibrahim', position: 'Managing Director', phone: '08022003301', email: 'a.ibrahim@globallogistics.ng' }, status: 'active', lastUpdated: '2023-11-15T09:45:00Z', annualRevenue: '₦750,000,000' },
        { id: 3, businessName: 'Sunshine Farms', tin: 'TIN11223344', registrationNumber: 'BN112233', businessType: 'Enterprise', industry: 'Agriculture', dateEstablished: '2018-01-20', phone: '07044556677', email: 'hello@sunshinefarms.com', address: { street: 'Plot 45, Farm Settlement', city: 'Ibadan', lga: 'Egbeda', state: 'Oyo' }, contactPerson: { name: 'Tunde Oladele', position: 'Owner', phone: '07044556677', email: 'tunde@sunshinefarms.com' }, status: 'pending_verification', lastUpdated: '2023-11-18T16:20:00Z', annualRevenue: '₦85,000,000' },
        { id: 4, businessName: 'Sunset Hotels & Resorts', tin: 'TIN55667788', registrationNumber: 'RC445566', businessType: 'Limited Liability Company', industry: 'Hospitality', dateEstablished: '2012-04-05', phone: '09088776655', email: 'reservations@sunsethotels.com', address: { street: '10 Oceanview Road', city: 'Calabar', lga: 'Calabar Municipal', state: 'Cross River' }, contactPerson: { name: 'Ngozi Okafor', position: 'General Manager', phone: '09088776600', email: 'ngozi@sunsethotels.com' }, status: 'inactive', lastUpdated: '2023-11-10T11:30:00Z', annualRevenue: '₦180,000,000' },
        { id: 5, businessName: 'Premier Education Academy', tin: 'TIN99887766', registrationNumber: 'RC998877', businessType: 'Limited Liability Company', industry: 'Education', dateEstablished: '2008-08-10', phone: '08133445566', email: 'info@premiereducation.org', address: { street: '15 Knowledge Avenue', city: 'Abuja', lga: 'Bwari', state: 'FCT' }, contactPerson: { name: 'Emmanuel Adebayo', position: 'Director', phone: '08133445500', email: 'e.adebayo@premiereducation.org' }, status: 'active', lastUpdated: '2023-11-05T14:45:00Z', annualRevenue: '₦120,000,000' },
      ];
      setBusinesses(mockBusinesses);
      
      // Calculate insights
      const total = mockBusinesses.length;
      const active = mockBusinesses.filter(bus => bus.status === 'active').length;
      const inactive = mockBusinesses.filter(bus => bus.status === 'inactive').length;
      const pending = mockBusinesses.filter(bus => bus.status === 'pending_verification').length;
      
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
    fetchBusinesses();
  }, [fetchBusinesses]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [addressField]: value }
      }));
    } else if (name.startsWith('contactPerson.')) {
      const contactField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        contactPerson: { ...prev.contactPerson, [contactField]: value }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const resetFormData = useCallback(() => {
    setFormData({
      businessName: '',
      tin: '',
      registrationNumber: '',
      businessType: 'Limited Liability Company',
      industry: '',
      dateEstablished: '',
      phone: '',
      email: '',
      address: {
        street: '',
        city: '',
        lga: '',
        state: ''
      },
      contactPerson: {
        name: '',
        position: '',
        phone: '',
        email: ''
      },
      status: 'active'
    });
  }, []);

  const openAddModal = () => {
    setEditingBusiness(null);
    resetFormData();
    setShowModal(true);
  };

  const openEditModal = (business) => {
    setEditingBusiness(business);
    setFormData({
      businessName: business.businessName,
      tin: business.tin,
      registrationNumber: business.registrationNumber || '',
      businessType: business.businessType,
      industry: business.industry || '',
      dateEstablished: business.dateEstablished,
      phone: business.phone,
      email: business.email,
      address: { ...business.address },
      contactPerson: { ...business.contactPerson },
      status: business.status
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBusiness(null);
    resetFormData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Simulate API call
    setTimeout(() => {
      if (editingBusiness) {
        setBusinesses(prevBusinesses => 
          prevBusinesses.map(bus => 
            bus.id === editingBusiness.id ? { ...bus, ...formData, id: bus.id, lastUpdated: new Date().toISOString() } : bus
          )
        );
      } else {
        const newBusiness = { 
          id: businesses.length > 0 ? Math.max(...businesses.map(b => b.id)) + 1 : 1, 
          ...formData,
          lastUpdated: new Date().toISOString()
        };
        setBusinesses(prevBusinesses => [...prevBusinesses, newBusiness]);
      }
      
      // Update insights
      const updatedBusinesses = editingBusiness 
        ? businesses.map(bus => bus.id === editingBusiness.id ? { ...bus, ...formData } : bus)
        : [...businesses, { id: businesses.length + 1, ...formData }];
      
      const total = updatedBusinesses.length;
      const active = updatedBusinesses.filter(bus => bus.status === 'active').length;
      const inactive = updatedBusinesses.filter(bus => bus.status === 'inactive').length;
      const pending = updatedBusinesses.filter(bus => bus.status === 'pending_verification').length;
      
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
    if (window.confirm('Are you sure you want to delete this business record? This action cannot be undone.')) {
      setLoading(true); // Simulate API call
      setTimeout(() => {
        setBusinesses(prevBusinesses => prevBusinesses.filter(bus => bus.id !== id));
        
        // Update insights
        const updatedBusinesses = businesses.filter(bus => bus.id !== id);
        const total = updatedBusinesses.length;
        const active = updatedBusinesses.filter(bus => bus.status === 'active').length;
        const inactive = updatedBusinesses.filter(bus => bus.status === 'inactive').length;
        const pending = updatedBusinesses.filter(bus => bus.status === 'pending_verification').length;
        
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
    navigate(`/dashboard/taxpayers/businesses/${id}`);
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
      selectedRows.length === filteredBusinesses.length
        ? []
        : filteredBusinesses.map(business => business.id)
    );
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedBusinesses = useCallback(() => {
    const sortableItems = [...businesses];
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
  }, [businesses, sortConfig.direction, sortConfig.key]);

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FiChevronDown className={styles.sortIcon} />;
    return sortConfig.direction === 'asc' 
      ? <FiChevronUp className={`${styles.sortIcon} ${styles.active}`} /> 
      : <FiChevronDown className={`${styles.sortIcon} ${styles.active}`} />;
  };

  const filteredBusinesses = sortedBusinesses().filter(business => {
    const matchesSearch = 
      business.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.tin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      business.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (business.registrationNumber && business.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterStatus === 'all' || business.status === filterStatus;
    
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
    let icon, text, badgeClass;
    switch (status) {
      case 'active':
        icon = <FiCheck />;
        text = 'Active';
        badgeClass = styles.statusActive;
        break;
      case 'inactive':
        icon = <FiSlash />;
        text = 'Inactive';
        badgeClass = styles.statusInactive;
        break;
      case 'pending_verification':
        icon = <FiClock />;
        text = 'Pending';
        badgeClass = styles.statusPending;
        break;
      default:
        icon = <FiAlertTriangle />;
        text = 'Unknown';
        badgeClass = styles.statusUnknown;
    }
    return <span className={`${styles.statusBadge} ${badgeClass}`}>{icon}{text}</span>;
  };

  const downloadCSV = () => {
    // Implementation for downloading data as CSV
    alert('Download CSV functionality would be implemented here');
  };

  const handleBulkAction = (action) => {
    if (selectedRows.length === 0) {
      alert('Please select at least one business record');
      return;
    }

    if (action === 'delete' && window.confirm(`Are you sure you want to delete ${selectedRows.length} selected records? This cannot be undone.`)) {
      setBusinesses(prev => prev.filter(bus => !selectedRows.includes(bus.id)));
      setSelectedRows([]);
    } else if (action === 'export') {
      // Export functionality
      alert(`Exporting ${selectedRows.length} records`);
    } else if (action === 'status' && window.confirm(`Update status for ${selectedRows.length} records to active?`)) {
      setBusinesses(prev => 
        prev.map(bus => 
          selectedRows.includes(bus.id) ? {...bus, status: 'active'} : bus
        )
      );
      setSelectedRows([]);
    }
  };

  const totalPages = Math.ceil(filteredBusinesses.length / itemsPerPage);
  
  // Get current page data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBusinesses.slice(indexOfFirstItem, indexOfLastItem);
  
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Business Taxpayers
          <div className={styles.titleIconContainer}>
            <FaBuilding />
          </div>
        </h1>
      </div>

      {/* Insights Cards */}
      <div className={styles.stats}>
        <div className={styles.statsRow}>
          <div className={styles.statItem}>
            <h4 className={styles.statLabel}>Total Businesses</h4>
            <div className={styles.statValue}>
              {loading ? (
                <div className={styles.skeletonLoader} style={{ width: '60px', height: '24px' }}></div>
              ) : (
                new Intl.NumberFormat().format(insights.total)
              )}
            </div>
            <p className={styles.statSubtext}>Registered taxpayers</p>
          </div>
          
          <div className={styles.statItem}>
            <h4 className={styles.statLabel}>Active</h4>
            <div className={`${styles.statValue} ${styles.activeValue}`}>
              {loading ? (
                <div className={styles.skeletonLoader} style={{ width: '60px', height: '24px' }}></div>
              ) : (
                new Intl.NumberFormat().format(insights.active)
              )}
            </div>
            <p className={styles.statSubtext}>
              <span className={styles.statPercentage}>{insights.total ? Math.round((insights.active / insights.total) * 100) : 0}%</span> of total
            </p>
          </div>
          
          <div className={styles.statItem}>
            <h4 className={styles.statLabel}>Pending Verification</h4>
            <div className={`${styles.statValue} ${styles.pendingValue}`}>
              {loading ? (
                <div className={styles.skeletonLoader} style={{ width: '60px', height: '24px' }}></div>
              ) : (
                new Intl.NumberFormat().format(insights.pending)
              )}
            </div>
            <p className={styles.statSubtext}>Need verification</p>
          </div>
          
          <div className={styles.statItem}>
            <h4 className={styles.statLabel}>Inactive</h4>
            <div className={`${styles.statValue} ${styles.inactiveValue}`}>
              {loading ? (
                <div className={styles.skeletonLoader} style={{ width: '60px', height: '24px' }}></div>
              ) : (
                new Intl.NumberFormat().format(insights.inactive)
              )}
            </div>
            <p className={styles.statSubtext}>Not contributing</p>
          </div>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className={styles.toolbar}>
        <div className={styles.searchFilterContainer}>
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by Name, TIN, Registration Number..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
          
          <div className={styles.filterBox}>
            <div className={styles.filterDropdown}>
              <FiFilter className={styles.filterIcon} />
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={styles.filterSelect}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending_verification">Pending Verification</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className={styles.actionButtonsContainer}>
          <button 
            type="button"
            className={styles.downloadButton}
            onClick={downloadCSV}
            title="Export to CSV"
          >
            <FiDownload /> Export
          </button>
          
          <button 
            type="button"
            className={styles.primaryButton}
            onClick={openAddModal}
          >
            <FiPlus /> Add New Business
          </button>
        </div>
      </div>

      {/* Bulk actions when rows are selected */}
      {selectedRows.length > 0 && (
        <div className={styles.bulkActionsBar}>
          <span className={styles.selectedCount}>{selectedRows.length} business{selectedRows.length !== 1 ? 'es' : ''} selected</span>
          <div className={styles.bulkButtons}>
            <button type="button" onClick={() => handleBulkAction('status')} className={`${styles.bulkButton} ${styles.statusButton}`}>
              <FiCheckCircle /> Mark Active
            </button>
            <button type="button" onClick={() => handleBulkAction('export')} className={`${styles.bulkButton} ${styles.exportButton}`}>
              <FiDownload /> Export Selected
            </button>
            <button type="button" onClick={() => handleBulkAction('delete')} className={`${styles.bulkButton} ${styles.deleteBulkButton}`}>
              <FiTrash2 /> Delete Selected
            </button>
          </div>
        </div>
      )}

      <div className={styles.tableCard}>
        {loading && businesses.length === 0 ? (
          <div className={styles.loadingIndicator}>
            <FiRefreshCw className={styles.spinning} />
            <p>Loading business data...</p>
          </div>
        ) : !loading && filteredBusinesses.length === 0 ? (
          <div className={styles.noResults}>
            <FaRegBuilding size={48} style={{ marginBottom: '1rem', color: '#94a3b8' }}/>
            <p>No business taxpayers found.</p>
            {searchTerm && <p>Try adjusting your search term or adding new businesses.</p>}
          </div>
        ) : (
          <div className={styles.tableResponsive}>
            <table className={styles.table}>
              <thead className={styles.tableHeader}>
                <tr>
                  <th className={styles.checkboxCell}>
                    <input 
                      type="checkbox" 
                      checked={selectedRows.length === filteredBusinesses.length && filteredBusinesses.length > 0}
                      onChange={toggleSelectAll}
                      className={styles.checkbox}
                    />
                  </th>
                  <th onClick={() => handleSort('businessName')} className={styles.sortableCell}>
                    <span className={styles.headerCellContent}>Business Name {getSortIcon('businessName')}</span>
                  </th>
                  <th onClick={() => handleSort('tin')} className={styles.sortableCell}>
                    <span className={styles.headerCellContent}>TIN {getSortIcon('tin')}</span>
                  </th>
                  <th className={styles.tableHeaderCell}>Registration No.</th>
                  <th className={styles.tableHeaderCell}>Industry</th>
                  <th onClick={() => handleSort('status')} className={styles.sortableCell}>
                    <span className={styles.headerCellContent}>Status {getSortIcon('status')}</span>
                  </th>
                  <th onClick={() => handleSort('lastUpdated')} className={styles.sortableCell}>
                    <span className={styles.headerCellContent}>Last Updated {getSortIcon('lastUpdated')}</span>
                  </th>
                  <th className={styles.actionsCell}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(business => (
                  <tr 
                    key={business.id} 
                    className={`${styles.tableRow} ${selectedRows.includes(business.id) ? styles.selectedRow : ''}`}
                    onClick={() => viewDetails(business.id)}
                  >
                    <td className={styles.checkboxCell} onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedRows.includes(business.id)}
                        onChange={() => toggleSelectRow(business.id)}
                        className={styles.checkbox}
                      />
                    </td>
                    <td className={styles.nameCell}>
                      <div className={styles.nameContainer}>
                        <div className={styles.avatarCircle}>
                          {business.businessName[0]}
                        </div>
                        <div className={styles.nameDetails}>
                          <span className={styles.fullname}>{business.businessName}</span>
                          <span className={styles.occupation}>{business.businessType}</span>
                        </div>
                      </div>
                    </td>
                    <td className={styles.tinCell}>
                      <div className={styles.tinDisplay}>
                        <FaIdCard className={styles.tinIcon} />
                        <span>{business.tin}</span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.withIcon}>
                        <FiHash className={styles.cellIcon} />
                        <span>{business.registrationNumber || 'N/A'}</span>
                      </div>
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.withIcon}>
                        <FiTarget className={styles.cellIcon} />
                        <span>{business.industry}</span>
                      </div>
                    </td>
                    <td className={styles.statusCell}>
                      <StatusBadge status={business.status} />
                    </td>
                    <td className={styles.dateCell}>
                      <div className={styles.withIcon}>
                        <FiCalendar className={styles.cellIcon} />
                        <span>{formatDateTime(business.lastUpdated)}</span>
                      </div>
                    </td>
                    <td className={styles.actionsCell} onClick={(e) => e.stopPropagation()}>
                      <div className={styles.actionButtons}>
                        <button 
                          className={`${styles.tableActionButton} ${styles.viewButton}`} 
                          onClick={(e) => { e.stopPropagation(); viewDetails(business.id); }}
                          title="View Details"
                        >
                          <FiEye />
                        </button>
                        <button 
                          className={`${styles.tableActionButton} ${styles.editButton}`} 
                          onClick={(e) => { e.stopPropagation(); openEditModal(business); }}
                          title="Edit"
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          className={`${styles.tableActionButton} ${styles.deleteButton}`} 
                          onClick={(e) => { e.stopPropagation(); handleDelete(business.id); }}
                          title="Delete"
                        >
                          <FiTrash2 />
                        </button>
                        <div className={styles.actionDropdown}>
                          <button className={styles.moreActionsButton}>
                            <FiMoreHorizontal />
                          </button>
                          <div className={styles.dropdownContent}>
                            <button className={styles.dropdownItem}>
                              <FiCheckCircle /> Verify business
                            </button>
                            <button className={styles.dropdownItem}>
                              <FiExternalLink /> View tax history
                            </button>
                            <button className={styles.dropdownItem}>
                              <FiDollarSign /> Review financials
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      {!loading && filteredBusinesses.length > 0 && (
        <div className={styles.paginationContainer}>
          <div className={styles.itemsPerPage}>
            <span>Show</span>
            <select 
              value={itemsPerPage} 
              onChange={handleItemsPerPageChange}
              className={styles.itemsPerPageSelect}
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span>entries</span>
          </div>
          
          <div className={styles.paginationInfo}>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredBusinesses.length)} of {filteredBusinesses.length} entries
          </div>
          
          <div className={styles.paginationControls}>
            <button 
              className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              First
            </button>
            <button 
              className={`${styles.paginationButton} ${currentPage === 1 ? styles.disabled : ''}`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            
            {/* Page Numbers */}
            <div className={styles.pageNumbers}>
              {[...Array(totalPages).keys()].map(number => {
                const pageNumber = number + 1;
                if (
                  pageNumber === 1 || 
                  pageNumber === totalPages || 
                  (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                ) {
                  return (
                    <button 
                      key={pageNumber}
                      className={`${styles.paginationNumber} ${pageNumber === currentPage ? styles.active : ''}`}
                      onClick={() => handlePageChange(pageNumber)}
                    >
                      {pageNumber}
                    </button>
                  );
                } else if (
                  (pageNumber === 2 && currentPage > 3) || 
                  (pageNumber === totalPages - 1 && currentPage < totalPages - 2)
                ) {
                  return <span key={pageNumber} className={styles.paginationEllipsis}>...</span>;
                }
                return null;
              })}
            </div>
            
            <button 
              className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ''}`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
            <button 
              className={`${styles.paginationButton} ${currentPage === totalPages ? styles.disabled : ''}`}
              onClick={() => handlePageChange(totalPages)}
              disabled={currentPage === totalPages}
            >
              Last
            </button>
          </div>
        </div>
      )}

      {/* Add/Edit Modal - simplified here, would be more comprehensive in real implementation */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>
              {editingBusiness ? <><FiEdit2 className="modal-icon" /> Edit Business</> : <><FiPlus className="modal-icon" /> Add New Business</>}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Modal content would go here */}
              <div className="modal-actions">
                <button type="button" onClick={closeModal} className="cancel-button">Cancel</button>
                <button type="submit" className="save-button">
                  {editingBusiness ? 'Save Changes' : 'Add Business'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Businesses; 