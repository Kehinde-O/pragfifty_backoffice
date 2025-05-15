import React, { useState } from 'react';
import { 
  Button, 
  Card, 
  Select, 
  Table, 
  StatsCard, 
  Container, 
  Pagination 
} from './ui';
import { 
  FiDollarSign, 
  FiUsers, 
  FiClipboard, 
  FiAlertCircle,
  FiPieChart,
  FiPlus,
  FiEdit,
  FiTrash2,
  FiEye
} from 'react-icons/fi';

const DesignSystemDemo = () => {
  // Demo state
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedOption, setSelectedOption] = useState('');

  // Mock data for the demo
  const stats = [
    { 
      title: 'Total Revenue', 
      value: '₦25,436,789.50', 
      icon: <FiDollarSign />, 
      change: '7.8%', 
      changeType: 'positive',
      color: 'primary',
      animationStyle: 'pulse'
    },
    { 
      title: 'Registered Users', 
      value: '12,675', 
      icon: <FiUsers />, 
      change: '12.3%', 
      changeType: 'positive',
      color: 'success',
      animationStyle: 'fade'
    },
    { 
      title: 'Pending Assessments', 
      value: '843', 
      icon: <FiClipboard />, 
      change: '2.5%', 
      changeType: 'negative',
      color: 'warning',
      animationStyle: 'slide'
    },
    { 
      title: 'Flagged Transactions', 
      value: '24', 
      icon: <FiAlertCircle />, 
      change: '5.3%', 
      changeType: 'negative',
      color: 'danger',
      animationStyle: 'pulse'
    }
  ];

  const tableData = [
    { id: 'TXN-001234', taxpayer: 'John Doe', type: 'Personal Income Tax', amount: 150000.00, date: '2023-11-15', status: 'successful' },
    { id: 'TXN-001235', taxpayer: 'Acme Corporation', type: 'Corporate Tax', amount: 750000.00, date: '2023-11-14', status: 'successful' },
    { id: 'TXN-001236', taxpayer: 'Jane Smith', type: 'Property Tax', amount: 65000.00, date: '2023-11-14', status: 'failed' },
    { id: 'TXN-001237', taxpayer: 'Tech Innovations Ltd', type: 'Corporate Tax', amount: 525000.00, date: '2023-11-13', status: 'pending' },
    { id: 'TXN-001238', taxpayer: 'Ibrahim Hassan', type: 'Vehicle Tax', amount: 35000.00, date: '2023-11-13', status: 'successful' }
  ];

  const tableColumns = [
    { header: 'Transaction ID', accessor: 'id' },
    { header: 'Taxpayer', accessor: 'taxpayer' },
    { header: 'Type', accessor: 'type' },
    { 
      header: 'Amount', 
      accessor: 'amount',
      align: 'right',
      cell: (row) => `₦${row.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
    },
    { header: 'Date', accessor: 'date' },
    { 
      header: 'Status', 
      accessor: 'status',
      cell: (row) => (
        <span className={`status status-${row.status}`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      )
    },
    {
      header: 'Actions',
      cell: () => (
        <div className="table-actions">
          <Button variant="text" size="xs" startIcon={<FiEye />}>View</Button>
          <Button variant="text" size="xs" startIcon={<FiEdit />}>Edit</Button>
          <Button variant="text" size="xs" startIcon={<FiTrash2 />}>Delete</Button>
        </div>
      )
    }
  ];

  const selectOptions = [
    { value: 'personal', label: 'Personal Income Tax' },
    { value: 'corporate', label: 'Corporate Tax' },
    { value: 'property', label: 'Property Tax' },
    { value: 'vehicle', label: 'Vehicle Tax' },
    { value: 'other', label: 'Other Taxes' }
  ];

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <Container>
      <h1>Design System Demo</h1>
      
      <section className="demo-section">
        <h2>Stats Cards</h2>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatsCard
              key={index}
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              change={stat.change}
              changeType={stat.changeType}
              color={stat.color}
              animationStyle={stat.animationStyle}
            />
          ))}
        </div>
      </section>
      
      <section className="demo-section">
        <h2>Buttons</h2>
        <div className="button-grid">
          <div>
            <h3>Variants</h3>
            <div className="demo-buttons">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
              <Button variant="info">Info</Button>
              <Button variant="outlined">Outlined</Button>
              <Button variant="text">Text</Button>
            </div>
          </div>
          
          <div>
            <h3>Sizes</h3>
            <div className="demo-buttons">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>
          
          <div>
            <h3>With Icons</h3>
            <div className="demo-buttons">
              <Button startIcon={<FiPlus />}>Add New</Button>
              <Button endIcon={<FiEye />}>View Details</Button>
              <Button variant="danger" startIcon={<FiTrash2 />}>Delete</Button>
            </div>
          </div>
          
          <div>
            <h3>States</h3>
            <div className="demo-buttons">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </div>
        </div>
      </section>
      
      <section className="demo-section">
        <h2>Cards</h2>
        <div className="cards-grid">
          <Card title="Simple Card" subtitle="This is a basic card">
            <p>This is the body content of a basic card. Cards can contain any content you need.</p>
          </Card>
          
          <Card 
            title="Card with Actions" 
            subtitle="This card has action buttons"
            actions={
              <div className="card-actions">
                <Button variant="text" size="sm" startIcon={<FiEdit />}>Edit</Button>
              </div>
            }
          >
            <p>This is a card with actions in the header. Actions are usually buttons or icons.</p>
          </Card>
          
          <Card 
            title="Card with Footer"
            footer={
              <div className="card-footer-actions">
                <Button variant="outlined" size="sm">Cancel</Button>
                <Button size="sm">Save</Button>
              </div>
            }
          >
            <p>This is a card with a footer section. Footers are great for action buttons.</p>
          </Card>
          
          <Card 
            title="Card Variants" 
            subtitle="Different card styles"
            variant="outline"
            elevation="sm"
          >
            <p>Cards can have different variants (default, outline, flat) and elevations (none, sm, md, lg).</p>
          </Card>
        </div>
      </section>
      
      <section className="demo-section">
        <h2>Select Component</h2>
        <div className="select-demo">
          <Select
            id="tax-type"
            label="Tax Type"
            value={selectedOption}
            onChange={handleSelectChange}
            options={selectOptions}
            placeholder="Select a tax type"
            required
          />
          
          <div className="select-sizes">
            <Select
              label="Small Select"
              size="sm"
              options={selectOptions}
              placeholder="Small"
            />
            
            <Select
              label="Medium Select"
              size="md"
              options={selectOptions}
              placeholder="Medium"
            />
            
            <Select
              label="Large Select"
              size="lg"
              options={selectOptions}
              placeholder="Large"
            />
          </div>
          
          <Select
            label="Disabled Select"
            options={selectOptions}
            placeholder="Disabled"
            disabled
          />
          
          <Select
            label="Select with Error"
            options={selectOptions}
            placeholder="Error state"
            error="This field is required"
          />
        </div>
      </section>
      
      <section className="demo-section">
        <h2>Table Component</h2>
        <Table
          columns={tableColumns}
          data={tableData}
          paginated
          currentPage={currentPage}
          totalPages={5}
          onPageChange={setCurrentPage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={setRowsPerPage}
          rowsPerPageOptions={[5, 10, 25, 50]}
          striped
          hoverable
          bordered
        />
      </section>
      
      <section className="demo-section">
        <h2>Pagination Component</h2>
        <Card>
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={setCurrentPage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={setRowsPerPage}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
          />
        </Card>
      </section>
      
      <style jsx>{`
        h1 {
          font-size: 2rem;
          margin-bottom: 2rem;
          color: var(--color-gray-800);
        }
        
        h2 {
          font-size: 1.5rem;
          margin-bottom: 1.5rem;
          color: var(--color-gray-800);
          border-bottom: 2px solid var(--color-gray-200);
          padding-bottom: 0.5rem;
        }
        
        h3 {
          font-size: 1.1rem;
          margin-bottom: 1rem;
          color: var(--color-gray-700);
        }
        
        .demo-section {
          margin-bottom: 4rem;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .button-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 2rem;
        }
        
        .demo-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          align-items: center;
          margin-bottom: 1.5rem;
        }
        
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
        }
        
        .card-footer-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }
        
        .select-demo {
          max-width: 500px;
        }
        
        .select-sizes {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
        }
        
        .table-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .status {
          padding: 0.25rem 0.5rem;
          border-radius: 9999px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: capitalize;
        }
        
        .status-successful {
          background-color: rgba(16, 185, 129, 0.1);
          color: var(--color-success);
        }
        
        .status-failed {
          background-color: rgba(239, 68, 68, 0.1);
          color: var(--color-danger);
        }
        
        .status-pending {
          background-color: rgba(245, 158, 11, 0.1);
          color: var(--color-warning);
        }
        
        @media (max-width: 768px) {
          .button-grid,
          .cards-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Container>
  );
};

export default DesignSystemDemo; 