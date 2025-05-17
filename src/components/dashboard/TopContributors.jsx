import React, { useState, useEffect } from 'react';
import { Card } from '../common/ui';
import { FaBuilding, FaUniversity } from 'react-icons/fa';

const TopContributors = () => {
  const [contributorsData, setContributorsData] = useState({
    topBanks: [],
    topMDAs: []
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('banks'); // 'banks' or 'mdas'
  
  useEffect(() => {
    // Simulating API call to fetch top contributors data
    const fetchContributorsData = async () => {
      setIsLoading(true);
      try {
        // Simulated data for Niger State top contributors
        const mockData = {
          topBanks: [
            { name: 'First Bank', amount: 42560000, percentage: 28.4 },
            { name: 'Zenith Bank', amount: 35430000, percentage: 23.6 },
            { name: 'UBA', amount: 28790000, percentage: 19.2 },
            { name: 'Access Bank', amount: 24120000, percentage: 16.1 },
            { name: 'GTBank', amount: 19000000, percentage: 12.7 }
          ],
          topMDAs: [
            { name: 'Ministry of Education', amount: 38650000, percentage: 31.5 },
            { name: 'Ministry of Health', amount: 29780000, percentage: 24.3 },
            { name: 'Ministry of Works', amount: 22450000, percentage: 18.3 },
            { name: 'Ministry of Agriculture', amount: 18200000, percentage: 14.8 },
            { name: 'Ministry of Transport', amount: 13650000, percentage: 11.1 }
          ]
        };
        
        // Add a slight delay to simulate network request
        setTimeout(() => {
          setContributorsData(mockData);
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching contributors data:', error);
        setIsLoading(false);
      }
    };
    
    fetchContributorsData();
  }, []);
  
  // Format amount as currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const getActiveData = () => {
    return activeTab === 'banks' ? contributorsData.topBanks : contributorsData.topMDAs;
  };
  
  return (
    <Card>
      <div className="section-header">
        <h2 className="section-title">
          Top Contributors
        </h2>
        <div className="section-actions">
          <div className="view-toggle">
            <button 
              className={`toggle-btn ${activeTab === 'banks' ? 'active' : ''}`}
              onClick={() => setActiveTab('banks')}
            >
              Banks
            </button>
            <button 
              className={`toggle-btn ${activeTab === 'mdas' ? 'active' : ''}`}
              onClick={() => setActiveTab('mdas')}
            >
              MDAs
            </button>
          </div>
        </div>
      </div>
      
      <div className="tab-header">
        <div className="tab-icon">
          {activeTab === 'banks' ? 
            <FaUniversity className="tab-icon-svg" /> : 
            <FaBuilding className="tab-icon-svg" />
          }
        </div>
        <h3 className="tab-title">
          {activeTab === 'banks' ? 'Top 5 Banks' : 'Top 5 MDAs'}
        </h3>
      </div>
      
      {isLoading ? (
        <div className="skeleton-loader" style={{ width: '100%', height: '250px' }}></div>
      ) : (
        <div className="contributors-list">
          {getActiveData().map((item, index) => (
            <div key={index} className="contributor-item">
              <div className="contributor-rank">{index + 1}</div>
              <div className="contributor-details">
                <div className="contributor-name">{item.name}</div>
                <div className="contributor-bar-container">
                  <div 
                    className="contributor-bar"
                    style={{ 
                      width: `${item.percentage}%`,
                      backgroundColor: getContributorColor(index)
                    }}
                  ></div>
                </div>
              </div>
              <div className="contributor-stats">
                <div className="contributor-amount">{formatCurrency(item.amount)}</div>
                <div className="contributor-percentage">{item.percentage}%</div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="card-footer">
        <a href={`/dashboard/contributors/${activeTab}`} className="card-link">
          View All {activeTab === 'banks' ? 'Banks' : 'MDAs'}
        </a>
      </div>
    </Card>
  );
};

// Helper function to get contributor colors
const getContributorColor = (index) => {
  const colors = [
    '#4285F4', '#34A853', '#FBBC05', '#EA4335', '#8E24AA'
  ];
  return colors[index % colors.length];
};

export default TopContributors; 