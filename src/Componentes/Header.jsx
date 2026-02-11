
import React, { useContext, useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  FiLogOut, 
  FiMenu, 
  FiX, 
  FiSun, 
  FiMoon, 
  FiHome, 
  FiGrid, 
  FiSettings, 
  FiInfo, 
  FiMail, 
  FiUser,
  FiChevronDown 
} from 'react-icons/fi';
import logo from '../assets/Logo.png';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import Swal from 'sweetalert2';
import { scrollToTop } from '../utils/smoothScroll';

const Header = () => {
  const { user, signoutUser } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );
  const navigate = useNavigate();


  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);


  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      darkMode ? 'dark' : 'light'
    );
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const navLinks = user
    ? [
        { name: 'Home', path: '/', icon: <FiHome /> },
        { name: 'Meals', path: '/allmeals', icon: <FiGrid /> },
        { name: 'Services', path: '/services', icon: <FiSettings /> },
        { name: 'About', path: '/about', icon: <FiInfo /> },
        { name: 'Contact', path: '/contact', icon: <FiMail /> },
        { name: 'Dashboard', path: 'dashbord', icon: <FiUser /> },
      ]
    : [
        { name: 'Home', path: '/', icon: <FiHome /> },
        { name: 'Meals', path: '/allmeals', icon: <FiGrid /> },
        { name: 'Services', path: '/services', icon: <FiSettings /> },
      ];

  const handleLogout = () => {
    if (!signoutUser) return;

    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out from your account!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#D35400',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, log me out!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        signoutUser()
          .then(() => {
            Swal.fire({
              title: 'Logged out!',
              text: 'You have been successfully logged out.',
              icon: 'success',
              timer: 1500,
              showConfirmButton: false,
            });
            toast.success('Successfully logged out!');
            setTimeout(() => navigate('/'), 1500);
          })
          .catch((error) => {
            toast.error(`Logout error: ${error.message}`);
          });
      }
    });
  };

  const toggleButtonClass =
    'ml-4 p-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition';

  return (
    <header
      className="w-full fixed top-0 left-0 shadow-md z-50 bg-[#1a1a1a] h-[80px] flex items-center animate__animated animate__fadeInDown animate__faster"
      style={{
        backgroundColor: 'var(--header-bg)',
        color: 'var(--header-text)',
      }}
    >
      <Toaster position="top-right" />

      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 w-full max-w-8xl mx-auto">
        <NavLink to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Logo" className="w-12 h-12 sm:w-16 sm:h-16 rounded-full" />
          <span className="hidden sm:flex text-2xl lg:text-3xl font-bold font-heading">
            <span className="text-red-900 font-extrabold">L</span>
            <span className="text-gray-300">C</span>
            <span className="text-yellow-400">B</span>
            <span className="text-green-300">Z</span>
            <span className="text-blue-200">R</span>
          </span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-2 font-medium transition-all duration-200 px-2 xl:px-3 py-2 rounded-lg text-sm xl:text-base ${
                  isActive
                    ? 'text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/20'
                    : 'text-white hover:text-[#FFD700] hover:bg-white/5'
                }`
              }
            >
              <span className="text-base xl:text-lg">{link.icon}</span>
              <span className="hidden xl:inline">{link.name}</span>
            </NavLink>
          ))}

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`${toggleButtonClass} flex items-center gap-2 p-2`}
            title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {user ? (
            <div className="flex items-center gap-2 xl:gap-4">
              <div className="relative group">
                <div className="flex items-center gap-1 xl:gap-2 cursor-pointer p-2 rounded-lg hover:bg-white/5 transition-colors duration-300">
                  <img
                    src={
                      user.photoURL || 'https://i.ibb.co/2Z3p8wN/default-user.png'
                    }
                    alt="User"
                    className="w-8 h-8 xl:w-10 xl:h-10 rounded-full border-2 border-[#FFD700]"
                  />
                  <FiChevronDown className="text-white group-hover:text-[#FFD700] transition-colors duration-300" size={16} />
                </div>
                
                <div className="absolute top-12 xl:top-14 right-0 bg-white dark:bg-gray-800 text-gray-800 dark:text-white shadow-2xl rounded-xl p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 min-w-[200px] xl:min-w-[250px] border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-3 pb-3 border-b border-gray-200 dark:border-gray-600">
                    <img
                      src={user.photoURL || 'https://i.ibb.co/2Z3p8wN/default-user.png'}
                      alt="User"
                      className="w-10 h-10 xl:w-12 xl:h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-xs xl:text-sm">{user.displayName || 'User'}</p>
                      <p className="text-gray-500 dark:text-gray-400 text-xs">{user.email}</p>
                    </div>
                  </div>
                  <div className="py-2 space-y-1">
                    <NavLink 
                      to="/dashbord/profile" 
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 text-xs xl:text-sm"
                    >
                      <FiUser size={14} />
                      Profile
                    </NavLink>
                    <NavLink 
                      to="/dashbord" 
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 text-xs xl:text-sm"
                    >
                      <FiGrid size={14} />
                      Dashboard
                    </NavLink>
                  </div>
                </div>
              </div>

              <button onClick={handleLogout} className="px-3 xl:px-4 py-2 bg-amber-500 text-white font-bold rounded-xl shadow-md hover:bg-amber-600 transition text-sm xl:text-base">
                <FiLogOut size={16} className="inline mr-1 xl:mr-2" />
                <span className="hidden lg:inline">Log Out</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 xl:gap-3">
              <NavLink to="/signin">
                <button className="flex items-center gap-1 xl:gap-2 px-3 xl:px-4 py-2 bg-transparent border-2 border-amber-500 text-amber-500 font-bold rounded-xl hover:bg-amber-500 hover:text-white transition-all duration-300 text-sm xl:text-base">
                  <FiUser size={14} />
                  <span className="hidden xl:inline">Sign In</span>
                </button>
              </NavLink>
              <NavLink to="/signup">
                <button className="flex items-center gap-1 xl:gap-2 px-3 xl:px-4 py-2 bg-amber-500 text-white font-bold rounded-xl shadow-md hover:bg-amber-600 transition text-sm xl:text-base">
                  <FiUser size={14} />
                  <span className="hidden xl:inline">Sign Up</span>
                </button>
              </NavLink>
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-2xl sm:text-3xl text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden fixed top-[80px] right-0 w-full sm:w-80 h-[calc(100vh-80px)] p-4 sm:p-6 bg-[#D35400] shadow-2xl sm:rounded-bl-3xl animate__animated animate__slideInRight z-40 overflow-y-auto">
          <nav className="flex flex-col py-4 space-y-3 sm:space-y-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => {
                  setIsOpen(false);
                  // Smooth scroll to top on navigation
                  setTimeout(() => scrollToTop(), 100);
                }}
                className={({ isActive }) =>
                  `flex items-center gap-3 text-base sm:text-lg transition-all duration-200 p-3 rounded-lg ${
                    isActive
                      ? 'text-[#FFD700] bg-[#FFD700]/10 border border-[#FFD700]/20'
                      : 'text-white hover:text-[#FFD700] hover:bg-white/10'
                  }`
                }
              >
                <span className="text-lg sm:text-xl">{link.icon}</span>
                {link.name}
              </NavLink>
            ))}

            <div className="border-t border-white/20 pt-3 sm:pt-4 mt-3 sm:mt-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="ml-4 p-2 rounded-full bg-amber-500 text-white hover:bg-amber-600 transition flex items-center gap-2 w-full justify-center text-sm sm:text-base"
              >
                {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>

            <div className="border-t border-white/20 pt-3 sm:pt-4">
              {user ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/10 rounded-lg">
                    <img
                      src={user.photoURL || 'https://i.ibb.co/2Z3p8wN/default-user.png'}
                      alt="User"
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-[#FFD700]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm sm:text-base truncate">{user.displayName || 'User'}</p>
                      <p className="text-white/70 text-xs sm:text-sm truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 bg-amber-500 text-white font-bold rounded-xl shadow-md hover:bg-amber-600 transition flex items-center gap-2 w-full justify-center text-sm sm:text-base"
                  >
                    <FiLogOut size={16} />
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <NavLink to="/signin" onClick={() => setIsOpen(false)}>
                    <button className="flex items-center gap-2 justify-center px-4 py-3 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-[#D35400] transition w-full text-sm sm:text-base">
                      <FiUser size={16} />
                      Sign In
                    </button>
                  </NavLink>
                  <NavLink to="/signup" onClick={() => setIsOpen(false)}>
                    <button className="px-4 py-2 bg-amber-500 text-white font-bold rounded-xl shadow-md hover:bg-amber-600 transition flex items-center gap-2 justify-center w-full text-sm sm:text-base">
                      <FiUser size={16} />
                      Sign Up
                    </button>
                  </NavLink>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
