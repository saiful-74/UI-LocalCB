import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaUtensils } from 'react-icons/fa';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthContext';

const AddMeals = () => {
  const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 0,
    },
  });

  const [loading, setLoading] = useState(false);

  const generateChefId = (email, foodName) => {
    const emailPart = email.substring(0, 3).toLowerCase();
    const lengthPart = foodName.length;
    const timestamp = Date.now().toString().slice(-4);
    return `${emailPart}${lengthPart}${timestamp}`;
  };

  const onSubmit = async (data) => {
    if (!data.foodImage[0]) return alert('Please select an image!');

    setLoading(true);

    const formData = new FormData();
    formData.append('image', data.foodImage[0]);

    try {
      const apiKey = '4069702c25ccc162b662f2c5ce170f8d';
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );

      const imageUrl = response.data.data.url;

      const chefId = generateChefId(user?.email || '', data.foodName);

      const finalData = {
        foodName: data.foodName,
        chefName: data.chefName,
        foodImage: imageUrl,
        price: parseFloat(data.price),
        rating: parseFloat(data.rating || 0),
        ingredients: data.ingredients.split(',').map((item) => item.trim()),
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        chefExperience: data.chefExperience,
        chefId: chefId,
        userEmail: user?.email || '',
        createdAt: new Date(),
        deliveryArea: data.deliveryArea,
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}
/meals`,
        finalData
      );

      toast.success('Meal added successfully!');
      console.log(finalData);
      reset();
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to add meal!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-yellow-50 shadow-lg rounded-lg mt-10">
      <title>LocalChefBazaar || Create meal</title>
      <Toaster />
      <h2 className="text-3xl font-bold mb-6 text-orange-600 flex items-center gap-2">
        <FaUtensils /> Create Meal
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block mb-1 font-semibold text-orange-500">
            Food Name
          </label>
          <input
            type="text"
            {...register('foodName', { required: true })}
            className="w-full border border-orange-300 px-3 py-2 rounded focus:ring-2 focus:ring-orange-400 placeholder:text-balance"
            placeholder="e.g., Grilled Chicken Salad"
          />
          {errors.foodName && (
            <span className="text-red-500 text-sm">Food Name is required</span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-orange-500">
            Chef Name
          </label>
          <input
            type="text"
            {...register('chefName', { required: true })}
            className="w-full border border-orange-300 px-3 py-2 rounded focus:ring-2 focus:ring-orange-400"
            placeholder="e.g., John Doe"
          />
          {errors.chefName && (
            <span className="text-red-500 text-sm">Chef Name is required</span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-orange-500">
            Food Image
          </label>
          <input
            type="file"
            {...register('foodImage', { required: true })}
            accept="image/*"
            className="w-full border border-orange-300 px-3 py-2 rounded focus:ring-2 focus:ring-orange-400"
          />
          {errors.foodImage && (
            <span className="text-red-500 text-sm">Food Image is required</span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-orange-500">
            Price ($)
          </label>
          <input
            type="number"
            step="0.01"
            {...register('price', { required: true })}
            className="w-full border border-orange-300 px-3 py-2 rounded focus:ring-2 focus:ring-orange-400"
            placeholder="e.g., 12.99"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">Price is required</span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-orange-500">
            Rating (0-5)
          </label>
          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            {...register('rating', { min: 0, max: 5 })}
            className="w-full border border-orange-300 px-3 py-2 rounded focus:ring-2 focus:ring-orange-400"
            placeholder="e.g., 4.5"
          />
          {errors.rating && (
            <span className="text-red-500 text-sm">Rating must be 0-5</span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-orange-500">
            Ingredients (comma-separated)
          </label>
          <input
            type="text"
            {...register('ingredients', { required: true })}
            className="w-full border border-orange-300 px-3 py-2 rounded focus:ring-2 focus:ring-orange-400"
            placeholder="e.g., Chicken breast, Lettuce, Tomatoes"
          />
          {errors.ingredients && (
            <span className="text-red-500 text-sm">
              Ingredients are required
            </span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-orange-500">
            Estimated Delivery Time
          </label>
          <input
            type="text"
            {...register('estimatedDeliveryTime', { required: true })}
            className="w-full border border-orange-300 px-3 py-2 rounded focus:ring-2 focus:ring-orange-400"
            placeholder="e.g., 30 minutes"
          />
          {errors.estimatedDeliveryTime && (
            <span className="text-red-500 text-sm">
              Estimated Delivery Time is required
            </span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-orange-500">
            Chef Experience
          </label>
          <input
            type="text"
            {...register('chefExperience', { required: true })}
            className="w-full border border-orange-300 px-3 py-2 rounded focus:ring-2 focus:ring-orange-400"
            placeholder="e.g., 5 years of experience"
          />
          {errors.chefExperience && (
            <span className="text-red-500 text-sm">
              Chef Experience is required
            </span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-orange-500">
            Delivery Area
          </label>
          <input
            type="text"
            {...register('deliveryArea', { required: true })}
            className="w-full border border-orange-300 px-3 py-2 rounded focus:ring-2 focus:ring-orange-400"
            placeholder="e.g., New York, Manhattan"
          />
          {errors.deliveryArea && (
            <span className="text-red-500 text-sm">
              Delivery Area is required
            </span>
          )}
        </div>

        <div>
          <label className="block mb-1 font-semibold text-orange-500">
            User Email
          </label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="w-full border border-orange-300 px-3 py-2 rounded bg-gray-100 text-gray-700"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded shadow cursor-pointer ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Uploading...' : 'Add Meal'}
        </button>
      </form>
    </div>
  );
};

export default AddMeals;
