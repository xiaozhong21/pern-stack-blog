import * as React from "react";

import { Link } from "react-router-dom";

import styles from "./styles.module.scss";

const PostList = ({ posts }) => (
  <section className={styles.postlist}>
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
      <h3>
        <Link to={`/posts/${id}`} style={{ textDecoration: "none" }}>
          {title}
        </Link>
      </h3>
      <h4>{blurb}</h4>
      <p>Written on {date_created.substring(0, 10)}</p>
    </li>
  </>
);

export default PostList;
