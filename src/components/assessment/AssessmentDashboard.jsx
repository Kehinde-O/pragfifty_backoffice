import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FiFileText, FiClock, FiCheckCircle, FiDollarSign, FiArrowRight,
  FiRefreshCw, FiPlus, FiChevronRight, FiEye, FiEdit, FiSearch,
  FiClipboard, FiFilePlus, FiUsers
} from 'react-icons/fi';
import styles from './AssessmentDashboard.module.css';

const AssessmentDashboard = () => {
  const [stats, setStats] = useState({
    pendingCount: 0,
    approvedCount: 0,
    issuedCount: 0,
    paidCount: 0,
    totalAssessmentAmount: 0,
    totalCollectedAmount: 0
  });
  const [recentAssessments, setRecentAssessments] = useState([]);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data fetching - replace with actual API calls
  const fetchDashboardData = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      setStats({
        pendingCount: 12,
        approvedCount: 38,
        issuedCount: 45,
        paidCount: 32,
        totalAssessmentAmount: 12580000.00,
        totalCollectedAmount: 8750000.00
      });

      setRecentAssessments([
        {
          id: 'NSIRS-ASMT-2023-001',
          taxpayerName: 'John Doe',
          taxpayerType: 'individual',
          revenueHead: 'Personal Income Tax',
          period: '2023 Tax Year',
          dueDate: '2023-12-31',
          amount: 250000.00,
          status: 'issued',
          source: 'Niger State IRS',
          lga: 'N/A'
        },
        {
          id: 'NSIRS-ASMT-2023-002',
          taxpayerName: 'TechCore Solutions Ltd',
          taxpayerType: 'business',
          revenueHead: 'Business Premises Levy',
          period: '2023',
          dueDate: '2023-12-31',
          amount: 350000.00,
          status: 'pending',
          source: 'Niger State IRS',
          lga: 'N/A'
        },
        {
          id: 'NSIRS-ASMT-2023-003',
          taxpayerName: 'Sarah Johnson',
          taxpayerType: 'individual',
          revenueHead: 'Property Tax',
          period: '2023',
          dueDate: '2023-12-15',
          amount: 125000.00,
          status: 'paid',
          source: 'Niger State IRS',
          lga: 'N/A'
        },
        {
          id: 'NSIRS-ASMT-2023-004',
          taxpayerName: 'Global Traders Inc.',
          taxpayerType: 'business',
          revenueHead: 'Market Stall Fee',
          period: '2023 Q4',
          dueDate: '2023-12-31',
          amount: 75000.00,
          status: 'approved',
          source: 'LG',
          lga: 'Bida'
        }
      ]);

      setPendingApprovals([
        {
          id: 'NSIRS-ASMT-2023-005',
          taxpayerName: 'Heritage Bank Plc',
          taxpayerType: 'business',
          revenueHead: 'Corporate Income Tax',
          period: '2023',
          submittedDate: '2023-11-15',
          amount: 1250000.00,
          status: 'pending',
          reviewer: 'Pending Assignment'
        },
        {
          id: 'NSIRS-ASMT-2023-006',
          taxpayerName: 'Michael Okafor',
          taxpayerType: 'individual',
          revenueHead: 'Capital Gains Tax',
          period: '2023',
          submittedDate: '2023-11-18',
          amount: 450000.00,
          status: 'pending',
          reviewer: 'Pending Assignment'
        }
      ]);

      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

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

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.pageHeader}>
        <h1><FiFileText className={styles.pageHeaderIcon} /> Assessment Management</h1>
      </div>

      {loading ? (
        <div className={styles.loadingIndicator}>
          <FiRefreshCw className={styles.spinning} />
          <p>Loading assessment data...</p>
        </div>
      ) : (
        <>
          {/* Stats Cards */}
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.pendingIcon}`}>
                <FiClock size={24} />
              </div>
              <div className={styles.statContent}>
                <h3>Pending Assessments</h3>
                <p className={styles.statValue}>{stats.pendingCount}</p>
                <Link to="/dashboard/assessments?status=pending" className={styles.statLink}>
                  View Pending <FiChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.approvedIcon}`}>
                <FiCheckCircle size={24} />
              </div>
              <div className={styles.statContent}>
                <h3>Approved Assessments</h3>
                <p className={styles.statValue}>{stats.approvedCount}</p>
                <Link to="/dashboard/assessments?status=approved" className={styles.statLink}>
                  View Approved <FiChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.issuedIcon}`}>
                <FiFileText size={24} />
              </div>
              <div className={styles.statContent}>
                <h3>Issued Assessments</h3>
                <p className={styles.statValue}>{stats.issuedCount}</p>
                <Link to="/dashboard/assessments?status=issued" className={styles.statLink}>
                  View Issued <FiChevronRight size={16} />
                </Link>
              </div>
            </div>

            <div className={styles.statCard}>
              <div className={`${styles.statIcon} ${styles.paidIcon}`}>
                <FiDollarSign size={24} />
              </div>
              <div className={styles.statContent}>
                <h3>Paid Assessments</h3>
                <p className={styles.statValue}>{stats.paidCount}</p>
                <Link to="/dashboard/assessments?status=paid" className={styles.statLink}>
                  View Paid <FiChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>

          {/* Recent Assessments */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2><FiFileText className={styles.sectionIcon} /> Recent Assessments</h2>
              <Link to="/dashboard/assessments" className={styles.viewAllLink}>
                View All <FiArrowRight size={14} />
              </Link>
            </div>
            <div className={styles.assessmentCards}>
              {recentAssessments.map(assessment => (
                <div key={assessment.id} className={styles.assessmentCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.cardTitle}>{assessment.taxpayerName}</h3>
                      <p className={styles.cardSubtitle}>{assessment.revenueHead} - {assessment.period}</p>
                    </div>
                    <span className={`${styles.statusBadge} ${getStatusClass(assessment.status)}`}>
                      {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                    </span>
                  </div>
                  <p className={styles.cardAmount}>{formatCurrency(assessment.amount)}</p>
                  <div className={styles.cardDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Assessment ID:</span>
                      <span>{assessment.id}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Type:</span>
                      <span>{assessment.taxpayerType === 'individual' ? 'Individual' : 'Business'}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Due Date:</span>
                      <span>{formatDate(assessment.dueDate)}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Source:</span>
                      <span>{assessment.source} {assessment.lga !== 'N/A' ? `(${assessment.lga})` : ''}</span>
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <Link to={`/dashboard/assessments/${assessment.id}`} className={`${styles.cardActionButton} ${styles.secondaryButton}`}>
                      <FiEye size={14} /> View
                    </Link>
                    {assessment.status === 'pending' && (
                      <Link to={`/dashboard/assessments/${assessment.id}/edit`} className={`${styles.cardActionButton} ${styles.primaryButton}`}>
                        <FiEdit size={14} /> Edit
                      </Link>
                    )}
                    {(assessment.status === 'approved' || assessment.status === 'issued') && (
                      <Link to={`/dashboard/assessments/${assessment.id}/pay`} className={`${styles.cardActionButton} ${styles.primaryButton}`}>
                        <FiDollarSign size={14} /> Pay Now
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Approvals */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2><FiClock className={styles.sectionIcon} /> Pending Approvals</h2>
              <Link to="/dashboard/assessments/approval" className={styles.viewAllLink}>
                View All <FiArrowRight size={14} />
              </Link>
            </div>
            <div className={styles.assessmentCards}>
              {pendingApprovals.map(approval => (
                <div key={approval.id} className={styles.assessmentCard}>
                  <div className={styles.cardHeader}>
                    <div>
                      <h3 className={styles.cardTitle}>{approval.taxpayerName}</h3>
                      <p className={styles.cardSubtitle}>{approval.revenueHead} - {approval.period}</p>
                    </div>
                    <span className={`${styles.statusBadge} ${styles.statusPending}`}>
                      Pending Approval
                    </span>
                  </div>
                  <p className={styles.cardAmount}>{formatCurrency(approval.amount)}</p>
                  <div className={styles.cardDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Assessment ID:</span>
                      <span>{approval.id}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Type:</span>
                      <span>{approval.taxpayerType === 'individual' ? 'Individual' : 'Business'}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Submitted:</span>
                      <span>{formatDate(approval.submittedDate)}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Reviewer:</span>
                      <span>{approval.reviewer}</span>
                    </div>
                  </div>
                  <div className={styles.cardActions}>
                    <Link to={`/dashboard/assessments/${approval.id}`} className={`${styles.cardActionButton} ${styles.secondaryButton}`}>
                      <FiEye size={14} /> View Details
                    </Link>
                    <Link to={`/dashboard/assessments/${approval.id}/approve`} className={`${styles.cardActionButton} ${styles.primaryButton}`}>
                      <FiCheckCircle size={14} /> Review
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Quick Actions</h2>
            </div>
            <div className={styles.quickActions}>
              <Link to="/dashboard/assessments/create" className={`${styles.actionButton} ${styles.createButton}`}>
                <FiPlus size={16} /> Create New Assessment
              </Link>
              <Link to="/dashboard/taxpayers" className={styles.actionButton}>
                <FiUsers size={16} /> Manage Taxpayers
              </Link>
              <Link to="/dashboard/assessments" className={styles.actionButton}>
                <FiSearch size={16} /> Search Assessments
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AssessmentDashboard; 