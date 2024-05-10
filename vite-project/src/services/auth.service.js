import { update, ref } from 'firebase/database';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, db } from '../config/firebase-config';

export const registerUser = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const updateUserOnlineStatus = (handle, isOnline) => {
  const onlineUserRef = ref(db, `onlineUsers/${handle}`);
  
  update(onlineUserRef, {
    isOnline
  });
  
  return update(ref(db, `users/${handle}`), {
    isOnline
  });
};

export const loginUser = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logoutUser = (handle) => {
  updateUserOnlineStatus(handle, false);
  return signOut(auth);
};
