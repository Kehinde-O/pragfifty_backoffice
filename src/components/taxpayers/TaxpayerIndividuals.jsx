import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TaxpayerIndividuals = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the main Individuals component
    navigate('/taxpayers/individuals');
  }, [navigate]);

  return (
    <div className="redirect-page">
      <p>Redirecting to Individual Taxpayers...</p>
    </div>
  );
};

export default TaxpayerIndividuals; 