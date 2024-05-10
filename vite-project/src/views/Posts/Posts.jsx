import { useContext, useEffect, useState } from "react"
import { getAllPosts } from "../../services/posts.service"
import AppContext from "../../context/AppContext"
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";
import { deletePostById } from "../../services/posts.service";
import './Posts.css';

export default function Posts() {
  const { user, userData } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const postsData = await getAllPosts();
      setPosts(postsData);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      await deletePostById(id);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };
  
  if (loading) {
    return <Loader />
  }
  
  const filteredPosts = posts ? posts.filter(post =>
    (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  ) : [];

  return (
    <>
      {user ? (
        <>
          <SearchBar value={searchTerm} onChange={setSearchTerm} className='mt-4' />
          <div className="posts-container">
          {filteredPosts.map((post) => {
            return (
              <div key={post.id}>
              <Post
                author={post.author}
                title={post.title}
                content={post.content}
                comments={post.comments ? Object.values(post.comments) : []}
                likes={post.likedBy ? post.likedBy.length : 0}
                createdOn={post.createdOn}
                postId={post.id}
                onUpdate={setPosts}
              />
             {userData.priviliges === 0 && <button className="btn btn-danger" onClick={() => handleDeletePost(post.id)}>DELETE POST: {post.title} </button>}
            </div>
            );
          })}
          </div>
        </>
      ) : (
        <h1 className="fs-1 fw-light">Login to see all posts!</h1>
      )}
    </>
  );
}