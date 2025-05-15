import React, { useState } from 'react';
import './TaxpayerProfiling.css';

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
      { year: 2022, assessmentAmount: 450000, amountPaid: 450000, status: 'Paid', date: '2022-12-15' },
      { year: 2021, assessmentAmount: 380000, amountPaid: 380000, status: 'Paid', date: '2021-11-30' },
      { year: 2020, assessmentAmount: 350000, amountPaid: 280000, status: 'Partially Paid', date: '2020-12-10' },
      { year: 2019, assessmentAmount: 300000, amountPaid: 0, status: 'Unpaid', date: '2019-12-05' },
    ],
    assessmentHistory: [
      { id: 'ASM-2022-001', type: 'PAYE', amount: 450000, status: 'Assessed', date: '2022-01-15' },
      { id: 'ASM-2021-002', type: 'Personal Income Tax', amount: 380000, status: 'Assessed', date: '2021-01-20' },
      { id: 'ASM-2020-003', type: 'Personal Income Tax', amount: 350000, status: 'Assessed', date: '2020-01-25' },
      { id: 'ASM-2019-004', type: 'PAYE', amount: 300000, status: 'Assessed', date: '2019-01-10' },
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
    if (score >= 80) return 'green';
    if (score >= 60) return 'orange';
    return 'red';
  };

  return (
    <div className="taxpayer-profiling">
      <div className="profiling-header">
        <h1>Taxpayer Profiling</h1>
        <p>Perform in-depth taxpayer audits and profile analysis</p>
      </div>

      <div className="search-section">
        <form onSubmit={handleSearch}>
          <div className="search-controls">
            <div className="search-type">
              <label htmlFor="search-type">Search By</label>
              <select 
                id="search-type" 
                value={searchType} 
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="tin">TIN</option>
                <option value="email">Email</option>
                <option value="phone">Phone Number</option>
              </select>
            </div>
            
            <div className="search-input">
              <input
                type="text"
                placeholder={`Enter taxpayer ${searchType.toUpperCase()}`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
            
            <div className="search-buttons">
              <button type="submit" className="search-btn" disabled={isSearching}>
                {isSearching ? 'Searching...' : 'Search'}
              </button>
              <button type="button" className="clear-btn" onClick={clearSearch}>
                Clear
              </button>
            </div>
          </div>
        </form>
        
        {error && <div className="error-message">{error}</div>}
      </div>

      {profileData && (
        <div className="profile-results">
          <div className="profile-section personal-info">
            <h2>Personal Information</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="label">TIN</span>
                <span className="value">{profileData.personalInfo.tin}</span>
              </div>
              <div className="info-item">
                <span className="label">Full Name</span>
                <span className="value">{profileData.personalInfo.fullName}</span>
              </div>
              <div className="info-item">
                <span className="label">Email</span>
                <span className="value">{profileData.personalInfo.email}</span>
              </div>
              <div className="info-item">
                <span className="label">Phone</span>
                <span className="value">{profileData.personalInfo.phone}</span>
              </div>
              <div className="info-item">
                <span className="label">Address</span>
                <span className="value">{profileData.personalInfo.address}</span>
              </div>
              <div className="info-item">
                <span className="label">Date of Birth</span>
                <span className="value">{profileData.personalInfo.dateOfBirth}</span>
              </div>
              <div className="info-item">
                <span className="label">Gender</span>
                <span className="value">{profileData.personalInfo.gender}</span>
              </div>
              <div className="info-item">
                <span className="label">Nationality</span>
                <span className="value">{profileData.personalInfo.nationality}</span>
              </div>
              <div className="info-item">
                <span className="label">Occupation</span>
                <span className="value">{profileData.personalInfo.occupation}</span>
              </div>
              <div className="info-item">
                <span className="label">Employment Status</span>
                <span className="value">{profileData.personalInfo.employmentStatus}</span>
              </div>
            </div>
          </div>

          <div className="profile-columns">
            <div className="profile-column">
              <div className="profile-section compliance-score">
                <h2>Compliance Score</h2>
                <div className="score-display">
                  <div 
                    className="score-circle" 
                    style={{ 
                      borderColor: getScoreColor(profileData.complianceScore.score) 
                    }}
                  >
                    <span className="score-value">{profileData.complianceScore.score}</span>
                  </div>
                  <div className="score-details">
                    <div className="score-item">
                      <span className="label">Risk Level</span>
                      <span className="value">{profileData.complianceScore.risk}</span>
                    </div>
                    <div className="score-item">
                      <span className="label">Filing Consistency</span>
                      <span className="value">{profileData.complianceScore.filingConsistency}</span>
                    </div>
                    <div className="score-item">
                      <span className="label">Payment Consistency</span>
                      <span className="value">{profileData.complianceScore.paymentConsistency}</span>
                    </div>
                    <div className="score-item">
                      <span className="label">Last Audit</span>
                      <span className="value">{profileData.complianceScore.lastAudit}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="profile-section related-entities">
                <h2>Related Entities</h2>
                {profileData.relatedEntities.length > 0 ? (
                  <table>
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
                ) : (
                  <p>No related entities found</p>
                )}
              </div>

              <div className="profile-section pending-matters">
                <h2>Pending Matters</h2>
                {profileData.pendingMatters.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Status</th>
                        <th>Open Date</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {profileData.pendingMatters.map((matter, index) => (
                        <tr key={index}>
                          <td>{matter.type}</td>
                          <td>{matter.status}</td>
                          <td>{matter.openDate}</td>
                          <td>{matter.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No pending matters found</p>
                )}
              </div>
            </div>

            <div className="profile-column">
              <div className="profile-section tax-history">
                <h2>Tax Payment History</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Year</th>
                      <th>Assessment</th>
                      <th>Amount Paid</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData.taxHistory.map((record, index) => (
                      <tr key={index}>
                        <td>{record.year}</td>
                        <td>₦{record.assessmentAmount.toLocaleString()}</td>
                        <td>₦{record.amountPaid.toLocaleString()}</td>
                        <td>
                          <span className={`status-badge ${record.status.toLowerCase().replace(' ', '-')}`}>
                            {record.status}
                          </span>
                        </td>
                        <td>{record.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="profile-section assessment-history">
                <h2>Assessment History</h2>
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {profileData.assessmentHistory.map((assessment, index) => (
                      <tr key={index}>
                        <td>{assessment.id}</td>
                        <td>{assessment.type}</td>
                        <td>₦{assessment.amount.toLocaleString()}</td>
                        <td>{assessment.status}</td>
                        <td>{assessment.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="profile-section activity-log">
                <h2>Activity Log</h2>
                <table>
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
          </div>

          <div className="profile-actions">
            <button className="action-btn print-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Print Profile
            </button>
            <button className="action-btn export-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              Export as PDF
            </button>
            <button className="action-btn audit-btn">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              Initiate Audit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxpayerProfiling; 