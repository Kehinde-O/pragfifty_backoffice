import React, { useState, useEffect } from 'react';
import { StatsCard, Card } from '../common/ui';
import { FaMoneyBillWave, FaFileInvoiceDollar, FaHourglassHalf, FaUsers } from 'react-icons/fa';

const RevenueOverview = () => {
  const [revenueData, setRevenueData] = useState({
    totalRevenue: 0,
    revenueTarget: 0,
    paidAssessments: 0,
    pendingAssessments: 0,
    totalTaxpayers: 0
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [year, setYear] = useState('2023');
  
  useEffect(() => {
    // Simulating API call to fetch dashboard data
    // In production, this would be replaced with an actual API call
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Mocked data - replace with actual API call
        // const response = await fetch('/api/dashboard/revenue-overview');
        // const data = await response.json();
        
        // Simulated data - Niger State IRS specific
        const mockData = {
          totalRevenue: 256789451,
          revenueTarget: 500000000,
          paidAssessments: 7453,
          pendingAssessments: 2198,
          totalTaxpayers: 35421
        };
        
        // Add a slight delay to simulate network request
        setTimeout(() => {
          setRevenueData(mockData);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [year]); // Reload when year changes
  
  // Calculate the percentage of target achieved
  const targetPercentage = revenueData.revenueTarget > 0 
    ? Math.round((revenueData.totalRevenue / revenueData.revenueTarget) * 100)
    : 0;
    
  // Format number to Naira currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format large numbers with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-NG').format(num);
  };
  
  return (
    <div className="stats-container">
      <StatsCard
        title="Total Revenue Collected"
        value={formatCurrency(revenueData.totalRevenue)}
        change={targetPercentage}
        changeLabel={`of ${formatCurrency(revenueData.revenueTarget)} target`}
        icon={<FaMoneyBillWave />}
        trend="up"
        color="primary"
        isLoading={isLoading}
        animationStyle="fade"
        footer={
          <div className="revenue-progress">
            <div className="progress-bar-container">
              <div 
                className="progress-bar" 
                style={{width: `${targetPercentage}%`}}
              ></div>
            </div>
            <div className="progress-label">{targetPercentage}% of annual target</div>
          </div>
        }
      />
      
      <StatsCard
        title="Paid Assessments"
        value={formatNumber(revenueData.paidAssessments)}
        change={12.5}
        changeLabel="vs last month"
        icon={<FaFileInvoiceDollar />}
        trend="up"
        color="success"
        isLoading={isLoading}
        animationStyle="fade"
      />
      
      <StatsCard
        title="Pending Assessments"
        value={formatNumber(revenueData.pendingAssessments)}
        change={5.2}
        changeLabel="vs last month"
        icon={<FaHourglassHalf />}
        trend="down"
        color="warning"
        isLoading={isLoading}
        animationStyle="fade"
      />
      
      <StatsCard
        title="Registered Taxpayers"
        value={formatNumber(revenueData.totalTaxpayers)}
        change={8.7}
        changeLabel="vs last month"
        icon={<FaUsers />}
        trend="up"
        color="info"
        isLoading={isLoading}
        animationStyle="fade"
      />
    </div>
  );
};

export default RevenueOverview; 