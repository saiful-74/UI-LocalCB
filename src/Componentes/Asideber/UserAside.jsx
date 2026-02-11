import { useContext, useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaShoppingBag,
  FaStar,
  FaHeart,
  FaSignOutAlt,
  FaArrowLeft,
  FaChartLine,
  FaHome,
} from 'react-icons/fa';
import {
  MdRestaurantMenu,
  MdRestaurant,
  MdPendingActions,
  MdDashboard,
  MdAnalytics,
} from 'react-icons/md';
import { FiUsers, FiSettings, FiBarChart } from 'react-icons/fi';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthContext';
import Logo from '../../assets/Logo.png';
import axios from 'axios';

const UserAside = () => {
  const { user, signoutUser, role: contextRole } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // Use contextRole directly or fetch from API
  const [fetchedRole, setFetchedRole] = useState('user');
  const role = contextRole || fetchedRole;

  // Fetch role only if not available in context
  useEffect(() => {
    if (!user?.email || contextRole) return;

    const fetchRole = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/check-role/${user.email}`
        );

        if (res.data?.success) {
          setFetchedRole(res.data.role);
        }
      } catch (err) {
        console.error('Role fetch failed:', err);
        setFetchedRole('user'); 
      }
    };

    fetchRole();
  }, [user?.email, contextRole]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#f97316',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, logout',
    }).then((result) => {
      if (result.isConfirmed) {
        signoutUser()
          .then(() => {
            toast.success('Logged out successfully');
            navigate('/');
          })
          .catch((err) => toast.error(err.message));
      }
    });
  };

  const linkStyle =
    'flex items-center gap-3 px-4 py-3 rounded-lg font-medium text-gray-600 dark:text-gray-300 hover:bg-orange-50 dark:hover:bg-gray-700 hover:text-orange-600 dark:hover:text-orange-400 transition-all duration-200 cursor-pointer';
  const activeStyle = 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-l-4 border-orange-500';

  // Role-based menu items
  const getMenuItems = () => {
    const commonItems = [
      { to: '', icon: <MdDashboard />, label: 'Dashboard Overview' },
      { to: 'profile', icon: <FaUser />, label: 'My Profile' },
    ];

    switch (role) {
      case 'admin':
        return [
          ...commonItems,
          { to: 'manageuser', icon: <FiUsers />, label: 'Manage Users' },
          { to: 'managerequest', icon: <MdPendingActions />, label: 'Manage Requests' },
          { to: 'StatisticsPage', icon: <FiBarChart />, label: 'Analytics & Reports' },
          { to: 'settings', icon: <FiSettings />, label: 'System Settings' },
        ];
      
      case 'chef':
        return [
          ...commonItems,
          { to: 'addmeals', icon: <MdRestaurantMenu />, label: 'Create Meal' },
          { to: 'mymeals', icon: <MdRestaurant />, label: 'My Meals' },
          { to: 'orderreq', icon: <MdPendingActions />, label: 'Order Requests' },
          { to: 'analytics', icon: <MdAnalytics />, label: 'My Analytics' },
        ];
      
      case 'manager':
        return [
          ...commonItems,
          { to: 'manageuser', icon: <FiUsers />, label: 'Manage Users' },
          { to: 'managerequest', icon: <MdPendingActions />, label: 'Manage Requests' },
          { to: 'reports', icon: <FaChartLine />, label: 'Reports' },
        ];
      
      default: // user
        return [
          ...commonItems,
          { to: 'myorder', icon: <FaShoppingBag />, label: 'My Orders' },
          { to: 'reviews', icon: <FaStar />, label: 'My Reviews' },
          { to: 'favoritemeal', icon: <FaHeart />, label: 'Favorite Meals' },
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="p-6 flex flex-col h-full bg-white dark:bg-gray-800 shadow-lg">
      {/* Logo and Brand */}
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-gray-200 dark:border-gray-700">
        <img src={Logo} className="w-12 h-12 rounded-xl shadow-md" alt="Logo" />
        <div>
          <h2 className="font-bold text-lg text-orange-600 dark:text-orange-400">LocalChefBazaar</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{role} Dashboard</p>
        </div>
      </div>

      {/* User Info */}
      <div className="mb-6 flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <img
          src={user?.photoURL || 'https://i.ibb.co/7CMqG7N/default-avatar.jpg'}
          className="w-12 h-12 rounded-full border-2 border-orange-200 dark:border-orange-600"
          alt="Profile"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-800 dark:text-white truncate">
            {user?.displayName || 'User'}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user?.email}</p>
          <span className="inline-block px-2 py-1 text-xs bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-full mt-1 capitalize">
            {role}
          </span>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col gap-2 flex-1">
        <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
          Navigation
        </h3>
        
        {menuItems.map((item, index) => (
          <NavLink
            key={index}
            to={item.to}
            end={item.to === ''}
            className={({ isActive }) =>
              `${linkStyle} ${isActive ? activeStyle : ''}`
            }
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </NavLink>
        ))}

        {/* Quick Actions */}
        <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2">
            Quick Actions
          </h3>
          
          <Link to="/" className={linkStyle}>
            <FaHome />
            <span>Back to Home</span>
          </Link>
          
          <button onClick={() => navigate(-1)} className={linkStyle}>
            <FaArrowLeft />
            <span>Go Back</span>
          </button>
        </div>
      </nav>

      {/* Logout Button */}
      <div className="mt-auto pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200 font-medium cursor-pointer"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default UserAside;
