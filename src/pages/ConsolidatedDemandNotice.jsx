import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
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
  InputLabel,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
  Chip
} from '@mui/material';
import {
  Search as SearchIcon,
  Print as PrintIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import axios from 'axios';
import Swal from 'sweetalert2';
import './ConsolidatedDemandNotice.css';

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
  
  // Initialize or update form values when unclassifiedData changes
  useEffect(() => {
    const newFormValues = {};
    unclassifiedData.forEach(item => {
      if (!formValues[item.id]) {
        // Initialize if not exist
        newFormValues[item.id] = {
          classification: '',
          valueCategory: '',
          address: item.address,
          city: item.city
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
  
  return (
    <Box className="cdn-container" sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          Consolidated Demand Notice
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage and generate consolidated demand notices for entities
        </Typography>
      </Box>
      
      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            indicatorColor="primary"
            textColor="primary"
            sx={{ 
              '& .MuiTab-root': { 
                fontWeight: 600, 
                py: 2,
                px: 3
              } 
            }}
          >
            <Tab label="Unclassified Entities" value="unclassified" />
            <Tab label="Classified Entities" value="classified" />
          </Tabs>
        </Box>
        
        <Box sx={{ p: 3 }}>
          {/* Search Card */}
          <Paper elevation={0} variant="outlined" sx={{ mb: 4, borderRadius: 2 }}>
            <Box sx={{ p: 2, bgcolor: 'background.default', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>Search Records</Typography>
            </Box>
            <Divider />
            <Box component="form" onSubmit={handleSearch} sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={3}>
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
                </Grid>
                <Grid item xs={12} md={3}>
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
                </Grid>
                <Grid item xs={12} md={3}>
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
                </Grid>
                <Grid item xs={12} md={3} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box sx={{ display: 'flex', gap: 1, width: '100%' }}>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isLoading}
                      startIcon={isLoading ? <CircularProgress size={20} /> : <SearchIcon />}
                      sx={{ flex: 1 }}
                    >
                      {isLoading ? 'Searching' : 'Search'}
                    </Button>
                    <Button
                      variant="outlined"
                      type="button"
                      onClick={handleReset}
                      startIcon={<RefreshIcon />}
                      sx={{ flex: 1 }}
                    >
                      Reset
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
          
          {/* Content based on active tab */}
          {activeTab === 'unclassified' ? (
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'background.default' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>ODTIN</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>City</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>LGA</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Classification</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Value Category</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
                        <CircularProgress size={40} />
                        <Typography variant="body2" sx={{ mt: 2 }}>Loading data...</Typography>
                      </TableCell>
                    </TableRow>
                  ) : unclassifiedData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={10} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1">No unclassified entities found</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    unclassifiedData.map(item => {
                      const itemForm = formValues[item.id] || {
                        classification: '',
                        valueCategory: '',
                        address: item.address,
                        city: item.city
                      };
                      
                      return (
                        <TableRow key={item.id} hover>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.phone}</TableCell>
                          <TableCell>{item.email}</TableCell>
                          <TableCell>{item.odtin}</TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              value={itemForm.address}
                              onChange={(e) => handleFormChange(item.id, 'address', e.target.value)}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              value={itemForm.city}
                              onChange={(e) => handleFormChange(item.id, 'city', e.target.value)}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell>{item.lga}</TableCell>
                          <TableCell>
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
                          <TableCell>
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
                          <TableCell>
                            <Button
                              variant="contained"
                              size="small"
                              disabled={!itemForm.classification || !itemForm.valueCategory}
                              onClick={() => handleClassify(item.id)}
                              startIcon={<SaveIcon />}
                              color="primary"
                              sx={{ whiteSpace: 'nowrap' }}
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
            <TableContainer component={Paper} variant="outlined" sx={{ borderRadius: 2 }}>
              <Table sx={{ minWidth: 650 }} size="small">
                <TableHead>
                  <TableRow sx={{ bgcolor: 'background.default' }}>
                    <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>ODTIN</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Address</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>City</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>LGA</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Classification</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Value Category</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Action</TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>Print CDN</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoading ? (
                    <TableRow>
                      <TableCell colSpan={11} align="center" sx={{ py: 4 }}>
                        <CircularProgress size={40} />
                        <Typography variant="body2" sx={{ mt: 2 }}>Loading data...</Typography>
                      </TableCell>
                    </TableRow>
                  ) : classifiedData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={11} align="center" sx={{ py: 4 }}>
                        <Typography variant="body1">No classified entities found</Typography>
                      </TableCell>
                    </TableRow>
                  ) : (
                    classifiedData.map(item => (
                      <TableRow key={item.id} hover>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.phone}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.odtin}</TableCell>
                        <TableCell>{item.address}</TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell>{item.lga}</TableCell>
                        <TableCell>
                          <Chip 
                            label={item.classification} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={item.valueCategory} 
                            size="small"
                            color="secondary"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => handleUnclassify(item.id)}
                            startIcon={<DeleteIcon />}
                            sx={{ whiteSpace: 'nowrap' }}
                          >
                            Remove
                          </Button>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            href={`/api/printlucbill?request=singleCDN&peoplersn=${item.rsn}`}
                            target="_blank"
                            startIcon={<PrintIcon />}
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