import { ref, push, get, set, update, remove } from "firebase/database";
import { db } from "../config/firebase-config";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  const users = (await get(ref(db, `users/`))).val();
  users &&
    Object.keys(users).forEach((user) => {
      const likedPostsRef = ref(db, `users/${user}/likedPosts/${id}`);
      remove(likedPostsRef);

      const commentedPostsRef = ref(db, `users/${user}/commentedPosts/${id}`);
      remove(commentedPostsRef);

      const likedCommentsRef = ref(db, `users/${user}/likedComments/${id}`);
      remove(likedCommentsRef);
    });

  toast.success("Post deleted!");
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
  const currentDate = Date.now();

  updateVal[`users/${handle}/commentedPosts/${postId}/${currentDate}`] =
    content;
  updateVal[`posts/${postId}/comments/${currentDate}/${handle}`] = content;

  update(ref(db), updateVal);
};

export const likeComment = async (postId, commentTimeStamp, handle) => {
  const updateVal = {};
  updateVal[
    `users/${handle}/likedComments/${postId}/${commentTimeStamp}`
  ] = true;
  updateVal[
    `posts/${postId}/comments/${commentTimeStamp}/likes/${handle}`
  ] = true;

  update(ref(db), updateVal);
};

export const disLikeComment = async (postId, commentTimeStamp, handle) => {
  const updateVal = {};
  updateVal[`users/${handle}/likedComments/${postId}/${commentTimeStamp}`] =
    null;
  updateVal[`posts/${postId}/comments/${commentTimeStamp}/likes/${handle}`] =
    null;

  update(ref(db), updateVal);
};

export const deleteComment = async (postId, commentTimeStamp, handle) => {
  const updateVal = {};
  updateVal[`posts/${postId}/comments/${commentTimeStamp}`] = null;
  updateVal[`users/${handle}/commentedPosts/${postId}/${commentTimeStamp}`] =
    null;

  update(ref(db), updateVal);

  const users = (await get(ref(db, `users/`))).val();

  users &&
    Object.keys(users).forEach((userHandle) => {
      const likedCommentRef = ref(
        db,
        `users/${userHandle}/likedComments/${postId}/${commentTimeStamp}`
      );
      remove(likedCommentRef);

      const commentRepliesRef = ref(
        db,
        `users/${userHandle}/commentReplies/${commentTimeStamp}`
      );
      remove(commentRepliesRef);
    });

  return "Comment deleted!";
};

export const editComment = async (
  postId,
  commentTimeStamp,
  handle,
  content
) => {
  const updateVal = {};
  updateVal[`posts/${postId}/comments/${commentTimeStamp}/${handle}`] = content;
  updateVal[`users/${handle}/commentedPosts/${postId}/${commentTimeStamp}`] =
    content;

  update(ref(db), updateVal);
};

export const isCommentLiked = async (postId, commentTimeStamp, handle) => {
  const snapshot = await get(
    ref(db, `users/${handle}/likedComments/${postId}/${commentTimeStamp}`)
  );
  return snapshot.val() ? true : false;
};

export const getCommentLikesNumber = async (postId, commentTimeStamp) => {
  const snapshot = await get(
    ref(db, `posts/${postId}/comments/${commentTimeStamp}/likes`)
  );
  return snapshot.val() ? Object.keys(snapshot.val()).length : 0;
};

export const replyToComment = async (
  postId,
  commentTimeStamp,
  handle,
  content
) => {
  const updateVal = {};
  const currentDate = Date.now();

  updateVal[
    `posts/${postId}/comments/${commentTimeStamp}/replies/${handle}/${currentDate}`
  ] = content;
  updateVal[
    `users/${handle}/commentReplies/${commentTimeStamp}/${currentDate}`
  ] = content;

  update(ref(db), updateVal);
};

export const getAllCommentReplies = async (postId, commentTimeStamp) => {
  const snapshot = await get(
    ref(db, `posts/${postId}/comments/${commentTimeStamp}/replies`)
  );
  return snapshot.val() ? snapshot.val() : {};
};

export const getCommentRepliesNumber = async (postId, commentTimeStamp) => {
  const data = (
    await get(ref(db, `posts/${postId}/comments/${commentTimeStamp}/replies`))
  ).val();
  const replies = [];

  data &&
    Object.values(data).forEach((key) => {
      replies.push(...Object.keys(key));
    });

  return replies.length;
};

export async function getNumberOfPosts() {
  const postsRef = ref(db, "posts");

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
  const usersRef = ref(db, "users");

  try {
    const snapshot = await get(usersRef);
    const users = snapshot.val();
    const numberOfUsers = users ? Object.keys(users).length : 0;
    return numberOfUsers;
  } catch (error) {
    console.error(error);
  }
}
export async function getNumberOnlineUsers() {
  const usersRef = ref(db, "onlineUsers");

  try {
    const snapshot = await get(usersRef);
    const onlineUsers = snapshot.val();
    const numberOnlineUsers = onlineUsers
      ? Object.values(onlineUsers).filter((user) => user.isOnline === true)
          .length
      : 0;
    return numberOnlineUsers;
  } catch (error) {
    console.error(error);
  }
}

export const getMostLikedPosts = async () => {
  const posts = await getAllPosts();
  const sortedPosts = posts.sort((a, b) => b.likedBy.length - a.likedBy.length);

  return sortedPosts.slice(0, 10);
};
