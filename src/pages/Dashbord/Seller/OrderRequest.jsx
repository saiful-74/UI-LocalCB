import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../Componentes/Loading';
import { api } from '../../../api/axiosSecure'; // ✅ import the secure axios instance

const OrderRequest = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Define fetchOrders so we can reuse it
  const fetchOrders = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      const res = await api.get(`/user-chef-orders/${user.email}`);
      if (res.data.success) {
        const sortedOrders = res.data.data.sort((a, b) => {
          if (a.orderStatus === 'pending' && b.orderStatus !== 'pending') return -1;
          if (a.orderStatus !== 'pending' && b.orderStatus === 'pending') return 1;
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

  useEffect(() => {
    fetchOrders();
  }, [user?.email]);

  // ✅ Separate handler for Accept
  const handleAccept = async (orderId) => {
    try {
      await api.patch(`/orders/accept/${orderId}`);
      toast.success('Order accepted!');
      fetchOrders(); // refresh list
    } catch (error) {
      console.error(error);
      toast.error('Failed to accept order');
    }
  };

  // ✅ Separate handler for Cancel
  const handleCancel = async (orderId) => {
    try {
      await api.patch(`/orders/cancel/${orderId}`);
      toast.success('Order cancelled!');
      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error('Failed to cancel order');
    }
  };

  // ✅ Separate handler for Deliver
  const handleDeliver = async (orderId) => {
    try {
      await api.patch(`/orders/deliver/${orderId}`);
      toast.success('Order delivered!');
      fetchOrders();
    } catch (error) {
      console.error(error);
      toast.error('Failed to mark as delivered');
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
                  onClick={() => handleCancel(order._id)}
                  disabled={!isPending}
                  className={`px-3 py-2 rounded text-white w-full sm:w-auto ${
                    isPending
                      ? 'bg-red-600 hover:bg-red-700 cursor-pointer'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Cancel
                </button>

                <button
                  onClick={() => handleAccept(order._id)}
                  disabled={!isPending}
                  className={`px-3 py-2 rounded text-white w-full sm:w-auto ${
                    isPending
                      ? 'bg-green-600 hover:bg-green-700 cursor-pointer'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  Accept
                </button>

                <button
                  onClick={() => handleDeliver(order._id)}
                  disabled={!isAccepted}
                  className={`px-3 py-2 rounded text-white w-full sm:w-auto ${
                    isAccepted
                      ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
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