import React, { useState } from 'react';
import {
  FiSearch, FiUser, FiActivity, FiCalendar, FiDollarSign, 
  FiPrinter, FiDownload, FiAlertCircle, FiFile, FiUsers,
  FiCheckCircle, FiXCircle, FiClock, FiRefreshCw,
  FiMail, FiPhone, FiMapPin, FiGlobe, FiBriefcase, FiHash,
  FiBookmark, FiTag, FiFileText, FiCreditCard
} from 'react-icons/fi';
import styles from './TaxpayerProfiling.module.css';

const TaxpayerProfiling = () => {
  const [searchType, setSearchType] = useState('tin');
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  // Mock data - In a real app, this would come from an API
  const mockProfileData = {
    personalInfo: {
      tin: '1234567890',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+234 800 123 4567',
      address: '123 Main Street, Lagos',
      dateOfBirth: '1985-05-15',
      gender: 'Male',
      nationality: 'Nigerian',
      occupation: 'Software Engineer',
      employmentStatus: 'Employed',
    },
    taxHistory: [
      { 
        year: 2022, 
        assessmentAmount: 450000, 
        amountPaid: 450000, 
        status: 'Paid', 
        date: '2022-12-15',
        revenueHead: 'Personal Income Tax',
        revenueItem: 'PAYE',
        receiptNo: 'RCP-2022-45678'
      },
      { 
        year: 2021, 
        assessmentAmount: 380000, 
        amountPaid: 380000, 
        status: 'Paid', 
        date: '2021-11-30',
        revenueHead: 'Property Tax',
        revenueItem: 'Land Use Charge',
        receiptNo: 'RCP-2021-34567'
      },
      { 
        year: 2020, 
        assessmentAmount: 350000, 
        amountPaid: 280000, 
        status: 'Partially Paid', 
        date: '2020-12-10',
        revenueHead: 'Personal Income Tax',
        revenueItem: 'PAYE',
        receiptNo: 'RCP-2020-23456'
      },
      { 
        year: 2019, 
        assessmentAmount: 300000, 
        amountPaid: 0, 
        status: 'Unpaid', 
        date: '2019-12-05',
        revenueHead: 'Personal Income Tax',
        revenueItem: 'Direct Assessment',
        receiptNo: ''
      },
    ],
    assessmentHistory: [
      { 
        id: 'ASM-2022-001', 
        type: 'PAYE', 
        amount: 450000, 
        status: 'Assessed', 
        date: '2022-01-15',
        revenueHead: 'Personal Income Tax',
        revenueItem: 'PAYE', 
        paymentStatus: 'Paid',
        receiptNo: 'RCP-2022-45678'
      },
      { 
        id: 'ASM-2021-002', 
        type: 'Personal Income Tax', 
        amount: 380000, 
        status: 'Assessed', 
        date: '2021-01-20',
        revenueHead: 'Property Tax',
        revenueItem: 'Land Use Charge',
        paymentStatus: 'Paid',
        receiptNo: 'RCP-2021-34567'
      },
      { 
        id: 'ASM-2020-003', 
        type: 'Personal Income Tax', 
        amount: 350000, 
        status: 'Assessed', 
        date: '2020-01-25',
        revenueHead: 'Personal Income Tax',
        revenueItem: 'PAYE',
        paymentStatus: 'Partially Paid',
        receiptNo: 'RCP-2020-23456'
      },
      { 
        id: 'ASM-2019-004', 
        type: 'PAYE', 
        amount: 300000, 
        status: 'Assessed', 
        date: '2019-01-10',
        revenueHead: 'Personal Income Tax',
        revenueItem: 'Direct Assessment',
        paymentStatus: 'Unpaid',
        receiptNo: ''
      },
    ],
    complianceScore: {
      score: 75,
      risk: 'Medium',
      filingConsistency: 'Good',
      paymentConsistency: 'Fair',
      lastAudit: '2020-06-15',
    },
    relatedEntities: [
      { name: 'Tech Solutions Ltd', relationship: 'Employer', tin: '9876543210' },
      { name: 'Innovative Startups Inc', relationship: 'Director', tin: '5678901234' },
    ],
    pendingMatters: [
      { type: 'Tax Dispute', status: 'In Progress', openDate: '2021-05-20', description: 'Dispute over income classification' },
    ],
    activityLog: [
      { action: 'Filed Tax Return', date: '2022-03-15', details: 'Annual tax return for 2021' },
      { action: 'Changed Address', date: '2021-08-10', details: 'Updated residential address' },
      { action: 'Payment Made', date: '2021-11-30', details: 'Payment for 2021 assessment' },
      { action: 'TCC Application', date: '2021-02-05', details: 'Applied for Tax Clearance Certificate' },
    ],
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      setError('Please enter a search value');
      return;
    }
    
    setIsSearching(true);
    setError(null);
    
    // Simulate API request
    setTimeout(() => {
      setIsSearching(false);
      setProfileData(mockProfileData);
    }, 1500);
  };

  const clearSearch = () => {
    setSearchValue('');
    setProfileData(null);
    setError(null);
  };

  // Helper function to render compliance score color
  const getScoreColor = (score) => {
    if (score >= 80) return '#16a34a'; // green
    if (score >= 60) return '#d97706'; // orange
    return '#dc2626'; // red
  };

  // Function to handle printing receipt
  const handlePrintReceipt = (receiptNo) => {
    console.log(`Printing receipt: ${receiptNo}`);
    // In a real implementation, this would open a receipt view or generate a PDF
    alert(`Printing receipt: ${receiptNo}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>
          Taxpayer Profiling
          <div className={styles.titleIconContainer}>
            <FiUsers />
          </div>
        </h1>
        <p className={styles.subtitle}>Perform in-depth taxpayer audits and profile analysis</p>
      </div>

      <div className={styles.searchCard}>
        <div className={styles.searchHeader}>
          <FiSearch className={styles.searchHeaderIcon} />
          <h2>Find Taxpayer</h2>
        </div>
        
        <form onSubmit={handleSearch}>
          <div className={styles.searchControls}>
            <div className={styles.searchTypeContainer}>
              <label htmlFor="search-type">Search By</label>
              <select 
                id="search-type" 
                value={searchType} 
                onChange={(e) => setSearchType(e.target.value)}
                className={styles.selectInput}
              >
                <option value="tin">TIN</option>
                <option value="email">Email</option>
                <option value="phone">Phone Number</option>
              </select>
            </div>
            
            <div className={styles.searchInputContainer}>
              <label htmlFor="search-value">Search Value</label>
              <div className={styles.inputWithIcon}>
                {searchType === 'tin' && <FiHash className={styles.inputIcon} />}
                {searchType === 'email' && <FiMail className={styles.inputIcon} />}
                {searchType === 'phone' && <FiPhone className={styles.inputIcon} />}
                <input
                  id="search-value"
                  type="text"
                  placeholder={`Enter taxpayer ${searchType.toUpperCase()}`}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className={styles.textInput}
                />
              </div>
            </div>
            
            <div className={styles.searchButtonsContainer}>
              <button type="submit" className={styles.primaryButton} disabled={isSearching}>
                {isSearching ? <><FiRefreshCw className={styles.spinningIcon} /> Searching...</> : <>Search</>}
              </button>
              <button type="button" className={styles.secondaryButton} onClick={clearSearch}>
                Clear
              </button>
            </div>
          </div>
        </form>
        
        {error && <div className={styles.errorMessage}><FiAlertCircle /> {error}</div>}
      </div>

      {isSearching && (
        <div className={styles.loadingState}>
          <FiRefreshCw className={styles.loadingIcon} />
          <p>Searching for taxpayer information...</p>
        </div>
      )}

      {profileData && !isSearching && (
        <div className={styles.profileContainer}>
          {/* Profile Header Section */}
          <div className={styles.profileHeader}>
            <div className={styles.profileIdentity}>
              <div className={styles.profileAvatar}>
                {profileData.personalInfo.fullName.split(' ').map(name => name[0]).join('')}
              </div>
              <div className={styles.profileNameInfo}>
                <h2>{profileData.personalInfo.fullName}</h2>
                <div className={styles.profileMeta}>
                  <span><FiHash /> TIN: {profileData.personalInfo.tin}</span>
                  <span><FiMail /> {profileData.personalInfo.email}</span>
                  <span><FiPhone /> {profileData.personalInfo.phone}</span>
                </div>
              </div>
            </div>
            
            <div className={styles.complianceIndicator}>
              <div 
                className={styles.scoreCircle} 
                style={{ 
                  borderColor: getScoreColor(profileData.complianceScore.score) 
                }}
              >
                <span>{profileData.complianceScore.score}</span>
              </div>
              <div className={styles.scoreLabel}>
                <p>Compliance Score</p>
                <span 
                  className={styles.riskLevel}
                  style={{ 
                    backgroundColor: `${getScoreColor(profileData.complianceScore.score)}20`,
                    color: getScoreColor(profileData.complianceScore.score)
                  }}
                >
                  {profileData.complianceScore.risk} Risk
                </span>
              </div>
            </div>
          </div>

          {/* Tabs section would go here in a complete implementation */}

          {/* Profile Content */}
          <div className={styles.profileContent}>
            <div className={styles.profileSection}>
              <div className={styles.sectionHeader}>
                <FiUser />
                <h3>Personal Information</h3>
              </div>
              <div className={styles.infoGrid}>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Full Name</div>
                  <div className={styles.infoValue}>{profileData.personalInfo.fullName}</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>TIN</div>
                  <div className={styles.infoValue}>{profileData.personalInfo.tin}</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Email</div>
                  <div className={styles.infoValue}>{profileData.personalInfo.email}</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Phone</div>
                  <div className={styles.infoValue}>{profileData.personalInfo.phone}</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Address</div>
                  <div className={styles.infoValue}>{profileData.personalInfo.address}</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Date of Birth</div>
                  <div className={styles.infoValue}>{profileData.personalInfo.dateOfBirth}</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Gender</div>
                  <div className={styles.infoValue}>{profileData.personalInfo.gender}</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Nationality</div>
                  <div className={styles.infoValue}>{profileData.personalInfo.nationality}</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Occupation</div>
                  <div className={styles.infoValue}>{profileData.personalInfo.occupation}</div>
                </div>
                <div className={styles.infoCard}>
                  <div className={styles.infoLabel}>Employment Status</div>
                  <div className={styles.infoValue}>{profileData.personalInfo.employmentStatus}</div>
                </div>
              </div>
            </div>

            <div className={styles.twoColumnsGrid}>
              <div className={styles.profileSection}>
                <div className={styles.sectionHeader}>
                  <FiDollarSign />
                  <h3>Compliance Details</h3>
                </div>
                <div className={styles.complianceDetails}>
                  <div className={styles.complianceItem}>
                    <span className={styles.complianceLabel}>Filing Consistency</span>
                    <span className={styles.complianceValue}>{profileData.complianceScore.filingConsistency}</span>
                  </div>
                  <div className={styles.complianceItem}>
                    <span className={styles.complianceLabel}>Payment Consistency</span>
                    <span className={styles.complianceValue}>{profileData.complianceScore.paymentConsistency}</span>
                  </div>
                  <div className={styles.complianceItem}>
                    <span className={styles.complianceLabel}>Last Audit</span>
                    <span className={styles.complianceValue}>{profileData.complianceScore.lastAudit}</span>
                  </div>
                </div>
              </div>

              <div className={styles.profileSection}>
                <div className={styles.sectionHeader}>
                  <FiBriefcase />
                  <h3>Related Entities</h3>
                </div>
                <div className={styles.tableCard}>
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Relationship</th>
                        <th>TIN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profileData.relatedEntities.map((entity, index) => (
                        <tr key={index}>
                          <td>{entity.name}</td>
                          <td>{entity.relationship}</td>
                          <td>{entity.tin}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className={styles.profileSection}>
              <div className={styles.sectionHeader}>
                <FiCalendar />
                <h3>Tax Payment History</h3>
              </div>
              <div className={styles.tableCard}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Revenue Head</th>
                      <th>Revenue Item</th>
                      <th>Assessment</th>
                      <th>Amount Paid</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData.taxHistory.map((record, index) => (
                      <tr key={index}>
                        <td>{record.year}</td>
                        <td>
                          <div className={styles.withIcon}>
                            <FiBookmark className={styles.tableIcon} />
                            <span>{record.revenueHead}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.withIcon}>
                            <FiTag className={styles.tableIcon} />
                            <span>{record.revenueItem}</span>
                          </div>
                        </td>
                        <td>₦{record.assessmentAmount.toLocaleString()}</td>
                        <td>₦{record.amountPaid.toLocaleString()}</td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles[record.status.toLowerCase().replace(' ', '')]}`}>
                            {record.status === 'Paid' && <FiCheckCircle />}
                            {record.status === 'Partially Paid' && <FiClock />}
                            {record.status === 'Unpaid' && <FiXCircle />}
                            {record.status}
                          </span>
                        </td>
                        <td>{record.date}</td>
                        <td>
                          {(record.status === 'Paid' || record.status === 'Partially Paid') && (
                            <button 
                              className={styles.actionButtonSmall}
                              onClick={() => handlePrintReceipt(record.receiptNo)}
                              title="Print Receipt"
                            >
                              <FiPrinter /> Receipt
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.profileSection}>
              <div className={styles.sectionHeader}>
                <FiFile />
                <h3>Assessment History</h3>
              </div>
              <div className={styles.tableCard}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Revenue Head</th>
                      <th>Revenue Item</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Payment Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData.assessmentHistory.map((assessment, index) => (
                      <tr key={index}>
                        <td>{assessment.id}</td>
                        <td>
                          <div className={styles.withIcon}>
                            <FiBookmark className={styles.tableIcon} />
                            <span>{assessment.revenueHead}</span>
                          </div>
                        </td>
                        <td>
                          <div className={styles.withIcon}>
                            <FiTag className={styles.tableIcon} />
                            <span>{assessment.revenueItem}</span>
                          </div>
                        </td>
                        <td>₦{assessment.amount.toLocaleString()}</td>
                        <td>{assessment.status}</td>
                        <td>
                          <span className={`${styles.statusBadge} ${styles[assessment.paymentStatus.toLowerCase().replace(' ', '')]}`}>
                            {assessment.paymentStatus === 'Paid' && <FiCheckCircle />}
                            {assessment.paymentStatus === 'Partially Paid' && <FiClock />}
                            {assessment.paymentStatus === 'Unpaid' && <FiXCircle />}
                            {assessment.paymentStatus}
                          </span>
                        </td>
                        <td>{assessment.date}</td>
                        <td>
                          {(assessment.paymentStatus === 'Paid' || assessment.paymentStatus === 'Partially Paid') && (
                            <button 
                              className={styles.actionButtonSmall}
                              onClick={() => handlePrintReceipt(assessment.receiptNo)}
                              title="Print Receipt"
                            >
                              <FiPrinter /> Receipt
                            </button>
                          )}
                          <button 
                            className={`${styles.actionButtonSmall} ${styles.viewButton}`}
                            title="View Assessment"
                          >
                            <FiFileText /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.profileSection}>
              <div className={styles.sectionHeader}>
                <FiActivity />
                <h3>Activity Log</h3>
              </div>
              <div className={styles.tableCard}>
                <table className={styles.dataTable}>
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Date</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData.activityLog.map((log, index) => (
                      <tr key={index}>
                        <td>{log.action}</td>
                        <td>{log.date}</td>
                        <td>{log.details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className={styles.profileActions}>
              <button className={`${styles.actionButton} ${styles.secondaryButton}`}>
                <FiPrinter /> Print Profile
              </button>
              <button className={`${styles.actionButton} ${styles.secondaryButton}`}>
                <FiDownload /> Export as PDF
              </button>
              <button className={`${styles.actionButton} ${styles.primaryButton}`}>
                <FiAlertCircle /> Initiate Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxpayerProfiling; 