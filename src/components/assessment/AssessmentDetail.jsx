import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  FiFileText, FiArrowLeft, FiUser, FiCalendar, FiClock, FiDollarSign,
  FiPrinter, FiDownload, FiEdit, FiTrash2, FiCheckCircle, FiXCircle,
  FiSend, FiCreditCard, FiList, FiActivity, FiMessageSquare, FiInfo
} from 'react-icons/fi';
import styles from './AssessmentDetail.module.css';

const AssessmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  // Mock data fetching - replace with actual API calls
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      // Mock assessment data
      const mockAssessment = {
        id: 'NSIRS-ASMT-2023-001',
        taxpayerName: 'John Doe',
        taxpayerId: 'TIN123456789',
        taxpayerType: 'individual',
        revenueHead: 'Personal Income Tax',
        period: '2023 Tax Year',
        dueDate: '2023-12-31',
        createdAt: '2023-06-15',
        amount: 250000.00,
        status: 'issued',
        source: 'Niger State IRS',
        lga: 'N/A',
        createdBy: 'Admin User',
        approvedBy: 'Supervisor',
        approvedAt: '2023-06-20',
        issuedAt: '2023-06-22',
        paidAt: null,
        assessmentReference: 'ASMT-REF-123456',
        assessmentMethod: 'Direct Assessment',
        paymentStatus: 'Unpaid',
        paymentDueDate: '2023-12-31',
        items: [
          {
            id: 1,
            description: 'Personal Income Tax - 2023',
            quantity: 1,
            rate: 200000.00,
            amount: 200000.00
          },
          {
            id: 2,
            description: 'Development Levy',
            quantity: 1,
            rate: 50000.00,
            amount: 50000.00
          }
        ],
        calculations: {
          subtotal: 250000.00,
          discounts: 0.00,
          penalties: 0.00,
          total: 250000.00
        },
        taxpayerInfo: {
          name: 'John Doe',
          tin: 'TIN123456789',
          type: 'Individual',
          address: '123 Main Street, Minna, Niger State',
          phone: '+234 8012345678',
          email: 'john.doe@example.com',
          occupation: 'Software Engineer',
          business: 'N/A'
        },
        activity: [
          {
            id: 1,
            date: '2023-06-15T09:30:00',
            action: 'Assessment Created',
            user: 'Admin User',
            description: 'Assessment was created for Personal Income Tax - 2023'
          },
          {
            id: 2,
            date: '2023-06-18T14:20:00',
            action: 'Submitted for Approval',
            user: 'Admin User',
            description: 'Assessment submitted for approval'
          },
          {
            id: 3,
            date: '2023-06-20T11:15:00',
            action: 'Assessment Approved',
            user: 'Supervisor',
            description: 'Assessment was approved with no changes'
          },
          {
            id: 4,
            date: '2023-06-22T15:45:00',
            action: 'Assessment Issued',
            user: 'System',
            description: 'Assessment notice was issued and sent to taxpayer'
          }
        ]
      };

      // Mock comments
      const mockComments = [
        {
          id: 1,
          author: 'Admin User',
          authorInitials: 'AU',
          text: 'Assessment created based on taxpayer declaration and documents provided.',
          timestamp: '2023-06-15T10:20:00'
        },
        {
          id: 2,
          author: 'Supervisor',
          authorInitials: 'SV',
          text: 'Reviewed and approved the assessment. All documentation is in order.',
          timestamp: '2023-06-20T11:30:00'
        }
      ];

      setAssessment(mockAssessment);
      setComments(mockComments);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    // In a real app, send this to the API
    const newCommentObj = {
      id: comments.length + 1,
      author: 'Current User', // Replace with actual logged-in user
      authorInitials: 'CU', // Replace with actual initials
      text: newComment,
      timestamp: new Date().toISOString()
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');
  };

  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch(e) {
      return dateString;
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-NG', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch(e) {
      return dateString;
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'draft': return styles.statusDraft;
      case 'pending': return styles.statusPending;
      case 'approved': return styles.statusApproved;
      case 'issued': return styles.statusIssued;
      case 'paid': return styles.statusPaid;
      case 'rejected': return styles.statusRejected;
      default: return '';
    }
  };

  // Print the assessment
  const handlePrint = () => {
    window.print();
  };

  // Generate PDF (mock function)
  const handleDownload = () => {
    alert('Downloading PDF... In a real app, this would generate and download a PDF.');
  };

  // Delete assessment (mock function)
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this assessment? This action cannot be undone.')) {
      alert('Assessment deleted successfully.');
      navigate('/dashboard/assessments');
    }
  };

  if (loading) {
    return (
      <div className={styles.detailContainer}>
        <div className={styles.loadingIndicator}>
          <FiClock className={styles.spinning} size={32} />
          <p>Loading assessment details...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className={styles.detailContainer}>
        <div className={styles.loadingIndicator}>
          <FiInfo size={32} />
          <p>Assessment not found. It may have been deleted or you don't have permission to view it.</p>
          <Link to="/dashboard/assessments" className={`${styles.actionButton} ${styles.secondaryButton}`}>
            <FiArrowLeft size={14} /> Back to Assessments
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.detailContainer}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1><FiFileText className={styles.pageHeaderIcon} /> Assessment Details</h1>
        <button 
          className={styles.backButton}
          onClick={() => navigate('/dashboard/assessments')}
        >
          <FiArrowLeft size={14} /> Back to List
        </button>
      </div>

      {/* Assessment Header */}
      <div className={styles.assessmentHeader}>
        <div className={styles.assessmentInfo}>
          <p className={styles.assessmentId}>{assessment.id}</p>
          <h2 className={styles.assessmentTitle}>
            {assessment.revenueHead} - {assessment.period}
          </h2>
          <p className={styles.assessmentSubtitle}>
            {assessment.taxpayerName} ({assessment.taxpayerId})
          </p>
          <div className={styles.actionButtons}>
            <button 
              className={`${styles.actionButton} ${styles.secondaryButton}`} 
              onClick={handlePrint}
            >
              <FiPrinter size={14} /> Print
            </button>
            <button 
              className={`${styles.actionButton} ${styles.secondaryButton}`}
              onClick={handleDownload}
            >
              <FiDownload size={14} /> Download PDF
            </button>
            {assessment.status === 'draft' && (
              <>
                <Link 
                  to={`/dashboard/assessments/${assessment.id}/edit`}
                  className={`${styles.actionButton} ${styles.secondaryButton}`}
                >
                  <FiEdit size={14} /> Edit
                </Link>
                <button 
                  className={`${styles.actionButton} ${styles.dangerButton}`}
                  onClick={handleDelete}
                >
                  <FiTrash2 size={14} /> Delete
                </button>
              </>
            )}
            {assessment.status === 'pending' && (
              <Link 
                to={`/dashboard/assessments/${assessment.id}/approve`}
                className={`${styles.actionButton} ${styles.primaryButton}`}
              >
                <FiCheckCircle size={14} /> Approve
              </Link>
            )}
            {(assessment.status === 'approved' || assessment.status === 'issued') && (
              <Link 
                to={`/dashboard/assessments/${assessment.id}/pay`}
                className={`${styles.actionButton} ${styles.primaryButton}`}
              >
                <FiDollarSign size={14} /> Pay Now
              </Link>
            )}
          </div>
        </div>
        <span className={`${styles.statusBadge} ${getStatusClass(assessment.status)}`}>
          {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
        </span>
      </div>

      {/* Main Content */}
      <div className={styles.contentGrid}>
        <div className={styles.contentSection}>
          {/* Assessment Items */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2><FiList className={styles.cardIcon} /> Assessment Items</h2>
            </div>
            <table className={styles.itemsTable}>
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Rate</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {assessment.items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.description}</td>
                    <td>{item.quantity}</td>
                    <td>{formatCurrency(item.rate)}</td>
                    <td>{formatCurrency(item.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ padding: '0 1rem' }}>
              <div className={styles.calculationItem}>
                <span className={styles.calculationLabel}>Subtotal</span>
                <span className={styles.calculationValue}>{formatCurrency(assessment.calculations.subtotal)}</span>
              </div>
              <div className={styles.calculationItem}>
                <span className={styles.calculationLabel}>Discounts</span>
                <span className={styles.calculationValue}>{formatCurrency(assessment.calculations.discounts)}</span>
              </div>
              <div className={styles.calculationItem}>
                <span className={styles.calculationLabel}>Penalties</span>
                <span className={styles.calculationValue}>{formatCurrency(assessment.calculations.penalties)}</span>
              </div>
              <div className={styles.calculationItem}>
                <span className={styles.calculationLabel}>Total Amount</span>
                <span className={`${styles.calculationValue} ${styles.total}`}>{formatCurrency(assessment.calculations.total)}</span>
              </div>
            </div>
          </div>

          {/* Taxpayer Information */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2><FiUser className={styles.cardIcon} /> Taxpayer Information</h2>
            </div>
            <div className={styles.infoList}>
              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Taxpayer Name</span>
                  <span className={styles.infoValue}>{assessment.taxpayerInfo.name}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Taxpayer Identification Number (TIN)</span>
                  <span className={styles.infoValue}>{assessment.taxpayerInfo.tin}</span>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Taxpayer Type</span>
                  <span className={styles.infoValue}>{assessment.taxpayerInfo.type}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Occupation/Business</span>
                  <span className={styles.infoValue}>
                    {assessment.taxpayerInfo.type === 'Individual' 
                      ? assessment.taxpayerInfo.occupation 
                      : assessment.taxpayerInfo.business}
                  </span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Address</span>
                <span className={styles.infoValue}>{assessment.taxpayerInfo.address}</span>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Phone Number</span>
                  <span className={styles.infoValue}>{assessment.taxpayerInfo.phone}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Email Address</span>
                  <span className={styles.infoValue}>{assessment.taxpayerInfo.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes & Comments */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2><FiMessageSquare className={styles.cardIcon} /> Notes & Comments</h2>
            </div>
            <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
              <input
                type="text"
                className={styles.commentInput}
                placeholder="Add a comment or note..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button type="submit" className={styles.commentButton}>
                <FiSend size={14} /> Add
              </button>
            </form>
            <div className={styles.comments}>
              {comments.map((comment) => (
                <div key={comment.id} className={styles.comment}>
                  <div className={styles.commentAvatar}>
                    {comment.authorInitials}
                  </div>
                  <div className={styles.commentContent}>
                    <div className={styles.commentHeader}>
                      <span className={styles.commentAuthor}>{comment.author}</span>
                      <span className={styles.commentTime}>{formatDateTime(comment.timestamp)}</span>
                    </div>
                    <p className={styles.commentText}>{comment.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.sideSection}>
          {/* Assessment Details */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2><FiInfo className={styles.cardIcon} /> Assessment Information</h2>
            </div>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Assessment Reference</span>
                <span className={styles.infoValue}>{assessment.assessmentReference}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Assessment Method</span>
                <span className={styles.infoValue}>{assessment.assessmentMethod}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Revenue Head</span>
                <span className={styles.infoValue}>{assessment.revenueHead}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Period</span>
                <span className={styles.infoValue}>{assessment.period}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Created Date</span>
                <span className={styles.infoValue}>{formatDate(assessment.createdAt)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Created By</span>
                <span className={styles.infoValue}>{assessment.createdBy}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Approved Date</span>
                <span className={styles.infoValue}>{formatDate(assessment.approvedAt)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Approved By</span>
                <span className={styles.infoValue}>{assessment.approvedBy || '-'}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Issued Date</span>
                <span className={styles.infoValue}>{formatDate(assessment.issuedAt)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Due Date</span>
                <span className={styles.infoValue}>{formatDate(assessment.dueDate)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Source</span>
                <span className={styles.infoValue}>{assessment.source} {assessment.lga !== 'N/A' ? `(${assessment.lga})` : ''}</span>
              </div>
            </div>
          </div>

          {/* Payment Status */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2><FiDollarSign className={styles.cardIcon} /> Payment Status</h2>
            </div>
            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Status</span>
                <span className={styles.infoValue}>{assessment.paymentStatus}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Due Date</span>
                <span className={styles.infoValue}>{formatDate(assessment.paymentDueDate)}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Amount</span>
                <span className={styles.infoValue}>{formatCurrency(assessment.calculations.total)}</span>
              </div>
              {assessment.paidAt && (
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Paid On</span>
                  <span className={styles.infoValue}>{formatDate(assessment.paidAt)}</span>
                </div>
              )}
            </div>
            {(assessment.status === 'approved' || assessment.status === 'issued') && (
              <div style={{ marginTop: '1rem' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>
                  Payment Methods
                </h3>
                <div className={`${styles.paymentMethod} ${styles.paymentMethodSelected}`}>
                  <div className={styles.paymentMethodIcon}>
                    <FiCreditCard size={20} />
                  </div>
                  <div className={styles.paymentMethodInfo}>
                    <div className={styles.paymentMethodName}>Online Payment</div>
                    <div className={styles.paymentMethodDescription}>Pay with debit/credit card or bank transfer</div>
                  </div>
                </div>
                <div className={styles.paymentMethod}>
                  <div className={styles.paymentMethodIcon}>
                    <FiDollarSign size={20} />
                  </div>
                  <div className={styles.paymentMethodInfo}>
                    <div className={styles.paymentMethodName}>Bank Deposit</div>
                    <div className={styles.paymentMethodDescription}>Make a deposit at any bank branch</div>
                  </div>
                </div>
                <Link 
                  to={`/dashboard/assessments/${assessment.id}/pay`}
                  className={`${styles.actionButton} ${styles.primaryButton}`}
                  style={{ width: '100%', marginTop: '0.75rem', justifyContent: 'center' }}
                >
                  <FiCreditCard size={14} /> Proceed to Payment
                </Link>
              </div>
            )}
          </div>

          {/* Activity Timeline */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2><FiActivity className={styles.cardIcon} /> Activity Timeline</h2>
            </div>
            <div className={styles.timeline}>
              {assessment.activity.map((activity) => (
                <div key={activity.id} className={styles.timelineItem}>
                  <div className={styles.timelineIcon}>
                    <FiClock size={8} />
                  </div>
                  <div className={styles.timelineContent}>
                    <div className={styles.timelineDate}>{formatDateTime(activity.date)}</div>
                    <div className={styles.timelineTitle}>{activity.action}</div>
                    <div className={styles.timelineDescription}>
                      {activity.description} by {activity.user}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentDetail; 