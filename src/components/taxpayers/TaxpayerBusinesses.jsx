import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiBriefcase, FiSearch, FiPlus, FiEdit2, FiTrash2, FiMail, FiPhone,
  FiMapPin, FiCalendar, FiCheckCircle, FiXCircle, FiClock, FiFileText,
  FiDollarSign, FiHash, FiUser, FiEye
} from 'react-icons/fi';
import './TaxpayerBusinesses.css'; 

const TaxpayerBusinesses = () => {
  const navigate = useNavigate();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBusiness, setEditingBusiness] = useState(null);
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

  // Mock data - replace with API call
  const fetchBusinesses = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const mockBusinesses = [
        { id: 1, businessName: 'Tech Innovate Ltd', tin: 'TIN12345678', registrationNumber: 'RC123456', businessType: 'Limited Liability Company', industry: 'Information Technology', dateEstablished: '2015-03-10', phone: '08055005500', email: 'info@techinnovate.com', address: { street: '5 Innovation Drive', city: 'Lagos', lga: 'Victoria Island', state: 'Lagos' }, contactPerson: { name: 'Oluwaseun Adeyemi', position: 'CEO', phone: '08055005501', email: 'seun.a@techinnovate.com' }, status: 'active', lastUpdated: '2023-11-20T10:30:00Z' },
        { id: 2, businessName: 'Sunshine Farms Nigeria', tin: 'TIN87654321', registrationNumber: 'BN654321', businessType: 'Enterprise', industry: 'Agriculture', dateEstablished: '2010-06-22', phone: '07033003300', email: 'contact@sunshinefarms.com', address: { street: '15 Harvest Road', city: 'Abuja', lga: 'Gwagwalada', state: 'FCT' }, contactPerson: { name: 'Ibrahim Musa', position: 'Managing Director', phone: '07033003301', email: 'ibrahim@sunshinefarms.com' }, status: 'inactive', lastUpdated: '2023-11-18T14:15:00Z' },
        { id: 3, businessName: 'Royal Textiles', tin: 'TIN11223344', registrationNumber: 'RC112233', businessType: 'Limited Liability Company', industry: 'Manufacturing', dateEstablished: '2018-01-15', phone: '09066006600', email: 'sales@royaltextiles.com', address: { street: '78 Factory Avenue', city: 'Kano', lga: 'Kano Municipal', state: 'Kano' }, contactPerson: { name: 'Amina Yusuf', position: 'Sales Director', phone: '09066006601', email: 'amina@royaltextiles.com' }, status: 'pending_verification', lastUpdated: '2023-11-21T09:00:00Z' },
      ];
      setBusinesses(mockBusinesses);
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
      address: { street: '', city: '', lga: '', state: '' },
      contactPerson: { name: '', position: '', phone: '', email: '' },
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
      registrationNumber: business.registrationNumber,
      businessType: business.businessType,
      industry: business.industry,
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
          prevBusinesses.map(business => 
            business.id === editingBusiness.id ? { ...business, ...formData, id: business.id, lastUpdated: new Date().toISOString() } : business
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
      setLoading(false);
      closeModal();
    }, 500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this business taxpayer record? This action cannot be undone.')) {
      setLoading(true); // Simulate API call
      setTimeout(() => {
        setBusinesses(prevBusinesses => prevBusinesses.filter(business => business.id !== id));
        setLoading(false);
      }, 500);
    }
  };

  const viewDetails = (id) => {
    navigate(`/dashboard/taxpayers/businesses/${id}`);
  };

  const filteredBusinesses = businesses.filter(business =>
    business.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.tin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    business.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (business.registrationNumber && business.registrationNumber.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };
  
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    } catch(e) {
      return dateString;
    }
  };

  const StatusBadge = ({ status }) => {
    let icon, text, className;
    switch (status) {
      case 'active':
        icon = <FiCheckCircle />;
        text = 'Active';
        className = 'status-active';
        break;
      case 'inactive':
        icon = <FiXCircle />;
        text = 'Inactive';
        className = 'status-inactive';
        break;
      case 'pending_verification':
        icon = <FiClock />;
        text = 'Pending';
        className = 'status-pending';
        break;
      default:
        icon = <FiBriefcase />;
        text = 'Unknown';
        className = 'status-unknown';
    }
    return <span className={`status-badge ${className}`}>{icon}{text}</span>;
  };

  return (
    <div className="businesses-container">
      <div className="page-header">
        <h1><FiBriefcase className="page-header-icon" /> Business Taxpayers</h1>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, TIN, or registration number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-button" onClick={openAddModal}>
          <FiPlus />Add Business Taxpayer
        </button>
      </div>

      <div className="table-container">
        {loading && businesses.length === 0 ? (
          <div className="loading-indicator">
            <FiClock className="spinning" />
            <p>Loading business taxpayer records...</p>
          </div>
        ) : filteredBusinesses.length === 0 ? (
          <div className="no-results">
            <p>No business taxpayer records found.</p>
            {searchTerm && <p>Try using different search terms or clear your search.</p>}
          </div>
        ) : (
          <table className="businesses-table">
            <thead>
              <tr>
                <th>Business Name</th>
                <th>TIN</th>
                <th>Registration No.</th>
                <th>Industry</th>
                <th>Contact Person</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBusinesses.map((business) => (
                <tr key={business.id}>
                  <td>{business.businessName}</td>
                  <td>{business.tin}</td>
                  <td>{business.registrationNumber || '-'}</td>
                  <td>{business.industry || '-'}</td>
                  <td>{business.contactPerson?.name || '-'}</td>
                  <td><StatusBadge status={business.status} /></td>
                  <td>{formatDateTime(business.lastUpdated)}</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="view-button"
                        onClick={() => viewDetails(business.id)}
                        title="View Details"
                      >
                        <FiEye />
                      </button>
                      <button
                        className="edit-button"
                        onClick={() => openEditModal(business)}
                        title="Edit"
                      >
                        <FiEdit2 />
                      </button>
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(business.id)}
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
        )}
      </div>

      {showModal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>
              <FiBriefcase />
              {editingBusiness ? 'Edit Business Taxpayer' : 'Add Business Taxpayer'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-fieldset">
                <legend><FiBriefcase /> Business Information</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="businessName">Business Name</label>
                    <input
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="tin">Tax Identification Number (TIN)</label>
                    <div className="input-with-icon">
                      <FiHash className="input-icon" />
                      <input
                        type="text"
                        id="tin"
                        name="tin"
                        value={formData.tin}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="registrationNumber">Registration Number</label>
                    <div className="input-with-icon">
                      <FiFileText className="input-icon" />
                      <input
                        type="text"
                        id="registrationNumber"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="businessType">Business Type</label>
                    <select
                      id="businessType"
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="Limited Liability Company">Limited Liability Company</option>
                      <option value="Enterprise">Enterprise</option>
                      <option value="Partnership">Partnership</option>
                      <option value="Sole Proprietorship">Sole Proprietorship</option>
                      <option value="Non-Governmental Organization">Non-Governmental Organization</option>
                      <option value="Government Agency">Government Agency</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label htmlFor="industry">Industry</label>
                    <input
                      type="text"
                      id="industry"
                      name="industry"
                      value={formData.industry}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="dateEstablished">Date Established</label>
                    <div className="input-with-icon">
                      <FiCalendar className="input-icon" />
                      <input
                        type="date"
                        id="dateEstablished"
                        name="dateEstablished"
                        value={formData.dateEstablished}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
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
              </div>

              <div className="form-fieldset">
                <legend><FiMapPin /> Business Address</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address.street">Street Address</label>
                    <input
                      type="text"
                      id="address.street"
                      name="address.street"
                      value={formData.address.street}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address.city">City</label>
                    <input
                      type="text"
                      id="address.city"
                      name="address.city"
                      value={formData.address.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address.lga">LGA</label>
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
                    <label htmlFor="address.state">State</label>
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

              <div className="form-fieldset">
                <legend><FiMail /> Contact Information</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Business Email</label>
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
                  <div className="form-group">
                    <label htmlFor="phone">Business Phone</label>
                    <div className="input-with-icon">
                      <FiPhone className="input-icon" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-fieldset">
                <legend><FiUser /> Contact Person</legend>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactPerson.name">Name</label>
                    <input
                      type="text"
                      id="contactPerson.name"
                      name="contactPerson.name"
                      value={formData.contactPerson.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactPerson.position">Position</label>
                    <input
                      type="text"
                      id="contactPerson.position"
                      name="contactPerson.position"
                      value={formData.contactPerson.position}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contactPerson.email">Email</label>
                    <div className="input-with-icon">
                      <FiMail className="input-icon" />
                      <input
                        type="email"
                        id="contactPerson.email"
                        name="contactPerson.email"
                        value={formData.contactPerson.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="contactPerson.phone">Phone</label>
                    <div className="input-with-icon">
                      <FiPhone className="input-icon" />
                      <input
                        type="tel"
                        id="contactPerson.phone"
                        name="contactPerson.phone"
                        value={formData.contactPerson.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  {editingBusiness ? 'Update' : 'Save'} Business Taxpayer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxpayerBusinesses; 