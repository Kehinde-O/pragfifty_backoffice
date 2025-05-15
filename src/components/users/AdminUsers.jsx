import React, { useState, useEffect } from 'react';
import { 
  FiUser, FiSearch, FiPlus, FiEdit2, FiTrash2, FiMail, 
  FiCheck, FiX, FiRefreshCw, FiCheckCircle
} from 'react-icons/fi';
import './AdminUsers.css';

const AdminUsers = () => {
  // State for admin users
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Administrator',
    status: 'active'
  });

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const mockAdmins = [
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Administrator', status: 'active', lastLogin: '2023-11-15T10:30:00' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Finance Officer', status: 'active', lastLogin: '2023-11-14T15:45:00' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', role: 'Audit Manager', status: 'inactive', lastLogin: '2023-10-25T09:15:00' },
        { id: 4, name: 'Sarah Williams', email: 'sarah@example.com', role: 'System Administrator', status: 'active', lastLogin: '2023-11-15T08:10:00' },
        { id: 5, name: 'Michael Brown', email: 'michael@example.com', role: 'Support Staff', status: 'active', lastLogin: '2023-11-13T11:20:00' }
      ];
      setAdmins(mockAdmins);
      setLoading(false);
    }, 1000);
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Filter users based on search term
  const filteredAdmins = admins.filter(admin => 
    admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Add new admin user
  const handleAddAdmin = (e) => {
    e.preventDefault();
    const newAdmin = {
      id: admins.length + 1,
      ...formData,
      lastLogin: '-'
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
    if (window.confirm('Are you sure you want to delete this user?')) {
      setAdmins(admins.filter(admin => admin.id !== id));
    }
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

  // Format date
  const formatDate = (dateString) => {
    if (dateString === '-') return '-';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="admin-users-container">
      <div className="page-header">
        <h1><FiUser className="page-header-icon" /> Admin Users Management</h1>
      </div>
      
      <div className="header-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search users..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-button" onClick={() => setShowAddModal(true)}>
          <FiPlus /> Add New User
        </button>
      </div>

      <div className="users-table-container" style={{ marginTop: '1.5rem' }}>
        {loading ? (
          <div className="loading-indicator">
            <FiRefreshCw className="spinning" />
            <p>Loading user data...</p>
          </div>
        ) : (
          <table className="users-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Last Login</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan="6" className="no-results">No users found matching your search</td>
                </tr>
              ) : (
                filteredAdmins.map(admin => (
                  <tr key={admin.id}>
                    <td>{admin.name}</td>
                    <td>{admin.email}</td>
                    <td>{admin.role}</td>
                    <td>
                      <span className={`status-badge ${admin.status}`}>
                        {admin.status === 'active' ? (
                          <><FiCheckCircle /> Active</>
                        ) : (
                          <><FiX /> Inactive</>
                        )}
                      </span>
                    </td>
                    <td>{formatDate(admin.lastLogin)}</td>
                    <td className="action-buttons">
                      <button className="edit-button" onClick={() => startEditing(admin)}>
                        <FiEdit2 />
                      </button>
                      <button className="delete-button" onClick={() => handleDeleteAdmin(admin.id)}>
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

      {/* Add/Edit User Modal */}
      {(showAddModal || editingAdmin) && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>
              {editingAdmin ? (
                <>
                  <FiEdit2 />
                  Edit User: {editingAdmin.name}
                </>
              ) : (
                <>
                  <FiPlus />
                  Add New User
                </>
              )}
            </h2>
            <form onSubmit={editingAdmin ? handleEditAdmin : handleAddAdmin}>
              <div className="form-group">
                <label>Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange}
                  placeholder="Enter full name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <div className="email-input-container">
                  <FiMail className="email-icon" />
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Role</label>
                <select 
                  name="role" 
                  value={formData.role} 
                  onChange={handleInputChange}
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Finance Officer">Finance Officer</option>
                  <option value="Audit Manager">Audit Manager</option>
                  <option value="System Administrator">System Administrator</option>
                  <option value="Support Staff">Support Staff</option>
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <div className="radio-group">
                  <div className="radio-item">
                    <input
                      type="radio"
                      name="status"
                      value="active"
                      checked={formData.status === 'active'}
                      onChange={handleInputChange}
                    />
                    <div className="radio-item-label">
                      <FiCheckCircle style={{ color: '#22c55e' }} />
                      Active
                    </div>
                  </div>
                  <div className="radio-item">
                    <input
                      type="radio"
                      name="status"
                      value="inactive"
                      checked={formData.status === 'inactive'}
                      onChange={handleInputChange}
                    />
                    <div className="radio-item-label">
                      <FiX style={{ color: '#ef4444' }} />
                      Inactive
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={() => {
                  setShowAddModal(false);
                  setEditingAdmin(null);
                  setFormData({
                    name: '',
                    email: '',
                    role: 'Administrator',
                    status: 'active'
                  });
                }}>
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  <FiCheck /> {editingAdmin ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers; 