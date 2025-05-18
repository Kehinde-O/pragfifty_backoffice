import React, { useState, useEffect } from 'react';
import { FaUserPlus, FaIdCard, FaUser, FaBuilding, FaUsers, FaArrowRight, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './Dashboard.module.css';

const TaxpayerInsights = ({ period }) => {
  const [insightsData, setInsightsData] = useState({
    registrationsThisMonth: 0,
    totalIndividuals: 0,
    totalBusinesses: 0,
    activeRatio: 0,
    topLGAs: [],
    taxClearances: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API call to fetch taxpayer insights
    const fetchInsights = async () => {
      setIsLoading(true);
      try {
        // Simulated Niger State specific data
        const mockData = {
          registrationsThisMonth: 342,
          totalIndividuals: 28645,
          totalBusinesses: 6776,
          activeRatio: 72,
          topLGAs: [
            { name: 'Chanchaga', count: 4250 },
            { name: 'Suleja', count: 3850 },
            { name: 'Bosso', count: 2780 },
            { name: 'Bida', count: 2450 },
            { name: 'Kontagora', count: 1980 }
          ],
          taxClearances: 156
        };
        
        // Add a slight delay to simulate network request
        setTimeout(() => {
          setInsightsData(mockData);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching taxpayer insights:', error);
        setIsLoading(false);
      }
    };
    
    fetchInsights();
  }, [period]);
  
  // Format large numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-NG').format(num);
  };
  
  // Calculate the percentage width for LGA bar
  const calculateBarWidth = (count) => {
    const maxCount = Math.max(...insightsData.topLGAs.map(lga => lga.count));
    return (count / maxCount) * 100;
  };
  
  // Helper function to get bar colors
  const getBarColor = (index) => {
    const colors = [
      '#4285F4', '#34A853', '#FBBC05', '#EA4335', '#8E24AA'
    ];
    return colors[index % colors.length];
  };
  
  const insightCards = [
    {
      id: 'new-reg',
      title: 'New Registrations',
      value: insightsData.registrationsThisMonth,
      subtitle: 'This Month',
      icon: <FaUserPlus />,
      color: '#4285F4'
    },
    {
      id: 'individual',
      title: 'Individual Taxpayers',
      value: insightsData.totalIndividuals,
      subtitle: 'Total Registered',
      icon: <FaUser />,
      color: '#34A853'
    },
    {
      id: 'business',
      title: 'Business Taxpayers',
      value: insightsData.totalBusinesses,
      subtitle: 'Total Registered',
      icon: <FaBuilding />,
      color: '#FBBC05'
    },
    {
      id: 'active',
      title: 'Active Taxpayers',
      value: `${insightsData.activeRatio}%`,
      subtitle: 'Activity Ratio',
      icon: <FaUsers />,
      color: '#EA4335'
    }
  ];
  
  return (
    <>
      <div className={styles.sectionHeader}>
        <h3 className={styles.cardContentTitle}>
          <FaUsers /> Taxpayer Insights
        </h3>
      </div>
      
      {isLoading ? (
        <div className={styles.loadingState}>
          <div className={styles.loadingIcon}>
            <FaUsers />
          </div>
          <div>Loading taxpayer data...</div>
        </div>
      ) : (
        <>
          <div className={styles.taxpayerStatsGrid}>
            {insightCards.map(card => (
              <div key={card.id} className={styles.taxpayerStatCard} style={{ borderTop: `3px solid ${card.color}` }}>
                <div className={styles.taxpayerStatIcon} style={{ color: card.color }}>
                  {card.icon}
                </div>
                <div className={styles.taxpayerStatContent}>
                  <div className={styles.taxpayerStatValue}>{formatNumber(card.value)}</div>
                  <div className={styles.taxpayerStatTitle}>{card.title}</div>
                  <div className={styles.taxpayerStatSubtitle}>{card.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.insightSection}>
            <div className={styles.insightSectionHeader}>
              <FaMapMarkerAlt /> <span>Top LGAs by Taxpayer Count</span>
            </div>
            <div className={styles.lgaBarChart}>
              {insightsData.topLGAs.map((lga, index) => (
                <div key={index} className={styles.lgaBarItem}>
                  <div className={styles.lgaBarName}>
                    <span>{lga.name}</span>
                  </div>
                  <div className={styles.lgaBarContainer}>
                    <div 
                      className={styles.lgaBar} 
                      style={{ 
                        width: `${calculateBarWidth(lga.count)}%`,
                        backgroundColor: getBarColor(index)
                      }}
                    />
                  </div>
                  <div className={styles.lgaBarValue}>{formatNumber(lga.count)}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className={styles.insightSection}>
            <div className={styles.insightSectionHeader}>
              <FaIdCard /> <span>Tax Clearance Certificates</span>
            </div>
            <div className={styles.tccSummary}>
              <div className={styles.tccValue}>{formatNumber(insightsData.taxClearances)}</div>
              <div className={styles.tccLabel}>Issued this month</div>
            </div>
          </div>
        </>
      )}
      
      <div className={styles.viewAllLink}>
        <a href="/dashboard/taxpayer-insights">
          View All Taxpayer Data <FaArrowRight />
        </a>
      </div>
    </>
  );
};

export default TaxpayerInsights; 