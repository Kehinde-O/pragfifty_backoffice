import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiCheckCircle, 
  FiDownload, 
  FiClock, 
  FiFile, 
  FiDollarSign, 
  FiCalendar, 
  FiUser, 
  FiFileText,
  FiInfo,
  FiActivity,
  FiFolder,
  FiEye,
  FiPrinter,
  FiMail,
  FiAlertTriangle,
  FiTag,
  FiCheck,
  FiX,
  FiChevronRight
} from 'react-icons/fi';
import './TCC.css';

function TCCApplicationDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tccApplication, setTCCApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('details');

  // Mock data - replace with API call in production
  useEffect(() => {
    const fetchTCCDetails = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockTCC = {
          id: id,
          applicationNumber: `TCC-2023-00${id}`,
          applicationDate: '2023-05-15',
          taxpayerName: 'John Doe',
          tin: 'TIN12345678',
          year: '2023',
          status: 'APPROVED',
          tccNumber: 'TCCREG-2023-001',
          issueDate: '2023-05-20',
          expiryDate: '2024-05-19',
          sourceOfIncome: 'EMPLOYMENT',
          platformPayment: 'Y',
          comment: 'All tax obligations have been met. TCC approved.',
          incomeDetails: [
            {
              year: '2022',
              annualIncome: 5000000,
              assessmentTaxReceiptNo: 'RCP-2022-12345',
              assessmentTaxAmount: 250000,
              assessmentTaxReceiptDate: '2022-12-15',
              outstandingTax: 0,
              devLevyReceiptNo: 'DL-2022-54321',
              devLevyAmount: 5000,
              devLevyReceiptDate: '2022-12-10',
              landUseChargeReceiptNo: 'LUC-2022-98765',
              landUseChargeAmount: 35000,
              landUseChargeReceiptDate: '2022-11-25',
              previousTccNo: null,
              previousTccIssueDate: null
            },
            {
              year: '2021',
              annualIncome: 4500000,
              assessmentTaxReceiptNo: 'RCP-2021-67890',
              assessmentTaxAmount: 225000,
              assessmentTaxReceiptDate: '2021-12-18',
              outstandingTax: 0,
              devLevyReceiptNo: 'DL-2021-09876',
              devLevyAmount: 5000,
              devLevyReceiptDate: '2021-12-05',
              landUseChargeReceiptNo: 'LUC-2021-54321',
              landUseChargeAmount: 32000,
              landUseChargeReceiptDate: '2021-11-20',
              previousTccNo: null,
              previousTccIssueDate: null
            },
            {
              year: '2020',
              annualIncome: 4200000,
              assessmentTaxReceiptNo: 'RCP-2020-13579',
              assessmentTaxAmount: 210000,
              assessmentTaxReceiptDate: '2020-12-10',
              outstandingTax: 0,
              devLevyReceiptNo: 'DL-2020-97531',
              devLevyAmount: 5000,
              devLevyReceiptDate: '2020-12-02',
              landUseChargeReceiptNo: 'LUC-2020-24680',
              landUseChargeAmount: 28000,
              landUseChargeReceiptDate: '2020-11-15',
              previousTccNo: null,
              previousTccIssueDate: null
            }
          ],
          documents: [
            {
              id: '1',
              documentType: 'EVIDENCE',
              fileName: 'tax_payment_receipt.pdf',
              fileType: 'application/pdf',
              fileSize: 1258000,
              uploadDate: '2023-05-12'
            },
            {
              id: '2',
              documentType: 'BANK',
              fileName: 'bank_statement.pdf',
              fileType: 'application/pdf',
              fileSize: 3452000,
              uploadDate: '2023-05-12'
            },
            {
              id: '3',
              documentType: 'REGISTRATION',
              fileName: 'id_card.jpg',
              fileType: 'image/jpeg',
              fileSize: 845000,
              uploadDate: '2023-05-11'
            }
          ],
          timeline: [
            {
              action: 'TCC Application Created',
              date: '2023-05-11T09:23:15',
              actor: 'John Doe',
              actorRole: 'Taxpayer'
            },
            {
              action: 'TCC Application Submitted',
              date: '2023-05-12T14:05:32',
              actor: 'John Doe',
              actorRole: 'Taxpayer'
            },
            {
              action: 'TCC Application Under Review',
              date: '2023-05-15T10:15:20',
              actor: 'Sarah Johnson',
              actorRole: 'Tax Officer'
            },
            {
              action: 'TCC Approved',
              date: '2023-05-20T11:30:45',
              actor: 'James Wilson',
              actorRole: 'Tax Manager'
            }
          ]
        };
        
        setTCCApplication(mockTCC);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching TCC details:', error);
        setLoading(false);
      }
    };

    fetchTCCDetails();
  }, [id]);

  // Handle back button
  const handleBack = () => {
    navigate('/dashboard/tcc-application');
  };

  // Handle process TCC
  const handleProcessTCC = () => {
    navigate(`/dashboard/tcc-application/${id}/process`);
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN'
    }).format(amount);
  };

  // Format datetime for timeline
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return 'N/A';
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Get source of income label
  const getSourceOfIncomeLabel = (source) => {
    switch (source) {
      case 'TRADE':
        return 'Trade/Business';
      case 'PROFESSION':
        return 'Professional Practice';
      case 'VOCATION':
        return 'Vocation';
      case 'EMPLOYMENT':
        return 'Employment';
      case 'RENT':
        return 'Rental Income';
      case 'DIVIDEND':
        return 'Dividend/Interest';
      default:
        return 'Other';
    }
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let statusClass = "";
    let icon = null;
    let label = "";

    switch (status) {
      case 'APPROVED':
        statusClass = "status-approved";
        icon = <FiCheck />;
        label = "Approved";
        break;
      case 'REJECTED':
        statusClass = "status-rejected";
        icon = <FiX />;
        label = "Rejected";
        break;
      case 'UNDER_REVIEW':
        statusClass = "status-review";
        icon = <FiClock />;
        label = "Under Review";
        break;
      case 'SUBMITTED':
        statusClass = "status-submitted";
        icon = <FiFileText />;
        label = "Submitted";
        break;
      default:
        statusClass = "status-draft";
        icon = <FiFile />;
        label = "Draft";
    }

    return (
      <div className={`status-badge ${statusClass}`}>
        {icon} {label}
      </div>
    );
  };

  // Render action buttons
  const renderActionButtons = () => {
    if (!tccApplication) return null;
    
    return (
      <div className="details-action-buttons">
        {tccApplication.status !== 'APPROVED' && tccApplication.status !== 'REJECTED' && (
          <button className="process-button" onClick={handleProcessTCC}>
            <FiCheckCircle />
            Process Application
          </button>
        )}
        
        {tccApplication.status === 'APPROVED' && (
          <div className="action-button-group">
            <button className="primary-button">
              <FiDownload />
              Download TCC
            </button>
            <button className="secondary-button">
              <FiPrinter />
              Print
            </button>
            <button className="secondary-button">
              <FiMail />
              Email to Taxpayer
            </button>
          </div>
        )}
        
        {tccApplication.status === 'REJECTED' && (
          <div className="rejection-notice">
            <FiAlertTriangle />
            <span>This application was rejected. View comments for details.</span>
          </div>
        )}
      </div>
    );
  };

  // Render details tab
  const renderDetailsTab = () => {
    return (
      <div className="details-tab-content">
        <div className="status-card">
          <div className="status-info">
            <div className="status-badge-wrapper">
              <StatusBadge status={tccApplication.status} />
            </div>
            <div className="reference-info">
              <div className="info-item">
                <span className="info-label"><FiTag /> Reference:</span>
                <span className="info-value">{tccApplication.applicationNumber}</span>
              </div>
              {tccApplication.status === 'APPROVED' && (
                <div className="info-item">
                  <span className="info-label"><FiFileText /> TCC Number:</span>
                  <span className="info-value">{tccApplication.tccNumber}</span>
                </div>
              )}
            </div>
          </div>
          {renderActionButtons()}
        </div>
        
        <div className="details-grid-container">
          <div className="details-card">
            <div className="card-header">
              <div className="header-icon">
                <FiUser />
              </div>
              <h3>Taxpayer Information</h3>
            </div>
            <div className="card-content">
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Taxpayer Name</span>
                  <span className="detail-value">{tccApplication.taxpayerName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">TIN</span>
                  <span className="detail-value">{tccApplication.tin}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Source of Income</span>
                  <span className="detail-value">{getSourceOfIncomeLabel(tccApplication.sourceOfIncome)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Tax Year</span>
                  <span className="detail-value">{tccApplication.year}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Platform Payment</span>
                  <span className="detail-value">{tccApplication.platformPayment === 'Y' ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="details-card">
            <div className="card-header">
              <div className="header-icon">
                <FiFileText />
              </div>
              <h3>TCC Information</h3>
            </div>
            <div className="card-content">
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Application Date</span>
                  <span className="detail-value">{formatDate(tccApplication.applicationDate)}</span>
                </div>
                {tccApplication.status === 'APPROVED' && (
                  <>
                    <div className="detail-item">
                      <span className="detail-label">Issue Date</span>
                      <span className="detail-value">{formatDate(tccApplication.issueDate)}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Expiry Date</span>
                      <span className="detail-value">{formatDate(tccApplication.expiryDate)}</span>
                    </div>
                  </>
                )}
              </div>
              
              {tccApplication.comment && (
                <div className="comment-section">
                  <div className="comment-header">
                    <FiInfo />
                    <h4>Official Comments</h4>
                  </div>
                  <p>{tccApplication.comment}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render income tab
  const renderIncomeTab = () => {
    return (
      <div className="income-tab-content">
        <div className="details-card">
          <div className="card-header">
            <div className="header-icon">
              <FiDollarSign />
            </div>
            <h3>Income & Tax Details</h3>
          </div>
          <div className="card-content">
            <div className="responsive-table-container">
              <table className="income-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Annual Income</th>
                    <th>Assessment Tax</th>
                    <th>Dev. Levy</th>
                    <th>Land Use Charge</th>
                    <th>Outstanding</th>
                  </tr>
                </thead>
                <tbody>
                  {tccApplication.incomeDetails.map((income, index) => (
                    <tr key={index}>
                      <td>{income.year}</td>
                      <td>{formatCurrency(income.annualIncome)}</td>
                      <td>{formatCurrency(income.assessmentTaxAmount)}</td>
                      <td>{formatCurrency(income.devLevyAmount)}</td>
                      <td>{formatCurrency(income.landUseChargeAmount)}</td>
                      <td>
                        <span className={income.outstandingTax > 0 ? 'highlight-outstanding' : ''}>
                          {formatCurrency(income.outstandingTax)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="income-summary">
              <h4>Income Summary</h4>
              <div className="summary-stats">
                <div className="stat-item">
                  <span className="stat-label">Total Income</span>
                  <span className="stat-value">{
                    formatCurrency(tccApplication.incomeDetails.reduce((sum, income) => sum + income.annualIncome, 0))
                  }</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Total Tax</span>
                  <span className="stat-value">{
                    formatCurrency(tccApplication.incomeDetails.reduce((sum, income) => 
                      sum + income.assessmentTaxAmount + income.devLevyAmount + income.landUseChargeAmount, 0))
                  }</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Outstanding</span>
                  <span className="stat-value highlight-outstanding">{
                    formatCurrency(tccApplication.incomeDetails.reduce((sum, income) => sum + income.outstandingTax, 0))
                  }</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render documents tab
  const renderDocumentsTab = () => {
    return (
      <div className="documents-tab-content">
        <div className="details-card">
          <div className="card-header">
            <div className="header-icon">
              <FiFolder />
            </div>
            <h3>Submitted Documents</h3>
          </div>
          <div className="card-content">
            <div className="documents-grid">
              {tccApplication.documents.map((doc, index) => (
                                  <div className="document-card" key={index}>
                   <div className="document-icon">
                     {doc.type === 'pdf' ? <FiFile /> : <FiFile />}
                   </div>
                   <div className="document-info">
                     <h4>{doc.fileName}</h4>
                     <span className="document-type">{doc.type.toUpperCase()}</span>
                     <div className="document-meta">
                       <span>{formatFileSize(doc.fileSize)}</span>
                       <span>{formatDate(doc.uploadDate)}</span>
                     </div>
                   </div>
                  <div className="document-actions">
                    <button className="icon-button view">
                      <FiEye />
                    </button>
                    <button className="icon-button">
                      <FiDownload />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Render timeline tab
  const renderTimelineTab = () => {
    return (
      <div className="timeline-tab-content">
        <div className="details-card">
          <div className="card-header">
            <div className="header-icon">
              <FiActivity />
            </div>
            <h3>Application Timeline</h3>
          </div>
          <div className="card-content">
            <div className="timeline">
              {tccApplication.timeline.map((item, index) => (
                <div className="timeline-item" key={index}>
                  <div className="timeline-marker"></div>
                  <div className="timeline-content">
                    <h4>{item.action}</h4>
                    <div className="timeline-details">
                      <p>
                        <span className="timeline-date">{formatDateTime(item.date)}</span> • 
                        <span className="timeline-actor">{item.actor}</span> • 
                        <span className="timeline-role">{item.actorRole}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <div className="content-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading TCC Application Details...</p>
        </div>
      </div>
    );
  }

  // Handle case where TCC application not found
  if (!tccApplication) {
    return (
      <div className="content-container">
        <div className="error-container">
          <FiAlertTriangle className="error-icon" />
          <h2>TCC Application Not Found</h2>
          <p>We couldn't find the TCC application you're looking for.</p>
          <button className="primary-button" onClick={handleBack}>
            <FiArrowLeft /> Back to TCC Applications
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="tcc-application-details-container">
      <div className="details-header">
        <button className="back-button" onClick={handleBack}>
          <FiArrowLeft />
          <span>Back to TCC Applications</span>
        </button>
        
        <div className="page-title">
          <h1>TCC Application Details</h1>
          <div className="breadcrumb">
            <span>TCC</span> 
            <FiChevronRight /> 
            <span>Applications</span> 
            <FiChevronRight /> 
            <span className="current">{tccApplication.applicationNumber}</span>
          </div>
        </div>
        
        <div className="application-meta">
          <div className="meta-item">
            <FiCalendar className="meta-icon" />
            <span>Applied: {formatDate(tccApplication.applicationDate)}</span>
          </div>
          <div className="meta-item">
            <FiUser className="meta-icon" />
            <span>{tccApplication.taxpayerName}</span>
          </div>
        </div>
      </div>
      
      <div className="tabs-container">
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
          >
            <FiInfo />
            <span>Details</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'income' ? 'active' : ''}`}
            onClick={() => setActiveTab('income')}
          >
            <FiDollarSign />
            <span>Income Information</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            <FiFolder />
            <span>Documents</span>
          </button>
          <button 
            className={`tab-button ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            <FiActivity />
            <span>Timeline</span>
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'details' && renderDetailsTab()}
          {activeTab === 'income' && renderIncomeTab()}
          {activeTab === 'documents' && renderDocumentsTab()}
          {activeTab === 'timeline' && renderTimelineTab()}
        </div>
      </div>
    </div>
  );
}

export default TCCApplicationDetails; 