import React, { useState, useEffect, useCallback } from 'react';
import {
  FiDollarSign, FiSearch, FiPlus, FiEdit2, FiTrash2, FiCheckCircle, FiXCircle,
  FiFileText, FiFilter, FiRefreshCw, FiLink
} from 'react-icons/fi';
import styles from './RevenueItems.module.css';

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
    <div className={styles.revenueItemsContainer}>
      <div className={styles.pageHeader}>
        <h1><FiDollarSign className={styles.pageHeaderIcon} /> Revenue Items</h1>
      </div>

      <div className={styles.headerActions}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search revenue items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterControls}>
          <div className={styles.filterGroup}>
            <label htmlFor="revenueHeadFilter" className={styles.filterLabel}>
              <FiLink /> Revenue Head:
            </label>
            <select
              id="revenueHeadFilter"
              value={revenueHeadFilter}
              onChange={(e) => setRevenueHeadFilter(e.target.value)}
            >
              <option value="all">All Revenue Heads</option>
              {revenueHeads.map(head => (
                <option key={head.id} value={head.id}>{head.name}</option>
              ))}
            </select>
          </div>
        </div>

        <button className={styles.addButton} onClick={openAddModal}>
          <FiPlus /> Add Revenue Item
        </button>
      </div>

      <div className={styles.tableContainer}>
        {loading && revenueItems.length === 0 ? (
          <div className={styles.loadingIndicator}>
            <FiRefreshCw className={styles.spinning} />
            <p>Loading revenue items...</p>
          </div>
        ) : filteredRevenueItems.length === 0 ? (
          <div className={styles.noResults}>
            <FiFileText size={48} style={{ marginBottom: '1rem', color: '#94a3b8' }}/>
            <p>No revenue items found.</p>
            {(searchTerm || revenueHeadFilter !== 'all') && <p>Try adjusting your search or filter criteria.</p>}
          </div>
        ) : (
          <table className={styles.revenueItemsTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Revenue Head</th>
                <th>Price/Rate</th>
                <th>Unit</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRevenueItems.map(item => (
                <tr key={item.id}>
                  <td>
                    <div className={styles.itemName}>
                      <span className={styles.itemNameText}>{item.name}</span>
                      <small className={styles.itemDescription}>{item.description}</small>
                    </div>
                  </td>
                  <td>{item.code}</td>
                  <td>{item.revenueHead}</td>
                  <td className={styles.price}>
                    {item.unit === 'Percentage' ? `${item.price}%` : formatCurrency(item.price)}
                    {(item.unit === 'Range' && (item.minPrice !== item.price || item.maxPrice !== item.price)) && (
                      <span className={styles.range}>
                        <small>{formatCurrency(item.minPrice)} - {formatCurrency(item.maxPrice)}</small>
                      </span>
                    )}
                  </td>
                  <td>{item.unit}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${item.status === 'active' ? styles.statusActive : styles.statusInactive}`}>
                      {item.status === 'active' ? <FiCheckCircle /> : <FiXCircle />}
                      {item.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{formatDateTime(item.lastUpdated)}</td>
                  <td className={styles.actionButtons}>
                    <button className={styles.editButton} title="Edit" onClick={() => openEditModal(item)}>
                      <FiEdit2 />
                    </button>
                    <button className={styles.deleteButton} title="Delete" onClick={() => handleDelete(item.id)}>
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
        <div className={styles.modalBackdrop}>
          <div className={styles.modalContent}>
            <h2>
              {editingRevenueItem ? <><FiEdit2 /> Edit Revenue Item</> : <><FiPlus /> Add New Revenue Item</>}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Item Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="code">Item Code</label>
                  <input type="text" id="code" name="code" value={formData.code} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="revenueHeadId">Revenue Head</label>
                  <select 
                    id="revenueHeadId" 
                    name="revenueHeadId" 
                    value={formData.revenueHeadId} 
                    onChange={handleInputChange} 
                    required
                  >
                    <option value="">Select Revenue Head</option>
                    {revenueHeads.map(head => (
                      <option key={head.id} value={head.id}>{head.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="unit">Unit</label>
                  <select id="unit" name="unit" value={formData.unit} onChange={handleInputChange} required>
                    <option value="Fixed">Fixed</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Range">Range</option>
                  </select>
                </div>
                
                {formData.unit === 'Range' ? (
                  <>
                    <div className={styles.formGroup}>
                      <label htmlFor="minPrice">Min Price (₦)</label>
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
                    <div className={styles.formGroup}>
                      <label htmlFor="maxPrice">Max Price (₦)</label>
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
                  </>
                ) : (
                  <div className={styles.formGroup}>
                    <label htmlFor="price">{formData.unit === 'Percentage' ? 'Rate (%)' : 'Price (₦)'}</label>
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
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="additionalFields">Additional Required Fields (comma separated)</label>
                <input type="text" id="additionalFields" name="additionalFields" value={formData.additionalFields} onChange={handleInputChange} />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="status">Status</label>
                <select id="status" name="status" value={formData.status} onChange={handleInputChange} required>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={closeModal}>Cancel</button>
                <button type="submit" className={styles.saveButton}>
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