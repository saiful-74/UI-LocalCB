import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { updateProfile } from 'firebase/auth';
import { db } from '../Firebase/Firebase.confige';
import { AuthContext } from '../Context/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import { Helmet } from 'react-helmet';
import { doc, setDoc } from 'firebase/firestore';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const { createUser, signInWithGoogle } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [profileFile, setProfileFile] = useState(null);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleToggle = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !name || !address || !password || !confirmPassword) {
      setLoading(false);
      return toast.error('Please fill all fields.');
    }
    if (!profileFile) {
      setLoading(false);
      return toast.error('Please upload a profile image.');
    }
    if (password !== confirmPassword) {
      setLoading(false);
      return toast.error('Passwords do not match.');
    }
    if (password.length < 6) {
      setLoading(false);
      return toast.error('Password must be at least 6 characters.');
    }
    if (!/[A-Z]/.test(password)) {
      setLoading(false);
      return toast.error('Password must contain an uppercase letter.');
    }
    if (!/[0-9]/.test(password)) {
      setLoading(false);
      return toast.error('Password must include a number.');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setLoading(false);
      return toast.error('Password must include a special character.');
    }

    try {
      const formData = new FormData();
      formData.append('image', profileFile);

      const uploadRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=4069702c25ccc162b662f2c5ce170f8d`,
        formData
      );
      const profileImg = uploadRes.data.data.display_url;

      const userCredential = await createUser(email, password);

      await updateProfile(userCredential.user, {
        displayName: name,
        photoURL: profileImg,
      });

      const userData = { 
        email, 
        name, 
        address, 
        password, 
        profileImg,
        role: 'user',
        provider: 'email',
        uid: userCredential.user.uid,
        createdAt: new Date().toISOString()
      };
      
      await axios.post(
        `${import.meta.env.VITE_BACKEND_API}/users`,
        userData
      );

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        profileImg,
        address,
        role: 'user',
        status: 'active',
        uid: userCredential.user.uid,
        createdAt: new Date(),
      });

      toast.success('Account created successfully!');
      setTimeout(() => navigate('/'), 500);
    } catch (error) {
      console.error('Sign-up error:', error);
      
      let errorMessage = 'Account creation failed. Please try again.';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'An account with this email already exists. Please sign in instead.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email format. Please enter a valid email.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/password accounts are not enabled. Please contact support.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password is too weak. Please choose a stronger password.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection and try again.';
          break;
        default:
          errorMessage = error.message || 'Account creation failed. Please try again.';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setLoading(true);
    
    try {
      await signInWithGoogle();
      toast.success('Google sign-up successful!');
      navigate('/');
    } catch (error) {
      console.error('Google sign-up error:', error);
      
      let errorMessage = 'Google sign-up failed. Please try again.';
      
      switch (error.code) {
        case 'auth/popup-closed-by-user':
          errorMessage = 'Sign-up cancelled. Please try again.';
          break;
        case 'auth/popup-blocked':
          errorMessage = 'Popup blocked. Please allow popups and try again.';
          break;
        case 'auth/cancelled-popup-request':
          errorMessage = 'Sign-up cancelled. Please try again.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Network error. Please check your connection and try again.';
          break;
        case 'auth/account-exists-with-different-credential':
          errorMessage = 'An account already exists with this email using a different sign-in method.';
          break;
        default:
          errorMessage = error.message || 'Google sign-up failed. Please try again.';
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center px-4 mt-10 mb-6">
        <Helmet>
          <title>Sign Up | LocalChefBazaar</title>
        </Helmet>
        <Toaster position="top-right" />

        <div className="backdrop-blur-md border border-orange-200 shadow-2xl rounded-3xl p-8 sm:p-10 w-full max-w-lg">
          <h2 className="text-4xl font-extrabold text-center mb-8">
            Create Your Account
          </h2>

          {/* Google Sign Up Button */}
          <button
            onClick={handleGoogleSignUp}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 py-3 mb-6 bg-white border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            <FcGoogle size={24} />
            <span className="font-semibold text-gray-700">
              {loading ? 'Signing up...' : 'Continue with Google'}
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
              <label className="font-medium mb-1">Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-4 py-3  placeholder-gray-600 bg-orange-50 border  text-black border-orange-200 rounded-xl"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className=" font-medium mb-1">Profile Image</label>
              <input
                type="file"
                className=" w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl text-gray-900"
                onChange={(e) => setProfileFile(e.target.files[0])}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className="font-medium mb-1">Address</label>
              <input
                type="text"
                name="text"
                className="w-full px-4 text-black py-3 bg-orange-50 border border-orange-200 rounded-xl placeholder-gray-600"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label className=" font-medium mb-1">Email</label>
              <input
                type="email"
                name="email"
                className=" text-black w-full px-4 py-3 bg-orange-50 border border-orange-200 rounded-xl placeholder-gray-600"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="flex flex-col relative">
              <label className=" font-medium mb-1">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 bg-orange-50 border  text-black border-orange-200 rounded-xl pr-12 placeholder-gray-600"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-4 top-[42px] text-red-700"
                onClick={handleToggle}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={22} />
                ) : (
                  <AiOutlineEye size={22} />
                )}
              </button>
            </div>

            <div className="flex flex-col">
              <label className=" font-medium mb-1">Confirm Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="w-full px-4 py-3 text-black bg-orange-50 border border-orange-200 rounded-xl placeholder-gray-600"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-amber-500 text-white font-bold rounded-xl hover:bg-amber-600 shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-sm text-center text-orange-700 mt-6">
            Already have an account?{' '}
            <NavLink
              to="/signin"
              className="text-orange-600 font-semibold hover:underline"
            >
              Sign In
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
