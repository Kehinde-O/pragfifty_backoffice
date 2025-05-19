import React, { useState, useEffect } from 'react';
import { 
  FiUser, FiSearch, FiPlus, FiEdit2, FiTrash2, FiMail, 
  FiCheck, FiX, FiRefreshCw, FiCheckCircle, FiUserPlus,
  FiUsers, FiUserCheck, FiUserX, FiFilter, FiCalendar,
  FiChevronLeft, FiChevronRight, FiInfo, FiMoreVertical,
  FiEye, FiKey, FiAlertTriangle, FiSliders, FiChevronsLeft,
  FiChevronsRight, FiActivity, FiLogIn, FiXCircle, FiChevronUp, FiChevronDown
} from 'react-icons/fi';
import styles from './AdminUsers.module.css';
import { Card, StatsCard } from '../common/ui';

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
  const [itemsPerPage] = useState(5);

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
  
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>
          <FiUsers className={styles.headerIcon} /> Admin Users Management
        </h1>
        <div className={styles.dashboardActions}>
          <button className={styles.addButton} onClick={() => setShowAddModal(true)}>
            <FiPlus /> Add New User
          </button>
        </div>
      </div>
      
      {/* User Statistics Section */}
      {!loading && (
        <div className={styles.statsGrid}>
          <StatsCard 
            title="Total Admin Users"
            value={totalAdmins}
            icon={<FiUsers />}
            color="primary"
          />
          
          <StatsCard 
            title="Active Users"
            value={activeAdmins}
            icon={<FiUserCheck />}
            color="success"
            change={activeAdmins > 0 ? Math.round((activeAdmins / totalAdmins) * 100) : 0}
            trend="neutral"
          />
          
          <StatsCard 
            title="Inactive Users"
            value={inactiveAdmins}
            icon={<FiUserX />}
            color="danger"
            change={inactiveAdmins > 0 ? Math.round((inactiveAdmins / totalAdmins) * 100) : 0}
            trend="neutral"
          />
          
          <StatsCard 
            title="User Roles"
            value={roles.length}
            icon={<FiUser />}
            color="info"
          />
        </div>
      )}

      {/* Search and Filter Controls */}
      <Card className={styles.filterCard} elevation="sm">
        <div className={styles.headerActions}>
          <div className={styles.searchBox}>
            <FiSearch className={styles.searchIcon} />
            <input 
              type="text" 
              className={styles.searchInput}
              placeholder="Search users by name, email or role..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className={styles.filterControls}>
            <select 
              className={styles.filterSelect}
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              aria-label="Filter users"
            >
              <option value="all">All Users</option>
              <option value="active">Active Users</option>
              <option value="inactive">Inactive Users</option>
            </select>
            
            <button 
              className={styles.filterButton}
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              <FiSliders /> Advanced Filters
            </button>
          </div>
        </div>

        {/* Advanced Filters Panel */}
        {showAdvancedFilters && (
          <div className={styles.advancedFiltersPanel}>
            <div className={styles.filterRow}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Role</label>
                <select 
                  className={styles.formInput}
                  value={advancedFilters.role}
                  onChange={(e) => handleAdvancedFilterChange('role', e.target.value)}
                >
                  <option value="">Any Role</option>
                  {roles.map(role => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Last Login</label>
                <select 
                  className={styles.formInput}
                  value={advancedFilters.lastLogin}
                  onChange={(e) => handleAdvancedFilterChange('lastLogin', e.target.value)}
                >
                  <option value="">Any time</option>
                  <option value="7days">Last 7 days</option>
                  <option value="30days">Last 30 days</option>
                  <option value="older">More than 30 days ago</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Date Added</label>
                <div className={styles.dateRange}>
                  <input 
                    type="date" 
                    className={styles.formInput}
                    placeholder="From" 
                    value={advancedFilters.dateAdded.from}
                    onChange={(e) => handleAdvancedFilterChange('dateAdded.from', e.target.value)}
                  />
                  <input 
                    type="date" 
                    className={styles.formInput}
                    placeholder="To" 
                    value={advancedFilters.dateAdded.to}
                    onChange={(e) => handleAdvancedFilterChange('dateAdded.to', e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button className={styles.cancelButton} onClick={resetAdvancedFilters}>
                Reset Filters
              </button>
              <button className={styles.saveButton} onClick={applyAdvancedFilters}>
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </Card>

      {/* Users Table */}
      <Card 
        className={styles.tableCard}
        elevation="md"
        accent="primary"
      >
        {loading ? (
          <div className={styles.loadingIndicator}>
            <FiRefreshCw className={styles.spinner} />
            <p>Loading admin users...</p>
          </div>
        ) : filteredAdmins.length === 0 ? (
          <div className={styles.emptyState}>
            <FiUsers className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No users found</h3>
            <p className={styles.emptyMessage}>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableHeader}>
                    <input 
                      type="checkbox"
                      className={styles.checkbox}
                      checked={selectAll}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th 
                    className={`${styles.tableHeader} ${styles.sortable}`}
                    onClick={() => handleSort('name')}
                  >
                    Name
                    {sortField === 'name' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />}
                      </span>
                    )}
                  </th>
                  <th 
                    className={`${styles.tableHeader} ${styles.sortable}`}
                    onClick={() => handleSort('email')}
                  >
                    Email
                    {sortField === 'email' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />}
                      </span>
                    )}
                  </th>
                  <th 
                    className={`${styles.tableHeader} ${styles.sortable}`}
                    onClick={() => handleSort('role')}
                  >
                    Role
                    {sortField === 'role' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />}
                      </span>
                    )}
                  </th>
                  <th 
                    className={`${styles.tableHeader} ${styles.sortable}`}
                    onClick={() => handleSort('status')}
                  >
                    Status
                    {sortField === 'status' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />}
                      </span>
                    )}
                  </th>
                  <th 
                    className={`${styles.tableHeader} ${styles.sortable}`}
                    onClick={() => handleSort('lastLogin')}
                  >
                    Last Login
                    {sortField === 'lastLogin' && (
                      <span className={styles.sortIcon}>
                        {sortDirection === 'asc' ? <FiChevronUp /> : <FiChevronDown />}
                      </span>
                    )}
                  </th>
                  <th className={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(admin => (
                  <tr key={admin.id} className={styles.tableRow}>
                    <td className={styles.tableData}>
                      <input 
                        type="checkbox"
                        className={styles.checkbox}
                        checked={selectedUsers.includes(admin.id)}
                        onChange={() => handleSelectUser(admin.id)}
                      />
                    </td>
                    <td className={styles.tableData}>{admin.name}</td>
                    <td className={styles.tableData}>{admin.email}</td>
                    <td className={styles.tableData}>{admin.role}</td>
                    <td className={styles.tableData}>
                      <span 
                        className={`${styles.statusBadge} ${
                          admin.status === 'active' ? styles.statusActive : styles.statusInactive
                        }`}
                      >
                        <span className={styles.statusDot} />
                        {admin.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className={styles.tableData}>{formatDate(admin.lastLogin)}</td>
                    <td className={`${styles.tableData} ${styles.actionCell}`}>
                      <div className={styles.actionButtons}>
                        <button 
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          onClick={() => viewUserDetails(admin)}
                          aria-label={`View details for ${admin.name}`}
                        >
                          <FiEye />
                        </button>
                        <button 
                          className={`${styles.actionButton} ${styles.editButton}`}
                          onClick={() => startEditing(admin)}
                          aria-label={`Edit ${admin.name}`}
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          onClick={() => handleDeleteAdmin(admin.id)}
                          aria-label={`Delete ${admin.name}`}
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className={styles.pagination}>
              <div className={styles.paginationInfo}>
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredAdmins.length)} of {filteredAdmins.length} users
              </div>
              
              <div className={styles.paginationControls}>
                <button 
                  className={`${styles.pageNav} ${currentPage === 1 ? styles.disabled : ''}`}
                  onClick={firstPage}
                  disabled={currentPage === 1}
                  aria-label="Go to first page"
                >
                  <FiChevronsLeft />
                </button>
                <button 
                  className={`${styles.pageNav} ${currentPage === 1 ? styles.disabled : ''}`}
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  aria-label="Go to previous page"
                >
                  <FiChevronLeft />
                </button>
                
                <div className={styles.pageNumbers}>
                  {getPaginationGroup().map(number => (
                    <button
                      key={number}
                      className={`${styles.pageNumber} ${currentPage === number ? styles.active : ''}`}
                      onClick={() => paginate(number)}
                      aria-label={`Go to page ${number}`}
                      aria-current={currentPage === number ? 'page' : undefined}
                    >
                      {number}
                    </button>
                  ))}
                </div>
                
                <button 
                  className={`${styles.pageNav} ${currentPage === totalPages ? styles.disabled : ''}`}
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  aria-label="Go to next page"
                >
                  <FiChevronRight />
                </button>
                <button 
                  className={`${styles.pageNav} ${currentPage === totalPages ? styles.disabled : ''}`}
                  onClick={lastPage}
                  disabled={currentPage === totalPages}
                  aria-label="Go to last page"
                >
                  <FiChevronsRight />
                </button>
              </div>
            </div>
          </>
        )}
      </Card>

      {/* Add/Edit User Modal */}
      {(showAddModal || editingAdmin) && (
        <div className={styles.modalOverlay}>
          <Card className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingAdmin ? 'Edit User' : 'Add New User'}
              </h2>
              <button 
                className={styles.modalClose}
                onClick={closeModal}
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <form onSubmit={editingAdmin ? handleEditAdmin : handleAddAdmin}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="name">Full Name</label>
                  <input 
                    id="name"
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleInputChange}
                    placeholder="Enter full name"
                    required
                    className={styles.formInput}
                  />
                  <span className={styles.formHint}>Enter user's complete name as it appears on official documents</span>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="email">Email Address</label>
                  <div className={styles.inputWithIcon}>
                    <input 
                      id="email"
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange}
                      placeholder="Enter email address"
                      required
                      className={styles.formInput}
                    />
                    <FiMail className={styles.inputIcon} />
                  </div>
                  <span className={styles.formHint}>This email will be used for login and notifications</span>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="role">User Role</label>
                  <div className={styles.selectWrapper}>
                    <select 
                      id="role"
                      name="role" 
                      value={formData.role} 
                      onChange={handleInputChange}
                      className={styles.formSelect}
                    >
                      <option value="Administrator">Administrator</option>
                      <option value="Finance Officer">Finance Officer</option>
                      <option value="Audit Manager">Audit Manager</option>
                      <option value="System Administrator">System Administrator</option>
                      <option value="Support Staff">Support Staff</option>
                    </select>
                    <FiChevronDown className={styles.selectIcon} />
                  </div>
                  <span className={styles.formHint}>Determines user permissions in the system</span>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Status</label>
                  <div className={styles.radioGroup}>
                    <div className={styles.radioOption}>
                      <input
                        type="radio"
                        id="status-active"
                        name="status"
                        value="active"
                        checked={formData.status === 'active'}
                        onChange={handleInputChange}
                        className={styles.radioInput}
                      />
                      <label htmlFor="status-active" className={styles.radioLabel}>
                        <div className={styles.radioButton}>
                          <div className={styles.radioDot}></div>
                        </div>
                        <div className={styles.radioContent}>
                          <span className={styles.radioTitle}>Active</span>
                          <span className={styles.radioDescription}>User can access the system</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className={styles.radioOption}>
                      <input
                        type="radio"
                        id="status-inactive"
                        name="status"
                        value="inactive"
                        checked={formData.status === 'inactive'}
                        onChange={handleInputChange}
                        className={styles.radioInput}
                      />
                      <label htmlFor="status-inactive" className={styles.radioLabel}>
                        <div className={styles.radioButton}>
                          <div className={styles.radioDot}></div>
                        </div>
                        <div className={styles.radioContent}>
                          <span className={styles.radioTitle}>Inactive</span>
                          <span className={styles.radioDescription}>User cannot access the system</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className={styles.modalFooter}>
                  <button type="button" className={styles.cancelButton} onClick={closeModal}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.saveButton}>
                    {editingAdmin ? 'Update User' : 'Add User'}
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className={styles.modalOverlay}>
          <Card className={`${styles.modalContent} ${styles.deleteModal}`} accent="danger">
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Confirm Delete</h2>
              <button 
                className={styles.modalClose}
                onClick={cancelDelete}
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div style={{ textAlign: 'center' }}>
                <FiAlertTriangle className={styles.deleteModalIcon} />
                <h3 className={styles.deleteModalTitle}>Delete User?</h3>
                <p className={styles.deleteModalText}>
                  Are you sure you want to delete the user "{userToDelete?.name}"? 
                  This action cannot be undone.
                </p>
                <div className={styles.deleteWarning}>
                  <FiInfo /> User's data will be permanently removed from the system
                </div>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button 
                className={styles.cancelButton}
                onClick={cancelDelete}
                type="button"
              >
                Cancel
              </button>
              <button 
                className={styles.deleteButton}
                onClick={confirmDelete}
                type="button"
              >
                Delete User
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminUsers; 