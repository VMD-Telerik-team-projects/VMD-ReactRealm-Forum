import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useEffect } from 'react';
const auth = getAuth();

export const loginUser = async (email, password) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (error) {
    throw error;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('user');
  return signOut(auth);
};

export const getUserFromLocalStorage = () => {
  const userData = localStorage.getItem('user');
  return userData ? JSON.parse(userData) : null;
};

useEffect(() => {
    const userData = getUserFromLocalStorage();
    if (userData) {
      setUser(userData);
    }
  }, []);