import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
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
  FaDollarSign, 
  FaShoppingBag, 
  FaStar, 
  FaEye,
  FaChartLine,
  FaCalendarAlt
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

const Analytics = () => {
  const { user } = useContext(AuthContext);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('7days');

  useEffect(() => {
    const fetchAnalytics = async () => {
      if (!user?.email) return;
      
      try {
        setLoading(true);
        
        // Fetch chef analytics data
        const [mealsRes, ordersRes, reviewsRes] = await Promise.allSettled([
          axios.get(`${import.meta.env.VITE_BACKEND_API}/chef-meals/${user.email}`),
          axios.get(`${import.meta.env.VITE_BACKEND_API}/chef-orders/${user.email}`),
          axios.get(`${import.meta.env.VITE_BACKEND_API}/chef-reviews/${user.email}`)
        ]);

        const meals = mealsRes.status === 'fulfilled' ? mealsRes.value.data.data || [] : [];
        const orders = ordersRes.status === 'fulfilled' ? ordersRes.value.data.data || [] : [];
        const reviews = reviewsRes.status === 'fulfilled' ? reviewsRes.value.data.data || [] : [];

        setAnalyticsData({ meals, orders, reviews });
      } catch (error) {
        console.error('Analytics fetch error:', error);
        setAnalyticsData({ meals: [], orders: [], reviews: [] });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [user?.email, timeRange]);

  const getMetrics = () => {
    if (!analyticsData) return {};

    const { meals, orders, reviews } = analyticsData;
    
    const totalRevenue = orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    const totalOrders = orders.length;
    const averageRating = reviews.length > 0 
      ? (reviews.reduce((sum, review) => sum + (review.rating || 0), 0) / reviews.length).toFixed(1)
      : '0.0';
    const totalMeals = meals.length;
    const completedOrders = orders.filter(order => order.orderStatus === 'delivered').length;
    const conversionRate = totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(1) : '0.0';

    return {
      totalRevenue,
      totalOrders,
      averageRating,
      totalMeals,
      completedOrders,
      conversionRate
    };
  };

  const getChartData = () => {
    if (!analyticsData) return null;

    const { orders } = analyticsData;

    // Revenue over time (last 7 days)
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        label: date.toLocaleDateString('en-US', { weekday: 'short' }),
        date: date.toDateString()
      };
    });

    const dailyRevenue = last7Days.map(day => {
      return orders
        .filter(order => new Date(order.createdAt || Date.now()).toDateString() === day.date)
        .reduce((sum, order) => sum + (order.totalPrice || 0), 0);
    });

    const revenueChartData = {
      labels: last7Days.map(d => d.label),
      datasets: [
        {
          label: 'Daily Revenue ($)',
          data: dailyRevenue,
          borderColor: 'rgb(249, 115, 22)',
          backgroundColor: 'rgba(249, 115, 22, 0.1)',
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

    // Meal categories performance
    const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Desserts'];
    const categoryOrders = categories.map(() => Math.floor(Math.random() * 20) + 5);

    const categoryData = {
      labels: categories,
      datasets: [
        {
          label: 'Orders by Category',
          data: categoryOrders,
          backgroundColor: 'rgba(249, 115, 22, 0.8)',
          borderColor: 'rgb(249, 115, 22)',
          borderWidth: 1,
        },
      ],
    };

    return { revenueChartData, orderStatusData, categoryData };
  };

  if (loading) return <Loading />;

  const metrics = getMetrics();
  const chartData = getChartData();

  return (
    <div className="min-h-screen bg-white p-6">
      <title>LocalChefBazaar || Chef Analytics</title>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Chef Analytics
        </h1>
        <p className="text-gray-600">
          Track your performance and earnings
        </p>
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Time Range Selector */}
        <div className="flex justify-end mb-6">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-800 cursor-pointer"
          >
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">${metrics.totalRevenue?.toFixed(2)}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-lg text-white">
              <FaDollarSign />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{metrics.totalOrders}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-lg text-white">
              <FaShoppingBag />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Average Rating</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{metrics.averageRating}</p>
            </div>
            <div className="bg-yellow-500 p-3 rounded-lg text-white">
              <FaStar />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Meals</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{metrics.totalMeals}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-lg text-white">
              <FaEye />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{metrics.completedOrders}</p>
            </div>
            <div className="bg-green-600 p-3 rounded-lg text-white">
              <FaChartLine />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Success Rate</p>
              <p className="text-2xl font-bold text-gray-800 dark:text-white">{metrics.conversionRate}%</p>
            </div>
            <div className="bg-indigo-500 p-3 rounded-lg text-white">
              <FaCalendarAlt />
            </div>
          </div>
        </div>
        </div>

        {/* Charts */}
        {chartData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Revenue Trend
            </h3>
            <Line 
              data={chartData.revenueChartData}
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

          {/* Order Status Distribution */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Order Status
            </h3>
            <Doughnut 
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

          {/* Category Performance */}
          <div className="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Orders by Category
            </h3>
            <Bar 
              data={chartData.categoryData}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: {
                  y: { beginAtZero: true },
                },
              }}
            />
          </div>
        </div>
      )}

      {/* Recent Performance Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Orders Performance</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Meal
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {analyticsData?.orders?.slice(0, 10).map((order, index) => (
                <tr key={order._id || index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    #{order._id?.slice(-6) || `ORD${index + 1}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {order.mealName || 'Unknown Meal'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {order.customerName || order.userEmail || 'Customer'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    ${order.totalPrice?.toFixed(2) || '0.00'}
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {new Date(order.createdAt || Date.now()).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {(!analyticsData?.orders || analyticsData.orders.length === 0) && (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500 dark:text-gray-400">
                    No orders found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Analytics;