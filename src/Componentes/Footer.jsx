import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaLinkedinIn,
  FaYoutube,
  FaClock,
} from 'react-icons/fa';
import { FiArrowRight, FiMail } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'All Meals', path: '/allmeals' },
    { name: 'Services', path: '/services' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Blog', path: '/blog' },
    { name: 'Our Chefs', path: '/chefs' },
  ];

  const supportLinks = [
    { name: 'Dashboard', path: '/dashbord' },
    { name: 'Sign Up', path: '/signup' },
    { name: 'Sign In', path: '/signin' },
    { name: 'Help Center', path: '/contact' },
    { name: 'Become a Chef', path: '/signup' },
  ];

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please enter a valid email address');
      return;
    }

    setIsSubscribing(true);
    
    try {
      // Simulate newsletter subscription
      setTimeout(() => {
        toast.success('Successfully subscribed to our newsletter!', {
          icon: '📧',
          duration: 4000,
        });
        setEmail('');
        setIsSubscribing(false);
      }, 1000);
    } catch {
      toast.error('Failed to subscribe. Please try again.');
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-[#111827] text-white pt-16 pb-6 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Company Info */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-[#FBBF24] mb-4">LocalChefBazaar</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Connecting you with home-cooked goodness from local chefs. Fresh,
              healthy & affordable meals — right at your doorstep!
            </p>
            <div className="flex gap-4 text-xl">
              <a
                href="https://web.facebook.com/d.saif01"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FBBF24] transition-colors duration-300 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/localchefbazaar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FBBF24] transition-colors duration-300 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/localchefbazaar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FBBF24] transition-colors duration-300 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.linkedin.com/company/localchefbazaar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FBBF24] transition-colors duration-300 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://www.youtube.com/localchefbazaar"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#FBBF24] transition-colors duration-300 p-2 bg-gray-800 rounded-full hover:bg-gray-700"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-[#FBBF24]">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-[#FBBF24] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-[#FBBF24]">
              Support
            </h3>
            <ul className="space-y-3">
              {supportLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-[#FBBF24] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <FiArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-[#FBBF24]">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-gray-300">
                <FaMapMarkerAlt className="text-[#FBBF24] mt-1 flex-shrink-0" />
                <div>
                  <p>123 Culinary Street</p>
                  <p>Food District, Dhaka 1000</p>
                  <p>Bangladesh</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <a 
                  href="tel:+8801818777856" 
                  className="flex items-center gap-3 text-gray-300 hover:text-[#FBBF24] transition-colors duration-300"
                >
                  <FaPhoneAlt className="text-[#FBBF24] flex-shrink-0" />
                  <span>+880 1818 777 856</span>
                </a>
                
                <a 
                  href="mailto:hakimcolor777@gmail.com" 
                  className="flex items-center gap-3 text-gray-300 hover:text-[#FBBF24] transition-colors duration-300"
                >
                  <FaEnvelope className="text-[#FBBF24] flex-shrink-0" />
                  <span>hakimcolor777@gmail.com</span>
                </a>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center gap-3 mb-3">
                <FaClock className="text-[#FBBF24]" />
                <h4 className="text-lg font-semibold text-[#FBBF24]">
                  Business Hours
                </h4>
              </div>
              <div className="text-gray-300 space-y-1 ml-6">
                <p className="flex justify-between">
                  <span>Mon - Fri:</span>
                  <span>8:00 AM - 10:00 PM</span>
                </p>
                <p className="flex justify-between">
                  <span>Sat - Sun:</span>
                  <span>9:00 AM - 11:00 PM</span>
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  * Order processing 24/7
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FiMail className="text-2xl text-[#FBBF24]" />
              <h3 className="text-2xl font-bold text-[#FBBF24]">
                Stay Updated with LocalChefBazaar
              </h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest updates on new chefs, special offers, and delicious recipes delivered to your inbox
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-[#FBBF24] focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                required
              />
              <button 
                type="submit"
                disabled={isSubscribing}
                className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                  isSubscribing 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-[#FBBF24] hover:bg-yellow-400 text-gray-900'
                }`}
              >
                {isSubscribing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-900 border-t-transparent"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <FiMail />
                    Subscribe
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-gray-400">
                © {new Date().getFullYear()} LocalChefBazaar. All Rights Reserved.
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Made with ❤️ for food lovers everywhere
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm text-gray-400">
              <Link to="/contact" className="hover:text-[#FBBF24] transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/contact" className="hover:text-[#FBBF24] transition-colors duration-300">
                Terms of Service
              </Link>
              <Link to="/contact" className="hover:text-[#FBBF24] transition-colors duration-300">
                Cookie Policy
              </Link>
              <Link to="/contact" className="hover:text-[#FBBF24] transition-colors duration-300">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
