import React, { useState, useEffect, useMemo } from 'react';
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
  TablePagination,
  Badge,
  LinearProgress,
  useMediaQuery,
  Avatar,
  Autocomplete,
  Container,
  ToggleButton,
  ToggleButtonGroup
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
  LocalPrintshop as LocalPrintshopIcon,
  FilterList as FilterListIcon,
  Close as CloseIcon,
  Refresh as RefreshIcon,
  SaveAlt as SaveAltIcon,
  AccountBalance as AccountBalanceIcon,
  ViewList as ViewListIcon,
  ReceiptLong as ReceiptLongIcon,
  ContentCopy as ContentCopyIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  LocationOn as LocationOnIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Payments as PaymentsIcon,
  Business as BusinessIcon,
  Dashboard as DashboardIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  ViewModule as ViewModuleIcon,
  ViewColumn as ViewColumnIcon
} from '@mui/icons-material';
import Swal from 'sweetalert2';
import styles from './BulkLUCGeneration.module.css';

// Constants for better code organization
const SEARCH_TYPES = {
  PROPERTY: "property",
  TAXPAYER: "taxpayer",
  ADDRESS: "address"
};

const BILL_STATUS = {
  PAID: "paid",
  UNPAID: "unpaid"
};

const LUC_TABS = {
  SEARCH: "search",
  HISTORY: "history"
};

const VIEWS = {
  GRID: "grid",
  TABLE: "table"
};

