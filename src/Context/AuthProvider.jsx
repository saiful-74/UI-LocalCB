import { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase.confige';
import axios from 'axios';
import { api } from '../api/axiosSecure'; // ✅ import the axios instance from your api folder

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const BASE_URL = import.meta.env.VITE_BACKEND_API;

  // Create axios instance with credentials (you may keep this for other calls)
  const axiosSecure = axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
  });

  const createUser = async (email, password, displayName, photoURL) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName,
      photoURL,
    });

    await axiosSecure.post('/jwt', { email: userCredential.user.email });

    return userCredential;
  };

  const signinUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    await axiosSecure.post('/jwt', { email: userCredential.user.email });

    return userCredential;
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userData = {
      email: user.email,
      name: user.displayName,
      profileImg: user.photoURL,
      address: '',
      role: 'user',
      provider: 'google',
      uid: user.uid,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.get(`${BASE_URL}/users/${user.email}`);
    } catch (error) {
      if (error.response?.status === 404) {
        await axios.post(`${BASE_URL}/users`, userData);
      }
    }

    await axiosSecure.post('/jwt', { email: user.email });

    return result;
  };

  // ✅ Replaced logout function exactly as instructed
  const signoutUser = async () => {
    try {
      await api.post('/logout'); // 🔥 cookie clear from backend
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);

      if (currentUser?.email) {
        try {
          await axiosSecure.post('/jwt', { email: currentUser.email });
          
          const roleRes = await axiosSecure.get(`/users/role/${currentUser.email}`);
          setRole(roleRes.data?.role || 'user');
        } catch (error) {
          console.error('Error in auth flow:', error);
          setRole('user');
        }
      } else {
        try {
          await axiosSecure.post('/logout');
        } catch (error) {
          console.error('Error clearing cookie:', error);
        }
        setRole('');
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    role,
    loading,
    createUser,
    signinUser,
    signInWithGoogle,
    signoutUser,
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;