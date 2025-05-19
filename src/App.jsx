import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import MainLayout from './layouts/MainLayout';
import DashboardPage from './components/DashboardPage';
import AdminUsers from './components/users/AdminUsers';
import RolesPermissions from './components/users/RolesPermissions';
import UserActivity from './components/users/UserActivity';
import TaxpayerProfiling from './components/taxpayers/TaxpayerProfiling';
import Individuals from './components/taxpayers/Individuals';
import Businesses from './components/taxpayers/Businesses';
import TaxpayerDetails from './components/taxpayers/TaxpayerDetails';
import TaxpayerReturns from './components/taxpayers/TaxpayerReturns';
import TaxReturnDetails from './components/taxpayers/TaxReturnDetails';
import TaxReturnProcess from './components/taxpayers/TaxReturnProcess';
import {
  TCCApplicationList,
  TCCApplicationCreate,
  TCCApplicationDetails,
  TCCApplicationProcess 
} from './components/tcc';
import ConsolidatedDemandNotice from './pages/ConsolidatedDemandNotice';
import BulkLUCGeneration from './pages/BulkLUCGeneration';
import {
  TaxpayerVerification,
} from './components/taxpayers/index.jsx';
import {
  RevenueHeads,
  StateRevenueHeads,
  LgaRevenueHeads,
  RevenueItems
} from './components/revenue/index.jsx';
import {
  AssessmentDashboard,
  AssessmentList,
  AssessmentDetail,
  AssessmentCreate,
  AssessmentApproval
} from './components/assessment';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        
        {/* Dashboard routes with MainLayout */}
        <Route path="/dashboard" element={<MainLayout />}>
          <Route index element={<DashboardPage />} />
          {/* Add more dashboard routes here as we build them */}
          <Route path="admins" element={<AdminUsers />} />
          <Route path="roles" element={<RolesPermissions />} />
          <Route path="user-activity" element={<UserActivity />} />
          
          {/* TCC Application Routes */}
          <Route path="tcc-application">
            <Route index element={<TCCApplicationList />} />
            <Route path="create" element={<TCCApplicationCreate />} />
            <Route path=":id" element={<TCCApplicationDetails />} />
            <Route path=":id/process" element={<TCCApplicationProcess />} />
          </Route>
          
          {/* Consolidated Demand Notice */}
          <Route path="consolidated-demand-notice" element={<ConsolidatedDemandNotice />} />
          
          {/* Land Use Charge Generation */}
          <Route path="bulk-luc-generation" element={<BulkLUCGeneration />} />
          
          {/* Taxpayer Management Routes */}
          <Route path="taxpayers">
            <Route index element={<Navigate to="individuals" replace />} />
            <Route path="individuals" element={<Individuals />} />
            <Route path="individuals/:id" element={<TaxpayerDetails type="individual" />} />
            <Route path="businesses" element={<Businesses />} />
            <Route path="businesses/:id" element={<TaxpayerDetails type="business" />} />
            <Route path="verification" element={<TaxpayerVerification />} />
            <Route path="profiling" element={<TaxpayerProfiling />} />
          </Route>
          
          {/* Global Tax Returns page */}
          <Route path="tax-returns">
            <Route index element={<TaxpayerReturns />} />
            <Route path=":id" element={<TaxReturnDetails />} />
            <Route path=":id/process" element={<TaxReturnProcess />} />
          </Route>
          
          {/* Revenue Heads Module */}
          <Route path="revenue-heads">
            <Route index element={<RevenueHeads />} />
            <Route path="state" element={<StateRevenueHeads />} />
            <Route path="lga" element={<LgaRevenueHeads />} />
            <Route path="items" element={<RevenueItems />} />
          </Route>
          
          {/* Assessments Module */}
          <Route path="assessments">
            <Route index element={<AssessmentList />} />
            <Route path="create" element={<AssessmentCreate />} />
            <Route path="approval" element={<AssessmentApproval />} />
            <Route path=":id" element={<AssessmentDetail />} />
            <Route path=":id/approve" element={<AssessmentApproval />} />
            <Route path=":id/edit" element={<AssessmentCreate />} />
          </Route>
          
          <Route path="transactions/*" element={<div>Transactions Management</div>} />
          <Route path="reports/*" element={<div>Reports</div>} />
          <Route path="settings/*" element={<div>Settings</div>} />
          <Route path="help" element={<div>Help & Support</div>} />
        </Route>
        
        {/* Redirect root path to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App; 