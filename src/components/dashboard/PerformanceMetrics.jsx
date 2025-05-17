import React, { useState, useEffect } from 'react';
import { Card } from '../common/ui';
import { FaFileAlt, FaReceipt, FaFileInvoice, FaIdCard } from 'react-icons/fa';

const PerformanceMetrics = () => {
  const [performanceData, setPerformanceData] = useState({
    approvedTCCs: 0,
    generatedBills: 0,
    generatedAssessments: 0,
    printedReceipts: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month');
  
  useEffect(() => {
    // Simulating API call to fetch performance metrics
    const fetchPerformanceData = async () => {
      setIsLoading(true);
      try {
        // Simulated Niger State IRS specific data
        const mockData = {
          approvedTCCs: 157,
          generatedBills: 2453,
          generatedAssessments: 1876,
          printedReceipts: 3254
        };
        
        // Add a slight delay to simulate network request
        setTimeout(() => {
          setPerformanceData(mockData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching performance data:', error);
        setIsLoading(false);
      }
    };
    
    fetchPerformanceData();
  }, [timeRange]);
  
  // Format large numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-NG').format(num);
  };
  
  // Function to render metric item
  const renderMetricItem = (label, value, description, icon, color) => {
    const iconColors = {
      blue: '#4285F4',
      green: '#34A853', 
      orange: '#FBBC05',
      red: '#EA4335'
    };
    
    const iconBgColors = {
      blue: 'rgba(66, 133, 244, 0.12)',
      green: 'rgba(52, 168, 83, 0.12)',
      orange: 'rgba(251, 188, 5, 0.12)',
      red: 'rgba(234, 67, 53, 0.12)'
    };
    
    return (
      <div className="metric-item">
        <div className="metric-icon" style={{ backgroundColor: iconBgColors[color], color: iconColors[color] }}>
          {icon}
        </div>
        <div className="metric-value-container">
          <div className="metric-value">
            {isLoading ? (
              <div className="skeleton-loader" style={{ width: '80px', height: '32px' }}></div>
            ) : (
              <span className="value-number">{value}</span>
            )}
          </div>
        </div>
        <div className="metric-details">
          <h4 className="metric-label">{label}</h4>
          <p className="metric-description">{description}</p>
        </div>
      </div>
    );
  };
  
  const handleTimeRangeChange = (e) => {
    setTimeRange(e.target.value);
  };
  
  return (
    <Card>
      <div className="section-header">
        <h2 className="section-title">Activity Metrics</h2>
        <div className="section-actions">
          <select value={timeRange} onChange={handleTimeRangeChange}>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
      
      <div className="metrics-container">
        {renderMetricItem(
          'Approved TCCs',
          formatNumber(performanceData.approvedTCCs),
          'Tax Clearance Certificates approved and processed',
          <FaIdCard className="metric-icon-svg" />,
          'blue'
        )}
        
        {renderMetricItem(
          'Generated Bills',
          formatNumber(performanceData.generatedBills),
          'Payment bills generated for taxpayers',
          <FaFileInvoice className="metric-icon-svg" />,
          'green'
        )}
        
        {renderMetricItem(
          'Notice of Assessments',
          formatNumber(performanceData.generatedAssessments),
          'Tax assessment notices issued to taxpayers',
          <FaFileAlt className="metric-icon-svg" />,
          'orange'
        )}
        
        {renderMetricItem(
          'Printed Receipts',
          formatNumber(performanceData.printedReceipts),
          'Official receipts issued for tax payments',
          <FaReceipt className="metric-icon-svg" />,
          'red'
        )}
      </div>
      
      <div className="card-footer">
        <a href="/dashboard/reports/performance" className="card-link">
          View Detailed Activity Report
        </a>
      </div>
    </Card>
  );
};

export default PerformanceMetrics; 