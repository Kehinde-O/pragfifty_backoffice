import React, { useState, useEffect, useCallback } from 'react';
import {
  FiDollarSign, FiSearch, FiPlus, FiEdit2, FiTrash2, FiCheckCircle, FiXCircle,
  FiFileText, FiFilter, FiRefreshCw, FiMapPin
} from 'react-icons/fi';
import './RevenueHeads.css';

const LgaRevenueHeads = () => {
  const [revenueHeads, setRevenueHeads] = useState([]);
  const [filteredRevenueHeads, setFilteredRevenueHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [lgaFilter, setLgaFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingRevenueHead, setEditingRevenueHead] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    type: 'Fee',
    lga: '',
    baseAmount: '',
    pricingLogic: 'Fixed',
    glAccountCode: '',
    status: 'active'
  });

  // Mock LGA list - replace with API call
  const lgas = [
    { id: 1, name: 'Agaie' },
    { id: 2, name: 'Agwara' },
    { id: 3, name: 'Bida' },
    { id: 4, name: 'Borgu' },
    { id: 5, name: 'Bosso' },
    { id: 6, name: 'Chanchaga' },
    { id: 7, name: 'Edati' },
    { id: 8, name: 'Gbako' },
    { id: 9, name: 'Katcha' },
    { id: 10, name: 'Kontagora' }
  ];

  // Mock data - replace with API call
  const fetchRevenueHeads = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        { id: 1, name: 'Market Stall Fee', code: 'MSF-001', description: 'Fee for market stalls', type: 'Fee', lga: 'Bida', baseAmount: '1500.00', pricingLogic: 'Fixed', glAccountCode: 'GL-20001', status: 'active', lastUpdated: '2023-11-15T09:30:00Z' },
        { id: 2, name: 'Shop License Fee', code: 'SLF-001', description: 'Annual shop license fee', type: 'Fee', lga: 'Chanchaga', baseAmount: '5000.00', pricingLogic: 'Fixed', glAccountCode: 'GL-20002', status: 'active', lastUpdated: '2023-11-12T14:15:00Z' },
        { id: 3, name: 'Signage Fee', code: 'SGF-001', description: 'Fee for business signage', type: 'Fee', lga: 'Kontagora', baseAmount: '3000.00', pricingLogic: 'Fixed', glAccountCode: 'GL-20003', status: 'active', lastUpdated: '2023-11-10T11:00:00Z' },
        { id: 4, name: 'Radio/TV License', code: 'RTL-001', description: 'Annual radio and TV license', type: 'License', lga: 'Bida', baseAmount: '2000.00', pricingLogic: 'Fixed', glAccountCode: 'GL-20004', status: 'inactive', lastUpdated: '2023-09-05T08:45:00Z' },
        { id: 5, name: 'Business Premises Fee', code: 'BPF-001', description: 'Fee for business premises', type: 'Fee', lga: 'Bosso', baseAmount: '7500.00', pricingLogic: 'Variable', glAccountCode: 'GL-20005', status: 'active', lastUpdated: '2023-10-20T13:30:00Z' },
        { id: 6, name: 'Kiosk/Container Fee', code: 'KCF-001', description: 'Fee for kiosks and containers', type: 'Fee', lga: 'Agaie', baseAmount: '1000.00', pricingLogic: 'Fixed', glAccountCode: 'GL-20006', status: 'active', lastUpdated: '2023-11-01T10:20:00Z' },
        { id: 7, name: 'Marriage Registration', code: 'MGR-001', description: 'Fee for marriage registration', type: 'Fee', lga: 'Chanchaga', baseAmount: '5000.00', pricingLogic: 'Fixed', glAccountCode: 'GL-20007', status: 'active', lastUpdated: '2023-08-15T15:10:00Z' },
      ];
      setRevenueHeads(mockData);
      setFilteredRevenueHeads(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchRevenueHeads();
  }, [fetchRevenueHeads]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetFormData = useCallback(() => {
    setFormData({
      name: '',
      code: '',
      description: '',
      type: 'Fee',
      lga: '',
      baseAmount: '',
      pricingLogic: 'Fixed',
      glAccountCode: '',
      status: 'active'
    });
  }, []);

  const openAddModal = () => {
    setEditingRevenueHead(null);
    resetFormData();
    setShowModal(true);
  };

  const openEditModal = (revenueHead) => {
    setEditingRevenueHead(revenueHead);
    setFormData({
      name: revenueHead.name,
      code: revenueHead.code,
      description: revenueHead.description,
      type: revenueHead.type,
      lga: revenueHead.lga,
      baseAmount: revenueHead.baseAmount,
      pricingLogic: revenueHead.pricingLogic,
      glAccountCode: revenueHead.glAccountCode,
      status: revenueHead.status
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingRevenueHead(null);
    resetFormData();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Simulate API call
    setTimeout(() => {
      if (editingRevenueHead) {
        setRevenueHeads(prevHeads => 
          prevHeads.map(head => 
            head.id === editingRevenueHead.id ? 
            { ...head, ...formData, id: head.id, lastUpdated: new Date().toISOString() } : 
            head
          )
        );
      } else {
        const newRevenueHead = {
          id: revenueHeads.length > 0 ? Math.max(...revenueHeads.map(h => h.id)) + 1 : 1,
          ...formData,
          lastUpdated: new Date().toISOString()
        };
        setRevenueHeads(prevHeads => [...prevHeads, newRevenueHead]);
      }
      handleFilter(); // Re-apply filters
      setLoading(false);
      closeModal();
    }, 500);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this revenue head? This action cannot be undone.')) {
      setLoading(true); // Simulate API call
      setTimeout(() => {
        setRevenueHeads(prevHeads => prevHeads.filter(head => head.id !== id));
        handleFilter(); // Re-apply filters
        setLoading(false);
      }, 500);
    }
  };

  const handleFilter = useCallback(() => {
    let filtered = revenueHeads;
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(head => 
        head.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        head.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        head.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(head => head.type === typeFilter);
    }
    
    // Apply LGA filter
    if (lgaFilter !== 'all') {
      filtered = filtered.filter(head => head.lga === lgaFilter);
    }
    
    setFilteredRevenueHeads(filtered);
  }, [revenueHeads, searchTerm, typeFilter, lgaFilter]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter, searchTerm, typeFilter, lgaFilter]);

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
        <h1><FiDollarSign className="page-header-icon" /> LGA Revenue Heads</h1>
      </div>

      <div className="header-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search LGA revenue heads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-dropdown">
          <label htmlFor="lgaFilter" className="filter-label">
            <FiMapPin /> LGA:
          </label>
          <select
            id="lgaFilter"
            value={lgaFilter}
            onChange={(e) => setLgaFilter(e.target.value)}
          >
            <option value="all">All LGAs</option>
            {lgas.map(lga => (
              <option key={lga.id} value={lga.name}>{lga.name}</option>
            ))}
          </select>
        </div>

        <div className="filter-dropdown">
          <label htmlFor="typeFilter" className="filter-label">
            <FiFilter /> Type:
          </label>
          <select
            id="typeFilter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Fee">Fee</option>
            <option value="License">License</option>
            <option value="Permit">Permit</option>
          </select>
        </div>

        <button className="add-button" onClick={openAddModal}>
          <FiPlus /> Add LGA Revenue Head
        </button>
      </div>

      <div className="table-container">
        {loading && revenueHeads.length === 0 ? (
          <div className="loading-indicator">
            <FiRefreshCw className="spinning" />
            <p>Loading LGA revenue heads...</p>
          </div>
        ) : filteredRevenueHeads.length === 0 ? (
          <div className="no-results">
            <FiFileText size={48} style={{ marginBottom: '1rem', color: '#94a3b8' }}/>
            <p>No LGA revenue heads found.</p>
            {(searchTerm || typeFilter !== 'all' || lgaFilter !== 'all') && <p>Try adjusting your search or filter criteria.</p>}
          </div>
        ) : (
          <table className="revenue-heads-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Type</th>
                <th>LGA</th>
                <th>Pricing Logic</th>
                <th>Base Amount</th>
                <th>GL Account</th>
                <th>Status</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRevenueHeads.map(revenueHead => (
                <tr key={revenueHead.id}>
                  <td>
                    <div className="revenue-name">
                      <span>{revenueHead.name}</span>
                      <small className="revenue-description">{revenueHead.description}</small>
                    </div>
                  </td>
                  <td>{revenueHead.code}</td>
                  <td>{revenueHead.type}</td>
                  <td>{revenueHead.lga}</td>
                  <td>{revenueHead.pricingLogic}</td>
                  <td>{formatCurrency(revenueHead.baseAmount)}</td>
                  <td>{revenueHead.glAccountCode}</td>
                  <td>
                    <span className={`status-badge ${revenueHead.status === 'active' ? 'status-active' : 'status-inactive'}`}>
                      {revenueHead.status === 'active' ? <FiCheckCircle /> : <FiXCircle />}
                      {revenueHead.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{formatDateTime(revenueHead.lastUpdated)}</td>
                  <td className="action-buttons">
                    <button className="edit-button" title="Edit" onClick={() => openEditModal(revenueHead)}>
                      <FiEdit2 />
                    </button>
                    <button className="delete-button" title="Delete" onClick={() => handleDelete(revenueHead.id)}>
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
              {editingRevenueHead ? <><FiEdit2 /> Edit LGA Revenue Head</> : <><FiPlus /> Add New LGA Revenue Head</>}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Revenue Head Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="code">Revenue Code</label>
                  <input type="text" id="code" name="code" value={formData.code} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Type</label>
                  <select id="type" name="type" value={formData.type} onChange={handleInputChange} required>
                    <option value="Fee">Fee</option>
                    <option value="License">License</option>
                    <option value="Permit">Permit</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="lga">LGA</label>
                <select id="lga" name="lga" value={formData.lga} onChange={handleInputChange} required>
                  <option value="">Select LGA</option>
                  {lgas.map(lga => (
                    <option key={lga.id} value={lga.name}>{lga.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="pricingLogic">Pricing Logic</label>
                  <select id="pricingLogic" name="pricingLogic" value={formData.pricingLogic} onChange={handleInputChange} required>
                    <option value="Fixed">Fixed</option>
                    <option value="Variable">Variable</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Formula">Formula</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="baseAmount">Base Amount (₦)</label>
                  <input 
                    type="number" 
                    id="baseAmount" 
                    name="baseAmount" 
                    value={formData.baseAmount} 
                    onChange={handleInputChange} 
                    step="0.01"
                    min="0"
                    required 
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="glAccountCode">GL Account Code</label>
                  <input type="text" id="glAccountCode" name="glAccountCode" value={formData.glAccountCode} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select id="status" name="status" value={formData.status} onChange={handleInputChange} required>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions">
                <button type="button" className="cancel-button" onClick={closeModal}>Cancel</button>
                <button type="submit" className="save-button">
                  {editingRevenueHead ? 'Update Revenue Head' : 'Add Revenue Head'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LgaRevenueHeads; 