const BulkLUCGeneration = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [activeTab, setActiveTab] = useState(LUC_TABS.SEARCH);
  const [viewMode, setViewMode] = useState(VIEWS.GRID);
  
  // New state to track separate view modes for each tab
  const [historyViewMode, setHistoryViewMode] = useState(VIEWS.TABLE);
  
  // State for form inputs
  const [formData, setFormData] = useState({
    searchType: SEARCH_TYPES.PROPERTY,
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
  
  // State for filter panel expanded status
  const [isFilterExpanded, setIsFilterExpanded] = useState(true);
  
  // State for active filters
  const [activeFilters, setActiveFilters] = useState([]);
  
  // New state for history filtering
  const [historyFilters, setHistoryFilters] = useState({
    status: "all",
    year: "all",
    dateFrom: "",
    dateTo: "",
    searchQuery: ""
  });
  
  // New state for history search
  const [historySearch, setHistorySearch] = useState("");
  
  // New state for dashboard stats
  const [dashboardStats, setDashboardStats] = useState({
    totalProperties: 1258,
    totalBillsGenerated: 867,
    totalRevenue: "₦126,750,000",
    pendingBills: 342,
    revenueGrowth: 12.5,
    propertyGrowth: 3.8
  });
  
  // State for selected bills
  const [selectedBills, setSelectedBills] = useState([]);
  
  // Toggle view mode
  const handleViewModeChange = (event, newMode) => {
    if (newMode !== null) {
      if (activeTab === LUC_TABS.SEARCH) {
        setViewMode(newMode);
      } else {
        setHistoryViewMode(newMode);
      }
    }
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
    
    if (newValue === LUC_TABS.HISTORY) {
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
          setActiveTab(LUC_TABS.HISTORY);
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
    if (selected.length === 0) {
      return <em>Select options</em>;
    }
    
    if (selected.includes('all')) {
      return 'All';
    }
    
    if (selected.length <= 2) {
      return selected.join(', ');
    }
    
    return `${selected.length} selected`;
  };
  
  // Calculate outstanding years for bill generation
  const getOutstandingYears = () => {
    if (!singlePropertyResult) return [];
    
    const currentYear = new Date().getFullYear();
    const startYear = Math.min(...singlePropertyResult.yearsPaid.map(Number), currentYear - 4);
    const allYears = [];
    
    for (let year = startYear; year <= currentYear; year++) {
      allYears.push(year.toString());
    }
    
    return allYears.filter(year => !singlePropertyResult.yearsPaid.includes(year));
  };
  
  // Handle history filter change
  const handleHistoryFilterChange = (e) => {
    const { name, value } = e.target;
    setHistoryFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle history search
  const handleHistorySearch = (e) => {
    setHistorySearch(e.target.value);
  };
  
  // Reset history filters
  const resetHistoryFilters = () => {
    setHistoryFilters({
      status: "all",
      year: "all",
      dateFrom: "",
      dateTo: "",
      searchQuery: ""
    });
    setHistorySearch("");
  };
  
  // Filter history records based on filters and search
  const filteredHistory = useMemo(() => {
    return generationHistory.filter(bill => {
      // Filter by status
      if (historyFilters.status !== "all" && bill.status !== historyFilters.status) {
        return false;
      }
      
      // Filter by year
      if (historyFilters.year !== "all" && bill.year !== historyFilters.year) {
        return false;
      }
      
      // Filter by date range
      if (historyFilters.dateFrom && new Date(bill.generatedDate) < new Date(historyFilters.dateFrom)) {
        return false;
      }
      
      if (historyFilters.dateTo && new Date(bill.generatedDate) > new Date(historyFilters.dateTo)) {
        return false;
      }
      
      // Filter by search query
      if (historySearch) {
        const searchLower = historySearch.toLowerCase();
        return (
          bill.id.toLowerCase().includes(searchLower) ||
          bill.propertyId.toLowerCase().includes(searchLower) ||
          bill.taxpayerName.toLowerCase().includes(searchLower) ||
          bill.propertyAddress.toLowerCase().includes(searchLower) ||
          bill.year.includes(searchLower)
        );
      }
      
      return true;
    });
  }, [generationHistory, historyFilters, historySearch]);
  
  // Calculate history summary stats
  const historySummary = useMemo(() => {
    const paid = filteredHistory.filter(bill => bill.status === BILL_STATUS.PAID);
    const unpaid = filteredHistory.filter(bill => bill.status === BILL_STATUS.UNPAID);
    
    // Calculate total amount
    const totalAmount = filteredHistory.reduce((sum, bill) => {
      const numAmount = parseInt(bill.amount.replace(/,/g, ''));
      return sum + (isNaN(numAmount) ? 0 : numAmount);
    }, 0);
    
    // Calculate paid amount
    const paidAmount = paid.reduce((sum, bill) => {
      const numAmount = parseInt(bill.amount.replace(/,/g, ''));
      return sum + (isNaN(numAmount) ? 0 : numAmount);
    }, 0);
    
    return {
      total: filteredHistory.length,
      paid: paid.length,
      unpaid: unpaid.length,
      totalAmount: totalAmount.toLocaleString(),
      paidAmount: paidAmount.toLocaleString(),
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
  
  // Handle select all bills
  const handleSelectAllBills = (event) => {
    if (event.target.checked) {
      const visibleBills = filteredHistory
        .slice(
          historyPagination.page * historyPagination.rowsPerPage,
          historyPagination.page * historyPagination.rowsPerPage + historyPagination.rowsPerPage
        )
        .map(bill => bill.id);
      setSelectedBills(visibleBills);
    } else {
      setSelectedBills([]);
    }
  };
  
  // Handle batch print
  const handleBatchPrint = () => {
    if (selectedBills.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'No Bills Selected',
        text: 'Please select at least one bill to print.'
      });
      return;
    }
    
    // In a real application, this would open a print dialog with selected bills
    window.open(`/api/printlucbill?request=batchBill&billIds=${selectedBills.join(',')}`, '_blank');
  };
  
  return (
    <Box className={styles.container}>
      {/* Dashboard Header */}
      <div className={styles.dashboardHeader}>
        <Box>
          <Typography variant="h4" className={styles.pageTitle}>
            Bulk LUC Generation
          </Typography>
          <Typography variant="body1" className={styles.pageSubtitle}>
            Generate Land Use Charge bills in bulk based on property filters
          </Typography>
        </Box>
        
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statLabel}>
              <BusinessIcon fontSize="small" color="primary" />
              Total Properties
            </div>
            <div className={styles.statValue}>
              {dashboardStats.totalProperties.toLocaleString()}
            </div>
            <div className={`${styles.statChange} ${styles.statChangePositive}`}>
              <TrendingUpIcon fontSize="small" />
              {dashboardStats.propertyGrowth}% from last month
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statLabel}>
              <ReceiptLongIcon fontSize="small" color="primary" />
              Generated Bills
            </div>
            <div className={styles.statValue}>
              {dashboardStats.totalBillsGenerated.toLocaleString()}
            </div>
            <div className={`${styles.statChange} ${styles.statChangePositive}`}>
              <Badge badgeContent={dashboardStats.pendingBills} color="error" sx={{ mr: 1 }} />
              Pending bills
            </div>
          </div>
          
          <div className={styles.statCard}>
            <div className={styles.statLabel}>
              <PaymentsIcon fontSize="small" color="primary" />
              Total Revenue
            </div>
            <div className={styles.statValue}>
              {dashboardStats.totalRevenue}
            </div>
            <div className={`${styles.statChange} ${styles.statChangePositive}`}>
              <TrendingUpIcon fontSize="small" />
              {dashboardStats.revenueGrowth}% growth
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Section */}
      <div className={styles.tabContainer}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tab} ${activeTab === LUC_TABS.SEARCH ? styles.tabSelected : ''}`}
            onClick={() => setActiveTab(LUC_TABS.SEARCH)}
          >
            <SearchIcon fontSize="small" />
            Search Properties
          </button>
          <button 
            className={`${styles.tab} ${activeTab === LUC_TABS.HISTORY ? styles.tabSelected : ''}`}
            onClick={() => setActiveTab(LUC_TABS.HISTORY)}
          >
            <HistoryIcon fontSize="small" />
            Generation History
            {dashboardStats.pendingBills > 0 && (
              <span className={styles.tabBadge}>{dashboardStats.pendingBills}</span>
            )}
          </button>
        </div>
      </div>
      
      {/* Tab Content */}
      {activeTab === LUC_TABS.SEARCH ? (
        <div>
          {/* Search Card */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <div className={styles.cardTitle}>
                <div className={styles.cardTitleIcon}>
                  <SearchIcon fontSize="small" />
                </div>
                Property Search
              </div>
              <Button 
                variant="outlined"
                size="small"
                startIcon={isFilterExpanded ? <KeyboardArrowDownIcon /> : <FilterListIcon />}
                onClick={() => setIsFilterExpanded(!isFilterExpanded)}
                className={styles.buttonOutline}
              >
                {isFilterExpanded ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </div>
            
            {/* Search Form */}
            <div className={styles.cardContent}>
              <form className={styles.searchForm}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Search By</label>
                  <Select
                    value={formData.searchType}
                    onChange={(e) => setFormData({...formData, searchType: e.target.value})}
                    className={styles.formControl}
                    displayEmpty
                  >
                    <MenuItem value={SEARCH_TYPES.PROPERTY}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <HomeIcon fontSize="small" color="primary" />
                        <span>Property ID</span>
                      </Stack>
                    </MenuItem>
                    <MenuItem value={SEARCH_TYPES.TAXPAYER}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <AccountBalanceIcon fontSize="small" color="primary" />
                        <span>Taxpayer ID</span>
                      </Stack>
                    </MenuItem>
                    <MenuItem value={SEARCH_TYPES.ADDRESS}>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LocationOnIcon fontSize="small" color="primary" />
                        <span>Address</span>
                      </Stack>
                    </MenuItem>
                  </Select>
                </div>
                
                {formData.searchType === SEARCH_TYPES.PROPERTY && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Property ID</label>
                    <div className={styles.inputWithIcon}>
                      <HomeIcon className={styles.inputIcon} />
                      <input
                        type="text"
                        className={`${styles.formControl} ${styles.inputWithIconPadding}`}
                        placeholder="Enter property ID (e.g., PROP10001)"
                        value={formData.propertyId}
                        onChange={(e) => setFormData({...formData, propertyId: e.target.value})}
                      />
                    </div>
                  </div>
                )}
                
                {formData.searchType === SEARCH_TYPES.TAXPAYER && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Taxpayer ID</label>
                    <div className={styles.inputWithIcon}>
                      <AccountBalanceIcon className={styles.inputIcon} />
                      <input
                        type="text"
                        className={`${styles.formControl} ${styles.inputWithIconPadding}`}
                        placeholder="Enter taxpayer ID (e.g., TXP20001)"
                        value={formData.taxpayerId}
                        onChange={(e) => setFormData({...formData, taxpayerId: e.target.value})}
                      />
                    </div>
                  </div>
                )}
                
                {formData.searchType === SEARCH_TYPES.ADDRESS && (
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Property Address</label>
                    <div className={styles.inputWithIcon}>
                      <LocationOnIcon className={styles.inputIcon} />
                      <input
                        type="text"
                        className={`${styles.formControl} ${styles.inputWithIconPadding}`}
                        placeholder="Enter full or partial address"
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                      />
                    </div>
                  </div>
                )}
                
                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={`${styles.button} ${styles.buttonPrimary}`}
                    onClick={handlePropertySearch}
                    disabled={processing}
                  >
                    {processing ? (
                      <>
                        <CircularProgress size={16} color="inherit" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <SearchIcon fontSize="small" />
                        Search Properties
                      </>
                    )}
                  </button>
                </div>
              </form>
              
              {/* Advanced Filter Section - Collapsible */}
              {isFilterExpanded && (
                <div className={styles.filterSection}>
                  <div className={styles.filterHeader}>
                    <div className={styles.filterTitle}>
                      <FilterListIcon fontSize="small" />
                      Advanced Filters
                    </div>
                    <Button 
                      size="small"
                      className={styles.buttonText}
                      onClick={() => {
                        setFormData({
                          ...formData,
                          lga: ["all"],
                          classification: ["all"],
                          year: ["all"],
                          minValue: "",
                          maxValue: ""
                        });
                        setActiveFilters([]);
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                  
                  <div className={styles.filtersGrid}>
                    <div className={styles.filterGroup}>
                      <label className={styles.filterLabel}>Local Government Area</label>
                      <Select
                        multiple
                        value={formData.lga}
                        onChange={(e) => {
                          setFormData({...formData, lga: e.target.value});
                          updateActiveFilters('LGA', e.target.value);
                        }}
                        className={styles.formControl}
                        renderValue={(selected) => {
                          if (selected.includes('all')) return 'All LGAs';
                          return selected.join(', ');
                        }}
                        displayEmpty
                      >
                        <MenuItem value="all">
                          <Checkbox checked={formData.lga.includes('all')} />
                          All Local Government Areas
                        </MenuItem>
                        <Divider />
                        {options.lgas.map((lga) => (
                          <MenuItem key={lga} value={lga}>
                            <Checkbox checked={formData.lga.includes(lga)} />
                            {lga}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    
                    <div className={styles.filterGroup}>
                      <label className={styles.filterLabel}>Classification</label>
                      <Select
                        multiple
                        value={formData.classification}
                        onChange={(e) => {
                          setFormData({...formData, classification: e.target.value});
                          updateActiveFilters('Classification', e.target.value);
                        }}
                        className={styles.formControl}
                        renderValue={(selected) => {
                          if (selected.includes('all')) return 'All Classifications';
                          return selected.join(', ');
                        }}
                        displayEmpty
                      >
                        <MenuItem value="all">
                          <Checkbox checked={formData.classification.includes('all')} />
                          All Classifications
                        </MenuItem>
                        <Divider />
                        {options.classifications.map((classification) => (
                          <MenuItem key={classification.areaClassification} value={classification.areaClassification}>
                            <Checkbox checked={formData.classification.includes(classification.areaClassification)} />
                            {classification.areaClassification}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                    
                    <div className={styles.filterGroup}>
                      <label className={styles.filterLabel}>Year</label>
                      <Select
                        multiple
                        value={formData.year}
                        onChange={(e) => {
                          setFormData({...formData, year: e.target.value});
                          updateActiveFilters('Year', e.target.value);
                        }}
                        className={styles.formControl}
                        renderValue={(selected) => {
                          if (selected.includes('all')) return 'All Years';
                          return selected.join(', ');
                        }}
                        displayEmpty
                      >
                        <MenuItem value="all">
                          <Checkbox checked={formData.year.includes('all')} />
                          All Years
                        </MenuItem>
                        <Divider />
                        {options.years.map((year) => (
                          <MenuItem key={year} value={year}>
                            <Checkbox checked={formData.year.includes(year)} />
                            {year}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  
                  <div className={styles.filtersGrid}>
                    <div className={styles.filterGroup}>
                      <label className={styles.filterLabel}>Minimum Property Value (₦)</label>
                      <input
                        type="text"
                        className={styles.formControl}
                        placeholder="e.g., 1,000,000"
                        value={formData.minValue}
                        onChange={(e) => {
                          setFormData({...formData, minValue: e.target.value});
                          if (e.target.value) {
                            updateActiveFilters('Min Value', `₦${e.target.value}`);
                          } else {
                            removeActiveFilter('Min Value');
                          }
                        }}
                      />
                    </div>
                    
                    <div className={styles.filterGroup}>
                      <label className={styles.filterLabel}>Maximum Property Value (₦)</label>
                      <input
                        type="text"
                        className={styles.formControl}
                        placeholder="e.g., 10,000,000"
                        value={formData.maxValue}
                        onChange={(e) => {
                          setFormData({...formData, maxValue: e.target.value});
                          if (e.target.value) {
                            updateActiveFilters('Max Value', `₦${e.target.value}`);
                          } else {
                            removeActiveFilter('Max Value');
                          }
                        }}
                      />
                    </div>
                  </div>
                  
                  {activeFilters.length > 0 && (
                    <div className={styles.activeFilters}>
                      <label className={styles.filterLabel}>Active Filters:</label>
                      {activeFilters.map((filter, index) => (
                        <div key={index} className={styles.activeFilterChip}>
                          {filter.name}: {filter.value}
                          <span 
                            className={styles.activeFilterChipRemove}
                            onClick={() => removeActiveFilter(filter.name)}
                          >
                            <CloseIcon style={{ fontSize: 12 }} />
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
              
              {/* Search Information */}
              <Alert 
                severity="info" 
                icon={<InfoIcon fontSize="inherit" />}
                sx={{ mt: 2, borderRadius: 2 }}
              >
                Search by property ID for exact matches or address for broader results. Business properties can be found using taxpayer ID.
              </Alert>
            </div>
          </div>
          
          {/* Search Results */}
          {searchResults.isMultiple && searchResults.properties.length > 0 && (
            <div className={styles.searchResults}>
              <div className={styles.card}>
                <div className={styles.resultsHeader}>
                  <div className={styles.resultsTitle}>
                    <InfoIcon fontSize="small" />
                    Search Results ({searchResults.count} properties found)
                  </div>
                  
                  <div className={styles.resultActions}>
                    <ToggleButtonGroup
                      value={viewMode}
                      exclusive
                      onChange={handleViewModeChange}
                      size="small"
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 1 }}
                    >
                      <ToggleButton value={VIEWS.GRID} sx={{ color: 'white' }}>
                        <ViewModuleIcon fontSize="small" />
                      </ToggleButton>
                      <ToggleButton value={VIEWS.TABLE} sx={{ color: 'white' }}>
                        <ViewColumnIcon fontSize="small" />
                      </ToggleButton>
                    </ToggleButtonGroup>
                    
                    <Button
                      variant="contained"
                      size="small"
                      startIcon={<RefreshIcon />}
                      onClick={handlePropertySearch}
                      sx={{ bgcolor: 'rgba(255,255,255,0.2)', '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' } }}
                    >
                      Refresh
                    </Button>
                  </div>
                </div>
                
                {viewMode === VIEWS.GRID ? (
                  <div className={styles.propertiesGrid}>
                    {searchResults.properties.map((property) => (
                      <div key={property.id} className={styles.propertyCard} onClick={() => setSinglePropertyResult(property)}>
                        <div className={styles.propertyCardHeader}>
                          <div className={styles.propertyId}>{property.id}</div>
                          <div className={styles.propertyAddress}>{property.address}</div>
                          <div className={styles.propertyOwner}>
                            <AccountBalanceIcon fontSize="small" color="action" />
                            {property.taxpayerName}
                          </div>
                        </div>
                        
                        <div className={styles.propertyCardBody}>
                          <div className={styles.propertyDetail}>
                            <div className={styles.propertyDetailLabel}>Classification</div>
                            <div className={styles.propertyDetailValue}>{property.classification}</div>
                          </div>
                          
                          <div className={styles.propertyDetail}>
                            <div className={styles.propertyDetailLabel}>Type</div>
                            <div className={styles.propertyDetailValue}>
                              <span className={property.propertyType === 'individual' ? styles.chipIndividual : styles.chipBusiness}>
                                {property.propertyType === 'individual' ? 'Individual' : 'Business'}
                              </span>
                            </div>
                          </div>
                          
                          <div className={styles.propertyDetail}>
                            <div className={styles.propertyDetailLabel}>Assessed Value</div>
                            <div className={styles.propertyDetailValue}>₦{property.assessedValue}</div>
                          </div>
                          
                          <div className={styles.propertyDetail}>
                            <div className={styles.propertyDetailLabel}>Status</div>
                            <div className={styles.propertyDetailValue}>
                              <span className={property.status === 'active' ? styles.chipActive : styles.chipInactive}>
                                {property.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className={styles.propertyCardFooter}>
                          <Button
                            variant="outlined"
                            size="small"
                            startIcon={<InfoIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              setSinglePropertyResult(property);
                            }}
                          >
                            Details
                          </Button>
                          
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            startIcon={<AddIcon />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleOpenBillDialog(property);
                            }}
                          >
                            Generate Bill
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.tableContainer}>
                    {!isMobile ? (
                      <table className={styles.table}>
                        <thead className={styles.tableHeader}>
                          <tr>
                            <th className={styles.tableHeaderCell} style={{ width: '40px' }}>
                              <Checkbox
                                size="small"
                                onChange={handleSelectAllBills}
                                checked={
                                  selectedBills.length > 0 &&
                                  selectedBills.length ===
                                    Math.min(
                                      historyPagination.rowsPerPage,
                                      filteredHistory.length - historyPagination.page * historyPagination.rowsPerPage
                                    )
                                }
                                indeterminate={
                                  selectedBills.length > 0 &&
                                  selectedBills.length <
                                    Math.min(
                                      historyPagination.rowsPerPage,
                                      filteredHistory.length - historyPagination.page * historyPagination.rowsPerPage
                                    )
                                }
                              />
                            </th>
                            <th className={styles.tableHeaderCell}>Bill ID</th>
                            <th className={styles.tableHeaderCell}>Property ID</th>
                            <th className={styles.tableHeaderCell}>Taxpayer</th>
                            <th className={styles.tableHeaderCell}>Address</th>
                            <th className={styles.tableHeaderCell}>Year</th>
                            <th className={styles.tableHeaderCell}>Amount (₦)</th>
                            <th className={styles.tableHeaderCell}>Generation Date</th>
                            <th className={styles.tableHeaderCell}>Status</th>
                            <th className={styles.tableHeaderCell} align="right">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredHistory
                            .slice(
                              historyPagination.page * historyPagination.rowsPerPage,
                              historyPagination.page * historyPagination.rowsPerPage + historyPagination.rowsPerPage
                            )
                            .map((bill, index) => (
                              <tr key={bill.id} className={`${styles.tableRow} ${index % 2 === 1 ? styles.tableRowAlternate : ''} ${selectedBills.includes(bill.id) ? styles.tableRowSelected : ''}`}>
                                <td className={styles.tableCell} style={{ width: '40px' }}>
                                  <Checkbox
                                    size="small"
                                    checked={selectedBills.includes(bill.id)}
                                    onChange={() => handleSelectBill(bill.id)}
                                    disabled={bill.status === BILL_STATUS.PAID}
                                  />
                                </td>
                                <td className={styles.tableCell}>{bill.id}</td>
                                <td className={styles.tableCell}>{bill.propertyId}</td>
                                <td className={styles.tableCell}>
                                  <div style={{ fontWeight: '500' }}>{bill.taxpayerName}</div>
                                  <div style={{ fontSize: '0.85rem', color: 'var(--gray-500)' }}>{bill.taxpayerId}</div>
                                </td>
                                <td className={styles.tableCell}>
                                  <div style={{ maxWidth: '220px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {bill.propertyAddress}
                                  </div>
                                </td>
                                <td className={styles.tableCell} style={{ fontWeight: '600' }}>{bill.year}</td>
                                <td className={styles.tableCell}>
                                  <strong style={{ color: 'var(--primary)' }}>₦{bill.amount}</strong>
                                </td>
                                <td className={styles.tableCell}>{bill.generatedDate}</td>
                                <td className={styles.tableCell}>
                                  <span className={bill.status === BILL_STATUS.PAID ? styles.chipActive : styles.chipInactive}>
                                    {bill.status}
                                  </span>
                                </td>
                                <td className={styles.tableCell}>
                                  <div className={styles.tableActions}>
                                    <IconButton
                                      size="small"
                                      onClick={() => handlePrintSingleBill(bill)}
                                      className={styles.buttonIcon}
                                      title="Print Bill"
                                    >
                                      <PrintIcon fontSize="small" />
                                    </IconButton>
                                    
                                    <IconButton
                                      size="small"
                                      onClick={() => handleOpenEditDialog(bill)}
                                      disabled={bill.status === BILL_STATUS.PAID}
                                      className={styles.buttonIcon}
                                      title="Edit Bill"
                                    >
                                      <EditIcon fontSize="small" />
                                    </IconButton>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    ) : (
                      // Mobile-friendly list view
                      <div className={styles.historyCardsGrid}>
                        {filteredHistory
                          .slice(
                            historyPagination.page * historyPagination.rowsPerPage,
                            historyPagination.page * historyPagination.rowsPerPage + historyPagination.rowsPerPage
                          )
                          .map((bill) => (
                            <div key={bill.id} className={`${styles.historyCard} ${selectedBills.includes(bill.id) ? styles.historyCardSelected : ''}`}>
                              <div className={styles.historyCardHeader}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                  <Checkbox
                                    size="small"
                                    checked={selectedBills.includes(bill.id)}
                                    onChange={() => handleSelectBill(bill.id)}
                                    disabled={bill.status === BILL_STATUS.PAID}
                                  />
                                  <div className={styles.historyCardTitle}>{bill.id}</div>
                                </div>
                                <span className={bill.status === BILL_STATUS.PAID ? styles.chipActive : styles.chipInactive}>
                                  {bill.status}
                                </span>
                              </div>
                              
                              <div className={styles.historyCardBody}>
                                <div className={styles.historyCardRow}>
                                  <span>Property</span>
                                  <span>{bill.propertyId}</span>
                                </div>
                                <div className={styles.historyCardRow}>
                                  <span>Taxpayer</span>
                                  <span>{bill.taxpayerName}</span>
                                </div>
                                <div className={styles.historyCardRow}>
                                  <span>Year</span>
                                  <strong>{bill.year}</strong>
                                </div>
                                <div className={styles.historyCardRow}>
                                  <span>Amount</span>
                                  <strong style={{ color: 'var(--primary)' }}>₦{bill.amount}</strong>
                                </div>
                                <div className={styles.historyCardRow}>
                                  <span>Date</span>
                                  <span>{bill.generatedDate}</span>
                                </div>
                              </div>
                              
                              <div className={styles.historyCardFooter}>
                                <Button
                                  size="small"
                                  variant="outlined"
                                  onClick={() => handlePrintSingleBill(bill)}
                                  startIcon={<PrintIcon fontSize="small" />}
                                  className={styles.buttonOutline}
                                >
                                  Print
                                </Button>
                                
                                <Button
                                  size="small"
                                  variant="contained"
                                  onClick={() => handleOpenEditDialog(bill)}
                                  disabled={bill.status === BILL_STATUS.PAID}
                                  startIcon={<EditIcon fontSize="small" />}
                                  className={styles.buttonPrimary}
                                >
                                  Edit
                                </Button>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
                
                {/* Pagination */}
                <div style={{ padding: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
                  <TablePagination
                    component="div"
                    count={filteredHistory.length}
                    page={historyPagination.page}
                    onPageChange={handleChangePage}
                    rowsPerPage={historyPagination.rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Bill Generation Dialog */}
      <Dialog
        open={billDialog.open}
        onClose={handleCloseBillDialog}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AddIcon color="primary" />
            <div>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Generate LUC Bill
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {billDialog.property?.address}
              </Typography>
            </div>
          </div>
        </DialogTitle>
        
        <DialogContent dividers>
          {billDialog.property && (
            <div className={styles.billGenerationForm}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Select Years for Bill Generation
              </Typography>
              
              <div className={styles.yearGrid}>
                {options.years.map(year => (
                  <div
                    key={year}
                    className={`${styles.yearCard} ${billDialog.selectedYears.includes(year) ? styles.yearCardSelected : ''}`}
                    onClick={() => handleYearSelection(year)}
                  >
                    <div className={styles.yearNumber}>{year}</div>
                    
                    {billDialog.selectedYears.includes(year) && (
                      <TextField
                        fullWidth
                        label="Amount (₦)"
                        value={billDialog.amounts[year] || ''}
                        onChange={(e) => handleAmountChange(year, e.target.value)}
                        variant="outlined"
                        size="small"
                        onClick={(e) => e.stopPropagation()}
                        sx={{ mt: 1 }}
                      />
                    )}
                  </div>
                ))}
              </div>
              
              {billDialog.selectedYears.length > 0 && (
                <Alert severity="info" icon={<InfoIcon fontSize="inherit" />}>
                  You have selected {billDialog.selectedYears.length} year(s) for bill generation.
                  Total amount: ₦{Object.values(billDialog.amounts).reduce((sum, amount) => sum + parseInt(amount || 0), 0).toLocaleString()}
                </Alert>
              )}
            </div>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseBillDialog} className={styles.buttonSecondary}>
            Cancel
          </Button>
          <Button 
            onClick={handleGenerateSingleBill}
            variant="contained"
            disabled={billDialog.selectedYears.length === 0}
            startIcon={<AddIcon />}
            className={styles.buttonPrimary}
          >
            Generate {billDialog.selectedYears.length} Bill{billDialog.selectedYears.length !== 1 ? 's' : ''}
          </Button>
        </DialogActions>
      </Dialog>
      
      {/* Bill Edit Dialog */}
      <Dialog 
        open={editBillDialog.open} 
        onClose={handleCloseEditDialog}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <EditIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Edit Bill Amount
            </Typography>
          </div>
        </DialogTitle>
        
        <DialogContent>
          {editBillDialog.bill && (
            <div style={{ marginTop: '1rem' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                <strong>Property:</strong> {editBillDialog.bill.propertyAddress}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                <strong>Year:</strong> {editBillDialog.bill.year}
              </Typography>
              
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Amount (₦)</label>
                <input
                  type="text"
                  className={styles.formControl}
                  value={editBillDialog.amount}
                  onChange={(e) => setEditBillDialog(prev => ({ ...prev, amount: e.target.value }))}
                />
              </div>
            </div>
          )}
        </DialogContent>
        
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseEditDialog} className={styles.buttonSecondary}>
            Cancel
          </Button>
          <Button onClick={handleEditBillAmount} className={styles.buttonPrimary}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BulkLUCGeneration; 