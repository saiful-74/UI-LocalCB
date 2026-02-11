import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../Componentes/Loading';

const fallbackImg =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><rect width='100%' height='100%' fill='%23F3F4F6'/><text x='50%' y='50%' font-size='16' text-anchor='middle' fill='%239CA3AF' dy='.3em'>No Image</text></svg>";

const Chefs = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChefs = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/users/chefs`
        );

        if (response.data?.success) {
          setChefs(response.data.data || []);
        } else {
          setChefs([]);
        }
      } catch (err) {
        console.error('Error fetching chefs:', err);
        setChefs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChefs();
  }, []);

  if (loading) return <Loading />;

  if (!chefs || chefs.length === 0)
    return <p className="text-center text-gray-500 mt-8">No chefs found.</p>;

  return (
    <>
      <div className="mb-4 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        <button
          type="button"
          onClick={() => window.history.back()}
          aria-label="Go back"
          className="inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition"
        >
          ← Back
        </button>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        {/* Center the grid and limit width; use xl:grid-cols-8 as requested */}
        <section className="max-w-screen-2xl mx-auto grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8">
          {chefs.map((chef) => (
            <article
              key={chef._id}
              className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 flex flex-col"
              aria-labelledby={`chef-${chef._id}-name`}
            >
              <div className="flex items-center gap-4 p-4">
                <img
                  src={chef.profileImg || fallbackImg}
                  alt={chef.name ? `${chef.name} profile` : 'Chef profile'}
                  onError={(e) => (e.currentTarget.src = fallbackImg)}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
                />

                <div className="min-w-0">
                  <h2
                    id={`chef-${chef._id}-name`}
                    className="text-sm sm:text-base font-semibold text-gray-900 truncate"
                    title={chef.name}
                  >
                    {chef.name || 'Unnamed Chef'}
                  </h2>

                  <p className="text-xs sm:text-sm text-gray-500 capitalize truncate">
                    {chef.role || 'Chef'}
                  </p>

                  {chef.address && (
                    <p className="text-xs text-gray-400 truncate">{chef.address}</p>
                  )}
                </div>
              </div>

              {chef.bio && (
                <p className="px-4 pb-4 text-xs sm:text-sm text-gray-600">
                  {chef.bio.length > 120 ? `${chef.bio.slice(0, 120)}…` : chef.bio}
                </p>
              )}

              <div className="px-4 pb-4 flex flex-col gap-1 mt-auto">
                <span className="text-xs text-gray-500 break-words">
                  {chef.email || ''}
                </span>

                {chef.cuisines && chef.cuisines.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {chef.cuisines.slice(0, 4).map((c, i) => (
                      <span
                        key={i}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </>
  );
};

export default Chefs;