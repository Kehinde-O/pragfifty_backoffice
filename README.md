# PragFifty Revenue Backoffice

A backoffice administration portal for the PragFifty Revenue Payment System. This application provides administrative tools for managing taxpayers, revenue streams, assessments, transactions, reconciliation, and more.

## Features

- **Dashboard**: View key performance indicators and revenue analytics
- **Taxpayer Management**: Manage taxpayer records and accounts
- **Admin User Management**: Manage administrative users and roles
- **Revenue Head Management**: Configure tax types, fees, and levies
- **Assessment Management**: Create and manage tax assessments
- **Transaction Management**: View and manage payment transactions
- **Reconciliation**: Match payments with bank statements
- **Local Government Area Management**: Configure LGAs and revenue sharing
- **Reporting & Analytics**: Generate reports and view insights
- **System Settings**: Configure system parameters and templates

## Technology Stack

- **Frontend**: React.js, Material UI
- **State Management**: React Context API
- **Routing**: React Router
- **Forms**: Formik with Yup validation
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Authentication**: JWT

## Getting Started

### Prerequisites

- Node.js (v16 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd backoffice
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_BASE_URL=http://localhost:3000/api
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## Build for Production

To build the app for production, run:

```bash
npm run build
```

The build artifacts will be located in the `dist/` directory.

## Related Projects

- **Public Portal**: The public-facing application for taxpayers to make payments and view their accounts.

## License

[License Information]

## Contact

[Contact Information]
