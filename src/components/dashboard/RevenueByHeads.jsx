import React, { useState, useEffect } from 'react';
import { Card } from '../common/ui';
import { FaChartBar } from 'react-icons/fa';

const RevenueByHeads = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState('state'); // 'state' or 'lga'
  
  useEffect(() => {
    // Simulating API call to fetch revenue by heads data
    const fetchRevenueData = async () => {
      setIsLoading(true);
      try {
        // Simulated data for Niger State revenue heads
        const stateRevenueData = [
          { name: 'Personal Income Tax', amount: 124560000, percentage: 48.5 },
          { name: 'Road Taxes', amount: 45430000, percentage: 17.7 },
          { name: 'Withholding Tax', amount: 32345000, percentage: 12.6 },
          { name: 'Capital Gains Tax', amount: 18930000, percentage: 7.4 },
          { name: 'Development Levy', amount: 15765000, percentage: 6.1 },
          { name: 'Mining Fees', amount: 11680000, percentage: 4.5 },
          { name: 'Others', amount: 8079450, percentage: 3.2 }
        ];
        
        // Simulated data for Niger State LGA revenue heads
        const lgaRevenueData = [
          { name: 'Market Fees', amount: 8560000, percentage: 30.2 },
          { name: 'Tenement Rates', amount: 5840000, percentage: 20.6 },
          { name: 'Business Premises', amount: 3780000, percentage: 13.3 },
          { name: 'Slaughter Slab Fees', amount: 2950000, percentage: 10.4 },
          { name: 'Shops & Kiosks Rates', amount: 2340000, percentage: 8.3 },
          { name: 'Marriage Registration', amount: 1850000, percentage: 6.5 },
          { name: 'Motor Park Fees', amount: 1650000, percentage: 5.8 },
          { name: 'Others', amount: 1380000, percentage: 4.9 }
        ];
        
        // Add a slight delay to simulate network request
        setTimeout(() => {
          setRevenueData(viewMode === 'state' ? stateRevenueData : lgaRevenueData);
          setIsLoading(false);
        }, 1200);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        setIsLoading(false);
      }
    };
    
    fetchRevenueData();
  }, [viewMode]);
  
  // Format amount as currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Handle view mode change
  const handleViewModeChange = (mode) => {
    if (mode !== viewMode) {
      setViewMode(mode);
    }
  };
  
  return (
    <Card>
      <div className="section-header">
        <div className="section-title-wrapper">
          <FaChartBar className="section-icon" />
          <h2 className="section-title">Revenue By Heads</h2>
        </div>
        <div className="section-actions">
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${viewMode === 'state' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('state')}
            >
              State
            </button>
            <button 
              className={`toggle-btn ${viewMode === 'lga' ? 'active' : ''}`}
              onClick={() => handleViewModeChange('lga')}
            >
              LGA
            </button>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="skeleton-loader" style={{ width: '100%', height: '250px' }}></div>
      ) : (
        <div className="revenue-bars">
          {revenueData.map((item, index) => (
            <div key={index} className="revenue-bar-item">
              <div className="revenue-name-container">
                <div className="revenue-name">{item.name}</div>
                <div className="revenue-percentage">{item.percentage}%</div>
              </div>
              <div className="revenue-bar-container">
                <div 
                  className="revenue-bar"
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: getBarColor(index)
                  }}
                >
                  <span className="revenue-bar-tooltip">{formatCurrency(item.amount)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="card-footer">
        <a href={`/dashboard/revenue-heads/${viewMode}`} className="card-link">
          View Revenue Head Details
        </a>
      </div>
    </Card>
  );
};

// Helper function to get bar colors
const getBarColor = (index) => {
  const colors = [
    '#4285F4', '#34A853', '#FBBC05', '#EA4335', 
    '#8E24AA', '#0097A7', '#689F38', '#F57C00'
  ];
  return colors[index % colors.length];
};

export default RevenueByHeads; 