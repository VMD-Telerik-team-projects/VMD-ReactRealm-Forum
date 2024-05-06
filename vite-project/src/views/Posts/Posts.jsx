import { useContext, useEffect, useState } from "react"
import { getAllPosts } from "../../services/posts.service"
import AppContext from "../../context/AppContext"
import Post from "../../components/Post/Post";

export default function Posts() {
  const { user } = useContext(AppContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const postsData = await getAllPosts();
      setPosts(postsData);
    };

    fetchPosts();
  }, []);

  console.log(posts);
  
  return (
    <>
      {user ?
        <div>
          {posts.map(post => {
          return (
            <Post key={post.id} author={post.author} title={post.title} content={post.content} comments={[]} createdOn={post.createdOn} />
          )
        })}</div> :
        <h1>Login to see all posts!</h1>}
    </>
  )
}