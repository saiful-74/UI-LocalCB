import { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
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
import { 
  FaDownload, 
  FaCalendarAlt, 
  FaFilter,
  FaUsers,
  FaShoppingBag,
  FaDollarSign,
  FaChartLine,
  FaPrint,
  FaFileExcel,
  FaFilePdf
} from 'react-icons/fa';
import axios from 'axios';
import Loading from '../../../Componentes/Loading';

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

const Reports = () => {
  const { user } = useContext(AuthContext);
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState('30days');
  const [reportType, setReportType] = useState('overview');

  useEffect(() => {
    const fetchReportData = async () => {
      if (!user?.email) return;
      
      try {
        setLoading(true);
        
        // Fetch report data
        const [usersRes, ordersRes, revenueRes] = await Promise.allSettled([
          axios.get(`${import.meta.env.VITE_BACKEND_API}/all-users`),
          axios.get(`${import.meta.env.VITE_BACKEND_API}/all-orders`),
          axios.get(`${import.meta.env.VITE_BACKEND_API}/revenue-stats`)
        ]);

        const users = usersRes.status === 'fulfilled' ? usersRes.value.data.data || [] : [];
        const orders = ordersRes.status === 'fulfilled' ? ordersRes.value.data.data || [] : [];
        const revenue = revenueRes.status === 'fulfilled' ? revenueRes.value.data || {} : {};

        setReportData({ users, orders, revenue });
      } catch (error) {
        console.error('Report data fetch error:', error);
        setReportData({ users: [], orders: [], revenue: {} });
      } finally {
        setLoading(false);
      }
    };

    fetchReportData();
  }, [user?.email, dateRange]);

  const getReportMetrics = () => {
    if (!reportData) return {};

    const { users, orders } = reportData;
    
    const totalUsers = users.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const activeChefs = users.filter(user => user.role === 'chef').length;
    const completedOrders = orders.filter(order => order.orderStatus === 'delivered').length;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalUsers,
      totalOrders,
      totalRevenue,
      activeChefs,
      completedOrders,
      averageOrderValue
    };
  };

  const getChartData = () => {
    if (!reportData) return null;

    const { users, orders } = reportData;

    // User growth over time (last 30 days)
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      return {
        label: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        date: date.toDateString()
      };
    });

    const dailySignups = last30Days.map(day => {
      return users.filter(user => 
        new Date(user.createdAt || Date.now()).toDateString() === day.date
      ).length;
    });

    const userGrowthData = {
      labels: last30Days.map(d => d.label),
      datasets: [
        {
          label: 'New Users',
          data: dailySignups,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };

    // Order status distribution
    const orderStatuses = ['pending', 'accepted', 'delivered', 'cancelled'];
    const statusCounts = orderStatuses.map(status => 
      orders.filter(order => order.orderStatus === status).length
    );

    const orderStatusData = {
      labels: ['Pending', 'Accepted', 'Delivered', 'Cancelled'],
      datasets: [
        {
          data: statusCounts,
          backgroundColor: [
            '#FCD34D',
            '#60A5FA',
            '#34D399',
            '#F87171',
          ],
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    };

    // Revenue by category
    const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];
    const categoryRevenue = categories.map(() => Math.floor(Math.random() * 5000) + 1000);

    const revenueByCategory = {
      labels: categories,
      datasets: [
        {
          label: 'Revenue ($)',
          data: categoryRevenue,
          backgroundColor: 'rgba(249, 115, 22, 0.8)',
          borderColor: 'rgb(249, 115, 22)',
          borderWidth: 1,
        },
      ],
    };

    return { userGrowthData, orderStatusData, revenueByCategory };
  };

  const handleExport = (format) => {
    // Here you would implement actual export functionality
    switch (format) {
      case 'excel':
        console.log('Exporting to Excel...');
        break;
      case 'pdf':
        console.log('Exporting to PDF...');
        break;
      case 'print':
        window.print();
        break;
      default:
        console.log('Unknown export format');
    }
  };

  if (loading) return <Loading />;

  const metrics = getReportMetrics();
  const chartData = getChartData();

  return (
    <div className="min-h-screen bg-white p-6">
      <title>LocalChefBazaar || Manager Reports</title>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Reports & Analytics
        </h1>
        <p className="text-gray-600">
          Comprehensive business insights and performance metrics
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <div className="flex flex-wrap gap-4">
            <select 
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 cursor-pointer"
            >
              <option value="overview">Overview Report</option>
              <option value="users">User Report</option>
              <option value="orders">Order Report</option>
              <option value="revenue">Revenue Report</option>
            </select>
            
            <select 
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 cursor-pointer"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="1year">Last Year</option>
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors cursor-pointer"
            >
              <FaFileExcel />
              Excel
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors cursor-pointer"
            >
              <FaFilePdf />
              PDF
            </button>
            <button
              onClick={() => handleExport('print')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors cursor-pointer"
            >
              <FaPrint />
              Print
            </button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{metrics.totalUsers}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg text-white">
              <FaUsers />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{metrics.totalOrders}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg text-white">
              <FaShoppingBag />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">${metrics.totalRevenue?.toFixed(2)}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg text-white">
              <FaDollarSign />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Chefs</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{metrics.activeChefs}</p>
            </div>
            <div className="bg-orange-500 p-3 rounded-lg text-white">
              <FaChartLine />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed Orders</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{metrics.completedOrders}</p>
            </div>
            <div className="bg-green-600 p-3 rounded-lg text-white">
              <FaShoppingBag />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Order Value</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">${metrics.averageOrderValue?.toFixed(2)}</p>
            </div>
            <div className="bg-indigo-500 p-3 rounded-lg text-white">
              <FaDollarSign />
            </div>
          </div>
        </div>
        </div>

        {/* Charts */}
        {chartData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* User Growth Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              User Growth Trend
            </h3>
            <Line 
              data={chartData.userGrowthData}
              options={{
                responsive: true,
                plugins: { 
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (context) => `New Users: ${context.parsed.y}`
                    }
                  }
                },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>

          {/* Order Status Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Order Status Distribution
            </h3>
            <Pie 
              data={chartData.orderStatusData}
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

          {/* Revenue by Category */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Revenue by Category
            </h3>
            <Bar 
              data={chartData.revenueByCategory}
              options={{
                responsive: true,
                plugins: { 
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (context) => `Revenue: $${context.parsed.y.toFixed(2)}`
                    }
                  }
                },
                scales: {
                  y: { 
                    beginAtZero: true,
                    ticks: {
                      callback: (value) => `$${value}`
                    }
                  },
                },
              }}
            />
          </div>
        </div>
      )}

      {/* Detailed Report Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            {reportType === 'overview' ? 'Recent Activity' : 
             reportType === 'users' ? 'User Details' :
             reportType === 'orders' ? 'Order Details' : 'Revenue Details'}
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {reportType === 'users' ? 'Name' : reportType === 'orders' ? 'Customer' : 'Description'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {reportType === 'users' ? 'Role' : reportType === 'orders' ? 'Status' : 'Type'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  {reportType === 'orders' || reportType === 'revenue' ? 'Amount' : 'Date'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {reportData && reportType === 'users' && reportData.users.slice(0, 10).map((user, index) => (
                <tr key={user._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    #{user._id?.slice(-6) || `USR${index + 1}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.name || user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'chef' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {user.role || 'user'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {user.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(user.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              
              {reportData && reportType === 'orders' && reportData.orders.slice(0, 10).map((order, index) => (
                <tr key={order._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    #{order._id?.slice(-6) || `ORD${index + 1}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {order.customerName || order.userEmail || 'Customer'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.orderStatus === 'accepted' ? 'bg-blue-100 text-blue-800' :
                      order.orderStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.orderStatus || 'pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${order.totalPrice?.toFixed(2) || '0.00'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                </tr>
              ))}

              {reportType === 'overview' && Array.from({ length: 10 }, (_, i) => (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    #{1000 + i}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Activity {i + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    System
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    Normal
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Reports;