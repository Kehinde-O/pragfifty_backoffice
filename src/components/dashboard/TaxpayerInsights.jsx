import React, { useState, useEffect } from 'react';
import { Card } from '../common/ui';
import { FaUserPlus, FaIdCard } from 'react-icons/fa';

const TaxpayerInsights = () => {
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
        }, 1000);
      } catch (error) {
        console.error('Error fetching taxpayer insights:', error);
        setIsLoading(false);
      }
    };
    
    fetchInsights();
  }, []);
  
  // Format large numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-NG').format(num);
  };
  
  // Calculate the percentage width for LGA bar
  const calculateBarWidth = (count) => {
    const maxCount = Math.max(...insightsData.topLGAs.map(lga => lga.count));
    return (count / maxCount) * 100;
  };
  
  return (
    <Card>
      <div className="section-header">
        <h2 className="section-title">Taxpayer Insights</h2>
        <div className="section-actions">
          <a href="/dashboard/taxpayers" className="card-link">
            View Details
          </a>
        </div>
      </div>
      
      <div className="taxpayer-stats">
        <div className="stats-row">
          <div className="stat-item">
            <h4 className="stat-label">New Registrations</h4>
            <div className="stat-value">
              {isLoading ? (
                <div className="skeleton-loader" style={{ width: '60px', height: '24px' }}></div>
              ) : (
                formatNumber(insightsData.registrationsThisMonth)
              )}
            </div>
            <p className="stat-subtext">This Month</p>
          </div>
          
          <div className="stat-item">
            <h4 className="stat-label">Individual Taxpayers</h4>
            <div className="stat-value">
              {isLoading ? (
                <div className="skeleton-loader" style={{ width: '60px', height: '24px' }}></div>
              ) : (
                formatNumber(insightsData.totalIndividuals)
              )}
            </div>
            <p className="stat-subtext">Total Registered</p>
          </div>
          
          <div className="stat-item">
            <h4 className="stat-label">Business Taxpayers</h4>
            <div className="stat-value">
              {isLoading ? (
                <div className="skeleton-loader" style={{ width: '60px', height: '24px' }}></div>
              ) : (
                formatNumber(insightsData.totalBusinesses)
              )}
            </div>
            <p className="stat-subtext">Total Registered</p>
          </div>
          
          <div className="stat-item">
            <h4 className="stat-label">Active Taxpayers</h4>
            <div className="stat-value">
              {isLoading ? (
                <div className="skeleton-loader" style={{ width: '60px', height: '24px' }}></div>
              ) : (
                `${insightsData.activeRatio}%`
              )}
            </div>
            <p className="stat-subtext">Activity Ratio</p>
          </div>
        </div>
      </div>
      
      <div className="lga-distribution">
        <h4 className="subsection-title">
          <FaUserPlus style={{ marginRight: '0.5rem' }} />
          Top Niger State LGAs by Taxpayer Count
        </h4>
        {isLoading ? (
          <div className="skeleton-loader" style={{ width: '100%', height: '150px' }}></div>
        ) : (
          <div className="lga-bars">
            {insightsData.topLGAs.map((lga, index) => (
              <div key={index} className="lga-bar-item">
                <div className="lga-name">{lga.name}</div>
                <div className="lga-bar-container">
                  <div 
                    className="lga-bar" 
                    style={{ 
                      width: `${calculateBarWidth(lga.count)}%`,
                      backgroundColor: getBarColor(index)
                    }}
                  ></div>
                </div>
                <div className="lga-count">{formatNumber(lga.count)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="tax-clearance-summary">
        <h4 className="subsection-title">
          <FaIdCard style={{ marginRight: '0.5rem' }} />
          Tax Clearance Certificates
        </h4>
        <div className="tcc-count">
          {isLoading ? (
            <div className="skeleton-loader" style={{ width: '80px', height: '32px' }}></div>
          ) : (
            <>
              <span className="highlight-count">{formatNumber(insightsData.taxClearances)}</span>
              <span className="count-label">Issued this month</span>
            </>
          )}
        </div>
      </div>
    </Card>
  );
};

// Helper function to get bar colors
const getBarColor = (index) => {
  const colors = [
    '#4285F4', '#34A853', '#FBBC05', '#EA4335', '#8E24AA'
  ];
  return colors[index % colors.length];
};

export default TaxpayerInsights; 