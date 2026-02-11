import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TipsSlider = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_API}
/meals/latest`)
      .then((res) => res.json())
      .then((data) => setMeals(data.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto my-16 px-4 py-8 bg-gradient-to-b from-amber-50 via-amber-100 to-amber-50 rounded-3xl shadow-xl">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-amber-900 drop-shadow-md">
        🍴 Featured Dishes
      </h2>

      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={40}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        loop={true}
        className="rounded-3xl"
      >
        {meals.map((meal) => (
          <SwiperSlide key={meal._id}>
            <div className="flex flex-col md:flex-row items-center border border-amber-200 rounded-3xl p-6 md:p-10 bg-gradient-to-r from-amber-50 via-white to-amber-100 shadow-lg hover:shadow-amber-400 transition duration-500 gap-6 md:gap-10">
              <div className="flex-1 space-y-4">
                <h3 className="text-3xl font-bold text-amber-900">
                  {meal.foodName}
                </h3>
                <p className="text-amber-700 font-semibold text-lg">
                  By {meal.chefName}
                </p>
                <p className="text-gray-600 text-lg">
                  Delivery Time: {meal.estimatedDeliveryTime} min
                </p>

                <div className="text-sm text-gray-700 space-y-1">
                  <p>
                    <span className="font-semibold text-amber-700">
                      💰 Price:
                    </span>{' '}
                    ${meal.price}
                  </p>
                  <p>
                    <span className="font-semibold text-amber-700">
                      ⭐ Rating:
                    </span>{' '}
                    {meal.rating || 'Not rated'}
                  </p>
                  <p>
                    <span className="font-semibold text-amber-700">
                      🧾 Ingredients:
                    </span>{' '}
                    {meal.ingredients.join(', ')}
                  </p>
                  <p>
                    <span className="font-semibold text-amber-700">
                      📧 Chef Email:
                    </span>{' '}
                    {meal.userEmail}
                  </p>
                </div>
              </div>

              <div className="flex-1 relative group">
                <img
                  src={meal.foodImage}
                  alt={meal.foodName}
                  className="w-full h-80 md:h-96 object-cover rounded-2xl transform transition duration-700 group-hover:scale-105 shadow-lg"
                />
                <div className="absolute inset-0 bg-amber-200 bg-opacity-10 rounded-2xl opacity-0 group-hover:opacity-30 transition duration-500"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TipsSlider;
