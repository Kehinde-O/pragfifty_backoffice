import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Button, Table } from '../common/ui';
import { 
  FaArrowLeft, 
  FaClipboardCheck, 
  FaFileContract, 
  FaReceipt, 
  FaCommentAlt, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaCertificate,
  FaExclamationTriangle,
  FaUser,
  FaIdCard,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaFileAlt,
  FaHistory,
  FaInfoCircle,
  FaClock,
  FaSave,
  FaSpinner,
  FaEye,
  FaDownload,
  FaWeight,
  FaFile,
  FaHome,
  FaChevronRight,
  FaTags,
  FaClipboardList,
  FaShieldAlt,
  FaFilter,
  FaListAlt,
  FaSearch,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaFilePdf,
  FaImage,
  FaFolder,
  FaCalendarCheck,
  FaArrowRight,
  FaTimes
} from 'react-icons/fa';
import styles from './TCC.module.css';

const TCCApplicationProcess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [processingStatus, setProcessingStatus] = useState(null); // 'success', 'error', null
  const [processingAction, setProcessingAction] = useState('approve'); // 'approve', 'reject'
  
  // Add additional state for nested tabs and document preview
  const [activeDocumentCategory, setActiveDocumentCategory] = useState('all');
  const [activePaymentTab, setActivePaymentTab] = useState('income');
  const [previewDocument, setPreviewDocument] = useState(null);
  
  // Add workflow state
  const [workflowActive, setWorkflowActive] = useState(false);
  const [currentApprovalStage, setCurrentApprovalStage] = useState(1);
  const [approvalHistory, setApprovalHistory] = useState([]);
  
  // Form fields
  const [tccNumber, setTccNumber] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState(() => {
    // Default expiry date is 1 year from today
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    oneYearLater.setDate(oneYearLater.getDate() - 1); // Subtract 1 day
    return oneYearLater.toISOString().split('T')[0];
  });
  const [officerComment, setOfficerComment] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Load application details on component mount
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
      
      // Enhanced mock data for a TCC application based on backend rules
      const mockData = {
        id: id,
        applicationNumber: 'TCC-2023-001',
        applicationDate: '2023-05-15',
        taxpayerName: 'John Doe',
        tin: 'TIN12345678',
        email: 'john.doe@example.com',
        phone: '+234 801 234 5678',
        year: '2023',
        status: 'UNDER_REVIEW',
        sourceOfIncome: 'EMPLOYMENT',
        platformPayment: 'Y',
        comment: 'Application for tax clearance certificate for 2023',
        taxPayerType: 'Individual',
        primaryLGA: 'Chanchaga',
        address: '15 Ibrahim Taiwo Road, Minna, Niger State',
        occupation: 'Civil Servant',
        workflowStage: 2, // Current workflow stage
        totalStages: 4, // Total workflow stages
        approvalWorkflow: [
          {
            stage: 1,
            name: 'Document Verification',
            status: 'COMPLETED',
            officer: 'Mohammed Abubakar',
            role: 'Tax Officer',
            dateCompleted: '2023-05-16',
            comments: 'All documents have been verified and are in order.'
          },
          {
            stage: 2,
            name: 'Tax Payment Verification',
            status: 'IN_PROGRESS',
            officer: 'Fatima Ibrahim',
            role: 'Senior Tax Officer',
            dateAssigned: '2023-05-17',
            dueDate: '2023-05-19'
          },
          {
            stage: 3,
            name: 'Manager Review',
            status: 'PENDING',
            officer: 'Ahmed Mohammed',
            role: 'Area Manager',
            dateAssigned: null,
            dueDate: null
          },
          {
            stage: 4,
            name: 'Final Approval',
            status: 'PENDING',
            officer: 'Usman Bello',
            role: 'Regional Director',
            dateAssigned: null,
            dueDate: null
          }
        ],
        incomeDetails: [
          {
            year: '2022',
            annualIncome: 5000000,
            taxAmount: 425000,
            taxReceiptNo: 'PAYE-2022-1234',
            taxReceiptDate: '2022-12-15',
            outstandingTax: 0,
            devLevyReceiptNo: 'DEV-2022-5432',
            devLevyAmount: 100,
            devLevyReceiptDate: '2022-11-30',
            landUseChargeReceiptNo: 'LUC-2022-9876',
            landUseChargeAmount: 15000,
            landUseChargeReceiptDate: '2022-10-15',
            previousTccNo: null,
            previousTccIssueDate: null,
            verificationStatus: 'VERIFIED',
            verificationDate: '2023-05-17',
            verificationComment: 'All tax payments verified against NSIRS records',
            paymentMethod: 'Bank Transfer',
            bank: 'First Bank of Nigeria',
            transactionId: 'TRX-2022-98765',
            paymentDate: '2022-12-10'
          },
          {
            year: '2021',
            annualIncome: 4500000,
            taxAmount: 375000,
            taxReceiptNo: 'PAYE-2021-5678',
            taxReceiptDate: '2021-12-10',
            outstandingTax: 0,
            devLevyReceiptNo: 'DEV-2021-4321',
            devLevyAmount: 100,
            devLevyReceiptDate: '2021-11-25',
            landUseChargeReceiptNo: 'LUC-2021-8765',
            landUseChargeAmount: 12000,
            landUseChargeReceiptDate: '2021-10-10',
            previousTccNo: 'TCCREG-2021-00123',
            previousTccIssueDate: '2021-02-15',
            verificationStatus: 'VERIFIED',
            verificationDate: '2023-05-17',
            verificationComment: 'Confirmed payments with tax authorities',
            paymentMethod: 'Bank Deposit',
            bank: 'Zenith Bank',
            transactionId: 'TRX-2021-43210',
            paymentDate: '2021-12-05'
          },
          {
            year: '2020',
            annualIncome: 4000000,
            taxAmount: 325000,
            taxReceiptNo: 'PAYE-2020-9012',
            taxReceiptDate: '2020-12-18',
            outstandingTax: 0,
            devLevyReceiptNo: 'DEV-2020-3210',
            devLevyAmount: 100,
            devLevyReceiptDate: '2020-11-20',
            landUseChargeReceiptNo: 'LUC-2020-7654',
            landUseChargeAmount: 10000,
            landUseChargeReceiptDate: '2020-10-05',
            previousTccNo: 'TCCREG-2020-00098',
            previousTccIssueDate: '2020-02-10',
            verificationStatus: 'VERIFIED',
            verificationDate: '2023-05-17',
            verificationComment: 'All payments reconciled with records',
            paymentMethod: 'Mobile Banking',
            bank: 'GTBank',
            transactionId: 'TRX-2020-12345',
            paymentDate: '2020-12-15'
          }
        ],
        documents: [
          {
            id: '1',
            name: 'Tax Payment Receipt 2022',
            type: 'PAYMENT',
            documentType: 'PAYE',
            fileType: 'PDF',
            uploadDate: '2023-05-10',
            fileSize: '256KB',
            verificationStatus: 'VERIFIED',
            verificationDate: '2023-05-17',
            verificationComment: 'Valid receipt confirmed with Niger State IRS records'
          },
          {
            id: '2',
            name: 'Tax Payment Receipt 2021',
            type: 'PAYMENT',
            documentType: 'PAYE',
            fileType: 'PDF',
            uploadDate: '2023-05-10',
            fileSize: '245KB',
            verificationStatus: 'VERIFIED',
            verificationDate: '2023-05-17',
            verificationComment: 'Receipt validated against IRS database'
          },
          {
            id: '3',
            name: 'Tax Payment Receipt 2020',
            type: 'PAYMENT',
            documentType: 'PAYE',
            fileType: 'PDF',
            uploadDate: '2023-05-10',
            fileSize: '240KB',
            verificationStatus: 'VERIFIED',
            verificationDate: '2023-05-17',
            verificationComment: 'PAYE payment confirmed in IRS records'
          },
          {
            id: '4',
            name: 'Passport Photograph',
            type: 'IDENTITY',
            documentType: 'EVIDENCE',
            fileType: 'JPEG',
            uploadDate: '2023-05-10',
            fileSize: '120KB',
            verificationStatus: 'VERIFIED',
            verificationDate: '2023-05-17',
            verificationComment: 'Passport photograph verified'
          },
          {
            id: '5',
            name: 'Development Levy Receipt 2022',
            type: 'PAYMENT',
            documentType: 'EVIDENCE',
            fileType: 'PDF',
            uploadDate: '2023-05-10',
            fileSize: '195KB',
            verificationStatus: 'VERIFIED',
            verificationDate: '2023-05-17',
            verificationComment: 'Development levy payment verified'
          },
          {
            id: '6',
            name: 'Employment Letter',
            type: 'EMPLOYMENT',
            documentType: 'EVIDENCE',
            fileType: 'PDF',
            uploadDate: '2023-05-10',
            fileSize: '350KB',
            verificationStatus: 'VERIFIED',
            verificationDate: '2023-05-17',
            verificationComment: 'Employment status confirmed'
          }
        ],
        timeline: [
          {
            date: '2023-05-17',
            status: 'UNDER_REVIEW',
            comment: 'Tax payment verification in progress. Assigned to Fatima Ibrahim (Senior Tax Officer).',
            actor: 'Fatima Ibrahim (Senior Tax Officer)'
          },
          {
            date: '2023-05-16',
            status: 'UNDER_REVIEW',
            comment: 'Document verification completed. All documents are in order.',
            actor: 'Mohammed Abubakar (Tax Officer)'
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
        ],
        reviewNotes: [
          {
            date: '2023-05-17',
            note: 'All tax payments verified against IRS records. Development levy payments confirmed.',
            officer: 'Fatima Ibrahim'
          },
          {
            date: '2023-05-17',
            note: 'Employment status verified with current employer.',
            officer: 'Fatima Ibrahim'
          },
          {
            date: '2023-05-16',
            note: 'Initial review of documents shows complete submission.',
            officer: 'Mohammed Abubakar'
          }
        ]
      };
      
      setApplication(mockData);
      // Set the current approval stage based on the mock data
      setCurrentApprovalStage(mockData.workflowStage);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching TCC application details:', error);
      setError('Failed to load application details. Please try again.');
      setLoading(false);
    }
  };

  const handleBackToDetails = () => {
    navigate(`/dashboard/tcc-application/${id}`);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const validateForm = () => {
    const errors = {};
    
    if (processingAction === 'approve') {
      if (!tccNumber.trim()) {
        errors.tccNumber = 'TCC Number is required';
      }
      
      if (!issueDate) {
        errors.issueDate = 'Issue Date is required';
      }
      
      if (!expiryDate) {
        errors.expiryDate = 'Expiry Date is required';
      } else if (new Date(expiryDate) <= new Date(issueDate)) {
        errors.expiryDate = 'Expiry Date must be after Issue Date';
      }
      
      if (!officerComment.trim()) {
        errors.officerComment = 'Comment is required';
      }
    } else {
      if (!rejectionReason.trim()) {
        errors.rejectionReason = 'Reason for rejection is required';
      }
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleWorkflowAction = async (action, stageId) => {
    setWorkflowActive(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (action === 'approve') {
        // Move to next stage
        const nextStage = currentApprovalStage + 1;
        
        // Update approval history
        setApprovalHistory([
          ...approvalHistory, 
          {
            stage: currentApprovalStage,
            date: new Date().toISOString(),
            officer: 'Fatima Ibrahim', // This would come from user context in a real app
            action: 'Approved',
            comments: officerComment
          }
        ]);
        
        // Check if this was the final stage
        if (nextStage > application.totalStages) {
          // Final approval - set application status to approved
          setProcessingStatus('success');
          setProcessingAction('approve');
        } else {
          // Update to next stage
          setCurrentApprovalStage(nextStage);
          
          // Update application object with new stage
          setApplication(prev => ({
            ...prev,
            workflowStage: nextStage,
            approvalWorkflow: prev.approvalWorkflow.map(stage => {
              if (stage.stage === currentApprovalStage) {
                return {
                  ...stage,
                  status: 'COMPLETED',
                  dateCompleted: new Date().toISOString().split('T')[0]
                };
              } else if (stage.stage === nextStage) {
                return {
                  ...stage,
                  status: 'IN_PROGRESS',
                  dateAssigned: new Date().toISOString().split('T')[0],
                  dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0]
                };
              }
              return stage;
            }),
            timeline: [
              {
                date: new Date().toISOString().split('T')[0],
                status: 'UNDER_REVIEW',
                comment: `Stage ${currentApprovalStage} (${application.approvalWorkflow.find(s => s.stage === currentApprovalStage).name}) approved. Moving to Stage ${nextStage} (${application.approvalWorkflow.find(s => s.stage === nextStage).name}).`,
                actor: 'Fatima Ibrahim (Senior Tax Officer)'
              },
              ...application.timeline
            ]
          }));
        }
      } else if (action === 'reject') {
        // Reject application
        setProcessingStatus('success');
        setProcessingAction('reject');
        
        // Add to approval history
        setApprovalHistory([
          ...approvalHistory, 
          {
            stage: currentApprovalStage,
            date: new Date().toISOString(),
            officer: 'Fatima Ibrahim', // This would come from user context in a real app
            action: 'Rejected',
            comments: rejectionReason
          }
        ]);
      }
    } catch (error) {
      console.error('Error processing workflow action:', error);
      setProcessingStatus('error');
    } finally {
      setWorkflowActive(false);
    }
  };

  const handleApprove = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Use workflow action handler
    await handleWorkflowAction('approve');
    
    setIsSubmitting(false);
  };

  const handleReject = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Use workflow action handler
    await handleWorkflowAction('reject');
    
    setIsSubmitting(false);
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

  // Status badge component
  const StatusBadge = ({ status }) => {
    let badgeClass = styles.statusBadge + ' ';
    let icon = null;
    
    switch (status) {
      case 'APPROVED':
        badgeClass += styles.badgeApproved;
        icon = <FaCheckCircle />;
        break;
      case 'REJECTED':
        badgeClass += styles.badgeRejected;
        icon = <FaTimesCircle />;
        break;
      case 'SUBMITTED':
        badgeClass += styles.badgeInfo;
        icon = <FaFileAlt />;
        break;
      case 'UNDER_REVIEW':
        badgeClass += styles.badgePending;
        icon = <FaClock />;
        break;
      default:
        badgeClass += styles.badgeDefault;
        icon = <FaInfoCircle />;
    }
    
    return (
      <div className={badgeClass}>
        {icon} {status.replace(/_/g, ' ')}
      </div>
    );
  };

  // Render loading skeleton
  const renderSkeleton = () => (
    <div className={styles.tccApplicationContainer}>
      <div className={styles.tccDetailsHeader}>
        <div className={styles.skeletonCell} style={{width: '40px', height: '40px', borderRadius: '8px'}}></div>
        <div>
          <div className={styles.skeletonCell} style={{width: '300px', height: '32px', marginBottom: '8px'}}></div>
          <div className={styles.skeletonCell} style={{width: '200px', height: '18px'}}></div>
        </div>
      </div>
      
      <div className={styles.tccProcessLayout}>
        <div className={styles.tccProcessSidebar}>
          <div className={styles.tccInfoCard}>
            <div className={styles.tccCardBody}>
              <div className={styles.skeletonCell} style={{width: '100%', height: '40px', marginBottom: '12px'}}></div>
              <div className={styles.skeletonCell} style={{width: '100%', height: '40px', marginBottom: '12px'}}></div>
              <div className={styles.skeletonCell} style={{width: '100%', height: '40px', marginBottom: '12px'}}></div>
              <div className={styles.skeletonCell} style={{width: '100%', height: '40px', marginBottom: '12px'}}></div>
              <div className={styles.skeletonCell} style={{width: '100%', height: '40px'}}></div>
            </div>
          </div>
        </div>
        <div className={styles.tccProcessContent}>
          <div className={styles.tccInfoCard}>
            <div className={styles.tccCardHeader}>
              <div className={styles.skeletonCell} style={{width: '200px', height: '24px'}}></div>
            </div>
            <div className={styles.tccCardBody}>
              <div className={styles.skeletonCell} style={{width: '100%', height: '300px'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render error message
  const renderError = () => (
    <div className={styles.tccApplicationContainer}>
      <div className={styles.tccDetailsHeader}>
        <button className={styles.tccBackButton} onClick={handleBackToDetails}>
          <FaArrowLeft />
        </button>
        <div>
          <h1 className={styles.tccTitle}>Process TCC Application</h1>
          <p className={styles.tccPageSubtitle}>Error loading application</p>
        </div>
      </div>
      
      <div className={styles.tccInfoCard}>
        <div className={styles.tccCardHeader}>
          <h3 className={styles.tccCardTitle}>
            <FaExclamationTriangle className={styles.tccCardIcon} style={{color: '#EA4335'}} /> Error
          </h3>
        </div>
        <div className={styles.tccCardBody} style={{textAlign: 'center', padding: '40px 20px'}}>
          <h2 style={{color: '#EA4335', marginBottom: '16px'}}>Error Loading Application</h2>
          <p style={{marginBottom: '20px'}}>{error}</p>
          <Button 
            variant="primary" 
            size="md" 
            onClick={fetchApplicationDetails}
            startIcon={<FaHistory />}
          >
            Try Again
          </Button>
          <Button 
            variant="outline" 
            size="md" 
            onClick={handleBackToDetails}
            style={{marginLeft: '12px'}}
          >
            Back to Details
          </Button>
        </div>
      </div>
    </div>
  );

  // Success message component
  const SuccessMessage = () => (
    <div className={`${styles.tccProcessingResult} ${styles.tccSuccessResult}`}>
      <div className={styles.tccResultHeader}>
        <div className={`${styles.tccResultIcon} ${styles.success}`}>
          <FaCheckCircle />
        </div>
        <div>
          <h2 className={styles.tccResultTitle}>
            {processingAction === 'approve' 
              ? 'TCC Application Approved Successfully' 
              : 'TCC Application Rejected'}
          </h2>
          <p className={styles.tccResultSubtitle}>
            {processingAction === 'approve'
              ? 'The Tax Clearance Certificate has been issued successfully'
              : 'The taxpayer will be notified of the rejection'}
          </p>
        </div>
      </div>
      
      <div className={styles.tccResultMessage}>
        {processingAction === 'approve'
          ? `The Tax Clearance Certificate has been issued with TCC Number: ${tccNumber}. The certificate is valid for one year from the issue date.`
          : 'The application has been rejected and the taxpayer will be notified of the rejection reason. They may address the issues and reapply.'}
      </div>
      
      <div className={styles.tccResultDetails}>
        {processingAction === 'approve' && (
          <p><strong>TCC Number:</strong> {tccNumber}<br />
          <strong>Issue Date:</strong> {formatDate(issueDate)}<br />
          <strong>Expiry Date:</strong> {formatDate(expiryDate)}</p>
        )}
      </div>
      
      <div className={styles.tccFormActions} style={{marginTop: '24px'}}>
        <Button 
          variant="outline" 
          size="md" 
          onClick={() => navigate('/dashboard/tcc-application')}
          startIcon={<FaArrowLeft />}
        >
          Back to Applications
        </Button>
        {processingAction === 'approve' && (
          <Button 
            variant="primary" 
            size="md" 
            startIcon={<FaFileAlt />}
          >
            View Certificate
          </Button>
        )}
      </div>
    </div>
  );

  // Error message component
  const ErrorMessage = () => (
    <div className={`${styles.tccProcessingResult} ${styles.tccErrorResult}`}>
      <div className={styles.tccResultHeader}>
        <div className={`${styles.tccResultIcon} ${styles.error}`}>
          <FaExclamationTriangle />
        </div>
        <div>
          <h2 className={styles.tccResultTitle}>Processing Failed</h2>
          <p className={styles.tccResultSubtitle}>
            There was an error processing this application
          </p>
        </div>
      </div>
      
      <div className={styles.tccResultMessage}>
        We encountered an issue while {processingAction === 'approve' ? 'approving' : 'rejecting'} the application. 
        This could be due to a network problem or server issue. Please try again or contact support if the problem persists.
      </div>
      
      <div className={styles.tccFormActions} style={{marginTop: '24px'}}>
        <Button 
          variant="outline" 
          size="md" 
          onClick={() => setProcessingStatus(null)}
          startIcon={<FaArrowLeft />}
        >
          Back to Form
        </Button>
        <Button 
          variant="primary" 
          size="md" 
          onClick={() => handleApprove()}
          startIcon={<FaHistory />}
        >
          Try Again
        </Button>
      </div>
    </div>
  );

  // Render application overview
  const renderOverview = () => (
    <div>
      {/* Workflow Stepper */}
      <div className={styles.tccWorkflowProgressBar}>
        {application.approvalWorkflow.map((stage, index) => {
          const isCompleted = stage.status === 'COMPLETED';
          const isInProgress = stage.status === 'IN_PROGRESS';
          
          return (
            <div 
              key={`stage-${index}`} 
              className={`${styles.tccWorkflowStage} ${isCompleted ? styles.completed : ''} ${isInProgress ? styles.inProgress : ''}`}
            >
              <div className={styles.tccWorkflowStageNumber}>
                {isCompleted ? <FaCheckCircle /> : index + 1}
              </div>
              <div className={styles.tccWorkflowStageName}>{stage.name}</div>
              
              {index < application.approvalWorkflow.length - 1 && (
                <div className={`${styles.tccWorkflowConnector} ${isCompleted ? styles.completed : ''}`}></div>
              )}
            </div>
          );
        })}
      </div>
      
      {/* Current Stage Info */}
      {application.approvalWorkflow.find(stage => stage.status === 'IN_PROGRESS') && (
        <div className={styles.tccCurrentStageInfo}>
          <div className={styles.tccDecisionTitle}>
            <FaClipboardCheck />
            Current Stage: {application.approvalWorkflow.find(stage => stage.status === 'IN_PROGRESS').name}
          </div>
          <div className={styles.tccDetailGrid}>
            <div className={styles.tccDetailRow}>
              <div className={styles.tccDetailCol}>
                <div className={styles.tccFormGroup}>
                  <div className={styles.tccFormLabel}>Assigned Officer</div>
                  <div className={styles.tccFormValue}>
                    <FaUser className={styles.tccMetaIcon} />
                    {application.approvalWorkflow.find(stage => stage.status === 'IN_PROGRESS').officer}
                  </div>
                </div>
              </div>
              <div className={styles.tccDetailCol}>
                <div className={styles.tccFormGroup}>
                  <div className={styles.tccFormLabel}>Role</div>
                  <div className={styles.tccFormValue}>
                    <FaIdCard className={styles.tccMetaIcon} />
                    {application.approvalWorkflow.find(stage => stage.status === 'IN_PROGRESS').role}
                  </div>
                </div>
              </div>
              <div className={styles.tccDetailCol}>
                <div className={styles.tccFormGroup}>
                  <div className={styles.tccFormLabel}>Due Date</div>
                  <div className={styles.tccFormValue}>
                    <FaCalendarAlt className={styles.tccMetaIcon} />
                    {formatDate(application.approvalWorkflow.find(stage => stage.status === 'IN_PROGRESS').dueDate)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Status Summary Cards */}
      <div className={styles.tccStatusSummary}>
        <div className={`${styles.tccStatusCard} ${styles.primary}`}>
          <div className={styles.tccStatusIcon}>
            <FaUser />
          </div>
          <div className={styles.tccStatusInfo}>
            <div className={styles.tccStatusLabel}>Taxpayer</div>
            <div className={styles.tccStatusValue}>{application.taxpayerName}</div>
          </div>
        </div>
        
        <div className={`${styles.tccStatusCard} ${styles.info}`}>
          <div className={styles.tccStatusIcon}>
            <FaIdCard />
          </div>
          <div className={styles.tccStatusInfo}>
            <div className={styles.tccStatusLabel}>TIN Number</div>
            <div className={styles.tccStatusValue}>{application.tin}</div>
          </div>
        </div>
        
        <div className={`${styles.tccStatusCard} ${styles.success}`}>
          <div className={styles.tccStatusIcon}>
            <FaCalendarAlt />
          </div>
          <div className={styles.tccStatusInfo}>
            <div className={styles.tccStatusLabel}>Application Date</div>
            <div className={styles.tccStatusValue}>{formatDate(application.applicationDate)}</div>
          </div>
        </div>
        
        <div className={`${styles.tccStatusCard} ${styles.warning}`}>
          <div className={styles.tccStatusIcon}>
            <FaClipboardList />
          </div>
          <div className={styles.tccStatusInfo}>
            <div className={styles.tccStatusLabel}>Status</div>
            <div className={styles.tccStatusValue}>
              <StatusBadge status={application.status} />
            </div>
          </div>
        </div>
      </div>

      {/* Application Details Card */}
      <Card title="Application Details" icon={<FaFileAlt />} className={styles.tccInfoCard}>
        <div className={styles.tccDetailGrid}>
          <div className={styles.tccDetailRow}>
            <div className={styles.tccDetailCol}>
              <div className={styles.tccFormGroup}>
                <div className={styles.tccFormLabel}>Application Number</div>
                <div className={styles.tccFormValue}>{application.applicationNumber}</div>
              </div>
            </div>
            <div className={styles.tccDetailCol}>
              <div className={styles.tccFormGroup}>
                <div className={styles.tccFormLabel}>Tax Year</div>
                <div className={styles.tccFormValue}>{application.year}</div>
              </div>
            </div>
            <div className={styles.tccDetailCol}>
              <div className={styles.tccFormGroup}>
                <div className={styles.tccFormLabel}>Source of Income</div>
                <div className={styles.tccFormValue}>{application.sourceOfIncome}</div>
              </div>
            </div>
          </div>
          
          <div className={styles.tccDetailRow}>
            <div className={styles.tccDetailCol}>
              <div className={styles.tccFormGroup}>
                <div className={styles.tccFormLabel}>Email</div>
                <div className={styles.tccFormValue}>
                  <FaEnvelope className={styles.tccMetaIcon} /> {application.email}
                </div>
              </div>
            </div>
            <div className={styles.tccDetailCol}>
              <div className={styles.tccFormGroup}>
                <div className={styles.tccFormLabel}>Phone</div>
                <div className={styles.tccFormValue}>
                  <FaPhone className={styles.tccMetaIcon} /> {application.phone}
                </div>
              </div>
            </div>
            <div className={styles.tccDetailCol}>
              <div className={styles.tccFormGroup}>
                <div className={styles.tccFormLabel}>Address</div>
                <div className={styles.tccFormValue}>
                  <FaMapMarkerAlt className={styles.tccMetaIcon} /> {application.address}
                </div>
              </div>
            </div>
          </div>
          
          <div className={styles.tccDetailRow}>
            <div className={styles.tccDetailColWide}>
              <div className={styles.tccFormGroup}>
                <div className={styles.tccFormLabel}>Application Comment</div>
                <div className={styles.tccFormValue}>{application.comment}</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );

  // Render tax payment section
  const renderPayments = () => (
    <div className={styles.tccTabContent}>
      {/* Payment Verification Information */}
      <div className={styles.tccInfoCard} style={{marginBottom: '24px'}}>
        <div className={styles.tccCardHeader}>
          <h3 className={styles.tccCardTitle}>
            <FaInfoCircle className={styles.tccCardIcon} /> Verification Summary
          </h3>
        </div>
        <div className={styles.tccCardBody}>
          <div className={styles.tccVerificationMessage}>
            <FaCheckCircle className={styles.tccVerificationIcon} />
            <p>
              All tax payments have been verified against the Niger State Internal Revenue Service database 
              for the last three years as required by Niger State Tax Law.
            </p>
          </div>
          
          {/* Payment Summary Cards */}
          <div className={styles.tccStatusSummary}>
            <div className={`${styles.tccStatusCard} ${styles.primary}`}>
              <div className={styles.tccStatusIcon}>
                <FaMoneyBillWave />
              </div>
              <div className={styles.tccStatusInfo}>
                <div className={styles.tccStatusLabel}>Total Income</div>
                <div className={styles.tccStatusValue}>
                  {formatCurrency(
                    application.incomeDetails.reduce(
                      (sum, year) => sum + year.annualIncome, 
                      0
                    )
                  )}
                </div>
              </div>
            </div>
            
            <div className={`${styles.tccStatusCard} ${styles.success}`}>
              <div className={styles.tccStatusIcon}>
                <FaReceipt />
              </div>
              <div className={styles.tccStatusInfo}>
                <div className={styles.tccStatusLabel}>Total Tax Paid</div>
                <div className={styles.tccStatusValue}>
                  {formatCurrency(
                    application.incomeDetails.reduce(
                      (sum, year) => sum + year.taxAmount, 
                      0
                    )
                  )}
                </div>
              </div>
            </div>
            
            <div className={`${styles.tccStatusCard} ${styles.info}`}>
              <div className={styles.tccStatusIcon}>
                <FaFileAlt />
              </div>
              <div className={styles.tccStatusInfo}>
                <div className={styles.tccStatusLabel}>Dev Levy Paid</div>
                <div className={styles.tccStatusValue}>
                  {formatCurrency(
                    application.incomeDetails.reduce(
                      (sum, year) => sum + (year.devLevyAmount || 0), 
                      0
                    )
                  )}
                </div>
              </div>
            </div>
            
            <div className={`${styles.tccStatusCard} ${
              application.incomeDetails.some(income => income.outstandingTax > 0) 
                ? styles.danger 
                : styles.success
            }`}>
              <div className={styles.tccStatusIcon}>
                {application.incomeDetails.some(income => income.outstandingTax > 0) 
                  ? <FaExclamationTriangle />
                  : <FaCheckCircle />
                }
              </div>
              <div className={styles.tccStatusInfo}>
                <div className={styles.tccStatusLabel}>Outstanding Tax</div>
                <div className={styles.tccStatusValue}>
                  {application.incomeDetails.some(income => income.outstandingTax > 0) 
                    ? formatCurrency(
                        application.incomeDetails.reduce(
                          (sum, year) => sum + (year.outstandingTax || 0), 
                          0
                        )
                      )
                    : 'None'
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Payment Tabs Navigation */}
      <div className={styles.tccInfoCard}>
        <div className={styles.tccCardHeader}>
          <h3 className={styles.tccCardTitle}>
            <FaMoneyBillWave className={styles.tccCardIcon} /> Tax Payment Records
          </h3>
          
          {/* Tab navigation for payment types */}
          <div className={styles.tccInnerTabs}>
            <button 
              className={`${styles.tccInnerTabButton} ${activePaymentTab === 'income' ? styles.active : ''}`}
              onClick={() => setActivePaymentTab('income')}
            >
              Income Tax
            </button>
            <button 
              className={`${styles.tccInnerTabButton} ${activePaymentTab === 'development' ? styles.active : ''}`}
              onClick={() => setActivePaymentTab('development')}
            >
              Development Levy
            </button>
            <button 
              className={`${styles.tccInnerTabButton} ${activePaymentTab === 'landuse' ? styles.active : ''}`}
              onClick={() => setActivePaymentTab('landuse')}
            >
              Land Use Charge
            </button>
          </div>
        </div>
        
        <div className={styles.tccCardBody}>
          {/* Income Tax Payments Table */}
          {activePaymentTab === 'income' && (
            <div className={styles.tccPaymentTableSection}>
              <div className={styles.tableContainer}>
                <Table>
                  <thead>
                    <tr>
                      <th>Tax Year</th>
                      <th>Annual Income</th>
                      <th>Tax Paid</th>
                      <th>Receipt No.</th>
                      <th>Payment Method</th>
                      <th>Bank</th>
                      <th>Transaction ID</th>
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {application.incomeDetails.map((income, index) => (
                      <tr key={index} className={styles.tccTableRow}>
                        <td>
                          <div className={styles.tccYearCell}>{income.year}</div>
                        </td>
                        <td>{formatCurrency(income.annualIncome)}</td>
                        <td className={styles.tccAmountCell}>
                          {formatCurrency(income.taxAmount)}
                        </td>
                        <td>
                          <div className={styles.tccReceiptBadge}>
                            {income.taxReceiptNo}
                          </div>
                        </td>
                        <td>{formatDate(income.taxReceiptDate)}</td>
                        <td>
                          {income.outstandingTax > 0 
                            ? <span className={styles.tccOutstandingAmount}>{formatCurrency(income.outstandingTax)}</span> 
                            : <span className={styles.tccNoOutstanding}>None</span>
                          }
                        </td>
                        <td>
                          <div className={`${styles.statusBadge} ${styles.badgeApproved}`}>
                            <FaCheckCircle /> Verified
                          </div>
                        </td>
                        <td>
                          <div className={styles.tccTableActions}>
                            <button className={styles.tccTableActionButton} title="Preview Receipt">
                              <FaFileAlt />
                            </button>
                            <button className={styles.tccTableActionButton} title="Download Receipt">
                              <FaDownload />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    <tr className={styles.tccTableSummaryRow}>
                      <td>Total</td>
                      <td>{formatCurrency(application.incomeDetails.reduce((sum, year) => sum + year.annualIncome, 0))}</td>
                      <td className={styles.tccAmountCell}>{formatCurrency(application.incomeDetails.reduce((sum, year) => sum + year.taxAmount, 0))}</td>
                      <td colSpan={3}></td>
                      <td>
                        <div className={`${styles.statusBadge} ${styles.badgeApproved}`}>
                          <FaCheckCircle /> All Verified
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              
              <div className={styles.tccPaymentInfo}>
                <FaInfoCircle className={styles.tccInfoIcon} />
                <p>Income tax payments are verified with Niger State Internal Revenue Service (NSIRS) using the receipt numbers and payment dates. All payments for the last three years have been confirmed.</p>
              </div>
            </div>
          )}
          
          {/* Development Levy Table */}
          {activePaymentTab === 'development' && (
            <div className={styles.tccPaymentTableSection}>
              <div className={styles.tableContainer}>
                <Table>
                  <thead>
                    <tr>
                      <th>Tax Year</th>
                      <th>Amount</th>
                      <th>Receipt No.</th>
                      <th>Receipt Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {application.incomeDetails.map((income, index) => (
                      <tr key={index} className={styles.tccTableRow}>
                        <td>
                          <div className={styles.tccYearCell}>{income.year}</div>
                        </td>
                        <td className={styles.tccAmountCell}>
                          {formatCurrency(income.devLevyAmount || 0)}
                        </td>
                        <td>
                          {income.devLevyReceiptNo ? (
                            <div className={styles.tccReceiptBadge}>
                              {income.devLevyReceiptNo}
                            </div>
                          ) : 'N/A'}
                        </td>
                        <td>{income.devLevyReceiptDate ? formatDate(income.devLevyReceiptDate) : 'N/A'}</td>
                        <td>
                          <div className={`${styles.statusBadge} ${styles.badgeApproved}`}>
                            <FaCheckCircle /> Verified
                          </div>
                        </td>
                        <td>
                          {income.devLevyReceiptNo && (
                            <div className={styles.tccTableActions}>
                              <button className={styles.tccTableActionButton} title="Preview Receipt">
                                <FaFileAlt />
                              </button>
                              <button className={styles.tccTableActionButton} title="Download Receipt">
                                <FaDownload />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    <tr className={styles.tccTableSummaryRow}>
                      <td>Total</td>
                      <td className={styles.tccAmountCell}>
                        {formatCurrency(application.incomeDetails.reduce((sum, year) => sum + (year.devLevyAmount || 0), 0))}
                      </td>
                      <td colSpan={2}></td>
                      <td>
                        <div className={`${styles.statusBadge} ${styles.badgeApproved}`}>
                          <FaCheckCircle /> All Verified
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              
              <div className={styles.tccPaymentNote}>
                <FaInfoCircle className={styles.tccInfoIcon} />
                <div>
                  <strong>Note:</strong> Development Levy is a mandatory payment for all taxpayers in Niger State. 
                  The current rate is ₦100 per annum as stipulated in the Niger State Revenue Administration Law.
                </div>
              </div>
            </div>
          )}
          
          {/* Land Use Charge Table */}
          {activePaymentTab === 'landuse' && (
            <div className={styles.tccPaymentTableSection}>
              <div className={styles.tableContainer}>
                <Table>
                  <thead>
                    <tr>
                      <th>Tax Year</th>
                      <th>Amount</th>
                      <th>Receipt No.</th>
                      <th>Receipt Date</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {application.incomeDetails.map((income, index) => (
                      <tr key={index} className={styles.tccTableRow}>
                        <td>
                          <div className={styles.tccYearCell}>{income.year}</div>
                        </td>
                        <td className={styles.tccAmountCell}>
                          {formatCurrency(income.landUseChargeAmount || 0)}
                        </td>
                        <td>
                          {income.landUseChargeReceiptNo ? (
                            <div className={styles.tccReceiptBadge}>
                              {income.landUseChargeReceiptNo}
                            </div>
                          ) : 'N/A'}
                        </td>
                        <td>{income.landUseChargeReceiptDate ? formatDate(income.landUseChargeReceiptDate) : 'N/A'}</td>
                        <td>
                          <div className={`${styles.statusBadge} ${styles.badgeApproved}`}>
                            <FaCheckCircle /> Verified
                          </div>
                        </td>
                        <td>
                          {income.landUseChargeReceiptNo && (
                            <div className={styles.tccTableActions}>
                              <button className={styles.tccTableActionButton} title="Preview Receipt">
                                <FaFileAlt />
                              </button>
                              <button className={styles.tccTableActionButton} title="Download Receipt">
                                <FaDownload />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    <tr className={styles.tccTableSummaryRow}>
                      <td>Total</td>
                      <td className={styles.tccAmountCell}>
                        {formatCurrency(application.incomeDetails.reduce((sum, year) => sum + (year.landUseChargeAmount || 0), 0))}
                      </td>
                      <td colSpan={2}></td>
                      <td>
                        <div className={`${styles.statusBadge} ${styles.badgeApproved}`}>
                          <FaCheckCircle /> All Verified
                        </div>
                      </td>
                      <td></td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              
              <div className={styles.tccPaymentInfo}>
                <FaInfoCircle className={styles.tccInfoIcon} />
                <p>Land Use Charge payments are applicable to property owners in Niger State. The taxpayer has provided proof of payment for the applicable years.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Tax Compliance Note */}
      <div className={styles.tccInfoCard}>
        <div className={styles.tccCardHeader}>
          <h3 className={styles.tccCardTitle}>
            <FaShieldAlt className={styles.tccCardIcon} /> Tax Compliance Assessment
          </h3>
        </div>
        <div className={styles.tccCardBody}>
          <div className={styles.tccComplianceStatus}>
            <div className={styles.tccComplianceStatusIcon}>
              <FaCheckCircle />
            </div>
            <div className={styles.tccComplianceDetails}>
              <h4 className={styles.tccComplianceTitle}>Fully Compliant</h4>
              <p className={styles.tccComplianceDescription}>
                The taxpayer has fully met all tax obligations for the last three years (2022, 2021, 2020) 
                including income tax, development levy, and applicable land use charges. All payments have 
                been verified against official records.
              </p>
            </div>
          </div>
          
          <div className={styles.tccTaxRecommendation}>
            <FaInfoCircle className={styles.tccRecommendationIcon} />
            <p>
              Based on the verified tax payment history, this application meets the requirements
              for issuance of a Tax Clearance Certificate as stipulated under Section 85 of the 
              Personal Income Tax Act (as amended) and the Niger State Revenue Administration Law.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render documents section
  const renderDocuments = () => (
    <div>
      <div className={styles.tccInnerTabs}>
        <button 
          className={`${styles.tccInnerTabButton} ${activeDocumentCategory === 'all' ? styles.active : ''}`}
          onClick={() => setActiveDocumentCategory('all')}
        >
          All Documents
        </button>
        <button 
          className={`${styles.tccInnerTabButton} ${activeDocumentCategory === 'PAYMENT' ? styles.active : ''}`}
          onClick={() => setActiveDocumentCategory('PAYMENT')}
        >
          Payment Receipts
        </button>
        <button 
          className={`${styles.tccInnerTabButton} ${activeDocumentCategory === 'IDENTITY' ? styles.active : ''}`}
          onClick={() => setActiveDocumentCategory('IDENTITY')}
        >
          Identity Documents
        </button>
        <button 
          className={`${styles.tccInnerTabButton} ${activeDocumentCategory === 'OTHER' ? styles.active : ''}`}
          onClick={() => setActiveDocumentCategory('OTHER')}
        >
          Other Documents
        </button>
      </div>
      
      <div className={styles.tccSectionDescription}>
        Review all uploaded documents to verify the taxpayer's information and tax compliance status.
      </div>
      
      <div className={styles.tccDocumentsGrid}>
        {application.documents
          .filter(doc => activeDocumentCategory === 'all' || doc.type === activeDocumentCategory)
          .map(document => (
            <div key={document.id} className={styles.tccEnhancedDocumentCard}>
              <div className={styles.tccDocumentCardHeader}>
                <div className={styles.tccDocumentTypeInfo}>
                  <div className={styles.tccDocumentTypeIcon}>
                    {document.fileType === 'PDF' ? <FaFilePdf /> : 
                     document.fileType === 'JPEG' || document.fileType === 'PNG' ? <FaImage /> : <FaFile />}
                  </div>
                  <div className={styles.tccDocumentTypeName}>
                    {document.documentType || document.type}
                  </div>
                </div>
                
                <div className={styles.tccVerificationBadge + ' ' + 
                  (document.verificationStatus === 'VERIFIED' ? styles.verified :
                   document.verificationStatus === 'REJECTED' ? styles.rejected : styles.pending)}>
                  {document.verificationStatus || 'PENDING VERIFICATION'}
                </div>
              </div>
              
              <div className={styles.tccDocumentCardBody}>
                <div className={styles.tccDocumentName}>{document.name}</div>
                
                <div className={styles.tccDocumentMetaData}>
                  <div className={styles.tccDocumentMetaItem}>
                    <FaCalendarAlt className={styles.tccDocumentMetaIcon} />
                    Uploaded: {formatDate(document.uploadDate)}
                  </div>
                  
                  <div className={styles.tccDocumentMetaItem}>
                    <FaFile className={styles.tccDocumentMetaIcon} />
                    {document.fileType} • {document.fileSize || 'N/A'}
                  </div>
                  
                  {document.verificationDate && (
                    <div className={styles.tccDocumentMetaItem}>
                      <FaCheckCircle className={styles.tccDocumentMetaIcon} />
                      Verified: {formatDate(document.verificationDate)}
                    </div>
                  )}
                </div>
                
                {document.verificationComment && (
                  <div className={styles.tccDocumentVerificationNote}>
                    <FaInfoCircle className={styles.tccInfoIcon} />
                    <p>{document.verificationComment}</p>
                  </div>
                )}
                
                <div className={styles.tccDocumentCardActions}>
                  <button 
                    className={styles.tccDocumentActionButton}
                    onClick={() => setPreviewDocument(document)}
                  >
                    <FaEye /> View
                  </button>
                  <button className={styles.tccDocumentActionButton}>
                    <FaDownload /> Download
                  </button>
                  {!document.verificationStatus && (
                    <button className={styles.tccDocumentActionButton}>
                      <FaCheckCircle /> Mark as Verified
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
      
      {previewDocument && (
        <div className={styles.tccDocumentPreviewOverlay}>
          <div className={styles.tccDocumentPreviewContainer}>
            <div className={styles.tccDocumentPreviewHeader}>
              <div className={styles.tccDocumentPreviewTitle}>
                {previewDocument.fileType === 'PDF' ? <FaFilePdf style={{marginRight: '8px'}} /> : 
                 previewDocument.fileType === 'JPEG' || previewDocument.fileType === 'PNG' ? <FaImage style={{marginRight: '8px'}} /> : 
                 <FaFile style={{marginRight: '8px'}} />}
                {previewDocument.name}
              </div>
              <button 
                className={styles.tccDocumentPreviewClose}
                onClick={() => setPreviewDocument(null)}
              >
                <FaTimes />
              </button>
            </div>
            
            <div className={styles.tccDocumentPreviewBody}>
              {previewDocument.fileType === 'PDF' ? (
                <div className={styles.tccDocumentPdfPreview}>
                  <FaFilePdf className={styles.tccDocumentPdfIcon} />
                  <div className={styles.tccDocumentPdfMessage}>
                    PDF Document Preview
                  </div>
                  <div className={styles.tccDocumentPdfDetails}>
                    {previewDocument.name} • {previewDocument.fileSize || 'N/A'}
                  </div>
                </div>
              ) : previewDocument.fileType === 'JPEG' || previewDocument.fileType === 'PNG' ? (
                <div className={styles.tccDocumentImagePreview}>
                  <div className={styles.tccDocumentImageContainer}>
                    <img src="#" alt={previewDocument.name} className={styles.tccDocumentImage} />
                  </div>
                </div>
              ) : (
                <div className={styles.tccDocumentPdfPreview}>
                  <FaFile className={styles.tccDocumentImageIcon} />
                  <div className={styles.tccDocumentImageText}>
                    Document Preview Not Available
                  </div>
                </div>
              )}
            </div>
            
            <div className={styles.tccDocumentPreviewFooter}>
              <div className={styles.tccDocumentVerification}>
                {previewDocument.verificationComment && (
                  <div className={styles.tccDocumentVerificationComment}>
                    <FaInfoCircle className={styles.tccInfoIcon} />
                    <p>{previewDocument.verificationComment}</p>
                  </div>
                )}
              </div>
              
              <div className={styles.tccDocumentPreviewActions}>
                <Button variant="primary" startIcon={<FaDownload />}>Download</Button>
                {!previewDocument.verificationStatus && (
                  <Button variant="success" startIcon={<FaCheckCircle />}>Verify Document</Button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Render application history section
  const renderHistory = () => (
    <div className={styles.tccTabContent}>
      <div className={styles.tccInfoCard} style={{marginBottom: '24px'}}>
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
                  {event.status === 'UNDER_REVIEW' && <FaClock />}
                  {event.status === 'SUBMITTED' && <FaFileAlt />}
                </div>
                <div className={styles.tccTimelineContent}>
                  <p className={styles.tccTimelineDate}>{formatDate(event.date)}</p>
                  <h4 className={styles.tccTimelineTitle}>
                    {event.status.replace(/_/g, ' ')}
                  </h4>
                  <p className={styles.tccTimelineDesc}>{event.comment}</p>
                  <p className={styles.tccTimelineActor}>{event.actor}</p>
                </div>
              </div>
            ))}
            
            {/* Projected future events (conditional) */}
            {application.status === 'UNDER_REVIEW' && (
              <>
                <div className={`${styles.tccTimelineItem} ${styles.future}`}>
                  <div className={`${styles.tccTimelineIcon} ${styles.pending}`}>
                    <FaSpinner />
                  </div>
                  <div className={styles.tccTimelineContent}>
                    <h4 className={styles.tccTimelineTitle}>PENDING DECISION</h4>
                    <p className={styles.tccTimelineDesc}>Tax officer to approve or reject application</p>
                    <p className={styles.tccTimelineDate}>Pending</p>
                  </div>
                </div>
                
                <div className={`${styles.tccTimelineItem} ${styles.future}`}>
                  <div className={`${styles.tccTimelineIcon} ${styles.future}`}>
                    <FaCertificate />
                  </div>
                  <div className={styles.tccTimelineContent}>
                    <h4 className={styles.tccTimelineTitle}>TCC ISSUANCE</h4>
                    <p className={styles.tccTimelineDesc}>TCC will be issued if application is approved</p>
                    <p className={styles.tccTimelineDate}>Pending</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Expected Timeline */}
      <div className={styles.tccInfoCard} style={{marginBottom: '24px'}}>
        <div className={styles.tccCardHeader}>
          <h3 className={styles.tccCardTitle}>
            <FaInfoCircle className={styles.tccCardIcon} /> Expected Process Timeline
          </h3>
        </div>
        <div className={styles.tccCardBody}>
          <div className={styles.expectedTimeline}>
            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepDetails}>
                <h5 className={styles.stepTitle}>Application Submission</h5>
                <p className={styles.stepDescription}>Taxpayer submits TCC application with required documents</p>
                <p className={styles.stepTime}>Day 1</p>
              </div>
            </div>
            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepDetails}>
                <h5 className={styles.stepTitle}>Document Verification</h5>
                <p className={styles.stepDescription}>Tax officers verify all submitted documents and payments</p>
                <p className={styles.stepTime}>Days 2-3</p>
              </div>
            </div>
            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepDetails}>
                <h5 className={styles.stepTitle}>Tax Officer Review</h5>
                <p className={styles.stepDescription}>Comprehensive review of taxpayer history and compliance</p>
                <p className={styles.stepTime}>Days 3-5</p>
              </div>
            </div>
            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepDetails}>
                <h5 className={styles.stepTitle}>Final Decision</h5>
                <p className={styles.stepDescription}>Application approval or rejection by authorized officer</p>
                <p className={styles.stepTime}>Days 5-7</p>
              </div>
            </div>
            <div className={styles.timelineStep}>
              <div className={styles.stepNumber}>5</div>
              <div className={styles.stepDetails}>
                <h5 className={styles.stepTitle}>TCC Issuance</h5>
                <p className={styles.stepDescription}>Tax Clearance Certificate generated and made available for download</p>
                <p className={styles.stepTime}>Day 7</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Regulatory Information */}
      <div className={styles.tccInfoCard}>
        <div className={styles.tccCardHeader}>
          <h3 className={styles.tccCardTitle}>
            <FaShieldAlt className={styles.tccCardIcon} /> Regulatory Information
          </h3>
        </div>
        <div className={styles.tccCardBody}>
          <div className={styles.regulatoryDetails}>
            <p>According to Niger State Tax Law (and Section 85 of PITA as amended), Tax Clearance Certificates are valid for a period of one year from the date of issuance. The TCC serves as evidence that the taxpayer has fully settled all tax liabilities for the three years preceding the year of assessment.</p>
            <p>Taxpayers should note that false declarations or provision of misleading information may result in penalties as prescribed under the relevant laws.</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render decision form
  const renderDecisionForm = () => (
    <div>
      <div className={styles.tccDecisionForm}>
        <div className={styles.tccDecisionSection}>
          <div className={styles.tccDecisionTitle}>
            <FaClipboardCheck />
            TCC Application Decision
          </div>
          
          <div className={styles.tccDecisionNote}>
            <p>After reviewing all documents and tax records, please make a decision on this TCC application. If approved, enter the TCC number and dates.</p>
          </div>
          
          {processingAction === 'approve' ? (
            <form onSubmit={handleApprove}>
              <div className={styles.tccFormGrid3}>
                <div className={styles.tccFormField}>
                  <label>
                    TCC Number <span className={styles.required}>*</span>
                  </label>
                  <input
                    type="text"
                    value={tccNumber}
                    onChange={(e) => setTccNumber(e.target.value)}
                    placeholder="Enter TCC Number"
                    className={validationErrors.tccNumber ? styles.error : ''}
                  />
                  {validationErrors.tccNumber && <div className={styles.errorMessage}>{validationErrors.tccNumber}</div>}
                </div>
                
                <div className={styles.tccFormField}>
                  <label>
                    Issue Date <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.dateField}>
                    <FaCalendarAlt className={styles.dateIcon} />
                    <input
                      type="date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className={validationErrors.issueDate ? styles.error : ''}
                    />
                  </div>
                  {validationErrors.issueDate && <div className={styles.errorMessage}>{validationErrors.issueDate}</div>}
                </div>
                
                <div className={styles.tccFormField}>
                  <label>
                    Expiry Date <span className={styles.required}>*</span>
                  </label>
                  <div className={styles.dateField}>
                    <FaCalendarAlt className={styles.dateIcon} />
                    <input
                      type="date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className={validationErrors.expiryDate ? styles.error : ''}
                    />
                  </div>
                  {validationErrors.expiryDate && <div className={styles.errorMessage}>{validationErrors.expiryDate}</div>}
                  <div className={styles.fieldHint}>One year validity period from issue date</div>
                </div>
              </div>
              
              <div className={styles.tccFormField}>
                <label>Officer Comments</label>
                <textarea
                  value={officerComment}
                  onChange={(e) => setOfficerComment(e.target.value)}
                  placeholder="Add any additional notes about this application"
                  rows={4}
                />
              </div>
              
              <div className={styles.tccApprovalDisclaimer}>
                <FaInfoCircle className={styles.disclaimerIcon} />
                <p>
                  By approving this application, you confirm that the taxpayer has met all requirements 
                  for a Tax Clearance Certificate and has no outstanding tax liabilities in Niger State 
                  for the years covered by this application.
                </p>
              </div>
              
              <div className={styles.tccDecisionActions}>
                <Button 
                  type="button"
                  variant="tertiary"
                  startIcon={<FaTimesCircle />}
                  onClick={() => setProcessingAction('reject')}
                >
                  Switch to Rejection
                </Button>
                
                <Button 
                  type="submit"
                  variant="success"
                  startIcon={isSubmitting ? <FaSpinner className={styles.spinner} /> : <FaCheckCircle />}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Approve Application'}
                </Button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleReject}>
              <div className={styles.tccFormField}>
                <label>
                  Rejection Reason <span className={styles.required}>*</span>
                </label>
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="Provide detailed reason for rejection"
                  rows={4}
                  className={validationErrors.rejectionReason ? styles.error : ''}
                />
                {validationErrors.rejectionReason && (
                  <div className={styles.errorMessage}>{validationErrors.rejectionReason}</div>
                )}
              </div>
              
              <div className={styles.tccRejectionOptions}>
                <label>Rejection Categories (Select all that apply)</label>
                <div className={styles.tccOptionCheckboxes}>
                  <div className={styles.tccCheckboxItem}>
                    <input type="checkbox" id="incomplete-docs" className={styles.tccCheckbox} />
                    <label htmlFor="incomplete-docs" className={styles.tccCheckboxLabel}>Incomplete Documentation</label>
                  </div>
                  <div className={styles.tccCheckboxItem}>
                    <input type="checkbox" id="outstanding-tax" className={styles.tccCheckbox} />
                    <label htmlFor="outstanding-tax" className={styles.tccCheckboxLabel}>Outstanding Tax Liabilities</label>
                  </div>
                  <div className={styles.tccCheckboxItem}>
                    <input type="checkbox" id="invalid-info" className={styles.tccCheckbox} />
                    <label htmlFor="invalid-info" className={styles.tccCheckboxLabel}>Invalid Information</label>
                  </div>
                  <div className={styles.tccCheckboxItem}>
                    <input type="checkbox" id="verification-failed" className={styles.tccCheckbox} />
                    <label htmlFor="verification-failed" className={styles.tccCheckboxLabel}>Verification Failed</label>
                  </div>
                </div>
              </div>
              
              <div className={styles.tccRejectionDisclaimer}>
                <FaExclamationTriangle className={styles.disclaimerIcon} />
                <p>
                  Rejecting this application will notify the taxpayer. Please provide clear reasons 
                  and instructions on what the taxpayer needs to do to rectify the issues.
                </p>
              </div>
              
              <div className={styles.tccDecisionActions}>
                <Button 
                  type="button"
                  variant="tertiary"
                  startIcon={<FaCheckCircle />}
                  onClick={() => setProcessingAction('approve')}
                >
                  Switch to Approval
                </Button>
                
                <Button 
                  type="submit"
                  variant="danger"
                  startIcon={isSubmitting ? <FaSpinner className={styles.spinner} /> : <FaTimesCircle />}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Processing...' : 'Reject Application'}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
  
  // Main render
  if (loading) {
    return renderSkeleton();
  }
  
  if (error) {
    return renderError();
  }
  
  if (processingStatus) {
    return (
      <div className={styles.tccApplicationContainer}>
        <div className={styles.tccDetailsHeader}>
          <div className={styles.tccHeaderLeft}>
            <button className={styles.tccBackButton} onClick={handleBackToDetails}>
              <FaArrowLeft />
            </button>
            <div className={styles.tccBreadcrumb}>
              <span className={styles.breadcrumbItem}><FaHome /> Dashboard</span>
              <FaChevronRight className={styles.breadcrumbSeparator} />
              <span className={styles.breadcrumbItem}>TCC Applications</span>
              <FaChevronRight className={styles.breadcrumbSeparator} />
              <span className={`${styles.breadcrumbItem} ${styles.current}`}>Process</span>
            </div>
          </div>
        </div>
        
        <div className={styles.tccPageTitleSection}>
          <h1 className={styles.tccTitle}>Process TCC Application</h1>
          <div className={styles.tccApplicationMeta}>
            <div className={styles.tccMetaItem}>
              <FaTags className={styles.tccMetaIcon} />
              <span className={styles.tccMetaLabel}>Reference:</span>
              <span className={styles.tccMetaValue}>{application.applicationNumber}</span>
            </div>
            <div className={styles.tccMetaItem}>
              <FaUser className={styles.tccMetaIcon} />
              <span className={styles.tccMetaValue}>{application.taxpayerName}</span>
            </div>
            <div className={styles.tccMetaItem}>
              <FaCalendarAlt className={styles.tccMetaIcon} />
              <span className={styles.tccMetaLabel}>Submitted:</span>
              <span className={styles.tccMetaValue}>{formatDate(application.applicationDate)}</span>
            </div>
          </div>
        </div>
        
        <div className={styles.tccInfoCard}>
          <div className={styles.tccCardBody}>
            {processingStatus === 'success' ? <SuccessMessage /> : <ErrorMessage />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.tccApplicationContainer}>
      {/* Enhanced Header with Breadcrumbs */}
      <div className={styles.tccDetailsHeader}>
        <div className={styles.tccHeaderLeft}>
          <button className={styles.tccBackButton} onClick={handleBackToDetails}>
            <FaArrowLeft />
          </button>
          <div className={styles.tccBreadcrumb}>
            <span className={styles.breadcrumbItem}><FaHome /> Dashboard</span>
            <FaChevronRight className={styles.breadcrumbSeparator} />
            <span className={styles.breadcrumbItem}>TCC Applications</span>
            <FaChevronRight className={styles.breadcrumbSeparator} />
            <span className={styles.breadcrumbItem}>Application {application.applicationNumber}</span>
            <FaChevronRight className={styles.breadcrumbSeparator} />
            <span className={`${styles.breadcrumbItem} ${styles.current}`}>Process</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Title Section */}
      <div className={styles.tccPageTitleSection}>
        <h1 className={styles.tccTitle}>Process TCC Application</h1>
        <div className={styles.tccApplicationMeta}>
          <div className={styles.tccMetaItem}>
            <FaTags className={styles.tccMetaIcon} />
            <span className={styles.tccMetaLabel}>Reference:</span>
            <span className={styles.tccMetaValue}>{application.applicationNumber}</span>
          </div>
          <div className={styles.tccMetaItem}>
            <FaUser className={styles.tccMetaIcon} />
            <span className={styles.tccMetaValue}>{application.taxpayerName}</span>
          </div>
          <div className={styles.tccMetaItem}>
            <FaCalendarAlt className={styles.tccMetaIcon} />
            <span className={styles.tccMetaLabel}>Submitted:</span>
            <span className={styles.tccMetaValue}>{formatDate(application.applicationDate)}</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Status Summary Cards with mobile responsiveness */}
      <div className={styles.tccStatusSummary}>
        <div className={`${styles.tccStatusCard} ${
          application.status === 'APPROVED' ? styles.success : 
          application.status === 'REJECTED' ? styles.danger : 
          application.status === 'UNDER_REVIEW' ? styles.warning : 
          styles.primary
        }`}>
          <div className={styles.tccStatusIcon}>
            {application.status === 'APPROVED' && <FaCheckCircle />}
            {application.status === 'REJECTED' && <FaTimesCircle />}
            {application.status === 'UNDER_REVIEW' && <FaClock />}
            {application.status === 'SUBMITTED' && <FaFileAlt />}
          </div>
          <div className={styles.tccStatusInfo}>
            <div className={styles.tccStatusLabel}>Status</div>
            <div className={styles.tccStatusValue}>
              <StatusBadge status={application.status} />
            </div>
          </div>
        </div>
        
        <div className={`${styles.tccStatusCard} ${styles.primary}`}>
          <div className={styles.tccStatusIcon}>
            <FaCalendarAlt />
          </div>
          <div className={styles.tccStatusInfo}>
            <div className={styles.tccStatusLabel}>Application Date</div>
            <div className={styles.tccStatusValue}>{formatDate(application.applicationDate)}</div>
          </div>
        </div>
        
        <div className={`${styles.tccStatusCard} ${styles.primary}`}>
          <div className={styles.tccStatusIcon}>
            <FaUser />
          </div>
          <div className={styles.tccStatusInfo}>
            <div className={styles.tccStatusLabel}>Taxpayer Type</div>
            <div className={styles.tccStatusValue}>{application.taxPayerType}</div>
          </div>
        </div>
        
        <div className={`${styles.tccStatusCard} ${styles.primary}`}>
          <div className={styles.tccStatusIcon}>
            <FaCalendarAlt />
          </div>
          <div className={styles.tccStatusInfo}>
            <div className={styles.tccStatusLabel}>Tax Year</div>
            <div className={styles.tccStatusValue}>{application.year}</div>
          </div>
        </div>
      </div>
      
      <div className={styles.tccProcessLayout}>
        {/* Sidebar with tab navigation */}
        <div className={styles.tccProcessSidebar}>
          <div className={styles.tccInfoCard}>
            <div className={styles.tccCardBody}>
              <button 
                className={`${styles.tccTabButton} ${activeTab === 'overview' ? styles.active : ''}`}
                onClick={() => handleTabChange('overview')}
              >
                <FaUser /> Application Overview
              </button>
              <button 
                className={`${styles.tccTabButton} ${activeTab === 'payments' ? styles.active : ''}`}
                onClick={() => handleTabChange('payments')}
              >
                <FaReceipt /> Payment Verification
              </button>
              <button 
                className={`${styles.tccTabButton} ${activeTab === 'documents' ? styles.active : ''}`}
                onClick={() => handleTabChange('documents')}
              >
                <FaFileContract /> Document Verification
              </button>
              <button 
                className={`${styles.tccTabButton} ${activeTab === 'history' ? styles.active : ''}`}
                onClick={() => handleTabChange('history')}
              >
                <FaHistory /> Application History
              </button>
              <button 
                className={`${styles.tccTabButton} ${activeTab === 'decision' ? styles.active : ''}`}
                onClick={() => handleTabChange('decision')}
              >
                <FaClipboardCheck /> Application Decision
              </button>
            </div>
          </div>
          
          {/* Mobile Selector for Responsive Design */}
          <div className={styles.tccMobileTabSelector}>
            <select 
              value={activeTab} 
              onChange={(e) => handleTabChange(e.target.value)}
              className={styles.tccMobileTabSelect}
            >
              <option value="overview">Application Overview</option>
              <option value="payments">Payment Verification</option>
              <option value="documents">Document Verification</option>
              <option value="history">Application History</option>
              <option value="decision">Application Decision</option>
            </select>
            <div className={styles.tccMobileTabSelectIcon}>
              <FaChevronRight />
            </div>
          </div>
        </div>
        
        <div className={styles.tccProcessContent}>
          <div className={styles.tccInfoCard}>
            <div className={styles.tccCardHeader}>
              <h3 className={styles.tccCardTitle}>
                {activeTab === 'overview' && <><FaUser className={styles.tccCardIcon} /> Application Overview</>}
                {activeTab === 'payments' && <><FaReceipt className={styles.tccCardIcon} /> Payment Verification</>}
                {activeTab === 'documents' && <><FaFileContract className={styles.tccCardIcon} /> Document Verification</>}
                {activeTab === 'history' && <><FaHistory className={styles.tccCardIcon} /> Application History</>}
                {activeTab === 'decision' && <><FaClipboardCheck className={styles.tccCardIcon} /> Application Decision</>}
              </h3>
            </div>
            <div className={styles.tccCardBody}>
              {activeTab === 'overview' && renderOverview()}
              {activeTab === 'payments' && renderPayments()}
              {activeTab === 'documents' && renderDocuments()}
              {activeTab === 'history' && renderHistory()}
              {activeTab === 'decision' && renderDecisionForm()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TCCApplicationProcess; 