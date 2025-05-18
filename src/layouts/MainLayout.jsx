import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import { Container } from '../components/common/ui';
import styles from './MainLayout.module.css';

function MainLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={styles.mainLayout}>
      <Sidebar open={sidebarOpen} />
      <div className={`${styles.contentArea} ${sidebarOpen ? styles.withSidebar : styles.sidebarCollapsed}`}>
        <Header toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
        <main className={styles.mainContent}>
          <Container fluid gutters>
            <Outlet />
          </Container>
        </main>
      </div>
    </div>
  );
}

export default MainLayout; 