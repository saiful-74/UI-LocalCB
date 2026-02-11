import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiAward, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const ChefSpotlight = () => {
  const featuredChefs = [
    {
      id: 1,
      name: "Chef Maria Rodriguez",
      specialty: "Mediterranean Cuisine",
      experience: "15 years",
      rating: 4.9,
      location: "Downtown",
      image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=300&h=300&fit=crop&crop=face",
      signature: "Authentic Paella Valenciana",
      orders: "2,500+",
      bio: "Trained in Valencia, Spain, Maria brings authentic Mediterranean flavors to your table."
    },
    {
      id: 2,
      name: "Chef David Kim",
      specialty: "Korean Fusion",
      experience: "12 years",
      rating: 4.8,
      location: "Midtown",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      signature: "Kimchi Fried Rice Bowl",
      orders: "1,800+",
      bio: "Blending traditional Korean techniques with modern presentation and local ingredients."
    },
    {
      id: 3,
      name: "Chef Isabella Santos",
      specialty: "Brazilian Comfort Food",
      experience: "10 years",
      rating: 4.9,
      location: "Riverside",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      signature: "Feijoada Completa",
      orders: "2,200+",
      bio: "Bringing the warmth of Brazilian home cooking with family recipes passed down for generations."
    }
  ];

  return (
    <section className="py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">
            Meet Our Featured Chefs
          </h2>
          <p className="text-xl  max-w-2xl mx-auto">
            Talented local chefs bringing authentic flavors and culinary expertise to your doorstep
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredChefs.map((chef, index) => (
            <motion.div
              key={chef.id}
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Chef Image */}
              <div className="relative">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <FiStar className="text-yellow-500 text-sm" />
                  <span className="font-semibold text-sm">{chef.rating}</span>
                </div>
                <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {chef.orders} Orders
                </div>
              </div>

              {/* Chef Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                  {chef.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <FiMapPin className="text-orange-500" />
                  <span className="text-gray-600 dark:text-gray-300">{chef.location}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-600 dark:text-gray-300">{chef.experience}</span>
                </div>

                <div className="mb-4">
                  <span className="inline-block bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 px-3 py-1 rounded-full text-sm font-semibold">
                    {chef.specialty}
                  </span>
                </div>

                <div className="mb-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-1">Signature Dish:</h4>
                  <p className="text-orange-600 dark:text-orange-400 font-medium">{chef.signature}</p>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 leading-relaxed">
                  {chef.bio}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FiAward className="text-orange-500" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Top Rated Chef
                    </span>
                  </div>
                  
                  <Link to="/allmeals">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors duration-300"
                    >
                      View Meals
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <Link to="/chefs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              Meet All Our Chefs
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ChefSpotlight;