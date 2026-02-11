import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loading from '../../../Componentes/Loading';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/users`);
      setUsers(res.data.data);
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to fetch users', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleMakeFraud = async (userId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_API}
/users/${userId}/status`,
        {
          status: 'fraud',
        }
      );
      Swal.fire('Success', 'User marked as fraud!', 'success');
      fetchUsers();
    } catch (err) {
      console.error(err);
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <title>LocalChefBazaar || Manage Users</title>
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Users</h2>

      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr className="text-gray-700">
              <th className="border px-6 py-3 text-left">Name</th>
              <th className="border px-6 py-3 text-left">Email</th>
              <th className="border px-6 py-3 text-left">Role</th>
              <th className="border px-6 py-3 text-left">Status</th>
              <th className="border px-6 py-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="text-center hover:bg-gray-50 transition"
              >
                <td className="border px-6 py-3 text-left font-medium text-gray-800">
                  {user.name}
                </td>
                <td className="border px-6 py-3 text-left text-gray-600">
                  {user.email}
                </td>
                <td className="border px-6 py-3 text-left capitalize text-black">
                  {user.role}
                </td>
                <td
                  className={`border px-6 py-3 font-semibold ${
                    user.status === 'fraud' ? 'text-red-500' : 'text-green-500'
                  }`}
                >
                  {user.status}
                </td>
                <td className="border px-6 py-3 text-black">
                  {user.role !== 'admin' && user.status !== 'fraud' ? (
                    <button
                      onClick={() => handleMakeFraud(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
                    >
                      Make Fraud
                    </button>
                  ) : user.status === 'fraud' ? (
                    <span className="text-gray-400 font-medium">Fraud</span>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
