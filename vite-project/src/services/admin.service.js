import {
  get,
  ref,
  query,
  update,
  remove,
  getDatabase,
} from "firebase/database";
import { toast } from "react-toastify";
import { db } from "../config/firebase-config";

export const getAllUsers = () => {
  return get(query(ref(db, "users")));
};

export const deleteUserByHandle = (handle) => {
  return remove(ref(db, `users/${handle}`));
};

export const blockUserByHandle = async (handle) => {
  try {
    const db = getDatabase();
    const userRef = ref(db, `users/${handle}`);
    await update(userRef, { isBlocked: true });
    toast.success("User blocked successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const unblockUserByHandle = async (handle) => {
  try {
    const db = getDatabase();
    const userRef = ref(db, `users/${handle}`);
    await update(userRef, { isBlocked: false });
    toast.success("User unblocked successfully");
  } catch (error) {
    console.error(error);
    throw error;
  }
};
