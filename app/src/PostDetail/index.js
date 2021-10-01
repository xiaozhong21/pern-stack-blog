import * as React from "react";

import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

import * as apiClient from "../apiClient";

import styles from "./styles.module.scss";

const PostDetail = () => {
  const [post, setPost] = React.useState();
  const [comments, setComments] = React.useState();
  const { id } = useParams();

  const getPost = React.useCallback(
    () => apiClient.getPost(id).then(setPost),
    [id],
  );

  const getComments = React.useCallback(
    () => apiClient.getComments(id).then(setComments),
    [id],
  );

  React.useEffect(() => {
    id !== undefined && getPost() && getComments();
  }, [id, getPost, getComments]);

  const onSubmit = (event) => {
    const form = event.currentTarget;
    const comment = Object.fromEntries(new FormData(form).entries());

    event.preventDefault();
    apiClient.addPostComment(id, comment).then(getComments);
    form.reset();
  };

  return (
    <>
      <article>
        {post && (
          <>
            <header>
              <img src={post.img} alt={post.title} />
              <h1>{post.title}</h1>
              <p>
                Author: {post.author} | Written on:{" "}
                {post.date_created.substring(0, 10)}
              </p>
              <p>Likes: {post.likes}</p>
            </header>
            <hr className={styles.hr} />
            <ReactMarkdown className={styles.postbody}>
              {post.body}
            </ReactMarkdown>
            <hr className={styles.hr} />
            <footer>
              - Thanks for reading! Your feedback is highly appreciated -{" "}
              <span role="img" aria-label="heart emoji">
                ❤️
              </span>
            </footer>
          </>
        )}
      </article>
      <section className={styles.commentdetail}>
        <h1>Comments:</h1>
        <ul>
          {comments &&
            comments.map(({ id, content, author, time }) => (
              <li key={id}>
                <div>{content}</div>
                <div>
                  {author} | {time.substring(0, 10)}
                </div>
              </li>
            ))}
        </ul>
        <form {...{ onSubmit }}>
          <label htmlFor="content">Your comment:</label>
          <textarea id="content" name="content" required />
          <label htmlFor="author">Name:</label>
          <input id="author" name="author" />
          <button>Submit Comment</button>
        </form>
      </section>
    </>
  );
};

export default PostDetail;
