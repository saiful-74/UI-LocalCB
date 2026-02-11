import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../Componentes/Loading';

const MyOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    const fetchOrders = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/orders/${user.email}`);

        if (res.data.success) {
          setOrders(res.data.data);
        } else {
          setOrders([]);
          toast.error(res.data.message || 'No orders found');
        }
      } catch (err) {
        console.error(err);
        toast.error('Server Error! Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user?.email]);

  const handlePay = async (order) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/create-checkout-session`,
        {
          orderId: order._id,
          amount: order.totalPrice,
          email: user.email,
          name: order.mealName || 'Customer',
        }
      );

      if (res.data.url) {
        window.location.href = res.data.url;
      } else {
        toast.error('Payment initiation failed');
      }
    } catch (err) {
      console.error(err);
      toast.error('Payment error! Please try again.');
    }
  };

  if (loading) return <Loading />;

  const sortedOrders = [...orders].sort((a, b) => {
    if (a.paymentStatus === 'pending' && b.paymentStatus === 'paid') return -1;
    if (a.paymentStatus === 'paid' && b.paymentStatus === 'pending') return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-white p-6">
      <title>LocalChefBazaar || My Orders</title>
      <Toaster />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          My Orders
        </h1>
        <p className="text-gray-600">
          Track and manage your meal orders
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {sortedOrders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Orders Yet</h3>
            <p className="text-gray-600">You haven't placed any orders yet. Start exploring meals and place your first order!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedOrders.map((order) => {
              const isPaid = order.paymentStatus?.toLowerCase() === 'paid';

              return (
                <div
                  key={order._id}
                  className={`bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow ${
                    isPaid ? 'opacity-60' : ''
                  }`}
                >
                  <div className="mb-4">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{order.mealName}</h2>
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      isPaid 
                        ? 'bg-green-100 text-green-800' 
                        : order.paymentStatus?.toLowerCase() === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {order.paymentStatus}
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Chef:</span>
                      <span className="text-sm text-gray-800">{order.chefName}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Price:</span>
                      <span className="text-sm text-gray-800">${order.price}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Quantity:</span>
                      <span className="text-sm text-gray-800">{order.quantity}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Total:</span>
                      <span className="text-sm font-semibold text-gray-800">${order.totalPrice}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Status:</span>
                      <span className="text-sm text-gray-800">{order.orderStatus}</span>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-600">Delivery:</span>
                      <span className="text-sm text-gray-800">{order.deliveryTime}</span>
                    </div>

                    {order.userAddress && (
                      <div className="pt-2 border-t border-gray-200">
                        <span className="text-sm font-medium text-gray-600">Address:</span>
                        <p className="text-sm text-gray-800 mt-1">{order.userAddress}</p>
                      </div>
                    )}
                  </div>

                  {order.orderStatus === 'accepted' &&
                    order.paymentStatus?.toLowerCase() === 'pending' && (
                      <button
                        onClick={() => handlePay(order)}
                        className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors cursor-pointer font-medium"
                      >
                        Pay Now
                      </button>
                    )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;
