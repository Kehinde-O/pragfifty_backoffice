import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper, Button } from '@mui/material';

function ConsolidatedDemandNotice() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to the main implementation after a short delay
    const timer = setTimeout(() => {
      navigate('/dashboard/consolidated-demand-notice');
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          Consolidated Demand Notice
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and generate consolidated demand notices for entities
        </Typography>
      </Box>
      
      <Paper 
        elevation={2} 
        sx={{ 
          p: 4, 
          textAlign: 'center', 
          borderRadius: 2,
          backgroundColor: '#f9fafb'
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Redirecting...
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          You are being redirected to the Consolidated Demand Notice page.
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => navigate('/dashboard/consolidated-demand-notice')}
        >
          Go Now
        </Button>
      </Paper>
    </Box>
  );
}

export default ConsolidatedDemandNotice; 