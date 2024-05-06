import { get, ref, query } from 'firebase/database';
import { db } from '../config/firebase-config';

export const getAllUsers = () => {
 return get(query(ref(db, 'users')));
}