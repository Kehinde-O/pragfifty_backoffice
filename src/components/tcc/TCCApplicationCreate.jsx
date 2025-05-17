import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button, Select } from '../common/ui';
import { 
  FaArrowLeft, 
  FaInfoCircle, 
  FaReceipt, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaUpload, 
  FaFileAlt, 
  FaTrashAlt, 
  FaCheckCircle, 
  FaExclamationTriangle,
  FaBuilding,
  FaIdCard,
  FaChevronRight,
  FaChevronDown,
  FaQuestionCircle,
  FaUser
} from 'react-icons/fa';
import './TCC.css';

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
    <div className="step-indicator">
      {steps.map((step, index) => (
        <div 
          key={step.id}
          className={`step ${currentStep >= index ? 'active' : ''} ${currentStep === index ? 'current' : ''}`}
          onClick={() => onChange(index)}
        >
          <div className="step-icon">
            {step.icon}
          </div>
          <div className="step-label">{step.label}</div>
          {index < steps.length - 1 && <div className="step-connector"></div>}
        </div>
      ))}
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
    document.querySelector('.tcc-form').scrollIntoView({ behavior: 'smooth' });
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
      const firstErrorElement = document.querySelector('.error-message');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
    // Submit the form (this would be an API call in a real application)
    console.log('Submitting TCC application:', formData);
    
    // Show success message and navigate back (in a real app, you might show a confirmation page)
    alert('Your TCC application has been submitted successfully! Application number: TCC-' + Date.now());
    navigate('/dashboard/tcc-application');
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
  
  return (
    <div className="tcc-application-container">
      <div className="page-header">
        <div className="page-title-section">
          <Button 
            variant="outline" 
            size="md" 
            onClick={handleBackToList}
            leadingIcon={<FaArrowLeft />}
            className="back-button"
            aria-label="Go back to TCC applications list"
          >
            Back
          </Button>
          <div>
            <h1 className="page-title">Create TCC Application</h1>
            <p className="page-subtitle">Apply for a new Tax Clearance Certificate for the past three years</p>
          </div>
        </div>
      </div>
      
      <Card className="stepper-card">
        <StepIndicator 
          currentStep={activeStep} 
          steps={formSteps} 
          onChange={handleStepChange} 
        />
      </Card>
      
      <Card>
        <form className="tcc-form" onSubmit={handleSubmit}>
          {/* Taxpayer Information Section */}
          <div className={`tcc-form-section ${!expandedSections.taxpayerInfo ? 'collapsed' : ''} ${activeStep === 0 ? 'active-section' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('taxpayerInfo')}>
              <h2 className="tcc-form-section-title">
                <FaIdCard className="section-icon" />
                Taxpayer Information
              </h2>
              <div className="section-toggle">
                {expandedSections.taxpayerInfo ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>
            
            {expandedSections.taxpayerInfo && (
              <div className="section-content">
                <div className="tcc-form-row">
                  <div className="tcc-form-field">
                    <label>Taxpayer Identification Number (TIN)</label>
                    <input
                      type="text"
                      value={formData.taxpayerInfo.tin}
                      readOnly
                      className="read-only"
                    />
                  </div>
                  <div className="tcc-form-field">
                    <label>Taxpayer Name</label>
                    <input
                      type="text"
                      value={formData.taxpayerInfo.name}
                      readOnly
                      className="read-only"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Source of Income */}
          <div className={`tcc-form-section ${!expandedSections.sourceOfIncome ? 'collapsed' : ''} ${activeStep === 1 ? 'active-section' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('sourceOfIncome')}>
              <h2 className="tcc-form-section-title">
                <FaMoneyBillWave className="section-icon" />
                Source of Income
              </h2>
              <div className="section-toggle">
                {expandedSections.sourceOfIncome ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>
            
            {expandedSections.sourceOfIncome && (
              <div className="section-content">
                <div className="tcc-form-row">
                  <div className={`tcc-form-field ${hasError('sourceOfIncome') ? 'error' : ''}`}>
                    <label>
                      Source of Income <span className="required">*</span>
                      <span className="tooltip-icon">
                        <FaQuestionCircle data-tooltip="Select your primary source of income" />
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
                      <div className="error-message">{errors.sourceOfIncome}</div>
                    )}
                  </div>
                </div>
                
                <div className="tcc-form-row">
                  <div className="tcc-form-field">
                    <label className="highlight-label">
                      Was payment made on PragFifty?
                      <span className="tooltip-icon">
                        <FaQuestionCircle data-tooltip="PragFifty is the Online Revenue Assessment System" />
                      </span>
                    </label>
                    <div className="radio-group modern">
                      <label className={`radio-card ${formData.paymentMethod === "Y" ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="Y"
                          checked={formData.paymentMethod === "Y"}
                          onChange={handlePaymentMethodChange}
                        />
                        <div className="radio-content">
                          <FaCheckCircle className="radio-icon" />
                          <span>Yes</span>
                        </div>
                      </label>
                      <label className={`radio-card ${formData.paymentMethod === "N" ? 'selected' : ''}`}>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="N"
                          checked={formData.paymentMethod === "N"}
                          onChange={handlePaymentMethodChange}
                        />
                        <div className="radio-content">
                          <FaExclamationTriangle className="radio-icon" />
                          <span>No</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
                
                {formData.paymentMethod === "N" && (
                  <div className="form-note">
                    <FaExclamationTriangle className="note-icon warning" />
                    <p>If no, kindly provide us with your evidence of payment by uploading the receipt below.</p>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Income Details Section */}
          <div className={`tcc-form-section ${!expandedSections.incomeDetails ? 'collapsed' : ''} ${activeStep === 1 ? 'active-section' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('incomeDetails')}>
              <h2 className="tcc-form-section-title">
                <FaMoneyBillWave className="section-icon" />
                Total Income
              </h2>
              <div className="section-toggle">
                {expandedSections.incomeDetails ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>
            
            {expandedSections.incomeDetails && (
              <div className="section-content">
                <div className="tcc-form-cards">
                  {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                    <div key={`income-${year}`} className="year-card">
                      <div className="year-card-header">
                        <h3>{year}</h3>
                      </div>
                      <div className="year-card-body">
                        <div className="tcc-form-field">
                          <label>
                            Income <span className="required">*</span>
                          </label>
                          <div className="input-with-prefix">
                            <span className="input-prefix">₦</span>
                            <input
                              type="text"
                              id={`income-${year}`}
                              value={formData.incomeDetails[year].income}
                              onChange={(e) => handleInputChange('incomeDetails', year, 'income', null, e)}
                              className="numeric-input"
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
          <div className={`tcc-form-section ${!expandedSections.assessmentTax ? 'collapsed' : ''} ${activeStep === 2 ? 'active-section' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('assessmentTax')}>
              <h2 className="tcc-form-section-title">
                <FaReceipt className="section-icon" />
                Assessment Tax Paid
              </h2>
              <div className="section-toggle">
                {expandedSections.assessmentTax ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>
            
            {expandedSections.assessmentTax && (
              <div className="section-content">
                <div className="tcc-form-cards">
                  {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                    <div key={`assessment-${year}`} className="year-card">
                      <div className="year-card-header">
                        <h3>{year}</h3>
                      </div>
                      <div className="year-card-body">
                        <div className={`tcc-form-field ${hasError(`assessment_${year}_rctNo`) ? 'error' : ''}`}>
                          <label>
                            Receipt No.
                          </label>
                          <input
                            type="text"
                            id={`tax-rctno-${year}`}
                            value={formData.incomeDetails[year].assessment.rctNo}
                            onChange={(e) => handleInputChange('incomeDetails', year, 'assessment', 'rctNo', e)}
                          />
                          {hasError(`assessment_${year}_rctNo`) && (
                            <div className="error-message">{errors[`assessment_${year}_rctNo`]}</div>
                          )}
                        </div>
                        
                        <div className="tcc-form-field">
                          <label>
                            Amount <span className="required">*</span>
                          </label>
                          <div className="input-with-prefix">
                            <span className="input-prefix">₦</span>
                            <input
                              type="text"
                              id={`tax-paid-${year}`}
                              value={formData.incomeDetails[year].assessment.amount}
                              onChange={(e) => handleInputChange('incomeDetails', year, 'assessment', 'amount', e)}
                              className="numeric-input"
                              required
                            />
                          </div>
                        </div>
                        
                        <div className={`tcc-form-field ${hasError(`assessment_${year}_rctDate`) ? 'error' : ''}`}>
                          <label>
                            Receipt Date
                          </label>
                          <div className="date-field">
                            <input
                              type="date"
                              id={`tax-rctdt-${year}`}
                              value={formData.incomeDetails[year].assessment.rctDate}
                              onChange={(e) => handleInputChange('incomeDetails', year, 'assessment', 'rctDate', e)}
                            />
                            <FaCalendarAlt className="date-icon" />
                          </div>
                          {hasError(`assessment_${year}_rctDate`) && (
                            <div className="error-message">{errors[`assessment_${year}_rctDate`]}</div>
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
          <div className={`tcc-form-section ${!expandedSections.outstandingTax ? 'collapsed' : ''} ${activeStep === 2 ? 'active-section' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('outstandingTax')}>
              <h2 className="tcc-form-section-title">
                <FaExclamationTriangle className="section-icon" />
                Total Outstanding Tax
              </h2>
              <div className="section-toggle">
                {expandedSections.outstandingTax ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>
            
            {expandedSections.outstandingTax && (
              <div className="section-content">
                <div className="tcc-form-cards">
                  {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                    <div key={`outstanding-${year}`} className="year-card">
                      <div className="year-card-header">
                        <h3>{year}</h3>
                      </div>
                      <div className="year-card-body">
                        <div className="tcc-form-field">
                          <label>
                            Outstanding <span className="required">*</span>
                          </label>
                          <div className="input-with-prefix">
                            <span className="input-prefix">₦</span>
                            <input
                              type="text"
                              id={`outstanding-${year}`}
                              value={formData.incomeDetails[year].outstanding}
                              onChange={(e) => handleInputChange('incomeDetails', year, 'outstanding', null, e)}
                              className="numeric-input"
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
          <div className={`tcc-form-section ${!expandedSections.developmentLevy ? 'collapsed' : ''} ${activeStep === 2 ? 'active-section' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('developmentLevy')}>
              <h2 className="tcc-form-section-title">
                <FaReceipt className="section-icon" />
                Development Levy Paid
              </h2>
              <div className="section-toggle">
                {expandedSections.developmentLevy ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>
            
            {expandedSections.developmentLevy && (
              <div className="section-content">
                <div className="tcc-form-cards">
                  {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                    <div key={`devlevy-${year}`} className="year-card">
                      <div className="year-card-header">
                        <h3>{year}</h3>
                      </div>
                      <div className="year-card-body">
                        <div className={`tcc-form-field ${hasError(`devLevy_${year}_rctNo`) ? 'error' : ''}`}>
                          <label>Receipt No.</label>
                          <input
                            type="text"
                            id={`dl-rctno-${year}`}
                            value={formData.developmentLevy[year].rctNo}
                            onChange={(e) => handleInputChange('developmentLevy', year, 'rctNo', null, e)}
                          />
                          {hasError(`devLevy_${year}_rctNo`) && (
                            <div className="error-message">{errors[`devLevy_${year}_rctNo`]}</div>
                          )}
                        </div>
                        
                        <div className="tcc-form-field">
                          <label>Amount</label>
                          <div className="input-with-prefix">
                            <span className="input-prefix">₦</span>
                            <input
                              type="text"
                              id={`dl-paid-${year}`}
                              value={formData.developmentLevy[year].amount}
                              onChange={(e) => handleInputChange('developmentLevy', year, 'amount', null, e)}
                              className="numeric-input"
                            />
                          </div>
                        </div>
                        
                        <div className={`tcc-form-field ${hasError(`devLevy_${year}_rctDate`) ? 'error' : ''}`}>
                          <label>Receipt Date</label>
                          <div className="date-field">
                            <input
                              type="date"
                              id={`dl-rctdt-${year}`}
                              value={formData.developmentLevy[year].rctDate}
                              onChange={(e) => handleInputChange('developmentLevy', year, 'rctDate', null, e)}
                            />
                            <FaCalendarAlt className="date-icon" />
                          </div>
                          {hasError(`devLevy_${year}_rctDate`) && (
                            <div className="error-message">{errors[`devLevy_${year}_rctDate`]}</div>
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
          <div className={`tcc-form-section ${!expandedSections.landUseCharge ? 'collapsed' : ''} ${activeStep === 2 ? 'active-section' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('landUseCharge')}>
              <h2 className="tcc-form-section-title">
                <FaBuilding className="section-icon" />
                Land Use Charge (LUC)
              </h2>
              <div className="section-toggle">
                {expandedSections.landUseCharge ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>
            
            {expandedSections.landUseCharge && (
              <div className="section-content">
                <div className="tcc-form-cards">
                  {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                    <div key={`luc-${year}`} className="year-card">
                      <div className="year-card-header">
                        <h3>{year}</h3>
                      </div>
                      <div className="year-card-body">
                        <div className={`tcc-form-field ${hasError(`luc_${year}_rctNo`) ? 'error' : ''}`}>
                          <label>Receipt No.</label>
                          <input
                            type="text"
                            id={`luc-rctno-${year}`}
                            value={formData.landUseCharge[year].rctNo}
                            onChange={(e) => handleInputChange('landUseCharge', year, 'rctNo', null, e)}
                          />
                          {hasError(`luc_${year}_rctNo`) && (
                            <div className="error-message">{errors[`luc_${year}_rctNo`]}</div>
                          )}
                        </div>
                        
                        <div className="tcc-form-field">
                          <label>Amount</label>
                          <div className="input-with-prefix">
                            <span className="input-prefix">₦</span>
                            <input
                              type="text"
                              id={`luc-paid-${year}`}
                              value={formData.landUseCharge[year].amount}
                              onChange={(e) => handleInputChange('landUseCharge', year, 'amount', null, e)}
                              className="numeric-input"
                            />
                          </div>
                        </div>
                        
                        <div className={`tcc-form-field ${hasError(`luc_${year}_rctDate`) ? 'error' : ''}`}>
                          <label>Receipt Date</label>
                          <div className="date-field">
                            <input
                              type="date"
                              id={`luc-rctdt-${year}`}
                              value={formData.landUseCharge[year].rctDate}
                              onChange={(e) => handleInputChange('landUseCharge', year, 'rctDate', null, e)}
                            />
                            <FaCalendarAlt className="date-icon" />
                          </div>
                          {hasError(`luc_${year}_rctDate`) && (
                            <div className="error-message">{errors[`luc_${year}_rctDate`]}</div>
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
          <div className={`tcc-form-section ${!expandedSections.previousTcc ? 'collapsed' : ''} ${activeStep === 3 ? 'active-section' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('previousTcc')}>
              <h2 className="tcc-form-section-title">
                <FaFileAlt className="section-icon" />
                TCC For Previous Years (if any)
              </h2>
              <div className="section-toggle">
                {expandedSections.previousTcc ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>
            
            {expandedSections.previousTcc && (
              <div className="section-content">
                <div className="tcc-form-cards">
                  {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                    <div key={`tcc-${year}`} className="year-card">
                      <div className="year-card-header">
                        <h3>{year}</h3>
                      </div>
                      <div className="year-card-body">
                        <div className="tcc-form-row">
                          <div className="tcc-form-field">
                            <label>TCC Number</label>
                            <input
                              type="text"
                              id={`tcc-${year}`}
                              value={formData.previousTcc[year].tccNo}
                              onChange={(e) => handleInputChange('previousTcc', year, 'tccNo', null, e)}
                            />
                          </div>
                          
                          <div className={`tcc-form-field ${hasError(`tcc_${year}_issueDate`) ? 'error' : ''}`}>
                            <label>Issue Date</label>
                            <div className="date-field">
                              <input
                                type="date"
                                id={`tcc-dt-${year}`}
                                value={formData.previousTcc[year].issueDate}
                                onChange={(e) => handleInputChange('previousTcc', year, 'issueDate', null, e)}
                              />
                              <FaCalendarAlt className="date-icon" />
                            </div>
                            {hasError(`tcc_${year}_issueDate`) && (
                              <div className="error-message">{errors[`tcc_${year}_issueDate`]}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Supporting Documents Section */}
          <div className={`tcc-form-section ${!expandedSections.supportDocuments ? 'collapsed' : ''} ${activeStep === 3 ? 'active-section' : ''}`}>
            <div className="section-header" onClick={() => toggleSection('supportDocuments')}>
              <h2 className="tcc-form-section-title">
                <FaUpload className="section-icon" />
                Supporting Documents (if any)
              </h2>
              <div className="section-toggle">
                {expandedSections.supportDocuments ? <FaChevronDown /> : <FaChevronRight />}
              </div>
            </div>
            
            {expandedSections.supportDocuments && (
              <div className="section-content">
                <div className="tcc-form-row">
                  <div className={`tcc-form-field ${hasError('document') ? 'error' : ''}`}>
                    <label>Document Type</label>
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
                  
                  <div className={`tcc-form-field ${hasError('document') ? 'error' : ''}`}>
                    <label>Select File</label>
                    <div className="file-input-container">
                      <input
                        type="file"
                        id="supportDoc"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('supportDoc').click()}
                        leadingIcon={<FaUpload />}
                      >
                        {selectedFile ? 'Change File' : 'Select File'}
                      </Button>
                      {selectedFile && (
                        <span className="selected-file-name">
                          {selectedFile.name}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="tcc-form-field">
                    <label>&nbsp;</label>
                    <Button
                      type="button"
                      variant="primary"
                      onClick={handleAddDocument}
                      disabled={!selectedFile || !selectedDocType}
                    >
                      Add Document
                    </Button>
                  </div>
                </div>
                
                {hasError('document') && (
                  <div className="error-message document-error">{errors.document}</div>
                )}
                
                {/* Document List */}
                <div className={`document-list ${formData.supportDocuments.length === 0 ? 'empty' : ''}`}>
                  {formData.supportDocuments.length === 0 ? (
                    <div className="no-documents">
                      <FaFileAlt className="no-docs-icon" />
                      <p>No documents selected</p>
                    </div>
                  ) : (
                    <div className="document-cards">
                      {formData.supportDocuments.map((doc) => (
                        <div key={doc.id} className="document-card">
                          <div className="document-card-header">
                            <div className="document-type">
                              <FaFileAlt className="document-icon" />
                              <span className="document-type-name">{doc.typeName}</span>
                            </div>
                            <Button
                              type="button"
                              variant="icon"
                              onClick={() => handleRemoveDocument(doc.id)}
                              aria-label="Remove document"
                            >
                              <FaTrashAlt />
                            </Button>
                          </div>
                          <div className="document-card-body">
                            <p className="document-name">{doc.fileName}</p>
                            <p className="document-size">{formatFileSize(doc.fileSize)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
          
          {/* Navigation Buttons */}
          <div className="step-navigation">
            <Button
              type="button"
              variant="outline"
              onClick={() => activeStep > 0 && handleStepChange(activeStep - 1)}
              disabled={activeStep === 0}
              size="lg"
            >
              Previous
            </Button>
            
            {activeStep < formSteps.length - 1 ? (
              <Button
                type="button"
                variant="primary"
                onClick={() => handleStepChange(activeStep + 1)}
                size="lg"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                variant="primary"
                size="lg"
                leadingIcon={<FaCheckCircle />}
              >
                Submit Application
              </Button>
            )}
          </div>
          
          {/* Only show the declaration on the final step */}
          {activeStep === formSteps.length - 1 && (
            <div className="declaration-box">
              <div className="declaration-header">
                <FaInfoCircle className="declaration-icon" />
                <h3>Declaration</h3>
              </div>
              <p>
                I declare that the information provided in this application is true and correct to the best of my knowledge.
                I understand that providing false information may result in the rejection of my application and potential legal consequences.
              </p>
              <div className="declaration-checkbox">
                <input type="checkbox" id="declaration" required />
                <label htmlFor="declaration">
                  I agree to the above declaration
                </label>
              </div>
            </div>
          )}
        </form>
      </Card>
    </div>
  );
};

export default TCCApplicationCreate; 