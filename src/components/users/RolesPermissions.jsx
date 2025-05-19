import React, { useState, useEffect } from 'react';
import { 
  FiShield, FiSearch, FiPlus, FiEdit2, FiTrash2, 
  FiCheck, FiX, FiRefreshCw, FiSave, FiInfo, FiEye,
  FiChevronLeft, FiChevronRight, FiAlertTriangle, FiSliders,
  FiFilter, FiChevronsLeft, FiChevronsRight, FiCheckCircle
} from 'react-icons/fi';
import styles from './RolesPermissions.module.css';
import { Card, StatsCard } from '../common/ui';

const RolesPermissions = () => {
  // State for roles and permissions data
  const [roles, setRoles] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingRole, setEditingRole] = useState(null);
  const [showPermissionDetails, setShowPermissionDetails] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filterOption, setFilterOption] = useState('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
  });

  // Advanced filter state
  const [advancedFilters, setAdvancedFilters] = useState({
    permissionsCount: '',
    hasPermission: ''
  });

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockPermissions = [
        { id: 1, name: 'view_dashboard', description: 'View dashboard statistics and reports' },
        { id: 2, name: 'manage_users', description: 'Create, edit, and delete user accounts' },
        { id: 3, name: 'view_transactions', description: 'View transaction history and details' },
        { id: 4, name: 'process_payments', description: 'Process and record payments' },
        { id: 5, name: 'generate_reports', description: 'Generate and export system reports' },
        { id: 6, name: 'approve_assessments', description: 'Review and approve tax assessments' },
        { id: 7, name: 'system_settings', description: 'Modify system configuration and settings' },
        { id: 8, name: 'audit_logs', description: 'View audit logs and system activities' },
        { id: 9, name: 'manage_roles', description: 'Create, edit, and delete user roles' },
        { id: 10, name: 'view_revenue', description: 'Access revenue reports and analytics' }
      ];

      const mockRoles = [
        { 
          id: 1, 
          name: 'Administrator', 
          description: 'Full system access and control',
          permissions: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          createdAt: '2023-08-01T10:00:00'
        },
        { 
          id: 2, 
          name: 'Finance Officer', 
          description: 'Manages financial transactions and reports',
          permissions: [1, 3, 4, 5, 10],
          createdAt: '2023-08-05T14:30:00'
        },
        { 
          id: 3, 
          name: 'Audit Manager', 
          description: 'Oversees audit processes and compliance',
          permissions: [1, 3, 5, 6, 8],
          createdAt: '2023-09-12T09:15:00'
        },
        { 
          id: 4, 
          name: 'Support Staff', 
          description: 'Handles basic user support and inquiries',
          permissions: [1, 3],
          createdAt: '2023-10-20T11:45:00'
        },
        { 
          id: 5, 
          name: 'Tax Assessment Officer', 
          description: 'Manages taxpayer assessments and calculations',
          permissions: [1, 3, 5, 6],
          createdAt: '2023-11-05T16:20:00'
        },
        { 
          id: 6, 
          name: 'Revenue Manager', 
          description: 'Oversees revenue collection and reporting',
          permissions: [1, 3, 4, 5, 6, 10],
          createdAt: '2023-11-15T08:30:00'
        }
      ];
      
      setRoles(mockRoles);
      setPermissions(mockPermissions);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle permission toggle
  const handlePermissionToggle = (permissionId) => {
    setFormData(prev => {
      const currentPermissions = [...prev.permissions];
      if (currentPermissions.includes(permissionId)) {
        return {
          ...prev,
          permissions: currentPermissions.filter(id => id !== permissionId)
        };
      } else {
        return {
          ...prev,
          permissions: [...currentPermissions, permissionId]
        };
      }
    });
  };

  // Handle advanced filter change
  const handleAdvancedFilterChange = (name, value) => {
    setAdvancedFilters(prev => ({ ...prev, [name]: value }));
  };

  // Apply advanced filters
  const applyAdvancedFilters = () => {
    setCurrentPage(1);
    console.log('Applied filters:', advancedFilters);
  };

  // Reset advanced filters
  const resetAdvancedFilters = () => {
    setAdvancedFilters({
      permissionsCount: '',
      hasPermission: ''
    });
  };

  // Filter roles based on search term and filters
  const filteredRoles = roles.filter(role => {
    const matchesSearch = role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      role.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply basic filter
    if (filterOption === 'admin') {
      return matchesSearch && role.name.toLowerCase().includes('admin');
    } else if (filterOption === 'high-access') {
      return matchesSearch && role.permissions.length >= 6;
    } else if (filterOption === 'low-access') {
      return matchesSearch && role.permissions.length < 6;
    } else {
      return matchesSearch;
    }
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredRoles.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRoles.length / itemsPerPage);
  
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

  // Add new role
  const handleAddRole = (e) => {
    e.preventDefault();
    const newRole = {
      id: roles.length + 1,
      ...formData,
      createdAt: new Date().toISOString()
    };
    setRoles([...roles, newRole]);
    setFormData({
      name: '',
      description: '',
      permissions: []
    });
    setShowAddModal(false);
  };

  // Edit role
  const handleEditRole = (e) => {
    e.preventDefault();
    setRoles(roles.map(role => 
      role.id === editingRole.id 
        ? { ...role, ...formData } 
        : role
    ));
    setFormData({
      name: '',
      description: '',
      permissions: []
    });
    setEditingRole(null);
  };

  // Delete role setup
  const handleDeleteRole = (id) => {
    const roleToRemove = roles.find(role => role.id === id);
    setRoleToDelete(roleToRemove);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = () => {
    setRoles(roles.filter(role => role.id !== roleToDelete.id));
    setShowDeleteModal(false);
    setRoleToDelete(null);
  };

  // Cancel delete
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setRoleToDelete(null);
  };

  // Start editing a role
  const startEditing = (role) => {
    setEditingRole(role);
    setFormData({
      name: role.name,
      description: role.description,
      permissions: [...role.permissions]
    });
  };

  // View role permissions
  const viewRolePermissions = (role) => {
    setSelectedRole(role);
    setShowPermissionDetails(true);
  };

  // Get permission name by ID
  const getPermissionName = (id) => {
    const permission = permissions.find(p => p.id === id);
    return permission ? permission.name : '';
  };

  // Get permission description by ID
  const getPermissionDescription = (id) => {
    const permission = permissions.find(p => p.id === id);
    return permission ? permission.description : '';
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Calculate statistics
  const totalRoles = roles.length;
  const adminRoles = roles.filter(role => role.name.toLowerCase().includes('admin')).length;
  const highAccessRoles = roles.filter(role => role.permissions.length >= 6).length;
  
  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>
          <FiShield className={styles.headerIcon} /> Roles & Permissions Management
        </h1>
        <div className={styles.dashboardActions}>
          <button className={styles.addButton} onClick={() => setShowAddModal(true)}>
            <FiPlus /> Add New Role
          </button>
        </div>
      </div>
      
      {/* Role Statistics Section */}
      {!loading && (
        <div className={styles.statsGrid}>
          <StatsCard 
            title="Total Roles"
            value={totalRoles}
            icon={<FiShield />}
            color="primary"
          />
          
          <StatsCard 
            title="Admin Roles"
            value={adminRoles}
            icon={<FiCheckCircle />}
            color="danger"
            change={adminRoles > 0 ? Math.round((adminRoles / totalRoles) * 100) : 0}
            trend="neutral"
          />
          
          <StatsCard 
            title="High Access Roles"
            value={highAccessRoles}
            icon={<FiCheck />}
            color="warning"
            change={highAccessRoles > 0 ? Math.round((highAccessRoles / totalRoles) * 100) : 0}
            trend="neutral"
          />
          
          <StatsCard 
            title="System Permissions"
            value={permissions.length}
            icon={<FiShield />}
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
              placeholder="Search roles by name or description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className={styles.filterControls}>
            <select 
              className={styles.filterSelect}
              value={filterOption}
              onChange={(e) => setFilterOption(e.target.value)}
              aria-label="Filter roles"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin Roles</option>
              <option value="high-access">High Access Roles</option>
              <option value="low-access">Low Access Roles</option>
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
                <label className={styles.formLabel}>Permissions Count</label>
                <select 
                  className={styles.formInput}
                  value={advancedFilters.permissionsCount}
                  onChange={(e) => handleAdvancedFilterChange('permissionsCount', e.target.value)}
                >
                  <option value="">Any number</option>
                  <option value="low">Less than 5</option>
                  <option value="medium">5 to 8</option>
                  <option value="high">More than 8</option>
                </select>
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Has Permission</label>
                <select 
                  className={styles.formInput}
                  value={advancedFilters.hasPermission}
                  onChange={(e) => handleAdvancedFilterChange('hasPermission', e.target.value)}
                >
                  <option value="">Any permission</option>
                  {permissions.map(perm => (
                    <option key={perm.id} value={perm.id}>
                      {perm.name}
                    </option>
                  ))}
                </select>
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

      {/* Roles Table */}
      <Card 
        className={styles.tableCard}
        elevation="md"
        accent="primary"
      >
        {loading ? (
          <div className={styles.loadingIndicator}>
            <FiRefreshCw className={styles.spinner} />
            <p>Loading roles and permissions...</p>
          </div>
        ) : filteredRoles.length === 0 ? (
          <div className={styles.emptyState}>
            <FiShield className={styles.emptyIcon} />
            <h3 className={styles.emptyTitle}>No roles found</h3>
            <p className={styles.emptyMessage}>Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <>
            <table className={styles.table}>
              <thead className={styles.tableHead}>
                <tr>
                  <th className={styles.tableHeader}>Role Name</th>
                  <th className={styles.tableHeader}>Description</th>
                  <th className={styles.tableHeader}>Permissions</th>
                  <th className={styles.tableHeader}>Created</th>
                  <th className={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map(role => (
                  <tr key={role.id} className={styles.tableRow}>
                    <td className={styles.tableData}>
                      <div className={styles.roleTitle}>{role.name}</div>
                    </td>
                    <td className={styles.tableData}>
                      <div className={styles.roleDescription}>{role.description}</div>
                    </td>
                    <td className={styles.tableData}>
                      <div className={styles.permissionTags}>
                        {role.permissions.slice(0, 3).map(permId => {
                          const permName = getPermissionName(permId);
                          return (
                            <span key={permId} className={styles.permissionTag}>
                              <FiCheck size={12} /> {permName.replace(/_/g, ' ')}
                            </span>
                          );
                        })}
                        {role.permissions.length > 3 && (
                          <span className={styles.permissionTag}>
                            +{role.permissions.length - 3} more
                          </span>
                        )}
                      </div>
                    </td>
                    <td className={styles.tableData}>{formatDate(role.createdAt)}</td>
                    <td className={`${styles.tableData} ${styles.actionCell}`}>
                      <div className={styles.actionButtons}>
                        <button 
                          className={`${styles.actionButton} ${styles.viewButton}`}
                          onClick={() => viewRolePermissions(role)}
                          aria-label={`View permissions for ${role.name}`}
                        >
                          <FiEye />
                        </button>
                        <button 
                          className={`${styles.actionButton} ${styles.editButton}`}
                          onClick={() => startEditing(role)}
                          aria-label={`Edit ${role.name}`}
                        >
                          <FiEdit2 />
                        </button>
                        <button 
                          className={`${styles.actionButton} ${styles.deleteButton}`}
                          onClick={() => handleDeleteRole(role.id)}
                          aria-label={`Delete ${role.name}`}
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
                Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRoles.length)} of {filteredRoles.length} roles
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

      {/* Add/Edit Role Modal */}
      {(showAddModal || editingRole) && (
        <div className={styles.modalOverlay}>
          <Card className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {editingRole ? `Edit Role: ${editingRole.name}` : 'Add New Role'}
              </h2>
              <button 
                className={styles.modalClose}
                onClick={() => {
                  setShowAddModal(false);
                  setEditingRole(null);
                  setFormData({
                    name: '',
                    description: '',
                    permissions: []
                  });
                }}
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <form onSubmit={editingRole ? handleEditRole : handleAddRole}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="name">Role Name</label>
                  <input 
                    type="text" 
                    id="name"
                    name="name" 
                    className={styles.formInput}
                    value={formData.name} 
                    onChange={handleInputChange}
                    placeholder="Enter role name"
                    required
                  />
                  <span className={styles.formHint}>Use a clear, descriptive name that reflects the role's responsibilities</span>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel} htmlFor="description">Description</label>
                  <textarea 
                    id="description"
                    name="description" 
                    className={styles.formTextarea}
                    value={formData.description} 
                    onChange={handleInputChange}
                    placeholder="Provide a brief description of this role"
                    rows={3}
                  />
                  <span className={styles.formHint}>Briefly describe what this role does and who should have it</span>
                </div>
                
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Permissions</label>
                  <span className={styles.formHint}>Select the permissions this role should have</span>
                  
                  <div className={styles.permissionsGrid}>
                    {permissions.map(permission => (
                      <div key={permission.id} className={styles.permissionItem}>
                        <input 
                          type="checkbox" 
                          id={`perm-${permission.id}`}
                          className={styles.permissionCheckbox}
                          checked={formData.permissions.includes(permission.id)} 
                          onChange={() => handlePermissionToggle(permission.id)}
                        />
                        <div className={styles.permissionDetails}>
                          <label 
                            htmlFor={`perm-${permission.id}`}
                            className={styles.permissionName}
                          >
                            {permission.name}
                          </label>
                          <span className={styles.permissionDescription}>
                            {permission.description}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className={styles.modalFooter}>
                  <button 
                    type="button"
                    className={styles.cancelButton}
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingRole(null);
                      setFormData({
                        name: '',
                        description: '',
                        permissions: []
                      });
                    }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className={styles.saveButton}>
                    {editingRole ? 'Update Role' : 'Create Role'}
                  </button>
                </div>
              </form>
            </div>
          </Card>
        </div>
      )}

      {/* Permission Details Modal */}
      {showPermissionDetails && selectedRole && (
        <div className={styles.modalOverlay}>
          <Card className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>
                {selectedRole.name} Permissions
              </h2>
              <button 
                className={styles.modalClose}
                onClick={() => {
                  setShowPermissionDetails(false);
                  setSelectedRole(null);
                }}
                aria-label="Close modal"
              >
                <FiX />
              </button>
            </div>
            
            <div className={styles.modalBody}>
              <div className={styles.permissionDetailsContainer}>
                <div className={styles.permissionSummary}>
                  <span className={styles.permissionCount}>
                    {selectedRole.permissions.length} of {permissions.length} permissions granted
                  </span>
                  <div className={styles.progressBarContainer}>
                    <div 
                      className={styles.progressBar}
                      style={{width: `${(selectedRole.permissions.length / permissions.length) * 100}%`}}
                    />
                  </div>
                </div>
                
                <div className={styles.permissionList}>
                  {selectedRole.permissions.map(permId => {
                    const permName = getPermissionName(permId);
                    const permDescription = getPermissionDescription(permId);
                    
                    return (
                      <div key={permId} className={styles.permissionListItem}>
                        <div className={styles.permissionIcon}>
                          <FiCheck />
                        </div>
                        <div className={styles.permissionItemDetails}>
                          <div className={styles.permissionItemName}>{permName}</div>
                          <div className={styles.permissionItemDescription}>{permDescription}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            
            <div className={styles.modalFooter}>
              <button 
                className={styles.editButton}
                onClick={() => {
                  setShowPermissionDetails(false);
                  startEditing(selectedRole);
                }}
              >
                <FiEdit2 /> Edit Permissions
              </button>
              <button 
                className={styles.saveButton}
                onClick={() => {
                  setShowPermissionDetails(false);
                  setSelectedRole(null);
                }}
              >
                Close
              </button>
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
                <h3 className={styles.deleteModalTitle}>Delete Role?</h3>
                <p className={styles.deleteModalText}>
                  Are you sure you want to delete the role "{roleToDelete?.name}"? 
                  This action cannot be undone.
                </p>
                <div className={styles.deleteWarning}>
                  <FiInfo /> This may affect users currently assigned to this role
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
                Delete Role
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default RolesPermissions; 