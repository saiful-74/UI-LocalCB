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
import { api } from '../api/axiosSecure'; // ✅ এখানে withCredentials: true এবং baseURL সেট করা আছে

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  // ---------- ইউজার তৈরি (email/password) ----------
  const createUser = async (email, password, displayName, photoURL) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Firebase প্রোফাইল আপডেট
      await updateProfile(userCredential.user, { displayName, photoURL });

      // 🔐 ব্যাকএন্ডে JWT কুকি সেট করার জন্য /jwt কল
      await api.post('/jwt', { email: userCredential.user.email });

      return userCredential;
    } catch (error) {
      console.error('Create user error:', error);
      throw error;
    }
  };

  // ---------- ইমেইল/পাসওয়ার্ড দিয়ে লগইন ----------
  const signinUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // 🔐 JWT কুকি সেট
      await api.post('/jwt', { email: userCredential.user.email });
      return userCredential;
    } catch (error) {
      console.error('Signin error:', error);
      throw error;
    }
  };

  // ---------- গুগল সাইন-ইন ----------
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // ইউজার ডাটা তৈরি
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

      // চেক করি ইউজার আগে থেকে আছে কিনা (না থাকলে ডাটাবেজে সেভ)
      try {
        await api.get(`/users/${user.email}`);
      } catch (error) {
        if (error.response?.status === 404) {
          await api.post('/users', userData);
        }
      }

      // 🔐 JWT কুকি সেট
      await api.post('/jwt', { email: user.email });

      return result;
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  };

  // ---------- লগআউট (কুকি ক্লিয়ার + ফায়ারবেস সাইনআউট) ----------
  const signoutUser = async () => {
    try {
      await api.post('/logout');   // 🔥 ব্যাকএন্ড থেকে কুকি মুছে ফেলে
      await signOut(auth);          // ফায়ারবেস সাইনআউট
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // ---------- অথ স্টেট পরিবর্তন ট্র্যাক করা ----------
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setUser(currentUser);

      if (currentUser?.email) {
        try {
          // ইউজার থাকলে JWT কুকি রিফ্রেশ (নিশ্চিত করার জন্য)
          await api.post('/jwt', { email: currentUser.email });

          // ইউজারের রোল নেওয়া
          const roleRes = await api.get(`/users/role/${currentUser.email}`);
          setRole(roleRes.data?.role || 'user');
        } catch (error) {
          console.error('Auth state error:', error);
          setRole('user'); // fallback
        }
      } else {
        // ইউজার না থাকলে কুকি মুছে দিই
        try {
          await api.post('/logout');
        } catch (error) {
          console.error('Logout on auth change error:', error);
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