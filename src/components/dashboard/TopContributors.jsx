import React, { useState, useEffect } from 'react';
import { FaBuilding, FaUniversity, FaChartPie } from 'react-icons/fa';
import styles from './Dashboard.module.css';

const TopContributors = ({ period }) => {
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
        }, 800);
      } catch (error) {
        console.error('Error fetching contributors data:', error);
        setIsLoading(false);
      }
    };
    
    fetchContributorsData();
  }, [period]);
  
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
  
  // Helper function to get contributor colors
  const getContributorColor = (index) => {
    const colors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335', '#8E24AA'];
    return colors[index % colors.length];
  };
  
  return (
    <>
      <div className={styles.sectionHeader}>
        <h3 className={styles.cardContentTitle}>
          <FaChartPie /> Top {activeTab === 'banks' ? 'Banks' : 'MDAs'} by Revenue
        </h3>
        <div className={styles.tabButtons}>
          <button 
            className={`${styles.tabButton} ${activeTab === 'banks' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('banks')}
          >
            Banks
          </button>
          <button 
            className={`${styles.tabButton} ${activeTab === 'mdas' ? styles.tabButtonActive : ''}`}
            onClick={() => setActiveTab('mdas')}
          >
            MDAs
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className={styles.loadingState}>
          <div className={styles.loadingIcon}>
            {activeTab === 'banks' ? <FaUniversity /> : <FaBuilding />}
          </div>
          <div>Loading...</div>
        </div>
      ) : (
        <div className={styles.contributorsRanking}>
          {getActiveData().map((item, index) => (
            <div key={index} className={styles.rankItem}>
              <div className={styles.rankPosition} style={{ backgroundColor: getContributorColor(index) }}>
                {index + 1}
              </div>
              <div className={styles.rankInfo}>
                <div className={styles.rankName}>{item.name}</div>
                <div className={styles.rankAmount}>{formatCurrency(item.amount)}</div>
              </div>
              <div className={styles.rankPercentage}>{item.percentage}%</div>
              <div className={styles.rankBarContainer}>
                <div 
                  className={styles.rankBar}
                  style={{ 
                    width: `${item.percentage}%`,
                    backgroundColor: getContributorColor(index)
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && (
        <div className={styles.viewAllLink}>
          <a href={`/reports/contributors/${activeTab}`}>View All {activeTab === 'banks' ? 'Banks' : 'MDAs'} →</a>
        </div>
      )}
    </>
  );
};

export default TopContributors; 