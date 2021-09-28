import * as React from "react";

import { Routes, Route, Link } from "react-router-dom";

import PostDetail from "../PostDetail/index";

const PostList = ({ posts }) => (
  <>
    <ul>
      {posts.map((card) => (
        <>
          <Card {...card} key={card.id} />
          <Routes key={card.id}>
            <Route path="/posts/:id" element={<PostDetail {...card} />} />
          </Routes>
        </>
      ))}
    </ul>
  </>
);

const Card = ({ id, img, title, blurb, body, author, date_created, likes }) => (
  <>
    <li key={id}>
      <img src={img} alt={title} />
      <Link to="posts/:id">{title}</Link>
      {blurb}
      {author}
      {date_created}
      {likes}
    </li>
  </>
);

export default PostList;
