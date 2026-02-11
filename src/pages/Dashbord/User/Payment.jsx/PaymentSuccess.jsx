import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!sessionId) {
      setMessage('Invalid payment session');
      setLoading(false);
      return;
    }

    const verifyPayment = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/verify-payment/${sessionId}`
        );

        if (res.data.success) {
          setMessage('Payment Successful! 🎉');
        } else {
          setMessage('Payment verification failed');
        }
      } catch (err) {
        setMessage('Server error. Contact support');
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return <div className="text-center mt-10">Verifying payment...</div>;
  }

  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4">{message}</h1>
      <p>
        You can see your order in <strong>My Orders</strong>
      </p>
    </div>
  );
};

export default PaymentSuccess;
