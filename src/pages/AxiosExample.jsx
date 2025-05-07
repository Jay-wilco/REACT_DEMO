import { useEffect, useState } from "react";
import axios from "axios";

const AxiosExample = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setPosts(res.data))
      .catch((error) => console.log("Axios error", error))
      .finally(() => setLoading(false));
  }, []);

  console.log("posts: ", posts);

  return loading ? (
    <p>Loading...</p>
  ) : (
    <div>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
};

export default AxiosExample;
