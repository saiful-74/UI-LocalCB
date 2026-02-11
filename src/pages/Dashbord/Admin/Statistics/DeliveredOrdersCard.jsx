import React, { useEffect, useState } from 'react';
import axios from 'axios';

const DeliveredOrdersCard = () => {
  const [deliveredOrders, setDeliveredOrders] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeliveredOrders = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}
/orders/delivered/count`
        );

        if (res.data.success) {
          setDeliveredOrders(res.data.deliveredOrders);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveredOrders();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow rounded p-6 text-center">
      <h2 className="text-lg font-semibold text-gray-600">Delivered Orders</h2>
      <p className="text-4xl font-bold text-green-600 mt-2">
        {deliveredOrders}
      </p>
    </div>
  );
};

export default DeliveredOrdersCard;
