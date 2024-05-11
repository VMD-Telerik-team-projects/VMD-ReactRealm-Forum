import { get, set, ref, query, equalTo, orderByChild, remove, update, getDatabase } from "firebase/database";
import * as fbStorage from "firebase/storage";
import { getAuth, updateEmail, updatePassword } from "firebase/auth";
import { db, storage } from "../config/firebase-config";
import { Navigate } from "react-router-dom";

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
    isOnline: false
  });
};

export const getUserData = (uid) => {
  return get(query(ref(db, "users"), orderByChild("uid"), equalTo(uid)));
};

export const getLikedPosts = (handle) => {
  return get(ref(db, `users/${handle}/likedPosts`));
};

export const updateUserData = async (handle, userData) => {
  const auth = getAuth();
  const user = auth.currentUser;

  try {
    if (user) {
      if (userData.email) {
        await updateEmail(user, userData.email);
      }

      if (userData.password) {
        await updatePassword(user, userData.password);
      }
    }

    //  for security reasons, we don't want to store the password in the database
    const dataWithoutPassword = { ...userData };
    delete dataWithoutPassword.password;

    set(ref(db, `users/${handle}`), dataWithoutPassword);
    window.location.replace('/')
  } catch (e) {
    return alert(`Failed to update user data: ${e.message}`);
  }

  return alert(`User ${handle}'s data updated successfully`);
};

export const uploadProfilePic = async (fileExtension, handle, image) => {
  const pathRef = fbStorage.ref(storage, `profile-pictures/${handle}/profile-pic.${fileExtension}`);

  try {
    await fbStorage.uploadBytes(pathRef, image);
    alert("Profile picture uploaded successfully");
  } catch (e) {
    alert(`Failed to upload profile picture: ${e.message}`);
  }
};

export const getProfilePic = async (handle) => {
  const pathRef = fbStorage.ref(storage, `profile-pictures/${handle}/profile-pic.jpg`);

  const image = await fbStorage.getDownloadURL(pathRef);
  return image;
}

// 

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
