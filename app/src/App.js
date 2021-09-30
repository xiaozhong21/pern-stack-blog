import * as React from "react";

import { Routes, Route, Link, Outlet } from "react-router-dom";

import Home from "./Home/index";
import PostAddForm from "./PostAddForm/index";
import PostDetail from "./PostDetail/index";
import PostList from "./PostList/index";
import * as apiClient from "./apiClient";
import styles from "./global.module.scss";

const App = () => {
  const [posts, setPosts] = React.useState([]);

  const loadPosts = async () => setPosts(await apiClient.getPosts());
  const addPost = (post) => apiClient.addPost(post).then(loadPosts);

  React.useEffect(() => {
    loadPosts();
  }, []);

  const linkStyle = {
    textDecoration: "none",
    color: "white",
  };

  return (
    <div className={styles.body}>
      <nav>
        <ul>
          <li>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" style={linkStyle}>
              Posts
            </Link>
          </li>
          <li>
            <Link to="/addPost" style={linkStyle}>
              Add Post
            </Link>
          </li>
        </ul>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="posts" element={<Posts />}>
            <Route path="/posts" element={<PostList {...{ posts }} />} />
            <Route path=":id" element={<PostDetail />} />
          </Route>
          <Route path="addPost" element={<PostAddForm {...{ addPost }} />} />
        </Routes>
      </main>
    </div>
  );
};

const Posts = () => <Outlet />;

export default App;
