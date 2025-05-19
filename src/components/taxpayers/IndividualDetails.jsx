import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiArrowLeft, FiUser, FiMap, FiBriefcase, FiCalendar, FiMail,
  FiPhone, FiEdit2, FiDownload, FiUserCheck, FiUserX, FiClock, FiFlag,
  FiBarChart2, FiFileText, FiInfo, FiAlertCircle, FiCheckCircle, 
  FiHome, FiDollarSign, FiClipboard, FiShield, FiGlobe
} from 'react-icons/fi';
import { FaIdCard, FaMoneyBillWave, FaRegAddressCard, FaPassport } from 'react-icons/fa';
import styles from './IndividualDetails.module.css';

const IndividualDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [taxpayer, setTaxpayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [loadingMessage, setLoadingMessage] = useState('Loading taxpayer information...');

  useEffect(() => {
    // In a real app, fetch from API using the id
    setLoading(true);
    // Simulate progressive loading messages
    const loadingMessages = [
      'Connecting to server...',
      'Loading taxpayer profile...',
      'Retrieving tax information...',
      'Almost ready...'
    ];
    
    let msgIndex = 0;
    const messageInterval = setInterval(() => {
      if (msgIndex < loadingMessages.length) {
        setLoadingMessage(loadingMessages[msgIndex]);
        msgIndex++;
      } else {
        clearInterval(messageInterval);
      }
    }, 400);
    
    setTimeout(() => {
      // Mock data for demonstration
      const mockIndividuals = [
        { 
          id: 1, 
          firstName: 'Aisha', 
          lastName: 'Bello', 
          middleName: 'Ngozi', 
          tin: '1234567890', 
          dateOfBirth: '1990-05-15', 
          gender: 'Female', 
          nationality: 'Nigerian', 
          phone: '08012345678', 
          email: 'aisha.bello@example.com', 
          address: { 
            street: '123 Main St', 
            city: 'Abuja', 
            lga: 'AMAC', 
            state: 'FCT' 
          }, 
          occupation: 'Doctor', 
          status: 'active', 
          lastUpdated: '2023-11-20T10:30:00Z',
          registrationDate: '2022-06-15T09:00:00Z'
        },
        { 
          id: 2, 
          firstName: 'Chinedu', 
          lastName: 'Okoro', 
          middleName: '', 
          tin: '0987654321', 
          dateOfBirth: '1985-11-22', 
          gender: 'Male', 
          nationality: 'Nigerian', 
          phone: '07098765432', 
          email: 'chinedu.okoro@example.com', 
          address: { 
            street: '456 Market Rd', 
            city: 'Lagos', 
            lga: 'Ikeja', 
            state: 'Lagos' 
          }, 
          occupation: 'Engineer', 
          status: 'inactive', 
          lastUpdated: '2023-11-18T14:15:00Z',
          registrationDate: '2022-04-10T11:20:00Z'
        },
        { 
          id: 3, 
          firstName: 'Fatima', 
          lastName: 'Adamu', 
          middleName: 'Binta', 
          tin: '1122334455', 
          dateOfBirth: '1995-02-10', 
          gender: 'Female', 
          nationality: 'Nigerian', 
          phone: '09011223344', 
          email: 'fatima.adamu@example.com', 
          address: { 
            street: '789 North Av', 
            city: 'Kano', 
            lga: 'Nassarawa', 
            state: 'Kano' 
          }, 
          occupation: 'Teacher', 
          status: 'pending_verification', 
          lastUpdated: '2023-11-21T09:00:00Z',
          registrationDate: '2023-01-08T13:40:00Z'
        },
        { 
          id: 4, 
          firstName: 'Oluwaseun', 
          lastName: 'Adeyemi', 
          middleName: 'David', 
          tin: '2233445566', 
          dateOfBirth: '1988-07-12', 
          gender: 'Male', 
          nationality: 'Nigerian', 
          phone: '08033445566', 
          email: 'oluwaseun.adeyemi@example.com', 
          address: { 
            street: '10 Victoria Island', 
            city: 'Lagos', 
            lga: 'Eti-Osa', 
            state: 'Lagos' 
          }, 
          occupation: 'Accountant', 
          status: 'active', 
          lastUpdated: '2023-11-19T13:20:00Z',
          registrationDate: '2021-11-25T10:15:00Z'
        },
        { 
          id: 5, 
          firstName: 'Ngozi', 
          lastName: 'Eze', 
          middleName: 'Chioma', 
          tin: '3344556677', 
          dateOfBirth: '1992-09-18', 
          gender: 'Female', 
          nationality: 'Nigerian', 
          phone: '07055667788', 
          email: 'ngozi.eze@example.com', 
          address: { 
            street: '22 Ada George Rd', 
            city: 'Port Harcourt', 
            lga: 'Obio/Akpor', 
            state: 'Rivers' 
          }, 
          occupation: 'Lawyer', 
          status: 'active', 
          lastUpdated: '2023-11-15T11:00:00Z',
          registrationDate: '2022-08-05T08:30:00Z'
        },
      ];

      const found = mockIndividuals.find(individual => individual.id === parseInt(id));
      setTaxpayer(found || null);
      setLoading(false);
      clearInterval(messageInterval);
    }, 1800);

    return () => clearInterval(messageInterval);
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
        icon = <FiCheckCircle />;
        text = 'Active';
        className = styles.statusActive;
        break;
      case 'inactive':
        icon = <FiUserX />;
        text = 'Inactive';
        className = styles.statusInactive;
        break;
      case 'pending_verification':
        icon = <FiClock />;
        text = 'Pending Verification';
        className = styles.statusPending;
        break;
      default:
        icon = <FiAlertCircle />;
        text = 'Unknown';
        className = styles.statusUnknown;
    }
    return <span className={`${styles.statusBadge} ${className}`}>{icon}{text}</span>;
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
      <div className={styles.individualDetailsContainer}>
        <div className={styles.detailsLoading}>
          <div className={styles.skeletonHeader}></div>
          <div className={styles.skeletonBody}>
            <div className={styles.skeletonCard}></div>
            <div className={styles.skeletonCard}></div>
            <div className={styles.skeletonCard}></div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '2rem', color: '#64748b' }}>
            {loadingMessage}
          </div>
        </div>
      </div>
    );
  }

  if (!taxpayer) {
    return (
      <div className={styles.individualDetailsContainer}>
        <div className={styles.detailsNotFound}>
          <FiUser size={72} />
          <h2>Taxpayer Not Found</h2>
          <p>The taxpayer you are looking for does not exist or has been removed. Please check the taxpayer ID and try again.</p>
          <button className={styles.backButton} onClick={goBack}>
            <FiArrowLeft /> Back to Taxpayers List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.individualDetailsContainer}>
      {/* Header with back button */}
      <div className={styles.detailsHeader}>
        <button className={styles.backButton} onClick={goBack} aria-label="Go back to taxpayers list">
          <FiArrowLeft /> Back to Taxpayers
        </button>
        <div className={styles.detailsActions}>
          <button className={styles.exportButton} onClick={handleExport} aria-label="Export taxpayer profile">
            <FiDownload /> Export Profile
          </button>
          <button className={styles.editButton} onClick={handleEdit} aria-label="Edit taxpayer profile">
            <FiEdit2 /> Edit Profile
          </button>
        </div>
      </div>

      {/* Profile Header */}
      <div className={styles.profileHeader}>
        <div className={styles.profileAvatar} aria-hidden="true">
          {taxpayer.firstName[0]}{taxpayer.lastName[0]}
        </div>
        <div className={styles.profileHeadline}>
          <h1>{taxpayer.firstName} {taxpayer.middleName && `${taxpayer.middleName} `}{taxpayer.lastName}</h1>
          <div className={styles.profileSubheadline}>
            <div className={styles.tinDisplay} title="Taxpayer Identification Number">
              <FaIdCard /> TIN: {taxpayer.tin}
            </div>
            <StatusBadge status={taxpayer.status} />
            <div className={styles.occupationDisplay} title="Occupation">
              <FiBriefcase /> {taxpayer.occupation}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className={styles.detailsTabs} role="tablist">
        <button 
          className={`${styles.tabButton} ${activeTab === 'overview' ? styles.active : ''}`}
          onClick={() => setActiveTab('overview')}
          aria-selected={activeTab === 'overview'}
          role="tab"
          id="tab-overview"
          aria-controls="panel-overview"
        >
          <FiInfo /> Overview
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'tax-returns' ? styles.active : ''}`}
          onClick={() => setActiveTab('tax-returns')}
          aria-selected={activeTab === 'tax-returns'}
          role="tab"
          id="tab-tax-returns"
          aria-controls="panel-tax-returns"
        >
          <FiFileText /> Tax Returns
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'compliance' ? styles.active : ''}`}
          onClick={() => setActiveTab('compliance')}
          aria-selected={activeTab === 'compliance'}
          role="tab"
          id="tab-compliance"
          aria-controls="panel-compliance"
        >
          <FiShield /> Compliance History
        </button>
        <button 
          className={`${styles.tabButton} ${activeTab === 'transactions' ? styles.active : ''}`}
          onClick={() => setActiveTab('transactions')}
          aria-selected={activeTab === 'transactions'}
          role="tab"
          id="tab-transactions"
          aria-controls="panel-transactions"
        >
          <FiDollarSign /> Transactions
        </button>
      </div>

      {/* Tab Content */}
      <div 
        className={styles.tabContent} 
        role="tabpanel" 
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTab === 'overview' && (
          <div className={styles.overviewTab}>
            {/* Personal Information Section */}
            <div className={styles.detailsSection}>
              <h2><FiUser style={{ marginRight: '0.5rem' }} /> Personal Information</h2>
              <div className={styles.detailsGrid}>
                <div className={styles.detailsItem}>
                  <div className={styles.detailsLabel}>Full Name</div>
                  <div className={styles.detailsValue}>
                    <FiUser />
                    {taxpayer.firstName} {taxpayer.middleName} {taxpayer.lastName}
                  </div>
                </div>
                <div className={styles.detailsItem}>
                  <div className={styles.detailsLabel}>Date of Birth</div>
                  <div className={styles.detailsValue}>
                    <FiCalendar />
                    {formatDate(taxpayer.dateOfBirth)}
                  </div>
                </div>
                <div className={styles.detailsItem}>
                  <div className={styles.detailsLabel}>Gender</div>
                  <div className={styles.detailsValue}>
                    <FiUser />
                    {taxpayer.gender}
                  </div>
                </div>
                <div className={styles.detailsItem}>
                  <div className={styles.detailsLabel}>Nationality</div>
                  <div className={styles.detailsValue}>
                    <FaPassport />
                    {taxpayer.nationality}
                  </div>
                </div>
                <div className={styles.detailsItem}>
                  <div className={styles.detailsLabel}>Occupation</div>
                  <div className={styles.detailsValue}>
                    <FiBriefcase />
                    {taxpayer.occupation}
                  </div>
                </div>
                <div className={styles.detailsItem}>
                  <div className={styles.detailsLabel}>TIN</div>
                  <div className={styles.detailsValue}>
                    <FaIdCard />
                    <strong>{taxpayer.tin}</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className={styles.detailsSection}>
              <h2><FiPhone style={{ marginRight: '0.5rem' }} /> Contact Information</h2>
              <div className={styles.detailsGrid}>
                <div className={styles.detailsItem}>
                  <div className={styles.detailsLabel}>Email Address</div>
                  <div className={styles.detailsValue}>
                    <FiMail />
                    <a href={`mailto:${taxpayer.email}`} style={{ color: '#0891b2', textDecoration: 'none' }}>
                      {taxpayer.email}
                    </a>
                  </div>
                </div>
                <div className={styles.detailsItem}>
                  <div className={styles.detailsLabel}>Phone Number</div>
                  <div className={styles.detailsValue}>
                    <FiPhone />
                    <a href={`tel:${taxpayer.phone}`} style={{ color: '#0891b2', textDecoration: 'none' }}>
                      {taxpayer.phone}
                    </a>
                  </div>
                </div>
                <div className={styles.detailsItem} style={{ gridColumn: '1 / -1' }}>
                  <div className={styles.detailsLabel}>Residential Address</div>
                  <div className={styles.detailsValue}>
                    <FiHome />
                    {taxpayer.address.street}, {taxpayer.address.city}, {taxpayer.address.lga}, {taxpayer.address.state}
                  </div>
                </div>
              </div>
            </div>

            {/* Account Status Section */}
            <div className={styles.detailsSection}>
              <h2><FiClipboard style={{ marginRight: '0.5rem' }} /> Account Status</h2>
              <div className={styles.detailsGrid}>
                <div className={styles.detailsItem}>
                  <div className={styles.detailsLabel}>Current Status</div>
                  <div className={styles.detailsValue}>
                    <StatusBadge status={taxpayer.status} />
                  </div>
                </div>
                <div className={styles.detailsItem}>
                  <div className={styles.detailsLabel}>Last Updated</div>
                  <div className={styles.detailsValue}>
                    <FiCalendar />
                    {formatDateTime(taxpayer.lastUpdated)}
                  </div>
                </div>
                <div className={styles.detailsItem}>
                  <div className={styles.detailsLabel}>Registration Date</div>
                  <div className={styles.detailsValue}>
                    <FiCalendar />
                    {formatDate(taxpayer.registrationDate)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tax-returns' && (
          <div className={styles.taxReturnsTab}>
            <div className={styles.placeholderContent}>
              <FaMoneyBillWave size={72} />
              <h3>Tax Returns History</h3>
              <p>This taxpayer has no tax returns history yet. Tax returns for this individual will appear here once submitted. You can click the "Edit Profile" button to add tax return information.</p>
              <button className={styles.editButton} onClick={handleEdit} style={{ marginTop: '1.5rem' }}>
                <FiEdit2 /> Add Tax Return
              </button>
            </div>
          </div>
        )}

        {activeTab === 'compliance' && (
          <div className={styles.complianceTab}>
            <div className={styles.placeholderContent}>
              <FiShield size={72} />
              <h3>Compliance History</h3>
              <p>No compliance records found for this taxpayer. Compliance records will appear here if there are any issues or notices. This section shows tax compliance history including notices, penalties, and compliance status over time.</p>
              <button className={styles.exportButton} style={{ marginTop: '1.5rem' }}>
                <FiGlobe /> Generate Compliance Report
              </button>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className={styles.transactionsTab}>
            <div className={styles.placeholderContent}>
              <FiDollarSign size={72} />
              <h3>Transaction History</h3>
              <p>No transaction records found for this taxpayer. Payment and transaction history will appear here once available. This includes tax payments, refunds, and other financial transactions related to this taxpayer's account.</p>
              <button className={styles.exportButton} style={{ marginTop: '1.5rem' }}>
                <FiBarChart2 /> View Financial Summary
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndividualDetails; 