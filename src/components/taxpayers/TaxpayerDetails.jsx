import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiUser, FiBriefcase, FiArrowLeft, FiFileText, FiDollarSign,
  FiClock, FiBook, FiCalendar, FiCheck, FiClipboard,
  FiActivity, FiLayers, FiMapPin, FiMail, FiPhone, FiHash,
  FiCheckCircle, FiUsers, FiEdit
} from 'react-icons/fi';
import './TaxpayerDetails.css';

const TaxpayerDetails = ({ type }) => {
  console.log('TaxpayerDetails rendering with type:', type);
  const { id } = useParams();
  console.log('Taxpayer ID from URL params:', id);
  
  const navigate = useNavigate();
  const [taxpayer, setTaxpayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');
  const [assessments, setAssessments] = useState([]);
  const [bills, setBills] = useState([]);
  const [taxReturns, setTaxReturns] = useState([]);
  const [tccHistory, setTccHistory] = useState([]);
  const [taxHistory, setTaxHistory] = useState([]);

  // Mock data fetch for taxpayer details
  const fetchTaxpayerData = useCallback(() => {
    setLoading(true);
    console.log('Fetching data for taxpayer ID:', id, 'with type:', type);
    
    setTimeout(() => {
      try {
        // Mock individual data
        if (type === 'individual') {
          const mockIndividual = { 
            id: parseInt(id), 
            firstName: 'Aisha', 
            lastName: 'Bello', 
            middleName: 'Ngozi',
            fullName: 'Aisha Ngozi Bello',
            tin: '1234567890', 
            dateOfBirth: '1990-05-15', 
            gender: 'Female', 
            nationality: 'Nigerian', 
            phone: '08012345678', 
            email: 'aisha.bello@example.com', 
            address: { street: '123 Main St', city: 'Abuja', lga: 'AMAC', state: 'FCT' }, 
            occupation: 'Doctor', 
            status: 'active', 
            lastUpdated: '2023-11-20T10:30:00Z',
            registrationDate: '2020-06-15T08:00:00Z',
            idTypes: [
              { type: 'National ID', number: 'NIN12345678', verified: true },
              { type: 'Driver\'s License', number: 'DL987654321', verified: true }
            ],
            employmentInfo: {
              employer: 'General Hospital',
              position: 'Senior Doctor',
              startDate: '2018-03-01',
              annualIncome: '₦12,500,000'
            }
          };
          console.log('Setting individual taxpayer data:', mockIndividual);
          setTaxpayer(mockIndividual);

        } else if (type === 'business') {
          // Mock business data
          const mockBusiness = {
            id: parseInt(id),
            businessName: 'Tech Innovate Ltd',
            tin: 'TIN12345678', 
            registrationNumber: 'RC123456', 
            businessType: 'Limited Liability Company', 
            industry: 'Information Technology', 
            dateEstablished: '2015-03-10', 
            phone: '08055005500', 
            email: 'info@techinnovate.com', 
            address: { street: '5 Innovation Drive', city: 'Lagos', lga: 'Victoria Island', state: 'Lagos' }, 
            contactPerson: { name: 'Oluwaseun Adeyemi', position: 'CEO', phone: '08055005501', email: 'seun.a@techinnovate.com' }, 
            status: 'active', 
            lastUpdated: '2023-11-20T10:30:00Z',
            registrationDate: '2015-03-10T09:30:00Z',
            directors: [
              { name: 'Oluwaseun Adeyemi', position: 'CEO', ownership: '60%' },
              { name: 'Chioma Nwosu', position: 'COO', ownership: '40%' }
            ],
            annualRevenue: '₦350,000,000'
          };
          console.log('Setting business taxpayer data:', mockBusiness);
          setTaxpayer(mockBusiness);
        } else {
          console.error('Invalid taxpayer type:', type);
        }

        // Mock assessments data
        const mockAssessments = [
          { id: 1, assessmentNumber: 'ASM-2023-001', type: 'Annual Tax', amount: '₦1,250,000', status: 'Completed', date: '2023-03-15T09:00:00Z' },
          { id: 2, assessmentNumber: 'ASM-2023-002', type: 'Property Tax', amount: '₦350,000', status: 'In Review', date: '2023-05-20T14:30:00Z' },
          { id: 3, assessmentNumber: 'ASM-2022-045', type: 'Annual Tax', amount: '₦980,000', status: 'Completed', date: '2022-03-10T11:15:00Z' }
        ];
        setAssessments(mockAssessments);

        // Mock bills data
        const mockBills = [
          { id: 1, billNumber: 'BIL-2023-001', description: 'Annual Tax 2023', amount: '₦1,250,000', status: 'Paid', dueDate: '2023-04-15T00:00:00Z', paymentDate: '2023-04-10T15:30:00Z' },
          { id: 2, billNumber: 'BIL-2023-002', description: 'Property Tax Q2 2023', amount: '₦350,000', status: 'Pending', dueDate: '2023-06-30T00:00:00Z', paymentDate: null },
          { id: 3, billNumber: 'BIL-2022-078', description: 'Annual Tax 2022', amount: '₦980,000', status: 'Paid', dueDate: '2022-04-15T00:00:00Z', paymentDate: '2022-04-12T09:45:00Z' }
        ];
        setBills(mockBills);

        // Mock tax returns data
        const mockReturns = [
          { id: 1, returnNumber: 'RTN-2023-001', year: '2022', type: 'Personal Income Tax', submissionDate: '2023-03-01T14:20:00Z', status: 'Verified' },
          { id: 2, returnNumber: 'RTN-2022-001', year: '2021', type: 'Personal Income Tax', submissionDate: '2022-03-05T10:15:00Z', status: 'Verified' },
          { id: 3, returnNumber: 'RTN-2021-001', year: '2020', type: 'Personal Income Tax', submissionDate: '2021-02-28T09:30:00Z', status: 'Verified' }
        ];
        setTaxReturns(mockReturns);

        // Mock TCC history
        const mockTCC = [
          { id: 1, tccNumber: 'TCC/2023/12345', issueDate: '2023-05-10T00:00:00Z', expiryDate: '2024-05-09T00:00:00Z', status: 'Active', purpose: 'Government Contract' },
          { id: 2, tccNumber: 'TCC/2022/78901', issueDate: '2022-04-15T00:00:00Z', expiryDate: '2023-04-14T00:00:00Z', status: 'Expired', purpose: 'Land Registration' }
        ];
        setTccHistory(mockTCC);

        // Mock tax history
        const mockTaxHistory = [
          { id: 1, year: '2022', paidAmount: '₦1,250,000', date: '2023-04-10T15:30:00Z', type: 'Annual Tax', status: 'Completed' },
          { id: 2, year: '2021', paidAmount: '₦980,000', date: '2022-04-12T09:45:00Z', type: 'Annual Tax', status: 'Completed' },
          { id: 3, year: '2020', paidAmount: '₦820,000', date: '2021-03-25T14:20:00Z', type: 'Annual Tax', status: 'Completed' }
        ];
        setTaxHistory(mockTaxHistory);

        setLoading(false);
      } catch (error) {
        console.error("Error setting up taxpayer data:", error);
        setLoading(false);
      }
    }, 1000);
  }, [id, type]);

  useEffect(() => {
    fetchTaxpayerData();
  }, [fetchTaxpayerData]);

  const handleBack = () => {
    navigate(type === 'individual' ? '/dashboard/taxpayers/individuals' : '/dashboard/taxpayers/businesses');
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      console.error("Error formatting date:", e);
      return dateString || '-';
    }
  };
  
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    } catch(e) {
      console.error("Error formatting datetime:", e);
      return dateString || '-';
    }
  };

  // Action handlers for page actions
  const handleViewAssessment = (assessment) => {
    console.log('Viewing assessment details:', assessment);
  };

  const handleViewBill = (bill) => {
    console.log('Viewing bill details:', bill);
  };

  const handleViewReturn = (taxReturn) => {
    console.log('Viewing tax return details:', taxReturn);
  };

  const handleViewTCC = (tcc) => {
    console.log('Viewing TCC details:', tcc);
  };

  const handleViewReceipt = (history) => {
    console.log('Viewing receipt details:', history);
  };

  // Handler for updating taxpayer information via maker-checker process
  const handleUpdateInfo = () => {
    navigate(`/dashboard/taxpayers/${type === 'individual' ? 'individuals' : 'businesses'}/${id}/update`);
  };

  const renderTaxpayerDetails = () => {
    if (!taxpayer) return null;
    console.log('Rendering taxpayer details for:', type, taxpayer);

    if (type === 'individual') {
      return (
        <>
          <div className="detail-section">
            <h3><FiUser /> Personal Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">{`${taxpayer?.firstName || ''} ${taxpayer?.middleName ? taxpayer?.middleName + ' ' : ''}${taxpayer?.lastName || ''}`}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">TIN</span>
                <span className="detail-value">{taxpayer?.tin || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date of Birth</span>
                <span className="detail-value">{formatDate(taxpayer?.dateOfBirth)}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Gender</span>
                <span className="detail-value">{taxpayer?.gender || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Nationality</span>
                <span className="detail-value">{taxpayer?.nationality || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Occupation</span>
                <span className="detail-value">{taxpayer?.occupation || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3><FiMail /> Contact Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{taxpayer?.email || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{taxpayer?.phone || 'N/A'}</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Address</span>
                <span className="detail-value">{
                  taxpayer?.address ? 
                  `${taxpayer?.address?.street || ''}, ${taxpayer?.address?.city || ''}, ${taxpayer?.address?.lga || ''}, ${taxpayer?.address?.state || ''}` : 
                  'No address available'
                }</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3><FiBriefcase /> Employment Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Employer</span>
                <span className="detail-value">{taxpayer?.employmentInfo?.employer || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Position</span>
                <span className="detail-value">{taxpayer?.employmentInfo?.position || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Start Date</span>
                <span className="detail-value">{formatDate(taxpayer?.employmentInfo?.startDate) || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Annual Income</span>
                <span className="detail-value">{taxpayer?.employmentInfo?.annualIncome || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3><FiFileText /> Identification</h3>
            <div className="id-cards">
              {(taxpayer?.idTypes && taxpayer.idTypes.length > 0) ? taxpayer.idTypes.map((id, index) => (
                <div key={index} className="id-card">
                  <div className="id-card-header">
                    <h4>{id?.type || 'Unknown ID'}</h4>
                    {id?.verified && <span className="verified-badge"><FiCheck /> Verified</span>}
                  </div>
                  <div className="id-card-body">
                    <p>{id?.number || 'N/A'}</p>
                  </div>
                </div>
              )) : (
                <div className="no-data-message">No identification documents available</div>
              )}
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="detail-section">
            <h3><FiBriefcase /> Business Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Business Name</span>
                <span className="detail-value">{taxpayer?.businessName || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">TIN</span>
                <span className="detail-value">{taxpayer?.tin || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Registration Number</span>
                <span className="detail-value">{taxpayer?.registrationNumber || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Business Type</span>
                <span className="detail-value">{taxpayer?.businessType || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Industry</span>
                <span className="detail-value">{taxpayer?.industry || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Date Established</span>
                <span className="detail-value">{formatDate(taxpayer?.dateEstablished) || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Annual Revenue</span>
                <span className="detail-value">{taxpayer?.annualRevenue || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3><FiMail /> Contact Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{taxpayer?.email || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{taxpayer?.phone || 'N/A'}</span>
              </div>
              <div className="detail-item full-width">
                <span className="detail-label">Address</span>
                <span className="detail-value">{
                  taxpayer?.address ? 
                  `${taxpayer?.address?.street || ''}, ${taxpayer?.address?.city || ''}, ${taxpayer?.address?.lga || ''}, ${taxpayer?.address?.state || ''}` : 
                  'No address available'
                }</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3><FiUser /> Contact Person</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Name</span>
                <span className="detail-value">{taxpayer?.contactPerson?.name || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Position</span>
                <span className="detail-value">{taxpayer?.contactPerson?.position || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email</span>
                <span className="detail-value">{taxpayer?.contactPerson?.email || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone</span>
                <span className="detail-value">{taxpayer?.contactPerson?.phone || 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3><FiUsers /> Directors & Ownership</h3>
            {(taxpayer?.directors && taxpayer.directors.length > 0) ? (
              <table className="directors-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Ownership</th>
                  </tr>
                </thead>
                <tbody>
                  {taxpayer.directors.map((director, index) => (
                    <tr key={index}>
                      <td>{director?.name || 'N/A'}</td>
                      <td>{director?.position || 'N/A'}</td>
                      <td>{director?.ownership || 'N/A'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="no-data-message">No director information available</p>
            )}
          </div>
        </>
      );
    }
  };

  const renderAssessments = () => {
    console.log('Rendering assessments:', assessments);
    return (
      <div className="detail-section">
        <h3><FiClipboard /> Tax Assessments</h3>
        {assessments && assessments.length > 0 ? (
          <table className="data-table assessments-table">
            <thead>
              <tr>
                <th>Assessment #</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {assessments.map(assessment => (
                <tr key={assessment?.id}>
                  <td>{assessment?.assessmentNumber || 'N/A'}</td>
                  <td>{assessment?.type || 'N/A'}</td>
                  <td>{assessment?.amount || 'N/A'}</td>
                  <td>
                    <span className={`status-badge status-${assessment?.status?.toLowerCase() || 'unknown'}`}>
                      {assessment?.status || 'Unknown'}
                    </span>
                  </td>
                  <td>{formatDateTime(assessment?.date)}</td>
                  <td><button className="action-button" onClick={() => handleViewAssessment(assessment)}>View Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data-message">No assessments available for this taxpayer</p>
        )}
      </div>
    );
  };

  const renderBills = () => {
    console.log('Rendering bills:', bills);
    return (
      <div className="detail-section">
        <h3><FiDollarSign /> Tax Bills</h3>
        {bills && bills.length > 0 ? (
          <table className="data-table bills-table">
            <thead>
              <tr>
                <th>Bill #</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bills.map(bill => (
                <tr key={bill?.id}>
                  <td>{bill?.billNumber || 'N/A'}</td>
                  <td>{bill?.description || 'N/A'}</td>
                  <td>{bill?.amount || 'N/A'}</td>
                  <td>{formatDate(bill?.dueDate)}</td>
                  <td>{bill?.paymentDate ? formatDate(bill.paymentDate) : 'Not paid'}</td>
                  <td>
                    <span className={`status-badge status-${bill?.status?.toLowerCase() || 'unknown'}`}>
                      {bill?.status || 'Unknown'}
                    </span>
                  </td>
                  <td><button className="action-button" onClick={() => handleViewBill(bill)}>View Bill</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data-message">No bills available for this taxpayer</p>
        )}
      </div>
    );
  };

  const renderReturns = () => {
    console.log('Rendering tax returns:', taxReturns);
    return (
      <div className="detail-section">
        <h3><FiFileText /> Tax Returns</h3>
        {taxReturns && taxReturns.length > 0 ? (
          <table className="data-table returns-table">
            <thead>
              <tr>
                <th>Return #</th>
                <th>Year</th>
                <th>Type</th>
                <th>Submission Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {taxReturns.map(taxReturn => (
                <tr key={taxReturn?.id}>
                  <td>{taxReturn?.returnNumber || 'N/A'}</td>
                  <td>{taxReturn?.year || 'N/A'}</td>
                  <td>{taxReturn?.type || 'N/A'}</td>
                  <td>{formatDateTime(taxReturn?.submissionDate)}</td>
                  <td>
                    <span className={`status-badge status-${taxReturn?.status?.toLowerCase() || 'unknown'}`}>
                      {taxReturn?.status || 'Unknown'}
                    </span>
                  </td>
                  <td><button className="action-button" onClick={() => handleViewReturn(taxReturn)}>View Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data-message">No tax returns available for this taxpayer</p>
        )}
      </div>
    );
  };

  const renderTCC = () => {
    console.log('Rendering TCC history:', tccHistory);
    return (
      <div className="detail-section">
        <h3><FiFileText /> Tax Clearance Certificate History</h3>
        {tccHistory && tccHistory.length > 0 ? (
          <table className="data-table tcc-table">
            <thead>
              <tr>
                <th>TCC #</th>
                <th>Issue Date</th>
                <th>Expiry Date</th>
                <th>Purpose</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tccHistory.map(tcc => (
                <tr key={tcc?.id}>
                  <td>{tcc?.tccNumber || 'N/A'}</td>
                  <td>{formatDate(tcc?.issueDate)}</td>
                  <td>{formatDate(tcc?.expiryDate)}</td>
                  <td>{tcc?.purpose || 'N/A'}</td>
                  <td>
                    <span className={`status-badge status-${tcc?.status?.toLowerCase() || 'unknown'}`}>
                      {tcc?.status || 'Unknown'}
                    </span>
                  </td>
                  <td><button className="action-button" onClick={() => handleViewTCC(tcc)}>View Details</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data-message">No TCC history available for this taxpayer</p>
        )}
      </div>
    );
  };

  const renderTaxHistory = () => {
    console.log('Rendering tax history:', taxHistory);
    return (
      <div className="detail-section">
        <h3><FiActivity /> Tax Payment History</h3>
        {taxHistory && taxHistory.length > 0 ? (
          <table className="data-table history-table">
            <thead>
              <tr>
                <th>Year</th>
                <th>Type</th>
                <th>Amount Paid</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {taxHistory.map(history => (
                <tr key={history?.id}>
                  <td>{history?.year || 'N/A'}</td>
                  <td>{history?.type || 'N/A'}</td>
                  <td>{history?.paidAmount || 'N/A'}</td>
                  <td>{formatDateTime(history?.date)}</td>
                  <td>
                    <span className={`status-badge status-${history?.status?.toLowerCase() || 'unknown'}`}>
                      {history?.status || 'Unknown'}
                    </span>
                  </td>
                  <td><button className="action-button" onClick={() => handleViewReceipt(history)}>View Receipt</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-data-message">No tax payment history available for this taxpayer</p>
        )}
      </div>
    );
  };

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'details':
        return renderTaxpayerDetails();
      case 'assessments':
        return renderAssessments();
      case 'bills':
        return renderBills();
      case 'returns':
        return renderReturns();
      case 'tcc':
        return renderTCC();
      case 'history':
        return renderTaxHistory();
      default:
        return renderTaxpayerDetails();
    }
  };

  const TabIcon = ({ tabName }) => {
    try {
      switch (tabName) {
        case 'details':
          return <FiUser />;
        case 'assessments':
          return <FiClipboard />;
        case 'bills':
          return <FiDollarSign />;
        case 'returns':
          return <FiFileText />;
        case 'tcc':
          return <FiCheck />;
        case 'history':
          return <FiActivity />;
        default:
          return null;
      }
    } catch (error) {
      console.error("Error rendering tab icon:", error);
      return null;
    }
  };

  return (
    <div className="taxpayer-details-container">
      <div className="page-header">
        <div className="back-button-wrapper">
          <button className="back-button" onClick={handleBack}>
            <FiArrowLeft /> Back to {type === 'individual' ? 'Individuals' : 'Businesses'}
          </button>
        </div>
        <h1>
          {type === 'individual' ? <FiUser className="page-header-icon" /> : <FiBriefcase className="page-header-icon" />}
          {type === 'individual' ? 'Individual' : 'Business'} Taxpayer Details
        </h1>
        <button className="update-button" onClick={handleUpdateInfo}>
          <FiEdit className="update-icon" /> Update Information
        </button>
      </div>

      {loading ? (
        <div className="loading-section">
          <div className="spinner"></div>
          <p>Loading taxpayer details...</p>
        </div>
      ) : !taxpayer ? (
        <div className="error-section">
          <p>Taxpayer not found. This taxpayer may have been removed or you don't have access.</p>
          <button className="back-button" onClick={handleBack}>Go back</button>
        </div>
      ) : (
        <>
          <div className="taxpayer-summary">
            <div className="taxpayer-profile">
              <div className={`taxpayer-avatar ${type === 'individual' ? 'individual' : 'business'}`}>
                {type === 'individual' 
                  ? (taxpayer?.firstName?.charAt(0) || '') + (taxpayer?.lastName?.charAt(0) || '') 
                  : taxpayer?.businessName?.charAt(0) || ''}
              </div>
              <div className="taxpayer-info">
                <h2>
                  {type === 'individual' 
                    ? `${taxpayer?.firstName || ''} ${taxpayer?.middleName ? taxpayer?.middleName + ' ' : ''}${taxpayer?.lastName || ''}` 
                    : taxpayer?.businessName || 'Unknown Business'}
                </h2>
                <div className="taxpayer-meta">
                  <span className="taxpayer-tin"><FiHash /> TIN: {taxpayer?.tin || 'N/A'}</span>
                  <span className="registration-date"><FiCalendar /> Registered: {formatDate(taxpayer?.registrationDate)}</span>
                  <span className={`taxpayer-status status-${taxpayer?.status || 'unknown'}`}>
                    {taxpayer?.status === 'active' ? <FiCheckCircle /> : <FiClock />}
                    {taxpayer?.status ? taxpayer.status.charAt(0).toUpperCase() + taxpayer.status.slice(1) : 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="details-tabs">
            <button 
              className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              <TabIcon tabName="details" /> Details
            </button>
            <button 
              className={`tab-button ${activeTab === 'assessments' ? 'active' : ''}`}
              onClick={() => setActiveTab('assessments')}
            >
              <TabIcon tabName="assessments" /> Assessments
            </button>
            <button 
              className={`tab-button ${activeTab === 'bills' ? 'active' : ''}`}
              onClick={() => setActiveTab('bills')}
            >
              <TabIcon tabName="bills" /> Bills
            </button>
            <button 
              className={`tab-button ${activeTab === 'returns' ? 'active' : ''}`}
              onClick={() => setActiveTab('returns')}
            >
              <TabIcon tabName="returns" /> Tax Returns
            </button>
            <button 
              className={`tab-button ${activeTab === 'tcc' ? 'active' : ''}`}
              onClick={() => setActiveTab('tcc')}
            >
              <TabIcon tabName="tcc" /> TCC
            </button>
            <button 
              className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <TabIcon tabName="history" /> Tax History
            </button>
          </div>

          <div className="tab-content">
            {renderActiveTabContent()}
          </div>
        </>
      )}
    </div>
  );
};

export default TaxpayerDetails; 