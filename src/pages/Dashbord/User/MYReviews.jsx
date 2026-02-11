import { useEffect, useState, useContext, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Loading from '../../../Componentes/Loading';

const Modal = ({ children, onClose }) => {
  if (typeof document === 'undefined') return null;
  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Edit review modal"
    >
      <div
        className="bg-white border border-gray-200 p-6 rounded-xl shadow-xl w-96 max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

const MyReviews = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingReview, setEditingReview] = useState(null);
  const [updatedRating, setUpdatedRating] = useState('');
  const [updatedComment, setUpdatedComment] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const ratingInputRef = useRef(null);

  const normalizeReview = (r) => {
    const id = r._id;
    let idStr = id;
    if (id && typeof id !== 'string') {
      if (id.$oid) idStr = id.$oid;
      else if (id.toString) idStr = id.toString();
    }
    const foodId = r.foodId;
    let foodIdStr = foodId;
    if (foodId && typeof foodId !== 'string') {
      if (foodId.$oid) foodIdStr = foodId.$oid;
      else if (foodId.toString) foodIdStr = foodId.toString();
    }
    return { ...r, _id: idStr, foodId: foodIdStr };
  };

  const closeModal = () => {
    setEditingReview(null);
    setUpdatedRating('');
    setUpdatedComment('');
    setIsUpdating(false);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (editingReview) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [editingReview]);

  useEffect(() => {
    if (editingReview && ratingInputRef.current) {
      ratingInputRef.current.focus();
    }
  }, [editingReview]);

  useEffect(() => {
    let mounted = true;
    if (user?.email) {
      axios
        .get(
          `${
            import.meta.env.VITE_BACKEND_API
          }/user-reviews/${encodeURIComponent(user.email)}`
        )
        .then((res) => {
          if (!mounted) return;
          const data = res.data?.data || [];
          const normalized = data.map((r) => normalizeReview(r));
          setReviews(normalized);
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to load reviews.');
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
    return () => {
      mounted = false;
    };
  }, [user]);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this review? This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_API}/reviews/${encodeURIComponent(id)}`
      );
      setReviews((prev) => prev.filter((r) => String(r._id) !== String(id)));
      toast.success('Review deleted successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong while deleting.');
    }
  };

  const handleEdit = (review) => {
    const normalized = normalizeReview(review);
    setEditingReview(normalized);
    setUpdatedRating(String(normalized.rating ?? ''));
    setUpdatedComment(normalized.comment ?? '');
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingReview) return;

    const reviewId = String(editingReview._id).trim();

    let ratingNumber = parseInt(updatedRating, 10);
    if (Number.isNaN(ratingNumber)) {
      toast.error('Rating must be a number between 1 and 5.');
      return;
    }
    ratingNumber = Math.max(1, Math.min(5, ratingNumber));

    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to update this review?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No',
    });
    if (!confirm.isConfirmed) return;

    const payload = { rating: ratingNumber, comment: updatedComment };

    setIsUpdating(true);

    const original = reviews.find((r) => String(r._id) === reviewId);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_API}/reviewsup/${encodeURIComponent(
          reviewId
        )}`,
        payload
      );

      if (!res || res.status >= 400 || res.data?.success === false) {
        throw new Error(
          (res && res.data && (res.data.message || res.data.error)) ||
            'Server update failed'
        );
      }

      const serverUpdated = res.data?.updatedReview;
      const updatedToUse =
        serverUpdated && serverUpdated._id
          ? normalizeReview(serverUpdated)
          : {
              ...(original || editingReview),
              rating: ratingNumber,
              comment: updatedComment,
              date: new Date().toISOString(),
              _id: reviewId,
            };

      setReviews((prev) =>
        prev.map((r) =>
          String(r._id) === String(updatedToUse._id) ? updatedToUse : r
        )
      );

      toast.success('Review updated successfully!');
      closeModal();
    } catch (err) {
      console.error('Update failed:', err);
      if (original) {
        setReviews((prev) =>
          prev.map((r) => (String(r._id) === reviewId ? original : r))
        );
        setEditingReview(original);
        setUpdatedRating(String(original.rating ?? ''));
        setUpdatedComment(original.comment ?? '');
      }
      Swal.fire('Error', err.message || 'Failed to update review', 'error');
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-white p-6">
      <title>LocalChefBazaar || My Reviews</title>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          My Reviews
        </h1>
        <p className="text-gray-600">
          Manage and edit your meal reviews
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        {reviews.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Reviews Yet</h3>
            <p className="text-gray-600">You haven't written any reviews yet. Order some meals and share your experience!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((r) => (
              <div
                key={String(r._id)}
                className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="mb-3">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {r.mealName}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-medium text-gray-600">Rating:</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < r.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-2 text-sm font-medium text-gray-700">{r.rating}/5</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-gray-700 leading-relaxed">
                        <span className="font-medium text-gray-800">Comment:</span> {r.comment}
                      </p>
                    </div>

                    <div className="text-sm text-gray-500">
                      <span className="font-medium">Date:</span>{' '}
                      {r.date ? new Date(r.date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      }) : '—'}
                    </div>
                  </div>

                  <div className="flex gap-3 lg:flex-col lg:w-auto">
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors cursor-pointer"
                      onClick={() => handleEdit(r)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
                      onClick={() => handleDelete(r._id)}
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {editingReview && (
        <Modal onClose={closeModal}>
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Update Review</h3>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Meal:</span>{' '}
              <span className="font-semibold text-gray-800">{editingReview.mealName}</span>
            </p>
          </div>

          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating (1-5 stars)
              </label>
              <input
                ref={ratingInputRef}
                type="number"
                min="1"
                max="5"
                value={updatedRating}
                onChange={(e) => setUpdatedRating(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                aria-label="Rating between 1 and 5"
                disabled={isUpdating}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comment
              </label>
              <textarea
                value={updatedComment}
                onChange={(e) => setUpdatedComment(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                required
                aria-label="Comment"
                disabled={isUpdating}
                placeholder="Share your thoughts about this meal..."
              />
            </div>
            
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={closeModal}
                disabled={isUpdating}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update Review'}
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default MyReviews;
