
import React from 'react';
import { Link } from 'react-router-dom';

const PaymentCancel = () => {
  return (
    <div className="text-center mt-10">
      <h1 className="text-3xl font-bold mb-4 text-red-500">
        Payment Cancelled
      </h1>
      <p>Your payment was not completed. You can try again.</p>
      <Link
        to="/dashbord/myorder"
        className="text-blue-500 underline mt-4 inline-block"
      >
        Back to Orders
      </Link>
    </div>
  );
};

export default PaymentCancel;
