
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../assets/Logo.png';

const Error = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-50 p-6">
      
      <motion.img
        src={Logo}
        alt="LocalChefBazaar Logo"
        className="w-40 mb-6"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      />


      <motion.h1
        className="text-6xl font-extrabold text-orange-500 mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 500, damping: 10 }}
      >
        404
      </motion.h1>


      <motion.h2
        className="text-3xl font-semibold text-gray-800 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Oops! Page not found
      </motion.h2>


      <motion.p
        className="text-gray-600 mb-6 text-center max-w-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.8 }}
      >
        The page you are looking for might have been removed, changed, or is
        temporarily unavailable. Don't worry, you can always go back home!
      </motion.p>

      
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="mb-8"
      >
        <Link
          to="/"
          className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-300 font-semibold shadow-lg"
        >
          Go Back Home
        </Link>
      </motion.div>

  
      <motion.div
        className="flex space-x-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.3 },
          },
        }}
      >
        {['🍔', '🍕', '🥗', '🌮', '🍣'].map((emoji, index) => (
          <motion.span
            key={index}
            className="text-2xl"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
};

export default Error;
