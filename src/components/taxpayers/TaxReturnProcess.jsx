import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TaxpayerReturns.css';
import { 
  FiUser, FiCalendar, FiDollarSign, FiClock, 
  FiCheckCircle, FiAlertCircle, FiArrowLeft, FiDownload,
  FiArrowRight, FiMessageSquare, FiClipboard, FiEdit, 
  FiCheckSquare, FiX, FiInfo, FiFileText, FiUpload, FiLayers,
  FiEye, FiXCircle
} from 'react-icons/fi';

const TaxReturnProcess = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [returnData, setReturnData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [stepStatus, setStepStatus] = useState({
    1: { completed: false, validated: false, notes: '' },
    2: { completed: false, validated: false, notes: '' },
    3: { completed: false, validated: false, notes: '' },
    4: { completed: false, validated: false, notes: '' }
  });
  const [documentChecklist, setDocumentChecklist] = useState([
    { id: 1, name: 'Income Statement', required: true, verified: false },
    { id: 2, name: 'Tax Computation', required: true, verified: false },
    { id: 3, name: 'Proof of Payment', required: false, verified: false },
    { id: 4, name: 'Supporting Documents', required: false, verified: false }
  ]);
  const [assessmentData, setAssessmentData] = useState({
    grossIncome: 12500000,
    totalDeductions: 2350000,
    taxableIncome: 10150000,
    taxDue: 1522500,
    taxPaid: 1200000,
    balance: 322500,
    remarks: '',
    adjustmentsApplied: false
  });
  const [reviewDecision, setReviewDecision] = useState({
    isCorrect: null,
    issuesIdentified: '',
    recommendations: ''
  });
  const [finalDecision, setFinalDecision] = useState({
    decision: '',
    notes: '',
    notificationSent: false
  });
  const [previewDocument, setPreviewDocument] = useState(null);
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);

  const totalSteps = 4;

  useEffect(() => {
    // Mock fetch of return details
    setTimeout(() => {
      // Mock data for a tax return based on ID
      const mockReturnData = {
        id: parseInt(id),
        returnNumber: `RTN-2023-${id.padStart(3, '0')}`,
        taxpayerId: '1234',
        taxpayer: 'Aisha Bello',
        year: '2022',
        type: 'Personal Income Tax',
        submissionDate: '2023-03-01T14:20:00Z',
        status: 'Pending',
        taxPeriod: {
          startDate: '2022-01-01',
          endDate: '2022-12-31'
        },
        amounts: {
          grossIncome: 12500000,
          totalDeductions: 2350000,
          taxableIncome: 10150000,
          taxDue: 1522500,
          taxPaid: 1200000,
          balance: 322500
        },
        contactInfo: {
          phone: '+234 801 234 5678',
          email: 'aisha.bello@example.com',
          address: '25 Marina Street, Lagos Island, Lagos'
        },
        documents: [
          { name: 'Income Statement', type: 'pdf', dateUploaded: '2023-03-01T14:10:00Z', size: '1.4 MB' },
          { name: 'Tax Computation', type: 'xlsx', dateUploaded: '2023-03-01T14:12:00Z', size: '245 KB' },
          { name: 'Proof of Payment', type: 'pdf', dateUploaded: '2023-03-01T14:15:00Z', size: '890 KB' }
        ]
      };

      setReturnData(mockReturnData);
      // Pre-populate assessment with return data
      setAssessmentData({
        ...assessmentData,
        grossIncome: mockReturnData.amounts.grossIncome,
        totalDeductions: mockReturnData.amounts.totalDeductions,
        taxableIncome: mockReturnData.amounts.taxableIncome,
        taxDue: mockReturnData.amounts.taxDue,
        taxPaid: mockReturnData.amounts.taxPaid,
        balance: mockReturnData.amounts.balance
      });
      setLoading(false);
    }, 800);
  }, [id]);

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    }) + " at " + date.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const formatCurrency = (amount) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleDocumentVerify = (docId) => {
    setDocumentChecklist(prev => 
      prev.map(doc => 
        doc.id === docId ? { ...doc, verified: !doc.verified } : doc
      )
    );
  };

  const handleStepNoteChange = (step, note) => {
    setStepStatus(prev => ({
      ...prev,
      [step]: { ...prev[step], notes: note }
    }));
  };

  const handleNextStep = () => {
    // Special validation per step
    if (currentStep === 1) {
      const requiredDocsVerified = documentChecklist
        .filter(doc => doc.required)
        .every(doc => doc.verified);
      
      setStepStatus(prev => ({
        ...prev,
        [currentStep]: { 
          ...prev[currentStep], 
          completed: true, 
          validated: requiredDocsVerified 
        }
      }));
      
      // If required documents aren't verified, show an alert and don't proceed
      if (!requiredDocsVerified) {
        alert('Please verify all required documents before proceeding.');
        return;
      }
    } else {
      // Mark current step as completed for other steps
      setStepStatus(prev => ({
        ...prev,
        [currentStep]: { ...prev[currentStep], completed: true }
      }));
    }

    // Move to next step
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleAmountChange = (field, value) => {
    // Remove currency symbol and commas to get a clean number
    const numValue = parseFloat(value.replace(/[₦,]/g, ''));
    
    // If the parsed value is not a valid number, don't update
    if (isNaN(numValue)) return;
    
    setAssessmentData(prev => {
      const newData = { ...prev, [field]: numValue };
      
      // Recalculate dependent fields
      if (field === 'grossIncome' || field === 'totalDeductions') {
        newData.taxableIncome = newData.grossIncome - newData.totalDeductions;
      }
      
      // Calculate balance
      newData.balance = newData.taxDue - newData.taxPaid;
      
      // Mark that adjustments have been made
      newData.adjustmentsApplied = true;
      
      return newData;
    });
  };

  const handleReviewDecisionChange = (field, value) => {
    setReviewDecision(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFinalDecision = (decision) => {
    // Mark step as completed and validated
    setStepStatus(prev => ({
      ...prev,
      [currentStep]: { ...prev[currentStep], completed: true, validated: true }
    }));

    // Update final decision state
    setFinalDecision({
      decision,
      notes: finalDecision.notes,
      notificationSent: true
    });

    // Show success message and navigate
    alert(`Tax return has been ${decision.toLowerCase()}. Taxpayer has been notified.`);
    navigate(`/dashboard/tax-returns/${id}`);
  };

  const getStepLabel = (step) => {
    switch(step) {
      case 1: return 'Document Verification';
      case 2: return 'Assessment';
      case 3: return 'Review';
      case 4: return 'Final Decision';
      default: return 'Unknown Step';
    }
  };

  const getStepIcon = (step) => {
    switch(step) {
      case 1: return <FiClipboard />;
      case 2: return <FiDollarSign />;
      case 3: return <FiCheckSquare />;
      case 4: return <FiCheckCircle />;
      default: return <FiFileText />;
    }
  };

  const handleDocumentPreview = (docName) => {
    // Find the document in the return data
    const documentToPreview = returnData.documents.find(doc => doc.name === docName);
    
    if (documentToPreview) {
      setPreviewDocument(documentToPreview);
      setShowDocumentPreview(true);
    } else {
      alert(`Document "${docName}" is not available for preview.`);
    }
  };

  const closeDocumentPreview = () => {
    setShowDocumentPreview(false);
    setPreviewDocument(null);
  };

  return (
    <div className="taxpayer-returns-container">
      <div className="details-header">
        <button className="back-button" onClick={handleBack}>
          <FiArrowLeft className="btn-icon-sm" /> Back to Details
        </button>
        <h1><FiFileText /> Process Tax Return</h1>
      </div>

      {loading ? (
        <div className="loading-section">
          <div className="spinner"></div>
          <p>Loading tax return details...</p>
        </div>
      ) : returnData ? (
        <div className="process-content">
          {/* Return Summary */}
          <div className="process-summary">
            <div className="summary-left">
              <div className="return-badge">{returnData.returnNumber}</div>
              <div className="summary-taxpayer">{returnData.taxpayer}</div>
              <div className="summary-type">{returnData.type} • {returnData.year}</div>
            </div>
            <div className="summary-right">
              <div className="summary-amount">
                <div className="amount-label">Tax Due</div>
                <div className="amount-value">{formatCurrency(returnData.amounts.taxDue)}</div>
              </div>
              <div className="summary-submission">
                Submitted: {formatDateTime(returnData.submissionDate)}
              </div>
            </div>
          </div>

          {/* Progress Stepper */}
          <div className="process-stepper">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
              <div 
                key={step} 
                className={`step-item ${step === currentStep ? 'active' : ''} ${
                  stepStatus[step].completed ? 'completed' : ''
                } ${stepStatus[step].validated ? 'validated' : ''}`}
                onClick={() => step < currentStep && setCurrentStep(step)}
              >
                <div className="step-number">
                  {stepStatus[step].completed ? <FiCheckCircle /> : step}
                </div>
                <div className="step-label">{getStepLabel(step)}</div>
                {step < totalSteps && <div className="step-connector"></div>}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="step-content">
            {/* Step 1: Document Verification */}
            {currentStep === 1 && (
              <div className="step-container">
                <div className="step-header">
                  <h2>
                    <FiClipboard /> Document Verification
                    <span className="step-subtitle">
                      Verify all required documents are properly submitted and accurate
                    </span>
                  </h2>
                </div>

                <div className="documents-checklist">
                  {documentChecklist.map(doc => (
                    <div key={doc.id} className="document-item">
                      <div className="document-info">
                        <span className="document-name">
                          {doc.name} {doc.required && <span className="required-badge">Required</span>}
                        </span>
                        <span className="document-status">
                          {returnData.documents.some(d => d.name === doc.name) 
                            ? 'Submitted on ' + formatDateTime(returnData.documents.find(d => d.name === doc.name).dateUploaded)
                            : 'Not submitted'}
                        </span>
                      </div>
                      <div className="document-actions">
                        {returnData.documents.some(d => d.name === doc.name) && (
                          <button 
                            className="preview-button"
                            onClick={() => handleDocumentPreview(doc.name)}
                          >
                            <FiEye /> Preview
                          </button>
                        )}
                        <button 
                          className={`verify-button ${doc.verified ? 'verified' : ''}`}
                          onClick={() => handleDocumentVerify(doc.id)}
                        >
                          {doc.verified ? <><FiCheckCircle /> Verified</> : 'Verify'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="document-verification-notes">
                  <h3><FiMessageSquare /> Verification Notes</h3>
                  <textarea 
                    placeholder="Enter any notes or observations about the submitted documents..."
                    value={stepStatus[1].notes}
                    onChange={(e) => handleStepNoteChange(1, e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="verification-summary">
                  <h3><FiInfo /> Verification Summary</h3>
                  <div className="verification-stats">
                    <div className="stat-item">
                      <div className="stat-label">Total Documents</div>
                      <div className="stat-value">{documentChecklist.length}</div>
                    </div>
                    <div className="stat-item">
                      <div className="stat-label">Verified</div>
                      <div className="stat-value">{documentChecklist.filter(d => d.verified).length}</div>
                    </div>
                    <div className="stat-item">
                      <div className={`stat-label ${documentChecklist.filter(d => d.required && !d.verified).length > 0 ? 'text-red' : ''}`}>
                        Required Missing
                      </div>
                      <div className={`stat-value ${documentChecklist.filter(d => d.required && !d.verified).length > 0 ? 'text-red' : ''}`}>
                        {documentChecklist.filter(d => d.required && !d.verified).length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Assessment */}
            {currentStep === 2 && (
              <div className="step-container">
                <div className="step-header">
                  <h2>
                    <FiDollarSign /> Assessment
                    <span className="step-subtitle">
                      Review and confirm financial details and tax assessment
                    </span>
                  </h2>
                </div>

                <div className="assessment-form">
                  <div className="assessment-field">
                    <label>Gross Income</label>
                    <input 
                      type="text" 
                      value={formatCurrency(assessmentData.grossIncome)}
                      onChange={(e) => handleAmountChange('grossIncome', e.target.value)} 
                    />
                  </div>
                  <div className="assessment-field">
                    <label>Total Deductions</label>
                    <input 
                      type="text" 
                      value={formatCurrency(assessmentData.totalDeductions)}
                      onChange={(e) => handleAmountChange('totalDeductions', e.target.value)} 
                    />
                  </div>
                  <div className="assessment-field">
                    <label>Taxable Income</label>
                    <input 
                      type="text" 
                      value={formatCurrency(assessmentData.taxableIncome)}
                      readOnly
                      className="read-only-field"
                    />
                  </div>
                  <div className="assessment-field">
                    <label>Tax Due</label>
                    <input 
                      type="text" 
                      value={formatCurrency(assessmentData.taxDue)}
                      onChange={(e) => handleAmountChange('taxDue', e.target.value)} 
                    />
                  </div>
                  <div className="assessment-field">
                    <label>Tax Paid</label>
                    <input 
                      type="text" 
                      value={formatCurrency(assessmentData.taxPaid)}
                      onChange={(e) => handleAmountChange('taxPaid', e.target.value)} 
                    />
                  </div>
                  <div className="assessment-field">
                    <label>Balance Due</label>
                    <input 
                      type="text" 
                      value={formatCurrency(assessmentData.balance)}
                      readOnly
                      className={`read-only-field ${assessmentData.balance > 0 ? 'negative-value' : 'positive-value'}`}
                    />
                  </div>
                  <div className="assessment-field full-width">
                    <label>Assessment Remarks</label>
                    <textarea 
                      placeholder="Enter any remarks about the assessment..."
                      value={assessmentData.remarks}
                      onChange={(e) => setAssessmentData(prev => ({ ...prev, remarks: e.target.value }))}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="assessment-summary">
                  <div className="assessment-changes">
                    {assessmentData.adjustmentsApplied && (
                      <div className="changes-badge">
                        <FiEdit /> Adjustments Applied
                      </div>
                    )}
                  </div>
                  <div className="assessment-actions">
                    <button className="process-button" onClick={() => {
                      setStepStatus(prev => ({
                        ...prev,
                        [currentStep]: { ...prev[currentStep], completed: true, validated: true }
                      }));
                    }}>
                      <FiCheckCircle /> Confirm Assessment
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Review */}
            {currentStep === 3 && (
              <div className="step-container">
                <div className="step-header">
                  <h2>
                    <FiCheckSquare /> Review
                    <span className="step-subtitle">
                      Review all information and assess the tax return for accuracy
                    </span>
                  </h2>
                </div>

                <div className="review-content">
                  <div className="review-sections">
                    <div className="review-section">
                      <h3><FiUser /> Taxpayer Information</h3>
                      <div className="review-grid">
                        <div className="review-item">
                          <div className="review-label">Name</div>
                          <div className="review-value">{returnData.taxpayer}</div>
                        </div>
                        <div className="review-item">
                          <div className="review-label">Taxpayer ID</div>
                          <div className="review-value">{returnData.taxpayerId}</div>
                        </div>
                        <div className="review-item">
                          <div className="review-label">Contact</div>
                          <div className="review-value">{returnData.contactInfo.phone}</div>
                        </div>
                        <div className="review-item">
                          <div className="review-label">Email</div>
                          <div className="review-value">{returnData.contactInfo.email}</div>
                        </div>
                      </div>
                    </div>

                    <div className="review-section">
                      <h3><FiFileText /> Return Information</h3>
                      <div className="review-grid">
                        <div className="review-item">
                          <div className="review-label">Return Number</div>
                          <div className="review-value">{returnData.returnNumber}</div>
                        </div>
                        <div className="review-item">
                          <div className="review-label">Tax Type</div>
                          <div className="review-value">{returnData.type}</div>
                        </div>
                        <div className="review-item">
                          <div className="review-label">Year</div>
                          <div className="review-value">{returnData.year}</div>
                        </div>
                        <div className="review-item">
                          <div className="review-label">Submission Date</div>
                          <div className="review-value">{formatDateTime(returnData.submissionDate)}</div>
                        </div>
                      </div>
                    </div>

                    <div className="review-section">
                      <h3><FiDollarSign /> Financial Assessment</h3>
                      <div className="review-grid">
                        <div className="review-item">
                          <div className="review-label">Gross Income</div>
                          <div className="review-value">{formatCurrency(assessmentData.grossIncome)}</div>
                        </div>
                        <div className="review-item">
                          <div className="review-label">Total Deductions</div>
                          <div className="review-value">{formatCurrency(assessmentData.totalDeductions)}</div>
                        </div>
                        <div className="review-item">
                          <div className="review-label">Taxable Income</div>
                          <div className="review-value">{formatCurrency(assessmentData.taxableIncome)}</div>
                        </div>
                        <div className="review-item">
                          <div className="review-label">Tax Due</div>
                          <div className="review-value highlight">{formatCurrency(assessmentData.taxDue)}</div>
                        </div>
                        <div className="review-item">
                          <div className="review-label">Tax Paid</div>
                          <div className="review-value">{formatCurrency(assessmentData.taxPaid)}</div>
                        </div>
                        <div className="review-item">
                          <div className="review-label">Balance</div>
                          <div className={`review-value ${assessmentData.balance > 0 ? 'negative' : ''}`}>
                            {formatCurrency(assessmentData.balance)}
                          </div>
                        </div>
                      </div>
                      
                      {assessmentData.remarks && (
                        <div className="review-remarks">
                          <div className="remarks-label">Assessment Remarks:</div>
                          <div className="remarks-content">{assessmentData.remarks}</div>
                        </div>
                      )}
                    </div>

                    {stepStatus[1].notes && (
                      <div className="review-section">
                        <h3><FiMessageSquare /> Document Verification Notes</h3>
                        <div className="verification-notes">{stepStatus[1].notes}</div>
                      </div>
                    )}

                    <div className="review-section">
                      <h3><FiLayers /> Documents Status</h3>
                      <div className="document-status-list">
                        {documentChecklist.map(doc => (
                          <div key={doc.id} className="document-status-item">
                            <span className="document-name">{doc.name}</span>
                            <span className={`document-verified ${doc.verified ? 'is-verified' : 'not-verified'}`}>
                              {doc.verified ? <><FiCheckCircle /> Verified</> : <><FiX /> Not Verified</>}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="review-decision">
                      <h3><FiCheckSquare /> Review Decision</h3>
                      
                      <div className="decision-options">
                        <div className="decision-option">
                          <input 
                            type="radio" 
                            id="correct" 
                            name="review-decision" 
                            checked={reviewDecision.isCorrect === true}
                            onChange={() => handleReviewDecisionChange('isCorrect', true)}
                          />
                          <label htmlFor="correct">Information is correct and complete</label>
                        </div>
                        <div className="decision-option">
                          <input 
                            type="radio" 
                            id="incorrect" 
                            name="review-decision" 
                            checked={reviewDecision.isCorrect === false}
                            onChange={() => handleReviewDecisionChange('isCorrect', false)}
                          />
                          <label htmlFor="incorrect">Issues identified</label>
                        </div>
                      </div>
                      
                      {reviewDecision.isCorrect === false && (
                        <div className="issues-container">
                          <label>Issues Identified:</label>
                          <textarea 
                            placeholder="Describe the issues identified..."
                            value={reviewDecision.issuesIdentified}
                            onChange={(e) => handleReviewDecisionChange('issuesIdentified', e.target.value)}
                            rows={3}
                          />
                          
                          <label>Recommendations:</label>
                          <textarea 
                            placeholder="Provide recommendations..."
                            value={reviewDecision.recommendations}
                            onChange={(e) => handleReviewDecisionChange('recommendations', e.target.value)}
                            rows={3}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Final Decision */}
            {currentStep === 4 && (
              <div className="step-container">
                <div className="step-header">
                  <h2>
                    <FiCheckCircle /> Final Decision
                    <span className="step-subtitle">
                      Approve, reject, or request more information for this tax return
                    </span>
                  </h2>
                </div>

                <div className="decision-summary">
                  <div className="decision-section">
                    <h3><FiInfo /> Processing Summary</h3>
                    
                    <div className="process-summary-content">
                      <div className="summary-line">
                        <strong>Document Verification:</strong> 
                        <span className={`status-indicator ${stepStatus[1].validated ? 'validated' : 'not-validated'}`}>
                          {stepStatus[1].validated ? 'Completed' : 'Incomplete'}
                        </span>
                      </div>
                      
                      <div className="summary-line">
                        <strong>Financial Assessment:</strong> 
                        <span className={`status-indicator ${stepStatus[2].validated ? 'validated' : 'not-validated'}`}>
                          {stepStatus[2].validated ? 'Completed' : 'Incomplete'}
                        </span>
                      </div>
                      
                      <div className="summary-line">
                        <strong>Review Decision:</strong> 
                        <span className="decision-value">
                          {reviewDecision.isCorrect === true 
                            ? 'Information correct and complete' 
                            : reviewDecision.isCorrect === false
                              ? 'Issues identified'
                              : 'No decision made'}
                        </span>
                      </div>
                      
                      {reviewDecision.isCorrect === false && (
                        <>
                          <div className="summary-issues">
                            <strong>Issues:</strong> {reviewDecision.issuesIdentified}
                          </div>
                          <div className="summary-recommendations">
                            <strong>Recommendations:</strong> {reviewDecision.recommendations}
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="final-decision-section">
                    <h3>Make Final Decision</h3>
                    
                    <div className="decision-notes">
                      <label>Decision Notes:</label>
                      <textarea 
                        placeholder="Enter any final notes about this decision..."
                        value={finalDecision.notes}
                        onChange={(e) => setFinalDecision(prev => ({ ...prev, notes: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    
                    <div className="decision-buttons">
                      <button 
                        className="approve-button"
                        onClick={() => handleFinalDecision('Approved')}
                        disabled={!stepStatus[1].validated || !stepStatus[2].validated || reviewDecision.isCorrect === null}
                      >
                        <FiCheckCircle /> Approve Return
                      </button>
                      
                      <button 
                        className="request-info-button"
                        onClick={() => handleFinalDecision('More Information Requested')}
                      >
                        <FiInfo /> Request More Information
                      </button>
                      
                      <button 
                        className="reject-button"
                        onClick={() => handleFinalDecision('Rejected')}
                      >
                        <FiX /> Reject Return
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Step Navigation */}
          <div className="step-navigation">
            <button 
              className="prev-button"
              onClick={handlePrevStep}
              disabled={currentStep === 1}
            >
              <FiArrowLeft /> Previous Step
            </button>
            
            {currentStep < totalSteps && (
              <button 
                className="next-button"
                onClick={handleNextStep}
                disabled={
                  (currentStep === 1 && documentChecklist.filter(d => d.required).some(d => !d.verified)) ||
                  (currentStep === 2 && !stepStatus[2].validated) ||
                  (currentStep === 3 && reviewDecision.isCorrect === null)
                }
              >
                Next Step <FiArrowRight />
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-state-icon">
            <FiFileText />
          </div>
          <div className="empty-state-title">Return not found</div>
          <p className="empty-state-text">The tax return you're looking for doesn't exist or has been removed.</p>
          <button className="view-button" onClick={handleBack}>Back to Returns</button>
        </div>
      )}

      {/* Add document preview modal */}
      {showDocumentPreview && previewDocument && (
        <div className="document-preview-modal">
          <div className="document-preview-content">
            <div className="preview-header">
              <h3><FiFileText /> {previewDocument.name}</h3>
              <button className="close-preview-button" onClick={closeDocumentPreview}>
                <FiXCircle />
              </button>
            </div>
            <div className="preview-body">
              {/* Display based on document type */}
              {previewDocument.type === 'pdf' ? (
                <div className="pdf-preview">
                  <FiFileText className="preview-placeholder-icon" />
                  <p>PDF Document: {previewDocument.name}</p>
                  <p>Size: {previewDocument.size}</p>
                  <p>Uploaded: {formatDateTime(previewDocument.dateUploaded)}</p>
                  <button className="download-preview-button">
                    <FiDownload /> Download to view full document
                  </button>
                </div>
              ) : previewDocument.type === 'xlsx' ? (
                <div className="excel-preview">
                  <FiFileText className="preview-placeholder-icon" />
                  <p>Excel Document: {previewDocument.name}</p>
                  <p>Size: {previewDocument.size}</p>
                  <p>Uploaded: {formatDateTime(previewDocument.dateUploaded)}</p>
                  <button className="download-preview-button">
                    <FiDownload /> Download to view full document
                  </button>
                </div>
              ) : (
                <div className="generic-preview">
                  <FiFileText className="preview-placeholder-icon" />
                  <p>Document: {previewDocument.name}</p>
                  <p>Size: {previewDocument.size}</p>
                  <p>Uploaded: {formatDateTime(previewDocument.dateUploaded)}</p>
                  <button className="download-preview-button">
                    <FiDownload /> Download to view full document
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxReturnProcess; 