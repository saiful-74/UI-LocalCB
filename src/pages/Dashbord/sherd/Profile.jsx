import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Loading from '../../../Componentes/Loading';

const Profile = () => {
  const { user, loading } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState(null);
  const [chefId, setChefId] = useState(null);

  useEffect(() => {
    if (!user?.email) return;

    const fetchUser = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}
/users/${user.email}`
        );
        setUserInfo(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch user info', { position: 'top-center' });
      }
    };

    fetchUser();
  }, [user?.email]);

  useEffect(() => {
    if (userInfo?.role !== 'chef' || !user?.email) return;

    const fetchChefId = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}
/chef-id/${user.email}`
        );
        setChefId(res.data.chefId);
      } catch (err) {
        console.error('Failed to fetch chefId:', err);
      }
    };

    fetchChefId();
  }, [userInfo?.role, user?.email]);

  const handleRoleRequest = (role) => {
    toast(
      (t) => (
        <div className="p-4 bg-white rounded shadow-lg text-center w-full max-w-sm mx-auto">
          <p className="text-lg font-semibold mb-4">
            Are you sure you want to request the role:{' '}
            <span className="capitalize">{role}</span>?
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
              onClick={async () => {
                try {
                  const res = await axios.post(
                    `${import.meta.env.VITE_BACKEND_API}
/role-request`,
                    {
                      email: user.email,
                      requestedRole: role,
                    }
                  );

                  setUserInfo((prev) => ({ ...prev, roleRequest: role }));
                  toast.success(res.data.message, { position: 'top-center' });
                } catch (err) {
                  console.error(err);
                  toast.error('Failed to send role request', {
                    position: 'top-center',
                  });
                }
                toast.dismiss(t.id);
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-300 px-4 cursor-pointer py-2 rounded"
              onClick={() => toast.dismiss(t.id)}
            >
              No
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, position: 'top-center' }
    );
  };

  if (loading) return <Loading />;
  if (!user) return <p className="text-center mt-10">No user logged in</p>;
  if (!userInfo) return <Loading />;

  const { role, roleRequest } = userInfo;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-white px-4">
      <Toaster />
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="flex flex-col items-center -mt-16">
          <img
            src={userInfo.profileImg || user?.photoURL}
            alt="Profile"
            className="w-28 h-28 rounded-full border-4 border-white shadow-md object-cover bg-gray-100"
          />
          <h2 className="mt-3 text-2xl font-bold text-gray-800">
            {userInfo.name}
          </h2>
          <p className="text-sm text-gray-500">{userInfo.email}</p>
        </div>

        <div className="mt-6 space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span className="font-semibold">Address</span>
            <span>{userInfo.address || 'N/A'}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Role</span>
            <span className="capitalize px-2 py-0.5 rounded bg-blue-100 text-blue-600">
              {role}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Status</span>
            <span className="capitalize px-2 py-0.5 rounded bg-green-100 text-green-600">
              {userInfo.status || 'active'}
            </span>
          </div>
          {role === 'chef' && chefId && (
            <div className="flex justify-between">
              <span className="font-semibold">Chef ID</span>
              <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-600">
                {chefId}
              </span>
            </div>
          )}
        </div>

        {roleRequest && (
          <div className="mt-4 text-center text-yellow-600 font-medium bg-yellow-50 py-2 rounded-lg">
            Pending Request: {roleRequest}
          </div>
        )}

        {!roleRequest && role !== 'admin' && (
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            {role === 'user' && (
              <button
                onClick={() => handleRoleRequest('chef')}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold cursor-pointer"
              >
                Be a Chef
              </button>
            )}
            {(role === 'user' || role === 'chef') && (
              <button
                onClick={() => handleRoleRequest('admin')}
                className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg font-semibold cursor-pointer"
              >
                Be an Admin
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
