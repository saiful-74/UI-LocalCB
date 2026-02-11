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

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('');
  const [loading, setLoading] = useState(true);

  const googleProvider = new GoogleAuthProvider();

  const createUser = async (email, password, displayName, photoURL) => {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: displayName,
      photoURL: photoURL,
    });

    return userCredential;
  };

  const signinUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Save user data to MongoDB
    const userData = {
      email: user.email,
      name: user.displayName,
      profileImg: user.photoURL,
      address: '', // Default empty address for Google users
      role: 'user',
      provider: 'google',
      uid: user.uid,
      createdAt: new Date().toISOString(),
    };

    // Check if user already exists in MongoDB, if not create new user
    await axios.get(`${import.meta.env.VITE_BACKEND_API}/users/check/${user.email}`)
      .catch(async (error) => {
        if (error.response?.status === 404) {
          // User doesn't exist, create new user in MongoDB
          await axios.post(`${import.meta.env.VITE_BACKEND_API}/users`, userData);
        }
      });

    return result;
  };

  const signoutUser = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(true);

      if (currentUser) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_API}/check-role/${currentUser.email}`
          );
          setRole(response.data.role || 'user');
        } catch (error) {
          console.error('Error fetching role:', error);
          setRole('user');
        }
      } else {
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
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
