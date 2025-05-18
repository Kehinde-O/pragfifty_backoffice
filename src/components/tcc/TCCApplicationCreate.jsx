import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Button, Alert, Select } from '../common/ui';
import { 
  FaUser, 
  FaIdCard, 
  FaPhone, 
  FaEnvelope, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaMoneyBillWave, 
  FaBriefcase, 
  FaRegCalendarAlt,
  FaCalendarAlt, 
  FaFilePdf, 
  FaUpload, 
  FaPaperclip, 
  FaCheckCircle, 
  FaExclamationTriangle, 
  FaInfoCircle, 
  FaFileContract, 
  FaFile, 
  FaTrash,
  FaSearch,
  FaReceipt,
  FaQuestionCircle,
  FaTrashAlt,
  FaArrowLeft,
  FaChevronDown,
  FaChevronRight,
  FaFileAlt,
  FaPlus,
  FaClipboardList,
  FaHome,
  FaDownload,
  FaTimes
} from 'react-icons/fa';
import styles from './TCCApplicationCreate.module.css';

// Progress steps for the application process
const formSteps = [
  { id: 'taxpayer', label: 'Taxpayer Info', icon: <FaUser /> },
  { id: 'income', label: 'Income Details', icon: <FaMoneyBillWave /> },
  { id: 'payment', label: 'Payment Records', icon: <FaReceipt /> },
  { id: 'documents', label: 'Documents', icon: <FaFileAlt /> },
  { id: 'review', label: 'Review & Submit', icon: <FaCheckCircle /> }
];

