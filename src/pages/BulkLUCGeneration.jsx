import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListSubheader,
  Button,
  Grid,
  CircularProgress,
  Alert,
  AlertTitle,
  Divider,
  Chip,
  useTheme,
  Tab,
  Tabs,
  TextField,
  InputAdornment,
  Tooltip,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  Backdrop,
  Card,
  CardContent,
  CardActions,
  TablePagination
} from '@mui/material';
import {
  Search as SearchIcon,
  Print as PrintIcon,
  Info as InfoIcon,
  FilterAlt as FilterIcon,
  Download as DownloadIcon,
  History as HistoryIcon,
  Help as HelpIcon,
  CalendarMonth as CalendarIcon,
  Home as HomeIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  LocalPrintshop as LocalPrintshopIcon
} from '@mui/icons-material';
import Swal from 'sweetalert2';
import './BulkLUCGeneration.css';

const BulkLUCGeneration = () => {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState('search');
  
  // State for form inputs
  const [formData, setFormData] = useState({
    searchType: "property", // property or taxpayer
    propertyId: "",
    taxpayerId: "",
    address: "",
    lga: ["all"],
    classification: ["all"],
    year: ["all"],
    minValue: "",
    maxValue: ""
  });
  
  // State for single property search result
  const [singlePropertyResult, setSinglePropertyResult] = useState(null);
  
  // State for bill generation dialog
  const [billDialog, setBillDialog] = useState({
    open: false,
    property: null,
    selectedYears: [],
    amounts: {}
  });
  
  // State for options
  const [options, setOptions] = useState({
    lgas: [],
    classifications: [],
    years: []
  });
  
  // State for processing status
  const [processing, setProcessing] = useState(false);
  
  // State for search results
  const [searchResults, setSearchResults] = useState({
    properties: [],
    count: 0,
    isMultiple: false
  });
  
  // State for generation history
  const [generationHistory, setGenerationHistory] = useState([]);
  
  // State for pagination in history tab
  const [historyPagination, setHistoryPagination] = useState({
    page: 0,
    rowsPerPage: 10
  });
  
  // State for bill edit dialog
  const [editBillDialog, setEditBillDialog] = useState({
    open: false,
    bill: null,
    amount: ""
  });
  
  // Load options data
  useEffect(() => {
    // Simulate API call to get LGAs
    const mockLGAs = [
      'Ikeja', 'Alimosho', 'Eti-Osa', 'Surulere', 'Ajeromi-Ifelodun',
      'Kosofe', 'Mushin', 'Oshodi-Isolo', 'Lagos Island', 'Yaba'
    ];
    
    // Simulate API call to get classifications
    const mockClassifications = [
      { 
        areaClassification: 'Residential',
        landUse: ['Single Family Home', 'Apartment', 'Condominium']
      },
      { 
        areaClassification: 'Commercial',
        landUse: ['Office', 'Retail', 'Mixed Use']
      },
      { 
        areaClassification: 'Industrial',
        landUse: ['Manufacturing', 'Warehouse', 'Processing']
      }
    ];
    
    // Generate years (current year and previous years)
    const currentYear = new Date().getFullYear();
    const mockYears = Array.from({ length: 5 }, (_, i) => String(currentYear - i));
    
    setOptions({
      lgas: mockLGAs,
      classifications: mockClassifications,
      years: mockYears
    });
    
    // Load history data
    loadGenerationHistory();
  }, []);
  
  // Load generation history - modified to show individual bills instead of batches
  const loadGenerationHistory = () => {
    // Simulate API call to get generation history
    setProcessing(true);
    
    // Mock data for generation history - now individual bills instead of batches
    setTimeout(() => {
      const mockHistory = Array.from({ length: 25 }, (_, i) => ({
        id: `bill-${1000 + i}`,
        propertyId: `PROP${10000 + i}`,
        taxpayerId: `TXP${20000 + i}`,
        taxpayerName: `${['John Doe', 'Jane Smith', 'Robert Johnson', 'Alice Brown', 'David Wilson'][i % 5]} ${i}`,
        propertyAddress: `${i + 1} ${['Main Street', 'Oak Avenue', 'Park Road', 'Beach Boulevard', 'Hill Drive'][i % 5]}, ${['Ikeja', 'Alimosho', 'Eti-Osa', 'Surulere', 'Yaba'][i % 5]}`,
        year: `${2023 - (i % 3)}`,
        amount: (50000 + (i * 1000)).toLocaleString(),
        generatedDate: new Date(Date.now() - (i * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        status: i % 5 === 0 ? 'paid' : 'unpaid',
        classification: ['Residential', 'Commercial', 'Industrial'][i % 3],
        lga: ['Ikeja', 'Alimosho', 'Eti-Osa', 'Surulere', 'Yaba'][i % 5],
        generatedBy: ['Admin', 'Supervisor', 'Manager'][i % 3]
      }));
      
      setGenerationHistory(mockHistory);
      setProcessing(false);
    }, 1000);
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Array.isArray(value) ? value : value
    }));
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    setSearchResults({ properties: [], count: 0, isMultiple: false });
    setSinglePropertyResult(null);
    
    if (newValue === 'history') {
      loadGenerationHistory();
    }
  };
  
  // Handle search for properties with updated function to return multiple results
  const handlePropertySearch = () => {
    if (!formData.propertyId && !formData.taxpayerId && !formData.address) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Search Information',
        text: 'Please enter a property ID, taxpayer ID, or address to search'
      });
      return;
    }
    
    setProcessing(true);
    setSinglePropertyResult(null);
    setSearchResults({ properties: [], count: 0, isMultiple: false });
    
    // Simulate API call to search for properties
    setTimeout(() => {
      // For demo purposes, return multiple results if address is provided
      if (formData.address) {
        // Mock multiple property results
        const mockProperties = Array.from({ length: 5 }, (_, i) => ({
          id: `PROP${10000 + i}`,
          taxpayerId: `TXP${20000 + i}`,
          taxpayerName: `${['John Doe', 'Jane Smith', 'Robert Johnson', 'Alice Brown', 'David Wilson'][i % 5]}`,
          address: `${i + 1} ${formData.address}, ${['Ikeja', 'Alimosho', 'Eti-Osa', 'Surulere', 'Yaba'][i % 5]}`,
          lga: ['Ikeja', 'Alimosho', 'Eti-Osa', 'Surulere', 'Yaba'][i % 5],
          classification: ['Residential', 'Commercial', 'Industrial', 'Commercial', 'Residential'][i % 5],
          subClassification: ['Single Family Home', 'Office', 'Manufacturing', 'Retail', 'Apartment'][i % 5],
          assessedValue: ((10000000 + i * 2000000)).toLocaleString(),
          lastAssessmentDate: `2023-0${i+1}-15`,
          status: i % 4 === 0 ? 'inactive' : 'active',
          yearsPaid: i % 2 === 0 ? ["2021", "2022"] : ["2021"],
          outstandingYears: i % 2 === 0 ? ["2023", "2024"] : ["2022", "2023", "2024"],
          propertyType: i % 2 === 0 ? 'individual' : 'business'
        }));
        
        setSearchResults({
          properties: mockProperties,
          count: mockProperties.length,
          isMultiple: true
        });
      } else if (formData.searchType === "property" && formData.propertyId) {
        // Single property result for property ID search
        const mockProperty = {
          id: formData.propertyId,
          taxpayerId: "TXP20001",
          taxpayerName: "John Doe",
          address: "123 Example Street, Ikeja",
          lga: "Ikeja",
          classification: "Residential",
          subClassification: "Single Family Home",
          assessedValue: "15,000,000",
          lastAssessmentDate: "2023-01-15",
          status: "active",
          yearsPaid: ["2021", "2022"],
          outstandingYears: ["2023", "2024"],
          landArea: "500 sqm",
          buildingArea: "300 sqm",
          propertyImage: "https://via.placeholder.com/150",
          propertyType: 'individual'
        };
        
        setSinglePropertyResult(mockProperty);
      } else if (formData.searchType === "taxpayer" && formData.taxpayerId) {
        // Multiple property results for taxpayer ID search
        const mockProperties = Array.from({ length: 3 }, (_, i) => ({
          id: `PROP${20000 + i}`,
          taxpayerId: formData.taxpayerId,
          taxpayerName: "Jane Smith",
          address: `${i + 1} Business Avenue, ${['Ikeja', 'Alimosho', 'Eti-Osa'][i % 3]}`,
          lga: ['Ikeja', 'Alimosho', 'Eti-Osa'][i % 3],
          classification: ['Commercial', 'Commercial', 'Industrial'][i % 3],
          subClassification: ['Office', 'Retail', 'Warehouse'][i % 3],
          assessedValue: ((20000000 + i * 5000000)).toLocaleString(),
          lastAssessmentDate: `2023-0${i+2}-20`,
          status: 'active',
          yearsPaid: ["2021", "2022"],
          outstandingYears: ["2023", "2024"],
          propertyType: 'business'
        }));
        
        setSearchResults({
          properties: mockProperties,
          count: mockProperties.length,
          isMultiple: true
        });
      }
      
      setProcessing(false);
    }, 1500);
  };
  
  // Handle bulk search form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Clear any previous search results
    setSearchResults({ properties: [], count: 0, isMultiple: false });
    
    // Simulate API call to get bill count
    setTimeout(() => {
      setProcessing(false);
      
      // Sample search results
      const results = {
        count: 150,
        totalValue: '15,750,000',
        breakdown: {
          residential: 95,
          commercial: 35,
          industrial: 20
        }
      };
      
      setSearchResults(results);
      
      Swal.fire({
        icon: 'success',
        title: 'LUC Bills Found',
        text: `${results.count} bills found matching your criteria with total value of ₦${results.totalValue}.`,
        confirmButtonText: 'Generate & Print Bills',
        cancelButtonText: 'Review Details',
        showCancelButton: true,
        confirmButtonColor: theme.palette.primary.main,
        cancelButtonColor: theme.palette.grey[400]
      }).then((result) => {
        if (result.isConfirmed) {
          // Simulate bill printing
          handlePrintBills();
        }
      });
    }, 1500);
  };
  
  // Handle bill printing
  const handlePrintBills = () => {
    Swal.fire({
      title: 'Processing LUC Bills',
      text: 'Please wait while your Land Use Charge bills are being processed for generation.',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    // Simulate processing time
    setTimeout(() => {
      Swal.close();
      
      // Generate new bills and add to history
      const newBills = Array.from({ length: searchResults.count }, (_, i) => ({
        id: `bill-${Math.floor(Math.random() * 10000)}`,
        propertyId: `PROP${10000 + i}`,
        taxpayerId: `TXP${20000 + i}`,
        taxpayerName: `${['John Doe', 'Jane Smith', 'Robert Johnson', 'Alice Brown', 'David Wilson'][i % 5]} ${i}`,
        propertyAddress: `${i + 1} ${['Main Street', 'Oak Avenue', 'Park Road', 'Beach Boulevard', 'Hill Drive'][i % 5]}, ${['Ikeja', 'Alimosho', 'Eti-Osa', 'Surulere', 'Yaba'][i % 5]}`,
        year: `${new Date().getFullYear() - (i % 3)}`,
        amount: (50000 + (i * 1000)).toLocaleString(),
        generatedDate: new Date().toISOString().split('T')[0],
        status: 'unpaid',
        classification: ['Residential', 'Commercial', 'Industrial'][i % 3],
        lga: formData.lga.includes('all') ? ['Ikeja', 'Alimosho', 'Eti-Osa', 'Surulere', 'Yaba'][i % 5] : formData.lga[i % formData.lga.length],
        generatedBy: 'Admin'
      }));
      
      setGenerationHistory(prev => [...newBills, ...prev]);
      
      Swal.fire({
        icon: 'success',
        title: 'Bills Generated Successfully',
        text: `${searchResults.count} LUC bills have been generated successfully.`,
        footer: '<a href="#">Download generation report</a>',
        confirmButtonText: 'Print Bills',
        showCancelButton: true,
        cancelButtonText: 'Close'
      }).then((result) => {
        if (result.isConfirmed) {
          // In a real application, this would open a new window with the bills
          window.open(`/api/printlucbill?request=lucBillPrint&propertyLga=${formData.lga.join(',')}&selectedYear=${formData.year.join(',')}&selectedClass=${formData.classification.join(',')}`, '_blank');
        }
      });
    }, 2000);
  };
  
  // Open bill generation dialog
  const handleOpenBillDialog = (property) => {
    setBillDialog({
      open: true,
      property,
      selectedYears: [],
      amounts: {}
    });
  };
  
  // Close bill generation dialog
  const handleCloseBillDialog = () => {
    setBillDialog({
      open: false,
      property: null,
      selectedYears: [],
      amounts: {}
    });
  };
  
  // Handle year selection in bill dialog
  const handleYearSelection = (year) => {
    const currentYears = [...billDialog.selectedYears];
    const yearIndex = currentYears.indexOf(year);
    
    if (yearIndex >= 0) {
      // Remove the year from selection
      currentYears.splice(yearIndex, 1);
      
      // Also remove amount for this year
      const newAmounts = {...billDialog.amounts};
      delete newAmounts[year];
      
      setBillDialog(prev => ({
        ...prev,
        selectedYears: currentYears,
        amounts: newAmounts
      }));
    } else {
      // Check if the year is already in the array to prevent duplicates
      if (!currentYears.includes(year)) {
        // Calculate a default amount based on property value
        let defaultAmount = '50000';
        if (billDialog.property && billDialog.property.assessedValue) {
          // Extract numeric value from formatted string and calculate 0.5%
          const numericValue = parseFloat(billDialog.property.assessedValue.replace(/,/g, ''));
          if (!isNaN(numericValue)) {
            defaultAmount = Math.max(Math.round(numericValue * 0.005), 25000).toString();
          }
        }
        
        // Add the year to selection with the default amount
        setBillDialog(prev => ({
          ...prev,
          selectedYears: [...prev.selectedYears, year],
          amounts: {
            ...prev.amounts,
            [year]: defaultAmount
          }
        }));
      }
    }
  };
  
  // Handle amount change for a year
  const handleAmountChange = (year, amount) => {
    setBillDialog(prev => ({
      ...prev,
      amounts: {
        ...prev.amounts,
        [year]: amount
      }
    }));
  };
  
  // Handle single bill generation
  const handleGenerateSingleBill = () => {
    if (billDialog.selectedYears.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No Years Selected',
        text: 'Please select at least one year to generate a bill for.'
      });
      return;
    }
    
    Swal.fire({
      title: 'Generating Bills',
      text: 'Please wait while your Land Use Charge bills are being generated.',
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    // Simulate processing time
    setTimeout(() => {
      Swal.close();
      
      // Generate new bills and add to history
      const newBills = billDialog.selectedYears.map(year => ({
        id: `bill-${Math.floor(Math.random() * 10000)}`,
        propertyId: billDialog.property.id,
        taxpayerId: billDialog.property.taxpayerId,
        taxpayerName: billDialog.property.taxpayerName,
        propertyAddress: billDialog.property.address,
        year,
        amount: billDialog.amounts[year] ? parseInt(billDialog.amounts[year]).toLocaleString() : "50,000",
        generatedDate: new Date().toISOString().split('T')[0],
        status: 'unpaid',
        classification: billDialog.property.classification,
        lga: billDialog.property.lga,
        generatedBy: 'Admin'
      }));
      
      setGenerationHistory(prev => [...newBills, ...prev]);
      
      handleCloseBillDialog();
      
      Swal.fire({
        icon: 'success',
        title: 'Bills Generated Successfully',
        text: `${billDialog.selectedYears.length} LUC bills have been generated successfully for ${billDialog.property.taxpayerName}.`,
        confirmButtonText: 'View Bills',
        showCancelButton: true,
        cancelButtonText: 'Stay Here'
      }).then((result) => {
        if (result.isConfirmed) {
          setActiveTab('history');
        }
      });
    }, 1500);
  };
  
  // Handle pagination change
  const handleChangePage = (event, newPage) => {
    setHistoryPagination(prev => ({
      ...prev,
      page: newPage
    }));
  };
  
  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setHistoryPagination({
      page: 0,
      rowsPerPage: parseInt(event.target.value, 10)
    });
  };
  
  // Open edit bill dialog
  const handleOpenEditDialog = (bill) => {
    if (bill.status === 'paid') {
      Swal.fire({
        icon: 'error',
        title: 'Cannot Edit Paid Bill',
        text: 'This bill has already been paid and cannot be modified.'
      });
      return;
    }
    
    setEditBillDialog({
      open: true,
      bill,
      amount: bill.amount.replace(/,/g, '')
    });
  };
  
  // Close edit bill dialog
  const handleCloseEditDialog = () => {
    setEditBillDialog({
      open: false,
      bill: null,
      amount: ""
    });
  };
  
  // Handle edit bill amount
  const handleEditBillAmount = () => {
    const updatedBill = {
      ...editBillDialog.bill,
      amount: parseInt(editBillDialog.amount).toLocaleString()
    };
    
    const updatedHistory = generationHistory.map(bill => 
      bill.id === updatedBill.id ? updatedBill : bill
    );
    
    setGenerationHistory(updatedHistory);
    handleCloseEditDialog();
    
    Swal.fire({
      icon: 'success',
      title: 'Bill Updated',
      text: 'The bill amount has been updated successfully.'
    });
  };
  
  // Handle print single bill
  const handlePrintSingleBill = (bill) => {
    // In a real application, this would open a print dialog with the bill
    window.open(`/api/printlucbill?request=singleBill&billId=${bill.id}`, '_blank');
  };
  
  // Render selected items as chips
  const renderSelectedValue = (selected) => {
    if (!Array.isArray(selected)) return null;
    
    if (selected.includes('all')) {
      return <Chip label="All Selected" size="small" color="primary" variant="outlined" />;
    }
    
    if (selected.length === 0) {
      return <Typography variant="body2" color="text.secondary">None selected</Typography>;
    }
    
    return (
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {selected.slice(0, 2).map((value) => (
          <Chip key={value} label={value} size="small" color="primary" variant="outlined" />
        ))}
        {selected.length > 2 && (
          <Chip 
            label={`+${selected.length - 2} more`} 
            size="small" 
            color="default" 
            variant="outlined" 
          />
        )}
      </Box>
    );
  };
  
  // Calculate outstanding years for bill generation
  const getOutstandingYears = () => {
    if (!singlePropertyResult) return [];
    
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 4; // Go back 5 years max
    
    const allYears = [];
    for (let year = startYear; year <= currentYear; year++) {
      allYears.push(year.toString());
    }
    
    return allYears.filter(year => !singlePropertyResult.yearsPaid.includes(year));
  };
  
  return (
    <Box className="bulk-luc-container" sx={{ p: 3, bgcolor: '#f9fafb', minHeight: '100%' }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          Bulk LUC Generation
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Generate Land Use Charge bills in bulk based on property filters
        </Typography>
      </Box>
      
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden', mb: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            aria-label="LUC generation tabs"
            sx={{ 
              bgcolor: 'background.paper',
              '& .MuiTab-root': { fontWeight: 500, py: 2 }
            }}
          >
            <Tab label="Search Properties" value="search" icon={<SearchIcon fontSize="small" />} iconPosition="start" />
            <Tab label="Generation History" value="history" icon={<HistoryIcon fontSize="small" />} iconPosition="start" />
          </Tabs>
        </Box>
        
        {activeTab === 'search' ? (
          <Box sx={{ p: 3 }}>
            {/* Enhanced Property Search Section */}
            <Box sx={{ p: 3, bgcolor: 'background.paper', borderRadius: 2, mb: 3, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)' }}>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                <SearchIcon fontSize="small" color="primary" />
                Property Search
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel id="search-type-label">Search By</InputLabel>
                    <Select
                      labelId="search-type-label"
                      id="search-type"
                      name="searchType"
                      value={formData.searchType}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="property">Property ID</MenuItem>
                      <MenuItem value="taxpayer">Taxpayer ID</MenuItem>
                      <MenuItem value="address">Address</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                {formData.searchType === "property" ? (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Property ID"
                      name="propertyId"
                      value={formData.propertyId}
                      onChange={handleInputChange}
                      placeholder="Enter property ID (e.g., PROP10001)"
                      InputProps={{
                        startAdornment: <InputAdornment position="start"><HomeIcon fontSize="small" /></InputAdornment>,
                      }}
                    />
                  </Grid>
                ) : formData.searchType === "taxpayer" ? (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Taxpayer ID"
                      name="taxpayerId"
                      value={formData.taxpayerId}
                      onChange={handleInputChange}
                      placeholder="Enter taxpayer ID (e.g., TXP20001)"
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Property Address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter full or partial address"
                    />
                  </Grid>
                )}
                
                <Grid item xs={12} sm={3}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handlePropertySearch}
                    disabled={processing}
                    startIcon={processing ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                    sx={{ 
                      height: '56px',
                      boxShadow: 2,
                      borderRadius: '8px',
                      fontWeight: 500,
                      '&:hover': {
                        boxShadow: 3
                      }
                    }}
                    fullWidth
                  >
                    {processing ? 'Searching...' : 'Search Properties'}
                  </Button>
                </Grid>
              </Grid>
              
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <InfoIcon fontSize="small" color="info" />
                <Typography variant="caption" color="text.secondary">
                  Search by property ID for exact matches or address for broader results. Business properties can be found using taxpayer ID.
                </Typography>
              </Box>
            </Box>
            
            {/* Multiple search results table */}
            {searchResults.isMultiple && searchResults.properties.length > 0 && (
              <Paper 
                elevation={2}
                sx={{ 
                  mb: 4, 
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)'
                }}
              >
                <Box sx={{ 
                  p: 2, 
                  bgcolor: 'primary.main', 
                  color: 'primary.contrastText',
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between'
                }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <InfoIcon fontSize="small" />
                    Search Results ({searchResults.count} properties found)
                  </Typography>
                </Box>
                
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Property ID</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Classification</TableCell>
                        <TableCell>Property Type</TableCell>
                        <TableCell>Assessed Value</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {searchResults.properties.map((property) => (
                        <TableRow 
                          key={property.id}
                          sx={{ 
                            '&:hover': { bgcolor: 'action.hover' },
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                          }}
                          onClick={() => setSinglePropertyResult(property)}
                        >
                          <TableCell>{property.id}</TableCell>
                          <TableCell>
                            <Typography variant="body2">{property.address}</Typography>
                            <Typography variant="caption" color="text.secondary">Owner: {property.taxpayerName}</Typography>
                          </TableCell>
                          <TableCell>{property.classification}</TableCell>
                          <TableCell>
                            <Chip 
                              label={property.propertyType === 'individual' ? 'Individual' : 'Business'} 
                              size="small"
                              color={property.propertyType === 'individual' ? 'info' : 'secondary'}
                            />
                          </TableCell>
                          <TableCell>₦{property.assessedValue}</TableCell>
                          <TableCell>
                            <Chip 
                              label={property.status} 
                              color={property.status === 'active' ? 'success' : 'error'} 
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="center">
                            <Stack direction="row" spacing={1} justifyContent="center">
                              <Tooltip title="View Details">
                                <IconButton 
                                  size="small" 
                                  color="primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSinglePropertyResult(property);
                                  }}
                                >
                                  <InfoIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="Generate Bill">
                                <IconButton 
                                  size="small" 
                                  color="primary"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleOpenBillDialog(property);
                                  }}
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            )}
            
            {/* Single Property Result Display - Kept as is */}
            {singlePropertyResult && (
              <Paper 
                elevation={1}
                sx={{ 
                  p: 3, 
                  mb: 4, 
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'primary.light',
                  bgcolor: 'background.paper'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <InfoIcon fontSize="small" color="primary" />
                    Property Details
                  </Typography>
                  
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleOpenBillDialog(singlePropertyResult)}
                    startIcon={<AddIcon />}
                  >
                    Generate Bill
                  </Button>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box 
                      sx={{ 
                        bgcolor: 'background.default', 
                        p: 2, 
                        borderRadius: 2, 
                        height: '100%', 
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>Property Information</Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">Property ID</Typography>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>{singlePropertyResult.id}</Typography>
                        
                        <Typography variant="body2" color="text.secondary">Address</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{singlePropertyResult.address}</Typography>
                        
                        <Typography variant="body2" color="text.secondary">LGA</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{singlePropertyResult.lga}</Typography>
                        
                        <Typography variant="body2" color="text.secondary">Classification</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                          {singlePropertyResult.classification} - {singlePropertyResult.subClassification}
                        </Typography>
                        
                        <Typography variant="body2" color="text.secondary">Property Type</Typography>
                        <Chip 
                          label={singlePropertyResult.propertyType === 'individual' ? 'Individual' : 'Business'} 
                          size="small"
                          color={singlePropertyResult.propertyType === 'individual' ? 'info' : 'secondary'}
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box 
                      sx={{ 
                        bgcolor: 'background.default', 
                        p: 2, 
                        borderRadius: 2, 
                        height: '100%', 
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>Property Owner</Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">Taxpayer ID</Typography>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 500 }}>{singlePropertyResult.taxpayerId}</Typography>
                        
                        <Typography variant="body2" color="text.secondary">Taxpayer Name</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{singlePropertyResult.taxpayerName}</Typography>
                        
                        <Typography variant="body2" color="text.secondary">Property Status</Typography>
                        <Chip 
                          label={singlePropertyResult.status} 
                          color={singlePropertyResult.status === 'active' ? 'success' : 'warning'} 
                          size="small" 
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={4}>
                    <Box 
                      sx={{ 
                        bgcolor: 'background.default', 
                        p: 2, 
                        borderRadius: 2, 
                        height: '100%', 
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom>Assessed Value & LUC Status</Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="text.secondary">Assessed Value</Typography>
                        <Typography variant="body1" sx={{ mb: 1, fontWeight: 600 }}>₦{singlePropertyResult.assessedValue}</Typography>
                        
                        <Typography variant="body2" color="text.secondary">Last Assessment Date</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>{singlePropertyResult.lastAssessmentDate}</Typography>
                        
                        <Typography variant="body2" color="text.secondary">Payment Status</Typography>
                        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 0.5 }}>
                          {singlePropertyResult.yearsPaid.map(year => (
                            <Chip 
                              key={`paid-${year}`}
                              label={year} 
                              color="success" 
                              size="small" 
                              icon={<CheckCircleIcon fontSize="small" />}
                            />
                          ))}
                          {singlePropertyResult.outstandingYears.map(year => (
                            <Chip 
                              key={`outstanding-${year}`}
                              label={year} 
                              color="warning" 
                              size="small" 
                              icon={<InfoIcon fontSize="small" />}
                            />
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Box>
        ) : (
          <Box sx={{ p: 3 }}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 2, mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
              <HistoryIcon fontSize="small" color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                LUC Bill Generation History
              </Typography>
              
              <TextField
                placeholder="Search by property ID, taxpayer name..."
                variant="outlined"
                size="small"
                InputProps={{
                  startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>
                }}
                sx={{ ml: 'auto', width: 300 }}
              />
            </Box>
            
            {processing ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress />
              </Box>
            ) : generationHistory.length > 0 ? (
              <>
                <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2, mb: 2 }}>
                  <Table>
                    <TableHead sx={{ bgcolor: 'background.default' }}>
                      <TableRow>
                        <TableCell>Bill ID</TableCell>
                        <TableCell>Property</TableCell>
                        <TableCell>Taxpayer</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Generated Date</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {generationHistory
                        .slice(
                          historyPagination.page * historyPagination.rowsPerPage,
                          historyPagination.page * historyPagination.rowsPerPage + historyPagination.rowsPerPage
                        )
                        .map((bill) => (
                          <TableRow 
                            key={bill.id}
                            sx={{ 
                              '&:hover': { bgcolor: 'action.hover' },
                              ...(bill.status === 'paid' ? { bgcolor: 'success.lighter' } : {})
                            }}
                          >
                            <TableCell>{bill.id}</TableCell>
                            <TableCell>
                              <Tooltip title={bill.propertyAddress}>
                                <span>{bill.propertyId}</span>
                              </Tooltip>
                            </TableCell>
                            <TableCell>
                              <Tooltip title={`ID: ${bill.taxpayerId}`}>
                                <span>{bill.taxpayerName}</span>
                              </Tooltip>
                            </TableCell>
                            <TableCell>{bill.year}</TableCell>
                            <TableCell>₦{bill.amount}</TableCell>
                            <TableCell>{bill.generatedDate}</TableCell>
                            <TableCell>
                              <Chip 
                                label={bill.status} 
                                color={bill.status === 'paid' ? 'success' : 'warning'} 
                                size="small"
                                icon={bill.status === 'paid' ? <CheckCircleIcon fontSize="small" /> : <InfoIcon fontSize="small" />}
                              />
                            </TableCell>
                            <TableCell align="center">
                              <Stack direction="row" spacing={1} justifyContent="center">
                                <Tooltip title="Print bill">
                                  <IconButton 
                                    size="small" 
                                    color="primary"
                                    onClick={() => handlePrintSingleBill(bill)}
                                  >
                                    <LocalPrintshopIcon fontSize="small" />
                                  </IconButton>
                                </Tooltip>
                                
                                <Tooltip title={bill.status === 'paid' ? "Cannot edit paid bill" : "Edit bill amount"}>
                                  <span>
                                    <IconButton 
                                      size="small" 
                                      color="primary"
                                      onClick={() => handleOpenEditDialog(bill)}
                                      disabled={bill.status === 'paid'}
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </span>
                                </Tooltip>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
                <TablePagination
                  component="div"
                  count={generationHistory.length}
                  page={historyPagination.page}
                  onPageChange={handleChangePage}
                  rowsPerPage={historyPagination.rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 50]}
                  sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                />
              </>
            ) : (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  No generation history found
                </Typography>
              </Box>
            )}
            
            <Box sx={{ mt: 4 }}>
              <Alert 
                severity="info" 
                icon={<InfoIcon />}
                sx={{ borderRadius: 2 }}
              >
                <AlertTitle>Bill Management</AlertTitle>
                <Typography variant="body2">
                  You can print or edit any bill that has not been paid yet. Once a bill is paid, it can only be printed but not modified.
                </Typography>
              </Alert>
            </Box>
          </Box>
        )}
      </Paper>
      
      {/* Statistics Summary Paper */}
      <Paper elevation={2} sx={{ borderRadius: 2, p: 3 }}>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
          <PrintIcon fontSize="small" color="primary" />
          LUC Generation Summary
        </Typography>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2, 
                borderRadius: 2, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'primary.light',
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }
              }}
              className="stats-card"
            >
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
                1,250
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                LUC bills generated this month
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2, 
                borderRadius: 2, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'primary.light',
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }
              }}
              className="stats-card"
            >
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
                25
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Bulk LUC generation batches processed
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper 
              variant="outlined" 
              sx={{ 
                p: 2, 
                borderRadius: 2, 
                display: 'flex', 
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'primary.light', 
                height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }
              }}
              className="stats-card"
            >
              <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700, mb: 1 }}>
                ₦15.2M
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                Total value of generated LUC bills
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Paper>

      {/* Bill Generation Dialog */}
      <Dialog
        open={billDialog.open}
        onClose={handleCloseBillDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ 
          p: 3, 
          pb: 1,
          borderBottom: '1px solid', 
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
            <AddIcon fontSize="small" />
            Generate LUC Bill
          </Typography>
          {billDialog.property && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HomeIcon fontSize="small" />
                {billDialog.property.id} | {billDialog.property.address}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                Owner: {billDialog.property.taxpayerName} ({billDialog.property.taxpayerId})
              </Typography>
            </Box>
          )}
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {billDialog.property && (
            <>
              <Box sx={{ mb: 3, mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Select Year(s) to Generate Bill For
                  </Typography>
                  <Chip 
                    label={`${billDialog.selectedYears.length} year(s) selected`}
                    color="primary"
                    size="small"
                    variant="outlined"
                  />
                </Box>
                
                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default' }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                    Outstanding Years
                  </Typography>
                  
                  <Grid container spacing={2}>
                    {getOutstandingYears().map(year => (
                      <Grid item xs={12} sm={6} md={4} key={year}>
                        <Card 
                          variant="outlined"
                          sx={{ 
                            borderColor: billDialog.selectedYears.includes(year) ? 'primary.main' : 'divider',
                            bgcolor: billDialog.selectedYears.includes(year) ? 'primary.lighter' : 'background.paper',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            overflow: 'visible',
                            position: 'relative',
                            '&:hover': {
                              borderColor: 'primary.main',
                              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
                            }
                          }}
                          onClick={() => handleYearSelection(year)}
                          className="year-card"
                        >
                          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Checkbox 
                                  checked={billDialog.selectedYears.includes(year)} 
                                  onChange={() => handleYearSelection(year)}
                                  color="primary"
                                  sx={{ p: 0.5, mr: 1 }}
                                />
                                <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
                                  {year}
                                </Typography>
                              </Box>
                              <Box>
                                <Chip
                                  label="Outstanding"
                                  size="small"
                                  color="warning"
                                  variant="outlined"
                                  sx={{ ml: 1 }}
                                />
                              </Box>
                            </Box>
                          </CardContent>
                          {billDialog.selectedYears.includes(year) && (
                            <Box 
                              sx={{ 
                                position: 'absolute', 
                                top: -8, 
                                right: -8, 
                                bgcolor: 'primary.main', 
                                borderRadius: '50%',
                                width: 24,
                                height: 24,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid #fff',
                                boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                              }}
                            >
                              <CheckCircleIcon fontSize="small" sx={{ color: '#fff', fontSize: '16px' }} />
                            </Box>
                          )}
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                  
                  {getOutstandingYears().length === 0 && (
                    <Alert severity="info" sx={{ mb: 2 }}>
                      No outstanding years found for this property. All LUC bills are up to date.
                    </Alert>
                  )}
                  
                  {billDialog.property.yearsPaid.length > 0 && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
                        Paid Years (For Reference Only)
                      </Typography>
                      <Grid container spacing={2}>
                        {billDialog.property.yearsPaid.map(year => (
                          <Grid item xs={12} sm={6} md={4} key={year}>
                            <Card 
                              variant="outlined"
                              sx={{ 
                                borderColor: 'divider',
                                opacity: 0.7,
                                bgcolor: 'success.lighter'
                              }}
                            >
                              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                  <Typography variant="h6" color="text.secondary" sx={{ fontWeight: 600 }}>
                                    {year}
                                  </Typography>
                                  <Box sx={{ ml: 2 }}>
                                    <Chip
                                      label="Paid"
                                      size="small"
                                      color="success"
                                      variant="outlined"
                                      icon={<CheckCircleIcon fontSize="small" />}
                                    />
                                  </Box>
                                </Box>
                              </CardContent>
                            </Card>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  )}
                </Paper>
              </Box>
              
              {billDialog.selectedYears.length > 0 && (
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <FilterIcon fontSize="small" color="primary" /> 
                    Bill Amount Details
                  </Typography>
                  
                  <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
                    <Table>
                      <TableHead sx={{ bgcolor: 'background.default' }}>
                        <TableRow>
                          <TableCell width="15%">Year</TableCell>
                          <TableCell width="40%">Amount (₦)</TableCell>
                          <TableCell width="45%">Notes</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {[...new Set(billDialog.selectedYears)].map(year => (
                          <TableRow key={year}>
                            <TableCell>
                              <Typography variant="body1" sx={{ fontWeight: 500 }}>
                                {year}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <TextField
                                fullWidth
                                type="number"
                                size="small"
                                value={billDialog.amounts[year] || ''}
                                onChange={(e) => handleAmountChange(year, e.target.value)}
                                InputProps={{
                                  startAdornment: <InputAdornment position="start">₦</InputAdornment>,
                                }}
                                placeholder="Enter amount"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="caption" color="text.secondary">
                                Based on property value: ₦{billDialog.property.assessedValue}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
                                Default rate: 0.5% of assessed property value
                              </Typography>
                            </TableCell>
                          </TableRow>
                        ))}
                        {billDialog.selectedYears.length > 0 && (
                          <TableRow sx={{ bgcolor: 'primary.lighter' }}>
                            <TableCell colSpan={1}>
                              <Typography variant="subtitle2">Total</Typography>
                            </TableCell>
                            <TableCell colSpan={2}>
                              <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 600 }}>
                                ₦{Object.values(billDialog.amounts)
                                    .filter(amount => amount) // Filter out any undefined/empty amounts
                                    .reduce((sum, amount) => sum + parseInt(amount || 0, 10), 0)
                                    .toLocaleString()}
                                {' '}({[...new Set(billDialog.selectedYears)].length} year{[...new Set(billDialog.selectedYears)].length !== 1 ? 's' : ''})
                              </Typography>
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              )}
            </>
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button 
            onClick={handleCloseBillDialog} 
            color="inherit"
            variant="outlined"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleGenerateSingleBill}
            variant="contained"
            color="primary"
            disabled={billDialog.selectedYears.length === 0}
            startIcon={<AddIcon />}
            sx={{ 
              boxShadow: 2,
              px: 3
            }}
          >
            Generate {billDialog.selectedYears.length > 0 ? `${billDialog.selectedYears.length} Bill(s)` : 'Bills'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit Bill Dialog */}
      <Dialog
        open={editBillDialog.open}
        onClose={handleCloseEditDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 }
        }}
      >
        <DialogTitle sx={{ 
          p: 3, 
          pb: 1, 
          borderBottom: '1px solid', 
          borderColor: 'divider',
          bgcolor: 'background.paper'
        }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main', display: 'flex', alignItems: 'center', gap: 1 }}>
            <EditIcon fontSize="small" />
            Edit LUC Bill Amount
          </Typography>
          {editBillDialog.bill && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HomeIcon fontSize="small" />
                Bill ID: {editBillDialog.bill.id} | Year: {editBillDialog.bill.year}
              </Typography>
            </Box>
          )}
        </DialogTitle>
        
        <DialogContent sx={{ p: 3 }}>
          {editBillDialog.bill && (
            <Box sx={{ py: 2 }}>
              <Paper variant="outlined" sx={{ p: 2, borderRadius: 2, bgcolor: 'background.default', mb: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Property</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{editBillDialog.bill.propertyAddress}</Typography>
                    
                    <Typography variant="body2" color="text.secondary">Taxpayer</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>{editBillDialog.bill.taxpayerName}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">Year</Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{editBillDialog.bill.year}</Typography>
                    
                    <Typography variant="body2" color="text.secondary">Status</Typography>
                    <Chip 
                      label={editBillDialog.bill.status} 
                      color={editBillDialog.bill.status === 'paid' ? 'success' : 'warning'} 
                      size="small"
                      icon={editBillDialog.bill.status === 'paid' ? <CheckCircleIcon fontSize="small" /> : <InfoIcon fontSize="small" />}
                    />
                  </Grid>
                </Grid>
              </Paper>
              
              <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>Update Bill Amount</Typography>
              
              <TextField
                fullWidth
                label="Bill Amount"
                type="number"
                value={editBillDialog.amount}
                onChange={(e) => setEditBillDialog(prev => ({...prev, amount: e.target.value}))}
                InputProps={{
                  startAdornment: <InputAdornment position="start">₦</InputAdornment>,
                }}
                sx={{ mb: 1 }}
              />
              
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                <InfoIcon fontSize="small" color="info" />
                <Typography variant="caption" color="text.secondary">
                  The original bill amount was ₦{editBillDialog.bill.amount}
                </Typography>
              </Box>
            </Box>
          )}
        </DialogContent>
        
        <DialogActions sx={{ px: 3, py: 2, borderTop: '1px solid', borderColor: 'divider' }}>
          <Button 
            onClick={handleCloseEditDialog} 
            color="inherit"
            variant="outlined"
            startIcon={<CancelIcon />}
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditBillAmount}
            variant="contained"
            color="primary"
            startIcon={<EditIcon />}
            sx={{ 
              boxShadow: 2,
              px: 3
            }}
          >
            Update Bill
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BulkLUCGeneration; 