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
  FaFilePdf,
  FaEnvelope,
  FaPhone,
  FaFile,
  FaImage
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <Card title="Taxpayer Information" icon={<FaUser />} className={styles.tccInfoCard}>
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
                    <div className={styles.tccFormValue}>
                      <FaEnvelope className={styles.tccMetaIcon} /> {application.email}
                    </div>
                  </div>
                </div>
                
                <div className={styles.tccDetailCol}>
                  <div className={styles.tccFormGroup}>
                    <div className={styles.tccFormLabel}>Phone Number</div>
                    <div className={styles.tccFormValue}>
                      <FaPhone className={styles.tccMetaIcon} /> {application.phone}
                    </div>
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
          </Card>
        );
        
      case 'payments':
        return (
          <Card title="Income & Tax Information" icon={<FaMoneyBillWave />} className={styles.tccInfoCard}>
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
          </Card>
        );
        
      case 'documents':
        return (
          <Card title="Submitted Documents" icon={<FaFileAlt />} className={styles.tccInfoCard}>
            <div className={styles.tccDocumentsGrid}>
              {application.documents.map((doc) => (
                <div key={doc.id} className={styles.tccEnhancedDocumentCard}>
                  <div className={styles.tccDocumentCardHeader}>
                    <div className={styles.tccDocumentTypeInfo}>
                      <div className={styles.tccDocumentTypeIcon}>
                        {doc.fileType === 'PDF' ? <FaFilePdf /> : 
                         doc.fileType === 'JPEG' || doc.fileType === 'PNG' ? <FaImage /> : 
                         <FaFile />}
                      </div>
                      <div className={styles.tccDocumentTypeName}>
                        {doc.type}
                      </div>
                    </div>
                  </div>
                  
                  <div className={styles.tccDocumentCardBody}>
                    <div className={styles.tccDocumentName}>{doc.name}</div>
                    
                    <div className={styles.tccDocumentMetaData}>
                      <div className={styles.tccDocumentMetaItem}>
                        <FaCalendarAlt className={styles.tccDocumentMetaIcon} />
                        Uploaded: {formatDate(doc.uploadDate)}
                      </div>
                      
                      <div className={styles.tccDocumentMetaItem}>
                        <FaFile className={styles.tccDocumentMetaIcon} />
                        {doc.fileType}
                      </div>
                    </div>
                    
                    <div className={styles.tccDocumentCardActions}>
                      <button className={styles.tccDocumentActionButton}>
                        <FaEye /> View
                      </button>
                      <button className={styles.tccDocumentActionButton}>
                        <FaDownload /> Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        );
        
      case 'history':
        return (
          <Card title="Application Timeline" icon={<FaHistory />} className={styles.tccInfoCard}>
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
          </Card>
        );
        
      default:
        return null;
    }
  };

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
      {/* Back button and header */}
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
              <FaHome />
              <span>Dashboard</span>
            </span>
            <span className={styles.breadcrumbSeparator}>
              <FaChevronRight />
            </span>
            <span className={styles.breadcrumbItem}>
              <FaFileAlt />
              <span>TCC Applications</span>
            </span>
            <span className={styles.breadcrumbSeparator}>
              <FaChevronRight />
            </span>
            <span className={`${styles.breadcrumbItem} ${styles.current}`}>
              <FaIdCard />
              <span>Application Details</span>
            </span>
          </div>
        </div>
      </div>

      {/* Page title */}
      <div className={styles.tccPageTitleSection}>
        <h1 className={styles.tccTitle}>TCC Application Details</h1>
        
        {!loading && application && (
          <div className={styles.tccApplicationMeta}>
            <div className={styles.tccMetaItem}>
              <FaIdCard className={styles.tccMetaIcon} />
              <span className={styles.tccMetaLabel}>Application ID:</span>
              <span className={styles.tccMetaValue}>{application.applicationNumber}</span>
            </div>
            <div className={styles.tccMetaItem}>
              <FaCalendarAlt className={styles.tccMetaIcon} />
              <span className={styles.tccMetaLabel}>Submitted:</span>
              <span className={styles.tccMetaValue}>{formatDate(application.applicationDate)}</span>
            </div>
            <div className={styles.tccMetaItem}>
              <FaTags className={styles.tccMetaIcon} />
              <span className={styles.tccMetaLabel}>Status:</span>
              <span className={styles.tccMetaValue}>
                <StatusBadge status={application.status} />
              </span>
            </div>
          </div>
        )}
      </div>

      {loading ? (
        <div className={styles.tccLoadingSkeleton}>
          <div className={styles.tccSkeletonHeader}></div>
          <div className={styles.tccSkeletonStats}>
            <div className={styles.tccSkeletonCard}></div>
            <div className={styles.tccSkeletonCard}></div>
            <div className={styles.tccSkeletonCard}></div>
          </div>
          <div className={styles.tccSkeletonContent}>
            <div className={styles.tccSkeletonTabs}></div>
            <div className={styles.tccSkeletonPanel}></div>
          </div>
        </div>
      ) : error ? (
        <div className={styles.tccErrorState}>
          <FaExclamationTriangle />
          <h3>Error Loading Application</h3>
          <p>{error}</p>
          <Button onClick={handleBackToList} startIcon={<FaArrowLeft />}>
            Return to Applications
          </Button>
        </div>
      ) : (
        <>
          {/* Status Summary Cards */}
          <div className={styles.tccStatusSummary}>
            <StatsCard
              title="Taxpayer"
              value={application.taxpayerName}
              icon={<FaUser />}
              color="primary"
              animationStyle="fade"
              footer={
                <div className={styles.tccMetaItem}>
                  <FaIdCard className={styles.tccMetaIcon} />
                  <span className={styles.tccMetaValue}>{application.tin}</span>
                </div>
              }
            />
            
            <StatsCard
              title="TCC Number"
              value={application.tccNumber || 'Not Issued'}
              icon={<FaFileInvoice />}
              color="success"
              animationStyle="fade"
              footer={application.issueDate ? (
                <div className={styles.tccMetaItem}>
                  <FaCalendarAlt className={styles.tccMetaIcon} />
                  <span className={styles.tccMetaValue}>Issued: {formatDate(application.issueDate)}</span>
                </div>
              ) : null}
            />
            
            <StatsCard
              title="Tax Year"
              value={application.year}
              icon={<FaMoneyBillWave />}
              color="info"
              animationStyle="fade"
              footer={
                <div className={styles.tccMetaItem}>
                  <FaCalendarAlt className={styles.tccMetaIcon} />
                  <span className={styles.tccMetaValue}>{application.sourceOfIncome}</span>
                </div>
              }
            />
            
            <StatsCard
              title="Status"
              value={<StatusBadge status={application.status} />}
              icon={<FaClipboardList />}
              color={
                application.status === 'APPROVED' ? 'success' :
                application.status === 'REJECTED' ? 'danger' :
                application.status === 'UNDER_REVIEW' ? 'warning' : 'primary'
              }
              animationStyle="fade"
            />
          </div>
          
          {/* Tabs for different sections */}
          <div className={styles.tccTabs}>
            <button 
              className={`${styles.tccTabButton} ${activeTab === 'details' ? styles.active : ''}`} 
              onClick={() => setActiveTab('details')}
            >
              <FaInfoCircle />
              Details
            </button>
            <button 
              className={`${styles.tccTabButton} ${activeTab === 'payments' ? styles.active : ''}`} 
              onClick={() => setActiveTab('payments')}
            >
              <FaMoneyBillWave />
              Tax Payments
            </button>
            <button 
              className={`${styles.tccTabButton} ${activeTab === 'documents' ? styles.active : ''}`} 
              onClick={() => setActiveTab('documents')}
            >
              <FaFileAlt />
              Documents
            </button>
            <button 
              className={`${styles.tccTabButton} ${activeTab === 'history' ? styles.active : ''}`} 
              onClick={() => setActiveTab('history')}
            >
              <FaHistory />
              History
            </button>
          </div>
          
          {/* Main Content based on active tab */}
          <div className={styles.tccTabContent}>
            {renderTabContent()}
          </div>
          
          {/* Action buttons */}
          <div className={styles.tccActionButtons}>
            {application.status !== 'APPROVED' && application.status !== 'REJECTED' && (
              <Button 
                variant="primary" 
                startIcon={<FaEdit />}
                onClick={handleProcess}
              >
                Process Application
              </Button>
            )}
            
            {application.status === 'APPROVED' && (
              <>
                <Button 
                  variant="outlined" 
                  startIcon={<FaEye />}
                  onClick={() => window.open(`/tcc-preview/${id}`, '_blank')}
                >
                  Preview TCC
                </Button>
                
                <Button 
                  variant="primary" 
                  startIcon={<FaDownload />}
                >
                  Download TCC
                </Button>
                
                <Button 
                  variant="secondary" 
                  startIcon={<FaPrint />}
                >
                  Print TCC
                </Button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TCCApplicationDetails; 