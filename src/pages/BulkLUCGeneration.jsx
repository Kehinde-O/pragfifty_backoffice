import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Stack,
  Chip,
  Badge,
  LinearProgress,
  useTheme,
  Tooltip,
  Select,
  MenuItem,
  Divider,
  Checkbox,
  Alert,
  AlertTitle,
  CircularProgress,
  Grid,
  Paper,
  Container,
  Stepper,
  Step,
  StepLabel,
  TablePagination,
  Card,
  CardContent,
  InputAdornment,
  Tabs,
  Tab,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Radio,
  RadioGroup,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  OutlinedInput,
  ListItemText,
  FormHelperText
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
  Check as CheckIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  AccountBalance as AccountBalanceIcon,
  ReceiptLong as ReceiptLongIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  LocationOn as LocationOnIcon,
  TrendingUp as TrendingUpIcon,
  Business as BusinessIcon,
  ViewModule as ViewModuleIcon,
  ViewList as ViewListIcon,
  NavigateNext as NavigateNextIcon,
  Edit as EditIcon,
  Add as AddIcon,
  Person as PersonIcon,
  ArrowForward as ArrowForwardIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import Swal from 'sweetalert2';
import styles from './BulkLUCGeneration.module.css';

// Constants for better code organization
const BILL_STATUS = {
  PAID: "paid",
  UNPAID: "unpaid"
};

const LUC_TABS = {
  SEARCH: "search",
  HISTORY: "history"
};

// Generation steps - SIMPLIFIED to just 2 steps
const GENERATE_STEPS = {
  SELECT_CRITERIA: 0,
  GENERATE_BILLS: 1
};

// Generation modes
const GENERATION_MODE = {
  SINGLE: "single",
  BULK: "bulk"
};

// Default parameters for bill generation
const DEFAULT_PARAMS = {
  minValue: "1000000",
  maxValue: "100000000", 
  rate: "0.005"  // 0.5%
};

