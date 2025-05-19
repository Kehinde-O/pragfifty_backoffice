import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiPlus, FiArrowLeft, FiUser, FiList, FiDollarSign, FiCheck,
  FiSearch, FiFileText, FiCalendar, FiCheckCircle, FiXCircle,
  FiArrowRight, FiRefreshCw, FiSave
} from 'react-icons/fi';
import styles from './AssessmentCreate.module.css';

const AssessmentCreate = () => {
  const navigate = useNavigate();
  
  // Form steps
  const steps = [
    { id: 1, label: 'Select Taxpayer', icon: <FiUser size={20} /> },
    { id: 2, label: 'Assessment Details', icon: <FiFileText size={20} /> },
    { id: 3, label: 'Revenue Items', icon: <FiList size={20} /> },
    { id: 4, label: 'Review & Submit', icon: <FiCheck size={20} /> }
  ];
  
  // State
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [taxpayerSearchQuery, setTaxpayerSearchQuery] = useState('');
  const [searchingTaxpayer, setSearchingTaxpayer] = useState(false);
  const [taxpayerSearchResults, setTaxpayerSearchResults] = useState([]);
  const [formData, setFormData] = useState({
    taxpayer: null,
    assessmentType: 'direct', // direct, self, provisional
    revenueHeads: [],
    selectedRevenueHead: '',
    period: '',
    dueDate: '',
    items: [],
    subtotal: 0,
    discounts: 0,
    penalties: 0,
    total: 0,
    notes: ''
  });
  
  // Mock data for revenue heads
  const revenueHeadsOptions = [
    { id: 1, name: 'Personal Income Tax', code: 'PIT', category: 'State' },
    { id: 2, name: 'Business Income Tax', code: 'BIT', category: 'State' },
    { id: 3, name: 'Property Tax', code: 'PT', category: 'State' },
    { id: 4, name: 'Capital Gains Tax', code: 'CGT', category: 'State' },
    { id: 5, name: 'Development Levy', code: 'DL', category: 'LGA' },
    { id: 6, name: 'Business Premises Levy', code: 'BPL', category: 'LGA' },
    { id: 7, name: 'Market Stall Fee', code: 'MSF', category: 'LGA' },
    { id: 8, name: 'Hotel Occupancy Tax', code: 'HOT', category: 'State' }
  ];
  
  // Fetch revenue heads
  useEffect(() => {
    // Simulating API call
    setFormData(prev => ({
      ...prev,
      revenueHeads: revenueHeadsOptions
    }));
  }, []);
  
  // Handle taxpayer search
  const handleTaxpayerSearch = (e) => {
    e.preventDefault();
    if (!taxpayerSearchQuery.trim()) return;
    
    setSearchingTaxpayer(true);
    
    // Simulating API call
    setTimeout(() => {
      const mockResults = [
        {
          id: 1,
          name: 'John Doe',
          tin: 'TIN123456789',
          type: 'Individual',
          address: '123 Main Street, Minna, Niger State',
          phone: '+234 8012345678',
          email: 'john.doe@example.com',
          occupation: 'Software Engineer'
        },
        {
          id: 2,
          name: 'TechCore Solutions Ltd',
          tin: 'TIN987654321',
          type: 'Corporate',
          address: '45 Business Avenue, Minna, Niger State',
          phone: '+234 8087654321',
          email: 'info@techcore.com',
          business: 'Technology Services'
        },
        {
          id: 3,
          name: 'Jane Johnson',
          tin: 'TIN456789123',
          type: 'Individual',
          address: '67 Park Lane, Minna, Niger State',
          phone: '+234 8056781234',
          email: 'jane.johnson@example.com',
          occupation: 'Accountant'
        }
      ].filter(item => 
        item.name.toLowerCase().includes(taxpayerSearchQuery.toLowerCase()) || 
        item.tin.toLowerCase().includes(taxpayerSearchQuery.toLowerCase())
      );
      
      setTaxpayerSearchResults(mockResults);
      setSearchingTaxpayer(false);
    }, 1000);
  };
  
  // Select a taxpayer
  const selectTaxpayer = (taxpayer) => {
    setFormData({
      ...formData,
      taxpayer
    });
    setTaxpayerSearchResults([]);
    setTaxpayerSearchQuery('');
  };
  
  // Next step
  const goToNextStep = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };
  
  // Previous step
  const goToPrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };
  
  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderTaxpayerSelectionStep();
      case 2:
        return <div>Assessment Details Step</div>;
      case 3:
        return <div>Revenue Items Step</div>;
      case 4:
        return <div>Review & Submit Step</div>;
      default:
        return null;
    }
  };
  
  // Render taxpayer selection step
  const renderTaxpayerSelectionStep = () => {
    return (
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h2><FiUser className={styles.cardIcon} /> Select Taxpayer</h2>
        </div>
        
        {formData.taxpayer ? (
          // Selected taxpayer details
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>Selected Taxpayer</div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Taxpayer Name</label>
                <div className={styles.formInput}>{formData.taxpayer.name}</div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>TIN</label>
                <div className={styles.formInput}>{formData.taxpayer.tin}</div>
              </div>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Type</label>
                <div className={styles.formInput}>{formData.taxpayer.type}</div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {formData.taxpayer.type === 'Individual' ? 'Occupation' : 'Business'}
                </label>
                <div className={styles.formInput}>
                  {formData.taxpayer.type === 'Individual' ? formData.taxpayer.occupation : formData.taxpayer.business}
                </div>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Address</label>
              <div className={styles.formInput}>{formData.taxpayer.address}</div>
            </div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Phone Number</label>
                <div className={styles.formInput}>{formData.taxpayer.phone}</div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Email</label>
                <div className={styles.formInput}>{formData.taxpayer.email}</div>
              </div>
            </div>
            <button 
              className={`${styles.formActionButton} ${styles.buttonSecondary}`}
              onClick={() => setFormData({...formData, taxpayer: null})}
              style={{ marginTop: '1rem' }}
            >
              <FiXCircle size={14} /> Change Taxpayer
            </button>
          </div>
        ) : (
          // Taxpayer search form
          <div className={styles.formSection}>
            <div className={styles.formSectionTitle}>Search for Taxpayer</div>
            <form onSubmit={handleTaxpayerSearch}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>
                  Search by Name or TIN
                  <span className={styles.formRequired}>*</span>
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input
                    type="text"
                    className={styles.formInput}
                    value={taxpayerSearchQuery}
                    onChange={(e) => setTaxpayerSearchQuery(e.target.value)}
                    placeholder="Enter taxpayer name or TIN..."
                    required
                  />
                  <button 
                    type="submit" 
                    className={`${styles.formActionButton} ${styles.buttonPrimary}`}
                    disabled={searchingTaxpayer}
                  >
                    {searchingTaxpayer ? (
                      <>
                        <FiRefreshCw className={styles.spinning} size={14} /> Searching...
                      </>
                    ) : (
                      <>
                        <FiSearch size={14} /> Search
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
            
            {taxpayerSearchResults.length > 0 && (
              <div className={styles.searchResults}>
                {taxpayerSearchResults.map((taxpayer) => (
                  <div 
                    key={taxpayer.id} 
                    className={styles.searchResultItem}
                    onClick={() => selectTaxpayer(taxpayer)}
                  >
                    <div className={styles.searchResultName}>{taxpayer.name}</div>
                    <div className={styles.searchResultDetails}>
                      <span>{taxpayer.tin} | {taxpayer.type} | {taxpayer.phone}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {taxpayerSearchResults.length === 0 && taxpayerSearchQuery && !searchingTaxpayer && (
              <div style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
                <p>No taxpayers found matching your search criteria.</p>
                <button 
                  className={`${styles.formActionButton} ${styles.buttonSecondary}`}
                  style={{ marginTop: '0.5rem' }}
                  onClick={() => alert('In a real app, this would navigate to create taxpayer form')}
                >
                  <FiPlus size={14} /> Register New Taxpayer
                </button>
              </div>
            )}
            
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid #e2e8f0', paddingTop: '1.5rem' }}>
              <div className={styles.formSectionTitle}>Or Select Assessment Type</div>
              <div className={styles.formRadioGroup}>
                <label className={styles.formRadio}>
                  <input 
                    type="radio" 
                    name="assessmentType" 
                    value="direct"
                    checked={formData.assessmentType === 'direct'}
                    onChange={() => setFormData({...formData, assessmentType: 'direct'})}
                  />
                  Direct Assessment
                </label>
                <label className={styles.formRadio}>
                  <input 
                    type="radio" 
                    name="assessmentType" 
                    value="self"
                    checked={formData.assessmentType === 'self'}
                    onChange={() => setFormData({...formData, assessmentType: 'self'})}
                  />
                  Self Assessment
                </label>
                <label className={styles.formRadio}>
                  <input 
                    type="radio" 
                    name="assessmentType" 
                    value="provisional"
                    checked={formData.assessmentType === 'provisional'}
                    onChange={() => setFormData({...formData, assessmentType: 'provisional'})}
                  />
                  Provisional Assessment
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className={styles.createContainer}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1><FiPlus className={styles.pageHeaderIcon} /> Create New Assessment</h1>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/dashboard/assessments')}
        >
          <FiArrowLeft size={14} /> Back to List
        </button>
      </div>
      
      {/* Stepper */}
      <div className={styles.stepper}>
        {steps.map((step) => (
          <div 
            key={step.id} 
            className={`${styles.step} ${
              currentStep === step.id 
                ? styles.stepActive 
                : currentStep > step.id 
                  ? styles.stepCompleted 
                  : ''
            }`}
          >
            <div className={styles.stepIcon}>
              {currentStep > step.id ? <FiCheckCircle size={20} /> : step.icon}
            </div>
            <div className={styles.stepLabel}>{step.label}</div>
          </div>
        ))}
      </div>
      
      {/* Step Content */}
      {renderStepContent()}
      
      {/* Form Actions */}
      <div className={styles.formActions}>
        <button
          className={`${styles.formActionButton} ${styles.buttonSecondary}`}
          onClick={currentStep === 1 ? () => navigate('/dashboard/assessments') : goToPrevStep}
        >
          {currentStep === 1 ? (
            <>
              <FiXCircle size={14} /> Cancel
            </>
          ) : (
            <>
              <FiArrowLeft size={14} /> Previous
            </>
          )}
        </button>
        
        <button
          className={`${styles.formActionButton} ${styles.buttonPrimary}`}
          onClick={currentStep === steps.length ? () => alert('Submit assessment') : goToNextStep}
          disabled={currentStep === 1 && !formData.taxpayer}
        >
          {currentStep === steps.length ? (
            <>
              <FiSave size={14} /> Submit Assessment
            </>
          ) : (
            <>
              Next <FiArrowRight size={14} />
            </>
          )}
        </button>
      </div>
      
      {/* Loading Overlay */}
      {loading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingIndicator}>
            <FiRefreshCw className={styles.spinning} size={24} />
            <p>Processing your request...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentCreate; 