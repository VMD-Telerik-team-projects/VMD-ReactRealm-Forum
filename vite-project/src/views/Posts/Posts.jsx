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
      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      {user ? (
        <div>
          {filteredPosts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                title={post.title}
                content={post.content}
                comments={[]}
                createdOn={post.createdOn}
                postId={post.id}
              />
            );
          })}
        </div>
      ) : (
        <h1>Login to see all posts!</h1>
      )}
    </>
  );
}