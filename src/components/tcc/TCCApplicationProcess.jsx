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
  FaSearch
} from 'react-icons/fa';
import './TCC.css';

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
        status: 'SUBMITTED',
        sourceOfIncome: 'EMPLOYMENT',
        platformPayment: 'Y',
        comment: 'Application for tax clearance certificate for 2023',
        taxPayerType: 'Individual',
        primaryLGA: 'Chanchaga',
        address: '15 Ibrahim Taiwo Road, Minna, Niger State',
        occupation: 'Civil Servant',
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
            verificationComment: 'All tax payments verified against NSIRS records'
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
            verificationComment: 'Confirmed payments with tax authorities'
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
            verificationComment: 'All payments reconciled with records'
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
            comment: 'Document verification completed. All documents are in order.',
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

  const handleApprove = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessingStatus('success');
    } catch (error) {
      setProcessingStatus('error');
      console.error('Error approving TCC application:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProcessingStatus('success');
    } catch (error) {
      setProcessingStatus('error');
      console.error('Error rejecting TCC application:', error);
    } finally {
      setIsSubmitting(false);
    }
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
    let badgeClass = 'status-badge ';
    let icon = null;
    
    switch (status) {
      case 'APPROVED':
        badgeClass += 'badge-approved';
        icon = <FaCheckCircle />;
        break;
      case 'REJECTED':
        badgeClass += 'badge-rejected';
        icon = <FaTimesCircle />;
        break;
      case 'SUBMITTED':
        badgeClass += 'badge-submitted';
        icon = <FaFileAlt />;
        break;
      case 'UNDER_REVIEW':
        badgeClass += 'badge-under-review';
        icon = <FaClock />;
        break;
      default:
        badgeClass += 'badge-default';
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
    <div className="tcc-application-container">
      <div className="tcc-details-header">
        <div className="skeleton-cell" style={{width: '40px', height: '40px', borderRadius: '8px'}}></div>
        <div>
          <div className="skeleton-cell" style={{width: '300px', height: '32px', marginBottom: '8px'}}></div>
          <div className="skeleton-cell" style={{width: '200px', height: '18px'}}></div>
        </div>
      </div>
      
      <div className="tcc-process-layout">
        <div className="tcc-process-sidebar">
          <div className="tcc-info-card">
            <div className="tcc-card-body">
              <div className="skeleton-cell" style={{width: '100%', height: '40px', marginBottom: '12px'}}></div>
              <div className="skeleton-cell" style={{width: '100%', height: '40px', marginBottom: '12px'}}></div>
              <div className="skeleton-cell" style={{width: '100%', height: '40px', marginBottom: '12px'}}></div>
              <div className="skeleton-cell" style={{width: '100%', height: '40px', marginBottom: '12px'}}></div>
              <div className="skeleton-cell" style={{width: '100%', height: '40px'}}></div>
            </div>
          </div>
        </div>
        <div className="tcc-process-content">
          <div className="tcc-info-card">
            <div className="tcc-card-header">
              <div className="skeleton-cell" style={{width: '200px', height: '24px'}}></div>
            </div>
            <div className="tcc-card-body">
              <div className="skeleton-cell" style={{width: '100%', height: '300px'}}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render error message
  const renderError = () => (
    <div className="tcc-application-container">
      <div className="tcc-details-header">
        <button className="tcc-back-button" onClick={handleBackToDetails}>
          <FaArrowLeft />
        </button>
        <div className="tcc-header-content">
          <h1 className="tcc-title">Process TCC Application</h1>
          <p className="tcc-subtitle">Error loading application</p>
        </div>
      </div>
      
      <div className="tcc-info-card">
        <div className="tcc-card-header">
          <h3 className="tcc-card-title">
            <FaExclamationTriangle className="tcc-card-icon" style={{color: '#EA4335'}} /> Error
          </h3>
        </div>
        <div className="tcc-card-body" style={{textAlign: 'center', padding: '40px 20px'}}>
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
    <div className="tcc-processing-result tcc-success-result">
      <div className="tcc-result-header">
        <div className="tcc-result-icon success">
          <FaCheckCircle />
        </div>
        <div>
          <h2 className="tcc-result-title">
            {processingAction === 'approve' 
              ? 'TCC Application Approved Successfully' 
              : 'TCC Application Rejected'}
          </h2>
          <p className="tcc-result-subtitle">
            {processingAction === 'approve'
              ? 'The Tax Clearance Certificate has been issued successfully'
              : 'The taxpayer will be notified of the rejection'}
          </p>
        </div>
      </div>
      
      <div className="tcc-result-message">
        {processingAction === 'approve'
          ? `The Tax Clearance Certificate has been issued with TCC Number: ${tccNumber}. The certificate is valid for one year from the issue date.`
          : 'The application has been rejected and the taxpayer will be notified of the rejection reason. They may address the issues and reapply.'}
      </div>
      
      <div className="tcc-result-details">
        {processingAction === 'approve' && (
          <p><strong>TCC Number:</strong> {tccNumber}<br />
          <strong>Issue Date:</strong> {formatDate(issueDate)}<br />
          <strong>Expiry Date:</strong> {formatDate(expiryDate)}</p>
        )}
      </div>
      
      <div className="tcc-form-actions" style={{marginTop: '24px'}}>
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
    <div className="tcc-processing-result tcc-error-result">
      <div className="tcc-result-header">
        <div className="tcc-result-icon error">
          <FaExclamationTriangle />
        </div>
        <div>
          <h2 className="tcc-result-title">Processing Failed</h2>
          <p className="tcc-result-subtitle">
            There was an error processing this application
          </p>
        </div>
      </div>
      
      <div className="tcc-result-message">
        We encountered an issue while {processingAction === 'approve' ? 'approving' : 'rejecting'} the application. 
        This could be due to a network problem or server issue. Please try again or contact support if the problem persists.
      </div>
      
      <div className="tcc-form-actions" style={{marginTop: '24px'}}>
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
    <div className="tcc-overview-section">
      <div className="section-header">
        <div className="section-title-wrapper">
          <h3 className="section-title">
            <FaUser className="section-icon" /> Application Overview
          </h3>
        </div>
      </div>
      
      <div className="tcc-detail-grid">
        <div className="tcc-detail-row">
          <div className="tcc-detail-col">
            <div className="tcc-form-group">
              <div className="tcc-form-label">Application Number</div>
              <div className="tcc-form-value highlight">{application.applicationNumber}</div>
            </div>
          </div>
          <div className="tcc-detail-col">
            <div className="tcc-form-group">
              <div className="tcc-form-label">Application Date</div>
              <div className="tcc-form-value">{formatDate(application.applicationDate)}</div>
            </div>
          </div>
          <div className="tcc-detail-col">
            <div className="tcc-form-group">
              <div className="tcc-form-label">Application Status</div>
              <div className="tcc-form-value"><StatusBadge status={application.status} /></div>
            </div>
          </div>
        </div>
        
        <div className="tcc-detail-row">
          <div className="tcc-detail-col">
            <div className="tcc-form-group">
              <div className="tcc-form-label">Tax Year</div>
              <div className="tcc-form-value">{application.year}</div>
            </div>
          </div>
          <div className="tcc-detail-col">
            <div className="tcc-form-group">
              <div className="tcc-form-label">Source of Income</div>
              <div className="tcc-form-value">{application.sourceOfIncome.replace(/_/g, ' ')}</div>
            </div>
          </div>
          <div className="tcc-detail-col">
            <div className="tcc-form-group">
              <div className="tcc-form-label">Platform Payment</div>
              <div className="tcc-form-value">{application.platformPayment === 'Y' ? 'Yes' : 'No'}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="tcc-info-card">
        <div className="tcc-card-header">
          <h3 className="tcc-card-title">
            <FaIdCard className="tcc-card-icon" /> Taxpayer Information
          </h3>
        </div>
        <div className="tcc-card-body">
          <div className="tcc-detail-grid">
            <div className="tcc-detail-row">
              <div className="tcc-detail-col">
                <div className="tcc-form-group">
                  <div className="tcc-form-label">Taxpayer Name</div>
                  <div className="tcc-form-value">{application.taxpayerName}</div>
                </div>
              </div>
              <div className="tcc-detail-col">
                <div className="tcc-form-group">
                  <div className="tcc-form-label">TIN</div>
                  <div className="tcc-form-value">{application.tin}</div>
                </div>
              </div>
              <div className="tcc-detail-col">
                <div className="tcc-form-group">
                  <div className="tcc-form-label">Taxpayer Type</div>
                  <div className="tcc-form-value">{application.taxPayerType}</div>
                </div>
              </div>
            </div>
            
            <div className="tcc-detail-row">
              <div className="tcc-detail-col">
                <div className="tcc-form-group">
                  <div className="tcc-form-label">Email</div>
                  <div className="tcc-form-value">{application.email}</div>
                </div>
              </div>
              <div className="tcc-detail-col">
                <div className="tcc-form-group">
                  <div className="tcc-form-label">Phone</div>
                  <div className="tcc-form-value">{application.phone}</div>
                </div>
              </div>
              <div className="tcc-detail-col">
                <div className="tcc-form-group">
                  <div className="tcc-form-label">Occupation</div>
                  <div className="tcc-form-value">{application.occupation}</div>
                </div>
              </div>
            </div>
            
            <div className="tcc-detail-row">
              <div className="tcc-detail-col-wide">
                <div className="tcc-form-group">
                  <div className="tcc-form-label">Address</div>
                  <div className="tcc-form-value">{application.address}</div>
                </div>
              </div>
              <div className="tcc-detail-col">
                <div className="tcc-form-group">
                  <div className="tcc-form-label">Primary LGA</div>
                  <div className="tcc-form-value">{application.primaryLGA}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {application.comment && (
        <div className="tcc-info-card">
          <div className="tcc-card-header">
            <h3 className="tcc-card-title">
              <FaCommentAlt className="tcc-card-icon" /> Applicant Comment
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
  );

  // Render tax payment section
  const renderPayments = () => (
    <div className="tcc-payments-section">
      <div className="section-header">
        <div className="section-title-wrapper">
          <h3 className="section-title">
            <FaReceipt className="section-icon" /> Tax Payment Verification
          </h3>
        </div>
      </div>
      
      <div className="tcc-info-card">
        <div className="tcc-card-header">
          <h3 className="tcc-card-title">
            <FaInfoCircle className="tcc-card-icon" /> Verification Information
          </h3>
        </div>
        <div className="tcc-card-body">
          <p className="info-text">
            Review of tax payments for the last three years as required by Niger State Tax Law. All payments have been verified against the Niger State Internal Revenue Service database.
          </p>
        </div>
      </div>
      
      {/* PAYE/Direct Assessment Tax Data */}
      <div className="tcc-info-card">
        <div className="tcc-card-header">
          <h3 className="tcc-card-title">
            <FaMoneyBillWave className="tcc-card-icon" /> Income Tax Payments
          </h3>
        </div>
        <div className="tcc-card-body">
          <div className="tcc-table-container">
            <Table>
              <thead>
                <tr>
                  <th>Tax Year</th>
                  <th>Annual Income</th>
                  <th>Tax Paid</th>
                  <th>Receipt No.</th>
                  <th>Receipt Date</th>
                  <th>Outstanding</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {application.incomeDetails.map((income, index) => (
                  <tr key={index}>
                    <td>{income.year}</td>
                    <td>{formatCurrency(income.annualIncome)}</td>
                    <td>{formatCurrency(income.taxAmount)}</td>
                    <td>{income.taxReceiptNo}</td>
                    <td>{formatDate(income.taxReceiptDate)}</td>
                    <td>
                      {income.outstandingTax > 0 
                        ? formatCurrency(income.outstandingTax) 
                        : <span className="no-outstanding">None</span>}
                    </td>
                    <td>
                      <div className="verification-status">
                        <span className="verification-badge verified">
                          <FaCheckCircle /> Verified
                        </span>
                      </div>
                    </td>
                    <td>
                      <button className="icon-button preview-button" title="Preview Receipt">
                        <FaFileAlt /> Preview
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      
      {/* Development Levy Data */}
      <div className="tcc-info-card">
        <div className="tcc-card-header">
          <h3 className="tcc-card-title">
            <FaReceipt className="tcc-card-icon" /> Development Levy Payments
          </h3>
        </div>
        <div className="tcc-card-body">
          <div className="tcc-table-container">
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
                  <tr key={index}>
                    <td>{income.year}</td>
                    <td>{formatCurrency(income.devLevyAmount || 0)}</td>
                    <td>{income.devLevyReceiptNo || 'N/A'}</td>
                    <td>{income.devLevyReceiptDate ? formatDate(income.devLevyReceiptDate) : 'N/A'}</td>
                    <td>
                      <div className="verification-status">
                        <span className="verification-badge verified">
                          <FaCheckCircle /> Verified
                        </span>
                      </div>
                    </td>
                    <td>
                      {income.devLevyReceiptNo && (
                        <button className="icon-button preview-button" title="Preview Receipt">
                          <FaFileAlt /> Preview
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      
      {/* Land Use Charge Data */}
      <div className="tcc-info-card">
        <div className="tcc-card-header">
          <h3 className="tcc-card-title">
            <FaReceipt className="tcc-card-icon" /> Land Use Charge Payments
          </h3>
        </div>
        <div className="tcc-card-body">
          <div className="tcc-table-container">
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
                  <tr key={index}>
                    <td>{income.year}</td>
                    <td>{formatCurrency(income.landUseChargeAmount || 0)}</td>
                    <td>{income.landUseChargeReceiptNo || 'N/A'}</td>
                    <td>{income.landUseChargeReceiptDate ? formatDate(income.landUseChargeReceiptDate) : 'N/A'}</td>
                    <td>
                      <div className="verification-status">
                        <span className="verification-badge verified">
                          <FaCheckCircle /> Verified
                        </span>
                      </div>
                    </td>
                    <td>
                      {income.landUseChargeReceiptNo && (
                        <button className="icon-button preview-button" title="Preview Receipt">
                          <FaFileAlt /> Preview
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );

  // Render documents section
  const renderDocuments = () => (
    <div className="tcc-documents-section">
      <div className="section-header">
        <div className="section-title-wrapper">
          <h3 className="section-title">
            <FaFileContract className="section-icon" /> Document Verification
          </h3>
        </div>
      </div>
      
      <div className="tcc-info-card">
        <div className="tcc-card-header">
          <h3 className="tcc-card-title">
            <FaInfoCircle className="tcc-card-icon" /> Verification Information
          </h3>
        </div>
        <div className="tcc-card-body">
          <p className="info-text">
            The following supporting documents have been submitted by the taxpayer and verified for authenticity and compliance with Niger State TCC requirements.
          </p>
        </div>
      </div>
      
      {/* Document verification summary card */}
      <div className="document-verification-summary">
        <div className="summary-card">
          <div className="summary-card-count">{application.documents.length}</div>
          <div className="summary-card-text">
            <h4>Total Documents</h4>
            <p>All documents verified</p>
          </div>
          <div className="summary-card-icon">
            <FaFileAlt />
          </div>
        </div>
      </div>
      
      {/* Documents Table View */}
      <div className="document-table-container">
        <h4 className="tcc-section-subtitle">All Documents</h4>
        <div className="tcc-table-container">
          <Table>
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Document Type</th>
                <th>Format</th>
                <th>Uploaded On</th>
                <th>Size</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {application.documents.map((doc, index) => (
                <tr key={index}>
                  <td>{doc.name}</td>
                  <td>{doc.documentType}</td>
                  <td>{doc.fileType}</td>
                  <td>{formatDate(doc.uploadDate)}</td>
                  <td>{doc.fileSize}</td>
                  <td>
                    <div className="verification-status">
                      <span className="verification-badge verified">
                        <FaCheckCircle /> Verified
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="document-actions">
                      <button className="icon-button preview-button" title="View Document">
                        <FaEye /> View
                      </button>
                      <button className="icon-button download-button" title="Download Document">
                        <FaDownload />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      
      {/* Document Categories in Cards View */}
      <div className="document-categories-container">
        <h4 className="tcc-section-subtitle">Documents by Category</h4>
        
        <div className="document-categories-tabs">
          <button className="document-category-tab active">All</button>
          <button className="document-category-tab">Payment Evidence</button>
          <button className="document-category-tab">Identity</button>
          <button className="document-category-tab">Employment</button>
        </div>
        
        <div className="document-cards-grid">
          {application.documents.map((doc, index) => (
            <div key={index} className="document-card">
              <div className="document-card-header">
                <div className="document-card-type">
                  {doc.documentType === 'PAYE' && <FaReceipt className="doc-type-icon payment" />}
                  {doc.documentType === 'EVIDENCE' && <FaFileAlt className="doc-type-icon evidence" />}
                  {doc.documentType === 'IDENTITY' && <FaIdCard className="doc-type-icon identity" />}
                  <span className="document-type-label">{doc.documentType}</span>
                </div>
                <div className="document-card-status verified">
                  <FaCheckCircle /> Verified
                </div>
              </div>
              
              <div className="document-card-body">
                <h5 className="document-card-title">{doc.name}</h5>
                <p className="document-card-meta">
                  <span className="meta-item"><FaFile /> {doc.fileType}</span>
                  <span className="meta-item"><FaWeight /> {doc.fileSize}</span>
                  <span className="meta-item"><FaCalendarAlt /> {formatDate(doc.uploadDate)}</span>
                </p>
                <p className="document-card-comment">{doc.verificationComment}</p>
              </div>
              
              <div className="document-card-footer">
                <button className="btn btn-sm btn-primary">
                  <FaEye /> View Document
                </button>
                <button className="btn btn-sm btn-outline">
                  <FaDownload /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Document Requirements Checklist */}
      <div className="document-requirements">
        <h4 className="tcc-section-subtitle">Document Requirements Checklist</h4>
        <div className="requirements-checklist">
          <div className="requirement-item complete">
            <FaCheckCircle className="requirement-icon" />
            <div className="requirement-details">
              <h5 className="requirement-title">Tax Payment Receipts (Last 3 Years)</h5>
              <p className="requirement-description">Evidence of payments for the past three years</p>
            </div>
          </div>
          <div className="requirement-item complete">
            <FaCheckCircle className="requirement-icon" />
            <div className="requirement-details">
              <h5 className="requirement-title">Development Levy Receipts</h5>
              <p className="requirement-description">Proof of required levy payments</p>
            </div>
          </div>
          <div className="requirement-item complete">
            <FaCheckCircle className="requirement-icon" />
            <div className="requirement-details">
              <h5 className="requirement-title">Identification Document</h5>
              <p className="requirement-description">Valid government-issued photo identification</p>
            </div>
          </div>
          <div className="requirement-item complete">
            <FaCheckCircle className="requirement-icon" />
            <div className="requirement-details">
              <h5 className="requirement-title">Proof of Income Source</h5>
              <p className="requirement-description">Employment letter or other income verification</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="verification-summary">
        <div className="verification-message">
          <FaInfoCircle className="info-icon" />
          <p>All supporting documents have been verified and are in order. The taxpayer has submitted all required documentation according to Niger State TCC regulations (Section 85 of Personal Income Tax Act as amended).</p>
        </div>
      </div>
      
      {/* Officer Review Notes */}
      <div className="verification-notes">
        <h4 className="tcc-section-subtitle">Document Review Notes</h4>
        {application.reviewNotes && application.reviewNotes.map((note, index) => (
          <div key={index} className="verification-note-item">
            <div className="verification-note-date">{formatDate(note.date)}</div>
            <div className="verification-note-content">
              <p>{note.note}</p>
              <div className="verification-note-meta">
                <span>By: {note.officer}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render application history section
  const renderHistory = () => (
    <div className="tcc-history-section">
      <div className="section-header">
        <div className="section-title-wrapper">
          <h3 className="section-title">
            <FaHistory className="section-icon" /> Application History
          </h3>
        </div>
      </div>
      
      <div className="tcc-timeline">
        {application.timeline.map((event, index) => (
          <div key={index} className="tcc-timeline-item">
            <div className={`tcc-timeline-icon ${event.status.toLowerCase()}`}>
              {event.status === 'APPROVED' && <FaCheckCircle />}
              {event.status === 'REJECTED' && <FaTimesCircle />}
              {event.status === 'UNDER_REVIEW' && <FaClock />}
              {event.status === 'SUBMITTED' && <FaFileAlt />}
            </div>
            <div className="tcc-timeline-content">
              <p className="tcc-timeline-date">{formatDate(event.date)}</p>
              <h4 className="tcc-timeline-title">
                {event.status.replace(/_/g, ' ')}
              </h4>
              <p className="tcc-timeline-desc">{event.comment}</p>
              <p className="tcc-timeline-actor">{event.actor}</p>
            </div>
          </div>
        ))}
        
        {/* Projected future events (conditional) */}
        {application.status === 'UNDER_REVIEW' && (
          <>
            <div className="tcc-timeline-item future">
              <div className="tcc-timeline-icon pending">
                <FaSpinner />
              </div>
              <div className="tcc-timeline-content">
                <h4 className="tcc-timeline-title">PENDING DECISION</h4>
                <p className="tcc-timeline-desc">Tax officer to approve or reject application</p>
                <p className="tcc-timeline-date">Pending</p>
              </div>
            </div>
            
            <div className="tcc-timeline-item future">
              <div className="tcc-timeline-icon future">
                <FaCertificate />
              </div>
              <div className="tcc-timeline-content">
                <h4 className="tcc-timeline-title">TCC ISSUANCE</h4>
                <p className="tcc-timeline-desc">TCC will be issued if application is approved</p>
                <p className="tcc-timeline-date">Pending</p>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Expected Timeline */}
      <div className="expected-timeline-section">
        <h4 className="tcc-section-subtitle">Expected Process Timeline</h4>
        <div className="tcc-detail-grid">
          <div className="tcc-detail-row">
            <div className="tcc-detail-col-wide">
              <div className="expected-timeline">
                <div className="timeline-step">
                  <div className="step-number">1</div>
                  <div className="step-details">
                    <h5 className="step-title">Application Submission</h5>
                    <p className="step-description">Taxpayer submits TCC application with required documents</p>
                    <p className="step-time">Day 1</p>
                  </div>
                </div>
                <div className="timeline-step">
                  <div className="step-number">2</div>
                  <div className="step-details">
                    <h5 className="step-title">Document Verification</h5>
                    <p className="step-description">Tax officers verify all submitted documents and payments</p>
                    <p className="step-time">Days 2-3</p>
                  </div>
                </div>
                <div className="timeline-step">
                  <div className="step-number">3</div>
                  <div className="step-details">
                    <h5 className="step-title">Tax Officer Review</h5>
                    <p className="step-description">Comprehensive review of taxpayer history and compliance</p>
                    <p className="step-time">Days 3-5</p>
                  </div>
                </div>
                <div className="timeline-step">
                  <div className="step-number">4</div>
                  <div className="step-details">
                    <h5 className="step-title">Final Decision</h5>
                    <p className="step-description">Application approval or rejection by authorized officer</p>
                    <p className="step-time">Days 5-7</p>
                  </div>
                </div>
                <div className="timeline-step">
                  <div className="step-number">5</div>
                  <div className="step-details">
                    <h5 className="step-title">TCC Issuance</h5>
                    <p className="step-description">Tax Clearance Certificate generated and made available for download</p>
                    <p className="step-time">Day 7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Regulatory Information */}
      <div className="regulatory-info">
        <h4 className="tcc-section-subtitle">Regulatory Information</h4>
        <div className="tcc-detail-grid">
          <div className="tcc-detail-row">
            <div className="tcc-detail-col-wide">
              <div className="regulatory-details">
                <p>According to Niger State Tax Law (and Section 85 of PITA as amended), Tax Clearance Certificates are valid for a period of one year from the date of issuance. The TCC serves as evidence that the taxpayer has fully settled all tax liabilities for the three years preceding the year of assessment.</p>
                <p>Taxpayers should note that false declarations or provision of misleading information may result in penalties as prescribed under the relevant laws.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render decision form
  const renderDecisionForm = () => (
    <div className="tcc-decision-section">
      <div className="section-header">
        <div className="section-title-wrapper">
          <h3 className="section-title">
            <FaClipboardCheck className="section-icon" /> Application Decision
          </h3>
        </div>
      </div>
      
      <div className="tcc-detail-grid">
        <div className="tcc-detail-row">
          <div className="tcc-detail-col-wide">
            <p className="section-description">
              Review the application details carefully before making a decision. Once approved or rejected, taxpayers will be notified immediately, and the action will be recorded in the system.
            </p>
          </div>
        </div>
      </div>
      
      {/* Enhanced Decision Summary Card */}
      <div className="decision-summary">
        <h4 className="tcc-section-subtitle">Decision Summary</h4>
        <div className="decision-summary-grid">
          <div className="decision-summary-card">
            <div className="summary-grid">
              <div className="summary-col">
                <div className="summary-item">
                  <div className="summary-label">Applicant Name</div>
                  <div className="summary-value">{application.taxpayerName}</div>
                </div>
                
                <div className="summary-item">
                  <div className="summary-label">TIN</div>
                  <div className="summary-value">{application.tin}</div>
                </div>
                
                <div className="summary-item">
                  <div className="summary-label">Application Number</div>
                  <div className="summary-value highlight">{application.applicationNumber}</div>
                </div>
              </div>
              
              <div className="summary-col">
                <div className="summary-item">
                  <div className="summary-label">Submission Date</div>
                  <div className="summary-value">{formatDate(application.applicationDate)}</div>
                </div>
                
                <div className="summary-item">
                  <div className="summary-label">Tax Year</div>
                  <div className="summary-value">{application.year}</div>
                </div>
                
                <div className="summary-item">
                  <div className="summary-label">Income Source</div>
                  <div className="summary-value">{application.sourceOfIncome.replace(/_/g, ' ')}</div>
                </div>
              </div>
              
              <div className="summary-col">
                <div className="summary-item">
                  <div className="summary-label">Occupation</div>
                  <div className="summary-value">{application.occupation}</div>
                </div>
                
                <div className="summary-item">
                  <div className="summary-label">Primary LGA</div>
                  <div className="summary-value">{application.primaryLGA}</div>
                </div>
                
                <div className="summary-item">
                  <div className="summary-label">Verification Status</div>
                  <div className="summary-value">
                    <span className="verification-badge verified">
                      <FaCheckCircle /> All Documents Verified
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="summary-footer">
              <div className="summary-footer-item">
                <span className="footer-label">Last 3 Years Tax Status:</span>
                <span className="footer-value complete">COMPLETE</span>
              </div>
              <div className="summary-footer-item">
                <span className="footer-label">Dev Levy Status:</span>
                <span className="footer-value complete">PAID</span>
              </div>
              <div className="summary-footer-item">
                <span className="footer-label">Outstanding Payments:</span>
                <span className="footer-value complete">NONE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Horizontal Tab Buttons */}
      <div className="tcc-horizontal-tabs">
        <button 
          className={`horizontal-tab-button ${processingAction === 'approve' ? 'active' : ''}`} 
          onClick={() => setProcessingAction('approve')}
        >
          <FaCheckCircle className="tab-icon" /> Approve Application
        </button>
        <button 
          className={`horizontal-tab-button ${processingAction === 'reject' ? 'active' : ''}`} 
          onClick={() => setProcessingAction('reject')}
        >
          <FaTimesCircle className="tab-icon" /> Reject Application
        </button>
      </div>
      
      <div className="tcc-tab-content">
        {processingAction === 'approve' ? (
          <form onSubmit={handleApprove} className="tcc-form">
            <div className="tcc-form-section">
              <h4 className="tcc-form-section-title">TCC Details</h4>
              <div className="tcc-form-grid-3">
                <div className="tcc-form-field">
                  <label htmlFor="tccNumber">TCC Number <span className="required">*</span></label>
                  <input 
                    type="text" 
                    id="tccNumber" 
                    value={tccNumber} 
                    onChange={(e) => setTccNumber(e.target.value)}
                    className={validationErrors.tccNumber ? 'error' : ''}
                    placeholder="Enter TCC Number"
                  />
                  {validationErrors.tccNumber && (
                    <div className="error-message">{validationErrors.tccNumber}</div>
                  )}
                  <small className="field-hint">Format: TCCREG-YYYY-XXXXX (e.g., TCCREG-2023-00156)</small>
                </div>
              
                <div className="tcc-form-field date-field">
                  <label htmlFor="issueDate">Issue Date <span className="required">*</span></label>
                  <div className="date-input">
                    <FaCalendarAlt className="date-icon" />
                    <input 
                      type="date" 
                      id="issueDate" 
                      value={issueDate} 
                      onChange={(e) => setIssueDate(e.target.value)}
                      className={validationErrors.issueDate ? 'error' : ''}
                    />
                  </div>
                  {validationErrors.issueDate && (
                    <div className="error-message">{validationErrors.issueDate}</div>
                  )}
                </div>
                
                <div className="tcc-form-field date-field">
                  <label htmlFor="expiryDate">Expiry Date <span className="required">*</span></label>
                  <div className="date-input">
                    <FaCalendarAlt className="date-icon" />
                    <input 
                      type="date" 
                      id="expiryDate" 
                      value={expiryDate} 
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className={validationErrors.expiryDate ? 'error' : ''}
                    />
                  </div>
                  {validationErrors.expiryDate && (
                    <div className="error-message">{validationErrors.expiryDate}</div>
                  )}
                  <small className="field-hint">Typically one year from issue date</small>
                </div>
              </div>
            </div>
            
            <div className="tcc-form-section">
              <h4 className="tcc-form-section-title">Officer Comment</h4>
              <div className="tcc-form-field">
                <label htmlFor="officerComment">Comment <span className="required">*</span></label>
                <textarea 
                  id="officerComment" 
                  value={officerComment} 
                  onChange={(e) => setOfficerComment(e.target.value)}
                  className={validationErrors.officerComment ? 'error' : ''}
                  placeholder="Enter your comments about the approval"
                  rows={4}
                />
                {validationErrors.officerComment && (
                  <div className="error-message">{validationErrors.officerComment}</div>
                )}
                <small className="field-hint">This comment will be visible to the taxpayer</small>
              </div>
            </div>
            
            <div className="tcc-form-section">
              <div className="approval-disclaimer">
                <FaInfoCircle className="disclaimer-icon" />
                <p>By approving this application, you confirm that the taxpayer has met all requirements for a Tax Clearance Certificate according to the Niger State Internal Revenue Service regulations.</p>
              </div>
            </div>
            
            <div className="tcc-form-actions">
              <Button 
                variant="outline" 
                size="md" 
                type="button" 
                onClick={handleBackToDetails}
              >
                Cancel
              </Button>
              <Button 
                variant="success" 
                size="md" 
                type="submit"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <FaSpinner className="spinner" /> : <FaCheckCircle />}
              >
                {isSubmitting ? 'Processing...' : 'Approve TCC'}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleReject} className="tcc-form">
            <div className="tcc-form-section">
              <h4 className="tcc-form-section-title">Rejection Details</h4>
              <div className="tcc-form-field">
                <label htmlFor="rejectionReason">Reason for Rejection <span className="required">*</span></label>
                <textarea 
                  id="rejectionReason" 
                  value={rejectionReason} 
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className={validationErrors.rejectionReason ? 'error' : ''}
                  placeholder="Enter detailed reason for rejecting this application"
                  rows={6}
                />
                {validationErrors.rejectionReason && (
                  <div className="error-message">{validationErrors.rejectionReason}</div>
                )}
                <small className="field-hint">Provide clear reasoning that will help the taxpayer understand why their application was rejected</small>
              </div>
            </div>
            
            <div className="tcc-form-section">
              <div className="rejection-options">
                <h4 className="tcc-form-section-title">Recommended Actions for Taxpayer</h4>
                <div className="option-checkboxes">
                  <div className="checkbox-item">
                    <input type="checkbox" id="missingDocs" />
                    <label htmlFor="missingDocs">Submit missing documentation</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="outstandingTax" />
                    <label htmlFor="outstandingTax">Clear outstanding tax liabilities</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="incorrectInfo" />
                    <label htmlFor="incorrectInfo">Correct inaccurate information</label>
                  </div>
                  <div className="checkbox-item">
                    <input type="checkbox" id="contactOffice" />
                    <label htmlFor="contactOffice">Contact tax office for clarification</label>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="tcc-form-section">
              <div className="rejection-disclaimer">
                <FaExclamationTriangle className="disclaimer-icon" />
                <p>This rejection will be communicated to the taxpayer and they will need to address the issues before reapplying.</p>
              </div>
            </div>
            
            <div className="tcc-form-actions">
              <Button 
                variant="outline" 
                size="md" 
                type="button" 
                onClick={handleBackToDetails}
              >
                Cancel
              </Button>
              <Button 
                variant="danger" 
                size="md" 
                type="submit"
                disabled={isSubmitting}
                startIcon={isSubmitting ? <FaSpinner className="spinner" /> : <FaTimesCircle />}
              >
                {isSubmitting ? 'Processing...' : 'Reject Application'}
              </Button>
            </div>
          </form>
        )}
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
      <div className="tcc-application-container">
        <div className="tcc-details-header">
          <div className="tcc-header-left">
            <button className="tcc-back-button" onClick={handleBackToDetails}>
              <FaArrowLeft />
            </button>
            <div className="tcc-breadcrumb">
              <span className="breadcrumb-item"><FaHome /> Dashboard</span>
              <FaChevronRight className="breadcrumb-separator" />
              <span className="breadcrumb-item">TCC Applications</span>
              <FaChevronRight className="breadcrumb-separator" />
              <span className="breadcrumb-item">Application {application.applicationNumber}</span>
              <FaChevronRight className="breadcrumb-separator" />
              <span className="breadcrumb-item current">Process</span>
            </div>
          </div>
        </div>
        
        <div className="tcc-page-title-section">
          <h1 className="tcc-title">Process TCC Application</h1>
          <div className="tcc-application-meta">
            <div className="tcc-meta-item">
              <FaTags className="tcc-meta-icon" />
              <span className="tcc-meta-label">Reference:</span>
              <span className="tcc-meta-value">{application.applicationNumber}</span>
            </div>
            <div className="tcc-meta-item">
              <FaUser className="tcc-meta-icon" />
              <span className="tcc-meta-value">{application.taxpayerName}</span>
            </div>
            <div className="tcc-meta-item">
              <FaCalendarAlt className="tcc-meta-icon" />
              <span className="tcc-meta-label">Submitted:</span>
              <span className="tcc-meta-value">{formatDate(application.applicationDate)}</span>
            </div>
          </div>
        </div>
        
        <div className="tcc-info-card">
          <div className="tcc-card-body">
            {processingStatus === 'success' ? <SuccessMessage /> : <ErrorMessage />}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tcc-application-container">
      {/* Enhanced Header with Breadcrumbs */}
      <div className="tcc-details-header">
        <div className="tcc-header-left">
          <button className="tcc-back-button" onClick={handleBackToDetails}>
            <FaArrowLeft />
          </button>
          <div className="tcc-breadcrumb">
            <span className="breadcrumb-item"><FaHome /> Dashboard</span>
            <FaChevronRight className="breadcrumb-separator" />
            <span className="breadcrumb-item">TCC Applications</span>
            <FaChevronRight className="breadcrumb-separator" />
            <span className="breadcrumb-item">Application {application.applicationNumber}</span>
            <FaChevronRight className="breadcrumb-separator" />
            <span className="breadcrumb-item current">Process</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Title Section */}
      <div className="tcc-page-title-section">
        <h1 className="tcc-title">Process TCC Application</h1>
        <div className="tcc-application-meta">
          <div className="tcc-meta-item">
            <FaTags className="tcc-meta-icon" />
            <span className="tcc-meta-label">Reference:</span>
            <span className="tcc-meta-value">{application.applicationNumber}</span>
          </div>
          <div className="tcc-meta-item">
            <FaUser className="tcc-meta-icon" />
            <span className="tcc-meta-value">{application.taxpayerName}</span>
          </div>
          <div className="tcc-meta-item">
            <FaCalendarAlt className="tcc-meta-icon" />
            <span className="tcc-meta-label">Submitted:</span>
            <span className="tcc-meta-value">{formatDate(application.applicationDate)}</span>
          </div>
        </div>
      </div>
      
      {/* Enhanced Status Summary Cards */}
      <div className="tcc-status-summary">
        <div className={`tcc-status-card ${application.status === 'APPROVED' ? 'success' : 
                                           application.status === 'REJECTED' ? 'danger' : 
                                           application.status === 'UNDER_REVIEW' ? 'warning' : 'primary'}`}>
          <div className="tcc-status-icon">
            {application.status === 'APPROVED' && <FaCheckCircle />}
            {application.status === 'REJECTED' && <FaTimesCircle />}
            {application.status === 'UNDER_REVIEW' && <FaClock />}
            {application.status === 'SUBMITTED' && <FaFileAlt />}
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
            <FaCalendarAlt />
          </div>
          <div className="tcc-status-info">
            <div className="tcc-status-label">Application Date</div>
            <div className="tcc-status-value">{formatDate(application.applicationDate)}</div>
          </div>
        </div>
        
        <div className="tcc-status-card primary">
          <div className="tcc-status-icon">
            <FaUser />
          </div>
          <div className="tcc-status-info">
            <div className="tcc-status-label">Taxpayer Type</div>
            <div className="tcc-status-value">{application.taxPayerType}</div>
          </div>
        </div>
        
        <div className="tcc-status-card primary">
          <div className="tcc-status-icon">
            <FaCalendarAlt />
          </div>
          <div className="tcc-status-info">
            <div className="tcc-status-label">Tax Year</div>
            <div className="tcc-status-value">{application.year}</div>
          </div>
        </div>
      </div>
      
      <div className="tcc-process-layout">
        {/* Enhanced Sidebar Navigation */}
        <div className="tcc-process-sidebar">
          <div className="tcc-nav-card">
            <div className="tcc-process-nav">
              <button 
                className={`tcc-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => handleTabChange('overview')}
              >
                <div className="tcc-nav-icon">
                  <FaUser />
                </div>
                <span>Application Overview</span>
              </button>
              <button 
                className={`tcc-nav-item ${activeTab === 'payments' ? 'active' : ''}`}
                onClick={() => handleTabChange('payments')}
              >
                <div className="tcc-nav-icon">
                  <FaReceipt />
                </div>
                <span>Payment Verification</span>
              </button>
              <button 
                className={`tcc-nav-item ${activeTab === 'documents' ? 'active' : ''}`}
                onClick={() => handleTabChange('documents')}
              >
                <div className="tcc-nav-icon">
                  <FaFileContract />
                </div>
                <span>Document Verification</span>
              </button>
              <button 
                className={`tcc-nav-item ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => handleTabChange('history')}
              >
                <div className="tcc-nav-icon">
                  <FaHistory />
                </div>
                <span>Application History</span>
              </button>
              <button 
                className={`tcc-nav-item ${activeTab === 'decision' ? 'active' : ''}`}
                onClick={() => handleTabChange('decision')}
              >
                <div className="tcc-nav-icon">
                  <FaClipboardCheck />
                </div>
                <span>Application Decision</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="tcc-process-content">
          <div className="tcc-tab-panel">
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'payments' && renderPayments()}
            {activeTab === 'documents' && renderDocuments()}
            {activeTab === 'history' && renderHistory()}
            {activeTab === 'decision' && renderDecisionForm()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TCCApplicationProcess; 