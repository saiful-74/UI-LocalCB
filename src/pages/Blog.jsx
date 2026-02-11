import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUser, FiArrowRight, FiClock, FiTag, FiMail, FiCheck } from 'react-icons/fi';

const Blog = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubscribed(true);
      setIsLoading(false);
      setEmail('');
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubscribed(false);
      }, 3000);
    }, 1000);
  };
  
  const blogPosts = [
    {
      id: 1,
      title: "10 Healthy Meal Prep Ideas for Busy Professionals",
      excerpt: "Discover time-saving meal prep strategies that will keep you eating healthy even during your busiest weeks. Learn how to prepare nutritious meals in advance.",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop",
      author: "Chef Maria Rodriguez",
      date: "Jan 10, 2026",
      readTime: "5 min read",
      category: "Health & Nutrition",
      featured: true
    },
    {
      id: 2,
      title: "The Art of Italian Pasta: From Nonna's Kitchen",
      excerpt: "Learn the secrets behind authentic Italian pasta dishes from our featured chef who trained in Tuscany. Master the techniques passed down through generations.",
      image: "https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=400&h=250&fit=crop",
      author: "Chef Giuseppe Bianchi",
      date: "Jan 8, 2026",
      readTime: "7 min read",
      category: "Cooking Tips",
      featured: true
    },
    {
      id: 3,
      title: "Sustainable Cooking: Local Ingredients, Global Impact",
      excerpt: "How choosing local ingredients can make a difference for both your health and the environment. Explore the benefits of farm-to-table cooking.",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop",
      author: "Chef Sarah Green",
      date: "Jan 5, 2026",
      readTime: "6 min read",
      category: "Sustainability",
      featured: false
    },
    {
      id: 4,
      title: "Spice It Up: A Guide to Asian Flavor Profiles",
      excerpt: "Explore the complex world of Asian spices and learn how to balance sweet, sour, salty, and umami flavors in your cooking.",
      image: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400&h=250&fit=crop",
      author: "Chef David Kim",
      date: "Jan 3, 2026",
      readTime: "8 min read",
      category: "World Cuisine",
      featured: false
    },
    {
      id: 5,
      title: "The Science of Baking: Perfect Bread Every Time",
      excerpt: "Understanding the chemistry behind bread making will help you achieve consistent, delicious results every time you bake.",
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=250&fit=crop",
      author: "Chef Isabella Santos",
      date: "Dec 28, 2025",
      readTime: "10 min read",
      category: "Baking",
      featured: false
    },
    {
      id: 6,
      title: "Farm-to-Table: Building Relationships with Local Farmers",
      excerpt: "Learn how to source the freshest ingredients directly from local farms and build lasting relationships with producers in your area.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
      author: "Chef Michael Chen",
      date: "Dec 25, 2025",
      readTime: "6 min read",
      category: "Sustainability",
      featured: false
    }
  ];

  const categories = ["All", "Health & Nutrition", "Cooking Tips", "World Cuisine", "Sustainability", "Baking"];
  const [selectedCategory, setSelectedCategory] = React.useState("All");

  const filteredPosts = selectedCategory === "All" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  const featuredPosts = blogPosts.filter(post => post.featured);

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Kitchen Blog
          </motion.h1>
          <motion.p
            className="text-xl opacity-90 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Discover cooking tips, recipes, and stories from our talented chef community
          </motion.p>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 px-4 ">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured Articles
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full">
                      Featured
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <FiUser className="text-orange-500" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiCalendar className="text-orange-500" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FiClock className="text-orange-500" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white group-hover:text-orange-500 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <Link to={`/blog/${post.id}`}>
                      <button className="flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-300 group-hover:gap-3 cursor-pointer">
                        Read More
                        <FiArrowRight className="transition-all duration-300" />
                      </button>
                    </Link>
                    <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                      <FiTag size={14} />
                      <span className="text-sm">{post.category}</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Posts */}
      <section className="py-16 px-4 ">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-4xl font-bold text-center mb-12 "
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group hover:-translate-y-2 border border-gray-200 dark:border-gray-700"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-orange-500 text-white text-sm font-semibold rounded-full flex items-center gap-1">
                      <FiTag size={12} />
                      {post.category}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-2">
                      <FiUser className="text-orange-500" />
                      <span className="truncate">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <FiCalendar className="text-orange-500" />
                        <span>{post.date}</span>
                      </div>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white line-clamp-2 group-hover:text-orange-500 transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Link to={`/blog/${post.id}`}>
                      <button className="flex items-center gap-2 text-orange-500 font-semibold hover:text-orange-600 transition-colors duration-300 group-hover:gap-3 text-sm cursor-pointer">
                        Read More
                        <FiArrowRight className="transition-all duration-300" />
                      </button>
                    </Link>
                    <div className="flex items-center gap-1 text-gray-400 dark:text-gray-500">
                      <FiClock size={14} />
                      <span className="text-xs">Quick read</span>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 px-4 ">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <FiMail className="text-3xl" />
            <h2 className="text-4xl font-bold">Never Miss a Recipe</h2>
          </motion.div>
          
          <motion.p
            className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Subscribe to our newsletter and get the latest cooking tips and recipes delivered to your inbox
          </motion.p>

          {isSubscribed ? (
            <motion.div
              className="flex items-center justify-center gap-3 text-2xl font-semibold"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <FiCheck className="text-green-300" />
              <span>Thank you for subscribing!</span>
            </motion.div>
          ) : (
            <motion.form
              onSubmit={handleSubscribe}
              className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl text-gray-800 focus:ring-4 focus:ring-white/30 focus:outline-none"
                required
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 bg-white text-orange-500 font-bold rounded-xl hover:bg-gray-100 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
                    Subscribing...
                  </>
                ) : (
                  <>
                    <FiMail />
                    Subscribe
                  </>
                )}
              </button>
            </motion.form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;