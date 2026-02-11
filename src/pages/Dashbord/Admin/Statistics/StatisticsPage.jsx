import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Loading from '../../../../Componentes/Loading';

const StatisticsPage = () => {
  const [stats, setStats] = useState({
    totalPaidAmount: 0,
    totalOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'LocalChefBazar || Statistics Page';

    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/orders/paid/total`
        );
        setStats(res.data || { totalPaidAmount: 0, totalOrders: 0 });
      } catch (err) {
        console.error('Error fetching stats:', err);
        setStats({ totalPaidAmount: 0, totalOrders: 0 });
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const chartData = [
    { name: 'Total Paid Amount', value: Number(stats.totalPaidAmount) || 0 },
    { name: 'Total Orders', value: Number(stats.totalOrders) || 0 },
  ];

  const COLORS = ['#0088FE', '#00C49F'];

  if (loading) {
    return <Loading />;
  }

  const formattedAmount = Number(stats.totalPaidAmount || 0).toLocaleString(undefined, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
  const formattedOrders = Number(stats.totalOrders || 0).toLocaleString();

  return (
    // No background color anywhere: container and cards are transparent.
    <div className="p-6 bg-white ">
      <h2 className="text-2xl font-bold mb-4">📊 Platform Statistics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm bg-transparent">
          <h3 className="text-lg font-semibold ">💰 Total Paid Amount</h3>
          <p className="text-3xl font-bold mt-2">
            {formattedAmount}
          </p>
        </div>

        <div className="rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm bg-transparent">
          <h3 className="text-lg font-semibold ">🧾 Total Paid Orders</h3>
          <p className="text-3xl font-bold  mt-2">
            {formattedOrders}
          </p>
        </div>
      </div>

      <div className="rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-sm bg-transparent">
        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-100">📊 Statistics Chart</h3>

        {chartData.every((d) => d.value === 0) ? (
          <div className="py-20 text-center text-gray-600 dark:text-gray-300">
            No data available to display the chart.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) =>
                  typeof value === 'number'
                    ? value.toLocaleString()
                    : value
                }
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;