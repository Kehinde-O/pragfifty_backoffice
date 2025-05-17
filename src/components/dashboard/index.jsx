import React from 'react';
import RevenueOverview from './RevenueOverview';
import PerformanceMetrics from './PerformanceMetrics';
import RecentTransactions from './RecentTransactions';
import TaxpayerInsights from './TaxpayerInsights';
import PendingApprovals from './PendingApprovals';
import RevenueByHeads from './RevenueByHeads';
import TopContributors from './TopContributors';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Niger State Internal Revenue Service Dashboard</h1>
        <div className="dashboard-actions">
          <select className="dashboard-period-select">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month" selected>This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
      
      <div className="dashboard-section">
        <RevenueOverview />
      </div>
      
      <div className="dashboard-row">
        <div className="dashboard-col dashboard-col-wide">
          <RevenueByHeads />
        </div>
        <div className="dashboard-col">
          <PerformanceMetrics />
        </div>
      </div>
      
      <div className="dashboard-row">
        <div className="dashboard-col">
          <TaxpayerInsights />
        </div>
        <div className="dashboard-col">
          <TopContributors />
        </div>
      </div>
      
      <div className="dashboard-row">
        <div className="dashboard-col dashboard-col-wide">
          <RecentTransactions />
        </div>
        <div className="dashboard-col">
          <PendingApprovals />
        </div>
      </div>
    </div>
  );
};

export { Dashboard }; 