import React from 'react';
import { FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import './RecentTransactions.css';

const RecentTransactions = ({ transactions }) => {
  // Function to render status indicator
  const renderStatus = (status) => {
    switch(status) {
      case 'successful':
        return <span className="status successful"><FiCheckCircle /> Successful</span>;
      case 'failed':
        return <span className="status failed"><FiXCircle /> Failed</span>;
      case 'pending':
        return <span className="status pending"><FiClock /> Pending</span>;
      default:
        return <span className="status">{status}</span>;
    }
  };

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div className="transactions-container">
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Reference</th>
            <th>Taxpayer</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.taxpayer}</td>
              <td>{transaction.type}</td>
              <td className="amount">{formatCurrency(transaction.amount)}</td>
              <td>{formatDate(transaction.date)}</td>
              <td>{renderStatus(transaction.status)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentTransactions; 