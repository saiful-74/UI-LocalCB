import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../Componentes/Loading';

const OrderRequest = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}
/user-chef-orders/${user.email}`
        );

        if (res.data.success) {
          const sortedOrders = res.data.data.sort((a, b) => {
            if (a.orderStatus === 'pending' && b.orderStatus !== 'pending')
              return -1;
            if (a.orderStatus !== 'pending' && b.orderStatus === 'pending')
              return 1;
            return 0;
          });

          setOrders(sortedOrders);
        } else {
          toast.error(res.data.message || 'Failed to load orders');
        }
      } catch (error) {
        console.error(error);
        toast.error('Server Error!');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_API}
/update-order-status/${orderId}`,
        { orderStatus: newStatus }
      );

      if (res.data.success) {
        toast.success(`Order ${newStatus} successfully`);

        setOrders((prev) =>
          prev.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error(error);
      toast.error('Server error!');
    }
  };

  if (loading) return <Loading />;
  if (!orders.length)
    return <div className="text-center mt-10">No orders found.</div>;

  return (
    <div className="p-4 text-black bg-white">
      <title>LocalChefBazaar || Order Requests</title>
      <Toaster />
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order) => {
          const status = order.orderStatus;

          const isCancelled = status === 'cancelled';
          const isAccepted = status === 'accepted';
          const isDelivered = status === 'delivered';
          const isPending = status === 'pending';

          return (
            <div
              key={order._id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300"
            >
              <h3 className="text-xl font-semibold">{order.mealName}</h3>
              <p>
                <strong>Price:</strong> ${order.price} | <strong>Qty:</strong>{' '}
                {order.quantity} | <strong>Total:</strong> ${order.totalPrice}
              </p>
              <p>
                <strong>Chef ID:</strong> {order.chefId}
              </p>
              <p>
                <strong>User:</strong> {order.userEmail}
              </p>
              <p>
                <strong>Payment:</strong> {order.paymentStatus}
              </p>
              <p>
                <strong>Status:</strong>{' '}
                <span className="font-bold text-blue-600">{status}</span>
              </p>
              <p>
                <strong>Order Time:</strong>{' '}
                {order.orderTime
                  ? new Date(order.orderTime).toLocaleString()
                  : '-'}
              </p>
              <p>
                <strong>Address:</strong> {order.userAddress || '-'}
              </p>

              <div className="mt-4 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleStatusUpdate(order._id, 'cancelled')}
                  disabled={!isPending}
                  className={`px-3 py-2 rounded text-white w-full sm:w-auto  ${
                    isPending
                      ? 'bg-red-600 cursor-pointer'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleStatusUpdate(order._id, 'accepted')}
                  disabled={!isPending}
                  className={`px-3 py-2 rounded text-white w-full sm:w-auto  ${
                    isPending
                      ? 'bg-green-600 cursor-pointer'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Accept
                </button>

                <button
                  onClick={() => handleStatusUpdate(order._id, 'delivered')}
                  disabled={!isAccepted}
                  className={`px-3 py-2 rounded text-white w-full sm:w-auto  ${
                    isAccepted
                      ? 'bg-blue-600 cursor-pointer'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Deliver
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderRequest;
