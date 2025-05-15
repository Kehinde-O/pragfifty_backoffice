import React, { useState, useEffect } from 'react';
import { 
  FiShield, FiSearch, FiPlus, FiEdit2, FiTrash2, 
  FiCheck, FiX, FiRefreshCw, FiSave, FiInfo
} from 'react-icons/fi';
import './RolesPermissions.css';

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

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: []
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
        { id: 8, name: 'audit_logs', description: 'View audit logs and system activities' }
      ];

      const mockRoles = [
        { 
          id: 1, 
          name: 'Administrator', 
          description: 'Full system access and control',
          permissions: [1, 2, 3, 4, 5, 6, 7, 8]
        },
        { 
          id: 2, 
          name: 'Finance Officer', 
          description: 'Manages financial transactions and reports',
          permissions: [1, 3, 4, 5]
        },
        { 
          id: 3, 
          name: 'Audit Manager', 
          description: 'Oversees audit processes and compliance',
          permissions: [1, 3, 5, 6, 8]
        },
        { 
          id: 4, 
          name: 'Support Staff', 
          description: 'Handles basic user support and inquiries',
          permissions: [1, 3]
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

  // Filter roles based on search term
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new role
  const handleAddRole = (e) => {
    e.preventDefault();
    const newRole = {
      id: roles.length + 1,
      ...formData
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

  // Delete role
  const handleDeleteRole = (id) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== id));
    }
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

  return (
    <div className="roles-permissions-container">
      <div className="page-header">
        <h1><FiShield className="page-header-icon" /> Roles & Permissions</h1>
      </div>
      
      <div className="header-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search roles..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-button" onClick={() => setShowAddModal(true)}>
          <FiPlus /> Add New Role
        </button>
      </div>

      <div className="roles-table-container" style={{ marginTop: '1.5rem' }}>
        {loading ? (
          <div className="loading-indicator">
            <FiRefreshCw className="spinning" />
            <p>Loading roles and permissions...</p>
          </div>
        ) : (
          <table className="roles-table">
            <thead>
              <tr>
                <th>Role Name</th>
                <th>Description</th>
                <th>Permissions</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoles.length === 0 ? (
                <tr>
                  <td colSpan="4" className="no-results">No roles found matching your search</td>
                </tr>
              ) : (
                filteredRoles.map(role => (
                  <tr key={role.id}>
                    <td>{role.name}</td>
                    <td>{role.description}</td>
                    <td>
                      <div className="permission-count">
                        <span className="count">{role.permissions.length}</span> Permissions
                        <button 
                          className="view-permissions-btn"
                          onClick={() => viewRolePermissions(role)}
                        >
                          <FiInfo size={14} /> View Details
                        </button>
                      </div>
                    </td>
                    <td className="action-buttons">
                      <button className="edit-button" onClick={() => startEditing(role)}>
                        <FiEdit2 />
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteRole(role.id)}>
                        <FiTrash2 />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Role Modal */}
      {(showAddModal || editingRole) && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>
              {editingRole ? (
                <>
                  <FiEdit2 />
                  Edit Role: {editingRole.name}
                </>
              ) : (
                <>
                  <FiPlus />
                  Add New Role
                </>
              )}
            </h2>
            <form onSubmit={editingRole ? handleEditRole : handleAddRole}>
              <div className="form-group">
                <label>Role Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  placeholder="Enter role name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <input 
                  type="text" 
                  name="description" 
                  value={formData.description} 
                  onChange={handleInputChange}
                  placeholder="Enter role description"
                  required
                />
              </div>
              <div className="form-group permissions-group">
                <label>Permissions</label>
                <div className="permissions-list">
                  {permissions.map(permission => (
                    <div key={permission.id} className="permission-item">
                      <label className="checkbox-label">
                        <input 
                          type="checkbox" 
                          checked={formData.permissions.includes(permission.id)}
                          onChange={() => handlePermissionToggle(permission.id)}
                        />
                        <span className="checkbox-custom"></span>
                        <div className="permission-info">
                          <span className="permission-name">{permission.name}</span>
                          <span className="permission-desc">{permission.description}</span>
                        </div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => {
                  setShowAddModal(false);
                  setEditingRole(null);
                  setFormData({
                    name: '',
                    description: '',
                    permissions: []
                  });
                }}>
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  <FiSave /> {editingRole ? 'Update Role' : 'Save Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permission Details Modal */}
      {showPermissionDetails && selectedRole && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>
              <FiShield />
              Permissions for {selectedRole.name}
            </h2>
            <div className="role-description">
              <FiInfo className="info-icon" />
              {selectedRole.description}
            </div>
            
            <div className="permission-details">
              <table className="permission-details-table">
                <thead>
                  <tr>
                    <th>Permission</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRole.permissions.map(permId => (
                    <tr key={permId}>
                      <td className="permission-code">{getPermissionName(permId)}</td>
                      <td>{getPermissionDescription(permId)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="modal-actions justify-center">
              <button type="button" className="close-button" onClick={() => {
                setShowPermissionDetails(false);
                setSelectedRole(null);
              }}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolesPermissions; 