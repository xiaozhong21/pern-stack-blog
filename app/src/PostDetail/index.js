import * as React from "react";

import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";

import * as apiClient from "../apiClient";

const PostDetail = () => {
  const [post, setPost] = React.useState();
  const { id } = useParams();

  const getPost = React.useCallback(
    () => apiClient.getPost(id).then(setPost),
    [id],
  );

  React.useEffect(() => {
    id !== undefined && getPost();
  }, [id, getPost]);

  return (
    <section>
      {post && (
        <>
          <img src={post.img} alt={post.title} />
          <h1>{post.title}</h1>
          <p>Author: {post.author}</p>
          <p>Date written: {post.date_created}</p>
          <p>Likes: {post.likes}</p>
          <ReactMarkdown>{post.body}</ReactMarkdown>
        </>
      )}
    </section>
  );
};

export default PostDetail;
