import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiStar, FiClock, FiMapPin, FiUser, FiEye, FiChevronLeft, FiChevronRight, FiLoader, FiSearch, FiFilter, FiX, FiSliders } from 'react-icons/fi';

const MealsPage = () => {
  const [filteredMeals, setFilteredMeals] = useState([]);
  const [allMeals, setAllMeals] = useState([]); // Store all meals for client-side filtering
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalMeals, setTotalMeals] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 12;

  // Search and Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    priceRange: { min: '', max: '' },
    rating: '',
    deliveryTime: '',
    chefExperience: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });

  // Filter Options
  const categories = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Dessert', 'Beverages'];
  const ratingOptions = ['All', '4.5+', '4.0+', '3.5+', '3.0+'];
  const deliveryTimeOptions = ['All', '15 min', '30 min', '45 min', '60 min'];
  const experienceOptions = ['All', '1+ years', '3+ years', '5+ years', '10+ years'];
  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'price-asc', label: 'Price (Low to High)' },
    { value: 'price-desc', label: 'Price (High to Low)' },
    { value: 'rating-desc', label: 'Rating (High to Low)' },
    { value: 'rating-asc', label: 'Rating (Low to High)' },
    { value: 'deliveryTime-asc', label: 'Delivery Time (Fast to Slow)' },
    { value: 'deliveryTime-desc', label: 'Delivery Time (Slow to Fast)' }
  ];

  const navigate = useNavigate();

  // Fetch all meals for client-side filtering
  const fetchAllMeals = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/meals?limit=1000`);
      if (res.data.success) {
        setAllMeals(res.data.data);
        setTotalMeals(res.data.data.length);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Apply filters and search
  const applyFiltersAndSearch = useCallback(() => {
    let filtered = [...allMeals];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(meal =>
        meal.foodName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        meal.chefName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (meal.ingredients && meal.ingredients.join(' ').toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (filters.category && filters.category !== 'All') {
      filtered = filtered.filter(meal => 
        meal.category?.toLowerCase() === filters.category.toLowerCase() ||
        meal.foodName?.toLowerCase().includes(filters.category.toLowerCase())
      );
    }

    // Price range filter
    if (filters.priceRange.min) {
      filtered = filtered.filter(meal => parseFloat(meal.price) >= parseFloat(filters.priceRange.min));
    }
    if (filters.priceRange.max) {
      filtered = filtered.filter(meal => parseFloat(meal.price) <= parseFloat(filters.priceRange.max));
    }

    // Rating filter
    if (filters.rating && filters.rating !== 'All') {
      const minRating = parseFloat(filters.rating.replace('+', ''));
      filtered = filtered.filter(meal => parseFloat(meal.rating || 4.0) >= minRating);
    }

    // Delivery time filter
    if (filters.deliveryTime && filters.deliveryTime !== 'All') {
      const maxTime = parseInt(filters.deliveryTime.replace(' min', ''));
      filtered = filtered.filter(meal => parseInt(meal.estimatedDeliveryTime || 30) <= maxTime);
    }

    // Chef experience filter
    if (filters.chefExperience && filters.chefExperience !== 'All') {
      const minExp = parseInt(filters.chefExperience.replace('+ years', ''));
      filtered = filtered.filter(meal => parseInt(meal.chefExperience || 1) >= minExp);
    }

    // Sorting
    const [sortField, sortDirection] = filters.sortBy.includes('-') 
      ? filters.sortBy.split('-') 
      : [filters.sortBy, filters.sortOrder];

    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortField) {
        case 'name':
          aValue = a.foodName?.toLowerCase() || '';
          bValue = b.foodName?.toLowerCase() || '';
          break;
        case 'price':
          aValue = parseFloat(a.price) || 0;
          bValue = parseFloat(b.price) || 0;
          break;
        case 'rating':
          aValue = parseFloat(a.rating) || 0;
          bValue = parseFloat(b.rating) || 0;
          break;
        case 'deliveryTime':
          aValue = parseInt(a.estimatedDeliveryTime) || 0;
          bValue = parseInt(b.estimatedDeliveryTime) || 0;
          break;
        default:
          aValue = a.foodName?.toLowerCase() || '';
          bValue = b.foodName?.toLowerCase() || '';
      }

      if (sortDirection === 'desc') {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });

    setFilteredMeals(filtered);
    setCurrentPage(1);
  }, [allMeals, searchTerm, filters]);

  // Get current page meals
  const getCurrentPageMeals = () => {
    const startIndex = 0;
    const endIndex = currentPage * itemsPerPage;
    return filteredMeals.slice(startIndex, endIndex);
  };

  const handleLoadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handlePriceRangeChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      priceRange: {
        ...prev.priceRange,
        [type]: value
      }
    }));
  };

  const handleSortChange = (sortValue) => {
    setFilters(prev => ({
      ...prev,
      sortBy: sortValue
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      priceRange: { min: '', max: '' },
      rating: '',
      deliveryTime: '',
      chefExperience: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
    setSearchTerm('');
  };

  const handleSeeDetails = (mealId) => {
    navigate(`/mealsd/${mealId}`);
  };

  useEffect(() => {
    fetchAllMeals();
  }, [fetchAllMeals]);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [applyFiltersAndSearch]);

  const currentMeals = getCurrentPageMeals();
  const hasMoreToShow = currentPage * itemsPerPage < filteredMeals.length;

  // Skeleton Card Component
  const SkeletonCard = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden h-[420px] animate-pulse">
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700"></div>
      <div className="p-6">
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded mb-3"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2 w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-4 w-1/2"></div>
        <div className="flex justify-between items-center mb-4">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-16"></div>
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-12"></div>
        </div>
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded"></div>
      </div>
    </div>
  );

  // Meal Card Component
  const MealCard = ({ meal }) => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 h-[420px] flex flex-col border border-gray-200 dark:border-gray-700 cursor-pointer group"
      onClick={() => handleSeeDetails(meal._id)}
    >
      {/* Image */}
      <div className="relative overflow-hidden h-48">
        <img
          src={meal.foodImage || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop'}
          alt={meal.foodName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=250&fit=crop';
          }}
        />
        <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-2 py-1 rounded-full shadow-md">
          <div className="flex items-center gap-1 text-yellow-500">
            <FiStar className="fill-current" />
            <span className="text-sm font-semibold text-gray-800 dark:text-white">
              {meal.rating || '4.5'}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors duration-300">
          {meal.foodName}
        </h3>

        {/* Short Description */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3 line-clamp-2 flex-1">
          {meal.ingredients ? 
            `Delicious ${meal.foodName} made with ${meal.ingredients.slice(0, 3).join(', ')}${meal.ingredients.length > 3 ? '...' : ''}` :
            `Fresh and delicious ${meal.foodName} prepared by our expert chef with premium ingredients.`
          }
        </p>

        {/* Meta Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <FiUser className="text-orange-500" />
              <span>{meal.chefName}</span>
            </div>
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <FiClock className="text-blue-500" />
              <span>{meal.estimatedDeliveryTime || '30'} min</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
              <FiMapPin className="text-green-500" />
              <span>{meal.chefLocation || 'Local Area'}</span>
            </div>
            <div className="text-lg font-bold text-orange-500">
              ${meal.price}
            </div>
          </div>
        </div>

        {/* View Details Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevent double click from card
            handleSeeDetails(meal._id);
          }}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300 cursor-pointer group-hover:from-orange-600 group-hover:to-red-600"
        >
          <FiEye />
          View Details
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen  py-12">
      <div className="max-w-7xl mx-auto px-4">
        <title>LocalChefBazaar || Meals</title>
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 ">
            Daily Meals
          </h1>
          <p className="text-lg 0 max-w-2xl mx-auto">
            Discover delicious home-cooked meals from local chefs in your area
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          {/* Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-center mb-6">
            <div className="flex-1 w-full relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                placeholder="Search meals, chefs, or ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-all duration-300"
              />
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  showFilters 
                    ? 'bg-orange-500 text-white' 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-orange-100 dark:hover:bg-gray-600'
                }`}
              >
                <FiSliders />
                Filters
              </button>
              
              <select
                value={filters.sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white font-medium cursor-pointer transition-all duration-300"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-4">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  >
                    {categories.map(category => (
                      <option key={category} value={category === 'All' ? '' : category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Price Range
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={filters.priceRange.min}
                      onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                      className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={filters.priceRange.max}
                      onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                      className="w-full px-2 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Rating
                  </label>
                  <select
                    value={filters.rating}
                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  >
                    {ratingOptions.map(rating => (
                      <option key={rating} value={rating === 'All' ? '' : rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Delivery Time Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Delivery Time
                  </label>
                  <select
                    value={filters.deliveryTime}
                    onChange={(e) => handleFilterChange('deliveryTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  >
                    {deliveryTimeOptions.map(time => (
                      <option key={time} value={time === 'All' ? '' : time}>
                        {time}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Chef Experience Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Chef Experience
                  </label>
                  <select
                    value={filters.chefExperience}
                    onChange={(e) => handleFilterChange('chefExperience', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm"
                  >
                    {experienceOptions.map(exp => (
                      <option key={exp} value={exp === 'All' ? '' : exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Filter Actions */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {filteredMeals.length} meals found
                </div>
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-orange-500 transition-colors duration-300"
                >
                  <FiX />
                  Clear Filters
                </button>
              </div>
            </div>
          )}
          
          {/* Active Filters Display */}
          {(searchTerm || filters.category || filters.priceRange.min || filters.priceRange.max || filters.rating || filters.deliveryTime || filters.chefExperience) && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              {searchTerm && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-300 rounded-full text-sm">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')}>
                    <FiX size={14} />
                  </button>
                </span>
              )}
              {filters.category && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                  Category: {filters.category}
                  <button onClick={() => handleFilterChange('category', '')}>
                    <FiX size={14} />
                  </button>
                </span>
              )}
              {(filters.priceRange.min || filters.priceRange.max) && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-full text-sm">
                  Price: ${filters.priceRange.min || '0'} - ${filters.priceRange.max || '∞'}
                  <button onClick={() => handlePriceRangeChange('min', '') || handlePriceRangeChange('max', '')}>
                    <FiX size={14} />
                  </button>
                </span>
              )}
              {filters.rating && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-full text-sm">
                  Rating: {filters.rating}
                  <button onClick={() => handleFilterChange('rating', '')}>
                    <FiX size={14} />
                  </button>
                </span>
              )}
              {filters.deliveryTime && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                  Delivery: {filters.deliveryTime}
                  <button onClick={() => handleFilterChange('deliveryTime', '')}>
                    <FiX size={14} />
                  </button>
                </span>
              )}
              {filters.chefExperience && (
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300 rounded-full text-sm">
                  Experience: {filters.chefExperience}
                  <button onClick={() => handleFilterChange('chefExperience', '')}>
                    <FiX size={14} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {loading ? (
            // Skeleton Loading
            Array.from({ length: 12 }, (_, index) => (
              <SkeletonCard key={index} />
            ))
          ) : currentMeals.length > 0 ? (
            // Actual Meals
            currentMeals.map((meal) => (
              <MealCard key={meal._id} meal={meal} />
            ))
          ) : (
            // No Results
            <div className="col-span-full text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                No meals found
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Try adjusting your search terms or filters to find what you're looking for
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-300"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Load More / Pagination */}
        {!loading && currentMeals.length > 0 && (
          <div className="flex flex-col items-center gap-6">
            {/* Load More Button */}
            {hasMoreToShow && (
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <span>Load More Meals</span>
                <FiChevronRight size={20} />
              </button>
            )}

            {/* Results Info */}
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {currentMeals.length} of {filteredMeals.length} meals
                {filteredMeals.length !== totalMeals && (
                  <span className="text-gray-500"> (filtered from {totalMeals} total)</span>
                )}
              </p>
              {!hasMoreToShow && filteredMeals.length > 12 && (
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                  🎉 You've seen all filtered results!
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MealsPage;
