import { useContext, useEffect, useState } from "react"
import { getAllPosts } from "../../services/posts.service"
import AppContext from "../../context/AppContext"
import Post from "../../components/Post/Post";
import Loader from "../../components/Loader/Loader";
import SearchBar from "../../components/SearchBar/SearchBar";

export default function Posts() {
  const { user } = useContext(AppContext);
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
              />
            );
          })}
        </>
      ) : (
        <h1 className="fs-1 fw-light">Login to see all posts!</h1>
      )}
    </>
  );
}