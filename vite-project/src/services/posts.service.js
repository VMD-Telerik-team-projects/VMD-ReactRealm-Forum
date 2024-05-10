import {
  ref,
  push,
  get,
  set,
  update,
  query,
  equalTo,
  orderByChild,
  orderByKey,
  remove,
  onValue
} from "firebase/database";
import { db } from "../config/firebase-config";

export const addPost = async (author, title, content, comments) => {
  const post = {
    author,
    title,
    content,
    createdOn: Date.now(),
    comments,
  };

  const result = await push(ref(db, "posts"), post);
  console.log(result.key);

  await set(ref(db, `users/${author}/posts/${result.key}`), true);
};

export const editPost = async (id, title, content) => {
  const updateVal = {};
  updateVal[`posts/${id}/title`] = title;
  updateVal[`posts/${id}/content`] = content;

  update(ref(db), updateVal);
};

export const getAllPosts = async () => {
  const snapshot = await get(ref(db, "posts"));
  if (!snapshot.exists()) return [];

  return Object.entries(snapshot.val()).map(([key, value]) => {
    return {
      ...value,
      id: key,
      likedBy: value.likedBy ? Object.keys(value.likedBy) : [],
      createdOn: new Date(value.createdOn).toString(),
    };
  });
};

export const getPostById = async (id) => {
  const snapshot = await get(ref(db, `posts/${id}`));

  if (!snapshot.val()) throw new Error("Post with this id does not exist!");

  return {
    ...snapshot.val(),
    id,
    likedBy: snapshot.val().likedBy ? Object.keys(snapshot.val().likedBy) : [],
    createdOn: new Date(snapshot.val().createdOn).toString(),
  };
};

export const deletePostById = async (author, id) => {
  const postRef = ref(db, `posts/${id}`);
  await remove(postRef);

  const userPostsRef = ref(db, `users/${author}/posts/${id}`);
  await remove(userPostsRef);

  alert("Post deleted!");
};

export const likePost = async (postId, handle) => {
  const updateVal = {};
  updateVal[`users/${handle}/likedPosts/${postId}`] = true;
  updateVal[`posts/${postId}/likedBy/${handle}`] = true;

  update(ref(db), updateVal);
};

export const dislikePost = async (postId, handle) => {
  const updateVal = {};
  updateVal[`users/${handle}/likedPosts/${postId}`] = null;
  updateVal[`posts/${postId}/likedBy/${handle}`] = null;

  update(ref(db), updateVal);
};

export const comment = async (postId, handle, content) => {
  const updateVal = {};
  updateVal[`users/${handle}/commentedPosts/${postId}/${Date.now()}`] = content;
  updateVal[`posts/${postId}/comments/${Date.now()}/${handle}`] = content;

  update(ref(db), updateVal);
};

export async function getNumberOfPosts() {
  const postsRef = ref(db, 'posts');

  try {
    const snapshot = await get(postsRef);
    const posts = snapshot.val();
    const numberOfPosts = posts ? Object.keys(posts).length : 0;
    return numberOfPosts;
  } catch (error) {
    console.error(error);
  }
}

export async function getNumberOfUsers() {
  const usersRef = ref(db, 'users');

  try {
    const snapshot = await get(usersRef);
    const users = snapshot.val();
    const numberOfUsers = users ? Object.keys(users).length : 0;
    return numberOfUsers;
  } catch (error) {
    console.error(error);
  }
}