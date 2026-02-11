import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';
import { AuthContext } from '../../Context/AuthContext';
import Loading from '../Loading';
import { 
  FiArrowLeft, 
  FiStar, 
  FiClock, 
  FiMapPin, 
  FiUser, 
  FiDollarSign,
  FiHeart,
  FiShoppingCart,
  FiCalendar,
  FiMessageCircle,
  FiThumbsUp,
  FiShare2,
  FiEye
} from 'react-icons/fi';

const MealDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [meal, setMeal] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [relatedMeals, setRelatedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [reviewData, setReviewData] = useState({
    rating: 0,
    comment: '',
  });

  // Mock additional images for demonstration
  const getAdditionalImages = (mainImage) => [
    mainImage,
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop'
  ];

  useEffect(() => {
    fetchMealDetails();
    fetchReviews();
    fetchRelatedMeals();
  }, [id]); // Only depend on id to avoid infinite loops

  const fetchMealDetails = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/mealsd/${id}`);
      setMeal(res.data);
    } catch (err) {
      console.log(err);
      toast.error('Failed to load meal details');
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/reviews/${id}`);
      setReviews(Array.isArray(res.data) ? res.data : res.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRelatedMeals = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/meals?limit=4`);
      if (res.data.success) {
        setRelatedMeals(res.data.data.filter(m => m._id !== id).slice(0, 4));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleReviewSubmit = async () => {
    if (!user) {
      toast.error('Please sign in to leave a review');
      return navigate('/signin');
    }

    if (!reviewData.rating || !reviewData.comment) {
      return toast.error('Rating and comment are required!');
    }

    setReviewLoading(true);

    const newReview = {
      foodId: id,
      mealName: meal.foodName,
      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      rating: Number(reviewData.rating),
      comment: reviewData.comment,
      date: new Date().toISOString(),
      reviewerEmail: user?.email || '',
    };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/reviews`, newReview);
      toast.success('Review added successfully!');
      setReviewData({ rating: 0, comment: '' });
      fetchReviews();
    } catch {
      toast.error('Failed to submit review');
    } finally {
      setReviewLoading(false);
    }
  };

  const handleAddFavorite = async () => {
    if (!user) {
      toast.error('Please sign in to add favorites');
      return navigate('/signin');
    }
    
    if (!meal) return toast.error('Meal not loaded yet');

    const favData = {
      userEmail: user.email,
      mealId: meal._id.toString(),
      mealName: meal.foodName,
      chefId: meal.chefId,
      chefName: meal.chefName,
      price: meal.price,
      addedTime: new Date().toISOString(),
    };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_API}/favorites`, favData);
      toast.success('Added to favorites!');
    } catch {
      toast.error('Failed to add to favorites');
    }
  };

  const handleOrderNow = () => {
    if (!user) {
      toast.error('Please sign in to place an order');
      return navigate('/signin');
    }
    navigate(`/order/${meal._id}`);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: meal.foodName,
        text: `Check out this delicious meal: ${meal.foodName}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : meal?.rating || 0;

  if (loading) return <Loading />;
  if (!meal) return <div className="text-center py-20">Meal not found</div>;

  const images = getAdditionalImages(meal.foodImage);

  return (
    <div className="min-h-screen ">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors duration-300 cursor-pointer"
            >
              <FiArrowLeft size={20} />
              <span className="font-medium">Go back to All Meals</span>
            </button>
            
            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors duration-300 cursor-pointer"
              >
                <FiShare2 size={18} />
                <span className="hidden sm:inline">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={images[currentImageIndex]}
                  alt={meal.foodName}
                  className="w-full h-96 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-3 py-2 rounded-full shadow-lg">
                  <div className="flex items-center gap-1">
                    <FiStar className="text-yellow-500 fill-current" />
                    <span className="font-bold text-gray-800 dark:text-white">{averageRating}</span>
                  </div>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-3">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'ring-2 ring-orange-500 shadow-lg' 
                        : 'hover:shadow-md'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${meal.foodName} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Meal Information */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Title and Price */}
            <div>
              <h1 className="text-4xl font-bold  mb-4">
                {meal.foodName}
              </h1>
              <div className="flex items-center justify-between mb-4">
                <div className="text-3xl font-bold text-orange-500">
                  ${meal.price}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <FiEye />
                    <span>Public Access</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <FiClock className="text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Delivery Time</p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {meal.estimatedDeliveryTime} min
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
                <div className="flex items-center gap-3">
                  <FiMapPin className="text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Delivery Area</p>
                    <p className="font-semibold text-gray-800 dark:text-white">
                      {meal.deliveryArea || 'Local Area'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Chef Information */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <FiUser className="text-white text-2xl" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Chef {meal.chefName}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {meal.chefExperience} years of experience
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleOrderNow}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <FiShoppingCart />
                {user ? 'Order Now' : 'Sign In to Order'}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddFavorite}
                className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-800 dark:text-white border-2 border-gray-200 dark:border-gray-700 px-6 py-4 rounded-xl font-bold hover:border-red-300 hover:text-red-500 transition-all duration-300 cursor-pointer"
              >
                <FiHeart />
                <span className="hidden sm:inline">{user ? 'Add to Favorites' : 'Sign In for Favorites'}</span>
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Detailed Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Description & Overview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-8"
          >
            {/* Description */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Description & Overview
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                  Indulge in our signature {meal.foodName}, a culinary masterpiece crafted with passion and expertise by Chef {meal.chefName}. This delectable dish combines the finest ingredients to create an unforgettable dining experience that will tantalize your taste buds.
                </p>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  Prepared using traditional cooking methods and premium ingredients, this meal represents the perfect balance of flavor, nutrition, and presentation. Each serving is carefully portioned and prepared fresh to ensure maximum quality and taste.
                </p>
              </div>
            </div>

            {/* Key Information & Specifications */}
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Key Information & Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FiUser className="text-orange-500 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">Chef</p>
                      <p className="text-gray-600 dark:text-gray-300">{meal.chefName}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FiDollarSign className="text-green-500 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">Price</p>
                      <p className="text-gray-600 dark:text-gray-300">${meal.price}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FiClock className="text-blue-500 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">Preparation Time</p>
                      <p className="text-gray-600 dark:text-gray-300">{meal.estimatedDeliveryTime} minutes</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FiMapPin className="text-red-500 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">Delivery Area</p>
                      <p className="text-gray-600 dark:text-gray-300">{meal.deliveryArea || 'Local Area'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FiStar className="text-yellow-500 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">Rating</p>
                      <p className="text-gray-600 dark:text-gray-300">{averageRating} / 5.0</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <FiUser className="text-purple-500 mt-1" />
                    <div>
                      <p className="font-semibold text-gray-800 dark:text-white">Chef Experience</p>
                      <p className="text-gray-600 dark:text-gray-300">{meal.chefExperience} years</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Ingredients */}
              {meal.ingredients && (
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Ingredients</h3>
                  <div className="flex flex-wrap gap-2">
                    {(Array.isArray(meal.ingredients) ? meal.ingredients : meal.ingredients.split(',')).map((ingredient, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm font-medium"
                      >
                        {ingredient.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Reviews & Ratings */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Rating Summary */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Reviews & Ratings
              </h3>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-orange-500 mb-2">
                  {averageRating}
                </div>
                <div className="flex justify-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FiStar
                      key={star}
                      className={`${
                        star <= Math.round(averageRating)
                          ? 'text-yellow-500 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Based on {reviews.length} reviews
                </p>
              </div>
            </div>

            {/* Add Review */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Leave a Review
              </h3>
              {user ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Rating
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setReviewData({ ...reviewData, rating: star })}
                          className={`text-2xl ${
                            star <= reviewData.rating
                              ? 'text-yellow-500'
                              : 'text-gray-300'
                          } hover:text-yellow-500 transition-colors`}
                        >
                          <FiStar className={star <= reviewData.rating ? 'fill-current' : ''} />
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Comment
                    </label>
                    <textarea
                      value={reviewData.comment}
                      onChange={(e) => setReviewData({ ...reviewData, comment: e.target.value })}
                      placeholder="Share your experience..."
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                    />
                  </div>
                  
                  <button
                    onClick={handleReviewSubmit}
                    disabled={reviewLoading}
                    className="w-full flex items-center justify-center gap-2 bg-orange-500 text-white px-4 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {reviewLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <FiMessageCircle />
                        Submit Review
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Sign in to leave a review
                  </p>
                  <button
                    onClick={() => navigate('/signin')}
                    className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors cursor-pointer"
                  >
                    Sign In
                  </button>
                </div>
              )}
            </div>

            {/* Recent Reviews */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                Recent Reviews
              </h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {reviews.length > 0 ? (
                  reviews.slice(0, 5).map((review) => (
                    <div key={review._id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                      <div className="flex items-start gap-3">
                        <img
                          src={review.reviewerImage || 'https://via.placeholder.com/40'}
                          alt={review.reviewerName}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-gray-800 dark:text-white text-sm">
                              {review.reviewerName}
                            </h4>
                            <div className="flex items-center gap-1">
                              <FiStar className="text-yellow-500 fill-current text-sm" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {review.rating}
                              </span>
                            </div>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                            {review.comment}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                            <FiCalendar />
                            <span>{new Date(review.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                    No reviews yet. Be the first to review!
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Items */}
        {relatedMeals.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-bold  mb-8">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedMeals.map((relatedMeal) => (
                  <Link
                    key={relatedMeal._id}
                    to={`/mealsd/${relatedMeal._id}`}
                    className="group"
                  >
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1">
                      <img
                        src={relatedMeal.foodImage}
                        alt={relatedMeal.foodName}
                        className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 dark:text-white mb-2 line-clamp-1">
                          {relatedMeal.foodName}
                        </h3>
                        <div className="flex items-center justify-between">
                          <span className="text-orange-500 font-bold">
                            ${relatedMeal.price}
                          </span>
                          <div className="flex items-center gap-1">
                            <FiStar className="text-yellow-500 fill-current text-sm" />
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                              {relatedMeal.rating || '4.5'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MealDetails;
