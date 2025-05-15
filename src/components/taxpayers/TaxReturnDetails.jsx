import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TaxpayerReturns.css';
import { 
  FiFileText, FiUser, FiCalendar, FiDollarSign, FiClock, 
  FiCheckCircle, FiAlertCircle, FiArrowLeft, FiDownload,
  FiPrinter, FiMessageSquare, FiClipboard, FiEdit, FiTrash2, FiInfo, 
  FiUpload
} from 'react-icons/fi';

const TaxReturnDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [returnData, setReturnData] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

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
        history: [
          { date: '2023-03-01T14:20:00Z', action: 'Return Submitted', user: 'Aisha Bello', note: 'Initial submission' },
          { date: '2023-03-05T10:30:00Z', action: 'Documentation Review', user: 'John Auditor', note: 'Reviewed attachments - all complete' },
          { date: '2023-03-10T09:15:00Z', action: 'Assessment Created', user: 'Sarah Admin', note: 'Generated assessment notice' }
        ],
        documents: [
          { name: 'Income Statement', type: 'pdf', dateUploaded: '2023-03-01T14:10:00Z', size: '1.4 MB' },
          { name: 'Tax Computation', type: 'xlsx', dateUploaded: '2023-03-01T14:12:00Z', size: '245 KB' },
          { name: 'Proof of Payment', type: 'pdf', dateUploaded: '2023-03-01T14:15:00Z', size: '890 KB' }
        ]
      };

      setReturnData(mockReturnData);
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

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return '₦' + amount.toLocaleString('en-NG');
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleProcessReturn = () => {
    navigate(`/dashboard/tax-returns/${id}/process`);
  };

  return (
    <div className="taxpayer-returns-container">
      <div className="details-header">
        <button className="back-button" onClick={handleBack}>
          <FiArrowLeft className="btn-icon-sm" /> Back to Returns
        </button>
        <h1><FiFileText /> Tax Return Details</h1>
      </div>

      {loading ? (
        <div className="loading-section">
          <div className="spinner"></div>
          <p>Loading tax return details...</p>
        </div>
      ) : returnData ? (
        <div className="details-content">
          {/* Status banner */}
          <div className={`status-banner status-${returnData.status.toLowerCase()}`}>
            {returnData.status === 'Pending' && <FiClock className="btn-icon-md" />}
            {returnData.status === 'Verified' && <FiCheckCircle className="btn-icon-md" />}
            {returnData.status === 'Rejected' && <FiAlertCircle className="btn-icon-md" />}
            <span>Status: <strong>{returnData.status}</strong></span>
            <div className="banner-actions">
              {returnData.status !== 'Verified' && (
                <button className="process-button" onClick={handleProcessReturn}>
                  <FiEdit className="btn-icon-sm" /> Process Return
                </button>
              )}
              <button className="download-button">
                <FiDownload className="btn-icon-sm" /> Download PDF
              </button>
              <button className="print-button">
                <FiPrinter className="btn-icon-sm" /> Print
              </button>
            </div>
          </div>

          {/* Summary section */}
          <div className="details-card">
            <div className="card-header">
              <h2><FiInfo /> Summary</h2>
              <div className="return-number">Return #: {returnData.returnNumber}</div>
            </div>
            <div className="summary-grid">
              <div className="summary-item">
                <div className="summary-label">Taxpayer</div>
                <div className="summary-value">{returnData.taxpayer}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Tax Type</div>
                <div className="summary-value">{returnData.type}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Year</div>
                <div className="summary-value">{returnData.year}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Date Submitted</div>
                <div className="summary-value">{formatDateTime(returnData.submissionDate)}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Taxpayer ID</div>
                <div className="summary-value">{returnData.taxpayerId}</div>
              </div>
              <div className="summary-item">
                <div className="summary-label">Status</div>
                <div className="summary-value">
                  <span className={`status-badge status-${returnData.status.toLowerCase()}`}>
                    {returnData.status === 'Pending' && <FiClock className="btn-icon-sm" />}
                    {returnData.status === 'Verified' && <FiCheckCircle className="btn-icon-sm" />}
                    {returnData.status === 'Rejected' && <FiAlertCircle className="btn-icon-sm" />}
                    {returnData.status}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs for details, documents, history */}
          <div className="details-tabs">
            <button 
              className={`tab-button ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
            >
              <FiFileText className="btn-icon-sm" /> Return Details
            </button>
            <button 
              className={`tab-button ${activeTab === 'documents' ? 'active' : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <FiClipboard className="btn-icon-sm" /> Documents ({returnData.documents.length})
            </button>
            <button 
              className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <FiMessageSquare className="btn-icon-sm" /> History ({returnData.history.length})
            </button>
          </div>

          {/* Tab content */}
          <div className="tab-content">
            {activeTab === 'details' && (
              <div className="details-tab-content">
                {/* Taxpayer Information */}
                <div className="details-card">
                  <div className="card-header">
                    <h3><FiUser /> Taxpayer Information</h3>
                  </div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <div className="detail-label">Name</div>
                      <div className="detail-value">{returnData.taxpayer}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">ID</div>
                      <div className="detail-value">{returnData.taxpayerId}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Phone</div>
                      <div className="detail-value">{returnData.contactInfo.phone}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Email</div>
                      <div className="detail-value">{returnData.contactInfo.email}</div>
                    </div>
                    <div className="detail-item detail-item-full">
                      <div className="detail-label">Address</div>
                      <div className="detail-value">{returnData.contactInfo.address}</div>
                    </div>
                  </div>
                </div>

                {/* Return Information */}
                <div className="details-card">
                  <div className="card-header">
                    <h3><FiCalendar /> Return Information</h3>
                  </div>
                  <div className="detail-grid">
                    <div className="detail-item">
                      <div className="detail-label">Return Number</div>
                      <div className="detail-value">{returnData.returnNumber}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Tax Type</div>
                      <div className="detail-value">{returnData.type}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Year</div>
                      <div className="detail-value">{returnData.year}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Tax Period Start</div>
                      <div className="detail-value">{formatDate(returnData.taxPeriod.startDate)}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Tax Period End</div>
                      <div className="detail-value">{formatDate(returnData.taxPeriod.endDate)}</div>
                    </div>
                    <div className="detail-item">
                      <div className="detail-label">Submission Date</div>
                      <div className="detail-value">{formatDateTime(returnData.submissionDate)}</div>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className="details-card">
                  <div className="card-header">
                    <h3><FiDollarSign /> Financial Information</h3>
                  </div>
                  <div className="finance-grid">
                    <div className="finance-item">
                      <div className="finance-label">Gross Income</div>
                      <div className="finance-value">{formatCurrency(returnData.amounts.grossIncome)}</div>
                    </div>
                    <div className="finance-item">
                      <div className="finance-label">Total Deductions</div>
                      <div className="finance-value">{formatCurrency(returnData.amounts.totalDeductions)}</div>
                    </div>
                    <div className="finance-item">
                      <div className="finance-label">Taxable Income</div>
                      <div className="finance-value">{formatCurrency(returnData.amounts.taxableIncome)}</div>
                    </div>
                    <div className="finance-item">
                      <div className="finance-label">Tax Due</div>
                      <div className="finance-value highlight">{formatCurrency(returnData.amounts.taxDue)}</div>
                    </div>
                    <div className="finance-item">
                      <div className="finance-label">Tax Paid</div>
                      <div className="finance-value">{formatCurrency(returnData.amounts.taxPaid)}</div>
                    </div>
                    <div className="finance-item">
                      <div className="finance-label">Balance</div>
                      <div className={`finance-value ${returnData.amounts.balance > 0 ? 'negative' : ''}`}>
                        {formatCurrency(returnData.amounts.balance)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'documents' && (
              <div className="details-card">
                <div className="card-header">
                  <h3><FiClipboard /> Documents</h3>
                  <button className="upload-button">
                    <FiUpload className="btn-icon-sm" /> Upload Document
                  </button>
                </div>
                <div className="documents-list">
                  <table className="data-table documents-table">
                    <thead>
                      <tr>
                        <th>Document Name</th>
                        <th>Type</th>
                        <th>Uploaded On</th>
                        <th>Size</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {returnData.documents.map((doc, index) => (
                        <tr key={index}>
                          <td>{doc.name}</td>
                          <td>{doc.type.toUpperCase()}</td>
                          <td>{formatDateTime(doc.dateUploaded)}</td>
                          <td>{doc.size}</td>
                          <td className="table-actions">
                            <button className="icon-button">
                              <FiDownload className="btn-icon-sm" />
                            </button>
                            <button className="icon-button">
                              <FiTrash2 className="btn-icon-sm" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="details-card">
                <div className="card-header">
                  <h3><FiMessageSquare /> History</h3>
                </div>
                <div className="timeline">
                  {returnData.history.map((event, index) => (
                    <div className="timeline-item" key={index}>
                      <div className="timeline-icon">
                        {event.action.includes('Submitted') && <FiFileText />}
                        {event.action.includes('Review') && <FiCheckCircle />}
                        {event.action.includes('Assessment') && <FiDollarSign />}
                      </div>
                      <div className="timeline-content">
                        <div className="timeline-date">{formatDateTime(event.date)}</div>
                        <div className="timeline-title">{event.action}</div>
                        <div className="timeline-user">By: {event.user}</div>
                        <div className="timeline-note">{event.note}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
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
    </div>
  );
};

export default TaxReturnDetails; 