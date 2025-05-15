import React, { useState, useEffect, useCallback } from 'react';
import {
  FiUserCheck, FiSearch, FiFilter, FiCheckCircle, FiXCircle, FiClock, 
  FiUser, FiUsers, FiBriefcase, FiFileText, FiEye, FiCheckSquare, 
  FiAlertCircle, FiCalendar, FiHash
} from 'react-icons/fi';
import './TaxpayerVerification.css';

const TaxpayerVerification = () => {
  const [verificationRequests, setVerificationRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Mock data - replace with API call
  const fetchVerificationRequests = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const mockRequests = [
        { 
          id: 1, 
          requestId: 'VR-12345',
          requestType: 'individual',
          taxpayerName: 'Aisha Bello',
          tin: '1234567890',
          submittedDate: '2023-11-10T08:45:00Z',
          submittedBy: 'Self',
          documents: [
            { id: 1, type: 'National ID', status: 'verified', uploadDate: '2023-11-10T08:30:00Z', verifiedDate: '2023-11-12T14:20:00Z', verifiedBy: 'Admin User' },
            { id: 2, type: 'Proof of Address', status: 'rejected', uploadDate: '2023-11-10T08:35:00Z', rejectionReason: 'Document is illegible', verifiedDate: '2023-11-12T14:25:00Z', verifiedBy: 'Admin User' }
          ],
          status: 'pending',
          comments: 'New residence proof document required'
        },
        { 
          id: 2, 
          requestId: 'VR-67890',
          requestType: 'business',
          taxpayerName: 'Tech Innovate Ltd',
          tin: 'TIN12345678',
          submittedDate: '2023-11-15T10:30:00Z',
          submittedBy: 'Oluwaseun Adeyemi',
          documents: [
            { id: 3, type: 'CAC Certificate', status: 'verified', uploadDate: '2023-11-15T10:20:00Z', verifiedDate: '2023-11-16T09:15:00Z', verifiedBy: 'Verification Officer' },
            { id: 4, type: 'Tax Clearance', status: 'verified', uploadDate: '2023-11-15T10:25:00Z', verifiedDate: '2023-11-16T09:20:00Z', verifiedBy: 'Verification Officer' }
          ],
          status: 'approved',
          approvedDate: '2023-11-16T09:30:00Z',
          approvedBy: 'Verification Officer'
        },
        { 
          id: 3, 
          requestId: 'VR-24680',
          requestType: 'individual',
          taxpayerName: 'Chinedu Okoro',
          tin: '0987654321',
          submittedDate: '2023-11-18T14:15:00Z',
          submittedBy: 'Agent',
          documents: [
            { id: 5, type: 'National ID', status: 'pending', uploadDate: '2023-11-18T14:10:00Z' },
            { id: 6, type: 'Proof of Address', status: 'pending', uploadDate: '2023-11-18T14:12:00Z' }
          ],
          status: 'pending',
          comments: 'Awaiting document verification'
        },
        { 
          id: 4, 
          requestId: 'VR-13579',
          requestType: 'business',
          taxpayerName: 'Sunshine Farms Nigeria',
          tin: 'TIN87654321',
          submittedDate: '2023-11-05T11:20:00Z',
          submittedBy: 'Ibrahim Musa',
          documents: [
            { id: 7, type: 'CAC Certificate', status: 'rejected', uploadDate: '2023-11-05T11:15:00Z', rejectionReason: 'Expired document', verifiedDate: '2023-11-07T13:40:00Z', verifiedBy: 'Admin User' },
            { id: 8, type: 'Tax Clearance', status: 'rejected', uploadDate: '2023-11-05T11:18:00Z', rejectionReason: 'Incorrect information', verifiedDate: '2023-11-07T13:45:00Z', verifiedBy: 'Admin User' }
          ],
          status: 'rejected',
          rejectedDate: '2023-11-07T13:50:00Z',
          rejectedBy: 'Admin User',
          comments: 'Documents do not meet verification standards. Please resubmit with valid documents.'
        }
      ];
      setVerificationRequests(mockRequests);
      setFilteredRequests(mockRequests);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchVerificationRequests();
  }, [fetchVerificationRequests]);

  const handleSearch = useCallback(() => {
    const filtered = verificationRequests.filter(request => {
      const matchesSearch = 
        request.taxpayerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.tin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.requestId.toLowerCase().includes(searchTerm.toLowerCase());
        
      if (filter === 'all') return matchesSearch;
      return matchesSearch && request.status === filter;
    });
    
    setFilteredRequests(filtered);
  }, [verificationRequests, searchTerm, filter]);

  useEffect(() => {
    handleSearch();
  }, [handleSearch, searchTerm, filter]);

  const openDetailModal = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const closeDetailModal = () => {
    setShowDetailModal(false);
    setSelectedRequest(null);
  };

  const handleApprove = (requestId) => {
    if (window.confirm('Are you sure you want to approve this verification request?')) {
      setLoading(true);
      setTimeout(() => {
        setVerificationRequests(prevRequests => 
          prevRequests.map(request => 
            request.id === requestId ? 
            { 
              ...request, 
              status: 'approved', 
              approvedDate: new Date().toISOString(),
              approvedBy: 'Current User' // Replace with actual logged-in user
            } : 
            request
          )
        );
        
        handleSearch(); // Re-apply filters and search
        setLoading(false);
        if (selectedRequest?.id === requestId) {
          setSelectedRequest(prev => ({
            ...prev,
            status: 'approved',
            approvedDate: new Date().toISOString(),
            approvedBy: 'Current User' // Replace with actual logged-in user
          }));
        }
      }, 500);
    }
  };

  const handleReject = (requestId) => {
    const reason = window.prompt('Please provide a reason for rejection:');
    if (reason) {
      setLoading(true);
      setTimeout(() => {
        setVerificationRequests(prevRequests => 
          prevRequests.map(request => 
            request.id === requestId ? 
            { 
              ...request, 
              status: 'rejected', 
              rejectedDate: new Date().toISOString(),
              rejectedBy: 'Current User', // Replace with actual logged-in user
              comments: reason
            } : 
            request
          )
        );
        
        handleSearch(); // Re-apply filters and search
        setLoading(false);
        if (selectedRequest?.id === requestId) {
          setSelectedRequest(prev => ({
            ...prev,
            status: 'rejected',
            rejectedDate: new Date().toISOString(),
            rejectedBy: 'Current User', // Replace with actual logged-in user
            comments: reason
          }));
        }
      }, 500);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
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

  const StatusBadge = ({ status }) => {
    let icon, text, className;
    switch (status) {
      case 'approved':
        icon = <FiCheckCircle />;
        text = 'Approved';
        className = 'status-approved';
        break;
      case 'rejected':
        icon = <FiXCircle />;
        text = 'Rejected';
        className = 'status-rejected';
        break;
      case 'pending':
        icon = <FiClock />;
        text = 'Pending';
        className = 'status-pending';
        break;
      case 'verified':
        icon = <FiCheckSquare />;
        text = 'Verified';
        className = 'status-approved';
        break;
      default:
        icon = <FiAlertCircle />;
        text = status || 'Unknown';
        className = 'status-unknown';
    }
    return <span className={`status-badge ${className}`}>{icon}{text}</span>;
  };

  const RequestTypeIcon = ({ type }) => {
    return type === 'individual' ? 
      <FiUser className="request-type-icon individual" /> : 
      <FiBriefcase className="request-type-icon business" />;
  };

  return (
    <div className="verification-container">
      <div className="page-header">
        <h1><FiUserCheck className="page-header-icon" /> Taxpayer Verification</h1>
      </div>

      <div className="filter-actions">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, TIN, or request ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown">
          <label htmlFor="statusFilter" className="filter-label">
            <FiFilter /> Filter by Status:
          </label>
          <select
            id="statusFilter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        {loading && verificationRequests.length === 0 ? (
          <div className="loading-indicator">
            <FiClock className="spinning" />
            <p>Loading verification requests...</p>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="no-results">
            <FiAlertCircle />
            <p>No verification requests found.</p>
            {(searchTerm || filter !== 'all') && <p>Try changing your search or filter criteria.</p>}
          </div>
        ) : (
          <table className="verification-table">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Type</th>
                <th>Taxpayer</th>
                <th>TIN</th>
                <th>Submitted</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request) => (
                <tr key={request.id}>
                  <td>{request.requestId}</td>
                  <td>
                    <RequestTypeIcon type={request.requestType} />
                    <span className="request-type-text">
                      {request.requestType === 'individual' ? 'Individual' : 'Business'}
                    </span>
                  </td>
                  <td>{request.taxpayerName}</td>
                  <td>{request.tin}</td>
                  <td>{formatDate(request.submittedDate)}</td>
                  <td><StatusBadge status={request.status} /></td>
                  <td>
                    <div className="action-buttons">
                      <button
                        className="view-button"
                        onClick={() => openDetailModal(request)}
                        title="View Details"
                      >
                        <FiEye />
                      </button>
                      {request.status === 'pending' && (
                        <>
                          <button
                            className="approve-button"
                            onClick={() => handleApprove(request.id)}
                            title="Approve"
                          >
                            <FiCheckCircle />
                          </button>
                          <button
                            className="reject-button"
                            onClick={() => handleReject(request.id)}
                            title="Reject"
                          >
                            <FiXCircle />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showDetailModal && selectedRequest && (
        <div className="modal-backdrop" onClick={closeDetailModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>
              {selectedRequest.requestType === 'individual' ? <FiUser /> : <FiBriefcase />}
              Verification Request Details
            </h2>
            
            <div className="detail-header">
              <div className="detail-id">
                <FiHash className="detail-icon" />
                <span className="detail-label">Request ID:</span>
                <span className="detail-value">{selectedRequest.requestId}</span>
              </div>
              <StatusBadge status={selectedRequest.status} />
            </div>

            <div className="detail-section">
              <h3><FiFileText /> Taxpayer Information</h3>
              <div className="detail-grid">
                <div className="detail-item">
                  <span className="detail-label">Name:</span>
                  <span className="detail-value">{selectedRequest.taxpayerName}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">TIN:</span>
                  <span className="detail-value">{selectedRequest.tin}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{selectedRequest.requestType === 'individual' ? 'Individual' : 'Business'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Submitted By:</span>
                  <span className="detail-value">{selectedRequest.submittedBy}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Submitted Date:</span>
                  <span className="detail-value">{formatDateTime(selectedRequest.submittedDate)}</span>
                </div>
              </div>
            </div>

            <div className="detail-section">
              <h3><FiFileText /> Documents</h3>
              <table className="documents-table">
                <thead>
                  <tr>
                    <th>Document Type</th>
                    <th>Upload Date</th>
                    <th>Status</th>
                    <th>Verification Date</th>
                    <th>Verified By</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRequest.documents.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.type}</td>
                      <td>{formatDateTime(doc.uploadDate)}</td>
                      <td><StatusBadge status={doc.status} /></td>
                      <td>{formatDateTime(doc.verifiedDate)}</td>
                      <td>{doc.verifiedBy || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {selectedRequest.status === 'rejected' && (
              <div className="detail-section rejection-section">
                <h3><FiAlertCircle /> Rejection Details</h3>
                <div className="rejection-details">
                  <div className="detail-item">
                    <span className="detail-label">Rejected By:</span>
                    <span className="detail-value">{selectedRequest.rejectedBy || 'System'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Rejected Date:</span>
                    <span className="detail-value">{formatDateTime(selectedRequest.rejectedDate)}</span>
                  </div>
                  <div className="detail-item full-width">
                    <span className="detail-label">Reason:</span>
                    <span className="detail-value comments">{selectedRequest.comments || 'No reason provided'}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedRequest.status === 'approved' && (
              <div className="detail-section approval-section">
                <h3><FiCheckCircle /> Approval Details</h3>
                <div className="approval-details">
                  <div className="detail-item">
                    <span className="detail-label">Approved By:</span>
                    <span className="detail-value">{selectedRequest.approvedBy || 'System'}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Approved Date:</span>
                    <span className="detail-value">{formatDateTime(selectedRequest.approvedDate)}</span>
                  </div>
                </div>
              </div>
            )}

            {selectedRequest.comments && selectedRequest.status === 'pending' && (
              <div className="detail-section comments-section">
                <h3><FiFileText /> Comments</h3>
                <div className="comments-container">
                  <p>{selectedRequest.comments}</p>
                </div>
              </div>
            )}

            {selectedRequest.status === 'pending' && (
              <div className="modal-actions verification-actions">
                <button type="button" className="cancel-button" onClick={closeDetailModal}>
                  Cancel
                </button>
                <div className="approval-buttons">
                  <button 
                    className="reject-button full-button" 
                    onClick={() => handleReject(selectedRequest.id)}
                  >
                    <FiXCircle />Reject
                  </button>
                  <button 
                    className="approve-button full-button" 
                    onClick={() => handleApprove(selectedRequest.id)}
                  >
                    <FiCheckCircle />Approve
                  </button>
                </div>
              </div>
            )}
            
            {selectedRequest.status !== 'pending' && (
              <div className="modal-actions">
                <button type="button" className="close-button" onClick={closeDetailModal}>
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaxpayerVerification; 