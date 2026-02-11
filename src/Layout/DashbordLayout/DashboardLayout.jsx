
import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import { AuthContext } from '../../Context/AuthContext';
import UserAside from '../../Componentes/Asideber/UserAside';
import Loading from '../../Componentes/Loading';

const DashboardLayout = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-gray-600">Please sign in to access the dashboard.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[280px_1fr] bg-gray-50 dark:bg-gray-900">
      <title>LocalChefBazaar || Dashboard</title>
      
      {/* Sidebar */}
      <aside className="border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 sticky top-0 h-screen hidden lg:block shadow-lg">
        <UserAside />
      </aside>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <UserAside />
      </div>

      {/* Main Content */}
      <main className="p-4 lg:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
