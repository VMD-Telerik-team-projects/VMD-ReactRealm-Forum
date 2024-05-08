import { get, set, ref, query, equalTo, orderByChild } from "firebase/database";
import { db } from "../config/firebase-config";

export const getUserByHandle = (handle) => {
  return get(ref(db, `users/${handle}`));
};

export const createUserHandle = (
  firstName,
  lastName,
  handle,
  uid,
  email,
  priviliges,
  isBlocked
) => {
  return set(ref(db, `users/${handle}`), {
    firstName,
    lastName,
    handle,
    uid,
    email,
    createdOn: new Date(),
    priviliges,
    isBlocked,
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
};

export const getLikedPosts = (handle) => {
  return get(ref(db, `users/${handle}/likedPosts`));
}

//Add isBlocked field to all the users in the database

// const updateUserDatabase = (async () => {
//   await get(query(ref(db, "users")))
//     .then((snapshot) => {
//       Object.values(snapshot.val()).map((eachUser) => {
//         set(ref(db, `users/${eachUser.handle}`), {
//           ...eachUser,
//           isBlocked: false,
//         });
//       });
//     })
//     .catch((error) => {
//       console.error("Error retrieving user data:", error);
//     });
// })();
