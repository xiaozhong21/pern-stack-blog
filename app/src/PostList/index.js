import * as React from "react";

import { Link } from "react-router-dom";

import * as apiClient from "../apiClient";

import styles from "./styles.module.scss";

const PostList = () => {
  const [posts, setPosts] = React.useState([]);

  const loadPosts = async () => setPosts(await apiClient.getPosts());

  React.useEffect(() => {
    loadPosts();
  }, []);

  return (
    <section className={styles.postlist}>
      <ul>
        {posts.map((card) => (
          <Card {...card} key={card.id} />
        ))}
      </ul>
    </section>
  );
};

const Card = ({ id, img, title, blurb, date_created }) => (
  <li key={id}>
    <img src={img} alt={title} />
    <h2>
      <Link to={`/posts/${id}`} style={{ textDecoration: "none" }}>
        {title}
      </Link>
    </h2>
    <p className={styles.blurb}>{blurb}</p>
    <p className={styles.date}>Written on {date_created.substring(0, 10)}</p>
  </li>
);

export default PostList;
