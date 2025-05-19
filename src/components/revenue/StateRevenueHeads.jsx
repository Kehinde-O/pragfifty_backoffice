import React, { useState, useEffect, useCallback } from 'react';
import {
  FiDollarSign, FiSearch, FiPlus, FiEdit2, FiTrash2, FiCheckCircle, FiXCircle,
  FiFileText, FiFilter, FiRefreshCw
} from 'react-icons/fi';
import styles from './StateRevenueHeads.module.css';

const StateRevenueHeads = () => {
  const [revenueHeads, setRevenueHeads] = useState([]);
  const [filteredRevenueHeads, setFilteredRevenueHeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingRevenueHead, setEditingRevenueHead] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    type: 'Tax',
    baseAmount: '',
    pricingLogic: 'Fixed',
    glAccountCode: '',
    status: 'active'
  });

  // Mock data - replace with API call
  const fetchRevenueHeads = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const mockData = [
        { id: 1, name: 'Personal Income Tax', code: 'PIT-001', description: 'Tax on individual income', type: 'Tax', baseAmount: '75000.00', pricingLogic: 'Variable', glAccountCode: 'GL-10001', status: 'active', lastUpdated: '2023-11-15T09:30:00Z' },
        { id: 2, name: 'Company Income Tax', code: 'CIT-001', description: 'Tax on company profits', type: 'Tax', baseAmount: '250000.00', pricingLogic: 'Variable', glAccountCode: 'GL-10002', status: 'active', lastUpdated: '2023-11-12T14:15:00Z' },
        { id: 3, name: 'Value Added Tax', code: 'VAT-001', description: '7.5% consumption tax on goods and services', type: 'Tax', baseAmount: '0.00', pricingLogic: 'Percentage', glAccountCode: 'GL-10003', status: 'active', lastUpdated: '2023-11-10T11:00:00Z' },
        { id: 4, name: 'Capital Gains Tax', code: 'CGT-001', description: 'Tax on profit from sale of assets', type: 'Tax', baseAmount: '10000.00', pricingLogic: 'Variable', glAccountCode: 'GL-10004', status: 'inactive', lastUpdated: '2023-09-05T08:45:00Z' },
        { id: 5, name: 'Property Tax', code: 'PRT-001', description: 'Annual tax on property ownership', type: 'Tax', baseAmount: '25000.00', pricingLogic: 'Fixed', glAccountCode: 'GL-10005', status: 'active', lastUpdated: '2023-10-20T13:30:00Z' },
        { id: 6, name: 'Business Premises Levy', code: 'BPL-001', description: 'Levy for business premises', type: 'Levy', baseAmount: '15000.00', pricingLogic: 'Fixed', glAccountCode: 'GL-10006', status: 'active', lastUpdated: '2023-11-01T10:20:00Z' },
        { id: 7, name: 'Entertainment Tax', code: 'ENT-001', description: 'Tax on entertainment venues and events', type: 'Tax', baseAmount: '5000.00', pricingLogic: 'Percentage', glAccountCode: 'GL-10007', status: 'inactive', lastUpdated: '2023-08-15T15:10:00Z' },
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
      type: 'Tax',
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
    
    setFilteredRevenueHeads(filtered);
  }, [revenueHeads, searchTerm, typeFilter]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter, searchTerm, typeFilter]);

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
    <div className={styles.revenueHeadsContainer}>
      <div className={styles.pageHeader}>
        <h1><FiDollarSign className={styles.pageHeaderIcon} /> State Revenue Heads</h1>
      </div>

      <div className={styles.headerActions}>
        <div className={styles.searchBox}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search state revenue heads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className={styles.filterDropdown}>
          <label htmlFor="typeFilter" className={styles.filterLabel}>
            <FiFilter /> Type:
          </label>
          <select
            id="typeFilter"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Tax">Tax</option>
            <option value="Levy">Levy</option>
            <option value="Fee">Fee</option>
          </select>
        </div>

        <button className={styles.addButton} onClick={openAddModal}>
          <FiPlus /> Add State Revenue Head
        </button>
      </div>

      <div className={styles.tableContainer}>
        {loading && revenueHeads.length === 0 ? (
          <div className={styles.loadingIndicator}>
            <FiRefreshCw className={styles.spinning} />
            <p>Loading state revenue heads...</p>
          </div>
        ) : filteredRevenueHeads.length === 0 ? (
          <div className={styles.noResults}>
            <FiFileText size={48} style={{ marginBottom: '1rem', color: '#94a3b8' }}/>
            <p>No state revenue heads found.</p>
            {(searchTerm || typeFilter !== 'all') && <p>Try adjusting your search or filter criteria.</p>}
          </div>
        ) : (
          <table className={styles.revenueHeadsTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Type</th>
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
                    <div className={styles.itemName}>
                      <span className={styles.itemNameText}>{revenueHead.name}</span>
                      <small className={styles.itemDescription}>{revenueHead.description}</small>
                    </div>
                  </td>
                  <td>{revenueHead.code}</td>
                  <td>{revenueHead.type}</td>
                  <td>{revenueHead.pricingLogic}</td>
                  <td>{formatCurrency(revenueHead.baseAmount)}</td>
                  <td>{revenueHead.glAccountCode}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${revenueHead.status === 'active' ? styles.statusActive : styles.statusInactive}`}>
                      {revenueHead.status === 'active' ? <FiCheckCircle /> : <FiXCircle />}
                      {revenueHead.status === 'active' ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td>{formatDateTime(revenueHead.lastUpdated)}</td>
                  <td className={styles.actionButtons}>
                    <button className={styles.editButton} title="Edit" onClick={() => openEditModal(revenueHead)}>
                      <FiEdit2 />
                    </button>
                    <button className={styles.deleteButton} title="Delete" onClick={() => handleDelete(revenueHead.id)}>
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
              {editingRevenueHead ? <><FiEdit2 /> Edit State Revenue Head</> : <><FiPlus /> Add New State Revenue Head</>}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Revenue Head Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="code">Revenue Code</label>
                  <input type="text" id="code" name="code" value={formData.code} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="type">Type</label>
                  <select id="type" name="type" value={formData.type} onChange={handleInputChange} required>
                    <option value="Tax">Tax</option>
                    <option value="Levy">Levy</option>
                    <option value="Fee">Fee</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} required />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="pricingLogic">Pricing Logic</label>
                  <select id="pricingLogic" name="pricingLogic" value={formData.pricingLogic} onChange={handleInputChange} required>
                    <option value="Fixed">Fixed</option>
                    <option value="Variable">Variable</option>
                    <option value="Percentage">Percentage</option>
                    <option value="Formula">Formula</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
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

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="glAccountCode">GL Account Code</label>
                  <input type="text" id="glAccountCode" name="glAccountCode" value={formData.glAccountCode} onChange={handleInputChange} required />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="status">Status</label>
                  <select id="status" name="status" value={formData.status} onChange={handleInputChange} required>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button type="button" className={styles.cancelButton} onClick={closeModal}>Cancel</button>
                <button type="submit" className={styles.saveButton}>
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

export default StateRevenueHeads; 