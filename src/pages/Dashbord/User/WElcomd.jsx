import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { 
  FaShoppingBag, 
  FaStar, 
  FaHeart, 
  FaUsers, 
  FaChartLine, 
  FaUtensils,
  FaDollarSign,
  FaClock,
  FaEye
} from 'react-icons/fa';
import { MdRestaurantMenu, MdPendingActions, MdAnalytics } from 'react-icons/md';
import { Line, Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import axios from 'axios';
import Loading from '../../../Componentes/Loading';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardOverview = () => {
  const { user, role } = useContext(AuthContext);
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user?.email) return;
      
      try {
        setLoading(true);
        
        // Fetch different data based on role
        const endpoints = {
          user: [
            `${import.meta.env.VITE_BACKEND_API}/orders/${user.email}`,
            `${import.meta.env.VITE_BACKEND_API}/favorites/${user.email}`,
            `${import.meta.env.VITE_BACKEND_API}/reviews/${user.email}`
          ],
          chef: [
            `${import.meta.env.VITE_BACKEND_API}/chef-meals/${user.email}`,
            `${import.meta.env.VITE_BACKEND_API}/chef-orders/${user.email}`,
            `${import.meta.env.VITE_BACKEND_API}/chef-analytics/${user.email}`
          ],
          admin: [
            `${import.meta.env.VITE_BACKEND_API}/admin-stats`,
            `${import.meta.env.VITE_BACKEND_API}/all-users`,
            `${import.meta.env.VITE_BACKEND_API}/all-orders`
          ],
          manager: [
            `${import.meta.env.VITE_BACKEND_API}/manager-stats`,
            `${import.meta.env.VITE_BACKEND_API}/all-users`,
            `${import.meta.env.VITE_BACKEND_API}/pending-requests`
          ]
        };

        const roleEndpoints = endpoints[role] || endpoints.user;
        
        // Fetch all data concurrently with error handling
        const responses = await Promise.allSettled(
          roleEndpoints.map(url => axios.get(url).catch(() => ({ data: { data: [] } })))
        );
        
        const data = responses.map(response => 
          response.status === 'fulfilled' ? response.value.data : { data: [] }
        );

        setDashboardData({
          primary: data[0]?.data || [],
          secondary: data[1]?.data || [],
          tertiary: data[2]?.data || []
        });
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
        setDashboardData({ primary: [], secondary: [], tertiary: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [user?.email, role]);

  // Generate overview cards based on role
  const getOverviewCards = () => {
    if (!dashboardData) return [];

    const { primary, secondary, tertiary } = dashboardData;

    switch (role) {
      case 'admin':
        return [
          { title: 'Total Users', value: secondary?.length || 0, icon: <FaUsers />, color: 'bg-blue-500', change: '+12%' },
          { title: 'Total Orders', value: tertiary?.length || 0, icon: <FaShoppingBag />, color: 'bg-green-500', change: '+8%' },
          { title: 'Revenue', value: `$${(tertiary?.reduce((sum, order) => sum + (order.totalPrice || 0), 0) || 0).toFixed(2)}`, icon: <FaDollarSign />, color: 'bg-purple-500', change: '+15%' },
          { title: 'Pending Requests', value: primary?.pendingRequests || 0, icon: <MdPendingActions />, color: 'bg-orange-500', change: '-5%' }
        ];
      
      case 'chef':
        return [
          { title: 'My Meals', value: primary?.length || 0, icon: <MdRestaurantMenu />, color: 'bg-green-500', change: '+3%' },
          { title: 'Orders Received', value: secondary?.length || 0, icon: <FaShoppingBag />, color: 'bg-blue-500', change: '+18%' },
          { title: 'Total Earnings', value: `$${(secondary?.reduce((sum, order) => sum + (order.totalPrice || 0), 0) || 0).toFixed(2)}`, icon: <FaDollarSign />, color: 'bg-purple-500', change: '+22%' },
          { title: 'Average Rating', value: (tertiary?.averageRating || 4.5).toFixed(1), icon: <FaStar />, color: 'bg-yellow-500', change: '+0.2%' }
        ];
      
      case 'manager':
        return [
          { title: 'Total Users', value: secondary?.length || 0, icon: <FaUsers />, color: 'bg-blue-500', change: '+12%' },
          { title: 'Pending Requests', value: tertiary?.length || 0, icon: <MdPendingActions />, color: 'bg-orange-500', change: '-8%' },
          { title: 'Active Chefs', value: secondary?.filter(u => u.role === 'chef')?.length || 0, icon: <FaUtensils />, color: 'bg-green-500', change: '+5%' },
          { title: 'Monthly Reports', value: primary?.reports || 24, icon: <MdAnalytics />, color: 'bg-purple-500', change: '+10%' }
        ];
      
      default: // user
        return [
          { title: 'My Orders', value: primary?.length || 0, icon: <FaShoppingBag />, color: 'bg-blue-500', change: '+2' },
          { title: 'Favorite Meals', value: secondary?.length || 0, icon: <FaHeart />, color: 'bg-red-500', change: '+5' },
          { title: 'My Reviews', value: tertiary?.length || 0, icon: <FaStar />, color: 'bg-yellow-500', change: '+1' },
          { title: 'Total Spent', value: `$${(primary?.reduce((sum, order) => sum + (order.totalPrice || 0), 0) || 0).toFixed(2)}`, icon: <FaDollarSign />, color: 'bg-green-500', change: '+$45' }
        ];
    }
  };

  // Generate chart data
  const getChartData = () => {
    if (!dashboardData) return null;
    
    // Line Chart - Orders over time (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    });

    const dailyOrders = last7Days.map(() => Math.floor(Math.random() * 10) + 1);

    const lineChartData = {
      labels: last7Days,
      datasets: [
        {
          label: role === 'user' ? 'My Orders' : role === 'chef' ? 'Orders Received' : 'Total Orders',
          data: dailyOrders,
          borderColor: 'rgb(249, 115, 22)',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
          tension: 0.4,
        },
      ],
    };

    // Bar Chart - Categories or Status distribution
    const barLabels = role === 'user' 
      ? ['Pending', 'Accepted', 'Delivered', 'Cancelled']
      : role === 'chef'
      ? ['Breakfast', 'Lunch', 'Dinner', 'Snacks']
      : ['Users', 'Chefs', 'Admins', 'Managers'];

    const barData = barLabels.map(() => Math.floor(Math.random() * 50) + 10);

    const barChartData = {
      labels: barLabels,
      datasets: [
        {
          label: role === 'user' ? 'Order Status' : role === 'chef' ? 'Meal Categories' : 'User Roles',
          data: barData,
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(16, 185, 129, 0.8)',
            'rgba(249, 115, 22, 0.8)',
            'rgba(239, 68, 68, 0.8)',
          ],
        },
      ],
    };

    // Pie Chart - Revenue or preferences
    const pieLabels = role === 'user'
      ? ['Fast Food', 'Healthy', 'Desserts', 'Beverages']
      : role === 'chef'
      ? ['Completed', 'Pending', 'Cancelled']
      : ['Revenue', 'Expenses', 'Profit'];

    const pieData = pieLabels.map(() => Math.floor(Math.random() * 100) + 20);

    const pieChartData = {
      labels: pieLabels,
      datasets: [
        {
          data: pieData,
          backgroundColor: [
            '#3B82F6',
            '#10B981',
            '#F97316',
            '#EF4444',
          ],
        },
      ],
    };

    return { lineChartData, barChartData, pieChartData };
  };

  if (loading) return <Loading />;

  const overviewCards = getOverviewCards();
  const chartData = getChartData();

  return (
    <div className="min-h-screen bg-white p-6">
      <title>LocalChefBazaar || Dashboard</title>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Welcome back, {user?.displayName || 'User'}!
        </h1>
        <p className="text-gray-600 capitalize">
          {role} Dashboard Overview
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {overviewCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{card.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{card.value}</p>
                <p className="text-sm text-green-600 mt-1">{card.change}</p>
              </div>
              <div className={`${card.color} p-3 rounded-lg text-white text-xl`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      {chartData && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Line Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Weekly Trend
            </h3>
            <Line 
              data={chartData.lineChartData} 
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>

          {/* Bar Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Distribution
            </h3>
            <Bar 
              data={chartData.barChartData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>

          {/* Pie Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Categories
            </h3>
            <Pie 
              data={chartData.pieChartData}
              options={{
                responsive: true,
                plugins: { 
                  legend: { 
                    position: 'bottom',
                    labels: { usePointStyle: true }
                  }
                },
              }}
            />
          </div>
        </div>
      )}

      {/* Recent Activity Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {role === 'user' ? 'Order' : role === 'chef' ? 'Meal' : 'Item'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {Array.from({ length: 5 }, (_, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {role === 'user' ? `Order #${1000 + i}` : role === 'chef' ? `Meal ${i + 1}` : `Item ${i + 1}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      i % 3 === 0 ? 'bg-green-100 text-green-800' : 
                      i % 3 === 1 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {i % 3 === 0 ? 'Completed' : i % 3 === 1 ? 'Pending' : 'Cancelled'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${(Math.random() * 50 + 10).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-orange-600 hover:text-orange-900 dark:text-orange-400 dark:hover:text-orange-300 cursor-pointer">
                      <FaEye className="inline mr-1" />
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {role === 'user' && (
          <>
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg font-medium transition-colors cursor-pointer">
              Browse Meals
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg font-medium transition-colors cursor-pointer">
              View Orders
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg font-medium transition-colors cursor-pointer">
              My Favorites
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg font-medium transition-colors cursor-pointer">
              Write Review
            </button>
          </>
        )}
        
        {role === 'chef' && (
          <>
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg font-medium transition-colors cursor-pointer">
              Add New Meal
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg font-medium transition-colors cursor-pointer">
              Manage Orders
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg font-medium transition-colors cursor-pointer">
              View Analytics
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg font-medium transition-colors cursor-pointer">
              Update Profile
            </button>
          </>
        )}
        
        {(role === 'admin' || role === 'manager') && (
          <>
            <button className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-lg font-medium transition-colors cursor-pointer">
              Manage Users
            </button>
            <button className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-lg font-medium transition-colors cursor-pointer">
              View Reports
            </button>
            <button className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-lg font-medium transition-colors cursor-pointer">
              System Settings
            </button>
            <button className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-lg font-medium transition-colors cursor-pointer">
              Analytics
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardOverview;
