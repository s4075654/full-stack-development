import React, { useState } from 'react';
import Navbar from "../components/Navigation/Navbar";
import Sidebar from "../components/Navigation/Sidebar";
import styles from '../components/Navigation/Navigation.module.css';

// EventDetail Page
function EventDetail() {
  // React State toggle SideBar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={isSidebarOpen} />
      <main className={`${styles.mainContent} ${isSidebarOpen ? styles.sidebarOpen : styles.sidebarClosed}`}>
        {/* Your event detail content here */}
        <div className="p-6">
          <h1 className="text-3xl font-bold h-1">Event Details</h1>
          {/* Add your event detail content */}
        </div>
      </main>
    </div>
  );
}

export default EventDetail;