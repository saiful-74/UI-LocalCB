import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../../Context/AuthContext';
import Swal from 'sweetalert2';
import Loading from '../../../Componentes/Loading';
import { useForm } from 'react-hook-form';
import { api } from '../../../api/axiosSecure'; // ✅ axios instance import

const MyMeals = () => {
  const { user } = useContext(AuthContext);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedMeal) {
      const defaultValues = {
        foodName: selectedMeal.foodName || '',
        foodImage: selectedMeal.foodImage || '',
        price: selectedMeal.price || '',
        rating: selectedMeal.rating || '',
        estimatedDeliveryTime: selectedMeal.estimatedDeliveryTime || '',
        ingredients: Array.isArray(selectedMeal.ingredients)
          ? selectedMeal.ingredients.join(', ')
          : selectedMeal.ingredients || '',
      };
      reset(defaultValues);
    }
  }, [selectedMeal, reset]);

  const normalizeId = (m) => {
    const id = m._id;
    if (!id) return m;
    if (typeof id === 'string') return m;
    if (id.$oid) return { ...m, _id: id.$oid };
    if (id.toString) return { ...m, _id: id.toString() };
    return m;
  };

  useEffect(() => {
    const fetchMeals = async () => {
      if (!user?.email) return;
      try {
        const res = await api.get(`/user-meals/${user.email}`); // ✅ replaced fetch
        if (res.data.success) {
          const normalized = res.data.data.map((m) => normalizeId(m));
          setMeals(normalized);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [user?.email]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'This meal will be deleted permanently!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/meals/${id}`); // ✅ replaced fetch
        Swal.fire('Deleted!', 'Meal has been deleted.', 'success');
        setMeals((prev) => prev.filter((meal) => meal._id !== id));
      } catch (err) {
        console.error('Delete failed:', err);
        Swal.fire('Error', 'Failed to delete meal.', 'error');
      }
    }
  };

  const handleOpenModal = (meal) => {
    const normalized = normalizeId(meal);
    setSelectedMeal(normalized);
  };

  const handleCloseModal = () => {
    setSelectedMeal(null);
    reset();
  };

  const onUpdate = async (data) => {
    if (!selectedMeal || !selectedMeal._id) {
      Swal.fire('Error', 'No meal selected or missing id', 'error');
      return;
    }

    const ingredientsArray = data.ingredients
      ? data.ingredients.split(',').map((item) => item.trim())
      : [];

    const payload = {
      foodName: data.foodName,
      foodImage: data.foodImage,
      price: Number(data.price),
      rating: Number(data.rating),
      estimatedDeliveryTime: Number(data.estimatedDeliveryTime),
      ingredients: ingredientsArray,
    };

    // Optimistic update
    const optimisticMeal = {
      ...selectedMeal,
      ...payload,
      _id: selectedMeal._id,
    };
    setMeals((prev) =>
      prev.map((m) => (m._id === optimisticMeal._id ? optimisticMeal : m))
    );
    setSelectedMeal(null);
    Swal.fire('Updated!', 'Meal has been updated.', 'success');

    // Background server update
    try {
      const id = encodeURIComponent(String(selectedMeal._id).trim());
      await api.put(`/meals/${id}`, payload); // ✅ replaced fetch
    } catch (err) {
      console.error('Background update failed:', err);
      Swal.fire(
        'Warning',
        'Server update failed — changes may not be saved.',
        'warning'
      );
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white p-6">
      <title>LocalChefBazaar || My Meals</title>

      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Meals ({meals.length})</h1>
        <p>Manage and update your added meals</p>
      </div>

      <div className="max-w-6xl mx-auto">
        {meals.length === 0 ? (
          <div className="rounded-xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">No Meals Added Yet</h3>
            <p className="text-gray-600">
              Start adding meals to showcase your culinary skills!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <div
                key={meal._id}
                className="border p-4 rounded-xl shadow text-black flex flex-col justify-between h-full"
              >
                <div>
                  <img
                    src={meal.foodImage}
                    alt={meal.foodName}
                    className="rounded-md h-44 w-full object-cover"
                  />
                  <h3 className="mt-3 text-xl font-bold">{meal.foodName}</h3>
                  <p className="text-sm mt-1">
                    Price: <span className="font-semibold">${meal.price}</span>
                  </p>
                  <p className="text-sm mt-1">
                    Rating: <span className="font-semibold">{meal.rating}</span>
                  </p>
                  <p className="text-sm mt-2">
                    Ingredients:
                    <span className="font-semibold">
                      {' '}
                      {Array.isArray(meal.ingredients)
                        ? meal.ingredients.join(', ')
                        : meal.ingredients}
                    </span>
                  </p>
                  <p className="text-sm mt-1">
                    Delivery Time:
                    <span className="font-semibold">
                      {' '}
                      {meal.estimatedDeliveryTime} min
                    </span>
                  </p>
                  <p className="text-sm mt-1">
                    Chef Name:
                    <span className="font-semibold"> {meal.chefName}</span>
                  </p>
                  <p className="text-sm mt-1">
                    Chef ID:
                    <span className="font-semibold"> {meal.chefId}</span>
                  </p>
                </div>

                <div className="flex justify-center gap-4 mt-4">
                  <button
                    onClick={() => handleOpenModal(meal)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedMeal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 relative">
              <h3 className="text-xl font-bold mb-4">Update Meal</h3>
              <form onSubmit={handleSubmit(onUpdate)} className="space-y-3">
                <div>
                  <input
                    type="text"
                    placeholder="Food Name"
                    className="w-full border px-3 py-2 rounded"
                    {...register('foodName', { required: 'Food name is required' })}
                  />
                  {errors.foodName && (
                    <p className="text-red-500 text-sm mt-1">{errors.foodName.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="url"
                    placeholder="Food Image URL"
                    className="w-full border px-3 py-2 rounded"
                    {...register('foodImage', { required: 'Image URL is required' })}
                  />
                  {errors.foodImage && (
                    <p className="text-red-500 text-sm mt-1">{errors.foodImage.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Price"
                    className="w-full border px-3 py-2 rounded"
                    {...register('price', {
                      required: 'Price is required',
                      min: { value: 0, message: 'Price must be positive' },
                    })}
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    placeholder="Rating (0-5)"
                    className="w-full border px-3 py-2 rounded"
                    {...register('rating', {
                      required: 'Rating is required',
                      min: { value: 0, message: 'Rating cannot be negative' },
                      max: { value: 5, message: 'Rating cannot exceed 5' },
                    })}
                  />
                  {errors.rating && (
                    <p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Ingredients (comma separated)"
                    className="w-full border px-3 py-2 rounded"
                    {...register('ingredients', {
                      required: 'Ingredients are required',
                      validate: (value) =>
                        value.split(',').every((item) => item.trim() !== '') ||
                        'Each ingredient must be non-empty',
                    })}
                  />
                  {errors.ingredients && (
                    <p className="text-red-500 text-sm mt-1">{errors.ingredients.message}</p>
                  )}
                </div>

                <div>
                  <input
                    type="number"
                    placeholder="Estimated Delivery Time (min)"
                    className="w-full border px-3 py-2 rounded"
                    {...register('estimatedDeliveryTime', {
                      required: 'Delivery time is required',
                      min: { value: 1, message: 'Delivery time must be at least 1 minute' },
                    })}
                  />
                  {errors.estimatedDeliveryTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.estimatedDeliveryTime.message}
                    </p>
                  )}
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyMeals;