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
import { api } from '../api/axiosSecure'; // ✅ public calls (no credentials needed)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();
  const BASE_URL = import.meta.env.VITE_BACKEND_API;

  // ✅ Axios instance for requests that need credentials (JWT cookie)
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

  const signoutUser = async () => {
    try {
      await api.post('/logout'); // 🔥 clear cookie from backend
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
          // 1) JWT cookie সেট করো
          await axiosSecure.post('/jwt', { email: currentUser.email });

          // 2) role আনার চেষ্টা করো
          try {
            const roleRes = await axiosSecure.get(`/users/role/${currentUser.email}`);
            setRole(roleRes.data?.role || 'user');
          } catch (err) {
            // 3) 404 মানে user ডাটাবেসে নেই → নতুন ইউজার তৈরি করো (public api ব্যবহার করে)
            if (err.response?.status === 404) {
              await api.post('/users', {
                name: currentUser.displayName || 'User',
                email: currentUser.email,
                photo: currentUser.photoURL || '',
              });

              // আবার role fetch করো
              const roleRes2 = await axiosSecure.get(`/users/role/${currentUser.email}`);
              setRole(roleRes2.data?.role || 'user');
            } else {
              throw err; // অন্য কোনো error হলে উপরে পাঠাও
            }
          }
        } catch (error) {
          console.error('Error in auth flow:', error);
          setRole('user');
        }
      } else {
        // ইউজার লগআউট করলে cookie ক্লিয়ার করো
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
  }, []); // ✅ axiosSecure ডিপেন্ডেন্সি হিসেবে না রাখাই ভালো (এটি স্থির)

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