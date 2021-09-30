import * as React from "react";

import { Routes, Route, Link, Outlet } from "react-router-dom";

import Home from "./Home/index";
import PostAddForm from "./PostAddForm/index";
import PostDetail from "./PostDetail/index";
import PostList from "./PostList/index";
import * as apiClient from "./apiClient";

import "./global.module.scss";

const App = () => {
  const [posts, setPosts] = React.useState([]);

  const loadPosts = async () => setPosts(await apiClient.getPosts());
  const addPost = (post) => apiClient.addPost(post).then(loadPosts);

  React.useEffect(() => {
    loadPosts();
  }, []);

  const style = {
    textDecoration: "none",
    color: "white",
  };

  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/" style={style}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/posts" style={style}>
              Posts
            </Link>
          </li>
          <li>
            <Link to="/addPost" style={style}>
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
    </>
  );
};

const Posts = () => <Outlet />;

export default App;
