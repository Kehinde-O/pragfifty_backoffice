import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FiCheckCircle, FiXCircle, FiFileText, FiArrowLeft, FiUser,
  FiClock, FiList, FiDollarSign, FiInfo, FiSend, FiRefreshCw,
  FiEdit
} from 'react-icons/fi';
import styles from './AssessmentApproval.module.css';

const AssessmentApproval = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState(null);
  const [approvalComment, setApprovalComment] = useState('');
  const [currentApprovalStep, setCurrentApprovalStep] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
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
        status: 'pending',
        source: 'Niger State IRS',
        lga: 'N/A',
        createdBy: 'Admin User',
        assessmentReference: 'ASMT-REF-123456',
        assessmentMethod: 'Direct Assessment',
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
        workflow: {
          currentStep: 1,
          steps: [
            {
              id: 1,
              title: 'Revenue Officer Review',
              description: 'Initial review by revenue officer',
              status: 'pending',
              user: 'Current User',
              requiredRole: 'Revenue Officer',
              date: null,
              comment: null
            },
            {
              id: 2,
              title: 'Supervisor Approval',
              description: 'Assessment review by supervisor',
              status: 'pending',
              user: null,
              requiredRole: 'Supervisor',
              date: null,
              comment: null
            },
            {
              id: 3,
              title: 'Final Approval',
              description: 'Final review and approval before issuing',
              status: 'pending',
              user: null,
              requiredRole: 'Manager',
              date: null,
              comment: null
            }
          ]
        }
      };
      
      setAssessment(mockAssessment);
      setCurrentApprovalStep(mockAssessment.workflow.steps.find(step => step.status === 'pending'));
      setLoading(false);
    }, 1000);
  }, [id]);
  
  // Format currency
  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' });
    } catch(e) {
      return dateString;
    }
  };
  
  // Handle approval
  const handleApprove = () => {
    if (!approvalComment.trim()) {
      alert('Please add a comment before approving.');
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedWorkflow = { ...assessment.workflow };
      const stepIndex = updatedWorkflow.steps.findIndex(step => step.id === currentApprovalStep.id);
      
      if (stepIndex !== -1) {
        // Update current step
        updatedWorkflow.steps[stepIndex] = {
          ...updatedWorkflow.steps[stepIndex],
          status: 'approved',
          date: new Date().toISOString(),
          comment: approvalComment,
          user: 'Current User'
        };
        
        // Move to next step if available
        if (stepIndex < updatedWorkflow.steps.length - 1) {
          updatedWorkflow.currentStep = updatedWorkflow.steps[stepIndex + 1].id;
        } else {
          // All steps completed, mark assessment as approved
          setAssessment({
            ...assessment,
            status: 'approved',
            workflow: updatedWorkflow
          });
          
          alert('Assessment has been fully approved and is now ready for issuance.');
          navigate(`/dashboard/assessments/${id}`);
          return;
        }
      }
      
      setAssessment({
        ...assessment,
        workflow: updatedWorkflow
      });
      
      setCurrentApprovalStep(updatedWorkflow.steps.find(step => step.status === 'pending'));
      setApprovalComment('');
      setSubmitting(false);
      
      alert('Assessment has been approved at this level and moved to the next approval stage.');
    }, 1500);
  };
  
  // Handle rejection
  const handleReject = () => {
    if (!approvalComment.trim()) {
      alert('Please add a comment explaining the reason for rejection.');
      return;
    }
    
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedWorkflow = { ...assessment.workflow };
      const stepIndex = updatedWorkflow.steps.findIndex(step => step.id === currentApprovalStep.id);
      
      if (stepIndex !== -1) {
        // Update current step
        updatedWorkflow.steps[stepIndex] = {
          ...updatedWorkflow.steps[stepIndex],
          status: 'rejected',
          date: new Date().toISOString(),
          comment: approvalComment,
          user: 'Current User'
        };
      }
      
      setAssessment({
        ...assessment,
        status: 'rejected',
        workflow: updatedWorkflow
      });
      
      setSubmitting(false);
      alert('Assessment has been rejected. The taxpayer will be notified.');
      navigate(`/dashboard/assessments/${id}`);
    }, 1500);
  };
  
  // Get step status class
  const getStepStatusClass = (step) => {
    switch (step.status) {
      case 'approved':
        return styles.approvalStepCompleted;
      case 'rejected':
        return styles.approvalStepRejected;
      case 'pending':
        return step.id === currentApprovalStep?.id ? styles.approvalStepActive : '';
      default:
        return '';
    }
  };
  
  // Get step icon class
  const getStepIconClass = (step) => {
    switch (step.status) {
      case 'approved':
        return styles.approvalStepIconCompleted;
      case 'rejected':
        return styles.approvalStepIconRejected;
      case 'pending':
        return step.id === currentApprovalStep?.id ? styles.approvalStepIconActive : '';
      default:
        return '';
    }
  };
  
  // Render step icon
  const renderStepIcon = (step) => {
    switch (step.status) {
      case 'approved':
        return <FiCheckCircle size={18} />;
      case 'rejected':
        return <FiXCircle size={18} />;
      case 'pending':
        return step.id === currentApprovalStep?.id ? <FiClock size={18} /> : <FiClock size={18} />;
      default:
        return <FiClock size={18} />;
    }
  };
  
  if (loading) {
    return (
      <div className={styles.approvalContainer}>
        <div className={styles.loadingIndicator}>
          <FiRefreshCw className={styles.spinning} size={32} />
          <p>Loading assessment details...</p>
        </div>
      </div>
    );
  }
  
  if (!assessment) {
    return (
      <div className={styles.approvalContainer}>
        <div className={styles.loadingIndicator}>
          <FiInfo size={32} />
          <p>Assessment not found. It may have been deleted or you don't have permission to view it.</p>
          <button 
            className={`${styles.actionButton} ${styles.buttonSecondary}`}
            onClick={() => navigate('/dashboard/assessments')}
          >
            <FiArrowLeft size={14} /> Back to Assessments
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.approvalContainer}>
      {/* Page Header */}
      <div className={styles.pageHeader}>
        <h1><FiCheckCircle className={styles.pageHeaderIcon} /> Assessment Approval</h1>
        <button 
          className={styles.backButton}
          onClick={() => navigate(`/dashboard/assessments/${id}`)}
        >
          <FiArrowLeft size={14} /> Back to Assessment
        </button>
      </div>
      
      {/* Main Content */}
      <div className={styles.gridContainer}>
        <div>
          {/* Assessment Details */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2><FiFileText className={styles.cardIcon} /> Assessment Details</h2>
            </div>
            <div className={styles.infoList}>
              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Assessment ID</span>
                  <span className={styles.infoValue}>{assessment.id}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Assessment Reference</span>
                  <span className={styles.infoValue}>{assessment.assessmentReference}</span>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Taxpayer Name</span>
                  <span className={styles.infoValue}>{assessment.taxpayerName}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>TIN</span>
                  <span className={styles.infoValue}>{assessment.taxpayerId}</span>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Revenue Head</span>
                  <span className={styles.infoValue}>{assessment.revenueHead}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Period</span>
                  <span className={styles.infoValue}>{assessment.period}</span>
                </div>
              </div>
              <div className={styles.infoRow}>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Created Date</span>
                  <span className={styles.infoValue}>{formatDate(assessment.createdAt)}</span>
                </div>
                <div className={styles.infoItem}>
                  <span className={styles.infoLabel}>Due Date</span>
                  <span className={styles.infoValue}>{formatDate(assessment.dueDate)}</span>
                </div>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Total Amount</span>
                <span className={styles.infoValue}>{formatCurrency(assessment.calculations.total)}</span>
              </div>
            </div>
          </div>
          
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
                  <span className={styles.infoLabel}>
                    {assessment.taxpayerInfo.type === 'Individual' ? 'Occupation' : 'Business'}
                  </span>
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
        </div>
        
        {/* Approval Workflow */}
        <div>
          <div className={`${styles.card} ${styles.workflowCard}`}>
            <div className={styles.cardHeader}>
              <h2><FiCheckCircle className={styles.cardIcon} /> Approval Workflow</h2>
            </div>
            
            <div className={styles.approvalWorkflow}>
              {assessment.workflow.steps.map((step) => (
                <div 
                  key={step.id} 
                  className={`${styles.approvalStep} ${getStepStatusClass(step)}`}
                >
                  <div className={`${styles.approvalStepIcon} ${getStepIconClass(step)}`}>
                    {renderStepIcon(step)}
                  </div>
                  <div className={styles.approvalStepContent}>
                    <div className={styles.approvalStepHeader}>
                      <div className={styles.approvalStepTitle}>{step.title}</div>
                      {step.date && (
                        <div className={styles.approvalStepDate}>{formatDate(step.date)}</div>
                      )}
                    </div>
                    <div className={styles.approvalStepDesc}>
                      {step.description}
                    </div>
                    <div className={styles.approvalStepUser}>
                      {step.status === 'pending' ? (
                        <span>Awaiting {step.requiredRole}</span>
                      ) : (
                        <span>{step.user} ({step.requiredRole})</span>
                      )}
                    </div>
                    
                    {step.status !== 'pending' && step.comment && (
                      <div className={styles.approvalStepDesc} style={{ fontStyle: 'italic', marginTop: '0.5rem' }}>
                        "{step.comment}"
                      </div>
                    )}
                    
                    {step.id === currentApprovalStep?.id && (
                      <>
                        <div className={styles.formGroup}>
                          <label className={styles.formLabel}>Your Comment</label>
                          <textarea 
                            className={styles.formTextarea}
                            value={approvalComment}
                            onChange={(e) => setApprovalComment(e.target.value)}
                            placeholder="Add your comment or reason for approval/rejection"
                            disabled={submitting}
                          />
                        </div>
                        
                        <div className={styles.approvalStepActions}>
                          <button 
                            className={`${styles.actionButton} ${styles.buttonSuccess}`}
                            onClick={handleApprove}
                            disabled={submitting}
                          >
                            {submitting ? (
                              <>
                                <FiRefreshCw className={styles.spinning} size={14} /> Processing...
                              </>
                            ) : (
                              <>
                                <FiCheckCircle size={14} /> Approve
                              </>
                            )}
                          </button>
                          <button 
                            className={`${styles.actionButton} ${styles.buttonDanger}`}
                            onClick={handleReject}
                            disabled={submitting}
                          >
                            {submitting ? (
                              <>
                                <FiRefreshCw className={styles.spinning} size={14} /> Processing...
                              </>
                            ) : (
                              <>
                                <FiXCircle size={14} /> Reject
                              </>
                            )}
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
              <button 
                className={`${styles.actionButton} ${styles.buttonSecondary}`}
                onClick={() => navigate('/dashboard/assessments')}
                disabled={submitting}
              >
                <FiArrowLeft size={14} /> Back to Assessments
              </button>
              
              {assessment.status === 'pending' && currentApprovalStep && (
                <button 
                  className={`${styles.actionButton} ${styles.buttonSecondary}`}
                  onClick={() => navigate(`/dashboard/assessments/${id}/edit`)}
                  disabled={submitting}
                >
                  <FiEdit size={14} /> Edit Assessment
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssessmentApproval; 