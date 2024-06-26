import { useContext, useEffect, useState } from "react";
import { getAllPosts, getMostLikedPosts } from "../../services/posts.service";
import AppContext from "../../context/AppContext";
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";
import { deletePostById } from "../../services/posts.service";
import { toast } from "react-toastify";
import "./Posts.css";
import { ExclamationTriangleFill} from "react-bootstrap-icons";

export default function Posts() {
  const { user, userData } = useContext(AppContext);
  const [posts, setPosts] = useState([]);
  const [mostLikedPosts, setMostLikedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date-newest");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsData = await getAllPosts();
        setPosts(postsData);
        setLoading(false);
      } catch (e) {
        toast.error(`Something went wrong: ${e.message}`);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsData = await getMostLikedPosts();
        console.log(postsData);
        setMostLikedPosts(postsData);
        setLoading(false);
      } catch (e) {
        toast.error(`Something went wrong: ${e.message}`);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeletePost = async (author, id) => {
    try {
      await deletePostById(author, id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  const filteredPosts = posts
    ? posts.filter(
        (post) =>
          (post.title &&
            post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (post.content &&
            post.content.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const sortedPosts = filteredPosts.sort((a, b) => {
    switch(sortOption) {
      case 'date-newest':
        return new Date(b.createdOn) - new Date(a.createdOn);
      case 'date-oldest':
        return new Date(a.createdOn) - new Date(b.createdOn);
      case 'title':
        return a.title?.toLowerCase().localeCompare(b.title?.toLowerCase());
      case 'likes':
        return b.likedBy.length - a.likedBy.length;
    }
});

return (
  <>
    {user ? (
      <>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <SearchBar
            value={searchTerm}
            onChange={setSearchTerm}
            className="mt-4"
          />
          <select
            className="select-dropdown mt-4"
            value={sortOption}
            onChange={handleSortChange}
          >
            <option value="date-newest">Newest posts</option>
            <option value="date-oldest">Oldest posts</option>
            <option value="likes">Most liked posts</option>
            <option value="title">Alphabetical order</option>
          </select>
        </div>
        {posts.length > 0 ? (
          <div className="posts-container">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
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
                  userPriviliges={userData ? userData.priviliges : null}
                />
              ))
            ) : (
              <div className="no-posts-found" style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
                <ExclamationTriangleFill size={32} color="red" />
                <h2>No posts found</h2>
                <p>Try adjusting your search to find what you&apos;re looking for.</p>
              </div>
            )}
          </div>
        ) : (
          <h1>No posts found!</h1>
        )}
      </>
    ) : (
      <div className="d-flex flex-column justify-content-start">
        <h1 className="fw-normal fs-1 mt-2 mb-5 ms-3 text-black">Our {mostLikedPosts.length} most liked posts</h1>
        <div className="posts-container">
          {mostLikedPosts.map((post) => (
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
              userPriviliges={userData ? userData.priviliges : null}
            />
          ))}
        </div>
      </div>
    )}
  </>
);
}