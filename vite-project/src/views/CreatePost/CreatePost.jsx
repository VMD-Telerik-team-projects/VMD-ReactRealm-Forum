export default function CreatePost() {
  return (
    <>
      <h1>Sign in to create posts</h1>
      <label htmlFor="post-title">Title:</label> <br />
      <input type="text" name="post-title" /> <br />
      <label htmlFor="post-content">Content:</label> <br />
      <textarea
        name="post-content"
        id="post-content"
        cols="30"
        rows="10"
      ></textarea>
    </>
  );
}