const BulkLUCGeneration = () => {
  const theme = useTheme();
  
  // Main view state
  const [activeTab, setActiveTab] = useState(LUC_TABS.SEARCH);
  
  // Current step in the generation process - simplified to just 2 steps
  const [activeStep, setActiveStep] = useState(GENERATE_STEPS.SELECT_CRITERIA);
  
  // Generation mode: single or bulk
  const [generationMode, setGenerationMode] = useState(GENERATION_MODE.BULK);
  
  // Single bill generation state
  const [singleBillData, setSingleBillData] = useState({
    propertyId: "",
    taxpayerId: "",
    propertyAddress: "",
    propertyDetails: null,
    loading: false,
    found: false
  });
  
  // Form data with default values - simplified with reasonable defaults
  const [formData, setFormData] = useState({
    lga: [],
    classification: [],
    year: [new Date().getFullYear().toString()], // Default to current year for clarity
    minValue: DEFAULT_PARAMS.minValue,
    maxValue: DEFAULT_PARAMS.maxValue,
    rate: DEFAULT_PARAMS.rate
  });
  
  // Form validation state
  const [formErrors, setFormErrors] = useState({});
  
  // Active filters tracking
  const [activeFilters, setActiveFilters] = useState([]);
  
  // Generation summary data
  const [generationSummary, setGenerationSummary] = useState({
    propertyCount: 0,
    totalValue: 0,
    estimatedRevenue: 0,
    breakdown: {}
  });
  
  // Available options for selects
  const [options, setOptions] = useState({
    lgas: [],
    classifications: [],
    years: []
  });
  
  // Processing status
  const [processing, setProcessing] = useState(false);
  
  // Generation history
  const [generationHistory, setGenerationHistory] = useState([]);
  
  // Pagination in history tab
  const [historyPagination, setHistoryPagination] = useState({
    page: 0,
    rowsPerPage: 10
  });
  
  // History search
  const [historySearch, setHistorySearch] = useState("");
  
  // Selected bills
  const [selectedBills, setSelectedBills] = useState([]);
  
  // Dashboard stats
  const dashboardStats = {
    totalProperties: 1258,
    totalBillsGenerated: 867,
    totalRevenue: "₦126,750,000",
    pendingBills: 342,
    collectionRate: 64,
    recentActivity: [
      { date: "Today", count: 24 },
      { date: "Yesterday", count: 32 },
      { date: "Last Week", count: 156 }
    ]
  };
  
  // Generation process state
  const [bulkGeneration, setBulkGeneration] = useState({
    inProgress: false,
    progress: 0,
    criteria: {},
    previewData: null,
    estimatedCount: 0,
    batchId: ""
  });
  
  // Validate form before generation
  const validateForm = () => {
    const errors = {};
    let isValid = true;
    
    // For bulk generation mode, validate selections
    if (generationMode === GENERATION_MODE.BULK) {
      if (formData.lga.length === 0) {
        errors.lga = "Please select at least one LGA";
        isValid = false;
      }
      
      if (formData.classification.length === 0) {
        errors.classification = "Please select at least one property classification";
        isValid = false;
      }
      
      if (formData.year.length === 0) {
        errors.year = "Please select at least one year";
        isValid = false;
      }
      
      // Validate range values
      if (!formData.minValue || isNaN(Number(formData.minValue))) {
        errors.minValue = "Please enter a valid minimum value";
        isValid = false;
      }
      
      if (!formData.maxValue || isNaN(Number(formData.maxValue))) {
        errors.maxValue = "Please enter a valid maximum value";
        isValid = false;
      }
      
      if (Number(formData.minValue) >= Number(formData.maxValue)) {
        errors.maxValue = "Maximum value must be greater than minimum value";
        isValid = false;
      }
      
      if (!formData.rate || isNaN(Number(formData.rate))) {
        errors.rate = "Please enter a valid rate";
        isValid = false;
      }
    } else {
      // Single generation mode validation
      if (!singleBillData.propertyId) {
        errors.propertyId = "Please enter a property ID";
        isValid = false;
      }
    }
    
    setFormErrors(errors);
    return isValid;
  };
  
  // Simplified generation flow - just one function to handle the entire process
  const handleGenerateBills = () => {
    // Validate form first
    if (!validateForm()) {
      // Show error toast
      Swal.fire({
        icon: 'error',
        title: 'Validation Error',
        text: 'Please fix the errors in the form before proceeding.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
      return;
    }
    
    setProcessing(true);
    
    // First get a preview count
    setTimeout(() => {
      const selectedLGAs = formData.lga.length === 0 ? options.lgas : formData.lga;
      const selectedClassifications = formData.classification.length === 0 ? 
        options.classifications.map(c => c.areaClassification) : formData.classification;
      const selectedYears = formData.year.length === 0 ? 
        options.years : formData.year;
      
      // Calculate estimated property count based on selections
      const estimatedCount = Math.floor(Math.random() * 500) + 150;
      
      // Calculate average property value
      const avgValue = 15000000; // Example value
      
      // Calculate estimated revenue using standard rate of 0.5%
      const estimatedRevenue = avgValue * estimatedCount * parseFloat(formData.rate);
      
      // Create breakdown by property type
      const breakdownData = {
        residential: Math.floor(estimatedCount * 0.6),
        commercial: Math.floor(estimatedCount * 0.3),
        industrial: Math.floor(estimatedCount * 0.1)
      };
      
      // Update generation summary
      setGenerationSummary({
        propertyCount: estimatedCount,
        totalValue: avgValue * estimatedCount,
        estimatedRevenue,
        breakdown: breakdownData
      });
      
      // Create batch ID
      const batchId = `BATCH-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
      
      // Update bulk generation state
      setBulkGeneration(prev => ({
        ...prev,
        inProgress: true,
        previewData: {
          count: estimatedCount,
          lgaBreakdown: selectedLGAs.map(lga => ({
            name: lga,
            count: Math.floor(Math.random() * 100) + 10
          })),
          classBreakdown: selectedClassifications.map(cls => ({
            name: cls,
            count: Math.floor(Math.random() * 100) + 10
          })),
          yearBreakdown: selectedYears.map(year => ({
            name: year,
            count: Math.floor(Math.random() * 100) + 10
          }))
        },
        estimatedCount,
        criteria: {
          lga: selectedLGAs,
          classification: selectedClassifications,
          year: selectedYears,
          minValue: formData.minValue,
          maxValue: formData.maxValue,
          rate: formData.rate
        },
        batchId
      }));
      
      // Begin the actual generation immediately
      setActiveStep(GENERATE_STEPS.GENERATE_BILLS);
      
      // Simulate a progress timer for generation
      let progress = 0;
      const timer = setInterval(() => {
        progress += Math.random() * 10;
        
        if (progress >= 100) {
          clearInterval(timer);
          progress = 100;
          
          // When complete, generate mock bills and add to history
          const newBills = Array.from({ length: estimatedCount }, (_, i) => ({
            id: `bill-${Math.floor(Math.random() * 10000)}`,
            propertyId: `PROP${10000 + i}`,
            taxpayerId: `TXP${20000 + i}`,
            taxpayerName: `${['John Doe', 'Jane Smith', 'Robert Johnson', 'Alice Brown', 'David Wilson'][i % 5]}`,
            propertyAddress: `${i + 1} ${['Main Street', 'Oak Avenue', 'Park Road', 'Beach Boulevard', 'Hill Drive'][i % 5]}, ${['Ikeja', 'Alimosho', 'Eti-Osa', 'Surulere', 'Yaba'][i % 5]}`,
            year: `${new Date().getFullYear() - (i % 3)}`,
            amount: (50000 + (i * 1000)),
            amountFormatted: (50000 + (i * 1000)).toLocaleString(),
            generatedDate: new Date().toISOString().split('T')[0],
            status: 'unpaid',
            classification: ['Residential', 'Commercial', 'Industrial'][i % 3],
            lga: selectedLGAs[i % selectedLGAs.length],
            generatedBy: 'Admin',
            batchId
          }));
          
          // Update history with new bills
          setGenerationHistory(prevHistory => [...newBills, ...prevHistory]);
          
          // Show success toast
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `${estimatedCount} bills generated successfully`,
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000
          });
          
          setBulkGeneration(prev => ({ ...prev, progress: 100, inProgress: false }));
        } else {
          setBulkGeneration(prev => ({ ...prev, progress }));
        }
      }, 300);
      
      setProcessing(false);
    }, 1000);
  };
  
  // Reset generation process
  const handleReset = () => {
    setActiveStep(GENERATE_STEPS.SELECT_CRITERIA);
    setBulkGeneration({
      inProgress: false,
      progress: 0,
      criteria: {},
      previewData: null,
      estimatedCount: 0,
      batchId: ""
    });
  };
  
  // Update active filters
  const updateActiveFilters = (name, value) => {
    // Handle special cases for array values
    if (Array.isArray(value)) {
      // If 'all' is selected or empty, remove the filter
      if (value.includes('all') || value.length === 0) {
        removeActiveFilter(name);
        return;
      }
      
      // Convert array to string for display
      value = value.join(', ');
    }
    
    // Check if filter already exists
    const existingFilterIndex = activeFilters.findIndex(filter => filter.name === name);
    
    if (existingFilterIndex >= 0) {
      // Update existing filter
      const updatedFilters = [...activeFilters];
      updatedFilters[existingFilterIndex] = { name, value };
      setActiveFilters(updatedFilters);
    } else {
      // Add new filter
      setActiveFilters([...activeFilters, { name, value }]);
    }
  };
  
  // Remove active filter
  const removeActiveFilter = (name) => {
    setActiveFilters(activeFilters.filter(filter => filter.name !== name));
  };
  
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
    
    // Load history data if on history tab
    if (activeTab === LUC_TABS.HISTORY) {
    loadGenerationHistory();
    }
  }, [activeTab]);
  
  // Load generation history
  const loadGenerationHistory = () => {
    // Simulate API call to get generation history
    setProcessing(true);
    
    // Mock data for generation history
    setTimeout(() => {
      const mockHistory = Array.from({ length: 25 }, (_, i) => ({
        id: `bill-${1000 + i}`,
        propertyId: `PROP${10000 + i}`,
        taxpayerId: `TXP${20000 + i}`,
        taxpayerName: `${['John Doe', 'Jane Smith', 'Robert Johnson', 'Alice Brown', 'David Wilson'][i % 5]}`,
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
  
  // Handle history search
  const handleHistorySearch = (e) => {
    setHistorySearch(e.target.value);
  };
  
  // Filter history records based on search
  const filteredHistory = useMemo(() => {
    if (!historySearch) return generationHistory;
    
        const searchLower = historySearch.toLowerCase();
    return generationHistory.filter(bill => (
          bill.id.toLowerCase().includes(searchLower) ||
          bill.propertyId.toLowerCase().includes(searchLower) ||
          bill.taxpayerName.toLowerCase().includes(searchLower) ||
          bill.propertyAddress.toLowerCase().includes(searchLower) ||
          bill.year.includes(searchLower)
    ));
  }, [generationHistory, historySearch]);
  
  // Calculate history summary stats
  const historySummary = useMemo(() => {
    const paid = filteredHistory.filter(bill => bill.status === BILL_STATUS.PAID);
    const unpaid = filteredHistory.filter(bill => bill.status === BILL_STATUS.UNPAID);
    
    return {
      total: filteredHistory.length,
      paid: paid.length,
      unpaid: unpaid.length,
      collectionRate: filteredHistory.length ? Math.round((paid.length / filteredHistory.length) * 100) : 0
    };
  }, [filteredHistory]);
  
  // Handle bill selection
  const handleSelectBill = (billId) => {
    if (selectedBills.includes(billId)) {
      setSelectedBills(selectedBills.filter(id => id !== billId));
    } else {
      setSelectedBills([...selectedBills, billId]);
    }
  };
  
  // Handle printing single bill
  const handlePrintSingleBill = (bill) => {
    // In a real application, this would open a print dialog with the bill
    window.open(`/api/printlucbill?request=singleBill&billId=${bill.id}`, '_blank');
  };
  
  // Handle batch print
  const handleBatchPrint = () => {
    if (selectedBills.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No Bills Selected',
        text: 'Please select at least one bill to print.',
        confirmButtonColor: theme.palette.primary.main
      });
      return;
    }
    
    // In a real application, this would open a print dialog with selected bills
    window.open(`/api/printlucbill?request=batchBill&billIds=${selectedBills.join(',')}`, '_blank');
  };
  
  // Handle single property search
  const handleSinglePropertySearch = () => {
    if (!singleBillData.propertyId && !singleBillData.taxpayerId && !singleBillData.propertyAddress) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Information',
        text: 'Please provide at least one search criteria',
        confirmButtonColor: theme.palette.primary.main
      });
      return;
    }
    
    setSingleBillData(prev => ({ ...prev, loading: true, found: false, propertyDetails: null }));
    
    // Simulate API call to fetch property details
    setTimeout(() => {
      // Mock property data
      const mockProperty = {
        id: singleBillData.propertyId || `PROP${Math.floor(Math.random() * 10000)}`,
        taxpayerId: singleBillData.taxpayerId || `TXP${Math.floor(Math.random() * 10000)}`,
        taxpayerName: 'John Doe',
        address: singleBillData.propertyAddress || '123 Example Street, Ikeja',
        lga: 'Ikeja',
        classification: 'Residential',
        value: 25000000,
        lastAssessment: '2023-05-15',
        lastPayment: '2023-06-10',
        status: 'active'
      };
      
      setSingleBillData(prev => ({
        ...prev,
        loading: false,
        found: true,
        propertyDetails: mockProperty
      }));
    }, 1500);
  };
  
  // Generate single bill
  const handleGenerateSingleBill = () => {
    if (!singleBillData.propertyDetails) return;
    
    setProcessing(true);
    
    // Simulate bill generation
    setTimeout(() => {
      const property = singleBillData.propertyDetails;
      const billId = `BILL-${Math.floor(Math.random() * 10000)}`;
      const amount = Math.floor(property.value * 0.005); // Fixed rate at 0.5%
      
      // Create the bill object
      const newBill = {
        id: billId,
        propertyId: property.id,
        taxpayerId: property.taxpayerId,
        taxpayerName: property.taxpayerName,
        propertyAddress: property.address,
        year: new Date().getFullYear().toString(),
        amount: amount.toLocaleString(),
        generatedDate: new Date().toISOString().split('T')[0],
        status: 'unpaid',
        classification: property.classification,
        lga: property.lga,
        generatedBy: 'Admin',
        batchId: `SINGLE-${new Date().getTime()}`
      };
      
      // Add to history
      setGenerationHistory(prevHistory => [newBill, ...prevHistory]);
      
      // Show success message
      Swal.fire({
        icon: 'success',
        title: 'Bill Generated Successfully',
        text: `Bill ID: ${billId} for ₦${amount.toLocaleString()} has been generated`,
        confirmButtonColor: theme.palette.primary.main,
        showCancelButton: true,
        cancelButtonText: 'Close',
        confirmButtonText: 'Print Bill',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          // Handle print action
          window.open(`/api/printlucbill?request=singleBill&billId=${billId}`, '_blank');
        }
      });
      
      // Reset single bill data
      setSingleBillData({
        propertyId: "",
        taxpayerId: "",
        propertyAddress: "",
        propertyDetails: null,
        loading: false,
        found: false
      });
      
      setProcessing(false);
    }, 1500);
  };
  
  return (
    <Box className={styles.container}>
      {/* Header */}
      <Box className={styles.pageHeader}>
        <div className={styles.headerContent}>
          <div>
            <Typography className={styles.pageTitle}>
              Land Use Charge Generation
            </Typography>
            <Typography className={styles.pageSubtitle}>
              Generate and manage Land Use Charge bills efficiently across multiple LGAs
            </Typography>
          </div>
          <div className={styles.headerActions}>
            <Button
              variant="outlined"
              onClick={() => setActiveTab(LUC_TABS.HISTORY)}
              startIcon={<HistoryIcon />}
              size="small"
            >
              View Bill History
            </Button>
            <Button 
              variant="contained" 
              startIcon={<HelpIcon />}
              size="small"
              onClick={() => {
                Swal.fire({
                  title: 'How to Generate Bills',
                  html: `
                    <ol style="text-align: left; padding-left: 1rem;">
                      <li>Choose between Single or Bulk generation mode</li>
                      <li>Fill in the required fields</li>
                      <li>Click "Generate Bills" to process</li>
                      <li>View and manage generated bills in History tab</li>
                    </ol>
                  `,
                  icon: 'info',
                  confirmButtonColor: '#3085d6'
                });
              }}
            >
              Help
            </Button>
          </div>
        </div>

        {/* Stats cards */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <BusinessIcon />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Total Properties</div>
              <div className={styles.statValue}>{dashboardStats.totalProperties.toLocaleString()}</div>
              <div className={styles.statTrend}>
                <TrendingUpIcon fontSize="small" />
                <span>+5% this month</span>
              </div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <ReceiptLongIcon />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Generated Bills</div>
              <div className={styles.statValue}>{dashboardStats.totalBillsGenerated.toLocaleString()}</div>
              <div className={styles.statBadge}>
                {dashboardStats.pendingBills} Pending
              </div>
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statIcon}>
              <AccountBalanceIcon />
            </div>
            <div className={styles.statContent}>
              <div className={styles.statLabel}>Total Revenue</div>
              <div className={styles.statValue}>{dashboardStats.totalRevenue}</div>
              <div className={styles.progressBar}>
                <LinearProgress 
                  variant="determinate" 
                  value={dashboardStats.collectionRate} 
                  sx={{ 
                    height: 6,
                    borderRadius: 3,
                    backgroundColor: '#e2e8f0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: '#0ea5e9',
                    },
                  }}
                />
              </div>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                {dashboardStats.collectionRate}% Collection Rate
              </Typography>
            </div>
          </div>
        </div>
      </Box>
      
      {/* Navigation Tabs */}
      <div className={styles.navContainer}>
        <div className={styles.navTabs}>
          <Button
            className={activeTab === LUC_TABS.SEARCH ? styles.navTabActive : styles.navTab}
            onClick={() => setActiveTab(LUC_TABS.SEARCH)}
            startIcon={<SearchIcon />}
          >
            Generate Bills
          </Button>
          
          <Button
            className={activeTab === LUC_TABS.HISTORY ? styles.navTabActive : styles.navTab}
            onClick={() => {
              setActiveTab(LUC_TABS.HISTORY);
              loadGenerationHistory();
            }}
            startIcon={<HistoryIcon />}
          >
            Bill History
            {dashboardStats.pendingBills > 0 && (
              <Badge 
                badgeContent={dashboardStats.pendingBills} 
                color="error"
                sx={{ ml: 1 }}
              />
            )}
          </Button>
        </div>
      </div>
      
      {/* Main Content */}
      {activeTab === LUC_TABS.SEARCH ? (
        <div className={styles.mainContent}>
          {activeStep === GENERATE_STEPS.SELECT_CRITERIA ? (
            <>
              <Box className={styles.cardHeader}>
                <div className={styles.headerWithIcon}>
                  <div className={styles.headerIcon}>
                    <ReceiptLongIcon />
                  </div>
                  <Typography variant="h6">Generate Land Use Charge Bills</Typography>
                </div>
              </Box>
              
              <Box className={styles.cardContent}>
                {/* Mode Selection */}
                <div className={styles.modeSelector}>
                  <div 
                    className={`${styles.modeCard} ${generationMode === GENERATION_MODE.SINGLE ? styles.modeCardSelected : ''}`}
                    onClick={() => setGenerationMode(GENERATION_MODE.SINGLE)}
                  >
                    <div className={styles.modeCardTitle}>
                      <ReceiptLongIcon />
                      Single Bill
                    </div>
                    <div className={styles.modeCardDescription}>
                      Generate a bill for a specific property using property ID or taxpayer information
                    </div>
                  </div>
                  
                  <div 
                    className={`${styles.modeCard} ${generationMode === GENERATION_MODE.BULK ? styles.modeCardSelected : ''}`}
                    onClick={() => setGenerationMode(GENERATION_MODE.BULK)}
                  >
                    <div className={styles.modeCardTitle}>
                      <ViewListIcon />
                      Bulk Generation
                    </div>
                    <div className={styles.modeCardDescription}>
                      Generate multiple bills at once based on property classification, location and other criteria
                    </div>
                  </div>
                </div>
                
                {generationMode === GENERATION_MODE.SINGLE ? (
                  <Box className={styles.singleGenerationContainer}>
                    <Typography variant="body1" className={styles.sectionDescription}>
                      Find a property and generate a single Land Use Charge bill.
                    </Typography>
                    
                    <Grid container spacing={4}>
                      <Grid item xs={12} md={4}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Property ID <span className={styles.requiredField}>*</span>
                          </label>
                          <TextField
                            fullWidth
                            placeholder="Enter property ID"
                            size="medium"
                            value={singleBillData.propertyId}
                            onChange={(e) => setSingleBillData({...singleBillData, propertyId: e.target.value})}
                            variant="outlined"
                            error={formErrors?.propertyId}
                            helperText={formErrors?.propertyId}
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <BusinessIcon fontSize="small" color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Taxpayer ID <span className={styles.optionalField}>(optional)</span>
                          </label>
                          <TextField
                            fullWidth
                            placeholder="Enter taxpayer ID"
                            size="medium"
                            value={singleBillData.taxpayerId}
                            onChange={(e) => setSingleBillData({...singleBillData, taxpayerId: e.target.value})}
                            variant="outlined"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <PersonIcon fontSize="small" color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Property Address <span className={styles.optionalField}>(optional)</span>
                          </label>
                          <TextField
                            fullWidth
                            placeholder="Enter address"
                            size="medium"
                            value={singleBillData.propertyAddress}
                            onChange={(e) => setSingleBillData({...singleBillData, propertyAddress: e.target.value})}
                            variant="outlined"
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <LocationOnIcon fontSize="small" color="primary" />
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                      </Grid>
                    </Grid>
                    
                    <Box className={styles.searchButtonContainer}>
                      <Button
                        variant="contained"
                        onClick={handleSinglePropertySearch}
                        disabled={singleBillData.loading}
                        startIcon={singleBillData.loading ? <CircularProgress size={20} color="inherit" /> : <SearchIcon />}
                        className={styles.searchButton}
                      >
                        {singleBillData.loading ? 'Searching...' : 'Search Property'}
                      </Button>
                    </Box>
                    
                    {singleBillData.found && singleBillData.propertyDetails && (
                      <Box className={styles.propertyResultContainer}>
                        <Typography variant="h6" className={styles.resultTitle}>
                          <CheckCircleIcon color="success" />
                          Property Found
                        </Typography>
                        
                        <Grid container spacing={3} className={styles.propertyDetailsGrid}>
                          <Grid item xs={12} md={6} lg={3}>
                            <Typography variant="body2" color="text.secondary" className={styles.detailLabel}>Property ID</Typography>
                            <Typography variant="subtitle1" className={styles.detailValue}>{singleBillData.propertyDetails.id}</Typography>
                          </Grid>
                          <Grid item xs={12} md={6} lg={3}>
                            <Typography variant="body2" color="text.secondary" className={styles.detailLabel}>Taxpayer</Typography>
                            <Typography variant="subtitle1" className={styles.detailValue}>{singleBillData.propertyDetails.taxpayerName}</Typography>
                            <Typography variant="caption" color="text.secondary">{singleBillData.propertyDetails.taxpayerId}</Typography>
                          </Grid>
                          <Grid item xs={12} md={6} lg={3}>
                            <Typography variant="body2" color="text.secondary" className={styles.detailLabel}>Classification</Typography>
                            <Typography variant="subtitle1" className={styles.detailValue}>{singleBillData.propertyDetails.classification}</Typography>
                          </Grid>
                          <Grid item xs={12} md={6} lg={3}>
                            <Typography variant="body2" color="text.secondary" className={styles.detailLabel}>Property Value</Typography>
                            <Typography variant="subtitle1" className={styles.detailValue}>₦{singleBillData.propertyDetails.value.toLocaleString()}</Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary" className={styles.detailLabel}>Address</Typography>
                            <Typography variant="subtitle1" className={styles.detailValue}>{singleBillData.propertyDetails.address}</Typography>
                          </Grid>
                        </Grid>
                        
                        <Box className={styles.generateButtonContainer}>
                          <Button
                            variant="contained"
                            onClick={handleGenerateSingleBill}
                            disabled={processing}
                            startIcon={processing ? <CircularProgress size={20} color="inherit" /> : <ReceiptLongIcon />}
                            className={styles.generateButton}
                          >
                            {processing ? 'Generating...' : 'Generate Bill'}
                          </Button>
                        </Box>
                      </Box>
                    )}
                  </Box>
                ) : (
                  /* Bulk Generation */
                  <Box className={styles.bulkGenerationContainer}>
                    <Alert 
                      severity="info"
                      variant="outlined"
                      icon={<InfoIcon className={styles.alertIcon} />}
                      className={styles.infoAlert}
                    >
                      <AlertTitle className={styles.alertTitle}>Bulk Generation Mode</AlertTitle>
                      <Typography className={styles.alertDescription}>
                        Bills will be generated for all properties matching the criteria below.
                        Ensure all fields are properly filled to target the correct properties.
                      </Typography>
                    </Alert>
                    
                    <Grid container spacing={4} className={styles.formGrid}>
                      <Grid item xs={12} md={4}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Local Government Area <span className={styles.requiredField}>*</span>
                          </label>
                          <FormControl fullWidth size="medium" error={!!formErrors?.lga}>
                            <Select
                              multiple
                              value={formData.lga}
                              onChange={(e) => {
                                setFormData({...formData, lga: e.target.value});
                                updateActiveFilters('lga', e.target.value);
                              }}
                              input={<OutlinedInput className={styles.select} />}
                              renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {selected.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">Select LGA</Typography>
                                  ) : (
                                    selected.map((value) => (
                                      <Chip key={value} label={value} size="small" className={styles.filterChip} />
                                    ))
                                  )}
                                </Box>
                              )}
                              MenuProps={{
                                PaperProps: {
                                  className: styles.menuPaper
                                }
                              }}
                            >
                              {options.lgas.map((lga) => (
                                <MenuItem key={lga} value={lga} className={styles.menuItem}>
                                  <Checkbox checked={formData.lga.indexOf(lga) > -1} color="primary" />
                                  <ListItemText primary={lga} />
                                </MenuItem>
                              ))}
                            </Select>
                            {formErrors?.lga && <FormHelperText className={styles.errorText}>{formErrors.lga}</FormHelperText>}
                          </FormControl>
                          <Typography variant="caption" className={styles.fieldHint}>
                            Select one or multiple local government areas
                          </Typography>
                        </div>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Property Classification <span className={styles.requiredField}>*</span>
                          </label>
                          <FormControl fullWidth size="medium" error={!!formErrors?.classification}>
                            <Select
                              multiple
                              value={formData.classification}
                              onChange={(e) => {
                                setFormData({...formData, classification: e.target.value});
                                updateActiveFilters('classification', e.target.value);
                              }}
                              input={<OutlinedInput className={styles.select} />}
                              renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {selected.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">Select Classification</Typography>
                                  ) : (
                                    selected.map((value) => (
                                      <Chip key={value} label={value} size="small" className={styles.filterChip} />
                                    ))
                                  )}
                                </Box>
                              )}
                              MenuProps={{
                                PaperProps: {
                                  className: styles.menuPaper
                                }
                              }}
                            >
                              {options.classifications.map((classification) => (
                                <MenuItem key={classification} value={classification} className={styles.menuItem}>
                                  <Checkbox checked={formData.classification.indexOf(classification) > -1} color="primary" />
                                  <ListItemText primary={classification} />
                                </MenuItem>
                              ))}
                            </Select>
                            {formErrors?.classification && <FormHelperText className={styles.errorText}>{formErrors.classification}</FormHelperText>}
                          </FormControl>
                          <Typography variant="caption" className={styles.fieldHint}>
                            Select property type classifications for filtering
                          </Typography>
                        </div>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Year <span className={styles.requiredField}>*</span>
                          </label>
                          <FormControl fullWidth size="medium" error={!!formErrors?.year}>
                            <Select
                              multiple
                              value={formData.year}
                              onChange={(e) => {
                                setFormData({...formData, year: e.target.value});
                                updateActiveFilters('year', e.target.value);
                              }}
                              input={<OutlinedInput className={styles.select} />}
                              renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                  {selected.length === 0 ? (
                                    <Typography variant="body2" color="text.secondary">Select Year</Typography>
                                  ) : (
                                    selected.map((value) => (
                                      <Chip key={value} label={value} size="small" className={styles.filterChip} />
                                    ))
                                  )}
                                </Box>
                              )}
                              MenuProps={{
                                PaperProps: {
                                  className: styles.menuPaper
                                }
                              }}
                            >
                              {options.years.map((year) => (
                                <MenuItem key={year} value={year} className={styles.menuItem}>
                                  <Checkbox checked={formData.year.indexOf(year) > -1} color="primary" />
                                  <ListItemText primary={year} />
                                </MenuItem>
                              ))}
                            </Select>
                            {formErrors?.year && <FormHelperText className={styles.errorText}>{formErrors.year}</FormHelperText>}
                          </FormControl>
                          <Typography variant="caption" className={styles.fieldHint}>
                            Select billing year(s)
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                    
                    <Typography variant="h6" className={styles.sectionTitle}>
                      <FilterIcon className={styles.sectionIcon} />
                      Property Value Range & Rate
                    </Typography>
                    
                    <Grid container spacing={4} className={styles.formGrid}>
                      <Grid item xs={12} md={4}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Minimum Value <span className={styles.requiredField}>*</span>
                          </label>
                          <TextField
                            fullWidth
                            size="medium"
                            value={formData.minValue}
                            onChange={(e) => setFormData({...formData, minValue: e.target.value})}
                            placeholder="Minimum property value"
                            error={!!formErrors?.minValue}
                            helperText={formErrors?.minValue}
                            variant="outlined"
                            className={styles.textField}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">₦</InputAdornment>,
                            }}
                          />
                          <Typography variant="caption" className={styles.fieldHint}>
                            Enter the minimum property value threshold
                          </Typography>
                        </div>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Maximum Value <span className={styles.requiredField}>*</span>
                          </label>
                          <TextField
                            fullWidth
                            size="medium"
                            value={formData.maxValue}
                            onChange={(e) => setFormData({...formData, maxValue: e.target.value})}
                            placeholder="Maximum property value"
                            error={!!formErrors?.maxValue}
                            helperText={formErrors?.maxValue}
                            variant="outlined"
                            className={styles.textField}
                            InputProps={{
                              startAdornment: <InputAdornment position="start">₦</InputAdornment>,
                            }}
                          />
                          <Typography variant="caption" className={styles.fieldHint}>
                            Enter the maximum property value threshold
                          </Typography>
                        </div>
                      </Grid>
                      
                      <Grid item xs={12} md={4}>
                        <div className={styles.fieldGroup}>
                          <label className={styles.fieldLabel}>
                            Billing Rate <span className={styles.requiredField}>*</span>
                          </label>
                          <TextField
                            fullWidth
                            size="medium"
                            value={formData.rate}
                            onChange={(e) => setFormData({...formData, rate: e.target.value})}
                            placeholder="Billing rate (e.g., 0.005 for 0.5%)"
                            error={!!formErrors?.rate}
                            helperText={formErrors?.rate}
                            variant="outlined"
                            className={styles.textField}
                            InputProps={{
                              endAdornment: <InputAdornment position="end">%</InputAdornment>,
                            }}
                          />
                          <Typography variant="caption" className={styles.fieldHint}>
                            Enter rate as decimal (e.g., 0.005 = 0.5%)
                          </Typography>
                        </div>
                      </Grid>
                    </Grid>
                    
                    {activeFilters.length > 0 && (
                      <Box className={styles.activeFiltersContainer}>
                        <Typography variant="body2" className={styles.activeFiltersLabel}>
                          Active Filters:
                        </Typography>
                        <div className={styles.activeFiltersChips}>
                          {activeFilters.map((filter) => (
                            <Chip
                              key={filter.id}
                              label={`${filter.name}: ${filter.value}`}
                              onDelete={() => removeActiveFilter(filter.name)}
                              className={styles.activeFilterChip}
                              deleteIcon={<CloseIcon />}
                            />
                          ))}
                          <Button 
                            size="small" 
                            variant="outlined" 
                            onClick={handleReset}
                            startIcon={<RefreshIcon />}
                            className={styles.clearFiltersButton}
                          >
                            Clear All
                          </Button>
                        </div>
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
              
              {/* Card Footer with Actions */}
              <div className={styles.cardFooter}>
                <div className={styles.footerInfo}>
                  {activeFilters.length > 0 ? (
                    <Typography variant="body2" className={styles.filterSummary}>
                      <InfoIcon fontSize="small" className={styles.infoSummaryIcon} />
                      {`${activeFilters.length} filter${activeFilters.length > 1 ? 's' : ''} applied`}
                    </Typography>
                  ) : (
                    <Typography variant="body2" className={styles.filterSummary}>
                      <InfoIcon fontSize="small" className={styles.infoSummaryIcon} />
                      No filters applied yet
                    </Typography>
                  )}
                </div>
                <div className={styles.footerActions}>
                  <Button
                    variant="outlined"
                    onClick={handleReset}
                    startIcon={<RefreshIcon />}
                    className={styles.resetButton}
                    disabled={processing}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleGenerateBills}
                    startIcon={processing ? <CircularProgress size={20} color="inherit" /> : <ReceiptLongIcon />}
                    disabled={processing}
                    className={styles.generateBillsButton}
                  >
                    {processing ? 'Processing...' : 'Generate Bills'}
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <Paper elevation={0} className={styles.contentCard}>
              <div className={styles.cardHeader}>
                <div className={styles.headerWithIcon}>
                  <ReceiptLongIcon className={styles.headerIcon} />
                  <Typography variant="h6">Bill Generation Progress</Typography>
                </div>
                <div>
                  <Chip label={bulkGeneration.batchId} color="primary" />
                </div>
              </div>
              
              <div className={styles.cardContent}>
                {bulkGeneration.inProgress ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      Generating Bills...
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                      Please wait while we generate {generationSummary.propertyCount} bills. This may take a few minutes.
                    </Typography>
                    
                    <Box sx={{ width: '80%', mx: 'auto', mb: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={bulkGeneration.progress}
                        sx={{ height: 10, borderRadius: 5 }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary" align="center">
                      {bulkGeneration.progress.toFixed(0)}% Complete
                    </Typography>
                  </Box>
                ) : (
                  <div className={styles.successContainer}>
                    <CheckCircleIcon className={styles.successIcon} />
                    <Typography className={styles.successTitle}>
                      Bills Generated Successfully!
                    </Typography>
                    
                    <Typography className={styles.successMessage}>
                      {generationSummary.propertyCount} Land Use Charge bills have been generated successfully 
                      with a total revenue of ₦{generationSummary.estimatedRevenue.toLocaleString()}.
                    </Typography>
                    
                    <div className={styles.summaryGrid}>
                      <div className={styles.summaryItem}>
                        <div className={styles.summaryLabel}>Batch ID</div>
                        <div className={styles.summaryValue}>{bulkGeneration.batchId}</div>
                      </div>
                      <div className={styles.summaryItem}>
                        <div className={styles.summaryLabel}>Total Properties</div>
                        <div className={styles.summaryValue}>{generationSummary.propertyCount.toLocaleString()}</div>
                      </div>
                      <div className={styles.summaryItem}>
                        <div className={styles.summaryLabel}>Expected Revenue</div>
                        <div className={styles.summaryValue}>₦{generationSummary.estimatedRevenue.toLocaleString()}</div>
                      </div>
                      <div className={styles.summaryItem}>
                        <div className={styles.summaryLabel}>Date Generated</div>
                        <div className={styles.summaryValue}>{new Date().toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className={styles.cardFooter}>
                {!bulkGeneration.inProgress && (
                  <>
                    <Button
                      variant="outlined"
                      startIcon={<PrintIcon />}
                      onClick={() => window.open(`/api/printlucbill?request=batchPrint&batchId=${bulkGeneration.batchId}`, '_blank')}
                    >
                      Print Bills
                    </Button>
                    
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={() => window.open(`/api/downloadlucbill?batchId=${bulkGeneration.batchId}`, '_blank')}
                    >
                      Download CSV
                    </Button>
                    
                    <Button
                      variant="contained"
                      onClick={() => {
                        setActiveTab(LUC_TABS.HISTORY);
                        handleReset();
                      }}
                      startIcon={<HistoryIcon />}
                    >
                      View in History
                    </Button>
                    
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleReset}
                      startIcon={<RefreshIcon />}
                    >
                      Generate More Bills
                    </Button>
                  </>
                )}
              </div>
            </Paper>
          )}
        </div>
      ) : (
        <div className={styles.mainContent}>
          {/* History View - Improved with Table */}
          <div className={styles.cardHeader}>
            <div className={styles.headerWithIcon}>
              <div className={styles.headerIcon}>
                <HistoryIcon />
              </div>
              <Typography variant="h6">Bill Generation History</Typography>
            </div>
            <TextField
              placeholder="Search bills..."
              size="small"
              variant="outlined"
              value={historySearch}
              onChange={handleHistorySearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon fontSize="small" />
                  </InputAdornment>
                )
              }}
              sx={{ width: 240 }}
            />
          </div>

          <Box sx={{ p: 2, bgcolor: '#F9FAFB', borderBottom: '1px solid', borderColor: 'divider' }}>
            <Grid container spacing={2}>
              <Grid item xs={6} md={3}>
                <Card variant="outlined" sx={{ borderRadius: 1 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Total Bills</Typography>
                    <Typography variant="h5" fontWeight={600}>{historySummary.total}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card variant="outlined" sx={{ borderRadius: 1 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Paid Bills</Typography>
                    <Typography variant="h5" fontWeight={600} color="success.main">{historySummary.paid}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card variant="outlined" sx={{ borderRadius: 1 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Unpaid Bills</Typography>
                    <Typography variant="h5" fontWeight={600} color="warning.main">{historySummary.unpaid}</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card variant="outlined" sx={{ borderRadius: 1 }}>
                  <CardContent sx={{ p: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>Collection Rate</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="h5" fontWeight={600} sx={{ mr: 1 }}>{historySummary.collectionRate}%</Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={historySummary.collectionRate} 
                        sx={{ 
                          width: 40, 
                          height: 6, 
                          borderRadius: 3,
                          bgcolor: '#e2e8f0',
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: '#0ea5e9'
                          }
                        }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>

          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="bill history table" className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox" align="center">
                    <Checkbox 
                      indeterminate={selectedBills.length > 0 && selectedBills.length < filteredHistory.length}
                      checked={filteredHistory.length > 0 && selectedBills.length === filteredHistory.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedBills(filteredHistory.map(bill => bill.id));
                        } else {
                          setSelectedBills([]);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>Bill ID</TableCell>
                  <TableCell>Property</TableCell>
                  <TableCell>Taxpayer</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Date Generated</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHistory
                  .slice(
                    historyPagination.page * historyPagination.rowsPerPage,
                    historyPagination.page * historyPagination.rowsPerPage + historyPagination.rowsPerPage
                  )
                  .map((bill) => (
                    <TableRow 
                      key={bill.id}
                      selected={selectedBills.includes(bill.id)}
                      hover
                    >
                      <TableCell padding="checkbox" align="center">
                        <Checkbox 
                          checked={selectedBills.includes(bill.id)}
                          onChange={() => handleSelectBill(bill.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={bill.id}
                          variant="outlined"
                          size="small"
                          sx={{ fontFamily: 'monospace', fontSize: '0.75rem' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Tooltip title={bill.propertyAddress}>
                          <Box>
                            <Typography variant="body2" fontWeight={500} noWrap sx={{ maxWidth: 150 }}>
                              {bill.propertyId}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" noWrap>
                              {bill.propertyAddress}
                            </Typography>
                          </Box>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">{bill.taxpayerName}</Typography>
                        <Typography variant="caption" color="text.secondary">{bill.taxpayerId}</Typography>
                      </TableCell>
                      <TableCell>{bill.year}</TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>₦{bill.amountFormatted || bill.amount}</Typography>
                      </TableCell>
                      <TableCell>{bill.generatedDate}</TableCell>
                      <TableCell>
                        <div 
                          className={`${styles.statusBadge} 
                          ${bill.status === BILL_STATUS.PAID ? styles.paidBadge : styles.unpaidBadge}`}
                        >
                          {bill.status === BILL_STATUS.PAID ? (
                            <>
                              <CheckCircleIcon fontSize="small" />
                              Paid
                            </>
                          ) : (
                            <>
                              <CancelIcon fontSize="small" />
                              Unpaid
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <Tooltip title="Print Bill">
                          <IconButton
                            size="small"
                            onClick={() => handlePrintSingleBill(bill)}
                            sx={{ color: '#0ea5e9' }}
                          >
                            <PrintIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title={bill.status === BILL_STATUS.PAID ? "Already Paid" : "Edit Bill"}>
                          <span>
                            <IconButton
                              size="small"
                              disabled={bill.status === BILL_STATUS.PAID}
                              sx={{ color: bill.status === BILL_STATUS.PAID ? '#D1D5DB' : '#0ea5e9' }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </span>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          
          {filteredHistory.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 6 }}>
              <Typography variant="h6" color="text.secondary">No bills found</Typography>
              <Typography variant="body2" color="text.secondary">Try modifying your search criteria</Typography>
            </Box>
          )}
              
          <div className={styles.cardFooter}>
            {selectedBills.length > 0 ? (
              <Button
                variant="contained"
                startIcon={<PrintIcon />}
                onClick={handleBatchPrint}
                sx={{ 
                  bgcolor: '#0ea5e9',
                  '&:hover': {
                    bgcolor: '#0284c7'
                  }
                }}
              >
                Print Selected ({selectedBills.length})
              </Button>
            ) : (
              <div />
            )}
            <TablePagination
              component="div"
              count={filteredHistory.length}
              page={historyPagination.page}
              onPageChange={handleChangePage}
              rowsPerPage={historyPagination.rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[10, 25, 50]}
            />
          </div>
        </div>
      )}
    </Box>
  );
};

export default BulkLUCGeneration; 