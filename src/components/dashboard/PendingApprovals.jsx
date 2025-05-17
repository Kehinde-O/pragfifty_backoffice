import React, { useState, useEffect } from 'react';
import { Card } from '../common/ui';
import { FaExclamationTriangle, FaRegClock, FaChevronRight } from 'react-icons/fa';

const PendingApprovals = () => {
  const [pendingItems, setPendingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API call to fetch pending approvals
    const fetchPendingApprovals = async () => {
      setIsLoading(true);
      try {
        // Simulated Niger State IRS specific data
        const mockPendingItems = [
          {
            id: 'TCC-2023-0042',
            type: 'Tax Clearance',
            description: 'Application for FY2023',
            applicant: 'Minna Agro Enterprises',
            submittedDate: '2023-12-01',
            assignedTo: 'Fatima Ibrahim',
            priority: 'High'
          },
          {
            id: 'SA-2023-0156',
            type: 'Self-Assessment',
            description: 'PIT Self-Assessment 2023',
            applicant: 'Ibrahim Mohammed (Suleja)',
            submittedDate: '2023-12-01',
            assignedTo: 'Aliyu Musa',
            priority: 'Medium'
          },
          {
            id: 'REG-2023-0378',
            type: 'Taxpayer Registration',
            description: 'Business Registration Verification',
            applicant: 'Niger State Farmers Association',
            submittedDate: '2023-12-02',
            assignedTo: 'Unassigned',
            priority: 'Medium'
          },
          {
            id: 'TXR-2023-0093',
            type: 'Tax Return',
            description: 'Annual Tax Return Filing',
            applicant: 'Bida Construction Company',
            submittedDate: '2023-12-02',
            assignedTo: 'Samuel Ajayi',
            priority: 'High'
          },
          {
            id: 'REF-2023-0017',
            type: 'Refund Request',
            description: 'Overpayment Refund ₦125,000',
            applicant: 'Kontagora Transport Union',
            submittedDate: '2023-11-28',
            assignedTo: 'Unassigned',
            priority: 'Low'
          }
        ];
        
        // Add a slight delay to simulate network request
        setTimeout(() => {
          setPendingItems(mockPendingItems);
          setIsLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching pending approvals:', error);
        setIsLoading(false);
      }
    };
    
    fetchPendingApprovals();
  }, []);
  
  // Get priority badge class
  const getPriorityBadgeClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'badge-rejected';
      case 'medium':
        return 'badge-pending';
      case 'low':
        return 'badge-approved';
      default:
        return '';
    }
  };
  
  // Get priority icon
  const getPriorityIcon = (priority) => {
    if (priority.toLowerCase() === 'high') {
      return <FaExclamationTriangle className="priority-icon priority-high" />;
    }
    return null;
  };
  
  // Calculate summary counts
  const calculateSummary = () => {
    const total = pendingItems.length;
    const highPriority = pendingItems.filter(item => item.priority === 'High').length;
    const unassigned = pendingItems.filter(item => item.assignedTo === 'Unassigned').length;
    
    return { total, highPriority, unassigned };
  };
  
  const summary = calculateSummary();
  
  // Create a function to get link based on item type
  const getItemLink = (item) => {
    switch (item.type) {
      case 'Tax Clearance':
        return `/dashboard/tcc-application/${item.id}`;
      case 'Self-Assessment':
        return `/dashboard/assessments/self/${item.id}`;
      case 'Taxpayer Registration':
        return `/dashboard/taxpayers/verification/${item.id}`;
      case 'Tax Return':
        return `/dashboard/tax-returns/${item.id}`;
      case 'Refund Request':
        return `/dashboard/refunds/${item.id}`;
      default:
        return '#';
    }
  };
  
  // Show only the first 3 items for the dashboard preview
  const displayItems = pendingItems.slice(0, 3);
  
  // Render loading skeleton
  const renderSkeleton = () => (
    <div className="pending-approvals-skeleton">
      <div className="approval-item-skeleton"></div>
      <div className="approval-item-skeleton"></div>
      <div className="approval-item-skeleton"></div>
    </div>
  );
  
  return (
    <Card>
      <div className="section-header">
        <div className="section-title-wrapper">
          <h2 className="section-title">Pending Approvals</h2>
          <div className="summary-counts">
            {!isLoading && (
              <>
                <span className="summary-item">
                  <span className="summary-label">Total:</span>
                  <span className="summary-value">{summary.total}</span>
                </span>
                <span className="summary-item">
                  <span className="summary-label">High Priority:</span>
                  <span className="summary-value">{summary.highPriority}</span>
                </span>
                <span className="summary-item">
                  <span className="summary-label">Unassigned:</span>
                  <span className="summary-value">{summary.unassigned}</span>
                </span>
              </>
            )}
          </div>
        </div>
        <a href="/dashboard/tasks/pending" className="view-all-button">
          View All <FaChevronRight />
        </a>
      </div>
      
      {isLoading ? (
        renderSkeleton()
      ) : (
        <div className="pending-approvals-list">
          {displayItems.map((item) => (
            <a key={item.id} href={getItemLink(item)} className="approval-item">
              <div className="approval-item-header">
                <div className="reference-container">
                  {getPriorityIcon(item.priority)}
                  <span className="approval-reference">{item.id}</span>
                </div>
                <span className={`status-badge ${getPriorityBadgeClass(item.priority)}`}>
                  {item.priority}
                </span>
              </div>
              
              <div className="approval-item-content">
                <div className="approval-type">{item.type}</div>
                <div className="approval-detail">{item.description}</div>
                <div className="approval-applicant">{item.applicant}</div>
              </div>
              
              <div className="approval-item-footer">
                <div className="date-submitted">
                  <FaRegClock className="date-icon" />
                  <span>
                    {new Date(item.submittedDate).toLocaleDateString('en-NG', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="approval-item-action">
                  <span className="action-label">Process</span>
                  <FaChevronRight className="action-icon" />
                </div>
              </div>
            </a>
          ))}
          
          {pendingItems.length > 3 && (
            <div className="more-items-info">
              <span>{pendingItems.length - 3} more items</span>
            </div>
          )}
        </div>
      )}
    </Card>
  );
};

export default PendingApprovals; 