import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiCheckCircle, FiX, FiAlertCircle, FiCalendar, FiFileText, FiDollarSign } from 'react-icons/fi';
import './TCC.css';

function TCCApplicationProcess() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tccApplication, setTCCApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processingStatus, setProcessingStatus] = useState(null); // 'success', 'error', null
  const [processingAction, setProcessingAction] = useState(null); // 'approve', 'reject', null
  const [comment, setComment] = useState('');
  const [tccNumber, setTccNumber] = useState('');
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split('T')[0]);
  const [expiryDate, setExpiryDate] = useState(() => {
    // Default expiry date is 1 year from today
    const oneYearLater = new Date();
    oneYearLater.setFullYear(oneYearLater.getFullYear() + 1);
    oneYearLater.setDate(oneYearLater.getDate() - 1); // Subtract 1 day to make it exactly 1 year
    return oneYearLater.toISOString().split('T')[0];
  });
  const [rejectionReason, setRejectionReason] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

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
          status: 'SUBMITTED',
          sourceOfIncome: 'EMPLOYMENT',
          platformPayment: 'Y',
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
          ]
        };
        
        // Generate a TCC number based on the application
        const currentYear = new Date().getFullYear();
        const sequenceNumber = String(Math.floor(Math.random() * 1000)).padStart(3, '0');
        setTccNumber(`TCCREG-${currentYear}-${sequenceNumber}`);
        
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
    navigate(`/dashboard/tcc-application/${id}`);
  };

  // Handle approval submission
  const handleApprove = (e) => {
    e.preventDefault();
    
    // Validate fields
    const errors = {};
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
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setValidationErrors({});
    setProcessingAction('approve');
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setProcessingStatus('success');
      setLoading(false);
    }, 1500);
  };

  // Handle rejection submission
  const handleReject = (e) => {
    e.preventDefault();
    
    // Validate fields
    const errors = {};
    if (!rejectionReason.trim()) {
      errors.rejectionReason = 'Rejection reason is required';
    }
    
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }
    
    setValidationErrors({});
    setProcessingAction('reject');
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setProcessingStatus('success');
      setLoading(false);
    }, 1500);
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
      case 'INVESTMENT':
        return 'Investment';
      default:
        return 'Other';
    }
  };

  // Back to list after processing
  const handleBackToList = () => {
    navigate('/dashboard/tcc-application');
  };

  // View updated TCC
  const handleViewUpdatedTCC = () => {
    navigate(`/dashboard/tcc-application/${id}`);
  };

  // Success message component
  const SuccessMessage = () => (
    <div className="process-result success">
      <div className="process-result-icon">
        <FiCheckCircle />
      </div>
      <h3>TCC {processingAction === 'approve' ? 'Approved' : 'Rejected'} Successfully</h3>
      <p>
        The TCC application {tccApplication?.applicationNumber} has been 
        {processingAction === 'approve' ? ' approved.' : ' rejected.'}
      </p>
      <div className="button-group">
        <button className="secondary-button" onClick={handleBackToList}>
          Back to TCC List
        </button>
        <button className="primary-button" onClick={handleViewUpdatedTCC}>
          View Updated TCC
        </button>
      </div>
    </div>
  );

  // Error message component
  const ErrorMessage = () => (
    <div className="process-result error">
      <div className="process-result-icon">
        <FiAlertCircle />
      </div>
      <h3>Processing Failed</h3>
      <p>There was an error processing the TCC application. Please try again.</p>
      <button className="primary-button" onClick={() => setProcessingStatus(null)}>
        Try Again
      </button>
    </div>
  );

  // Show TCC summary
  const TCCSummary = () => (
    <div className="tcc-summary">
      <div className="summary-header">
        <h3>TCC Application Summary</h3>
        <p className="application-number">Application Number: {tccApplication?.applicationNumber}</p>
      </div>
      
      <div className="summary-grid">
        <div className="summary-item">
          <span className="summary-label">Taxpayer Name</span>
          <span className="summary-value">{tccApplication?.taxpayerName}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">TIN</span>
          <span className="summary-value">{tccApplication?.tin}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Tax Year</span>
          <span className="summary-value">{tccApplication?.year}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Application Date</span>
          <span className="summary-value">{formatDate(tccApplication?.applicationDate)}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Source of Income</span>
          <span className="summary-value">{getSourceOfIncomeLabel(tccApplication?.sourceOfIncome)}</span>
        </div>
      </div>
      
      <div className="summary-section">
        <h4><FiDollarSign /> Income & Tax Details</h4>
        <table className="summary-table">
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
            {tccApplication?.incomeDetails.map((income, index) => (
              <tr key={index}>
                <td>{income.year}</td>
                <td>{formatCurrency(income.annualIncome)}</td>
                <td>{formatCurrency(income.assessmentTaxAmount)}</td>
                <td>{formatCurrency(income.devLevyAmount)}</td>
                <td>{formatCurrency(income.landUseChargeAmount)}</td>
                <td>{formatCurrency(income.outstandingTax)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="summary-section">
        <h4><FiFileText /> Documents Submitted</h4>
        <ul className="document-list">
          {tccApplication?.documents.map((doc, index) => (
            <li key={index}>{doc.fileName} ({formatFileSize(doc.fileSize)})</li>
          ))}
        </ul>
      </div>
    </div>
  );

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Loading state
  if (loading && !processingStatus) {
    return <div className="loading-indicator">Loading TCC application...</div>;
  }

  // Success or error state
  if (processingStatus) {
    return (
      <div className="tcc-application-process content-container">
        <div className="header-section">
          <h2>Process TCC Application</h2>
        </div>
        
        {processingStatus === 'success' ? <SuccessMessage /> : <ErrorMessage />}
      </div>
    );
  }

  return (
    <div className="tcc-application-process content-container">
      <div className="header-section">
        <button className="back-button" onClick={handleBack}>
          <FiArrowLeft /> Back to TCC Details
        </button>
        <h2>Process TCC Application</h2>
      </div>

      <div className="process-container">
        <TCCSummary />
        
        <div className="process-forms">
          <div className="process-tabs">
            <button 
              className={`tab-button ${processingAction !== 'reject' ? 'active' : ''}`}
              onClick={() => setProcessingAction('approve')}
            >
              <FiCheckCircle /> Approve TCC
            </button>
            <button 
              className={`tab-button ${processingAction === 'reject' ? 'active' : ''}`}
              onClick={() => setProcessingAction('reject')}
            >
              <FiX /> Reject TCC
            </button>
          </div>

          {processingAction !== 'reject' ? (
            <form className="process-form" onSubmit={handleApprove}>
              <div className="form-header">
                <h3>Approve TCC Application</h3>
                <p>Please provide the required details for TCC approval</p>
              </div>
              
              <div className="form-group">
                <label htmlFor="tcc-number">TCC Number *</label>
                <input
                  type="text"
                  id="tcc-number"
                  placeholder="Enter TCC number"
                  value={tccNumber}
                  onChange={(e) => setTccNumber(e.target.value)}
                  className={validationErrors.tccNumber ? 'error' : ''}
                />
                {validationErrors.tccNumber && <div className="error-message">{validationErrors.tccNumber}</div>}
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="issue-date">Issue Date *</label>
                  <div className="date-input">
                    <FiCalendar />
                    <input
                      type="date"
                      id="issue-date"
                      value={issueDate}
                      onChange={(e) => setIssueDate(e.target.value)}
                      className={validationErrors.issueDate ? 'error' : ''}
                    />
                  </div>
                  {validationErrors.issueDate && <div className="error-message">{validationErrors.issueDate}</div>}
                </div>
                
                <div className="form-group">
                  <label htmlFor="expiry-date">Expiry Date *</label>
                  <div className="date-input">
                    <FiCalendar />
                    <input
                      type="date"
                      id="expiry-date"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      className={validationErrors.expiryDate ? 'error' : ''}
                    />
                  </div>
                  {validationErrors.expiryDate && <div className="error-message">{validationErrors.expiryDate}</div>}
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="comment">Official Comment</label>
                <textarea
                  id="comment"
                  placeholder="Enter any official comment regarding this approval"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                ></textarea>
              </div>
              
              <div className="form-actions">
                <button type="button" className="secondary-button" onClick={handleBack}>
                  Cancel
                </button>
                <button type="submit" className="primary-button">
                  <FiCheckCircle /> Approve TCC
                </button>
              </div>
            </form>
          ) : (
            <form className="process-form" onSubmit={handleReject}>
              <div className="form-header">
                <h3>Reject TCC Application</h3>
                <p>Please provide the reason for rejection</p>
              </div>
              
              <div className="form-group">
                <label htmlFor="rejection-reason">Rejection Reason *</label>
                <textarea
                  id="rejection-reason"
                  placeholder="Enter the reason for rejecting this TCC application"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  rows={5}
                  className={validationErrors.rejectionReason ? 'error' : ''}
                ></textarea>
                {validationErrors.rejectionReason && <div className="error-message">{validationErrors.rejectionReason}</div>}
              </div>
              
              <div className="form-actions">
                <button type="button" className="secondary-button" onClick={handleBack}>
                  Cancel
                </button>
                <button type="submit" className="danger-button">
                  <FiX /> Reject TCC
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default TCCApplicationProcess; 