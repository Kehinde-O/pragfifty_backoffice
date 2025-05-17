import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiSave, FiUser, FiDollarSign, FiFileText } from 'react-icons/fi';
import './TCC.css';

function TCCApplicationCreate() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    taxpayerName: '',
    tin: '',
    year: new Date().getFullYear().toString(),
    sourceOfIncome: '',
    platformPayment: 'Y',
    incomeDetails: [
      {
        year: (new Date().getFullYear() - 1).toString(),
        annualIncome: '',
        assessmentTaxReceiptNo: '',
        assessmentTaxAmount: '',
        assessmentTaxReceiptDate: '',
        outstandingTax: '0',
        devLevyReceiptNo: '',
        devLevyAmount: '',
        devLevyReceiptDate: '',
        landUseChargeReceiptNo: '',
        landUseChargeAmount: '',
        landUseChargeReceiptDate: '',
        previousTccNo: '',
        previousTccIssueDate: ''
      }
    ],
    documents: [],
    agreementChecked: false
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Handle back button
  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/dashboard/tcc-application');
    }
  };

  // Handle form input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle income details change
  const handleIncomeChange = (e, index, field) => {
    const { value } = e.target;
    const updatedIncomeDetails = [...formData.incomeDetails];
    updatedIncomeDetails[index][field] = value;
    
    setFormData({
      ...formData,
      incomeDetails: updatedIncomeDetails
    });
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Create a new document object
    const newDocument = {
      id: Date.now().toString(),
      documentType: formData.documentType || 'OTHER',
      fileName: file.name,
      fileType: file.type,
      fileSize: file.size,
      uploadDate: new Date().toISOString().split('T')[0]
    };
    
    setFormData({
      ...formData,
      documents: [...formData.documents, newDocument],
      documentType: '' // Reset document type
    });
  };

  // Remove document
  const handleRemoveDocument = (docId) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter(doc => doc.id !== docId)
    });
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.taxpayerName.trim()) newErrors.taxpayerName = 'Taxpayer name is required';
      if (!formData.tin.trim()) newErrors.tin = 'TIN is required';
      if (!formData.year.trim()) newErrors.year = 'Year is required';
      if (!formData.sourceOfIncome) newErrors.sourceOfIncome = 'Source of income is required';
    }
    else if (currentStep === 2) {
      formData.incomeDetails.forEach((income, index) => {
        if (!income.annualIncome) newErrors[`annualIncome_${index}`] = 'Annual income is required';
        if (!income.assessmentTaxAmount) newErrors[`assessmentTaxAmount_${index}`] = 'Assessment tax amount is required';
      });
    }
    else if (currentStep === 3) {
      // Document validation is optional
    }
    else if (currentStep === 4) {
      if (!formData.agreementChecked) newErrors.agreementChecked = 'You must accept the declaration';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Move to next step
  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log('Form submitted:', formData);
        setIsSubmitting(false);
        setSubmitSuccess(true);
      }, 1500);
    }
  };

  // Handle view created TCC
  const handleViewTCC = () => {
    navigate('/dashboard/tcc-application/1'); // Navigate to a mock TCC
  };

  // Render step 1 - Basic Information
  const renderStep1 = () => (
    <div className="form-step">
      <h3><FiUser /> Basic Information</h3>
      
      <div className="form-group">
        <label htmlFor="taxpayerName">Taxpayer Name *</label>
        <input
          type="text"
          id="taxpayerName"
          name="taxpayerName"
          placeholder="Enter taxpayer's full name"
          value={formData.taxpayerName}
          onChange={handleChange}
          className={errors.taxpayerName ? 'error' : ''}
        />
        {errors.taxpayerName && <div className="error-message">{errors.taxpayerName}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="tin">Taxpayer Identification Number (TIN) *</label>
        <input
          type="text"
          id="tin"
          name="tin"
          placeholder="Enter TIN"
          value={formData.tin}
          onChange={handleChange}
          className={errors.tin ? 'error' : ''}
        />
        {errors.tin && <div className="error-message">{errors.tin}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="year">Tax Year *</label>
        <input
          type="text"
          id="year"
          name="year"
          placeholder="Enter tax year"
          value={formData.year}
          onChange={handleChange}
          className={errors.year ? 'error' : ''}
        />
        {errors.year && <div className="error-message">{errors.year}</div>}
      </div>
      
      <div className="form-group">
        <label htmlFor="sourceOfIncome">Source of Income *</label>
        <select
          id="sourceOfIncome"
          name="sourceOfIncome"
          value={formData.sourceOfIncome}
          onChange={handleChange}
          className={errors.sourceOfIncome ? 'error' : ''}
        >
          <option value="">Select source of income</option>
          <option value="TRADE">Trade/Business</option>
          <option value="PROFESSION">Professional Practice</option>
          <option value="VOCATION">Vocation</option>
          <option value="EMPLOYMENT">Employment</option>
          <option value="INVESTMENT">Investment</option>
        </select>
        {errors.sourceOfIncome && <div className="error-message">{errors.sourceOfIncome}</div>}
      </div>
      
      <div className="form-group">
        <label>Platform Payment *</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="platformPayment"
              value="Y"
              checked={formData.platformPayment === 'Y'}
              onChange={handleChange}
            />
            Yes
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="platformPayment"
              value="N"
              checked={formData.platformPayment === 'N'}
              onChange={handleChange}
            />
            No
          </label>
        </div>
      </div>
    </div>
  );

  // Render step 2 - Income Details
  const renderStep2 = () => (
    <div className="form-step">
      <h3><FiDollarSign /> Income Details</h3>
      
      {formData.incomeDetails.map((income, index) => (
        <div key={index} className="income-year-section">
          <h4>Income Details for Year {income.year}</h4>
          
          <div className="form-group">
            <label htmlFor={`annualIncome_${index}`}>Annual Income *</label>
            <input
              type="number"
              id={`annualIncome_${index}`}
              placeholder="Enter annual income"
              value={income.annualIncome}
              onChange={(e) => handleIncomeChange(e, index, 'annualIncome')}
              className={errors[`annualIncome_${index}`] ? 'error' : ''}
            />
            {errors[`annualIncome_${index}`] && <div className="error-message">{errors[`annualIncome_${index}`]}</div>}
          </div>
          
          <div className="section-divider">
            <h5>Assessment Tax</h5>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`assessmentTaxReceiptNo_${index}`}>Receipt Number</label>
              <input
                type="text"
                id={`assessmentTaxReceiptNo_${index}`}
                placeholder="Enter receipt number"
                value={income.assessmentTaxReceiptNo}
                onChange={(e) => handleIncomeChange(e, index, 'assessmentTaxReceiptNo')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor={`assessmentTaxAmount_${index}`}>Amount *</label>
              <input
                type="number"
                id={`assessmentTaxAmount_${index}`}
                placeholder="Enter amount"
                value={income.assessmentTaxAmount}
                onChange={(e) => handleIncomeChange(e, index, 'assessmentTaxAmount')}
                className={errors[`assessmentTaxAmount_${index}`] ? 'error' : ''}
              />
              {errors[`assessmentTaxAmount_${index}`] && <div className="error-message">{errors[`assessmentTaxAmount_${index}`]}</div>}
            </div>
            
            <div className="form-group">
              <label htmlFor={`assessmentTaxReceiptDate_${index}`}>Receipt Date</label>
              <input
                type="date"
                id={`assessmentTaxReceiptDate_${index}`}
                value={income.assessmentTaxReceiptDate}
                onChange={(e) => handleIncomeChange(e, index, 'assessmentTaxReceiptDate')}
              />
            </div>
          </div>
          
          <div className="section-divider">
            <h5>Development Levy</h5>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor={`devLevyReceiptNo_${index}`}>Receipt Number</label>
              <input
                type="text"
                id={`devLevyReceiptNo_${index}`}
                placeholder="Enter receipt number"
                value={income.devLevyReceiptNo}
                onChange={(e) => handleIncomeChange(e, index, 'devLevyReceiptNo')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor={`devLevyAmount_${index}`}>Amount</label>
              <input
                type="number"
                id={`devLevyAmount_${index}`}
                placeholder="Enter amount"
                value={income.devLevyAmount}
                onChange={(e) => handleIncomeChange(e, index, 'devLevyAmount')}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor={`devLevyReceiptDate_${index}`}>Receipt Date</label>
              <input
                type="date"
                id={`devLevyReceiptDate_${index}`}
                value={income.devLevyReceiptDate}
                onChange={(e) => handleIncomeChange(e, index, 'devLevyReceiptDate')}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Render step 3 - Supporting Documents
  const renderStep3 = () => (
    <div className="form-step">
      <h3><FiFileText /> Supporting Documents</h3>
      
      <div className="form-group">
        <label htmlFor="documentType">Document Type</label>
        <select
          id="documentType"
          name="documentType"
          value={formData.documentType || ''}
          onChange={handleChange}
        >
          <option value="">Select document type</option>
          <option value="PAYE">PAYE Receipt</option>
          <option value="REGISTRATION">Business Registration</option>
          <option value="BANK">Bank Statement</option>
          <option value="EVIDENCE">Evidence of Payment</option>
          <option value="OTHER">Other Document</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="documentFile">Upload Document</label>
        <input
          type="file"
          id="documentFile"
          onChange={handleFileUpload}
        />
        <p className="help-text">Allowed formats: PDF, JPG, PNG. Max size: 5MB</p>
      </div>
      
      {formData.documents.length > 0 && (
        <div className="uploaded-documents">
          <h4>Uploaded Documents</h4>
          <table className="data-table documents-table">
            <thead>
              <tr>
                <th>Document Type</th>
                <th>File Name</th>
                <th>Size</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.documents.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.documentType}</td>
                  <td>{doc.fileName}</td>
                  <td>{formatFileSize(doc.fileSize)}</td>
                  <td>
                    <button 
                      type="button" 
                      className="icon-button danger"
                      onClick={() => handleRemoveDocument(doc.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  // Render step 4 - Review & Submit
  const renderStep4 = () => (
    <div className="form-step">
      <h3>Review & Submit</h3>
      
      <div className="review-section">
        <h4>Basic Information</h4>
        <div className="review-grid">
          <div className="review-item">
            <span className="review-label">Taxpayer Name</span>
            <span className="review-value">{formData.taxpayerName}</span>
          </div>
          <div className="review-item">
            <span className="review-label">TIN</span>
            <span className="review-value">{formData.tin}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Tax Year</span>
            <span className="review-value">{formData.year}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Source of Income</span>
            <span className="review-value">{formData.sourceOfIncome}</span>
          </div>
          <div className="review-item">
            <span className="review-label">Platform Payment</span>
            <span className="review-value">{formData.platformPayment === 'Y' ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>
      
      <div className="review-section">
        <h4>Income Details</h4>
        {formData.incomeDetails.map((income, index) => (
          <div key={index} className="income-summary">
            <h5>Year {income.year}</h5>
            <div className="review-grid">
              <div className="review-item">
                <span className="review-label">Annual Income</span>
                <span className="review-value">{income.annualIncome}</span>
              </div>
              <div className="review-item">
                <span className="review-label">Assessment Tax</span>
                <span className="review-value">{income.assessmentTaxAmount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="review-section">
        <h4>Supporting Documents</h4>
        <ul className="document-list">
          {formData.documents.map((doc) => (
            <li key={doc.id}>{doc.fileName} ({formatFileSize(doc.fileSize)})</li>
          ))}
        </ul>
      </div>
      
      <div className="declaration-section">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="agreementChecked"
            checked={formData.agreementChecked}
            onChange={handleChange}
            className={errors.agreementChecked ? 'error' : ''}
          />
          I hereby declare that the information provided is correct and complete to the best of my knowledge.
        </label>
        {errors.agreementChecked && <div className="error-message">{errors.agreementChecked}</div>}
      </div>
    </div>
  );

  // Render success message
  const renderSuccess = () => (
    <div className="submission-success">
      <div className="success-icon">
        <FiCheckCircle />
      </div>
      <h3>TCC Application Submitted Successfully</h3>
      <p>Your application has been submitted and is now under review.</p>
      <p>Application Number: <strong>TCC-2023-001</strong></p>
      <div className="button-group">
        <button className="secondary-button" onClick={() => navigate('/dashboard/tcc-application')}>
          Back to TCC List
        </button>
        <button className="primary-button" onClick={handleViewTCC}>
          View Application
        </button>
      </div>
    </div>
  );

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1();
      case 2:
        return renderStep2();
      case 3:
        return renderStep3();
      case 4:
        return renderStep4();
      default:
        return null;
    }
  };

  return (
    <div className="tcc-application-create content-container">
      <div className="header-section">
        <button className="back-button" onClick={handleBack}>
          <FiArrowLeft /> {currentStep === 1 ? 'Back to TCC Applications' : 'Previous Step'}
        </button>
        <h2>Create TCC Application</h2>
      </div>

      {submitSuccess ? (
        renderSuccess()
      ) : (
        <>
          <div className="progress-indicator">
            <div className="step-indicators">
              <div className={`step-indicator ${currentStep >= 1 ? 'active' : ''}`}>1. Basic Info</div>
              <div className={`step-indicator ${currentStep >= 2 ? 'active' : ''}`}>2. Income Details</div>
              <div className={`step-indicator ${currentStep >= 3 ? 'active' : ''}`}>3. Documents</div>
              <div className={`step-indicator ${currentStep >= 4 ? 'active' : ''}`}>4. Review & Submit</div>
            </div>
          </div>

          <form className="tcc-form" onSubmit={handleSubmit}>
            {renderStepContent()}
            
            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" className="secondary-button" onClick={handleBack}>
                  Previous
                </button>
              )}
              
              {currentStep < 4 ? (
                <button type="button" className="primary-button" onClick={handleNext}>
                  Next
                </button>
              ) : (
                <button type="submit" className="primary-button" disabled={isSubmitting}>
                  <FiSave /> {isSubmitting ? 'Submitting...' : 'Submit Application'}
                </button>
              )}
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default TCCApplicationCreate; 