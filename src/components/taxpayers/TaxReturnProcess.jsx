import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './TaxReturnProcess.module.css';
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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <button className={styles.backButton} onClick={handleBack}>
            <FiArrowLeft />
          </button>
          <div className={styles.title}>
            Process Tax Return
            <span className={styles.returnId}>{returnData?.returnNumber}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className={styles.card}>
          <div className={styles.loadingSection}>
            <div className={styles.spinner}></div>
            <p>Loading tax return details...</p>
          </div>
        </div>
      ) : returnData ? (
        <>
          {/* Process steps navigation */}
          <div className={styles.stepsContainer}>
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
              <div 
                key={step}
                className={`${styles.step} ${
                  currentStep === step ? styles.stepActive : ''
                } ${
                  stepStatus[step].completed ? styles.stepCompleted : ''
                } ${
                  stepStatus[step].completed && !stepStatus[step].validated ? styles.stepInvalid : ''
                }`}
                onClick={() => stepStatus[step].completed && setCurrentStep(step)}
              >
                <div className={styles.stepNumber}>
                  {step}
                </div>
                <div className={styles.stepLabel}>{getStepLabel(step)}</div>
              </div>
            ))}
          </div>

          {/* Step 1: Document Verification */}
          {currentStep === 1 && (
            <div className={styles.stepContent}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <FiClipboard />
                  </div>
                  <h3 className={styles.cardTitle}>Document Verification</h3>
                </div>
                
                <div className={styles.documentGrid}>
                  {documentChecklist.map(doc => (
                    <div key={doc.id} className={styles.documentItem}>
                      <div className={styles.documentInfo}>
                        <div className={styles.documentName}>
                          <FiFileText /> {doc.name}
                        </div>
                        {doc.required && (
                          <div className={styles.documentRequired}>Required</div>
                        )}
                        {returnData.documents.find(d => d.name === doc.name) && (
                          <div className={styles.documentMeta}>
                            Size: {returnData.documents.find(d => d.name === doc.name).size} | 
                            Uploaded: {formatDateTime(returnData.documents.find(d => d.name === doc.name).dateUploaded)}
                          </div>
                        )}
                      </div>
                      <div className={styles.documentActions}>
                        {returnData.documents.find(d => d.name === doc.name) && (
                          <button 
                            className={styles.previewButton} 
                            onClick={() => handleDocumentPreview(doc.name)}
                          >
                            <FiEye /> Preview
                          </button>
                        )}
                        <button 
                          className={`${styles.verifyButton} ${doc.verified ? styles.verified : ''}`}
                          onClick={() => handleDocumentVerify(doc.id)}
                        >
                          {doc.verified ? (
                            <>
                              <FiCheckCircle /> Verified
                            </>
                          ) : (
                            <>
                              <FiCheckSquare /> Verify
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.documentVerificationNotes}>
                  <h3><FiMessageSquare /> Verification Notes</h3>
                  <textarea
                    placeholder="Add any notes about document verification here..."
                    value={stepStatus[1].notes}
                    onChange={(e) => handleStepNoteChange(1, e.target.value)}
                    rows={4}
                  ></textarea>
                </div>

                <div className={styles.verificationSummary}>
                  <h3><FiInfo /> Verification Summary</h3>
                  <div className={styles.verificationStats}>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Total Documents</div>
                      <div className={styles.statValue}>{documentChecklist.length}</div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Verified</div>
                      <div className={styles.statValue}>
                        {documentChecklist.filter(doc => doc.verified).length}
                      </div>
                    </div>
                    <div className={styles.statItem}>
                      <div className={styles.statLabel}>Required Verified</div>
                      <div className={`${styles.statValue} ${
                        documentChecklist.filter(doc => doc.required && !doc.verified).length > 0 
                          ? styles.textRed 
                          : ''
                      }`}>
                        {documentChecklist.filter(doc => doc.required && doc.verified).length} / {documentChecklist.filter(doc => doc.required).length}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Assessment */}
          {currentStep === 2 && (
            <div className={styles.stepContent}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <FiDollarSign />
                  </div>
                  <h3 className={styles.cardTitle}>Assessment</h3>
                </div>
                
                <div className={styles.assessmentForm}>
                  <div className={styles.assessmentField}>
                    <label>Gross Income</label>
                    <input 
                      type="text" 
                      value={formatCurrency(assessmentData.grossIncome)}
                      onChange={(e) => handleAmountChange('grossIncome', e.target.value)}
                    />
                  </div>
                  <div className={styles.assessmentField}>
                    <label>Total Deductions</label>
                    <input 
                      type="text" 
                      value={formatCurrency(assessmentData.totalDeductions)}
                      onChange={(e) => handleAmountChange('totalDeductions', e.target.value)}
                    />
                  </div>
                  <div className={styles.assessmentField}>
                    <label>Taxable Income</label>
                    <input 
                      type="text" 
                      value={formatCurrency(assessmentData.taxableIncome)}
                      disabled
                    />
                  </div>
                  <div className={styles.assessmentField}>
                    <label>Tax Due</label>
                    <input 
                      type="text" 
                      value={formatCurrency(assessmentData.taxDue)}
                      onChange={(e) => handleAmountChange('taxDue', e.target.value)}
                    />
                  </div>
                  <div className={styles.assessmentField}>
                    <label>Tax Paid</label>
                    <input 
                      type="text" 
                      value={formatCurrency(assessmentData.taxPaid)}
                      onChange={(e) => handleAmountChange('taxPaid', e.target.value)}
                    />
                  </div>
                  <div className={styles.assessmentField}>
                    <label>Balance</label>
                    <input 
                      type="text" 
                      value={formatCurrency(assessmentData.balance)}
                      disabled
                    />
                  </div>
                  <div className={`${styles.assessmentField} ${styles.fullWidth}`}>
                    <label>Assessment Remarks</label>
                    <textarea
                      placeholder="Add any remarks or notes about the assessment here..."
                      value={assessmentData.remarks}
                      onChange={(e) => setAssessmentData({...assessmentData, remarks: e.target.value})}
                      rows={4}
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className={styles.stepContent}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <FiCheckSquare />
                  </div>
                  <h3 className={styles.cardTitle}>Return Review</h3>
                </div>
                
                <div className={styles.reviewOptions}>
                  <div 
                    className={`${styles.reviewOption} ${reviewDecision.isCorrect === true ? styles.selected : ''}`}
                    onClick={() => handleReviewDecisionChange('isCorrect', true)}
                  >
                    <div className={`${styles.reviewOptionIcon} ${styles.correct}`}>
                      <FiCheckCircle />
                    </div>
                    <div className={styles.reviewOptionLabel}>Return is Correct</div>
                    <div className={styles.reviewOptionDesc}>
                      All information provided in the return appears to be accurate and complete
                    </div>
                  </div>
                  
                  <div 
                    className={`${styles.reviewOption} ${reviewDecision.isCorrect === false ? styles.selected : ''}`}
                    onClick={() => handleReviewDecisionChange('isCorrect', false)}
                  >
                    <div className={`${styles.reviewOptionIcon} ${styles.incorrect}`}>
                      <FiAlertCircle />
                    </div>
                    <div className={styles.reviewOptionLabel}>Issues Identified</div>
                    <div className={styles.reviewOptionDesc}>
                      There are issues or inconsistencies in the submitted return
                    </div>
                  </div>
                </div>
                
                {reviewDecision.isCorrect === false && (
                  <div className={styles.assessmentForm}>
                    <div className={`${styles.assessmentField} ${styles.fullWidth}`}>
                      <label>Issues Identified</label>
                      <textarea
                        placeholder="Describe the issues identified in the return..."
                        value={reviewDecision.issuesIdentified}
                        onChange={(e) => handleReviewDecisionChange('issuesIdentified', e.target.value)}
                        rows={4}
                      ></textarea>
                    </div>
                    <div className={`${styles.assessmentField} ${styles.fullWidth}`}>
                      <label>Recommendations</label>
                      <textarea
                        placeholder="Provide recommendations for addressing the issues..."
                        value={reviewDecision.recommendations}
                        onChange={(e) => handleReviewDecisionChange('recommendations', e.target.value)}
                        rows={4}
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Final Decision */}
          {currentStep === 4 && (
            <div className={styles.stepContent}>
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}>
                    <FiClipboard />
                  </div>
                  <h3 className={styles.cardTitle}>Final Decision</h3>
                </div>
                
                <div className={styles.decisionOptions}>
                  <div 
                    className={styles.decisionOption}
                    onClick={() => handleFinalDecision('Verified')}
                  >
                    <div className={`${styles.decisionOptionIcon} ${styles.verify}`}>
                      <FiCheckCircle />
                    </div>
                    <div className={styles.decisionOptionLabel}>Verify Return</div>
                    <div className={styles.decisionOptionDesc}>
                      Accept and verify the return as complete and accurate
                    </div>
                  </div>
                  
                  <div 
                    className={styles.decisionOption}
                    onClick={() => handleFinalDecision('Rejected')}
                  >
                    <div className={`${styles.decisionOptionIcon} ${styles.reject}`}>
                      <FiXCircle />
                    </div>
                    <div className={styles.decisionOptionLabel}>Reject Return</div>
                    <div className={styles.decisionOptionDesc}>
                      Reject the return due to issues that need to be corrected
                    </div>
                  </div>
                  
                  <div 
                    className={styles.decisionOption}
                    onClick={() => setFinalDecision({
                      ...finalDecision,
                      decision: 'Additional Information Requested'
                    })}
                  >
                    <div className={`${styles.decisionOptionIcon} ${styles.request}`}>
                      <FiInfo />
                    </div>
                    <div className={styles.decisionOptionLabel}>Request Information</div>
                    <div className={styles.decisionOptionDesc}>
                      Request additional information before making a final decision
                    </div>
                  </div>
                </div>
                
                {finalDecision.decision === 'Additional Information Requested' && (
                  <div className={styles.assessmentForm}>
                    <div className={`${styles.assessmentField} ${styles.fullWidth}`}>
                      <label>Additional Information Required</label>
                      <textarea
                        placeholder="Specify what additional information is needed..."
                        value={finalDecision.notes}
                        onChange={(e) => setFinalDecision({...finalDecision, notes: e.target.value})}
                        rows={4}
                      ></textarea>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className={styles.actionButtons}>
            {currentStep > 1 && (
              <button 
                className={styles.prevButton}
                onClick={handlePrevStep}
              >
                <FiArrowLeft /> Previous Step
              </button>
            )}
            
            {currentStep < totalSteps && (
              <button 
                className={styles.nextButton}
                onClick={handleNextStep}
              >
                Next Step <FiArrowRight />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className={styles.card}>
          <div className={styles.errorMessage}>
            Return not found or an error occurred.
          </div>
        </div>
      )}
      
      {/* Document Preview Modal */}
      {showDocumentPreview && (
        <div className={styles.documentPreviewModal}>
          <div className={styles.documentPreviewContent}>
            <div className={styles.previewHeader}>
              <h3>
                <FiFileText /> {previewDocument}
              </h3>
              <button 
                className={styles.closePreviewButton}
                onClick={closeDocumentPreview}
              >
                <FiX />
              </button>
            </div>
            <div className={styles.previewBody}>
              <div className={styles.previewPlaceholder}>
                <FiFileText />
                <p>Document preview not available in this demo</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxReturnProcess; 