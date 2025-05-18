import React, { useState, useEffect } from 'react';
import { FaChartBar, FaArrowRight } from 'react-icons/fa';
import styles from './Dashboard.module.css';

const RevenueByHeads = ({ period }) => {
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
        }, 800);
      } catch (error) {
        console.error('Error fetching revenue data:', error);
        setIsLoading(false);
      }
    };
    
    fetchRevenueData();
  }, [viewMode, period]);
  
  // Format amount as currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Get total revenue
  const getTotalRevenue = () => {
    return revenueData.reduce((total, item) => total + item.amount, 0);
  };
  
  // Helper function to get bar colors
  const getBarColor = (index) => {
    const colors = [
      '#4285F4', '#34A853', '#FBBC05', '#EA4335', 
      '#8E24AA', '#0097A7', '#689F38', '#F57C00'
    ];
    return colors[index % colors.length];
  };
  
  // Returns gradient for hover effect
  const getBarGradient = (color) => {
    return `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`;
  };
  
  return (
    <>
      <div className={styles.sectionHeader}>
        <h3 className={styles.cardContentTitle}>
          <FaChartBar /> Revenue By {viewMode === 'state' ? 'State' : 'LGA'} Heads
        </h3>
        <div className={styles.tabButtons}>
          <button 
            className={`${styles.tabButton} ${viewMode === 'state' ? styles.tabButtonActive : ''}`}
            onClick={() => setViewMode('state')}
          >
            State
          </button>
          <button 
            className={`${styles.tabButton} ${viewMode === 'lga' ? styles.tabButtonActive : ''}`}
            onClick={() => setViewMode('lga')}
          >
            LGA
          </button>
        </div>
      </div>
      
      {isLoading ? (
        <div className={styles.loadingState}>
          <div className={styles.loadingIcon}>
            <FaChartBar />
          </div>
          <div>Loading revenue data...</div>
        </div>
      ) : (
        <>
          <div className={styles.revenueSummary}>
            <div className={styles.revenueTotalCard}>
              <div className={styles.revenueTotalLabel}>Total Revenue</div>
              <div className={styles.revenueTotalValue}>
                {formatCurrency(getTotalRevenue())}
              </div>
            </div>
          </div>
          
          <div className={styles.revenueChartContainer}>
            {revenueData.map((item, index) => (
              <div key={index} className={styles.revenueBarRow}>
                <div className={styles.revenueRowHeader}>
                  <div className={styles.revenueRowName}>
                    <div 
                      className={styles.revenueColorIndicator} 
                      style={{ backgroundColor: getBarColor(index) }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <div className={styles.revenueRowValue}>
                    {formatCurrency(item.amount)}
                  </div>
                </div>
                
                <div className={styles.revenueBarWrapper}>
                  <div 
                    className={styles.revenueBar}
                    style={{ 
                      width: `${item.percentage}%`,
                      background: getBarGradient(getBarColor(index))
                    }}
                    title={`${item.percentage}% - ${formatCurrency(item.amount)}`}
                  >
                    {item.percentage >= 7 && (
                      <span className={styles.revenueBarLabel}>{item.percentage}%</span>
                    )}
                  </div>
                  {item.percentage < 7 && (
                    <span className={styles.revenueBarOutsideLabel}>{item.percentage}%</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
      
      <div className={styles.viewAllLink}>
        <a href={`/dashboard/revenue-heads/${viewMode}`}>
          View Revenue Head Details <FaArrowRight />
        </a>
      </div>
    </>
  );
};

export default RevenueByHeads; 