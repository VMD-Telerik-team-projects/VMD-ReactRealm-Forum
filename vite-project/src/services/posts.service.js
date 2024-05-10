import { ref, push, get, set, update, query, equalTo, orderByChild, orderByKey, remove } from 'firebase/database';
import { db } from '../config/firebase-config';

export const addPost = async(author, title, content, comments) => {
    const post = {
        author,
        title,
        content,
        createdOn: Date.now(),
        comments
    };

    const result = await push(ref(db, 'posts'), post);
    console.log(result.key);

    await set(ref(db, `users/${author}/posts/${result.key}`), true);
};

//  All posts means no search

// export const getAllPosts = async(search) => {
//     const snapshot = await get(ref(db, 'posts'));
//     if (!snapshot.exists()) return [];

//     return Object
//         .entries(snapshot.val())
//         .map(([key, value]) => {
//             return {
//                 ...value,
//                 id: key,
//                 likedBy: value.likedBy ? Object.keys(value.likedBy) : [],
//                 createdOn: new Date(value.createdOn).toString(),
//             }
//         })
//         .filter(t => t.content.toLowerCase().includes(search.toLowerCase()));
// };

export const getAllPosts = async () => {
    const snapshot = await get(ref(db, 'posts'));
    if (!snapshot.exists()) return [];

    return Object
        .entries(snapshot.val())
        .map(([key, value]) => {
            return {
                ...value,
                id: key,
                likedBy: value.likedBy ? Object.keys(value.likedBy) : [],
                createdOn: new Date(value.createdOn).toString(),
            }
        })
}

export const getPostById = async(id) => {
    const snapshot = await get(ref(db, `posts/${id}`));

    if (!snapshot.val()) throw new Error('Post with this id does not exist!');

    return {
        ...snapshot.val(),
        id,
        likedBy: snapshot.val().likedBy ? Object.keys(snapshot.val().likedBy) : [],
        createdOn: new Date(snapshot.val().createdOn).toString(),
    }
};

export const deletePostById = async(author, id) => {
    const postRef = ref(db, `posts/${id}`);
    await remove(postRef);

    const userPostsRef = ref(db, `users/${author}/posts/${id}`);
    await remove(userPostsRef);
    
    alert('Post deleted!');
};

export const likePost = async(postId, handle) => {
    const updateVal = {};
    updateVal[`users/${handle}/likedPosts/${postId}`] = true;
    updateVal[`posts/${postId}/likedBy/${handle}`] = true;

    update(ref(db), updateVal);
};

export const dislikePost = async(postId, handle) => {
    const updateVal = {};
    updateVal[`users/${handle}/likedPosts/${postId}`] = null;
    updateVal[`posts/${postId}/likedBy/${handle}`] = null;

    update(ref(db), updateVal);
};

export const comment = async(postId, handle, content) => {
    const updateVal = {};
    updateVal[`users/${handle}/commentedPosts/${postId}/${Date.now()}`] = content;
    updateVal[`posts/${postId}/comments/${Date.now()}/${handle}`] = content;

    update(ref(db), updateVal);
}
