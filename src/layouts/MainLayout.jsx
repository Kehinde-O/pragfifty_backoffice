import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { Container } from '../components/common/ui';
import './MainLayout.css';

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="main-layout">
      <Sidebar open={sidebarOpen} />
      <div className={`content-area ${sidebarOpen ? 'with-sidebar' : 'sidebar-collapsed'}`}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className="main-content">
          <Container fluid gutters>
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
}

export default MainLayout; 