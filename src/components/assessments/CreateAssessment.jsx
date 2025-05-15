import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FiFileText, FiSearch, FiUser, FiClipboard, FiArrowLeft, 
  FiCalendar, FiMail, FiPhone, FiHash, FiInfo, FiCheck
} from 'react-icons/fi';
import './CreateAssessment.css';

const CreateAssessment = () => {
  const [loading, setLoading] = useState(false);
  const [searchTaxpayerTerm, setSearchTaxpayerTerm] = useState('');
  const [searchType, setSearchType] = useState('all');
  const [taxpayerResults, setTaxpayerResults] = useState([]);
  const [showTaxpayerResults, setShowTaxpayerResults] = useState(false);
  const [revenueHeads, setRevenueHeads] = useState([]);
  const [formData, setFormData] = useState({
    taxpayerId: '',
    taxpayerName: '',
    taxpayerType: '',
    taxpayerEmail: '',
    taxpayerPhone: '',
    taxpayerTin: '',
    userId: 'USR-2023-001', // This would typically come from the logged-in user
    revenueHeadId: '',
    basisOfAssessment: '',
    assessedAmount: '',
    dueDate: '',
    status: 'Draft',
    description: ''
  });

  // Mock data - replace with actual API calls
  const fetchRevenueHeads = useCallback(() => {
    // Simulate API call
    setTimeout(() => {
      const mockRevenueHeads = [
        { id: 1, name: 'Personal Income Tax', code: 'PIT-001', category: 'State' },
        { id: 2, name: 'Company Income Tax', code: 'CIT-001', category: 'State' },
        { id: 3, name: 'Value Added Tax', code: 'VAT-001', category: 'State' },
        { id: 4, name: 'Property Tax', code: 'PRT-001', category: 'State' },
        { id: 5, name: 'Market Stall Fee', code: 'MSF-001', category: 'LGA' },
        { id: 6, name: 'Shop License Fee', code: 'SLF-001', category: 'LGA' },
        { id: 7, name: 'Business Premises Fee', code: 'BPF-001', category: 'LGA' }
      ];
      setRevenueHeads(mockRevenueHeads);
    }, 500);
  }, []);

  useEffect(() => {
    fetchRevenueHeads();
  }, [fetchRevenueHeads]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAmountChange = (e) => {
    const value = e.target.value.replace(/[^0-9.]/g, '');
    setFormData(prev => ({ ...prev, assessedAmount: value }));
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
  };

  const handleSearchTaxpayer = (e) => {
    const term = e.target.value;
    setSearchTaxpayerTerm(term);

    if (term.length > 2) {
      // Simulate API call for taxpayer search
      setTimeout(() => {
        const mockResults = [
          { 
            id: 'TIN123456', 
            name: 'John Doe', 
            type: 'Individual', 
            tin: 'TIN123456', 
            email: 'john.doe@example.com',
            phone: '+234 801 234 5678'
          },
          { 
            id: 'TIN789012', 
            name: 'Jane Smith', 
            type: 'Individual', 
            tin: 'TIN789012', 
            email: 'jane.smith@example.com',
            phone: '+234 802 345 6789'
          },
          { 
            id: 'BUS345678', 
            name: 'XYZ Corporation', 
            type: 'Business', 
            tin: 'BUS345678', 
            email: 'contact@xyzcorp.com',
            phone: '+234 803 456 7890'
          }
        ].filter(taxpayer => {
          const searchLower = term.toLowerCase();
          
          // Filter based on search type
          if (searchType === 'name') {
            return taxpayer.name.toLowerCase().includes(searchLower);
          } else if (searchType === 'tin') {
            return taxpayer.tin.toLowerCase().includes(searchLower);
          } else if (searchType === 'email') {
            return taxpayer.email.toLowerCase().includes(searchLower);
          } else if (searchType === 'phone') {
            return taxpayer.phone.toLowerCase().includes(searchLower);
          } else {
            // Search all fields
            return (
              taxpayer.name.toLowerCase().includes(searchLower) || 
              taxpayer.tin.toLowerCase().includes(searchLower) ||
              taxpayer.email.toLowerCase().includes(searchLower) ||
              taxpayer.phone.toLowerCase().includes(searchLower)
            );
          }
        });
        
        setTaxpayerResults(mockResults);
        setShowTaxpayerResults(true);
      }, 300);
    } else {
      setTaxpayerResults([]);
      setShowTaxpayerResults(false);
    }
  };

  const selectTaxpayer = (taxpayer) => {
    setFormData(prev => ({
      ...prev,
      taxpayerId: taxpayer.id,
      taxpayerName: taxpayer.name,
      taxpayerType: taxpayer.type,
      taxpayerEmail: taxpayer.email,
      taxpayerPhone: taxpayer.phone,
      taxpayerTin: taxpayer.tin
    }));
    setSearchTaxpayerTerm(taxpayer.name);
    setShowTaxpayerResults(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call to create assessment
    setTimeout(() => {
      console.log('Creating assessment with data:', formData);
      
      // Reset form and show success message
      alert('Assessment created successfully');
      setFormData({
        taxpayerId: '',
        taxpayerName: '',
        taxpayerType: '',
        taxpayerEmail: '',
        taxpayerPhone: '',
        taxpayerTin: '',
        userId: 'USR-2023-001', // This would typically come from the logged-in user
        revenueHeadId: '',
        basisOfAssessment: '',
        assessedAmount: '',
        dueDate: '',
        status: 'Draft',
        description: ''
      });
      setSearchTaxpayerTerm('');
      setLoading(false);
    }, 1500);
  };

  const getSearchTypeIcon = () => {
    switch(searchType) {
      case 'name':
        return <FiUser />;
      case 'tin':
        return <FiHash />;
      case 'email':
        return <FiMail />;
      case 'phone':
        return <FiPhone />;
      default:
        return <FiSearch />;
    }
  };

  // Format date to yyyy-mm-dd for input type date
  const formatDateForInput = (dateStr) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toISOString().split('T')[0];
  };

  return (
    <div className="create-assessment-container">
      {/* Header */}
      <header className="page-header">
        <h1><FiFileText className="page-header-icon" /> Create Assessment</h1>
        <Link to="/dashboard/assessments" className="back-button">
          <FiArrowLeft /> Back to Assessments
        </Link>
      </header>
      
      {/* Information Banner */}
      <div className="info-banner">
        <FiInfo className="info-icon" />
        <p>You are creating an assessment on behalf of a customer. This assessment will be tied to their account using their unique identifier.</p>
      </div>
      
      {/* Form */}
      <form onSubmit={handleSubmit} className="assessment-form">
        {/* Taxpayer Information Section */}
        <div className="form-section">
          <div className="section-header">
            <FiUser className="section-icon" />
            <h2>Taxpayer Information</h2>
          </div>
          <div className="section-content">
            <div className="search-controls">
              <div className="search-type-selector">
                <label htmlFor="searchType">Search By</label>
                <select 
                  id="searchType" 
                  value={searchType} 
                  onChange={handleSearchTypeChange}
                  className="select-input search-type-select"
                >
                  <option value="all">All Fields</option>
                  <option value="name">Name</option>
                  <option value="tin">TIN</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </div>
              
              <div className="form-field search-field">
                <label htmlFor="searchTaxpayer">Search Taxpayer</label>
                <div className="search-input-container">
                  <span className="search-type-icon">{getSearchTypeIcon()}</span>
                  <input
                    type="text"
                    id="searchTaxpayer"
                    placeholder={`Search by ${searchType === 'all' ? 'name, TIN, email, or phone' : searchType}...`}
                    value={searchTaxpayerTerm}
                    onChange={handleSearchTaxpayer}
                    className="search-input"
                  />
                  <FiSearch className="search-action-icon" />
                  {showTaxpayerResults && (
                    <div className="search-results">
                      {taxpayerResults.length === 0 ? (
                        <div className="no-results">No taxpayers found</div>
                      ) : (
                        taxpayerResults.map(taxpayer => (
                          <div 
                            key={taxpayer.id} 
                            className="search-result-item"
                            onClick={() => selectTaxpayer(taxpayer)}
                          >
                            <div className="result-main">
                              <span className="result-name">{taxpayer.name}</span>
                              <span className={`result-type ${taxpayer.type.toLowerCase()}`}>
                                {taxpayer.type}
                              </span>
                            </div>
                            <div className="result-details">
                              <span className="result-tin"><FiHash className="result-icon" /> {taxpayer.tin}</span>
                              <span className="result-email"><FiMail className="result-icon" /> {taxpayer.email}</span>
                              <span className="result-phone"><FiPhone className="result-icon" /> {taxpayer.phone}</span>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {formData.taxpayerId && (
              <div className="selected-taxpayer">
                <h3>Selected Taxpayer</h3>
                <div className="taxpayer-card">
                  <div className="taxpayer-header">
                    <div className="taxpayer-name-container">
                      <span className="taxpayer-name">{formData.taxpayerName}</span>
                      <span className={`taxpayer-type-badge ${formData.taxpayerType.toLowerCase()}`}>
                        {formData.taxpayerType}
                      </span>
                    </div>
                    <span className="taxpayer-id">ID: {formData.taxpayerId}</span>
                  </div>
                  <div className="taxpayer-details">
                    <div className="taxpayer-detail">
                      <FiHash className="detail-icon" />
                      <span>TIN: {formData.taxpayerTin}</span>
                    </div>
                    <div className="taxpayer-detail">
                      <FiMail className="detail-icon" />
                      <span>Email: {formData.taxpayerEmail}</span>
                    </div>
                    <div className="taxpayer-detail">
                      <FiPhone className="detail-icon" />
                      <span>Phone: {formData.taxpayerPhone}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Assessment Details Section */}
        <div className="form-section">
          <div className="section-header">
            <FiClipboard className="section-icon" />
            <h2>Assessment Details</h2>
          </div>
          <div className="section-content">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="revenueHeadId">Revenue Head</label>
                <select 
                  id="revenueHeadId"
                  name="revenueHeadId"
                  value={formData.revenueHeadId}
                  onChange={handleInputChange}
                  required
                  className="select-input"
                >
                  <option value="">Select Revenue Head</option>
                  {revenueHeads.map(head => (
                    <option key={head.id} value={head.id}>
                      {head.name} ({head.code})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-field">
                <label htmlFor="status">Status</label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="select-input"
                >
                  <option value="Draft">Draft</option>
                  <option value="Approved">Approved</option>
                  <option value="Issued">Issued</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="basisOfAssessment">Basis of Assessment</label>
              <input
                type="text"
                id="basisOfAssessment"
                name="basisOfAssessment"
                placeholder="E.g., Annual Income, Property Value, Business Activity"
                value={formData.basisOfAssessment}
                onChange={handleInputChange}
                required
                className="text-input"
              />
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="assessedAmount">Assessed Amount (₦)</label>
                <div className="input-with-prefix">
                  <span className="input-prefix">₦</span>
                  <input
                    type="text"
                    id="assessedAmount"
                    name="assessedAmount"
                    placeholder="0.00"
                    value={formData.assessedAmount}
                    onChange={handleAmountChange}
                    required
                    className="currency-input"
                  />
                </div>
              </div>
              
              <div className="form-field">
                <label htmlFor="dueDate">Due Date</label>
                <div className="date-input-container">
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formatDateForInput(formData.dueDate)}
                    onChange={handleInputChange}
                    required
                    className="date-input"
                  />
                  <FiCalendar className="date-icon" />
                </div>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                placeholder="Enter assessment description..."
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                className="textarea-input"
              />
            </div>

            <div className="form-actions">
              <button type="button" className="button cancel-button">
                <span className="button-text">Cancel</span>
              </button>
              <button type="submit" className="button submit-button" disabled={loading}>
                <FiCheck className="button-icon" />
                <span className="button-text">{loading ? "Creating..." : "Create Assessment"}</span>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAssessment; 