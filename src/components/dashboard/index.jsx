import React, { useState } from 'react';
import RevenueOverview from './RevenueOverview';
import PerformanceMetrics from './PerformanceMetrics';
import RecentTransactions from './RecentTransactions';
import TaxpayerInsights from './TaxpayerInsights';
import PendingApprovals from './PendingApprovals';
import RevenueByHeads from './RevenueByHeads';
import TopContributors from './TopContributors';
import { Card } from '../common/ui';
import { FaRegCalendarAlt, FaChartLine, FaUsers, FaExchangeAlt, FaFileInvoiceDollar, FaUserCheck, FaClipboardCheck } from 'react-icons/fa';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [periodFilter, setPeriodFilter] = useState('month');
  const [isLoading, setIsLoading] = useState(false);

  const handlePeriodChange = (e) => {
    setIsLoading(true);
    setPeriodFilter(e.target.value);
    // Simulate loading state for better UX
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.dashboardHeader}>
        <h1 className={styles.dashboardTitle}>Niger State Revenue Service Dashboard</h1>
        <div className={styles.dashboardActions}>
          <div className={styles.periodSelectorWrapper}>
            <FaRegCalendarAlt className={styles.periodSelectorIcon} />
            <select 
              className={styles.dashboardPeriodSelect}
              value={periodFilter}
              onChange={handlePeriodChange}
              aria-label="Select time period"
              disabled={isLoading}
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className={styles.dashboardSection}>
        <RevenueOverview period={periodFilter} />
      </div>
      
      <div className={styles.dashboardGrid}>
        <Card 
          variant="default" 
          elevation="md"
          accent="primary"
          className={styles.cardNormal}
        >
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <FaFileInvoiceDollar />
            </div>
            <h2 className={styles.cardHeaderTitle}>Revenue Analysis</h2>
          </div>
          <RevenueByHeads period={periodFilter} />
        </Card>
        
        <Card 
          variant="default" 
          elevation="md"
          accent="success"
          className={styles.cardNormal}
        >
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <FaChartLine />
            </div>
            <h2 className={styles.cardHeaderTitle}>Performance</h2>
          </div>
          <PerformanceMetrics period={periodFilter} />
        </Card>
        
        <Card 
          variant="default" 
          elevation="md"
          accent="info"
          className={styles.cardNormal}
        >
          <TaxpayerInsights period={periodFilter} />
        </Card>
        
        <Card 
          variant="default" 
          elevation="md"
          accent="warning"
          className={styles.cardNormal}
        >
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <FaUserCheck />
            </div>
            <h2 className={styles.cardHeaderTitle}>Top Contributors</h2>
          </div>
          <TopContributors period={periodFilter} />
        </Card>
        
        <Card 
          variant="default" 
          elevation="md"
          accent="primary"
          className={styles.cardNormal}
        >
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <FaExchangeAlt />
            </div>
            <h2 className={styles.cardHeaderTitle}>Recent Transactions</h2>
          </div>
          <RecentTransactions period={periodFilter} />
        </Card>
        
        <Card 
          variant="default" 
          elevation="md"
          accent="danger"
          className={styles.cardNormal}
        >
          <div className={styles.cardHeader}>
            <div className={styles.cardIcon}>
              <FaClipboardCheck />
            </div>
            <h2 className={styles.cardHeaderTitle}>Pending Approvals</h2>
          </div>
          <PendingApprovals period={periodFilter} />
        </Card>
      </div>
    </div>
  );
};

export { Dashboard }; 