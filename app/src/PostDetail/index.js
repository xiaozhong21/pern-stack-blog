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

  const addComment = (comment) =>
    apiClient.addComment(comment).then(getComments);

  React.useEffect(() => {
    id !== undefined && getPost() && getComments();
  }, [id, getPost, getComments]);

  const onSubmit = (event) => {
    const form = event.currentTarget;
    const {
      content: { value: content },
      author: { value: author },
    } = form.elements;

    event.preventDefault();
    addComment({ id, content, author });
    form.reset();
  };

  const hrLine = (
    <hr
      style={{
        color: "grey",
        backgroundColor: "grey",
        height: 0.5,
        borderColor: "grey",
        width: "60%",
      }}
    />
  );

  return (
    <section>
      <div className={styles.postdetail}>
        {post && (
          <>
            <img src={post.img} alt={post.title} />
            <h1>{post.title}</h1>
            <p>Author: {post.author}</p>
            <p>Date written: {post.date_created.substring(0, 10)}</p>
            <p>Likes: {post.likes}</p>
            {hrLine}
            <ReactMarkdown>{post.body}</ReactMarkdown>
            {hrLine}
            <h4>
              Thanks for reading! Your feedback is highly appreciated{" "}
              <span role="img" aria-label="heart emoji">
                ❤️
              </span>
            </h4>
          </>
        )}
      </div>
      <div className={styles.commentdetail}>
        <p>Comments:</p>
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
      </div>
      <div className={styles.addcomment}>
        <form {...{ onSubmit }}>
          <label>
            Your comment:
            <input name="content" required />
          </label>
          <label>
            Name:
            <input name="author" />
          </label>
          <button>Submit Comment</button>
        </form>
      </div>
    </section>
  );
};

export default PostDetail;
