import * as React from "react";

import { Link } from "react-router-dom";

import "./styles.module.scss";

const PostList = ({ posts }) => (
  <section>
    <ul>
      {posts.map((card) => (
        <Card {...card} key={card.id} />
      ))}
    </ul>
  </section>
);

const Card = ({ id, img, title, blurb, author, date_created, likes }) => (
  <>
    <li key={id}>
      <img src={img} alt={title} />
      <h2>
        <Link to={`/posts/${id}`} style={{ textDecoration: "none" }}>
          {title}
        </Link>
      </h2>
      <p>{blurb}</p>
      <p>Written on {date_created}</p>
    </li>
  </>
);

export default PostList;
