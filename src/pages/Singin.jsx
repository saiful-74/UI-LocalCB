
import { auth } from '../Firebase/Firebase.confige';
import React, { useContext, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { sendPasswordResetEmail } from 'firebase/auth';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';

const SignIn = () => {
  const { signinUser, signInWithGoogle } = useContext(AuthContext); 
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [passcode, setPasscode] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleToggle = () => setShow(!show);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    signinUser(email, passcode) 
      .then(() => {
        setEmail('');
        setPasscode('');
        toast.success('Login successful!');
        navigate('/');
      })
      .catch((err) => {
        console.error('Sign-in error:', err);
        
        // Handle specific Firebase auth errors
        let errorMessage = 'Login failed. Please try again.';
        
        switch (err.code) {
          case 'auth/invalid-credential':
            errorMessage = 'Invalid email or password. Please check your credentials and try again.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email. Please sign up first.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Incorrect password. Please try again.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email format. Please enter a valid email.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'This account has been disabled. Please contact support.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many failed attempts. Please try again later.';
            break;
          default:
            errorMessage = err.message || 'Login failed. Please try again.';
        }
        
        setError(errorMessage);
        toast.error(errorMessage);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    
    try {
      await signInWithGoogle();
      toast.success('Google login successful!');
      navigate('/');
    } catch (error) {
      console.error('Google sign-in error:', error);
      
      let errorMessage = 'Google sign-in failed. Please try again.';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-in cancelled. Please try again.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup blocked. Please allow popups and try again.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-in cancelled. Please try again.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection and try again.';
          break;
        default:
          errorMessage = error.message || 'Google sign-in failed. Please try again.';
      }
      
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      toast.error('Please enter your email first!');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success('Password reset email sent! Check your inbox.');
      })
      .catch((err) => {
        console.error('Password reset error:', err);
        
        let errorMessage = 'Failed to send password reset email.';
        
        switch (err.code) {
          case 'auth/user-not-found':
            errorMessage = 'No account found with this email address.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Invalid email format.';
            break;
          case 'auth/too-many-requests':
            errorMessage = 'Too many requests. Please try again later.';
            break;
          default:
            errorMessage = err.message || 'Failed to send password reset email.';
        }
        
        toast.error(errorMessage);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <Helmet>
        <title>Login | LocalChefBazaar</title>
      </Helmet>

      <Toaster />

      <div className="bg-white/90 backdrop-blur-md border border-orange-200 shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-lg">
        <h2 className="text-4xl font-extrabold text-center text-orange-700 mb-8">
          Login to Your Account
        </h2>
        <p className="text-center text-orange-600 mb-8">
          Enter your credentials to continue
        </p>

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 py-3 mb-6 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          <FcGoogle size={24} />
          <span className="font-semibold text-gray-700">
            {loading ? 'Signing in...' : 'Continue with Google'}
          </span>
        </button>

        {/* Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">OR</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-orange-800 font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl placeholder-gray-600 text-black"
            />
          </div>

          <div className="relative flex flex-col">
            <label className="text-orange-800 font-medium mb-1">Password</label>
            <input
              type={show ? 'text' : 'password'}
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              name="password"
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl pr-12 placeholder-gray-600 text-black"
            />
            <button
              type="button"
              onClick={handleToggle}
              className="absolute right-4 top-[42px] text-orange-600 hover:text-orange-800"
            >
              {show ? (
                <AiOutlineEyeInvisible size={22} />
              ) : (
                <AiOutlineEye size={22} />
              )}
            </button>
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              disabled={!email}
              className={`text-sm ${
                email
                  ? 'text-orange-600 hover:underline'
                  : 'text-gray-400 cursor-not-allowed '
              }`}
            >
              Forgot Password?
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
              {error.includes('Invalid email or password') && (
                <div className="mt-2 text-xs text-red-500">
                  <p>• Make sure your email and password are correct</p>
                  <p>• Try using the "Forgot Password?" link if needed</p>
                  <p>• Or sign up for a new account if you don't have one</p>
                </div>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <p className="text-sm text-center text-orange-700 mt-6">
          Don’t have an account?{' '}
          <NavLink
            to="/signup"
            className="text-orange-600 font-medium hover:underline cursor-pointer"
          >
            Sign Up
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
