import { useEffect, useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

const apiBase = import.meta.env.VITE_BACKEND_API;

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processingIds, setProcessingIds] = useState(new Set());

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${apiBase}/role-requests`);
        setRequests(res.data?.data || []);
      } catch (err) {
        console.error(err);
        toast.error('Failed to fetch requests', { position: 'top-center' });
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const startProcessing = (id) => {
    setProcessingIds((prev) => new Set(prev).add(id));
  };

  const stopProcessing = (id) => {
    setProcessingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const handleApprove = async (id, t) => {
    startProcessing(id);
    try {
      const res = await axios.patch(`${apiBase}/role-requests/${id}/approve`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success(res.data?.message || 'Request approved', { position: 'top-center' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to approve request', { position: 'top-center' });
    } finally {
      stopProcessing(id);
      if (t?.id) toast.dismiss(t.id);
    }
  };

  const handleDecline = async (id, t) => {
    startProcessing(id);
    try {
      const res = await axios.patch(`${apiBase}/role-requests/${id}/decline`);
      setRequests((prev) => prev.filter((r) => r._id !== id));
      toast.success(res.data?.message || 'Request declined', { position: 'top-center' });
    } catch (err) {
      console.error(err);
      toast.error('Failed to decline request', { position: 'top-center' });
    } finally {
      stopProcessing(id);
      if (t?.id) toast.dismiss(t.id);
    }
  };

  const confirmAction = (id, actionType) => {
    toast(
      (t) => (
        <div
          className="max-w-sm w-full p-4 rounded-lg shadow-lg text-center bg-white text-gray-900"
          role="dialog"
          aria-modal="true"
        >
          <p className="text-lg font-semibold mb-3">
            Are you sure you want to {actionType} this request?
          </p>
          <div className="text-sm text-gray-600 dark:text-gray-300 mb-4">
            This action cannot be undone.
          </div>

          <div className="flex justify-center gap-3">
            <button
              onClick={() =>
                actionType === 'approve' ? handleApprove(id, t) : handleDecline(id, t)
              }
              className={`px-4 py-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2
                          ${
                            actionType === 'approve'
                              ? 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500'
                              : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                          }`}
              aria-label={`${actionType} request`}
            >
              Yes, {actionType}
            </button>

            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-4 py-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none cursor-pointer"
              aria-label="Cancel"
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { duration: Infinity, position: 'top-center' }
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div
          className="w-14 h-14 rounded-full border-4 border-t-transparent border-green-500 animate-spin"
          aria-hidden="true"
        />
        <span className="sr-only">Loading requests</span>
      </div>
    );
  }

  if (!requests.length) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-2">No pending requests</p>
          <p className="text-gray-500">All role requests have been processed.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <title>LocalChefBazaar || Manage Requests</title>
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Manage Role Requests
        </h1>
        <p className="text-gray-600">
          Review and approve pending role change requests
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Toaster position="top-center" />
        
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Pending Role Requests
          </h2>

          <div className="space-y-4">
            {requests.map((r) => {
              const isProcessing = processingIds.has(r._id);
              return (
                <div
                  key={r._id}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 transition-colors"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-lg text-gray-800 truncate">
                      {r.name || 'Unnamed'}{' '}
                      <span className="text-sm font-medium text-gray-500">
                        ({r.email || 'no-email'})
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      Requested Role: <span className="font-medium">{r.roleRequest || '—'}</span>
                    </p>
                    {r.message && (
                      <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                        {r.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-3 sm:mt-0 flex items-center gap-2">
                    <button
                      onClick={() => confirmAction(r._id, 'approve')}
                      disabled={isProcessing}
                      className={`px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer
                                  ${isProcessing ? 'opacity-60 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'}`}
                      aria-label={`Approve ${r.name}`}
                    >
                      {isProcessing ? 'Processing...' : 'Approve'}
                    </button>

                    <button
                      onClick={() => confirmAction(r._id, 'decline')}
                      disabled={isProcessing}
                      className={`px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer
                                  ${isProcessing ? 'opacity-60 cursor-not-allowed' : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'}`}
                      aria-label={`Decline ${r.name}`}
                    >
                      {isProcessing ? 'Processing...' : 'Decline'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageRequests;