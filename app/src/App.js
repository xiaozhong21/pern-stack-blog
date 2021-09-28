import * as React from "react";

import { Routes, Route, Link } from "react-router-dom";

import PostAddForm from "./PostAddForm/index";
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

  return (
    <>
      <nav>
        <Link to="/">Blog</Link> | <Link to="addPost">Add Post</Link>
      </nav>
      <main>
        <Routes>
          <Route path="//*" element={<PostList {...{ posts }} />} />
          <Route path="/addPost" element={<PostAddForm {...{ addPost }} />} />
        </Routes>
      </main>
    </>
  );
};

export default App;
