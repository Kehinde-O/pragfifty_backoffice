import React, { useState, useEffect } from 'react';
import { 
  FiUser, FiSearch, FiPlus, FiEdit2, FiTrash2, FiMail, 
  FiCheck, FiX, FiRefreshCw, FiCheckCircle, FiUserPlus,
  FiUsers, FiUserCheck, FiUserX, FiFilter, FiCalendar,
  FiChevronLeft, FiChevronRight, FiInfo, FiMoreVertical,
  FiEye, FiKey, FiAlertTriangle, FiSliders, FiChevronsLeft,
  FiChevronsRight, FiActivity, FiLogIn, FiXCircle
} from 'react-icons/fi';
import './AdminUsers.css';

const AdminUsers = () => {
  // State for admin users
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [filterOption, setFilterOption] = useState('all');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Administrator',
    status: 'active'
  });

  // Advanced filter state
  const [advancedFilters, setAdvancedFilters] = useState({
    role: '',
    lastLogin: '',
    dateAdded: { from: '', to: '' }
  });

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockAdmins = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Administrator', status: 'active', lastLogin: '2023-11-15T10:30:00', dateAdded: '2023-10-01T09:00:00' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Finance Officer', status: 'active', lastLogin: '2023-11-14T15:45:00', dateAdded: '2023-10-05T11:30:00' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Audit Manager', status: 'inactive', lastLogin: '2023-10-25T09:15:00', dateAdded: '2023-09-15T14:20:00' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'System Administrator', status: 'active', lastLogin: '2023-11-15T08:10:00', dateAdded: '2023-08-22T10:15:00' },
        { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Support Staff', status: 'active', lastLogin: '2023-11-13T11:20:00', dateAdded: '2023-07-18T13:40:00' },
        { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'Finance Officer', status: 'active', lastLogin: '2023-11-14T09:25:00', dateAdded: '2023-06-30T09:10:00' },
        { id: 7, name: 'David Wilson', email: 'david@example.com', role: 'Support Staff', status: 'inactive', lastLogin: '2023-10-30T14:50:00', dateAdded: '2023-05-12T16:30:00' }
      ];
      setAdmins(mockAdmins);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle sorting
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Handle select all checkbox
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredAdmins.map(admin => admin.id));
    }
    setSelectAll(!selectAll);
  };

  // Handle individual user selection
  const handleSelectUser = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter(userId => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  // Bulk actions
  const handleBulkAction = (action) => {
    if (action === 'activate') {
      setAdmins(admins.map(admin => 
        selectedUsers.includes(admin.id) ? { ...admin, status: 'active' } : admin
      ));
    } else if (action === 'deactivate') {
      setAdmins(admins.map(admin => 
        selectedUsers.includes(admin.id) ? { ...admin, status: 'inactive' } : admin
      ));
    } else if (action === 'delete') {
      if (window.confirm(`Are you sure you want to delete ${selectedUsers.length} users?`)) {
        setAdmins(admins.filter(admin => !selectedUsers.includes(admin.id)));
        setSelectedUsers([]);
      }
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle advanced filter change
  const handleAdvancedFilterChange = (name, value) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setAdvancedFilters(prev => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value }
      }));
    } else {
      setAdvancedFilters(prev => ({ ...prev, [name]: value }));
    }
  };

  // Apply advanced filters
  const applyAdvancedFilters = () => {
    // Reset pagination to first page when applying filters
    setCurrentPage(1);
    // In a real app, this would trigger an API call with the filter parameters
    console.log('Applied filters:', advancedFilters);
  };

  // Reset advanced filters
  const resetAdvancedFilters = () => {
    setAdvancedFilters({
      role: '',
      lastLogin: '',
      dateAdded: { from: '', to: '' }
    });
  };

  // Filter users based on search term and filter option
  const filteredAdmins = admins.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.role.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filterOption === 'active') {
      return matchesSearch && admin.status === 'active';
    } else if (filterOption === 'inactive') {
      return matchesSearch && admin.status === 'inactive';
    } else {
      return matchesSearch;
    }
  });
  
  // Sort admins
  const sortedAdmins = [...filteredAdmins].sort((a, b) => {
    if (sortField === 'name') {
      return sortDirection === 'asc' 
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (sortField === 'email') {
      return sortDirection === 'asc'
        ? a.email.localeCompare(b.email)
        : b.email.localeCompare(a.email);
    } else if (sortField === 'role') {
      return sortDirection === 'asc'
        ? a.role.localeCompare(b.role)
        : b.role.localeCompare(a.role);
    } else if (sortField === 'status') {
      return sortDirection === 'asc'
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    } else if (sortField === 'lastLogin') {
      return sortDirection === 'asc'
        ? new Date(a.lastLogin) - new Date(b.lastLogin)
        : new Date(b.lastLogin) - new Date(a.lastLogin);
    }
    return 0;
  });
  
  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAdmins.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAdmins.length / itemsPerPage);
  
  // Get pagination group
  const getPaginationGroup = () => {
    let start = Math.max(currentPage - 2, 1);
    let end = Math.min(start + 4, totalPages);
    
    if (end === totalPages) {
      start = Math.max(end - 4, 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };
  
  // Go to first page
  const firstPage = () => {
    setCurrentPage(1);
  };
  
  // Go to last page
  const lastPage = () => {
    setCurrentPage(totalPages);
  };
  
  // Handle items per page change
  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Add new admin user
  const handleAddAdmin = (e) => {
    e.preventDefault();
    const newAdmin = {
      id: admins.length + 1,
      ...formData,
      lastLogin: '-',
      dateAdded: new Date().toISOString()
    };
    setAdmins([...admins, newAdmin]);
    setFormData({
      name: '',
      email: '',
      role: 'Administrator',
      status: 'active'
    });
    setShowAddModal(false);
  };

  // Edit admin user
  const handleEditAdmin = (e) => {
    e.preventDefault();
    setAdmins(admins.map(admin => 
      admin.id === editingAdmin.id 
        ? { ...admin, ...formData } 
        : admin
    ));
    setFormData({
      name: '',
      email: '',
      role: 'Administrator',
      status: 'active'
    });
    setEditingAdmin(null);
  };

  // Delete admin user
  const handleDeleteAdmin = (id) => {
    const userToRemove = admins.find(admin => admin.id === id);
    setUserToDelete(userToRemove);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    setAdmins(admins.filter(admin => admin.id !== userToDelete.id));
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  // Start editing an admin user
  const startEditing = (admin) => {
    setEditingAdmin(admin);
    setFormData({
      name: admin.name,
      email: admin.email,
      role: admin.role,
      status: admin.status
    });
  };

  // View user details (placeholder function)
  const viewUserDetails = (admin) => {
    alert(`View details for ${admin.name}`);
    // In a real app, this might navigate to a user detail page or open a modal
  };

  // Reset user password (placeholder function)
  const resetUserPassword = (admin) => {
    alert(`Password reset initiated for ${admin.name}`);
    // In a real app, this would trigger a password reset flow
  };

  // Close modal
  const closeModal = () => {
    setShowAddModal(false);
    setEditingAdmin(null);
    setFormData({
      name: '',
      email: '',
      role: 'Administrator',
      status: 'active'
    });
  };

  // Format date
  const formatDate = (dateString) => {
    if (dateString === '-') return '-';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Calculate statistics
  const totalAdmins = admins.length;
  const activeAdmins = admins.filter(admin => admin.status === 'active').length;
  const inactiveAdmins = admins.filter(admin => admin.status === 'inactive').length;
  
  // Get unique roles and count
  const roles = [...new Set(admins.map(admin => admin.role))];
  const roleData = roles.map(role => ({
    name: role,
    count: admins.filter(admin => admin.role === role).length
  }));

  // Recent login stats (placeholder data - in a real app, this would be calculated)
  const loginStats = {
    today: 2,
    thisWeek: 5,
    thisMonth: 12
  };
  
  return (
    <div className="admin-users-container">
      <div className="page-header">
        <h1><FiUsers className="page-header-icon" /> Admin Users Management</h1>
      </div>
      
      {/* User Statistics Section */}
      {!loading && (
        <div className="user-stats">
          <div className="stat-card">
            <div className="stat-icon total-icon">
              <FiUsers />
            </div>
            <div className="stat-content">
              <h3>Total Admin Users</h3>
              <p className="stat-value">{totalAdmins}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon active-icon">
              <FiUserCheck />
            </div>
            <div className="stat-content">
              <h3>Active Users</h3>
              <p className="stat-value">{activeAdmins}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon inactive-icon">
              <FiUserX />
            </div>
            <div className="stat-content">
              <h3>Inactive Users</h3>
              <p className="stat-value">{inactiveAdmins}</p>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon role-icon">
              <FiUserPlus />
            </div>
            <div className="stat-content">
              <h3>User Roles</h3>
              <p className="stat-value">{roles.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="header-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search users by name, email or role..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown">
          <FiFilter />
          <select 
            value={filterOption}
            onChange={(e) => setFilterOption(e.target.value)}
            aria-label="Filter users"
          >
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="inactive">Inactive Users</option>
          </select>
        </div>
        
        <div className="advanced-filter-button">
          <button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}>
            <FiSliders /> Advanced Filters
          </button>
        </div>
        
        <button className="add-button" onClick={() => setShowAddModal(true)}>
          <FiPlus /> Add New User
        </button>
      </div>

      {/* Advanced Filters Panel */}
      {showAdvancedFilters && (
        <div className="advanced-filters-panel">
          <div className="filter-row">
            <div className="filter-group">
              <label>Role</label>
              <select 
                value={advancedFilters.role}
                onChange={(e) => handleAdvancedFilterChange('role', e.target.value)}
              >
                <option value="">Any Role</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            
            <div className="filter-group">
              <label>Last Login</label>
              <select 
                value={advancedFilters.lastLogin}
                onChange={(e) => handleAdvancedFilterChange('lastLogin', e.target.value)}
              >
                <option value="">Any time</option>
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="older">More than 30 days ago</option>
              </select>
            </div>
            
            <div className="filter-group">
              <label>Date Added</label>
              <div className="date-range">
                <input 
                  type="date" 
                  placeholder="From" 
                  value={advancedFilters.dateAdded.from}
                  onChange={(e) => handleAdvancedFilterChange('dateAdded.from', e.target.value)}
                />
                <input 
                  type="date" 
                  placeholder="To" 
                  value={advancedFilters.dateAdded.to}
                  onChange={(e) => handleAdvancedFilterChange('dateAdded.to', e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="filter-actions">
            <button className="reset-button" onClick={resetAdvancedFilters}>
              Reset Filters
            </button>
            <button className="apply-button" onClick={applyAdvancedFilters}>
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Table Actions */}
      {!loading && filteredAdmins.length > 0 && (
        <div className="table-actions">
          <div className="bulk-actions">
            <input 
              type="checkbox" 
              id="select-all" 
              className="select-all-checkbox"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <label htmlFor="select-all" className="sr-only">Select all users</label>
            
            {selectedUsers.length > 0 && (
              <div className="bulk-action-dropdown">
                <button className="bulk-action-button">
                  Actions ({selectedUsers.length}) <FiChevronRight />
                </button>
                <div className="bulk-action-menu">
                  <button 
                    className="bulk-menu-item"
                    onClick={() => handleBulkAction('activate')}
                  >
                    <FiUserCheck /> Set Active
                  </button>
                  <button 
                    className="bulk-menu-item"
                    onClick={() => handleBulkAction('deactivate')}
                  >
                    <FiUserX /> Set Inactive
                  </button>
                  <button 
                    className="bulk-menu-item danger"
                    onClick={() => handleBulkAction('delete')}
                  >
                    <FiTrash2 /> Delete Selected
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="users-table-container">
        {loading ? (
          <div className="skeleton-loader">
            <div className="skeleton-header"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
            <div className="skeleton-row"></div>
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">
              <FiUsers size={48} />
            </div>
            <h3>No Users Found</h3>
            <p>No users match your current filter criteria</p>
            <button 
              className="btn-secondary" 
              onClick={() => {
                setSearchTerm('');
                setFilterOption('all');
                resetAdvancedFilters();
              }}
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <>
            <table className="users-table">
              <thead>
                <tr>
                  <th style={{ width: '40px' }}>
                    <input 
                      type="checkbox" 
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('name')}
                  >
                    Name
                    {sortField === 'name' && (
                      <span className="sort-icon">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('email')}
                  >
                    Email
                    {sortField === 'email' && (
                      <span className="sort-icon">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('role')}
                  >
                    Role
                    {sortField === 'role' && (
                      <span className="sort-icon">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('status')}
                  >
                    Status
                    {sortField === 'status' && (
                      <span className="sort-icon">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th 
                    className="sortable-header"
                    onClick={() => handleSort('lastLogin')}
                  >
                    Last Login
                    {sortField === 'lastLogin' && (
                      <span className="sort-icon">
                        {sortDirection === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(admin => (
                  <tr key={admin.id}>
                    <td>
                      <input 
                        type="checkbox" 
                        checked={selectedUsers.includes(admin.id)}
                        onChange={() => handleSelectUser(admin.id)}
                      />
                    </td>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.role}</td>
                    <td>
                      <span className={`status-badge ${admin.status}`}>
                        <span className="status-dot"></span>
                        {admin.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td>
                      <span className="date-display">
                        <FiCalendar className="date-icon" />
                        {formatDate(admin.lastLogin)}
                      </span>
                    </td>
                    <td className="action-cell">
                      <div className="action-dropdown">
                        <button className="action-dropdown-toggle">
                          <FiMoreVertical />
                        </button>
                        <div className="action-dropdown-menu">
                          <button 
                            className="action-menu-item" 
                            onClick={() => startEditing(admin)}
                          >
                            <FiEdit2 /> Edit User
                          </button>
                          <button 
                            className="action-menu-item" 
                            onClick={() => viewUserDetails(admin)}
                          >
                            <FiEye /> View Details
                          </button>
                          <button 
                            className="action-menu-item" 
                            onClick={() => resetUserPassword(admin)}
                          >
                            <FiKey /> Reset Password
                          </button>
                          <button 
                            className="action-menu-item danger" 
                            onClick={() => handleDeleteAdmin(admin.id)}
                          >
                            <FiTrash2 /> Delete User
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination */}
            <div className="pagination-wrapper">
              <div className="pagination-info">
                <FiInfo size={14} />
                <span>
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAdmins.length)} of {filteredAdmins.length} users
                </span>
              </div>
              
              <div className="pagination-controls">
                <div className="items-per-page">
                  <label>Show:</label>
                  <select 
                    value={itemsPerPage} 
                    onChange={handleItemsPerPageChange}
                    className="items-select"
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={25}>25</option>
                    <option value={50}>50</option>
                  </select>
                </div>
                
                <div className="page-navigation">
                  <button 
                    className={`page-nav-button ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={firstPage}
                    disabled={currentPage === 1}
                    title="First Page"
                  >
                    <FiChevronsLeft />
                  </button>
                  <button 
                    className={`page-nav-button ${currentPage === 1 ? 'disabled' : ''}`}
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    title="Previous Page"
                  >
                    <FiChevronLeft />
                  </button>
                  
                  <div className="pagination-pages">
                    {getPaginationGroup().map(num => (
                      <button
                        key={num}
                        onClick={() => paginate(num)}
                        className={`page-number ${currentPage === num ? 'active' : ''}`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                  
                  <button 
                    className={`page-nav-button ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={nextPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    title="Next Page"
                  >
                    <FiChevronRight />
                  </button>
                  <button 
                    className={`page-nav-button ${currentPage === totalPages ? 'disabled' : ''}`}
                    onClick={lastPage}
                    disabled={currentPage === totalPages || totalPages === 0}
                    title="Last Page"
                  >
                    <FiChevronsRight />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* User Activity Section */}
      {!loading && filteredAdmins.length > 0 && (
        <div className="user-activity-section">
          <h3 className="section-title">
            <FiActivity /> User Insights
          </h3>
          
          <div className="activity-cards">
            <div className="activity-card">
              <div className="activity-icon login-icon">
                <FiLogIn />
              </div>
              <div className="activity-content">
                <h4>Login Activity</h4>
                <div className="activity-stats">
                  <div className="stat-item">
                    <span className="stat-value">{loginStats.today}</span>
                    <span className="stat-label">Today</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{loginStats.thisWeek}</span>
                    <span className="stat-label">This Week</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-value">{loginStats.thisMonth}</span>
                    <span className="stat-label">This Month</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="activity-card">
              <div className="activity-icon role-icon">
                <FiUsers />
              </div>
              <div className="activity-content">
                <h4>Role Distribution</h4>
                <div className="role-distribution">
                  {roleData.map(role => (
                    <div key={role.name} className="role-item">
                      <span className="role-name">{role.name}</span>
                      <div className="role-bar-container">
                        <div 
                          className="role-bar" 
                          style={{ 
                            width: `${(role.count / totalAdmins) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="role-count">{role.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit User Modal */}
      {(showAddModal || editingAdmin) && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                {editingAdmin ? (
                  <>
                    <FiEdit2 className="modal-icon" />
                    Edit User: {editingAdmin.name}
                  </>
                ) : (
                  <>
                    <FiUserPlus className="modal-icon" />
                    Add New User
                  </>
                )}
              </h2>
              <button className="modal-close" onClick={closeModal}>
                <FiX />
              </button>
            </div>
            
            <div className="modal-body">
              <form onSubmit={editingAdmin ? handleEditAdmin : handleAddAdmin}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      id="name"
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange}
                      placeholder="Enter full name"
                      required
                      className="form-control"
                    />
                    <small className="form-hint">Enter user's complete name as it appears on official documents</small>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <div className="email-input-container">
                      <FiMail className="email-icon" />
                      <input 
                        id="email"
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleInputChange}
                        placeholder="Enter email address"
                        required
                        className="form-control"
                      />
                    </div>
                    <small className="form-hint">This email will be used for login and notifications</small>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="role">User Role</label>
                    <div className="select-container">
                      <select 
                        id="role"
                        name="role" 
                        value={formData.role} 
                        onChange={handleInputChange}
                        className="form-control"
                      >
                        <option value="Administrator">Administrator</option>
                        <option value="Finance Officer">Finance Officer</option>
                        <option value="Audit Manager">Audit Manager</option>
                        <option value="System Administrator">System Administrator</option>
                        <option value="Support Staff">Support Staff</option>
                      </select>
                    </div>
                    <small className="form-hint">Determines user permissions in the system</small>
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Status</label>
                    <div className="status-options">
                      <div className="status-option">
                        <input
                          type="radio"
                          id="status-active"
                          name="status"
                          value="active"
                          checked={formData.status === 'active'}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="status-active" className="status-option-label">
                          <FiCheckCircle className="status-icon active" />
                          <span>Active</span>
                        </label>
                      </div>
                      
                      <div className="status-option">
                        <input
                          type="radio"
                          id="status-inactive"
                          name="status"
                          value="inactive"
                          checked={formData.status === 'inactive'}
                          onChange={handleInputChange}
                        />
                        <label htmlFor="status-inactive" className="status-option-label">
                          <FiXCircle className="status-icon inactive" />
                          <span>Inactive</span>
                        </label>
                      </div>
                    </div>
                    <small className="form-hint">Inactive users cannot log in to the system</small>
                  </div>
                </div>
                
                <div className="modal-footer">
                  <button type="button" className="btn-cancel" onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <FiCheck /> {editingAdmin ? 'Update User' : 'Add User'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && userToDelete && (
        <div className="delete-modal-backdrop">
          <div className="delete-modal">
            <div className="delete-modal-icon">
              <FiAlertTriangle size={48} />
            </div>
            <h3>Delete User</h3>
            <p>Are you sure you want to delete <strong>{userToDelete.name}</strong>?</p>
            <p className="delete-warning">This action cannot be undone. All data associated with this user will be permanently removed.</p>
            
            <div className="delete-actions">
              <button className="btn-cancel" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn-danger" onClick={confirmDelete}>
                Delete User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers; 