import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './TaxReturnDetails.module.css';
import { 
  FiFileText, FiUser, FiCalendar, FiDollarSign, FiClock, 
  FiCheckCircle, FiAlertCircle, FiArrowLeft, FiDownload,
  FiPrinter, FiMessageSquare, FiClipboard, FiEdit, FiTrash2, FiInfo, 
  FiUpload, FiEye
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
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.titleContainer}>
          <button className={styles.backButton} onClick={handleBack}>
            <FiArrowLeft />
          </button>
          <h1 className={styles.title}>
            Tax Return Details
            <span className={styles.returnId}>{returnData?.returnNumber}</span>
          </h1>
        </div>

        <div className={styles.actionButtons}>
          {returnData?.status !== 'Verified' && (
            <button 
              className={`${styles.actionButton} ${styles.primaryButton}`} 
              onClick={handleProcessReturn}
            >
              <FiEdit /> Process Return
            </button>
          )}
          <button className={`${styles.actionButton} ${styles.secondaryButton}`}>
            <FiDownload /> Download
          </button>
          <button className={`${styles.actionButton} ${styles.secondaryButton}`}>
            <FiPrinter /> Print
          </button>
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
          {/* Status banner */}
          <div className={`${styles.statusBanner} ${styles[returnData.status.toLowerCase()]}`}>
            <div className={styles.statusContainer}>
              <div className={`${styles.statusIcon} ${styles[returnData.status.toLowerCase()]}`}>
                {returnData.status === 'Pending' && <FiClock />}
                {returnData.status === 'Verified' && <FiCheckCircle />}
                {returnData.status === 'Rejected' && <FiAlertCircle />}
              </div>
              <div className={styles.statusInfo}>
                <div className={styles.statusLabel}>Status</div>
                <div className={`${styles.statusText} ${styles[returnData.status.toLowerCase()]}`}>
                  {returnData.status}
                </div>
                <div className={styles.statusMessage}>
                  {returnData.status === 'Pending' && 'This return is awaiting verification by a tax officer.'}
                  {returnData.status === 'Verified' && 'This return has been verified and approved.'}
                  {returnData.status === 'Rejected' && 'This return has been rejected due to issues.'}
                </div>
              </div>
            </div>
          </div>

          {/* Tab navigation */}
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'details' ? styles.active : ''}`}
              onClick={() => setActiveTab('details')}
            >
              <FiFileText className={styles.tabIcon} /> Return Details
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'documents' ? styles.active : ''}`}
              onClick={() => setActiveTab('documents')}
            >
              <FiClipboard className={styles.tabIcon} /> Documents ({returnData.documents.length})
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'history' ? styles.active : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <FiMessageSquare className={styles.tabIcon} /> History ({returnData.history.length})
            </button>
          </div>

          {/* Tab content */}
          <div className={styles.tabContent}>
            {activeTab === 'details' && (
              <>
                {/* Taxpayer Information */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}><FiUser /></div>
                    <h3 className={styles.cardTitle}>Taxpayer Information</h3>
                  </div>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Name</div>
                      <div className={styles.infoValue}>{returnData.taxpayer}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>ID</div>
                      <div className={styles.infoValue}>{returnData.taxpayerId}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Phone</div>
                      <div className={styles.infoValue}>{returnData.contactInfo.phone}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Email</div>
                      <div className={styles.infoValue}>{returnData.contactInfo.email}</div>
                    </div>
                    <div className={`${styles.infoItem} ${styles.fullWidth}`}>
                      <div className={styles.infoLabel}>Address</div>
                      <div className={styles.infoValue}>{returnData.contactInfo.address}</div>
                    </div>
                  </div>
                </div>

                {/* Return Information */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}><FiCalendar /></div>
                    <h3 className={styles.cardTitle}>Return Information</h3>
                  </div>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Return Number</div>
                      <div className={styles.infoValue}>{returnData.returnNumber}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Tax Type</div>
                      <div className={styles.infoValue}>{returnData.type}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Year</div>
                      <div className={styles.infoValue}>{returnData.year}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Submission Date</div>
                      <div className={styles.infoValue}>{formatDateTime(returnData.submissionDate)}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Tax Period Start</div>
                      <div className={styles.infoValue}>{formatDate(returnData.taxPeriod.startDate)}</div>
                    </div>
                    <div className={styles.infoItem}>
                      <div className={styles.infoLabel}>Tax Period End</div>
                      <div className={styles.infoValue}>{formatDate(returnData.taxPeriod.endDate)}</div>
                    </div>
                  </div>
                </div>

                {/* Financial Information */}
                <div className={styles.card}>
                  <div className={styles.cardHeader}>
                    <div className={styles.cardIcon}><FiDollarSign /></div>
                    <h3 className={styles.cardTitle}>Financial Information</h3>
                  </div>
                  <div className={styles.financeSummary}>
                    <div className={styles.financeGrid}>
                      <div className={styles.financeItem}>
                        <div className={styles.financeLabel}>Gross Income</div>
                        <div className={styles.financeValue}>{formatCurrency(returnData.amounts.grossIncome)}</div>
                      </div>
                      <div className={styles.financeItem}>
                        <div className={styles.financeLabel}>Total Deductions</div>
                        <div className={styles.financeValue}>{formatCurrency(returnData.amounts.totalDeductions)}</div>
                      </div>
                      <div className={styles.financeItem}>
                        <div className={styles.financeLabel}>Taxable Income</div>
                        <div className={styles.financeValue}>{formatCurrency(returnData.amounts.taxableIncome)}</div>
                      </div>
                      <div className={styles.financeItem}>
                        <div className={styles.financeLabel}>Tax Due</div>
                        <div className={styles.financeValue}>{formatCurrency(returnData.amounts.taxDue)}</div>
                      </div>
                      <div className={styles.financeItem}>
                        <div className={styles.financeLabel}>Tax Paid</div>
                        <div className={styles.financeValue}>{formatCurrency(returnData.amounts.taxPaid)}</div>
                      </div>
                      <div className={styles.financeItem}>
                        <div className={styles.financeLabel}>Balance</div>
                        <div className={`${styles.financeValue} ${returnData.amounts.balance > 0 ? styles.negative : styles.positive}`}>
                          {formatCurrency(returnData.amounts.balance)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'documents' && (
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}><FiClipboard /></div>
                  <h3 className={styles.cardTitle}>Submitted Documents</h3>
                </div>
                
                <div className={styles.documentList}>
                  <table className={styles.documentTable}>
                    <thead>
                      <tr>
                        <th>Document</th>
                        <th>Type</th>
                        <th>Size</th>
                        <th>Date Uploaded</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {returnData.documents.map((doc, index) => (
                        <tr key={index}>
                          <td>
                            <div className={styles.documentName}>
                              <div className={styles.documentIcon}><FiFileText /></div>
                              {doc.name}
                            </div>
                          </td>
                          <td>{doc.type.toUpperCase()}</td>
                          <td>{doc.size}</td>
                          <td>{formatDateTime(doc.dateUploaded)}</td>
                          <td>
                            <div className={styles.documentActions}>
                              <button className={`${styles.iconButton} ${styles.viewButton}`} title="View">
                                <FiEye />
                              </button>
                              <button className={`${styles.iconButton} ${styles.downloadButton}`} title="Download">
                                <FiDownload />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className={styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.cardIcon}><FiMessageSquare /></div>
                  <h3 className={styles.cardTitle}>Return History</h3>
                </div>
                
                <div className={styles.timeline}>
                  {returnData.history.map((event, index) => (
                    <div key={index} className={styles.timelineItem}>
                      <div className={styles.timelineIcon}>
                        {event.action.includes('Submit') && <FiUpload />}
                        {event.action.includes('Review') && <FiClipboard />}
                        {event.action.includes('Assessment') && <FiDollarSign />}
                      </div>
                      <div className={styles.timelineContent}>
                        <div className={styles.timelineDate}>{formatDateTime(event.date)}</div>
                        <div className={styles.timelineTitle}>{event.action}</div>
                        <div className={styles.timelineDescription}>
                          <strong>User:</strong> {event.user}<br />
                          {event.note}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={styles.card}>
          <div className={styles.errorMessage}>
            Tax return not found or an error occurred.
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxReturnDetails; 