import * as React from "react";

import { Routes, Route, Link } from "react-router-dom";

import Home from "./Home/index";
import PostAddForm from "./PostAddForm/index";
import PostDetail from "./PostDetail/index";
import PostList from "./PostList/index";

import "./global.scss";

const App = () => (
  <>
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/posts">Posts</Link>
          </li>
          <li>
            <Link to="/addPost">Add Post</Link>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetail />} />
        <Route path="/addPost" element={<PostAddForm />} />
      </Routes>
    </main>
  </>
);

export default App;
