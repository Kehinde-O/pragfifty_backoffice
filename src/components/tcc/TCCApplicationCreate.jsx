import React, { useState } from 'react';
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
  FaFileAlt
} from 'react-icons/fa';
import styles from './TCC.module.css';

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
    <div className={styles['step-indicator']}>
      {steps.map((step, index) => (
        <div 
          key={step.id}
          className={`${styles.step} ${currentStep >= index ? styles.active : ''} ${currentStep === index ? styles.current : ''}`}
          onClick={() => onChange(index)}
        >
          <div className={styles['step-icon']}>
            {step.icon}
          </div>
          <div className={styles['step-label']}>{step.label}</div>
          {index < steps.length - 1 && <div className={styles['step-connector']}></div>}
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
    document.querySelector(`.${styles['tcc-form']}`).scrollIntoView({ behavior: 'smooth' });
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
      const firstErrorElement = document.querySelector(`.${styles['error-message']}`);
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
    <div className={styles.tccApplicationContainer}>
      <div className={styles.tccDetailsHeader}>
        <div className={styles.tccHeaderLeft}>
          <button 
            className={styles.tccBackButton}
            onClick={handleBackToList}
            aria-label="Go back to TCC applications list"
          >
            <FaArrowLeft />
          </button>
          <div>
            <h1 className={styles.tccTitle}>Create TCC Application</h1>
            <p className={styles.tccPageSubtitle}>Apply for a new Tax Clearance Certificate for the past three years</p>
          </div>
        </div>
      </div>
      
      {/* Step Indicator */}
      <StepIndicator 
        currentStep={activeStep} 
        steps={formSteps} 
        onChange={handleStepChange} 
      />
      
      <form className={styles['tcc-form']} onSubmit={handleSubmit}>
        {/* Taxpayer Information Section */}
        <div className={`${styles['tcc-form-section']} ${!expandedSections.taxpayerInfo ? styles.collapsed : ''} ${activeStep === 0 ? styles['active-section'] : ''}`}>
          <div className={styles['section-header']} onClick={() => toggleSection('taxpayerInfo')}>
            <h2 className={styles['tcc-form-section-title']}>
              <FaIdCard className={styles['section-icon']} />
              Taxpayer Information
            </h2>
            <div className={styles['section-toggle']}>
              {expandedSections.taxpayerInfo ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          
          {expandedSections.taxpayerInfo && (
            <div className={styles['section-content']}>
              <div className={styles['tcc-form-row']}>
                <div className={styles['tcc-form-field']}>
                  <label>Taxpayer Identification Number (TIN)</label>
                  <input
                    type="text"
                    value={formData.taxpayerInfo.tin}
                    readOnly
                    className={styles['read-only']}
                  />
                </div>
                <div className={styles['tcc-form-field']}>
                  <label>Taxpayer Name</label>
                  <input
                    type="text"
                    value={formData.taxpayerInfo.name}
                    readOnly
                    className={styles['read-only']}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Source of Income */}
        <div className={`${styles['tcc-form-section']} ${!expandedSections.sourceOfIncome ? styles.collapsed : ''} ${activeStep === 1 ? styles['active-section'] : ''}`}>
          <div className={styles['section-header']} onClick={() => toggleSection('sourceOfIncome')}>
            <h2 className={styles['tcc-form-section-title']}>
              <FaMoneyBillWave className={styles['section-icon']} />
              Source of Income
            </h2>
            <div className={styles['section-toggle']}>
              {expandedSections.sourceOfIncome ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          
          {expandedSections.sourceOfIncome && (
            <div className={styles['section-content']}>
              <div className={styles['tcc-form-row']}>
                <div className={`${styles['tcc-form-field']} ${hasError('sourceOfIncome') ? styles.error : ''}`}>
                  <label>
                    Source of Income <span className={styles.required}>*</span>
                    <span className={styles['tooltip-icon']}>
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
                    <div className={styles['error-message']}>{errors.sourceOfIncome}</div>
                  )}
                </div>
              </div>
              
              <div className={styles['tcc-form-row']}>
                <div className={styles['tcc-form-field']}>
                  <label className={styles['highlight-label']}>
                    Was payment made on PragFifty?
                    <span className={styles['tooltip-icon']}>
                      <FaQuestionCircle data-tooltip="PragFifty is the Online Revenue Assessment System" />
                    </span>
                  </label>
                  <div className={`${styles['radio-group']} ${styles.modern}`}>
                    <label className={`${styles['radio-card']} ${formData.paymentMethod === "Y" ? styles.selected : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="Y"
                        checked={formData.paymentMethod === "Y"}
                        onChange={handlePaymentMethodChange}
                      />
                      <div className={styles['radio-content']}>
                        <FaCheckCircle className={styles['radio-icon']} />
                        <span>Yes</span>
                      </div>
                    </label>
                    <label className={`${styles['radio-card']} ${formData.paymentMethod === "N" ? styles.selected : ''}`}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="N"
                        checked={formData.paymentMethod === "N"}
                        onChange={handlePaymentMethodChange}
                      />
                      <div className={styles['radio-content']}>
                        <FaExclamationTriangle className={styles['radio-icon']} />
                        <span>No</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              
              {formData.paymentMethod === "N" && (
                <div className={styles['form-note']}>
                  <FaExclamationTriangle className={`${styles['note-icon']} ${styles.warning}`} />
                  <p>If no, kindly provide us with your evidence of payment by uploading the receipt below.</p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Income Details Section */}
        <div className={`${styles['tcc-form-section']} ${!expandedSections.incomeDetails ? styles.collapsed : ''} ${activeStep === 1 ? styles['active-section'] : ''}`}>
          <div className={styles['section-header']} onClick={() => toggleSection('incomeDetails')}>
            <h2 className={styles['tcc-form-section-title']}>
              <FaMoneyBillWave className={styles['section-icon']} />
              Total Income
            </h2>
            <div className={styles['section-toggle']}>
              {expandedSections.incomeDetails ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          
          {expandedSections.incomeDetails && (
            <div className={styles['section-content']}>
              <div className={styles['tccTaxYearsGrid']}>
                {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                  <div key={`income-${year}`} className={styles.tccTaxYearCard}>
                    <div className={styles.tccTaxYearHeader}>
                      <h3 className={styles.tccTaxYearTitle}>{year}</h3>
                    </div>
                    <div className={styles.tccTaxYearBody}>
                      <div className={styles['tcc-form-field']}>
                        <label>
                          Income <span className={styles.required}>*</span>
                        </label>
                        <div className={styles['input-with-prefix']}>
                          <span className={styles['input-prefix']}>₦</span>
                          <input
                            type="text"
                            id={`income-${year}`}
                            value={formData.incomeDetails[year].income}
                            onChange={(e) => handleInputChange('incomeDetails', year, 'income', null, e)}
                            className={styles['numeric-input']}
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
        <div className={`${styles['tcc-form-section']} ${!expandedSections.assessmentTax ? styles.collapsed : ''} ${activeStep === 2 ? styles['active-section'] : ''}`}>
          <div className={styles['section-header']} onClick={() => toggleSection('assessmentTax')}>
            <h2 className={styles['tcc-form-section-title']}>
              <FaReceipt className={styles['section-icon']} />
              Assessment Tax Paid
            </h2>
            <div className={styles['section-toggle']}>
              {expandedSections.assessmentTax ? <FaChevronDown /> : <FaChevronRight />}
            </div>
          </div>
          
          {expandedSections.assessmentTax && (
            <div className={styles['section-content']}>
              <div className={styles.tccTaxYearsGrid}>
                {[currentYear - 1, currentYear - 2, currentYear - 3].map((year) => (
                  <div key={`assessment-${year}`} className={styles.tccTaxYearCard}>
                    <div className={styles.tccTaxYearHeader}>
                      <h3 className={styles.tccTaxYearTitle}>{year}</h3>
                    </div>
                    <div className={styles.tccTaxYearBody}>
                      <div className={`${styles['tcc-form-field']} ${hasError(`assessment_${year}_rctNo`) ? styles.error : ''}`}>
                        <label>Receipt No.</label>
                        <input
                          type="text"
                          id={`tax-rctno-${year}`}
                          value={formData.incomeDetails[year].assessment.rctNo}
                          onChange={(e) => handleInputChange('incomeDetails', year, 'assessment', 'rctNo', e)}
                        />
                        {hasError(`assessment_${year}_rctNo`) && (
                          <div className={styles['error-message']}>{errors[`assessment_${year}_rctNo`]}</div>
                        )}
                      </div>
                      
                      <div className={styles['tcc-form-field']}>
                        <label>Amount <span className={styles.required}>*</span></label>
                        <div className={styles['input-with-prefix']}>
                          <span className={styles['input-prefix']}>₦</span>
                          <input
                            type="text"
                            id={`tax-paid-${year}`}
                            value={formData.incomeDetails[year].assessment.amount}
                            onChange={(e) => handleInputChange('incomeDetails', year, 'assessment', 'amount', e)}
                            className={styles['numeric-input']}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className={`${styles['tcc-form-field']} ${hasError(`assessment_${year}_rctDate`) ? styles.error : ''}`}>
                        <label>Receipt Date</label>
                        <div className={styles['date-field']}>
                          <input
                            type="date"
                            id={`tax-rctdt-${year}`}
                            value={formData.incomeDetails[year].assessment.rctDate}
                            onChange={(e) => handleInputChange('incomeDetails', year, 'assessment', 'rctDate', e)}
                          />
                          <FaCalendarAlt className={styles['date-icon']} />
                        </div>
                        {hasError(`assessment_${year}_rctDate`) && (
                          <div className={styles['error-message']}>{errors[`assessment_${year}_rctDate`]}</div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Navigation Buttons */}
        <div className={styles['tccFormActions']}>
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
              className={styles.tccActionButtonPrimary}
            >
              Next
            </Button>
          ) : (
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className={styles.tccActionButtonPrimary}
              leadingIcon={<FaCheckCircle />}
            >
              Submit Application
            </Button>
          )}
        </div>
        
        {/* Only show the declaration on the final step */}
        {activeStep === formSteps.length - 1 && (
          <div className={styles['declaration-box']}>
            <div className={styles['declaration-header']}>
              <FaInfoCircle className={styles['declaration-icon']} />
              <h3>Declaration</h3>
            </div>
            <p>
              I declare that the information provided in this application is true and correct to the best of my knowledge.
              I understand that providing false information may result in the rejection of my application and potential legal consequences.
            </p>
            <div className={styles['declaration-checkbox']}>
              <input type="checkbox" id="declaration" required />
              <label htmlFor="declaration">
                I agree to the above declaration
              </label>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TCCApplicationCreate; 