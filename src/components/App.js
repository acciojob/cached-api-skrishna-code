import { useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const url =
          userId === 0
            ? "https://jsonplaceholder.typicode.com/posts"
            : `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;

        const response = await fetch(url);
        const data = await response.json();

        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const cachedPosts = useMemo(() => {
    return posts;
  }, [posts]);

  return (
    <div className="app">
      <h1>Cached API Data</h1>

      <div className="controls">
        <label>Select User:</label>

        <select
          value={userId}
          onChange={(e) => setUserId(Number(e.target.value))}
        >
          <option value={0}>All Users</option>
          <option value={1}>User 1</option>
          <option value={2}>User 2</option>
          <option value={3}>User 3</option>
          <option value={4}>User 4</option>
          <option value={5}>User 5</option>
        </select>
      </div>

      {loading ? (
        <div className="loading">Loading data...</div>
      ) : (
        <div className="content">
          <p className="status">
            Data available: {cachedPosts.length} posts
          </p>

          <div className="posts">
            {cachedPosts.map((post) => (
              <div className="post-card" key={post.id}>
                <span>Post #{post.id}</span>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
