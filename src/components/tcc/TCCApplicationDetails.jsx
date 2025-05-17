import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, StatsCard, Button } from '../common/ui';
import { 
  FaUser, 
  FaIdCard, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaFileAlt, 
  FaCheckCircle, 
  FaTimesCircle,
  FaHistory,
  FaArrowLeft,
  FaPrint,
  FaDownload,
  FaEdit,
  FaClock,
  FaExclamationTriangle,
  FaInfoCircle,
  FaFileInvoice,
  FaClipboardList,
  FaRegFileAlt,
  FaRegCalendarAlt,
  FaRegCreditCard,
  FaRegBuilding,
  FaShieldAlt,
  FaReceipt,
  FaEye,
  FaChevronRight,
  FaTags,
  FaHome,
  FaFilePdf
} from 'react-icons/fa';
import './TCC.css';

const TCCApplicationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    fetchApplicationDetails();
  }, [id]);

  // Mock data fetch
  const fetchApplicationDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock data for a single TCC application
      const mockData = {
        id: id,
        applicationNumber: 'TCC-2023-001',
        applicationDate: '2023-05-15',
        taxpayerName: 'John Doe',
        tin: 'TIN12345678',
        email: 'john.doe@example.com',
        phone: '+234 801 234 5678',
        year: '2023',
        status: 'APPROVED',
        tccNumber: 'TCCREG-2023-001',
        issueDate: '2023-05-20',
        expiryDate: '2024-05-19',
        sourceOfIncome: 'EMPLOYMENT',
        platformPayment: 'Y',
        comment: 'Application approved after verification of all documents and tax payments.',
        incomeDetails: [
          {
            year: '2022',
            annualIncome: 5000000,
            taxAmount: 425000,
            taxReceiptNo: 'PAYE-2022-1234',
            taxReceiptDate: '2022-12-15',
            outstandingTax: 0
          },
          {
            year: '2021',
            annualIncome: 4500000,
            taxAmount: 375000,
            taxReceiptNo: 'PAYE-2021-5678',
            taxReceiptDate: '2021-12-10',
            outstandingTax: 0
          },
          {
            year: '2020',
            annualIncome: 4000000,
            taxAmount: 325000,
            taxReceiptNo: 'PAYE-2020-9012',
            taxReceiptDate: '2020-12-18',
            outstandingTax: 0
          }
        ],
        documents: [
          {
            id: '1',
            name: 'Tax Payment Receipt 2022',
            type: 'PAYMENT',
            fileType: 'PDF',
            uploadDate: '2023-05-10'
          },
          {
            id: '2',
            name: 'Tax Payment Receipt 2021',
            type: 'PAYMENT',
            fileType: 'PDF',
            uploadDate: '2023-05-10'
          },
          {
            id: '3',
            name: 'Tax Payment Receipt 2020',
            type: 'PAYMENT',
            fileType: 'PDF',
            uploadDate: '2023-05-10'
          },
          {
            id: '4',
            name: 'Passport Photograph',
            type: 'IDENTITY',
            fileType: 'JPEG',
            uploadDate: '2023-05-10'
          }
        ],
        timeline: [
          {
            date: '2023-05-20',
            status: 'APPROVED',
            comment: 'Application approved and TCC issued',
            actor: 'Fatima Ibrahim (Tax Officer)'
          },
          {
            date: '2023-05-18',
            status: 'UNDER_REVIEW',
            comment: 'Document verification completed',
            actor: 'Fatima Ibrahim (Tax Officer)'
          },
          {
            date: '2023-05-16',
            status: 'UNDER_REVIEW',
            comment: 'Application assigned for review',
            actor: 'System'
          },
          {
            date: '2023-05-15',
            status: 'SUBMITTED',
            comment: 'Application submitted',
            actor: 'John Doe (Taxpayer)'
          }
        ]
      };
      
      setApplication(mockData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching TCC application details:', error);
      setError('Failed to load application details. Please try again.');
      setLoading(false);
    }
  };

  // Navigate back to list
  const handleBackToList = () => {
    navigate('/dashboard/tcc-application');
  };

  // Navigate to process page
  const handleProcess = () => {
    navigate(`/dashboard/tcc-application/${id}/process`);
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-NG', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Get source of income label
  const getSourceOfIncomeLabel = (sourceCode) => {
    const sources = {
      'EMPLOYMENT': 'Employment',
      'TRADE': 'Trade/Business',
      'PROFESSION': 'Professional Practice',
      'VOCATION': 'Vocation',
      'INVESTMENT': 'Investment'
    };
    
    return sources[sourceCode] || sourceCode;
  };

  // Status badge component
  const StatusBadge = ({ status }) => {
    let badgeClass = 'status-badge ';
    
    switch (status) {
      case 'APPROVED':
        badgeClass += 'badge-approved';
        break;
      case 'REJECTED':
        badgeClass += 'badge-rejected';
        break;
      case 'UNDER_REVIEW':
        badgeClass += 'badge-pending';
        break;
      case 'SUBMITTED':
        badgeClass += 'badge-info';
        break;
      default:
        badgeClass += 'badge-default';
    }
    
    // Format status for display
    const formattedStatus = status.replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return <span className={badgeClass}>{formattedStatus}</span>;
  };

  // Render loading skeleton
  const renderSkeleton = () => (
    <div className="tcc-application-container">
      <div className="page-header skeleton">
        <div className="page-title-section skeleton">
          <div className="skeleton-button"></div>
          <div>
            <div className="skeleton-title"></div>
            <div className="skeleton-subtitle"></div>
          </div>
        </div>
      </div>
      
      <div className="status-info-bar skeleton">
        <div className="skeleton-status-item"></div>
        <div className="skeleton-status-item"></div>
        <div className="skeleton-status-item"></div>
      </div>
      
      <div className="detail-tabs skeleton">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-tab"></div>
        ))}
      </div>
      
      <Card>
        <div className="skeleton-card-title"></div>
        <div className="detail-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="detail-item skeleton">
              <div className="skeleton-label"></div>
              <div className="skeleton-value"></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  if (loading) {
    return renderSkeleton();
  }

  if (error) {
    return (
      <div className="tcc-application-container">
        <div className="error-state">
          <FaExclamationTriangle className="error-icon" />
          <h2>Error Loading Application</h2>
          <p>{error}</p>
          <div className="error-actions">
            <Button variant="outline" onClick={fetchApplicationDetails}>
              Retry
            </Button>
            <Button variant="primary" onClick={handleBackToList}>
              Back to Applications
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="tcc-application-container">
        <div className="error-state">
          <FaTimesCircle className="error-icon" />
          <h2>Application Not Found</h2>
          <p>The requested TCC application could not be found.</p>
          <Button variant="primary" onClick={handleBackToList}>
            Back to Applications
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="tcc-application-container">
      {/* Enhanced page header with improved breadcrumbs */}
      <div className="tcc-details-header">
        <div className="tcc-header-left">
          <button 
            className="tcc-back-button" 
            onClick={handleBackToList}
            aria-label="Back to applications list"
          >
            <FaArrowLeft />
          </button>
          <div className="tcc-breadcrumb">
            <span className="breadcrumb-item"><FaHome /> Dashboard</span>
            <FaChevronRight className="breadcrumb-separator" />
            <span className="breadcrumb-item">TCC Applications</span>
            <FaChevronRight className="breadcrumb-separator" />
            <span className="breadcrumb-item current">{application.applicationNumber}</span>
          </div>
        </div>
        
        <div className="tcc-action-buttons">
          {application.status === 'APPROVED' && (
            <>
              <Button 
                variant="outline" 
                size="md" 
                leadingIcon={<FaPrint />}
                title="Print Tax Clearance Certificate"
              >
                Print TCC
              </Button>
              <Button 
                variant="outline" 
                size="md" 
                leadingIcon={<FaDownload />}
                title="Download Tax Clearance Certificate"
              >
                Download
              </Button>
            </>
          )}
          
          {(application.status === 'SUBMITTED' || application.status === 'UNDER_REVIEW') && (
            <Button 
              variant="primary" 
              size="md" 
              onClick={handleProcess}
              leadingIcon={<FaEdit />}
              title="Process this application"
            >
              Process Application
            </Button>
          )}
        </div>
      </div>

      {/* Enhanced title section with application metadata */}
      <div className="tcc-page-title-section">
        <h1 className="tcc-title">
          TCC Application Details
        </h1>
        <div className="tcc-application-meta">
          <div className="tcc-meta-item">
            <FaTags className="tcc-meta-icon" />
            <span className="tcc-meta-label">Reference:</span>
            <span className="tcc-meta-value">{application.applicationNumber}</span>
          </div>
          {application.status === 'APPROVED' && (
            <div className="tcc-meta-item">
              <FaFilePdf className="tcc-meta-icon" />
              <span className="tcc-meta-label">TCC Number:</span>
              <span className="tcc-meta-value">{application.tccNumber}</span>
            </div>
          )}
          <div className="tcc-meta-item">
            <FaCalendarAlt className="tcc-meta-icon" />
            <span className="tcc-meta-label">Submitted:</span>
            <span className="tcc-meta-value">{formatDate(application.applicationDate)}</span>
          </div>
          <div className="tcc-meta-item">
            <FaUser className="tcc-meta-icon" />
            <span className="tcc-meta-value">{application.taxpayerName}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Status Summary Cards - inspired by dashboard stats */}
      <div className="tcc-status-summary">
        <div className={`tcc-status-card ${application.status === 'APPROVED' ? 'success' : 
                                         application.status === 'REJECTED' ? 'danger' : 
                                         application.status === 'UNDER_REVIEW' ? 'warning' : 'primary'}`}>
          <div className="tcc-status-icon">
            {application.status === 'APPROVED' && <FaCheckCircle />}
            {application.status === 'REJECTED' && <FaTimesCircle />}
            {application.status === 'UNDER_REVIEW' && <FaClock />}
            {application.status === 'SUBMITTED' && <FaRegFileAlt />}
          </div>
          <div className="tcc-status-info">
            <div className="tcc-status-label">Status</div>
            <div className="tcc-status-value">
              <StatusBadge status={application.status} />
            </div>
          </div>
        </div>
        
        <div className="tcc-status-card primary">
          <div className="tcc-status-icon">
            <FaRegCalendarAlt />
          </div>
          <div className="tcc-status-info">
            <div className="tcc-status-label">Application Date</div>
            <div className="tcc-status-value">{formatDate(application.applicationDate)}</div>
          </div>
        </div>
        
        {application.status === 'APPROVED' && (
          <>
            <div className="tcc-status-card success">
              <div className="tcc-status-icon">
                <FaShieldAlt />
              </div>
              <div className="tcc-status-info">
                <div className="tcc-status-label">Issue Date</div>
                <div className="tcc-status-value">{formatDate(application.issueDate)}</div>
              </div>
            </div>
            
            <div className="tcc-status-card warning">
              <div className="tcc-status-icon">
                <FaRegCalendarAlt />
              </div>
              <div className="tcc-status-info">
                <div className="tcc-status-label">Expires On</div>
                <div className="tcc-status-value">{formatDate(application.expiryDate)}</div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tab Navigation - enhanced with better styling */}
      <div className="tcc-tabs">
        <div 
          className={`tcc-tab ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
          role="tab"
          aria-selected={activeTab === 'details'}
          aria-controls="tab-panel-details"
          id="tab-details"
        >
          <FaIdCard className="tcc-tab-icon" /> Application Details
        </div>
        <div 
          className={`tcc-tab ${activeTab === 'income' ? 'active' : ''}`}
          onClick={() => setActiveTab('income')}
          role="tab"
          aria-selected={activeTab === 'income'}
          aria-controls="tab-panel-income"
          id="tab-income"
        >
          <FaMoneyBillWave className="tcc-tab-icon" /> Income & Tax Details
        </div>
        <div 
          className={`tcc-tab ${activeTab === 'documents' ? 'active' : ''}`}
          onClick={() => setActiveTab('documents')}
          role="tab"
          aria-selected={activeTab === 'documents'}
          aria-controls="tab-panel-documents"
          id="tab-documents"
        >
          <FaFileAlt className="tcc-tab-icon" /> Documents
        </div>
        <div 
          className={`tcc-tab ${activeTab === 'timeline' ? 'active' : ''}`}
          onClick={() => setActiveTab('timeline')}
          role="tab"
          aria-selected={activeTab === 'timeline'}
          aria-controls="tab-panel-timeline"
          id="tab-timeline"
        >
          <FaHistory className="tcc-tab-icon" /> Timeline
        </div>
      </div>

      {/* Content based on active tab */}
      <div 
        id="tab-panel-details" 
        role="tabpanel"
        aria-labelledby="tab-details"
        hidden={activeTab !== 'details'}
      >
        {activeTab === 'details' && (
          <div className="tcc-tab-content">
            <div className="tcc-info-card">
              <div className="tcc-card-header">
                <h3 className="tcc-card-title">
                  <FaUser className="tcc-card-icon" /> Taxpayer Information
                </h3>
              </div>
              <div className="tcc-card-body">
                <div className="tcc-detail-grid">
                  <div className="tcc-detail-row">
                    <div className="tcc-detail-col">
                      <div className="tcc-form-group">
                        <label className="tcc-form-label">FULL NAME</label>
                        <div className="tcc-form-value">{application.taxpayerName}</div>
                      </div>
                    </div>
                    
                    <div className="tcc-detail-col">
                      <div className="tcc-form-group">
                        <label className="tcc-form-label">TIN</label>
                        <div className="tcc-form-value">{application.tin}</div>
                      </div>
                    </div>
                    
                    <div className="tcc-detail-col">
                      <div className="tcc-form-group">
                        <label className="tcc-form-label">EMAIL</label>
                        <div className="tcc-form-value">{application.email}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="tcc-detail-row">
                    <div className="tcc-detail-col">
                      <div className="tcc-form-group">
                        <label className="tcc-form-label">PHONE</label>
                        <div className="tcc-form-value">{application.phone}</div>
                      </div>
                    </div>
                    
                    <div className="tcc-detail-col">
                      <div className="tcc-form-group">
                        <label className="tcc-form-label">SOURCE OF INCOME</label>
                        <div className="tcc-form-value">{getSourceOfIncomeLabel(application.sourceOfIncome)}</div>
                      </div>
                    </div>
                    
                    <div className="tcc-detail-col">
                      <div className="tcc-form-group">
                        <label className="tcc-form-label">YEAR</label>
                        <div className="tcc-form-value">{application.year}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="tcc-detail-row">
                    <div className="tcc-detail-col">
                      <div className="tcc-form-group">
                        <label className="tcc-form-label">PLATFORM PAYMENT</label>
                        <div className="tcc-form-value">{application.platformPayment === 'Y' ? 'Yes' : 'No'}</div>
                      </div>
                    </div>
                    
                    {application.status === 'APPROVED' && (
                      <div className="tcc-detail-col">
                        <div className="tcc-form-group">
                          <label className="tcc-form-label">TCC NUMBER</label>
                          <div className="tcc-form-value highlight">{application.tccNumber}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {application.comment && (
              <div className="tcc-info-card">
                <div className="tcc-card-header">
                  <h3 className="tcc-card-title">
                    <FaInfoCircle className="tcc-card-icon" /> Official Comment
                  </h3>
                </div>
                <div className="tcc-card-body">
                  <div className="tcc-comment-box">
                    <p>{application.comment}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div 
        id="tab-panel-income" 
        role="tabpanel"
        aria-labelledby="tab-income"
        hidden={activeTab !== 'income'}
      >
        {activeTab === 'income' && (
          <div className="tcc-tab-content">
            <h2 className="tcc-section-title">Income & Tax Details</h2>
            
            {application.incomeDetails.map((income, index) => (
              <div className="tcc-tax-year-card" key={index}>
                <div className="tcc-tax-year-header">
                  <h3 className="tcc-tax-year-title"><FaRegCalendarAlt /> Tax Year {income.year}</h3>
                </div>
                <div className="tcc-tax-year-body">
                  <div className="tcc-tax-year-summary">
                    <div className="tcc-tax-data-item">
                      <div className="tcc-tax-data-label">Annual Income</div>
                      <div className="tcc-tax-data-value">{formatCurrency(income.annualIncome)}</div>
                    </div>
                    <div className="tcc-tax-data-item">
                      <div className="tcc-tax-data-label">Tax Paid</div>
                      <div className="tcc-tax-data-value highlight">{formatCurrency(income.taxAmount)}</div>
                    </div>
                    <div className="tcc-tax-data-item">
                      <div className="tcc-tax-data-label">Receipt No.</div>
                      <div className="tcc-tax-data-value">{income.taxReceiptNo}</div>
                    </div>
                    <div className="tcc-tax-data-item">
                      <div className="tcc-tax-data-label">Receipt Date</div>
                      <div className="tcc-tax-data-value">{formatDate(income.taxReceiptDate)}</div>
                    </div>
                    <div className="tcc-tax-data-item">
                      <div className="tcc-tax-data-label">Outstanding</div>
                      <div className="tcc-tax-data-value">{formatCurrency(income.outstandingTax)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="tcc-info-card">
              <div className="tcc-card-header">
                <h3 className="tcc-card-title">
                  <FaReceipt className="tcc-card-icon" /> Tax Payment Summary
                </h3>
              </div>
              <div className="tcc-card-body">
                <div className="tcc-tax-data-item">
                  <div className="tcc-tax-data-label">Total Income (3 Years)</div>
                  <div className="tcc-tax-data-value">{formatCurrency(application.incomeDetails.reduce((sum, income) => sum + income.annualIncome, 0))}</div>
                </div>
                <div className="tcc-tax-data-item">
                  <div className="tcc-tax-data-label">Total Tax Paid</div>
                  <div className="tcc-tax-data-value highlight">{formatCurrency(application.incomeDetails.reduce((sum, income) => sum + income.taxAmount, 0))}</div>
                </div>
                <div className="tcc-tax-data-item">
                  <div className="tcc-tax-data-label">Outstanding Balance</div>
                  <div className="tcc-tax-data-value">{formatCurrency(application.incomeDetails.reduce((sum, income) => sum + income.outstandingTax, 0))}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div 
        id="tab-panel-documents" 
        role="tabpanel"
        aria-labelledby="tab-documents"
        hidden={activeTab !== 'documents'}
      >
        {activeTab === 'documents' && (
          <div className="tcc-tab-content">
            <h2 className="tcc-section-title">Supporting Documents</h2>
            <div className="tcc-documents-grid">
              {application.documents.map((doc, index) => (
                <div key={index} className="tcc-document-card">
                  <div className="tcc-card-header">
                    <h3 className="tcc-card-title">
                      {doc.type === 'PAYMENT' && <FaReceipt className="tcc-card-icon" />}
                      {doc.type === 'IDENTITY' && <FaIdCard className="tcc-card-icon" />}
                      {!['PAYMENT', 'IDENTITY'].includes(doc.type) && <FaFileAlt className="tcc-card-icon" />}
                      {doc.type}
                    </h3>
                  </div>
                  <div className="tcc-card-body">
                    <div className="tcc-document-info">
                      <h3 className="tcc-document-name">{doc.name}</h3>
                      <p className="tcc-document-meta">
                        <span><FaRegFileAlt /> {doc.fileType}</span>
                        <span><FaRegCalendarAlt /> {formatDate(doc.uploadDate)}</span>
                      </p>
                    </div>
                    <div className="tcc-document-actions">
                      <Button variant="outline" size="sm" leadingIcon={<FaEye />}>View</Button>
                      <Button variant="outline" size="sm" leadingIcon={<FaDownload />}>Download</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div 
        id="tab-panel-timeline" 
        role="tabpanel"
        aria-labelledby="tab-timeline"
        hidden={activeTab !== 'timeline'}
      >
        {activeTab === 'timeline' && (
          <div className="tcc-tab-content">
            <h2 className="tcc-section-title">Application Timeline</h2>
            <div className="tcc-timeline">
              {application.timeline.map((event, index) => (
                <div key={index} className="tcc-timeline-item">
                  <div className={`tcc-timeline-icon ${event.status.toLowerCase().replace('_', '-')}`}>
                    {event.status === 'APPROVED' && <FaCheckCircle />}
                    {event.status === 'REJECTED' && <FaTimesCircle />}
                    {event.status === 'UNDER_REVIEW' && <FaClock />}
                    {event.status === 'SUBMITTED' && <FaFileAlt />}
                  </div>
                  <div className="tcc-timeline-content">
                    <div className="tcc-timeline-date">{formatDate(event.date)}</div>
                    <h3 className="tcc-timeline-title">
                      <StatusBadge status={event.status} /> {event.comment}
                    </h3>
                    <p className="tcc-timeline-actor">{event.actor}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TCCApplicationDetails; 