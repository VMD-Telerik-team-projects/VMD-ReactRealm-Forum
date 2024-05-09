import { getDownloadURL } from "firebase/storage";
import { get, set, ref, query, equalTo, orderByChild } from "firebase/database";
import { db, storage } from "../config/firebase-config";

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

//  TODO: Retrieve profile pictures from firebase storage
//  TODO: Move bucket link to an env file
export const getProfilePic = (handle) => {
  const pathRef = ref(storage, `profile-pictures/${handle}/profile-pic.jpg`);
  const gsRef = ref(storage, `gs://vmd-reactrealm-forum.appspot.com/${pathRef}`);
}

//  TODO: Track online users:
//  https://firebase.google.com/docs/database/web/offline-capabilities
//  https://www.quora.com/How-do-I-show-list-of-other-logged-in-users-to-a-user-when-he-she-logs-in-to-the-app-in-firebase-Android

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
