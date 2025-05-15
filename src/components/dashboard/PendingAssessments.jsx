import React from 'react';
import { FiFileText, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './PendingAssessments.css';

const PendingAssessments = ({ assessments }) => {
  // Function to render status badge with appropriate styling
  const renderStatus = (status) => {
    switch (status) {
      case 'pending_review':
        return (
          <span className="assessment-status pending">
            <FiFileText className="status-icon" />
            Pending Review
          </span>
        );
      case 'pending_confirmation':
        return (
          <span className="assessment-status confirmation">
            <FiCheckCircle className="status-icon" />
            Pending Confirmation
          </span>
        );
      case 'under_audit':
        return (
          <span className="assessment-status audit">
            <FiAlertCircle className="status-icon" />
            Under Audit
          </span>
        );
      default:
        return <span className="assessment-status">{status}</span>;
    }
  };

  // Format currency
  const formatAmount = (amount) => {
    return `₦${amount.toLocaleString('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  // Format date for due date
  const formatDueDate = (dateString) => {
    const today = new Date();
    const dueDate = new Date(dateString);
    const differenceInDays = Math.floor((dueDate - today) / (1000 * 60 * 60 * 24));
    
    const formattedDate = dueDate.toLocaleDateString('en-NG', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    
    if (differenceInDays < 0) {
      return <span className="overdue">{formattedDate} (Overdue)</span>;
    } else if (differenceInDays <= 7) {
      return <span className="due-soon">{formattedDate} (Due soon)</span>;
    } else {
      return <span>{formattedDate}</span>;
    }
  };

  return (
    <div className="pending-assessments">
      {assessments.length === 0 ? (
        <div className="no-assessments">No pending assessments</div>
      ) : (
        <div className="assessments-list">
          {assessments.map((assessment) => (
            <div key={assessment.id} className="assessment-card">
              <div className="assessment-header">
                <h3 className="assessment-id">{assessment.id}</h3>
                {renderStatus(assessment.status)}
              </div>
              <div className="assessment-details">
                <div className="detail-row">
                  <span className="label">Taxpayer:</span>
                  <span className="value taxpayer">{assessment.taxpayer}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Type:</span>
                  <span className="value">{assessment.type}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Amount:</span>
                  <span className="value amount">{formatAmount(assessment.amount)}</span>
                </div>
                <div className="detail-row">
                  <span className="label">Due Date:</span>
                  <span className="value">{formatDueDate(assessment.dueDate)}</span>
                </div>
              </div>
              <div className="assessment-actions">
                <button className="action-button review">Review</button>
                <button className="action-button approve">Approve</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingAssessments; 