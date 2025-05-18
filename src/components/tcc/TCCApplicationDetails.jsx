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
import styles from './TCC.module.css';

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
      'PROFESSIONAL': 'Professional Services',
      'PROPERTY': 'Property/Investment',
      'FARMING': 'Farming/Agriculture',
      'OTHER': 'Other Sources'
    };
    return sources[sourceCode] || sourceCode;
  };

  // Status badge component with proper styling
  const StatusBadge = ({ status }) => {
    let badgeClass = styles.statusBadge + ' ';
    
    switch (status) {
      case 'APPROVED':
        badgeClass += styles.badgeApproved;
        break;
      case 'REJECTED':
        badgeClass += styles.badgeRejected;
        break;
      case 'UNDER_REVIEW':
        badgeClass += styles.badgePending;
        break;
      case 'SUBMITTED':
        badgeClass += styles.badgeInfo;
        break;
      default:
        badgeClass += styles.badgeDefault;
    }
    
    // Format status for display
    const formattedStatus = status.replace(/_/g, ' ').toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return <span className={badgeClass}>{formattedStatus}</span>;
  };

  // Loading skeleton
  const renderSkeleton = () => (
    <div className={styles.tccApplicationContainer}>
      <div className={styles.tccDetailsHeader}>
        <button 
          onClick={handleBackToList}
          className={styles.tccBackButton}
        >
          <FaArrowLeft />
        </button>
        
        <div className={styles.tccSkeletonActions}>
          <div className={styles.skeletonButton}></div>
          <div className={styles.skeletonButton}></div>
        </div>
      </div>
      
      <div className={styles.tccPageTitleSection}>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonSubtitle}></div>
      </div>
      
      <div className={styles.tccStatusSummary}>
        {[1, 2, 3, 4].map(index => (
          <div key={index} className={styles.skeletonStatusCard}></div>
        ))}
      </div>
      
      <div className={styles.tccTabs}>
        {['Details', 'Income', 'Documents', 'History'].map((tab, index) => (
          <div key={index} className={styles.skeletonTab}></div>
        ))}
      </div>
      
      <div className={styles.tccInfoCard}>
        <div className={styles.skeletonCardContent}></div>
      </div>
    </div>
  );

  if (loading) {
    return renderSkeleton();
  }

  if (error) {
    return (
      <div className={styles.tccApplicationContainer}>
        <div className={styles.tccDetailsHeader}>
          <button 
            onClick={handleBackToList}
            className={styles.tccBackButton}
          >
            <FaArrowLeft />
          </button>
        </div>
        
        <div className={styles.errorMessage}>
          <FaExclamationTriangle />
          <p>{error}</p>
          <button onClick={fetchApplicationDetails} className={styles.retryButton}>
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className={styles.tccApplicationContainer}>
        <div className={styles.tccDetailsHeader}>
          <button 
            onClick={handleBackToList}
            className={styles.tccBackButton}
          >
            <FaArrowLeft />
          </button>
        </div>
        
        <div className={styles.errorMessage}>
          <FaExclamationTriangle />
          <p>TCC Application not found</p>
          <button onClick={handleBackToList} className={styles.retryButton}>
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tccApplicationContainer}>
      {/* Header with Back Button and Actions */}
      <div className={styles.tccDetailsHeader}>
        <div className={styles.tccHeaderLeft}>
          <button 
            onClick={handleBackToList}
            className={styles.tccBackButton}
          >
            <FaArrowLeft />
          </button>
          
          <div className={styles.tccBreadcrumb}>
            <span className={styles.breadcrumbItem}>
              <FaHome /> Home
            </span>
            <span className={styles.breadcrumbSeparator}>
              <FaChevronRight />
            </span>
            <span className={styles.breadcrumbItem}>
              TCC Applications
            </span>
            <span className={styles.breadcrumbSeparator}>
              <FaChevronRight />
            </span>
            <span className={`${styles.breadcrumbItem} ${styles.current}`}>
              {application.applicationNumber}
            </span>
          </div>
        </div>
        
        <div className={styles.tccActionButtons}>
          {application.status === 'APPROVED' && (
            <>
              <Button 
                variant="outline" 
                startIcon={<FaPrint />}
                onClick={() => console.log('Print TCC')}
              >
                Print TCC
              </Button>
              <Button 
                variant="outline" 
                startIcon={<FaDownload />}
                onClick={() => console.log('Download TCC')}
              >
                Download TCC
              </Button>
            </>
          )}
          
          {(application.status === 'SUBMITTED' || application.status === 'UNDER_REVIEW') && (
            <Button 
              variant="primary" 
              startIcon={<FaEdit />}
              onClick={handleProcess}
            >
              Process Application
            </Button>
          )}
        </div>
      </div>
      
      {/* Application Title and Meta Info */}
      <div className={styles.tccPageTitleSection}>
        <h1 className={styles.tccTitle}>
          TCC Application {application.applicationNumber}
        </h1>
        
        <div className={styles.tccApplicationMeta}>
          <div className={styles.tccMetaItem}>
            <FaUser className={styles.tccMetaIcon} />
            <span className={styles.tccMetaLabel}>Taxpayer:</span>
            <span className={styles.tccMetaValue}>{application.taxpayerName}</span>
          </div>
          
          <div className={styles.tccMetaItem}>
            <FaIdCard className={styles.tccMetaIcon} />
            <span className={styles.tccMetaLabel}>TIN:</span>
            <span className={styles.tccMetaValue}>{application.tin}</span>
          </div>
          
          <div className={styles.tccMetaItem}>
            <FaCalendarAlt className={styles.tccMetaIcon} />
            <span className={styles.tccMetaLabel}>Date:</span>
            <span className={styles.tccMetaValue}>{formatDate(application.applicationDate)}</span>
          </div>
          
          <div className={styles.tccMetaItem}>
            <FaInfoCircle className={styles.tccMetaIcon} />
            <span className={styles.tccMetaLabel}>Status:</span>
            <StatusBadge status={application.status} />
          </div>
        </div>
      </div>
      
      {/* Status Summary Cards */}
      <div className={styles.tccStatusSummary}>
        <div className={`${styles.tccStatusCard} ${styles.primary}`}>
          <div className={styles.tccStatusIcon}>
            <FaFileAlt />
          </div>
          <div className={styles.tccStatusInfo}>
            <div className={styles.tccStatusLabel}>Application</div>
            <div className={styles.tccStatusValue}>{application.applicationNumber}</div>
          </div>
        </div>
        
        <div className={`${styles.tccStatusCard} ${application.status === 'APPROVED' ? styles.success : styles.warning}`}>
          <div className={styles.tccStatusIcon}>
            {application.status === 'APPROVED' ? <FaCheckCircle /> : <FaClock />}
          </div>
          <div className={styles.tccStatusInfo}>
            <div className={styles.tccStatusLabel}>TCC Status</div>
            <div className={styles.tccStatusValue}>
              <StatusBadge status={application.status} />
            </div>
          </div>
        </div>
        
        <div className={`${styles.tccStatusCard} ${styles.info}`}>
          <div className={styles.tccStatusIcon}>
            <FaFileInvoice />
          </div>
          <div className={styles.tccStatusInfo}>
            <div className={styles.tccStatusLabel}>TCC Number</div>
            <div className={styles.tccStatusValue}>
              {application.tccNumber || 'Not issued yet'}
            </div>
          </div>
        </div>
        
        <div className={`${styles.tccStatusCard} ${styles.warning}`}>
          <div className={styles.tccStatusIcon}>
            <FaCalendarAlt />
          </div>
          <div className={styles.tccStatusInfo}>
            <div className={styles.tccStatusLabel}>Tax Year</div>
            <div className={styles.tccStatusValue}>{application.year}</div>
          </div>
        </div>
      </div>
      
      {/* Tab Navigation */}
      <div className={styles.tccTabs}>
        <button 
          className={`${styles.tccTabButton} ${activeTab === 'details' ? styles.active : ''}`}
          onClick={() => setActiveTab('details')}
        >
          <FaUser /> Taxpayer Details
        </button>
        
        <button 
          className={`${styles.tccTabButton} ${activeTab === 'income' ? styles.active : ''}`}
          onClick={() => setActiveTab('income')}
        >
          <FaMoneyBillWave /> Income & Tax
        </button>
        
        <button 
          className={`${styles.tccTabButton} ${activeTab === 'documents' ? styles.active : ''}`}
          onClick={() => setActiveTab('documents')}
        >
          <FaFileAlt /> Documents
        </button>
        
        <button 
          className={`${styles.tccTabButton} ${activeTab === 'history' ? styles.active : ''}`}
          onClick={() => setActiveTab('history')}
        >
          <FaHistory /> History
        </button>
      </div>
      
      {/* Tab Content */}
      <div className={styles.tccTabContent}>
        {/* Taxpayer Details Tab */}
        {activeTab === 'details' && (
          <div className={styles.tccInfoCard}>
            <div className={styles.tccCardHeader}>
              <h3 className={styles.tccCardTitle}>
                <FaUser className={styles.tccCardIcon} /> Taxpayer Information
              </h3>
            </div>
            
            <div className={styles.tccCardBody}>
              <div className={styles.tccDetailGrid}>
                <div className={styles.tccDetailRow}>
                  <div className={styles.tccDetailCol}>
                    <div className={styles.tccFormGroup}>
                      <div className={styles.tccFormLabel}>Full Name</div>
                      <div className={styles.tccFormValue}>{application.taxpayerName}</div>
                    </div>
                  </div>
                  
                  <div className={styles.tccDetailCol}>
                    <div className={styles.tccFormGroup}>
                      <div className={styles.tccFormLabel}>TIN</div>
                      <div className={styles.tccFormValue}>{application.tin}</div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.tccDetailRow}>
                  <div className={styles.tccDetailCol}>
                    <div className={styles.tccFormGroup}>
                      <div className={styles.tccFormLabel}>Email Address</div>
                      <div className={styles.tccFormValue}>{application.email}</div>
                    </div>
                  </div>
                  
                  <div className={styles.tccDetailCol}>
                    <div className={styles.tccFormGroup}>
                      <div className={styles.tccFormLabel}>Phone Number</div>
                      <div className={styles.tccFormValue}>{application.phone}</div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.tccDetailRow}>
                  <div className={styles.tccDetailCol}>
                    <div className={styles.tccFormGroup}>
                      <div className={styles.tccFormLabel}>Source of Income</div>
                      <div className={styles.tccFormValue}>{getSourceOfIncomeLabel(application.sourceOfIncome)}</div>
                    </div>
                  </div>
                  
                  <div className={styles.tccDetailCol}>
                    <div className={styles.tccFormGroup}>
                      <div className={styles.tccFormLabel}>Payment Platform</div>
                      <div className={styles.tccFormValue}>{application.platformPayment === 'Y' ? 'Yes' : 'No'}</div>
                    </div>
                  </div>
                </div>
                
                <div className={styles.tccDetailRow}>
                  <div className={styles.tccDetailColWide}>
                    <div className={styles.tccFormGroup}>
                      <div className={styles.tccFormLabel}>Comment/Note</div>
                      <div className={styles.tccFormValue}>{application.comment || 'No comments'}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Income & Tax Tab */}
        {activeTab === 'income' && (
          <div className={styles.tccInfoCard}>
            <div className={styles.tccCardHeader}>
              <h3 className={styles.tccCardTitle}>
                <FaMoneyBillWave className={styles.tccCardIcon} /> Income & Tax Details
              </h3>
            </div>
            
            <div className={styles.tccCardBody}>
              <div className={styles.tccTaxYearsGrid}>
                {application.incomeDetails.map((income, index) => (
                  <div key={index} className={styles.tccTaxYearCard}>
                    <div className={styles.tccTaxYearHeader}>
                      <h4 className={styles.tccTaxYearTitle}>
                        Tax Year {income.year}
                      </h4>
                    </div>
                    
                    <div className={styles.tccTaxYearBody}>
                      <div className={styles.tccTaxYearSummary}>
                        <div className={styles.tccTaxDataItem}>
                          <div className={styles.tccTaxDataLabel}>Annual Income</div>
                          <div className={styles.tccTaxDataValue}>{formatCurrency(income.annualIncome)}</div>
                        </div>
                        
                        <div className={styles.tccTaxDataItem}>
                          <div className={styles.tccTaxDataLabel}>Tax Paid</div>
                          <div className={styles.tccTaxDataValue}>{formatCurrency(income.taxAmount)}</div>
                        </div>
                        
                        <div className={styles.tccTaxDataItem}>
                          <div className={styles.tccTaxDataLabel}>Receipt Number</div>
                          <div className={styles.tccTaxDataValue}>{income.taxReceiptNo}</div>
                        </div>
                        
                        <div className={styles.tccTaxDataItem}>
                          <div className={styles.tccTaxDataLabel}>Receipt Date</div>
                          <div className={styles.tccTaxDataValue}>{formatDate(income.taxReceiptDate)}</div>
                        </div>
                        
                        <div className={styles.tccTaxDataItem}>
                          <div className={styles.tccTaxDataLabel}>Outstanding Tax</div>
                          <div className={`${styles.tccTaxDataValue} ${income.outstandingTax > 0 ? styles.highlight : ''}`}>
                            {formatCurrency(income.outstandingTax)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className={styles.tccStatusInfoBar}>
                <div className={styles.tccStatusInfoItem}>
                  <div className={styles.tccStatusInfoLabel}>Total Income (3 Years)</div>
                  <div className={styles.tccStatusInfoValue}>
                    {formatCurrency(application.incomeDetails.reduce((total, income) => total + income.annualIncome, 0))}
                  </div>
                </div>
                
                <div className={styles.tccStatusInfoItem}>
                  <div className={styles.tccStatusInfoLabel}>Total Tax Paid</div>
                  <div className={styles.tccStatusInfoValue}>
                    {formatCurrency(application.incomeDetails.reduce((total, income) => total + income.taxAmount, 0))}
                  </div>
                </div>
                
                <div className={styles.tccStatusInfoItem}>
                  <div className={styles.tccStatusInfoLabel}>Outstanding Tax</div>
                  <div className={styles.tccStatusInfoValue}>
                    {formatCurrency(application.incomeDetails.reduce((total, income) => total + income.outstandingTax, 0))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Documents Tab */}
        {activeTab === 'documents' && (
          <div className={styles.tccInfoCard}>
            <div className={styles.tccCardHeader}>
              <h3 className={styles.tccCardTitle}>
                <FaFileAlt className={styles.tccCardIcon} /> Submitted Documents
              </h3>
            </div>
            
            <div className={styles.tccCardBody}>
              <div className={styles.tccDocumentsGrid}>
                {application.documents.map((doc) => (
                  <div key={doc.id} className={styles.tccDocumentCard}>
                    <div className={styles.tccDocumentIcon}>
                      {doc.fileType === 'PDF' ? <FaFilePdf /> : <FaFileAlt />}
                    </div>
                    
                    <div className={styles.tccDocumentInfo}>
                      <div className={styles.tccDocumentName}>{doc.name}</div>
                      <div className={styles.tccDocumentMeta}>
                        {doc.type} • {formatDate(doc.uploadDate)}
                      </div>
                    </div>
                    
                    <div className={styles.tccDocumentActions}>
                      <button 
                        className={styles.iconButton}
                        title="View Document"
                        onClick={() => console.log(`View document ${doc.id}`)}
                      >
                        <FaEye />
                      </button>
                      <button 
                        className={styles.iconButton}
                        title="Download Document"
                        onClick={() => console.log(`Download document ${doc.id}`)}
                      >
                        <FaDownload />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* History Tab */}
        {activeTab === 'history' && (
          <div className={styles.tccInfoCard}>
            <div className={styles.tccCardHeader}>
              <h3 className={styles.tccCardTitle}>
                <FaHistory className={styles.tccCardIcon} /> Application History
              </h3>
            </div>
            
            <div className={styles.tccCardBody}>
              <div className={styles.tccTimeline}>
                {application.timeline.map((event, index) => (
                  <div key={index} className={styles.tccTimelineItem}>
                    <div className={`${styles.tccTimelineIcon} ${styles[event.status.toLowerCase()]}`}>
                      {event.status === 'APPROVED' && <FaCheckCircle />}
                      {event.status === 'REJECTED' && <FaTimesCircle />}
                      {(event.status === 'UNDER_REVIEW' || event.status === 'SUBMITTED') && <FaClock />}
                    </div>
                    
                    <div className={styles.tccTimelineContent}>
                      <div className={styles.tccTimelineDate}>
                        {formatDate(event.date)}
                      </div>
                      <div className={styles.tccTimelineTitle}>
                        <StatusBadge status={event.status} /> {event.comment}
                      </div>
                      <div className={styles.tccTimelineActor}>
                        <FaUser /> {event.actor}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TCCApplicationDetails; 