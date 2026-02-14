import React, { useEffect } from 'react';
import UserAside from '../Componentes/Asideber/UserAside';
import { Outlet, useLocation } from 'react-router';

const Dashbord = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Mapping for dashboard sub‑routes
    const titleMap = {
      "/dashboard": "Dashboard",
      "/dashboard/profile": "Profile",
      "/dashboard/orders": "Orders",
      // Add more dashboard routes as needed
    };

    const pageName = titleMap[path] || "Dashboard";
    document.title = `LocalChefBazaar || ${pageName}`;
  }, [location.pathname]);

  return (
    <div>
      <UserAside />
      <Outlet />
    </div>
  );
};

export default Dashbord;