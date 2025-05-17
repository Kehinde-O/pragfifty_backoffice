import React, { useState, useEffect } from 'react';
import { Card, Table } from '../common/ui';

const RecentTransactions = () => {
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
        }, 1200);
      } catch (error) {
        console.error('Error fetching transactions:', error);
        setIsLoading(false);
      }
    };
    
    fetchTransactions();
  }, []);
  
  // Format amount as currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  // Get the status badge class
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'badge-approved';
      case 'pending':
        return 'badge-pending';
      case 'failed':
        return 'badge-rejected';
      default:
        return '';
    }
  };
  
  // Table columns configuration
  const columns = [
    {
      header: 'Transaction ID',
      accessor: 'id',
      cell: (row) => (
        <a href={`/dashboard/transactions/${row.id}`} className="card-link">
          {row.id}
        </a>
      )
    },
    {
      header: 'Date',
      accessor: 'date',
      cell: (row) => new Date(row.date).toLocaleDateString('en-NG')
    },
    {
      header: 'Taxpayer',
      accessor: 'taxpayer'
    },
    {
      header: 'Revenue Head',
      accessor: 'revenueHead'
    },
    {
      header: 'Amount',
      accessor: 'amount',
      cell: (row) => formatCurrency(row.amount)
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (row) => (
        <span className={`status-badge ${getStatusBadgeClass(row.status)}`}>
          {row.status}
        </span>
      )
    }
  ];
  
  return (
    <Card>
      <div className="section-header">
        <h2 className="section-title">Recent Transactions</h2>
        <div className="section-actions">
          <a href="/dashboard/transactions" className="card-link">
            View All
          </a>
        </div>
      </div>
      
      <Table
        columns={columns}
        data={transactions}
        isLoading={isLoading}
        emptyMessage="No recent transactions found"
      />
    </Card>
  );
};

export default RecentTransactions; 