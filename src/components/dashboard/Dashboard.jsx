import React, { useState, useEffect } from 'react';
import { 
  FiDollarSign, 
  FiUsers, 
  FiClipboard, 
  FiAlertCircle,
  FiPieChart,
  FiArrowUp,
  FiArrowDown,
  FiMoreVertical,
  FiFilter,
  FiRefreshCw,
  FiPlus,
  FiEdit3,
  FiFileText,
  FiCreditCard,
  FiCalendar,
  FiActivity,
  FiEye,
  FiAlertTriangle,
  FiChevronRight,
  FiChevronsRight,
  FiBarChart2,
  FiCheckCircle,
  FiXCircle,
  FiClock
} from 'react-icons/fi';

import './Dashboard.css';

// Dashboard Components
import RevenueChart from './RevenueChart';
import RecentTransactions from './RecentTransactions';
import PendingAssessments from './PendingAssessments';
import UserActivity from './UserActivity';
// Import new report components
import TopMDAsReport from './TopMDAsReport';
import TopBanksReport from './TopBanksReport';

const Dashboard = () => {
  // Dashboard state
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState({
    totalRevenue: 0,
    registeredUsers: 0,
    pendingAssessments: 0,
    revenueGrowth: 0,
    userGrowth: 0
  });
  
  const [revenueBySource, setRevenueBySource] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [pendingAssessments, setPendingAssessments] = useState([]);
  const [recentUserActivity, setRecentUserActivity] = useState([]);
  const [dateRange, setDateRange] = useState('This Month');
  
  // State for new reports
  const [topMDAsData, setTopMDAsData] = useState([]);
  const [topBanksData, setTopBanksData] = useState([]);
  
  // Fetch dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        
        // Simulating API calls - in real implementation these would be actual API calls
        // In a production environment, these would be replaced with axios/fetch calls to your Java Spring Boot backend
        
        // Example: const response = await axios.get('/api/dashboard/summary');
        
        // Mock data for now
        setTimeout(() => {
          // Summary statistics
          setDashboardStats({
            totalRevenue: 25436789.50,
            registeredUsers: 12675,
            pendingAssessments: 843,
            revenueGrowth: 7.8,
            userGrowth: 12.3
          });
          
          // Revenue by source data for chart
          setRevenueBySource([
            { name: 'Personal Income Tax', value: 42 },
            { name: 'Corporate Tax', value: 28 },
            { name: 'Property Tax', value: 15 },
            { name: 'Vehicle Tax', value: 8 },
            { name: 'Other', value: 7 }
          ]);
          
          // Recent transactions
          setRecentTransactions([
            {
              id: 'TXN-001234',
              taxpayer: 'John Doe',
              type: 'Personal Income Tax',
              amount: 150000.00,
              date: '2023-11-15',
              status: 'successful'
            },
            {
              id: 'TXN-001235',
              taxpayer: 'Acme Corporation',
              type: 'Corporate Tax',
              amount: 750000.00,
              date: '2023-11-14',
              status: 'successful'
            },
            {
              id: 'TXN-001236',
              taxpayer: 'Jane Smith',
              type: 'Property Tax',
              amount: 65000.00,
              date: '2023-11-14',
              status: 'failed'
            },
            {
              id: 'TXN-001237',
              taxpayer: 'Tech Innovations Ltd',
              type: 'Corporate Tax',
              amount: 525000.00,
              date: '2023-11-13',
              status: 'pending'
            },
            {
              id: 'TXN-001238',
              taxpayer: 'Ibrahim Hassan',
              type: 'Vehicle Tax',
              amount: 35000.00,
              date: '2023-11-13',
              status: 'successful'
            }
          ]);
          
          // Pending assessments
          setPendingAssessments([
            {
              id: 'ASMT-002345',
              taxpayer: 'Global Services Ltd',
              type: 'Corporate Tax',
              amount: 1250000.00,
              dueDate: '2023-12-05',
              status: 'pending_review'
            },
            {
              id: 'ASMT-002346',
              taxpayer: 'Mohamed Abubakar',
              type: 'Personal Income Tax',
              amount: 87500.00,
              dueDate: '2023-12-10',
              status: 'pending_confirmation'
            },
            {
              id: 'ASMT-002347',
              taxpayer: 'Sunrise Properties',
              type: 'Property Tax',
              amount: 325000.00,
              dueDate: '2023-12-15',
              status: 'under_audit'
            }
          ]);
          
          // Recent user activity
          setRecentUserActivity([
            {
              id: 'ACT-003456',
              user: 'admin.user',
              action: 'Updated assessment ASMT-002300',
              timestamp: '2023-11-15T14:35:00',
              ipAddress: '192.168.1.105'
            },
            {
              id: 'ACT-003457',
              user: 'revenue.officer1',
              action: 'Created new assessment for Tech Solutions Ltd',
              timestamp: '2023-11-15T13:22:00',
              ipAddress: '192.168.1.107'
            },
            {
              id: 'ACT-003458',
              user: 'support.agent2',
              action: 'Updated taxpayer profile TIN-98765432',
              timestamp: '2023-11-15T11:15:00',
              ipAddress: '192.168.1.110'
            },
            {
              id: 'ACT-003459',
              user: 'auditor.team',
              action: 'Flagged transaction TXN-001230 for review',
              timestamp: '2023-11-15T10:45:00',
              ipAddress: '192.168.1.108'
            }
          ]);
          
          // Mock data for Top MDAs Report
          setTopMDAsData([
            { id: 'mda1', name: 'Ministry of Finance', revenue: 12500000 },
            { id: 'mda2', name: 'Ministry of Works', revenue: 9800000 },
            { id: 'mda3', name: 'Ministry of Health', revenue: 7600000 },
            { id: 'mda4', name: 'Ministry of Education', revenue: 6500000 },
            { id: 'mda5', name: 'State Judiciary', revenue: 4200000 },
          ]);

          // Mock data for Top Banks Report
          setTopBanksData([
            { id: 'bank1', name: 'Zenith Bank', revenueCollected: 15200000 },
            { id: 'bank2', name: 'UBA', revenueCollected: 11500000 },
            { id: 'bank3', name: 'GTBank', revenueCollected: 9900000 },
            { id: 'bank4', name: 'First Bank', revenueCollected: 8750000 },
            { id: 'bank5', name: 'Access Bank', revenueCollected: 7100000 },
          ]);
          
          setIsLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [dateRange]);
  
  // Handle date range change
  const handleDateRangeChange = (range) => {
    setDateRange(range);
    // This would trigger the useEffect to fetch new data for the selected range
  };

  // Handle refresh data
  const handleRefreshData = () => {
    setIsLoading(true);
    // This would trigger the useEffect to fetch new data
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="dashboard-title">
          <h1>Niger State IRS Dashboard</h1>
          <p>Welcome to the Backoffice Administration Portal</p>
        </div>
        <div className="dashboard-controls">
          <div className="control-item">
            <button className="refresh-button" onClick={handleRefreshData} disabled={isLoading}>
              <FiRefreshCw className={isLoading ? "spinning" : ""} />
              <span>Refresh</span>
            </button>
          </div>
          <div className="control-item date-filter">
            <FiCalendar className="filter-icon" />
            <label>Time Period:</label>
            <select 
              value={dateRange}
              onChange={(e) => handleDateRangeChange(e.target.value)}
              disabled={isLoading}
            >
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
          </div>
        </div>
      </header>
      
      {isLoading ? (
        <div className="loading-indicator">
          <div className="spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      ) : (
        <>
          {/* KPI Summary Cards */}
          <section className="dashboard-section kpi-section">
            <h3 className="section-title">Key Performance Indicators</h3>
            <div className="dashboard-stats">
              <div className="stat-card">
                <div className="stat-icon revenue">
                  <FiDollarSign />
                </div>
                <div className="stat-details">
                  <h3>Total Revenue</h3>
                  <p className="stat-value">₦{dashboardStats.totalRevenue.toLocaleString()}</p>
                  <p className="stat-change">
                    {dashboardStats.revenueGrowth >= 0 ? (
                      <span className="positive"><FiArrowUp /> {dashboardStats.revenueGrowth}%</span>
                    ) : (
                      <span className="negative"><FiArrowDown /> {Math.abs(dashboardStats.revenueGrowth)}%</span>
                    )}
                    <span className="period">vs last period</span>
                  </p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon users">
                  <FiUsers />
                </div>
                <div className="stat-details">
                  <h3>Registered Taxpayers</h3>
                  <p className="stat-value">{dashboardStats.registeredUsers.toLocaleString()}</p>
                  <p className="stat-change">
                    {dashboardStats.userGrowth >= 0 ? (
                      <span className="positive"><FiArrowUp /> {dashboardStats.userGrowth}%</span>
                    ) : (
                      <span className="negative"><FiArrowDown /> {Math.abs(dashboardStats.userGrowth)}%</span>
                    )}
                    <span className="period">vs last period</span>
                  </p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon assessments">
                  <FiClipboard />
                </div>
                <div className="stat-details">
                  <h3>Pending Assessments</h3>
                  <p className="stat-value">{dashboardStats.pendingAssessments}</p>
                  <p className="stat-change">
                    <a href="#" className="action-link">
                      <FiEye /> View all <FiChevronRight />
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Quick Actions Section */}
          <section className="dashboard-section quick-actions-section">
            <h3 className="section-title">Quick Actions</h3>
            <div className="quick-actions">
              <button className="quick-action-button primary">
                <FiFileText className="action-icon" />
                <span className="action-text">Create Assessment</span>
              </button>
              <button className="quick-action-button">
                <FiUsers className="action-icon" />
                <span className="action-text">Register Taxpayer</span>
              </button>
              <button className="quick-action-button">
                <FiCreditCard className="action-icon" />
                <span className="action-text">Process Payment</span>
              </button>
              <button className="quick-action-button">
                <FiBarChart2 className="action-icon" />
                <span className="action-text">Generate Report</span>
              </button>
            </div>
          </section>
          
          {/* Analytics Section */}
          <section className="dashboard-section analytics-section">
            <h3 className="section-title">Analytics Overview</h3>
            <div className="analytics-container">
              {/* Revenue Chart */}
              <div className="dashboard-card revenue-chart-card">
                <div className="card-header">
                  <h2>
                    <FiPieChart className="card-header-icon" />
                    Revenue by Source
                  </h2>
                  <div className="card-header-actions">
                    <button className="card-button">
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
                <div className="card-content chart-container">
                  <RevenueChart data={revenueBySource} />
                </div>
              </div>
              
              {/* Recent Transactions */}
              <div className="dashboard-card transactions-card">
                <div className="card-header">
                  <h2>
                    <FiDollarSign className="card-header-icon" />
                    Recent Transactions
                  </h2>
                  <div className="card-header-actions">
                    <button className="card-button">
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  <RecentTransactions transactions={recentTransactions} />
                </div>
                <div className="card-footer">
                  <button className="view-all-button">
                    View All Transactions <FiChevronsRight />
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Report Highlights Section */}
          <section className="dashboard-section report-highlights-section">
            <h3 className="section-title">Report Highlights</h3>
            <div className="reports-container">
              {/* Top MDAs Report Card */}
              <div className="dashboard-card mda-report-card">
                <div className="card-header">
                  <h2>
                    <FiBarChart2 className="card-header-icon" />
                    Top 5 MDAs by Revenue
                  </h2>
                  <div className="card-header-actions">
                    <button className="card-button">
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  <TopMDAsReport data={topMDAsData} />
                </div>
                <div className="card-footer">
                  <button className="view-all-button">
                    View Full MDA Report <FiChevronsRight />
                  </button>
                </div>
              </div>
              
              {/* Top Banks Report Card */}
              <div className="dashboard-card bank-report-card">
                <div className="card-header">
                  <h2>
                    <FiBarChart2 className="card-header-icon" />
                    Top 5 Banks by Revenue Collection
                  </h2>
                  <div className="card-header-actions">
                    <button className="card-button">
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  <TopBanksReport data={topBanksData} />
                </div>
                <div className="card-footer">
                  <button className="view-all-button">
                    View Full Banks Report <FiChevronsRight />
                  </button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Activity & Tasks Section */}
          <section className="dashboard-section activity-section">
            <h3 className="section-title">Activity & Tasks</h3>
            <div className="dual-container">
              {/* Pending Assessments */}
              <div className="dashboard-card assessment-card">
                <div className="card-header">
                  <h2>
                    <FiClipboard className="card-header-icon" />
                    Pending Assessments
                  </h2>
                  <div className="card-header-actions">
                    <button className="card-button">
                      <FiPlus />
                    </button>
                    <button className="card-button">
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  <PendingAssessments assessments={pendingAssessments} />
                </div>
                <div className="card-footer">
                  <button className="view-all-button">
                    View All Assessments <FiChevronsRight />
                  </button>
                </div>
              </div>
              
              {/* User Activity */}
              <div className="dashboard-card activity-card">
                <div className="card-header">
                  <h2>
                    <FiActivity className="card-header-icon" />
                    Recent User Activity
                  </h2>
                  <div className="card-header-actions">
                    <button className="card-button">
                      <FiMoreVertical />
                    </button>
                  </div>
                </div>
                <div className="card-content">
                  <UserActivity activities={recentUserActivity} />
                </div>
                <div className="card-footer">
                  <button className="view-all-button">
                    View Full Audit Log <FiChevronsRight />
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard; 