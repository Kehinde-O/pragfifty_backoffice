import React, { useState, useEffect } from 'react';
import { FaFileAlt, FaReceipt, FaFileInvoice, FaIdCard, FaChartLine, FaArrowUp, FaArrowDown, FaArrowRight } from 'react-icons/fa';
import styles from './Dashboard.module.css';

const PerformanceMetrics = ({ period }) => {
  const [performanceData, setPerformanceData] = useState({
    approvedTCCs: 0,
    generatedBills: 0,
    generatedAssessments: 0,
    printedReceipts: 0,
    trends: {}
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeMetric, setActiveMetric] = useState('tcc');
  
  useEffect(() => {
    // Simulating API call to fetch performance metrics
    const fetchPerformanceData = async () => {
      setIsLoading(true);
      try {
        // Simulated Niger State IRS specific data with trends
        const mockData = {
          approvedTCCs: 157,
          generatedBills: 2453,
          generatedAssessments: 1876,
          printedReceipts: 3254,
          trends: {
            tcc: { change: 12.3, direction: 'up', weekly: [32, 28, 35, 24, 38, 30, 42] },
            bills: { change: -3.8, direction: 'down', weekly: [420, 390, 480, 520, 450, 410, 430] },
            assessments: { change: 8.6, direction: 'up', weekly: [280, 310, 295, 330, 350, 360, 380] },
            receipts: { change: 15.4, direction: 'up', weekly: [425, 460, 500, 520, 540, 580, 620] }
          }
        };
        
        // Add a slight delay to simulate network request
        setTimeout(() => {
          setPerformanceData(mockData);
          setIsLoading(false);
        }, 600);
      } catch (error) {
        console.error('Error fetching performance data:', error);
        setIsLoading(false);
      }
    };
    
    fetchPerformanceData();
  }, [period]);
  
  // Format large numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-NG').format(num);
  };

  // Format percentage with sign
  const formatPercentage = (value) => {
    const sign = value > 0 ? '+' : '';
    return `${sign}${value.toFixed(1)}%`;
  };

  const metricsData = [
    {
      id: 'tcc',
      label: 'Approved TCCs',
      value: performanceData.approvedTCCs,
      description: 'Tax Clearance Certificates',
      icon: <FaIdCard />,
      color: '#4285F4'
    },
    {
      id: 'bills',
      label: 'Generated Bills',
      value: performanceData.generatedBills,
      description: 'Payment bills for taxpayers',
      icon: <FaFileInvoice />,
      color: '#34A853'
    },
    {
      id: 'assessments',
      label: 'Notice of Assessments',
      value: performanceData.generatedAssessments,
      description: 'Tax assessments issued',
      icon: <FaFileAlt />,
      color: '#FBBC05'
    },
    {
      id: 'receipts',
      label: 'Printed Receipts',
      value: performanceData.printedReceipts,
      description: 'Official receipts issued',
      icon: <FaReceipt />,
      color: '#EA4335'
    }
  ];

  // Gets trend indicator based on direction
  const getTrendIndicator = (trend) => {
    if (!trend) return null;
    
    return trend.direction === 'up' ? (
      <span className={`${styles.trendIndicator} ${styles.trendUp}`}>
        <FaArrowUp /> {formatPercentage(trend.change)}
      </span>
    ) : (
      <span className={`${styles.trendIndicator} ${styles.trendDown}`}>
        <FaArrowDown /> {formatPercentage(trend.change)}
      </span>
    );
  };

  // Renders the activity chart for the selected metric
  const renderActivityChart = () => {
    if (isLoading || !performanceData.trends[activeMetric]) return null;

    const activeTrend = performanceData.trends[activeMetric];
    const maxValue = Math.max(...activeTrend.weekly);
    
    return (
      <div className={styles.activityChartSection}>
        <div className={styles.activityChartHeader}>
          <h4 className={styles.activityChartTitle}>Weekly Activity</h4>
          {getTrendIndicator(activeTrend)}
        </div>
        <div className={styles.activityChart}>
          {activeTrend.weekly.map((value, index) => {
            const height = (value / maxValue) * 100;
            const activeMetricData = metricsData.find(m => m.id === activeMetric);
            const barColor = activeMetricData ? activeMetricData.color : '#4285F4';
            
            return (
              <div key={index} className={styles.activityChartBarContainer}>
                <div 
                  className={styles.activityChartBar} 
                  style={{ height: `${height}%`, backgroundColor: barColor }}
                  title={`Day ${index + 1}: ${formatNumber(value)}`}
                />
                <div className={styles.activityChartLabel}>{index + 1}</div>
              </div>
            );
          })}
        </div>
        <div className={styles.activityChartFooter}>
          Last 7 days
        </div>
      </div>
    );
  };
  
  // Renders the performance metrics in a grid
  const renderMetrics = () => {
    return (
      <div className={styles.performanceMetricsGrid}>
        {metricsData.map((metric) => (
          <div 
            key={metric.id} 
            className={`${styles.metricItem} ${activeMetric === metric.id ? styles.metricItemActive : ''}`}
            onClick={() => setActiveMetric(metric.id)}
            style={{ borderColor: activeMetric === metric.id ? metric.color : 'transparent' }}
          >
            <div className={styles.metricContent}>
              <div className={styles.metricTitleRow}>
                <h4 className={styles.metricTitle}>{formatNumber(metric.value)}</h4>
                {performanceData.trends[metric.id] && getTrendIndicator(performanceData.trends[metric.id])}
              </div>
              <div className={styles.metricInfo}>
                <div className={styles.metricLabel}>{metric.label}</div>
                <div className={styles.metricDescription}>{metric.description}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  
  return (
    <>
      {isLoading ? (
        <div className={styles.loadingState}>
          <div className={styles.loadingIcon}>
            <FaChartLine />
          </div>
          <div>Loading performance data...</div>
        </div>
      ) : (
        <>
          <div className={styles.performanceContainer}>
            <div className={styles.activityPerformanceHeader}>
              <h3 className={styles.activityPerformanceTitle}>
                <FaChartLine style={{ color: '#4285F4' }} /> Activity Performance
              </h3>
            </div>
            
            {renderMetrics()}
            {renderActivityChart()}
          </div>
          
          <div className={styles.viewAllLink}>
            <a href="/reports/performance">
              View Detailed Report <FaArrowRight />
            </a>
          </div>
        </>
      )}
    </>
  );
};

export default PerformanceMetrics; 