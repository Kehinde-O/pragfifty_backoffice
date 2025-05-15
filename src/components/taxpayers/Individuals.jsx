import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiUsers, FiSearch, FiPlus, FiEdit2, FiTrash2, FiMail, FiPhone, FiCalendar,
  FiMapPin, FiBriefcase, FiUserCheck, FiUserX, FiClock, FiCheckCircle, FiXCircle,
  FiRefreshCw, FiChevronDown, FiChevronUp, FiUser, FiEye
} from 'react-icons/fi';
// We'll create this CSS file next
import './Individuals.css'; 

const Individuals = () => {
  const [individuals, setIndividuals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingIndividual, setEditingIndividual] = useState(null);
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
      ];
      setIndividuals(mockIndividuals);
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
      setLoading(false);
      closeModal();
    }, 500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this taxpayer record? This action cannot be undone.')) {
      setLoading(true); // Simulate API call
      setTimeout(() => {
        setIndividuals(prevIndividuals => prevIndividuals.filter(ind => ind.id !== id));
        setLoading(false);
      }, 500);
    }
  };

  const viewDetails = (id) => {
    navigate(`/dashboard/taxpayers/individuals/${id}`);
  };

  const filteredIndividuals = individuals.filter(individual =>
    (individual.firstName + ' ' + individual.lastName).toLowerCase().includes(searchTerm.toLowerCase()) ||
    individual.tin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    individual.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateString; // or '-' or 'Invalid Date'
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

  return (
    <div className="individuals-container">
      <div className="page-header">
        <h1><FiUsers className="page-header-icon" /> Individual Taxpayers</h1>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by Name, TIN, Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="add-button" onClick={openAddModal}>
          <FiPlus /> Add New Individual
        </button>
      </div>

      <div className="table-container">
        {loading && individuals.length === 0 ? (
          <div className="loading-indicator">
            <FiRefreshCw className="spinning" />
            <p>Loading taxpayer data...</p>
          </div>
        ) : !loading && filteredIndividuals.length === 0 ? (
          <div className="no-results">
            <FiUsers size={48} style={{ marginBottom: '1rem', color: '#94a3b8' }}/>
            <p>No individual taxpayers found.</p>
            {searchTerm && <p>Try adjusting your search term or adding new taxpayers.</p>}
          </div>
        ) : (
          <table className="individuals-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>TIN</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredIndividuals.map(individual => (
                <tr key={individual.id}>
                  <td>{`${individual.firstName} ${individual.lastName}`}</td>
                  <td>{individual.tin}</td>
                  <td>{individual.email}</td>
                  <td>{individual.phone}</td>
                  <td><StatusBadge status={individual.status} /></td>
                  <td>{formatDateTime(individual.lastUpdated)}</td>
                  <td className="action-buttons">
                    <button className="view-button" title="View Details" onClick={() => viewDetails(individual.id)}>
                      <FiEye />
                    </button>
                    <button className="edit-button" title="Edit" onClick={() => openEditModal(individual)}>
                      <FiEdit2 />
                    </button>
                    <button className="delete-button" title="Delete" onClick={() => handleDelete(individual.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>
              {editingIndividual ? <><FiEdit2 /> Edit Individual</> : <><FiPlus /> Add New Individual</>}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="middleName">Middle Name (Optional)</label>
                  <input type="text" id="middleName" name="middleName" value={formData.middleName} onChange={handleInputChange} />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="tin">Taxpayer ID (TIN)</label>
                  <input type="text" id="tin" name="tin" value={formData.tin} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="dateOfBirth">Date of Birth</label>
                  <input type="date" id="dateOfBirth" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} required />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="gender">Gender</label>
                  <select id="gender" name="gender" value={formData.gender} onChange={handleInputChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="nationality">Nationality</label>
                  <input type="text" id="nationality" name="nationality" value={formData.nationality} onChange={handleInputChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <div className="input-with-icon">
                    <FiPhone className="input-icon" />
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <div className="input-with-icon">
                    <FiMail className="input-icon" />
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                  </div>
                </div>
              </div>

              <fieldset className="form-fieldset">
                <legend><FiMapPin /> Address</legend>
                <div className="form-group">
                  <label htmlFor="address.street">Street Address</label>
                  <input type="text" id="address.street" name="address.street" value={formData.address.street} onChange={handleInputChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="address.city">City</label>
                    <input type="text" id="address.city" name="address.city" value={formData.address.city} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address.lga">LGA</label>
                    <input type="text" id="address.lga" name="address.lga" value={formData.address.lga} onChange={handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address.state">State</label>
                    <input type="text" id="address.state" name="address.state" value={formData.address.state} onChange={handleInputChange} required />
                  </div>
                </div>
              </fieldset>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="occupation">Occupation</label>
                  <input type="text" id="occupation" name="occupation" value={formData.occupation} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select id="status" name="status" value={formData.status} onChange={handleInputChange}>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="pending_verification">Pending Verification</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
                <button type="submit" className="save-button">
                  {editingIndividual ? <><FiCheckCircle/> Update Taxpayer</> : <><FiPlus/> Add Taxpayer</>}
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