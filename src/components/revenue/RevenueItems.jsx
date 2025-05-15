import React, { useState, useEffect, useCallback } from 'react';
import {
  FiDollarSign, FiSearch, FiPlus, FiEdit2, FiTrash2, FiCheckCircle, FiXCircle,
  FiFileText, FiFilter, FiRefreshCw, FiLink
} from 'react-icons/fi';
import './RevenueHeads.css';

const RevenueItems = () => {
  const [revenueItems, setRevenueItems] = useState([]);
  const [filteredRevenueItems, setFilteredRevenueItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [revenueHeadFilter, setRevenueHeadFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingRevenueItem, setEditingRevenueItem] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    revenueHeadId: '',
    price: '',
    minPrice: '',
    maxPrice: '',
    unit: '',
    additionalFields: '',
    status: 'active'
  });

  // Mock revenue heads list - replace with API call
  const revenueHeads = [
    { id: 1, name: 'Personal Income Tax', code: 'PIT-001', category: 'State' },
    { id: 2, name: 'Company Income Tax', code: 'CIT-001', category: 'State' },
    { id: 3, name: 'Value Added Tax', code: 'VAT-001', category: 'State' },
    { id: 4, name: 'Property Tax', code: 'PRT-001', category: 'State' },
    { id: 5, name: 'Market Stall Fee', code: 'MSF-001', category: 'LGA' },
    { id: 6, name: 'Shop License Fee', code: 'SLF-001', category: 'LGA' },
    { id: 7, name: 'Business Premises Fee', code: 'BPF-001', category: 'LGA' }
  ];

  // Mock data - replace with API call
  const fetchRevenueItems = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        { id: 1, name: 'PAYE Monthly', code: 'PAYE-001', description: 'Monthly PAYE tax deduction', revenueHeadId: 1, revenueHead: 'Personal Income Tax', price: '0.00', minPrice: '0.00', maxPrice: '0.00', unit: 'Percentage', additionalFields: 'Income, Allowances, Deductions', status: 'active', lastUpdated: '2023-11-15T09:30:00Z' },
        { id: 2, name: 'PAYE Annual', code: 'PAYE-002', description: 'Annual PAYE tax filing', revenueHeadId: 1, revenueHead: 'Personal Income Tax', price: '0.00', minPrice: '0.00', maxPrice: '0.00', unit: 'Percentage', additionalFields: 'Annual Income, Total Allowances, Total Deductions', status: 'active', lastUpdated: '2023-11-12T14:15:00Z' },
        { id: 3, name: 'VAT Standard', code: 'VAT-001', description: 'Standard VAT at 7.5%', revenueHeadId: 3, revenueHead: 'Value Added Tax', price: '7.50', minPrice: '7.50', maxPrice: '7.50', unit: 'Percentage', additionalFields: 'Goods/Service Value', status: 'active', lastUpdated: '2023-11-10T11:00:00Z' },
        { id: 4, name: 'Small Market Stall', code: 'MSF-SM', description: 'Fee for small market stalls', revenueHeadId: 5, revenueHead: 'Market Stall Fee', price: '1500.00', minPrice: '1500.00', maxPrice: '1500.00', unit: 'Fixed', additionalFields: 'Market Location, Stall Number', status: 'active', lastUpdated: '2023-11-05T08:45:00Z' },
        { id: 5, name: 'Medium Market Stall', code: 'MSF-MD', description: 'Fee for medium market stalls', revenueHeadId: 5, revenueHead: 'Market Stall Fee', price: '2500.00', minPrice: '2500.00', maxPrice: '2500.00', unit: 'Fixed', additionalFields: 'Market Location, Stall Number', status: 'active', lastUpdated: '2023-10-20T13:30:00Z' },
        { id: 6, name: 'Small Shop License', code: 'SLF-SM', description: 'License fee for small shops', revenueHeadId: 6, revenueHead: 'Shop License Fee', price: '5000.00', minPrice: '5000.00', maxPrice: '5000.00', unit: 'Fixed', additionalFields: 'Shop Address, Business Type', status: 'active', lastUpdated: '2023-11-01T10:20:00Z' },
        { id: 7, name: 'Capital Gains Standard', code: 'CGT-001', description: 'Standard capital gains tax', revenueHeadId: 4, revenueHead: 'Property Tax', price: '10.00', minPrice: '10.00', maxPrice: '10.00', unit: 'Percentage', additionalFields: 'Asset Value, Acquisition Cost, Disposal Value', status: 'inactive', lastUpdated: '2023-08-15T15:10:00Z' },
      ];
      setRevenueItems(mockData);
      setFilteredRevenueItems(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchRevenueItems();
  }, [fetchRevenueItems]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetFormData = useCallback(() => {
    setFormData({
      name: '',
      code: '',
      description: '',
      revenueHeadId: '',
      price: '',
      minPrice: '',
      maxPrice: '',
      unit: 'Fixed',
      additionalFields: '',
      status: 'active'
    });
  }, []);

  const openAddModal = () => {
    setEditingRevenueItem(null);
    resetFormData();
    setShowModal(true);
  };

  const openEditModal = (revenueItem) => {
    setEditingRevenueItem(revenueItem);
    setFormData({
      name: revenueItem.name,
      code: revenueItem.code,
      description: revenueItem.description,
      revenueHeadId: revenueItem.revenueHeadId,
      price: revenueItem.price,
      minPrice: revenueItem.minPrice,
      maxPrice: revenueItem.maxPrice,
      unit: revenueItem.unit,
      additionalFields: revenueItem.additionalFields,
      status: revenueItem.status
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRevenueItem(null);
    resetFormData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Simulate API call
    
    // Find the revenue head name
    const selectedRevenueHead = revenueHeads.find(head => head.id === parseInt(formData.revenueHeadId));
    const revenueHeadName = selectedRevenueHead ? selectedRevenueHead.name : '';
    
    setTimeout(() => {
      if (editingRevenueItem) {
        setRevenueItems(prevItems => 
          prevItems.map(item => 
            item.id === editingRevenueItem.id ? 
            { ...item, ...formData, revenueHead: revenueHeadName, id: item.id, lastUpdated: new Date().toISOString() } : 
            item
          )
        );
      } else {
        const newRevenueItem = {
          id: revenueItems.length > 0 ? Math.max(...revenueItems.map(i => i.id)) + 1 : 1,
          ...formData,
          revenueHead: revenueHeadName,
          lastUpdated: new Date().toISOString()
        };
        setRevenueItems(prevItems => [...prevItems, newRevenueItem]);
      }
      handleFilter(); // Re-apply filters
      setLoading(false);
      closeModal();
    }, 500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this revenue item? This action cannot be undone.')) {
      setLoading(true); // Simulate API call
      setTimeout(() => {
        setRevenueItems(prevItems => prevItems.filter(item => item.id !== id));
        handleFilter(); // Re-apply filters
        setLoading(false);
      }, 500);
    }
  };

  const handleFilter = useCallback(() => {
    let filtered = revenueItems;
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply revenue head filter
    if (revenueHeadFilter !== 'all') {
      filtered = filtered.filter(item => item.revenueHeadId === parseInt(revenueHeadFilter));
    }
    
    setFilteredRevenueItems(filtered);
  }, [revenueItems, searchTerm, revenueHeadFilter]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter, searchTerm, revenueHeadFilter]);

  const formatCurrency = (amount) => {
    return `₦${parseFloat(amount).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
    } catch(e) {
      return dateString;
    }
  };

  return (
    <div className="revenue-heads-container">
      <div className="page-header">
        <h1><FiDollarSign className="page-header-icon" /> Revenue Items</h1>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search revenue items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-dropdown">
          <label htmlFor="revenueHeadFilter" className="filter-label">
            <FiLink /> Revenue Head:
          </label>
          <select
            id="revenueHeadFilter"
            value={revenueHeadFilter}
            onChange={(e) => setRevenueHeadFilter(e.target.value)}
          >
            <option value="all">All Revenue Heads</option>
            {revenueHeads.map(head => (
              <option key={head.id} value={head.id}>{head.name} ({head.category})</option>
            ))}
          </select>
        </div>

        <button className="add-button" onClick={openAddModal}>
          <FiPlus /> Add Revenue Item
        </button>
      </div>

      <div className="table-container">
        {loading && revenueItems.length === 0 ? (
          <div className="loading-indicator">
            <FiRefreshCw className="spinning" />
            <p>Loading revenue items...</p>
          </div>
        ) : filteredRevenueItems.length === 0 ? (
          <div className="no-results">
            <FiFileText size={48} style={{ marginBottom: '1rem', color: '#94a3b8' }}/>
            <p>No revenue items found.</p>
            {(searchTerm || revenueHeadFilter !== 'all') && <p>Try adjusting your search or filter criteria.</p>}
          </div>
        ) : (
          <table className="revenue-heads-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Revenue Head</th>
                <th>Price</th>
                <th>Unit</th>
                <th>Additional Fields</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRevenueItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className="revenue-name">
                      <span>{item.name}</span>
                      <small className="revenue-description">{item.description}</small>
                    </div>
                  </td>
                  <td>{item.code}</td>
                  <td>{item.revenueHead}</td>
                  <td>
                    {item.unit === 'Percentage' ? 
                      `${parseFloat(item.price).toFixed(2)}%` : 
                      formatCurrency(item.price)}
                    {item.minPrice !== item.maxPrice && (
                      <small className="range">
                        Range: {item.unit === 'Percentage' ? 
                          `${parseFloat(item.minPrice).toFixed(2)}% - ${parseFloat(item.maxPrice).toFixed(2)}%` : 
                          `${formatCurrency(item.minPrice)} - ${formatCurrency(item.maxPrice)}`}
                      </small>
                    )}
                  </td>
                  <td>{item.unit}</td>
                  <td>
                    <div className="additional-fields">
                      {item.additionalFields.split(',').map((field, index) => (
                        <span key={index} className="field-tag">{field.trim()}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <span className={`status-badge ${item.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                      {item.status === 'active' ? <FiCheckCircle /> : <FiXCircle />}
                      {item.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{formatDateTime(item.lastUpdated)}</td>
                  <td className="action-buttons">
                    <button className="edit-button" title="Edit" onClick={() => openEditModal(item)}>
                      <FiEdit2 />
                    </button>
                    <button className="delete-button" title="Delete" onClick={() => handleDelete(item.id)}>
                      <FiTrash2 />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <h2>
              {editingRevenueItem ? <><FiEdit2 /> Edit Revenue Item</> : <><FiPlus /> Add New Revenue Item</>}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Revenue Item Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="code">Item Code</label>
                  <input type="text" id="code" name="code" value={formData.code} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="revenueHeadId">Revenue Head</label>
                  <select id="revenueHeadId" name="revenueHeadId" value={formData.revenueHeadId} onChange={handleInputChange} required>
                    <option value="">Select Revenue Head</option>
                    {revenueHeads.map(head => (
                      <option key={head.id} value={head.id}>{head.name} ({head.category})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="unit">Unit</label>
                  <select id="unit" name="unit" value={formData.unit} onChange={handleInputChange} required>
                    <option value="Fixed">Fixed Amount</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Per Unit">Per Unit</option>
                    <option value="Range">Range</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="price">Price/Rate</label>
                  <input 
                    type="number" 
                    id="price" 
                    name="price" 
                    value={formData.price} 
                    onChange={handleInputChange} 
                    step="0.01"
                    min="0"
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="minPrice">Minimum Price/Rate</label>
                  <input 
                    type="number" 
                    id="minPrice" 
                    name="minPrice" 
                    value={formData.minPrice} 
                    onChange={handleInputChange} 
                    step="0.01"
                    min="0"
                    required 
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="maxPrice">Maximum Price/Rate</label>
                  <input 
                    type="number" 
                    id="maxPrice" 
                    name="maxPrice" 
                    value={formData.maxPrice} 
                    onChange={handleInputChange} 
                    step="0.01"
                    min="0"
                    required 
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="additionalFields">Additional Fields (comma separated)</label>
                <input 
                  type="text" 
                  id="additionalFields" 
                  name="additionalFields" 
                  value={formData.additionalFields} 
                  onChange={handleInputChange}
                  placeholder="e.g. Income, Business Type, Location"
                />
              </div>

              <div className="form-group">
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleInputChange} required>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
                <button type="submit" className="save-button">
                  {editingRevenueItem ? 'Update Revenue Item' : 'Add Revenue Item'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RevenueItems;