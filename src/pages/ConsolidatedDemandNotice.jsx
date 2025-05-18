import React, { useState, useEffect } from 'react';
import {
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Box,
  MenuItem,
  Select,
  FormControl,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
  Tooltip
} from '@mui/material';
import {
  Search as SearchIcon,
  Print as PrintIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
  Filter as FilterIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import Swal from 'sweetalert2';
import styles from './ConsolidatedDemandNotice.module.css';

const ConsolidatedDemandNotice = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState('unclassified');
  
  // State for search form
  const [searchParams, setSearchParams] = useState({
    odtin: '',
    orgName: '',
    phone: '',
  });
  
  // State for data tables
  const [unclassifiedData, setUnclassifiedData] = useState([]);
  const [classifiedData, setClassifiedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // State for classification options
  const [sectors, setSectors] = useState([]);
  
  // State for form values of unclassified entities
  const [formValues, setFormValues] = useState({});

  // State for sorting table data
  const [sortConfig, setSortConfig] = useState({
    key: 'name',
    direction: 'asc'
  });
  
  // Initialize or update form values when unclassifiedData changes
  useEffect(() => {
    const newFormValues = {};
    unclassifiedData.forEach(item => {
      if (!formValues[item.id]) {
        // Initialize if not exist
        newFormValues[item.id] = {
          classification: '',
          valueCategory: '',
          address: item.address || '',
          city: item.city || ''
        };
      } else {
        // Keep existing values
        newFormValues[item.id] = { ...formValues[item.id] };
      }
    });
    setFormValues(newFormValues);
  }, [unclassifiedData]);
  
  // Mock function to load classification options (replace with actual API call)
  useEffect(() => {
    // This would typically come from an API
    const mockSectors = [
      { 
        sector: "Manufacturing", 
        subcategories: [
          { sectorSubCategory: "Food Production" },
          { sectorSubCategory: "Textiles" }
        ] 
      },
      { 
        sector: "Services", 
        subcategories: [
          { sectorSubCategory: "Financial Services" },
          { sectorSubCategory: "Healthcare" }
        ] 
      },
      { 
        sector: "Technology", 
        subcategories: [
          { sectorSubCategory: "Software Development" },
          { sectorSubCategory: "Hardware Manufacturing" }
        ] 
      },
      { 
        sector: "Retail", 
        subcategories: [
          { sectorSubCategory: "Online Retail" },
          { sectorSubCategory: "Physical Stores" }
        ] 
      }
    ];
    
    setSectors(mockSectors);
  }, []);
  
  // Handler for search inputs
  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handler for search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (activeTab === 'unclassified') {
      loadUnclassifiedData();
    } else {
      loadClassifiedData();
    }
  };
  
  // Handler for form input changes
  const handleFormChange = (id, field, value) => {
    setFormValues(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };
  
  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Sort data based on current sort configuration
  const getSortedData = (data) => {
    if (!sortConfig.key) return data;
    
    return [...data].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      
      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };
  
  // Mock function to load unclassified data (replace with actual API call)
  const loadUnclassifiedData = () => {
    // Simulate API call
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: "ABC Corporation",
          phone: "08012345678",
          email: "info@abccorp.com",
          odtin: "ODTIN12345",
          address: "123 Main Street",
          city: "Lagos",
          lga: "Ikeja",
          classification: "",
          valueCategory: ""
        },
        {
          id: 2,
          name: "XYZ Enterprises",
          phone: "08098765432",
          email: "contact@xyzent.com",
          odtin: "ODTIN67890",
          address: "456 Oak Avenue",
          city: "Abuja",
          lga: "Central",
          classification: "",
          valueCategory: ""
        }
      ];
      
      setUnclassifiedData(mockData);
      setIsLoading(false);
    }, 1000);
  };
  
  // Mock function to load classified data (replace with actual API call)
  const loadClassifiedData = () => {
    // Simulate API call
    setTimeout(() => {
      const mockData = [
        {
          id: 1,
          name: "Acme Industries",
          phone: "07011223344",
          email: "hello@acme.com",
          odtin: "ODTIN11111",
          address: "789 Industrial Way",
          city: "Port Harcourt",
          lga: "Rivers East",
          classification: "Manufacturing",
          valueCategory: "URBAN HIGH VALUE",
          rsn: "1001"
        },
        {
          id: 2,
          name: "Global Services Ltd",
          phone: "09087654321",
          email: "info@globalservices.com",
          odtin: "ODTIN22222",
          address: "321 Service Road",
          city: "Kano",
          lga: "Kano Municipal",
          classification: "Services",
          valueCategory: "URBAN MEDIUM VALUE",
          rsn: "1002"
        }
      ];
      
      setClassifiedData(mockData);
      setIsLoading(false);
    }, 1000);
  };
  
  // Handler for reset button
  const handleReset = () => {
    setSearchParams({
      odtin: '',
      orgName: '',
      phone: '',
    });
    
    if (activeTab === 'unclassified') {
      loadUnclassifiedData();
    } else {
      loadClassifiedData();
    }
  };
  
  // Handler for saving classification
  const handleClassify = (id) => {
    const item = formValues[id];
    if (!item) return;
    
    Swal.fire({
      title: 'Processing...',
      text: 'Saving classification data',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    
    // Simulate API call
    setTimeout(() => {
      // Remove item from unclassified data
      setUnclassifiedData(prev => prev.filter(item => item.id !== id));
      
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Classification saved successfully'
      });
    }, 1500);
  };
  
  // Handler for removing classification
  const handleUnclassify = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will remove the classification from this entity.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // Simulate API call
        Swal.fire({
          title: 'Processing...',
          text: 'Removing classification',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
        
        setTimeout(() => {
          // Remove item from classified data
          setClassifiedData(prev => prev.filter(item => item.id !== id));
          
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Classification removed successfully'
          });
        }, 1500);
      }
    });
  };
  
  // Load initial data
  useEffect(() => {
    if (activeTab === 'unclassified') {
      loadUnclassifiedData();
    } else {
      loadClassifiedData();
    }
  }, [activeTab]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Render sort icons for table headers
  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUpwardIcon fontSize="small" sx={{ fontSize: 16, ml: 0.5 }} /> 
      : <ArrowDownwardIcon fontSize="small" sx={{ fontSize: 16, ml: 0.5 }} />;
  };
  
  return (
    <Box className={styles.container}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" className={styles.pageTitle}>
          Consolidated Demand Notice
        </Typography>
        <Typography variant="body1" className={styles.pageSubtitle}>
          Manage and generate consolidated demand notices for entities
        </Typography>
      </Box>
      
      <Paper elevation={2} sx={{ borderRadius: '0.75rem', overflow: 'hidden' }}>
        <Box className={styles.tabs}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab 
              label="Unclassified Entities" 
              value="unclassified" 
              className={styles.tab}
              classes={{ selected: styles.tabSelected }}
            />
            <Tab 
              label="Classified Entities" 
              value="classified" 
              className={styles.tab}
              classes={{ selected: styles.tabSelected }}
            />
          </Tabs>
        </Box>
        
        <Box sx={{ p: 3 }}>
          {/* Search Card */}
          <Paper className={styles.searchCard} elevation={0}>
            <Box className={styles.searchCardHeader}>
              <Typography variant="h6" className={styles.searchCardTitle}>
                <FilterIcon fontSize="small" sx={{ mr: 1, verticalAlign: 'middle' }} />
                Search Records
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSearch} className={styles.searchCardContent}>
              <div className={styles.formGrid}>
                <TextField
                  fullWidth
                  label="ODTIN"
                  placeholder="Enter ODTIN"
                  name="odtin"
                  value={searchParams.odtin}
                  onChange={handleSearchChange}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Organization Name"
                  placeholder="Enter Organization Name"
                  name="orgName"
                  value={searchParams.orgName}
                  onChange={handleSearchChange}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  fullWidth
                  label="Phone Number"
                  placeholder="Enter Phone Number"
                  name="phone"
                  value={searchParams.phone}
                  onChange={handleSearchChange}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </div>
              <div className={styles.formActions}>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isLoading}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <SearchIcon />}
                  className={styles.searchButton}
                >
                  {isLoading ? 'Searching...' : 'Search'}
                </Button>
                <Button
                  variant="outlined"
                  type="button"
                  onClick={handleReset}
                  startIcon={<RefreshIcon />}
                  className={styles.resetButton}
                >
                  Reset
                </Button>
              </div>
            </Box>
          </Paper>
          
          {/* Content based on active tab */}
          {activeTab === 'unclassified' ? (
            <TableContainer component={Paper} className={styles.tableContainer}>
              <Table size="small">
                <TableHead className={styles.tableHeader}>
                  <TableRow>
                    <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('name')} sx={{ cursor: 'pointer' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Name {renderSortIcon('name')}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('phone')} sx={{ cursor: 'pointer' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Phone {renderSortIcon('phone')}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('email')} sx={{ cursor: 'pointer' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Email {renderSortIcon('email')}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('odtin')} sx={{ cursor: 'pointer' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        ODTIN {renderSortIcon('odtin')}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell}>Address</TableCell>
                    <TableCell className={styles.tableHeaderCell}>City</TableCell>
                    <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('lga')} sx={{ cursor: 'pointer' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        LGA {renderSortIcon('lga')}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Classification
                        <Tooltip title="Select appropriate business sector classification" arrow>
                          <InfoIcon fontSize="small" sx={{ ml: 0.5, fontSize: 16, color: '#94a3b8' }} />
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Value Category
                        <Tooltip title="Select based on location and value assessment" arrow>
                          <InfoIcon fontSize="small" sx={{ ml: 0.5, fontSize: 16, color: '#94a3b8' }} />
                        </Tooltip>
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={10} align="center">
                        <div className={styles.loadingContainer}>
                          <CircularProgress size={40} sx={{ color: '#2563eb' }} />
                          <Typography variant="body2" sx={{ mt: 2, color: '#6b7280' }}>Loading data...</Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : unclassifiedData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} align="center">
                        <div className={styles.emptyState}>
                          <Typography variant="body1">No unclassified entities found</Typography>
                          <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>Try a different search or reset filters</Typography>
                          <Button 
                            variant="outlined" 
                            size="small" 
                            startIcon={<RefreshIcon />}
                            onClick={handleReset}
                          >
                            Reset Filters
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    getSortedData(unclassifiedData).map(item => {
                      const itemForm = formValues[item.id] || {
                        classification: '',
                        valueCategory: '',
                        address: item.address || '',
                        city: item.city || ''
                      };
                      
                      return (
                        <TableRow key={item.id} className={styles.tableRow}>
                          <TableCell className={styles.tableCell}>{item.name}</TableCell>
                          <TableCell className={styles.tableCell}>{item.phone}</TableCell>
                          <TableCell className={styles.tableCell}>{item.email}</TableCell>
                          <TableCell className={styles.tableCell}>{item.odtin}</TableCell>
                          <TableCell className={styles.tableCell}>
                            <TextField
                              fullWidth
                              value={itemForm.address}
                              onChange={(e) => handleFormChange(item.id, 'address', e.target.value)}
                              size="small"
                              variant="outlined"
                              placeholder="Enter address"
                            />
                          </TableCell>
                          <TableCell className={styles.tableCell}>
                            <TextField
                              fullWidth
                              value={itemForm.city}
                              onChange={(e) => handleFormChange(item.id, 'city', e.target.value)}
                              size="small"
                              variant="outlined"
                              placeholder="Enter city"
                            />
                          </TableCell>
                          <TableCell className={styles.tableCell}>{item.lga}</TableCell>
                          <TableCell className={styles.tableCell}>
                            <FormControl fullWidth size="small">
                              <Select
                                value={itemForm.classification}
                                onChange={(e) => handleFormChange(item.id, 'classification', e.target.value)}
                                displayEmpty
                              >
                                <MenuItem value="">
                                  <em>Select Classification</em>
                                </MenuItem>
                                {sectors.map(sector => (
                                  <MenuItem key={sector.sector} value={sector.sector}>
                                    {sector.sector}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell className={styles.tableCell}>
                            <FormControl fullWidth size="small">
                              <Select
                                value={itemForm.valueCategory}
                                onChange={(e) => handleFormChange(item.id, 'valueCategory', e.target.value)}
                                displayEmpty
                              >
                                <MenuItem value="">
                                  <em>Select Category</em>
                                </MenuItem>
                                <MenuItem value="URBAN HIGH VALUE">URBAN HIGH VALUE</MenuItem>
                                <MenuItem value="URBAN MEDIUM VALUE">URBAN MEDIUM VALUE</MenuItem>
                                <MenuItem value="URBAN LOW VALUE">URBAN LOW VALUE</MenuItem>
                                <MenuItem value="RURAL HIGH VALUE">RURAL HIGH VALUE</MenuItem>
                                <MenuItem value="RURAL MEDIUM VALUE">RURAL MEDIUM VALUE</MenuItem>
                                <MenuItem value="RURAL LOW VALUE">RURAL LOW VALUE</MenuItem>
                              </Select>
                            </FormControl>
                          </TableCell>
                          <TableCell className={styles.tableCell}>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={!itemForm.classification || !itemForm.valueCategory}
                              onClick={() => handleClassify(item.id)}
                              startIcon={<SaveIcon />}
                              className={`${styles.actionButton} ${styles.saveButton} ${(!itemForm.classification || !itemForm.valueCategory) ? styles.saveButtonDisabled : ''}`}
                              disableElevation
                            >
                              Save
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <TableContainer component={Paper} className={styles.tableContainer}>
              <Table size="small">
                <TableHead className={styles.tableHeader}>
                  <TableRow>
                    <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('name')} sx={{ cursor: 'pointer' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Name {renderSortIcon('name')}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('phone')} sx={{ cursor: 'pointer' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Phone {renderSortIcon('phone')}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('email')} sx={{ cursor: 'pointer' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Email {renderSortIcon('email')}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('odtin')} sx={{ cursor: 'pointer' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        ODTIN {renderSortIcon('odtin')}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell}>Address</TableCell>
                    <TableCell className={styles.tableHeaderCell}>City</TableCell>
                    <TableCell className={styles.tableHeaderCell} onClick={() => requestSort('lga')} sx={{ cursor: 'pointer' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        LGA {renderSortIcon('lga')}
                      </Box>
                    </TableCell>
                    <TableCell className={styles.tableHeaderCell}>Classification</TableCell>
                    <TableCell className={styles.tableHeaderCell}>Value Category</TableCell>
                    <TableCell className={styles.tableHeaderCell}>Action</TableCell>
                    <TableCell className={styles.tableHeaderCell}>Print CDN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={11} align="center">
                        <div className={styles.loadingContainer}>
                          <CircularProgress size={40} sx={{ color: '#2563eb' }} />
                          <Typography variant="body2" sx={{ mt: 2, color: '#6b7280' }}>Loading data...</Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : classifiedData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} align="center">
                        <div className={styles.emptyState}>
                          <Typography variant="body1">No classified entities found</Typography>
                          <Typography variant="body2" sx={{ mt: 1, mb: 2 }}>Try a different search or reset filters</Typography>
                          <Button 
                            variant="outlined" 
                            size="small" 
                            startIcon={<RefreshIcon />}
                            onClick={handleReset}
                          >
                            Reset Filters
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ) : (
                    getSortedData(classifiedData).map(item => (
                      <TableRow key={item.id} className={styles.tableRow}>
                        <TableCell className={styles.tableCell}>{item.name}</TableCell>
                        <TableCell className={styles.tableCell}>{item.phone}</TableCell>
                        <TableCell className={styles.tableCell}>{item.email}</TableCell>
                        <TableCell className={styles.tableCell}>{item.odtin}</TableCell>
                        <TableCell className={styles.tableCell}>{item.address}</TableCell>
                        <TableCell className={styles.tableCell}>{item.city}</TableCell>
                        <TableCell className={styles.tableCell}>{item.lga}</TableCell>
                        <TableCell className={styles.tableCell}>
                          <span className={`${styles.chip} ${styles.classificationChip}`}>
                            {item.classification}
                          </span>
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                          <span className={`${styles.chip} ${styles.categoryChip}`}>
                            {item.valueCategory}
                          </span>
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                          <Button
                            variant="outlined"
                            size="small"
                            onClick={() => handleUnclassify(item.id)}
                            startIcon={<DeleteIcon />}
                            className={`${styles.actionButton} ${styles.removeButton}`}
                          >
                            Remove
                          </Button>
                        </TableCell>
                        <TableCell className={styles.tableCell}>
                          <Button
                            variant="contained"
                            size="small"
                            href={`/api/printlucbill?request=singleCDN&peoplersn=${item.rsn}`}
                            target="_blank"
                            startIcon={<PrintIcon />}
                            className={`${styles.actionButton} ${styles.printButton}`}
                            disableElevation
                          >
                            Print
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ConsolidatedDemandNotice; 