import { useEffect, useState } from "react";

const Example = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, []);

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

export default Example;
