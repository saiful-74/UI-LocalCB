import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalUsersCard = () => {
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}
/users/count`
        );

        if (res.data.success) {
          setTotalUsers(res.data.totalUsers);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotalUsers();
  }, []);

  if (loading) {
    return <p>Loading users...</p>;
  }

  return (
    <div className="bg-white shadow rounded p-6 text-center">
      <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
      <p className="text-4xl font-bold text-blue-600 mt-2">{totalUsers}</p>
    </div>
  );
};

export default TotalUsersCard;
