import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../utils/smoothScroll';

const DalySixDataDB = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}/meals/latest`)
      .then((res) => res.json())
      .then((data) => {
        setMeals(data.data.slice(0, 6));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSeeAllMeals = () => {
    // Smooth scroll to top when navigating
    scrollToTop();
  };

  return (
    <section className="py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center font-heading">Daily Meals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <div
              key={meal._id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 flex flex-col border border-gray-200 dark:border-gray-700"
            >
              <img
                src={meal.foodImage || 'https://via.placeholder.com/400x250'}
                alt={meal.foodName}
                className="w-full h-56 object-cover"
              />
              <div className="p-5 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
                    <strong>{meal.foodName}</strong>
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Chef:</strong> {meal.chefName}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-1">
                    <strong>Ingredients:</strong> {meal.ingredients.join(', ')}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    <strong>Delivery: </strong> {meal.estimatedDeliveryTime} mins
                    | <strong>Experience: </strong> {meal.chefExperience} yrs
                  </p>
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-red-500 font-bold text-xl">
                    <strong>${meal.price}</strong>
                  </p>
                  <p className="text-yellow-500 font-semibold">
                    <strong>⭐ {meal.rating}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* See All Meals Button */}
        <div className="text-center mt-12">
          <Link 
            to="/allmeals" 
            onClick={handleSeeAllMeals}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg hover:from-orange-600 hover:to-red-600 transform hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            See All Meals
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DalySixDataDB;
