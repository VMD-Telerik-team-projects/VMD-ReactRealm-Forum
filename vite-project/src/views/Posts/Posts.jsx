import { useContext, useEffect, useState } from "react"
import { getAllPosts } from "../../services/posts.service"
import AppContext from "../../context/AppContext"
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";

export default function Posts() {
  const { user } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const postsData = await getAllPosts();
      setPosts(postsData);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <Loader />
  }
  
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