// Step progress indicator component
const StepIndicator = ({ currentStep, steps, onChange }) => {
  return (
    <div className={styles.stepIndicator} role="navigation" aria-label="Application Progress">
      {steps.map((step, index) => {
        // Determine current status (completed, active, or inactive)
        const isCompleted = currentStep > index;
        const isCurrent = currentStep === index;
        const isClickable = currentStep >= index || index === currentStep + 1;
        
        // Set the appropriate ARIA attributes for accessibility
        const ariaProps = {
          'aria-current': isCurrent ? 'step' : undefined,
          'aria-label': `${step.label} ${isCompleted ? '(completed)' : isCurrent ? '(current)' : ''}`,
          role: 'button',
          tabIndex: isClickable ? 0 : -1
        };
        
        return (
          <div 
            key={step.id}
            className={`${styles.step} ${isCompleted ? styles.completed : ''} ${isCurrent ? styles.current : ''} ${!isClickable ? styles.disabled : ''}`}
            onClick={() => isClickable && onChange(index)}
            onKeyDown={(e) => isClickable && e.key === 'Enter' && onChange(index)}
            {...ariaProps}
          >
            <div className={styles.stepIcon}>
              {isCompleted ? <FaCheckCircle /> : step.icon}
            </div>
            <div className={styles.stepLabel}>{step.label}</div>
            {index < steps.length - 1 && (
              <div className={styles.stepConnector} aria-hidden="true">
                <div className={styles.stepConnectorInner} />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

const TCCApplicationCreate = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  
  // Active step for progressive disclosure
  const [activeStep, setActiveStep] = useState(0);
  
  // Expand/collapse section states
  const [expandedSections, setExpandedSections] = useState({
    taxpayerInfo: true,
    sourceOfIncome: true,
    incomeDetails: true,
    assessmentTax: true,
    outstandingTax: true,
    developmentLevy: true,
    landUseCharge: true,
    previousTcc: true,
    supportDocuments: true,
  });
  
  // Add state for success modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [applicationNumber, setApplicationNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savingDraft, setSavingDraft] = useState(false);
  const [showDraftSavedMessage, setShowDraftSavedMessage] = useState(false);
  
  // Check for saved draft on mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('tccApplicationDraft');
    if (savedDraft) {
      try {
        const parsedDraft = JSON.parse(savedDraft);
        setFormData(parsedDraft);
        // Show notification that draft was loaded
        setShowDraftSavedMessage(true);
        setTimeout(() => setShowDraftSavedMessage(false), 5000);
      } catch (error) {
        console.error('Error loading saved draft:', error);
      }
    }
  }, []);
  
  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Handle step change
  const handleStepChange = (step) => {
    setActiveStep(step);
    
    // Auto-expand appropriate sections based on step
    const newExpandedSections = {
      taxpayerInfo: step === 0,
      sourceOfIncome: step === 1,
      incomeDetails: step === 1,
      assessmentTax: step === 2,
      outstandingTax: step === 2,
      developmentLevy: step === 2,
      landUseCharge: step === 2,
      previousTcc: step === 3,
      supportDocuments: step === 3,
    };
    
    setExpandedSections(newExpandedSections);
    
    // Scroll to top of the form
    document.querySelector(`.${styles.formContainer}`).scrollIntoView({ behavior: 'smooth' });
  };
  
  // Mock data for dropdowns - in a real application, these would come from API calls
  const sourcesOfIncome = [
    { code: 'EMPLOYMENT', description: 'Employment' },
    { code: 'BUSINESS', description: 'Business/Self-Employment' },
    { code: 'INVESTMENT', description: 'Investment Income' },
    { code: 'RENTAL', description: 'Rental Income' },
    { code: 'PROFESSIONAL', description: 'Professional Practice' },
    { code: 'OTHERS', description: 'Others' }
  ];
  
  const documentTypes = [
    { code: 'PAYSLIP', description: 'Payslip' },
    { code: 'BANK_STATEMENT', description: 'Bank Statement' },
    { code: 'TAX_RECEIPT', description: 'Tax Payment Receipt' },
    { code: 'DEV_LEVY', description: 'Development Levy Receipt' },
    { code: 'LUC_RECEIPT', description: 'Land Use Charge Receipt' },
    { code: 'PREV_TCC', description: 'Previous Year TCC' },
    { code: 'OTHER', description: 'Other Supporting Document' }
  ];
  
  // Form state
  const [formData, setFormData] = useState({
    taxpayerInfo: {
      tin: '1234567890', // Would come from the logged-in user's context
      name: 'John Doe', // Would come from the logged-in user's context
    },
    sourceOfIncome: '',
    paymentMethod: 'Y', // Y for ORAS, N for manual
    incomeDetails: {
      [currentYear - 1]: { income: '0', assessment: { rctNo: '', amount: '0', rctDate: '' }, outstanding: '0' },
      [currentYear - 2]: { income: '0', assessment: { rctNo: '', amount: '0', rctDate: '' }, outstanding: '0' },
      [currentYear - 3]: { income: '0', assessment: { rctNo: '', amount: '0', rctDate: '' }, outstanding: '0' }
    },
    developmentLevy: {
      [currentYear - 1]: { rctNo: '', amount: '0', rctDate: '' },
      [currentYear - 2]: { rctNo: '', amount: '0', rctDate: '' },
      [currentYear - 3]: { rctNo: '', amount: '0', rctDate: '' }
    },
    landUseCharge: {
      [currentYear - 1]: { rctNo: '', amount: '0', rctDate: '' },
      [currentYear - 2]: { rctNo: '', amount: '0', rctDate: '' },
      [currentYear - 3]: { rctNo: '', amount: '0', rctDate: '' }
    },
    previousTcc: {
      [currentYear - 1]: { tccNo: '', issueDate: '' },
      [currentYear - 2]: { tccNo: '', issueDate: '' },
      [currentYear - 3]: { tccNo: '', issueDate: '' }
    },
    supportDocuments: []
  });
  
  // Validation state
  const [errors, setErrors] = useState({});
  
  // File upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedDocType, setSelectedDocType] = useState('');
  
  // Handle input change
  const handleInputChange = (section, year, field, subfield, e) => {
    const value = e.target.value;
    
    if (section && year && field && subfield) {
      // Handle nested fields (e.g., assessment.rctNo)
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [year]: {
            ...prev[section][year],
            [field]: {
              ...prev[section][year][field],
              [subfield]: value
            }
          }
        }
      }));
    } else if (section && year && field) {
      // Handle simple fields in yearly data
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [year]: {
            ...prev[section][year],
            [field]: value
          }
        }
      }));
    } else if (section && field) {
      // Handle simple fields in non-yearly sections
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      }));
    } else {
      // Handle top-level fields
      setFormData(prev => ({
        ...prev,
        [section]: value
      }));
    }
  };
  
  // Handle radio button change for payment method
  const handlePaymentMethodChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      paymentMethod: value
    }));
  };
  
  // Handle file selection
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  
  // Handle document type selection
  const handleDocTypeChange = (e) => {
    setSelectedDocType(e.target.value);
  };
  
  // Add support document
  const handleAddDocument = () => {
    if (!selectedFile || !selectedDocType) {
      setErrors(prev => ({
        ...prev,
        document: 'Please select both a document type and a file'
      }));
      return;
    }
    
    const newDocument = {
      id: Date.now(), // Temporary ID for list management
      type: selectedDocType,
      typeName: documentTypes.find(type => type.code === selectedDocType)?.description || 'Document',
      fileName: selectedFile.name,
      fileSize: selectedFile.size,
      uploadDate: new Date().toISOString()
    };
    
    setFormData(prev => ({
      ...prev,
      supportDocuments: [...prev.supportDocuments, newDocument]
    }));
    
    // Reset file selection
    setSelectedFile(null);
    setSelectedDocType('');
    setErrors(prev => ({ ...prev, document: null }));
    
    // Reset the file input
    document.getElementById('supportDoc').value = '';
  };
  
  // Remove support document
  const handleRemoveDocument = (id) => {
    setFormData(prev => ({
      ...prev,
      supportDocuments: prev.supportDocuments.filter(doc => doc.id !== id)
    }));
  };
  
  // Format file size for display
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // Scroll to the first error
      const firstErrorElement = document.querySelector(`.${styles.errorMessage}`);
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Show loading state
    setIsSubmitting(true);
    
    // Submit the form (this would be an API call in a real application)
    console.log('Submitting TCC application:', formData);
    
    // Simulate API call with timeout
    setTimeout(() => {
      // Generate application number
      const generatedAppNumber = 'TCC-' + Date.now();
      setApplicationNumber(generatedAppNumber);
      setIsSubmitting(false);
      setShowSuccessModal(true);
    }, 1500);
  };
  
  // Handle modal close and redirect
  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate('/dashboard/tcc-application');
  };
  
  // Handle view details after submission
  const handleViewDetails = () => {
    setShowSuccessModal(false);
    // Navigate to the details page with the application number
    navigate(`/dashboard/tcc-application/${applicationNumber}`);
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    // Check source of income
    if (!formData.sourceOfIncome) {
      newErrors.sourceOfIncome = 'Please select a source of income';
    }
    
    // Check all fields marked as required
    const years = [currentYear - 1, currentYear - 2, currentYear - 3];
    
    years.forEach(year => {
      // If any payment amount is provided, receipt number and date are required
      if (parseInt(formData.incomeDetails[year].assessment.amount) > 0) {
        if (!formData.incomeDetails[year].assessment.rctNo) {
          newErrors[`assessment_${year}_rctNo`] = 'Receipt number is required when payment amount is specified';
        }
        if (!formData.incomeDetails[year].assessment.rctDate) {
          newErrors[`assessment_${year}_rctDate`] = 'Receipt date is required when payment amount is specified';
        }
      }
      
      if (parseInt(formData.developmentLevy[year].amount) > 0) {
        if (!formData.developmentLevy[year].rctNo) {
          newErrors[`devLevy_${year}_rctNo`] = 'Receipt number is required when payment amount is specified';
        }
        if (!formData.developmentLevy[year].rctDate) {
          newErrors[`devLevy_${year}_rctDate`] = 'Receipt date is required when payment amount is specified';
        }
      }
      
      if (parseInt(formData.landUseCharge[year].amount) > 0) {
        if (!formData.landUseCharge[year].rctNo) {
          newErrors[`luc_${year}_rctNo`] = 'Receipt number is required when payment amount is specified';
        }
        if (!formData.landUseCharge[year].rctDate) {
          newErrors[`luc_${year}_rctDate`] = 'Receipt date is required when payment amount is specified';
        }
      }
      
      // If TCC number is provided, issue date is required
      if (formData.previousTcc[year].tccNo && !formData.previousTcc[year].issueDate) {
        newErrors[`tcc_${year}_issueDate`] = 'Issue date is required when TCC number is specified';
      }
    });
    
    return newErrors;
  };
  
  // Navigate back to TCC applications list
  const handleBackToList = () => {
    navigate('/dashboard/tcc-application');
  };
  
  // Check if field has an error
  const hasError = (field) => {
    return errors[field];
  };
  
  // Save application draft
  const handleSaveDraft = () => {
    setSavingDraft(true);
    
    // Save to local storage (in a real app, this would save to the server)
    try {
      localStorage.setItem('tccApplicationDraft', JSON.stringify(formData));
      
      // Show success message
      setShowDraftSavedMessage(true);
      setTimeout(() => setShowDraftSavedMessage(false), 5000);
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setSavingDraft(false);
    }
  };
  
  // Clear application draft
  const handleClearDraft = () => {
    if (window.confirm('Are you sure you want to clear your saved draft? This action cannot be undone.')) {
      localStorage.removeItem('tccApplicationDraft');
      // Reset form to initial state (you would need to define initialFormData)
      setFormData({
        taxpayerInfo: {
          tin: '1234567890',
          name: 'John Doe',
        },
        sourceOfIncome: '',
        paymentMethod: 'Y',
        incomeDetails: {
          [currentYear - 1]: { income: '0', assessment: { rctNo: '', amount: '0', rctDate: '' }, outstanding: '0' },
          [currentYear - 2]: { income: '0', assessment: { rctNo: '', amount: '0', rctDate: '' }, outstanding: '0' },
          [currentYear - 3]: { income: '0', assessment: { rctNo: '', amount: '0', rctDate: '' }, outstanding: '0' }
        },
        developmentLevy: {
          [currentYear - 1]: { rctNo: '', amount: '0', rctDate: '' },
          [currentYear - 2]: { rctNo: '', amount: '0', rctDate: '' },
          [currentYear - 3]: { rctNo: '', amount: '0', rctDate: '' }
        },
        landUseCharge: {
          [currentYear - 1]: { rctNo: '', amount: '0', rctDate: '' },
          [currentYear - 2]: { rctNo: '', amount: '0', rctDate: '' },
          [currentYear - 3]: { rctNo: '', amount: '0', rctDate: '' }
        },
        previousTcc: {
          [currentYear - 1]: { tccNo: '', issueDate: '' },
          [currentYear - 2]: { tccNo: '', issueDate: '' },
          [currentYear - 3]: { tccNo: '', issueDate: '' }
        },
        supportDocuments: []
      });
    }
  };
  
  return (
    <div className={styles.applicationContainer}>
      {/* Draft Saved Message */}
      {showDraftSavedMessage && (
        <div className={styles.draftSavedMessage}>
          <FaCheckCircle className={styles.draftSavedIcon} />
          <span>Application draft saved successfully.</span>
          <button 
            onClick={() => setShowDraftSavedMessage(false)}
            className={styles.dismissButton}
            aria-label="Dismiss notification"
          >
            <FaTimes />
          </button>
        </div>
      )}
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <button 
                className={styles.modalCloseButton}
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.successIcon}>
                <FaCheckCircle />
              </div>
              <h2 className={styles.modalTitle}>Application Submitted Successfully!</h2>
              <p className={styles.modalMessage}>
                Your Tax Clearance Certificate application has been submitted and is now under review.
              </p>
              <div className={styles.applicationNumberBox}>
                <span className={styles.applicationNumberLabel}>Application Number:</span>
                <span className={styles.applicationNumber}>{applicationNumber}</span>
              </div>
              <p className={styles.modalInstruction}>
                You can track the status of your application in the TCC Applications dashboard.
              </p>
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={`${styles.modalButton} ${styles.modalButtonSecondary}`}
                onClick={handleCloseModal}
              >
                <FaHome className={styles.buttonIcon} />
                Go to Dashboard
              </button>
              <button 
                className={`${styles.modalButton} ${styles.modalButtonPrimary}`}
                onClick={handleViewDetails}
              >
                <FaFileAlt className={styles.buttonIcon} />
                View Application
              </button>
            </div>
          </div>
        </div>
      )}

      <div className={styles.headerSection}>
        <button 
          className={styles.backButton}
          onClick={handleBackToList}
          aria-label="Go back to TCC applications list"
        >
          <FaArrowLeft />
        </button>
        <div className={styles.headerContent}>
          <h1>Create TCC Application</h1>
          <p className={styles.headerSubtitle}>Apply for a new Tax Clearance Certificate for the past three years</p>
        </div>
        <div className={styles.headerActions}>
          <button
            type="button"
            className={styles.draftButton}
            onClick={handleSaveDraft}
            disabled={savingDraft}
          >
            {savingDraft ? (
              <>
                <span className={styles.spinner} />
                Saving...
              </>
            ) : (
              <>
                <FaRegCalendarAlt />
                Save Draft
              </>
            )}
          </button>
          <button
            type="button"
            className={styles.clearDraftButton}
            onClick={handleClearDraft}
          >
            <FaTrashAlt />
            Clear Draft
          </button>
        </div>
      </div>
      
      {/* Step Indicator */}
      <StepIndicator 
        currentStep={activeStep} 
        steps={formSteps} 
        onChange={handleStepChange} 
      />
      
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        {/* Taxpayer Information Section */}
        <div className={`${styles.formSection} ${!expandedSections.taxpayerInfo ? styles.collapsed : ''} ${activeStep === 0 ? styles.activeSection : ''}`}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('taxpayerInfo')}>
            <h2 className={styles.sectionTitle}>
              <FaIdCard className={styles.sectionIcon} />
              Taxpayer Information
            </h2>
            <div className={styles.sectionToggle}>
              {expandedSections.taxpayerInfo ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          
          {expandedSections.taxpayerInfo && (
            <div className={styles.sectionContent}>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>Taxpayer Identification Number (TIN)</label>
                  <input
                    type="text"
                    value={formData.taxpayerInfo.tin}
                    readOnly
                    className={styles.readOnly}
                  />
                </div>
                <div className={styles.formField}>
                  <label>Taxpayer Name</label>
                  <input
                    type="text"
                    value={formData.taxpayerInfo.name}
                    readOnly
                    className={styles.readOnly}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Source of Income */}
        <div className={`${styles.formSection} ${!expandedSections.sourceOfIncome ? styles.collapsed : ''} ${activeStep === 1 ? styles.activeSection : ''}`}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('sourceOfIncome')}>
            <h2 className={styles.sectionTitle}>
              <FaMoneyBillWave className={styles.sectionIcon} />
              Source of Income
            </h2>
            <div className={styles.sectionToggle}>
              {expandedSections.sourceOfIncome ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          
          {expandedSections.sourceOfIncome && (
            <div className={styles.sectionContent}>
              <div className={styles.formRow}>
                <div className={`${styles.formField} ${hasError('sourceOfIncome') ? styles.error : ''}`}>
                  <label>
                    Source of Income <span className={styles.required}>*</span>
                    <span className={styles.tooltipIcon}>
                      <FaQuestionCircle data-tooltip="Select your primary source of income for tax assessment" />
                    </span>
                  </label>
                  <Select
                    id="sourceOfIncome"
                    value={formData.sourceOfIncome}
                    onChange={(e) => handleInputChange('sourceOfIncome', null, null, null, e)}
                    required
                  >
                    <option value="">-- Select Source of Income --</option>
                    {sourcesOfIncome.map((source) => (
                      <option key={source.code} value={source.code}>
                        {source.description}
                      </option>
                    ))}
                  </Select>
                  {hasError('sourceOfIncome') && (
                    <div className={styles.errorMessage}>
                      <FaExclamationTriangle />
                      {errors.sourceOfIncome}
                    </div>
                  )}
                </div>
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label>
                    Was payment made on PragFifty?
                    <span className={styles.tooltipIcon}>
                      <FaQuestionCircle data-tooltip="Indicate if you've previously made tax payments through the PragFifty Online Revenue Assessment System" />
                    </span>
                  </label>
                  <div className={styles.radioGroup}>
                    <label className={`${styles.radioCard} ${formData.paymentMethod === "Y" ? styles.selected : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Y"
                        checked={formData.paymentMethod === "Y"}
                        onChange={handlePaymentMethodChange}
                      />
                      <div className={styles.radioContent}>
                        <FaCheckCircle className={styles.radioIcon} />
                        <span>Yes</span>
                      </div>
                    </label>
                    <label className={`${styles.radioCard} ${formData.paymentMethod === "N" ? styles.selected : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="N"
                        checked={formData.paymentMethod === "N"}
                        onChange={handlePaymentMethodChange}
                      />
                      <div className={styles.radioContent}>
                        <FaExclamationTriangle className={styles.radioIcon} />
                        <span>No</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              {formData.paymentMethod === "N" && (
                <div className={styles.formNote}>
                  <FaExclamationTriangle className={styles.noteIcon} />
                  <p>If no, kindly provide us with your evidence of payment by uploading the receipt in the Documents section.</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Income Details Section */}
        <div className={`${styles.formSection} ${!expandedSections.incomeDetails ? styles.collapsed : ''} ${activeStep === 1 ? styles.activeSection : ''}`}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('incomeDetails')}>
            <h2 className={styles.sectionTitle}>
              <FaMoneyBillWave className={styles.sectionIcon} />
              Total Income
            </h2>
            <div className={styles.sectionToggle}>
              {expandedSections.incomeDetails ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          
          {expandedSections.incomeDetails && (
            <div className={styles.sectionContent}>
              <div className={styles.formNote}>
                <FaInfoCircle className={styles.noteIcon} style={{ color: '#4285F4' }} />
                <p style={{ color: '#4b5563' }}>Enter your total income for each of the last three tax years.</p>
              </div>
              
              <div className={styles.taxYearsGrid}>
                {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                  <div key={`income-${year}`} className={styles.taxYearCard}>
                    <div className={styles.taxYearHeader}>
                      <h3 className={styles.taxYearTitle}>{year}</h3>
                    </div>
                    <div className={styles.taxYearBody}>
                      <div className={styles.formField}>
                        <label>
                          Income <span className={styles.required}>*</span>
                          <span className={styles.tooltipIcon}>
                            <FaQuestionCircle data-tooltip={`Total income for the year ${year}`} />
                          </span>
                        </label>
                        <div className={styles.inputWithPrefix}>
                          <span className={styles.inputPrefix}>₦</span>
                          <input
                            type="text"
                            id={`income-${year}`}
                            value={formData.incomeDetails[year].income}
                            onChange={(e) => handleInputChange('incomeDetails', year, 'income', null, e)}
                            placeholder="0.00"
                            className={styles.numericInput}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Assessment Tax Paid Section */}
        <div className={`${styles.formSection} ${!expandedSections.assessmentTax ? styles.collapsed : ''} ${activeStep === 2 ? styles.activeSection : ''}`}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('assessmentTax')}>
            <h2 className={styles.sectionTitle}>
              <FaReceipt className={styles.sectionIcon} />
              Assessment Tax Paid
            </h2>
            <div className={styles.sectionToggle}>
              {expandedSections.assessmentTax ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          
          {expandedSections.assessmentTax && (
            <div className={styles.sectionContent}>
              <div className={styles.taxYearsGrid}>
                {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                  <div key={`assessment-${year}`} className={styles.taxYearCard}>
                    <div className={styles.taxYearHeader}>
                      <h3 className={styles.taxYearTitle}>{year}</h3>
                    </div>
                    <div className={styles.taxYearBody}>
                      <div className={`${styles.formField} ${hasError(`assessment_${year}_rctNo`) ? styles.error : ''}`}>
                        <label>Receipt No.</label>
                        <input
                          type="text"
                          id={`tax-rctno-${year}`}
                          value={formData.incomeDetails[year].assessment.rctNo}
                          onChange={(e) => handleInputChange('incomeDetails', year, 'assessment', 'rctNo', e)}
                          placeholder="Enter receipt number"
                        />
                        {hasError(`assessment_${year}_rctNo`) && (
                          <div className={styles.errorMessage}>{errors[`assessment_${year}_rctNo`]}</div>
                        )}
                      </div>
                      
                      <div className={styles.formField}>
                        <label>Amount <span className={styles.required}>*</span></label>
                        <div className={styles.inputWithPrefix}>
                          <span className={styles.inputPrefix}>₦</span>
                          <input
                            type="text"
                            id={`tax-paid-${year}`}
                            value={formData.incomeDetails[year].assessment.amount}
                            onChange={(e) => handleInputChange('incomeDetails', year, 'assessment', 'amount', e)}
                            className={styles.numericInput}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className={`${styles.formField} ${hasError(`assessment_${year}_rctDate`) ? styles.error : ''}`}>
                        <label>Receipt Date</label>
                        <div className={styles.dateField}>
                          <input
                            type="date"
                            id={`tax-rctdt-${year}`}
                            value={formData.incomeDetails[year].assessment.rctDate}
                            onChange={(e) => handleInputChange('incomeDetails', year, 'assessment', 'rctDate', e)}
                          />
                          <FaCalendarAlt className={styles.dateIcon} />
                        </div>
                        {hasError(`assessment_${year}_rctDate`) && (
                          <div className={styles.errorMessage}>{errors[`assessment_${year}_rctDate`]}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Outstanding Tax Section */}
        <div className={`${styles.formSection} ${!expandedSections.outstandingTax ? styles.collapsed : ''} ${activeStep === 2 ? styles.activeSection : ''}`}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('outstandingTax')}>
            <h2 className={styles.sectionTitle}>
              <FaMoneyBillWave className={styles.sectionIcon} />
              Outstanding Tax
            </h2>
            <div className={styles.sectionToggle}>
              {expandedSections.outstandingTax ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          
          {expandedSections.outstandingTax && (
            <div className={styles.sectionContent}>
              <div className={styles.taxYearsGrid}>
                {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                  <div key={`outstanding-${year}`} className={styles.taxYearCard}>
                    <div className={styles.taxYearHeader}>
                      <h3 className={styles.taxYearTitle}>{year}</h3>
                    </div>
                    <div className={styles.taxYearBody}>
                      <div className={styles.formField}>
                        <label>
                          Outstanding Tax <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputWithPrefix}>
                          <span className={styles.inputPrefix}>₦</span>
                          <input
                            type="text"
                            id={`outstanding-${year}`}
                            value={formData.incomeDetails[year].outstanding}
                            onChange={(e) => handleInputChange('incomeDetails', year, 'outstanding', null, e)}
                            className={styles.numericInput}
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Development Levy Section */}
        <div className={`${styles.formSection} ${!expandedSections.developmentLevy ? styles.collapsed : ''} ${activeStep === 2 ? styles.activeSection : ''}`}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('developmentLevy')}>
            <h2 className={styles.sectionTitle}>
              <FaMoneyBillWave className={styles.sectionIcon} />
              Development Levy
            </h2>
            <div className={styles.sectionToggle}>
              {expandedSections.developmentLevy ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          
          {expandedSections.developmentLevy && (
            <div className={styles.sectionContent}>
              <div className={styles.taxYearsGrid}>
                {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                  <div key={`development-${year}`} className={styles.taxYearCard}>
                    <div className={styles.taxYearHeader}>
                      <h3 className={styles.taxYearTitle}>{year}</h3>
                    </div>
                    <div className={styles.taxYearBody}>
                      <div className={`${styles.formField} ${hasError(`devLevy_${year}_rctNo`) ? styles.error : ''}`}>
                        <label>Receipt No.</label>
                        <input
                          type="text"
                          id={`devLevy-rctno-${year}`}
                          value={formData.developmentLevy[year].rctNo}
                          onChange={(e) => handleInputChange('developmentLevy', year, 'rctNo', null, e)}
                          placeholder="Enter receipt number"
                        />
                        {hasError(`devLevy_${year}_rctNo`) && (
                          <div className={styles.errorMessage}>{errors[`devLevy_${year}_rctNo`]}</div>
                        )}
                      </div>
                      
                      <div className={styles.formField}>
                        <label>
                          Development Levy <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputWithPrefix}>
                          <span className={styles.inputPrefix}>₦</span>
                          <input
                            type="text"
                            id={`development-${year}`}
                            value={formData.developmentLevy[year].amount}
                            onChange={(e) => handleInputChange('developmentLevy', year, 'amount', null, e)}
                            className={styles.numericInput}
                            placeholder="0.00"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className={`${styles.formField} ${hasError(`devLevy_${year}_rctDate`) ? styles.error : ''}`}>
                        <label>Receipt Date</label>
                        <div className={styles.dateField}>
                          <input
                            type="date"
                            id={`devLevy-rctdt-${year}`}
                            value={formData.developmentLevy[year].rctDate}
                            onChange={(e) => handleInputChange('developmentLevy', year, 'rctDate', null, e)}
                          />
                          <FaCalendarAlt className={styles.dateIcon} />
                        </div>
                        {hasError(`devLevy_${year}_rctDate`) && (
                          <div className={styles.errorMessage}>{errors[`devLevy_${year}_rctDate`]}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Land Use Charge Section */}
        <div className={`${styles.formSection} ${!expandedSections.landUseCharge ? styles.collapsed : ''} ${activeStep === 2 ? styles.activeSection : ''}`}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('landUseCharge')}>
            <h2 className={styles.sectionTitle}>
              <FaMoneyBillWave className={styles.sectionIcon} />
              Land Use Charge
            </h2>
            <div className={styles.sectionToggle}>
              {expandedSections.landUseCharge ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          
          {expandedSections.landUseCharge && (
            <div className={styles.sectionContent}>
              <div className={styles.taxYearsGrid}>
                {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                  <div key={`landUse-${year}`} className={styles.taxYearCard}>
                    <div className={styles.taxYearHeader}>
                      <h3 className={styles.taxYearTitle}>{year}</h3>
                    </div>
                    <div className={styles.taxYearBody}>
                      <div className={`${styles.formField} ${hasError(`luc_${year}_rctNo`) ? styles.error : ''}`}>
                        <label>Receipt No.</label>
                        <input
                          type="text"
                          id={`luc-rctno-${year}`}
                          value={formData.landUseCharge[year].rctNo}
                          onChange={(e) => handleInputChange('landUseCharge', year, 'rctNo', null, e)}
                          placeholder="Enter receipt number"
                        />
                        {hasError(`luc_${year}_rctNo`) && (
                          <div className={styles.errorMessage}>{errors[`luc_${year}_rctNo`]}</div>
                        )}
                      </div>
                      
                      <div className={styles.formField}>
                        <label>
                          Land Use Charge <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.inputWithPrefix}>
                          <span className={styles.inputPrefix}>₦</span>
                          <input
                            type="text"
                            id={`landUse-${year}`}
                            value={formData.landUseCharge[year].amount}
                            onChange={(e) => handleInputChange('landUseCharge', year, 'amount', null, e)}
                            className={styles.numericInput}
                            placeholder="0.00"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className={`${styles.formField} ${hasError(`luc_${year}_rctDate`) ? styles.error : ''}`}>
                        <label>Receipt Date</label>
                        <div className={styles.dateField}>
                          <input
                            type="date"
                            id={`luc-rctdt-${year}`}
                            value={formData.landUseCharge[year].rctDate}
                            onChange={(e) => handleInputChange('landUseCharge', year, 'rctDate', null, e)}
                          />
                          <FaCalendarAlt className={styles.dateIcon} />
                        </div>
                        {hasError(`luc_${year}_rctDate`) && (
                          <div className={styles.errorMessage}>{errors[`luc_${year}_rctDate`]}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Previous TCC Section */}
        <div className={`${styles.formSection} ${!expandedSections.previousTcc ? styles.collapsed : ''} ${activeStep === 3 ? styles.activeSection : ''}`}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('previousTcc')}>
            <h2 className={styles.sectionTitle}>
              <FaFileContract className={styles.sectionIcon} />
              Previous TCC
            </h2>
            <div className={styles.sectionToggle}>
              {expandedSections.previousTcc ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          
          {expandedSections.previousTcc && (
            <div className={styles.sectionContent}>
              <div className={styles.taxYearsGrid}>
                {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                  <div key={`previous-${year}`} className={styles.taxYearCard}>
                    <div className={styles.taxYearHeader}>
                      <h3 className={styles.taxYearTitle}>{year}</h3>
                    </div>
                    <div className={styles.taxYearBody}>
                      <div className={styles.formField}>
                        <label>
                          TCC Number <span className={styles.required}>*</span>
                        </label>
                        <input
                          type="text"
                          id={`tccNo-${year}`}
                          value={formData.previousTcc[year].tccNo}
                          onChange={(e) => handleInputChange('previousTcc', year, 'tccNo', null, e)}
                          placeholder="Enter TCC number if applicable"
                        />
                      </div>
                      <div className={`${styles.formField} ${hasError(`tcc_${year}_issueDate`) ? styles.error : ''}`}>
                        <label>
                          Issue Date <span className={styles.required}>*</span>
                        </label>
                        <div className={styles.dateField}>
                          <input
                            type="date"
                            id={`tccDate-${year}`}
                            value={formData.previousTcc[year].issueDate}
                            onChange={(e) => handleInputChange('previousTcc', year, 'issueDate', null, e)}
                          />
                          <FaCalendarAlt className={styles.dateIcon} />
                        </div>
                        {hasError(`tcc_${year}_issueDate`) && (
                          <div className={styles.errorMessage}>{errors[`tcc_${year}_issueDate`]}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Documents Section */}
        <div className={`${styles.formSection} ${!expandedSections.supportDocuments ? styles.collapsed : ''} ${activeStep === 3 ? styles.activeSection : ''}`}>
          <div className={styles.sectionHeader} onClick={() => toggleSection('supportDocuments')}>
            <h2 className={styles.sectionTitle}>
              <FaFileAlt className={styles.sectionIcon} />
              Supporting Documents
            </h2>
            <div className={styles.sectionToggle}>
              {expandedSections.supportDocuments ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          
          {expandedSections.supportDocuments && (
            <div className={styles.sectionContent}>
              <div className={styles.formNote} style={{ backgroundColor: 'rgba(66, 133, 244, 0.08)', marginBottom: '24px' }}>
                <FaInfoCircle className={styles.noteIcon} style={{ color: '#4285F4' }} />
                <p style={{ color: '#1f2937' }}>Upload relevant documents to support your TCC application. Acceptable formats include PDF, JPG, and PNG files (max 5MB each).</p>
              </div>
              
              <div className={styles.fileUploadArea}>
                <div className={styles.fileUploadHeader}>
                  <FaUpload className={styles.fileUploadIcon} />
                  <h3 className={styles.fileUploadTitle}>Upload Supporting Documents</h3>
                </div>
                
                <div className={styles.fileUploadControls}>
                  <div className={styles.formField}>
                    <label className={styles.fileInputLabel}>Document Type <span className={styles.required}>*</span></label>
                    <Select
                      id="docType"
                      value={selectedDocType}
                      onChange={handleDocTypeChange}
                    >
                      <option value="">-- Select Document Type --</option>
                      {documentTypes.map((type) => (
                        <option key={type.code} value={type.code}>
                          {type.description}
                        </option>
                      ))}
                    </Select>
                  </div>
                  
                  <div className={styles.formField}>
                    <label className={styles.fileInputLabel}>File <span className={styles.required}>*</span></label>
                    <input
                      type="file"
                      id="supportDoc"
                      onChange={handleFileChange}
                      className={styles.fileInput}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </div>
                  
                  <button
                    type="button"
                    className={styles.addButton}
                    onClick={handleAddDocument}
                    disabled={!selectedFile || !selectedDocType}
                  >
                    <FaPlus />
                    Add
                  </button>
                </div>
                
                {hasError('document') && (
                  <div className={styles.errorMessage}>
                    <FaExclamationTriangle />
                    {errors.document}
                  </div>
                )}
              </div>
              
              {formData.supportDocuments.length > 0 ? (
                <div className={styles.documentList}>
                  <h4 style={{ marginBottom: '16px', fontSize: '1rem', color: '#4b5563' }}>Uploaded Documents</h4>
                  {formData.supportDocuments.map((doc) => (
                    <div key={doc.id} className={styles.documentItem}>
                      <FaFile className={styles.documentIcon} />
                      <div className={styles.documentInfo}>
                        <p className={styles.documentName}>{doc.fileName}</p>
                        <span className={styles.documentMeta}>
                          {doc.typeName} • {formatFileSize(doc.fileSize)}
                        </span>
                      </div>
                      <div className={styles.documentAction}>
                        <button
                          type="button"
                          className={styles.removeButton}
                          onClick={() => handleRemoveDocument(doc.id)}
                          title="Remove Document"
                          aria-label="Remove Document"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ marginTop: '24px', textAlign: 'center', padding: '24px', backgroundColor: '#f9fafb', borderRadius: '8px', color: '#6b7280' }}>
                  <FaFilePdf style={{ fontSize: '2rem', marginBottom: '12px', opacity: '0.5' }} />
                  <p>No documents uploaded yet. Please add supporting documents.</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className={styles.formActions}>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.buttonOutline}`}
            onClick={() => activeStep > 0 && handleStepChange(activeStep - 1)}
            disabled={activeStep === 0}
          >
            Previous
          </button>
          
          {activeStep < formSteps.length - 1 ? (
            <button
              type="button"
              className={`${styles.actionButton} ${styles.buttonPrimary}`}
              onClick={() => handleStepChange(activeStep + 1)}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className={`${styles.actionButton} ${styles.buttonPrimary}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} style={{ marginRight: '8px' }} />
                  Submitting...
                </>
              ) : (
                <>
                  <FaCheckCircle style={{ marginRight: '8px' }} />
                  Submit Application
                </>
              )}
            </button>
          )}
        </div>
        
        {/* Declaration Box - Only show on the final step */}
        {activeStep === formSteps.length - 1 && (
          <>
            <div className={styles.formSection}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <FaClipboardList className={styles.sectionIcon} />
                  Application Summary
                </h2>
              </div>
              <div className={styles.sectionContent}>
                <div className={styles.summarySection}>
                  <h3 className={styles.summaryHeading}>Taxpayer Information</h3>
                  <div className={styles.summaryRow}>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>TIN:</span>
                      <span className={styles.summaryValue}>{formData.taxpayerInfo.tin}</span>
                    </div>
                    <div className={styles.summaryItem}>
                      <span className={styles.summaryLabel}>Name:</span>
                      <span className={styles.summaryValue}>{formData.taxpayerInfo.name}</span>
                    </div>
                  </div>
                  
                  <h3 className={styles.summaryHeading}>Income Details</h3>
                  <div className={styles.summaryTable}>
                    <div className={styles.summaryTableHeader}>
                      <div className={styles.summaryTableCell}>Year</div>
                      <div className={styles.summaryTableCell}>Income</div>
                      <div className={styles.summaryTableCell}>Assessment Amount</div>
                      <div className={styles.summaryTableCell}>Outstanding Tax</div>
                    </div>
                    {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                      <div key={`summary-income-${year}`} className={styles.summaryTableRow}>
                        <div className={styles.summaryTableCell}>{year}</div>
                        <div className={styles.summaryTableCell}>₦{parseInt(formData.incomeDetails[year].income).toLocaleString()}</div>
                        <div className={styles.summaryTableCell}>₦{parseInt(formData.incomeDetails[year].assessment.amount).toLocaleString()}</div>
                        <div className={styles.summaryTableCell}>₦{parseInt(formData.incomeDetails[year].outstanding).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className={styles.summaryHeading}>Development Levy & Land Use Charge</h3>
                  <div className={styles.summaryTable}>
                    <div className={styles.summaryTableHeader}>
                      <div className={styles.summaryTableCell}>Year</div>
                      <div className={styles.summaryTableCell}>Development Levy</div>
                      <div className={styles.summaryTableCell}>Land Use Charge</div>
                    </div>
                    {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                      <div key={`summary-other-${year}`} className={styles.summaryTableRow}>
                        <div className={styles.summaryTableCell}>{year}</div>
                        <div className={styles.summaryTableCell}>₦{parseInt(formData.developmentLevy[year].amount).toLocaleString()}</div>
                        <div className={styles.summaryTableCell}>₦{parseInt(formData.landUseCharge[year].amount).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                  
                  <h3 className={styles.summaryHeading}>Supporting Documents</h3>
                  {formData.supportDocuments.length > 0 ? (
                    <ul className={styles.summaryDocumentList}>
                      {formData.supportDocuments.map((doc) => (
                        <li key={doc.id} className={styles.summaryDocumentItem}>
                          <FaFile className={styles.summaryDocumentIcon} />
                          <span>{doc.typeName}: {doc.fileName}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className={styles.summaryEmptyMessage}>No supporting documents uploaded.</p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles.declarationBox}>
              <div className={styles.declarationHeader}>
                <FaInfoCircle className={styles.declarationIcon} />
                <h3>Declaration</h3>
              </div>
              <p>
                I declare that the information provided in this application is true and correct to the best of my knowledge.
                I understand that providing false information may result in the rejection of my application and potential legal consequences.
              </p>
              <div className={styles.declarationCheckbox}>
                <input type="checkbox" id="declaration" required />
                <label htmlFor="declaration">
                  I agree to the above declaration
                </label>
              </div>
              
              <div style={{ marginTop: '24px', padding: '16px', backgroundColor: 'rgba(253, 224, 71, 0.15)', borderRadius: '8px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                <FaExclamationTriangle style={{ color: '#f59e0b', fontSize: '1.25rem', flexShrink: 0, marginTop: '2px' }} />
                <div>
                  <p style={{ margin: '0 0 8px 0', fontWeight: '500', color: '#78350f' }}>Please note:</p>
                  <ul style={{ paddingLeft: '20px', margin: '0', color: '#78350f', fontSize: '0.9rem' }}>
                    <li>Your application will be reviewed by the tax authority.</li>
                    <li>You may be contacted for additional information if needed.</li>
                    <li>Once approved, your TCC will be available for download from your dashboard.</li>
                    <li>The review process typically takes 3-5 working days.</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default TCCApplicationCreate;