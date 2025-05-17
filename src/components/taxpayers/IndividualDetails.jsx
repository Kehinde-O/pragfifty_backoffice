import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft, FiUser, FiMap, FiBriefcase, FiCalendar, FiMail,
  FiPhone, FiEdit2, FiDownload, FiUserCheck, FiUserX, FiClock, FiFlag
} from 'react-icons/fi';
import { FaIdCard, FaMoneyBillWave } from 'react-icons/fa';
import './IndividualDetails.css';

const IndividualDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taxpayer, setTaxpayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // In a real app, fetch from API using the id
    setLoading(true);
    setTimeout(() => {
      // Mock data for demonstration
      const mockIndividuals = [
        { id: 1, firstName: 'Aisha', lastName: 'Bello', middleName: 'Ngozi', tin: '1234567890', dateOfBirth: '1990-05-15', gender: 'Female', nationality: 'Nigerian', phone: '08012345678', email: 'aisha.bello@example.com', address: { street: '123 Main St', city: 'Abuja', lga: 'AMAC', state: 'FCT' }, occupation: 'Doctor', status: 'active', lastUpdated: '2023-11-20T10:30:00Z' },
        { id: 2, firstName: 'Chinedu', lastName: 'Okoro', middleName: '', tin: '0987654321', dateOfBirth: '1985-11-22', gender: 'Male', nationality: 'Nigerian', phone: '07098765432', email: 'chinedu.okoro@example.com', address: { street: '456 Market Rd', city: 'Lagos', lga: 'Ikeja', state: 'Lagos' }, occupation: 'Engineer', status: 'inactive', lastUpdated: '2023-11-18T14:15:00Z' },
        { id: 3, firstName: 'Fatima', lastName: 'Adamu', middleName: 'Binta', tin: '1122334455', dateOfBirth: '1995-02-10', gender: 'Female', nationality: 'Nigerian', phone: '09011223344', email: 'fatima.adamu@example.com', address: { street: '789 North Av', city: 'Kano', lga: 'Nassarawa', state: 'Kano' }, occupation: 'Teacher', status: 'pending_verification', lastUpdated: '2023-11-21T09:00:00Z' },
        { id: 4, firstName: 'Oluwaseun', lastName: 'Adeyemi', middleName: 'David', tin: '2233445566', dateOfBirth: '1988-07-12', gender: 'Male', nationality: 'Nigerian', phone: '08033445566', email: 'oluwaseun.adeyemi@example.com', address: { street: '10 Victoria Island', city: 'Lagos', lga: 'Eti-Osa', state: 'Lagos' }, occupation: 'Accountant', status: 'active', lastUpdated: '2023-11-19T13:20:00Z' },
        { id: 5, firstName: 'Ngozi', lastName: 'Eze', middleName: 'Chioma', tin: '3344556677', dateOfBirth: '1992-09-18', gender: 'Female', nationality: 'Nigerian', phone: '07055667788', email: 'ngozi.eze@example.com', address: { street: '22 Ada George Rd', city: 'Port Harcourt', lga: 'Obio/Akpor', state: 'Rivers' }, occupation: 'Lawyer', status: 'active', lastUpdated: '2023-11-15T11:00:00Z' },
      ];

      const found = mockIndividuals.find(individual => individual.id === parseInt(id));
      setTaxpayer(found || null);
      setLoading(false);
    }, 800);
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
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
        text = 'Pending Verification';
        className = 'status-pending';
        break;
      default:
        icon = <FiUser />;
        text = 'Unknown';
        className = 'status-unknown';
    }
    return <span className={`status-badge ${className}`}>{icon}{text}</span>;
  };

  const handleEdit = () => {
    // Navigate to edit page or show edit modal
    navigate(`/dashboard/taxpayers/individuals/edit/${id}`);
  };

  const handleExport = () => {
    alert('Export functionality would be implemented here');
  };

  const goBack = () => {
    navigate('/dashboard/taxpayers/individuals');
  };

  if (loading) {
    return (
      <div className="individual-details-container">
        <div className="details-loading">
          <div className="skeleton-header"></div>
          <div className="skeleton-body">
            <div className="skeleton-card"></div>
            <div className="skeleton-card"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!taxpayer) {
    return (
      <div className="individual-details-container">
        <div className="details-not-found">
          <FiUser size={48} />
          <h2>Taxpayer Not Found</h2>
          <p>The taxpayer you are looking for does not exist or has been removed.</p>
          <button className="back-button" onClick={goBack}>
            <FiArrowLeft /> Back to Taxpayers List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="individual-details-container">
      {/* Header with back button */}
      <div className="details-header">
        <button className="back-button" onClick={goBack}>
          <FiArrowLeft /> Back to Taxpayers
        </button>
        <div className="details-actions">
          <button className="export-button" onClick={handleExport}>
            <FiDownload /> Export Profile
          </button>
          <button className="edit-button" onClick={handleEdit}>
            <FiEdit2 /> Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-avatar">
          {taxpayer.firstName[0]}{taxpayer.lastName[0]}
        </div>
        <div className="profile-headline">
          <h1>{taxpayer.firstName} {taxpayer.middleName && `${taxpayer.middleName} `}{taxpayer.lastName}</h1>
          <div className="profile-subheadline">
            <div className="tin-display">
              <FaIdCard /> TIN: {taxpayer.tin}
            </div>
            <StatusBadge status={taxpayer.status} />
            <div className="occupation-display">
              <FiBriefcase /> {taxpayer.occupation}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="details-tabs">
        <button 
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab-button ${activeTab === 'tax-returns' ? 'active' : ''}`}
          onClick={() => setActiveTab('tax-returns')}
        >
          Tax Returns
        </button>
        <button 
          className={`tab-button ${activeTab === 'compliance' ? 'active' : ''}`}
          onClick={() => setActiveTab('compliance')}
        >
          Compliance History
        </button>
        <button 
          className={`tab-button ${activeTab === 'transactions' ? 'active' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="details-section">
              <h2>Personal Information</h2>
              <div className="details-grid">
                <div className="details-item">
                  <div className="details-label">Name</div>
                  <div className="details-value">{taxpayer.firstName} {taxpayer.middleName} {taxpayer.lastName}</div>
                </div>
                <div className="details-item">
                  <div className="details-label">Date of Birth</div>
                  <div className="details-value">{formatDate(taxpayer.dateOfBirth)}</div>
                </div>
                <div className="details-item">
                  <div className="details-label">Gender</div>
                  <div className="details-value">{taxpayer.gender}</div>
                </div>
                <div className="details-item">
                  <div className="details-label">Nationality</div>
                  <div className="details-value">{taxpayer.nationality}</div>
                </div>
                <div className="details-item">
                  <div className="details-label">Occupation</div>
                  <div className="details-value">{taxpayer.occupation}</div>
                </div>
                <div className="details-item">
                  <div className="details-label">TIN</div>
                  <div className="details-value tin-number">{taxpayer.tin}</div>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h2>Contact Information</h2>
              <div className="details-grid">
                <div className="details-item">
                  <div className="details-label">Email</div>
                  <div className="details-value with-icon">
                    <FiMail /> {taxpayer.email}
                  </div>
                </div>
                <div className="details-item">
                  <div className="details-label">Phone</div>
                  <div className="details-value with-icon">
                    <FiPhone /> {taxpayer.phone}
                  </div>
                </div>
                <div className="details-item full-width">
                  <div className="details-label">Address</div>
                  <div className="details-value with-icon">
                    <FiMap /> {taxpayer.address.street}, {taxpayer.address.city}, {taxpayer.address.lga}, {taxpayer.address.state}
                  </div>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h2>Account Status</h2>
              <div className="details-grid">
                <div className="details-item">
                  <div className="details-label">Status</div>
                  <div className="details-value">
                    <StatusBadge status={taxpayer.status} />
                  </div>
                </div>
                <div className="details-item">
                  <div className="details-label">Last Updated</div>
                  <div className="details-value with-icon">
                    <FiCalendar /> {formatDateTime(taxpayer.lastUpdated)}
                  </div>
                </div>
                <div className="details-item">
                  <div className="details-label">Registration Date</div>
                  <div className="details-value with-icon">
                    <FiCalendar /> {formatDate('2023-01-15')} {/* Mock data - should come from API */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tax-returns' && (
          <div className="tax-returns-tab">
            <div className="placeholder-content">
              <FaMoneyBillWave size={48} />
              <h3>Tax Returns History</h3>
              <p>This taxpayer has no tax returns history yet. Tax returns for this individual will appear here once submitted.</p>
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className="compliance-tab">
            <div className="placeholder-content">
              <FiFlag size={48} />
              <h3>Compliance History</h3>
              <p>No compliance records found for this taxpayer. Compliance records will appear here if there are any issues or notices.</p>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="transactions-tab">
            <div className="placeholder-content">
              <FaMoneyBillWave size={48} />
              <h3>Transaction History</h3>
              <p>No transaction records found for this taxpayer. Payment and transaction history will appear here once available.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualDetails; 