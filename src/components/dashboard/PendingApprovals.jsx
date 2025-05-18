import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaRegClock, FaChevronRight, FaTasks, FaBell } from 'react-icons/fa';
import styles from './Dashboard.module.css';

const PendingApprovals = ({ period }) => {
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
        }, 800);
      } catch (error) {
        console.error('Error fetching pending approvals:', error);
        setIsLoading(false);
      }
    };
    
    fetchPendingApprovals();
  }, [period]);
  
  // Get priority badge class
  const getPriorityBadgeClass = (priority) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return styles.priorityHigh;
      case 'medium':
        return styles.priorityMedium;
      case 'low':
        return styles.priorityLow;
      default:
        return '';
    }
  };
  
  // Calculate summary counts
  const calculateSummary = () => {
    const total = pendingItems.length;
    const highPriority = pendingItems.filter(item => item.priority === 'High').length;
    const unassigned = pendingItems.filter(item => item.assignedTo === 'Unassigned').length;
    
    return { total, highPriority, unassigned };
  };
  
  const summary = calculateSummary();
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Show only the first 3 items for the dashboard preview
  const displayItems = pendingItems.slice(0, 3);
  
  return (
    <>
      <div className={styles.sectionHeader}>
        <h3 className={styles.cardContentTitle}>
          <FaBell /> Pending Approvals
        </h3>
        {!isLoading && (
          <div className={styles.statusBadges}>
            <span className={styles.statusBadge}>
              <strong>{summary.total}</strong> total
            </span>
            <span className={`${styles.statusBadge} ${styles.statusBadgeUrgent}`}>
              <strong>{summary.highPriority}</strong> high priority
            </span>
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className={styles.loadingState}>
          <div className={styles.loadingIcon}>
            <FaTasks />
          </div>
          <div>Loading...</div>
        </div>
      ) : (
        <div className={styles.approvalTasks}>
          {displayItems.map((item) => (
            <div key={item.id} className={styles.approvalTask}>
              <div className={styles.approvalTaskHeader}>
                <div className={styles.approvalTaskId}>{item.id}</div>
                <div className={`${styles.priorityIndicator} ${getPriorityBadgeClass(item.priority)}`}>
                  {item.priority === 'High' && <FaExclamationTriangle />}
                  {item.priority}
                </div>
              </div>
              
              <div className={styles.approvalTaskBody}>
                <div className={styles.approvalTaskType}>{item.type}</div>
                <div className={styles.approvalTaskDesc}>{item.description}</div>
                <div className={styles.approvalTaskApplicant}>{item.applicant}</div>
              </div>
              
              <div className={styles.approvalTaskFooter}>
                <div className={styles.approvalTaskDate}>
                  <FaRegClock />{formatDate(item.submittedDate)}
                </div>
                <button className={styles.approvalTaskAction}>
                  Process <FaChevronRight />
                </button>
              </div>
            </div>
          ))}
          
          {pendingItems.length > 3 && (
            <div className={styles.moreItems}>
              +{pendingItems.length - 3} more pending items
            </div>
          )}
        </div>
      )}
      
      {!isLoading && (
        <div className={styles.viewAllLink}>
          <a href="/tasks/approvals">View All Pending Items →</a>
        </div>
      )}
    </>
  );
};

export default PendingApprovals; 