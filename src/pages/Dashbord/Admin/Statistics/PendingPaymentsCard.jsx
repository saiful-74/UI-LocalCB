import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PendingPaymentsCard = () => {
  const [pendingPayments, setPendingPayments] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPendingPayments = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}
/orders/pending-payment/count`
        );

        if (res.data.success) {
          setPendingPayments(res.data.pendingPayments);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPendingPayments();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="bg-white shadow rounded p-6 text-center">
      <h2 className="text-lg font-semibold text-gray-600">Pending Payments</h2>
      <p className="text-4xl font-bold text-orange-500 mt-2">
        {pendingPayments}
      </p>
    </div>
  );
};

export default PendingPaymentsCard;
