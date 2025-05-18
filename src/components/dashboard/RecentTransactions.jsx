import React, { useState, useEffect } from 'react';
import { Table } from '../common/ui';
import { FaExchangeAlt, FaArrowRight, FaCheck, FaClock, FaTimes } from 'react-icons/fa';
import styles from './Dashboard.module.css';

const RecentTransactions = ({ period }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulating API call to fetch recent transactions
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        // Simulated Niger State specific transactions data
        const mockTransactions = [
          {
            id: 'TXN-2023-12-001',
            date: '2023-12-01',
            taxpayer: 'Niger State University',
            amount: 3250000,
            revenueHead: 'PAYE Remittance',
            status: 'Completed',
            paymentMethod: 'Bank Transfer'
          },
          {
            id: 'TXN-2023-12-002',
            date: '2023-12-01',
            taxpayer: 'Minna Mining Ltd',
            amount: 1875000,
            revenueHead: 'Mining Royalty',
            status: 'Completed',
            paymentMethod: 'Remita'
          },
          {
            id: 'TXN-2023-12-003',
            date: '2023-12-02',
            taxpayer: 'Bida Rice Farmers Association',
            amount: 950000,
            revenueHead: 'Agricultural Produce Tax',
            status: 'Completed',
            paymentMethod: 'Remita'
          },
          {
            id: 'TXN-2023-12-004',
            date: '2023-12-02',
            taxpayer: 'Suleja Market Traders Association',
            amount: 685000,
            revenueHead: 'Market Fee',
            status: 'Pending',
            paymentMethod: 'Bank Deposit'
          },
          {
            id: 'TXN-2023-12-005',
            date: '2023-12-03',
            taxpayer: 'Kontagora Transport Union',
            amount: 520000,
            revenueHead: 'Motor Park Fee',
            status: 'Completed',
            paymentMethod: 'USSD'
          },
        ];
        
        // Add a slight delay to simulate network request
        setTimeout(() => {
          setTransactions(mockTransactions);
          setIsLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setIsLoading(false);
      }
    };
    
    fetchTransactions();
  }, [period]);
  
  // Format amount as currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  // Get status icon
  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <FaCheck />;
      case 'pending':
        return <FaClock />;
      case 'failed':
        return <FaTimes />;
      default:
        return null;
    }
  };
  
  // Get the status badge class
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return styles.statusSuccess;
      case 'pending':
        return styles.statusWarning;
      case 'failed':
        return styles.statusDanger;
      default:
        return '';
    }
  };
  
  // Calculate total amount
  const calculateTotal = () => {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
  };
  
  // Table columns configuration
  const columns = [
    {
      header: 'Transaction ID',
      accessor: 'id',
      cell: (row) => (
        <div className={styles.transactionId}>
          {row.id}
        </div>
      )
    },
    {
      header: 'Date',
      accessor: 'date',
      cell: (row) => <div className={styles.transactionDate}>{formatDate(row.date)}</div>
    },
    {
      header: 'Taxpayer',
      accessor: 'taxpayer',
      cell: (row) => (
        <div className={styles.transactionTaxpayer} title={row.taxpayer}>
          {row.taxpayer}
        </div>
      )
    },
    {
      header: 'Revenue Head',
      accessor: 'revenueHead',
      cell: (row) => (
        <div className={styles.transactionRevenue}>{row.revenueHead}</div>
      )
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cell: (row) => (
        <div className={styles.transactionAmount}>
          {formatCurrency(row.amount)}
        </div>
      ),
      align: 'right'
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <div className={`${styles.transactionStatus} ${getStatusBadgeClass(row.status)}`}>
          {getStatusIcon(row.status)} {row.status}
        </div>
      ),
      align: 'center'
    }
  ];
  
  return (
    <>
      <div className={styles.sectionHeader}>
        <h3 className={styles.cardContentTitle}>
          <FaExchangeAlt /> Recent Transactions
        </h3>
        {!isLoading && transactions.length > 0 && (
          <div className={styles.transactionSummary}>
            <div className={styles.transactionTotal}>
              {formatCurrency(calculateTotal())}
            </div>
            <div className={styles.transactionTotalLabel}>
              Total Value
            </div>
          </div>
        )}
      </div>
      
      {/* <div className={styles.tableWrapper}> */}
        <Table
          columns={columns}
          data={transactions}
          loading={isLoading}
          hoverable={true}
          striped={false}
          bordered={false}
          size="sm"
          emptyMessage="No recent transactions found"
          className={styles.customTable}
          paginated={false}
        />
      {/* </div> */}
      
      <div className={styles.viewAllLink}>
        <a href="/dashboard/transactions">
          View All Transactions <FaArrowRight />
        </a>
      </div>
    </>
  );
};

export default RecentTransactions; 