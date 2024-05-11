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
  const [sortOption, setSortOption] = useState('date');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const postsData = await getAllPosts();
      setPosts(postsData);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (author, id) => {
    try {
      await deletePostById(author, id);
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

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedPosts = filteredPosts.sort((a, b) => {
    if (sortOption === 'date') {
      return new Date(b.date) - new Date(a.date);
    } else if (sortOption === 'title') {
      const titleA = a.title || "";
      const titleB = b.title || "";
      return titleA.localeCompare(titleB); 
 } });

  return (
    <>
      {user ? (
        <>
          {posts.length > 0 ? (
            <>
              <SearchBar value={searchTerm} onChange={setSearchTerm} className='mt-4' />
              <select className="select-dropdown" value={sortOption} onChange={handleSortChange}>
                <option value="date">Oldest posts</option>
                <option value="title">Alphabetical order</option>
              </select>
              <div className="posts-container">
              {filteredPosts.map((post) => {
                return (
                  <Post
                    key={post.id}
                    author={post.author}
                    title={post.title}
                    content={post.content}
                    comments={post.comments ? Object.values(post.comments) : []}
                    likes={post.likedBy ? post.likedBy.length : 0}
                    createdOn={post.createdOn}
                    postId={post.id}
                    onUpdate={setPosts}
                    onDelete={() => handleDeletePost(post.author, post.id)}
                    userPriviliges={userData.priviliges}
                  />
                );
              })}
              </div>
            </>
          ) : (<h1>No posts found!</h1>)}
        </>
      ) : (
        <h1 className="fs-1 fw-light">Login to see all posts!</h1>
      )}
    </>
  );
}